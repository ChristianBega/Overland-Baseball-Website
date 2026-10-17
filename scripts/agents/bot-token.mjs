#!/usr/bin/env node
// Mint a GitHub App installation token and print it to stdout.
//
//   GH_TOKEN=$(node scripts/agents/bot-token.mjs) gh pr create ...
//
// Never echo the output or log it: it is a live credential (valid for 1 hour).
//
// Inputs (env vars; nothing repo-specific is hardcoded):
//   BOT_KEY_PATH  App private key (PEM). Default: <bot.keyDir>/key.pem from .claude/agents.config.json
//   BOT_APP_ID    App ID. Default: contents of an `app-id` file next to the key.
//   BOT_REPO      owner/repo to find the installation for. Default: parsed from `git remote get-url origin`.
//   GITHUB_API_URL  Default: https://api.github.com
//
// No dependencies: Node >= 18 (global fetch, crypto).

import { createPrivateKey, createSign } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const API = (process.env.GITHUB_API_URL || "https://api.github.com").replace(/\/$/, "");

function fail(msg) {
  process.stderr.write(`bot-token: ${msg}\n`);
  process.exit(1);
}

function expandHome(p) {
  return p.startsWith("~/") ? join(homedir(), p.slice(2)) : p;
}

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

function keyPath() {
  if (process.env.BOT_KEY_PATH) return expandHome(process.env.BOT_KEY_PATH);
  let dir;
  try {
    const cfg = JSON.parse(readFileSync(join(git("rev-parse", "--show-toplevel"), ".claude/agents.config.json"), "utf8"));
    dir = cfg.bot?.keyDir;
  } catch {
    // fall through to the error below
  }
  if (!dir) fail("no BOT_KEY_PATH and no bot.keyDir in .claude/agents.config.json");
  return join(expandHome(dir), "key.pem");
}

function appId(kp) {
  let id = process.env.BOT_APP_ID;
  let source = "BOT_APP_ID";
  if (!id) {
    const file = join(dirname(kp), "app-id");
    if (!existsSync(file)) fail(`no App ID: set BOT_APP_ID or write it to ${file}`);
    id = readFileSync(file, "utf8");
    source = file;
  }
  id = id.trim();
  if (/^Iv/.test(id)) fail(`${source} holds a Client ID (Iv...); use the numeric App ID from the App's settings page`);
  if (!/^\d+$/.test(id)) fail(`App ID from ${source} is not numeric`);
  return id;
}

function repoSlug() {
  if (process.env.BOT_REPO) return process.env.BOT_REPO;
  let url;
  try {
    url = git("remote", "get-url", "origin");
  } catch {
    fail("no BOT_REPO and `git remote get-url origin` failed");
  }
  const m = url.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/);
  if (!m) fail(`cannot parse owner/repo from origin URL; set BOT_REPO`);
  return `${m[1]}/${m[2]}`;
}

const b64url = (buf) => Buffer.from(buf).toString("base64url");

function appJwt(id, pem) {
  let key;
  try {
    key = createPrivateKey(pem);
  } catch {
    fail("private key could not be parsed (expected a PEM RSA key)");
  }
  const now = Math.floor(Date.now() / 1000);
  // iat 60s in the past for clock drift; GitHub caps exp at 10 minutes.
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: id }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  return `${header}.${payload}.${b64url(signer.sign(key))}`;
}

async function gh(method, path, jwt) {
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "agents-bot-token",
      },
    });
  } catch (e) {
    fail(`network error calling ${method} ${path}: ${e.message}`);
  }
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function main() {
  const kp = keyPath();
  if (!existsSync(kp)) fail(`private key not found at ${kp} (set BOT_KEY_PATH)`);
  const id = appId(kp);
  const repo = repoSlug();
  let pem;
  try {
    pem = readFileSync(kp, "utf8");
  } catch (e) {
    fail(`cannot read private key at ${kp} (${e.code})`);
  }
  const jwt = appJwt(id, pem);

  const inst = await gh("GET", `/repos/${repo}/installation`, jwt);
  if (inst.status === 401) fail(`GitHub rejected the App JWT (401): check that App ID ${id} matches the key`);
  if (inst.status === 404) fail(`App ${id} is not installed on ${repo}, or the App ID does not match the key (404)`);
  if (inst.status !== 200) fail(`installation lookup for ${repo} failed (${inst.status}): ${inst.body.message ?? ""}`);

  const tok = await gh("POST", `/app/installations/${inst.body.id}/access_tokens`, jwt);
  if (tok.status !== 201 || !tok.body.token) {
    fail(`token mint failed (${tok.status}): ${tok.body.message ?? ""}`);
  }
  process.stdout.write(tok.body.token);
}

main();
