#!/usr/bin/env node
/**
 * Overland Baseball verification harness.
 * Commands: bootstrap | launch | doctor | drive [routes...] | cleanup [--evidence]
 * State and evidence live in ${TMPDIR:-/tmp}/overland-verify (never in the repo).
 */
import { createRequire } from "node:module";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import net from "node:net";
import os from "node:os";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "../../../..");
const CLIENT = join(REPO, "client");
const HOME = join(process.env.TMPDIR || "/tmp", "overland-verify");
const PID_FILE = join(HOME, "vite.pid");
const LOG_FILE = join(HOME, "vite.log");
const EVIDENCE = join(HOME, "evidence");
const PORT = Number(process.env.VERIFY_PORT) || 3100;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const BIND_HOSTS = ["127.0.0.1", "::1"];

const PROTECTED = new Set(["/dashboard", "/documents", "/theme-showcase"]);

const DEFAULT_ROUTES = [
  "/",
  "/boosters",
  "/events",
  "/roster",
  "/alumni",
  "/sponsors",
  "/authentication/sign-in",
  "/authentication/sign-up",
  "/authentication/password-reset",
];

const READY_SELECTORS = {
  "/": "#home-page",
  "/boosters": "#boosters-section",
  "/events": "#events-page",
  "/roster": "#roster-page",
  "/alumni": "#alumni-page",
  "/sponsors": "main",
  "/authentication/sign-in": "#authentication-page",
  "/authentication/sign-up": "#authentication-page",
  "/authentication/password-reset": "#authentication-page",
};

const DUMMY_ENV = {
  REACT_APP_API_KEY: "dummy",
  REACT_APP_AUTH_DOMAIN: "dummy.firebaseapp.com",
  REACT_APP_PROJECT_ID: "dummy",
  REACT_APP_STORAGE_BUCKET: "dummy.appspot.com",
  REACT_APP_MESSAGING_SENDER_ID: "dummy",
  REACT_APP_APP_ID: "dummy",
  REACT_APP_STRAPI_URL: "http://127.0.0.1:1337",
  REACT_APP_STRAPI_DRAFT_MODE: "false",
  REACT_APP_STRAPI_API_TOKEN: "dummy",
  REACT_APP_STRAPI_AUTH_LOGIN_PORTAL: "http://127.0.0.1:1337",
  REACT_APP_VOICE_CMS_URL: "http://127.0.0.1:1337",
  REACT_APP_VOICE_CMS_URL_DEV: "http://127.0.0.1:1337",
  REACT_APP_AWS_API_BASE_URL: "http://127.0.0.1:1337",
};

const EXPECTED = [
  /https?:\/\/(127\.0\.0\.1|localhost):1337/,
  /ERR_CONNECTION_REFUSED/i,
  /ECONNREFUSED/,
  /Strapi API error/,
  /Failed to load (events|schedules|rosters|alumni)/,
  /\[vite\]/i,
  /React DevTools/,
  /React Router Future Flag Warning/,
  /v7_startTransition/,
  /v7_relativeSplatPath/,
];

const OV61_PROPS = "marginZero|backgroundImage|currentTheme|isTransparent|navListType|currentUrl|url|showLabel|stackProps";

// Fonts and the Maps embed are assets the public pages request on purpose. Still abort them; do not treat them as regressions.
const EXTERNAL_OK = [
  { host: "fonts.googleapis.com" },
  { host: "fonts.gstatic.com" },
  { host: "www.google.com", pathPrefix: "/maps" },
];

const KNOWN_OV61 = [
  /routes\.jsx:96/,
  /same key, ``/,
  /logo192\.png/,
  /Invalid prop [`']error[`'] of type [`'][^`'"]+[`'] supplied to [`'][^`'"]*DataStateDisplay/,
  /prop [`']error[`'] is marked as required in [`'][^`'"]*DataStateDisplay/,
  new RegExp(`React does not recognize the \`(${OV61_PROPS})\` prop`),
  new RegExp(`non-boolean attribute \`(${OV61_PROPS})\``),
  // OV-61: FooterNavigation renders TextBlock without required title/body.
  /The prop `(title|body)` is marked as required in `TextBlock`/,
  // To be added to OV-61: SectionLayout is rendered without required ariaLabel.
  /The prop `ariaLabel` is marked as required in `SectionLayout`/,
];

function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  if (os.platform() === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
  return "/usr/bin/google-chrome";
}

function classify(text) {
  if (EXPECTED.some((re) => re.test(text))) return "expected";
  if (KNOWN_OV61.some((re) => re.test(text))) return "known";
  return "new";
}

function requestHost(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function isExpectedExternal(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  return EXTERNAL_OK.some(
    (rule) => parsed.hostname === rule.host && (!rule.pathPrefix || parsed.pathname.startsWith(rule.pathPrefix))
  );
}

function causedByBlocked(text, urls) {
  return urls.some((url) => text.includes(url));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode);
    });
    req.setTimeout(2000, () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", reject);
  });
}

function lsofAvailable() {
  const result = spawnSync("lsof", ["-v"], { encoding: "utf8" });
  return result.error?.code !== "ENOENT";
}

function addressMatches(name, host) {
  if (!name) return false;
  if (host === "127.0.0.1") return name.startsWith(`127.0.0.1:${PORT}`);
  return name.startsWith(`[::1]:${PORT}`) || name.startsWith(`::1:${PORT}`);
}

/** All TCP listeners on PORT. null when lsof cannot be run. */
function listListeners() {
  return new Promise((resolve) => {
    if (!lsofAvailable()) {
      resolve(null);
      return;
    }
    const lsof = spawn("lsof", ["-nP", `-iTCP:${PORT}`, "-sTCP:LISTEN", "-Fpcn"]);
    let out = "";
    lsof.stdout.on("data", (d) => {
      out += d;
    });
    const finish = () => {
      const records = [];
      let cur = {};
      for (const line of out.split("\n")) {
        if (!line) continue;
        const tag = line[0];
        const val = line.slice(1);
        if (tag === "p") {
          if (cur.pid) records.push(cur);
          cur = { pid: Number(val) };
        } else if (tag === "c") cur.command = val;
        else if (tag === "n") cur.name = val;
      }
      if (cur.pid) records.push(cur);
      resolve(records.filter((row) => Number.isFinite(row.pid)));
    };
    lsof.on("close", finish);
    lsof.on("error", () => resolve(null));
  });
}

function portInUse(host) {
  return new Promise((resolve) => {
    const socket = net.connect({ port: PORT, host, family: host === "::1" ? 6 : 4 });
    let settled = false;
    const done = (inUse) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(inUse);
    };
    socket.once("connect", () => done(true));
    socket.once("error", () => done(false));
    socket.setTimeout(1500, () => done(false));
  });
}

function logTail(lines = 40) {
  if (!existsSync(LOG_FILE)) return `(no log at ${LOG_FILE})`;
  const text = readFileSync(LOG_FILE, "utf8").trim().split("\n");
  return text.slice(-lines).join("\n");
}

function treePids(root) {
  if (!root) return [];
  const r = spawnSync("ps", ["-axo", "pid=,ppid="], { encoding: "utf8" });
  const children = new Map();
  for (const line of String(r.stdout || "").split("\n")) {
    const [pid, ppid] = line.trim().split(/\s+/).map(Number);
    if (!pid || !ppid) continue;
    if (!children.has(ppid)) children.set(ppid, []);
    children.get(ppid).push(pid);
  }
  const live = [];
  const stack = [root];
  const seen = new Set();
  while (stack.length) {
    const cur = stack.pop();
    if (!cur || seen.has(cur)) continue;
    seen.add(cur);
    if (alive(cur)) live.push(cur);
    for (const child of children.get(cur) || []) stack.push(child);
  }
  return live;
}

function readPid() {
  if (!existsSync(PID_FILE)) return null;
  const n = Number(readFileSync(PID_FILE, "utf8").trim());
  return Number.isFinite(n) ? n : null;
}

function alive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function processArgs(pid) {
  const result = spawnSync("ps", ["-o", "args=", "-p", String(pid)], { encoding: "utf8" });
  return String(result.stdout || "");
}

function isOurServer(pid) {
  const args = processArgs(pid);
  const named = args.includes("vite") || args.includes("npm start");
  return named && args.includes(`--port ${PORT}`);
}

function discardStalePid(pid) {
  if (existsSync(PID_FILE)) rmSync(PID_FILE);
  console.log(`stale pid file, not signalling pid ${pid}`);
}

async function bootstrap() {
  mkdirSync(HOME, { recursive: true });
  if (existsSync(join(HOME, "node_modules", "puppeteer-core"))) {
    console.log(`puppeteer-core already present at ${HOME}`);
    return;
  }
  console.log(`BOOTSTRAP (network): npm install puppeteer-core in ${HOME}`);
  await new Promise((resolve, reject) => {
    const child = spawn(
      "npm",
      ["install", "puppeteer-core@23.11.1", "--ignore-scripts", "--no-fund", "--no-audit", "--prefix", HOME],
      { stdio: "inherit", env: { ...process.env, PUPPETEER_SKIP_DOWNLOAD: "1" } }
    );
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`npm install exited ${code}`))));
  });
}

function loadPuppeteer() {
  const require = createRequire(join(HOME, "package.json"));
  return require("puppeteer-core");
}

async function describeBusy(host) {
  const listeners = await listListeners();
  const owners = (listeners || []).filter((row) => addressMatches(row.name, host));
  if (!owners.length) return `port ${PORT} is in use on ${host}`;
  return owners
    .map((row) => `port ${PORT} is in use on ${host} (pid ${row.pid}${row.command ? ` ${row.command}` : ""})`)
    .join("\n");
}

async function assertPortFree() {
  const busy = [];
  for (const host of BIND_HOSTS) {
    if (await portInUse(host)) busy.push(host);
  }
  if (!busy.length) return;
  const lines = [];
  for (const host of busy) lines.push(await describeBusy(host));
  throw new Error(`${lines.join("\n")}\nrefusing to start; leaving the listener running`);
}

async function waitUntilOurs(trackedPid, earlyExit) {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    if (earlyExit.code != null || earlyExit.signal != null) {
      throw new Error(
        `vite exited early code=${earlyExit.code} signal=${earlyExit.signal ?? "none"}\n${logTail()}`
      );
    }
    if (!alive(trackedPid)) {
      throw new Error(`tracked vite pid ${trackedPid} is not alive\n${logTail()}`);
    }
    let status = null;
    try {
      status = await httpGet(ORIGIN);
    } catch {
      status = null;
    }
    if (status && status < 500) {
      const listeners = await listListeners();
      if (!listeners) {
        throw new Error(`lsof missing; cannot confirm ${ORIGIN} is served by pid ${trackedPid}`);
      }
      const v4 = listeners.filter((row) => addressMatches(row.name, "127.0.0.1"));
      const ours = v4.filter((row) => row.pid === trackedPid || isDescendant(row.pid, trackedPid));
      if (v4.length && !ours.length) {
        throw new Error(
          `${ORIGIN} status=${status} is served by pid ${v4.map((row) => row.pid).join(",")}, not a descendant of ${trackedPid}\n${logTail()}`
        );
      }
      if (ours.length) {
        console.log(`ready ${ORIGIN} status=${status} listener=${ours.map((row) => row.pid).join(",")}`);
        return;
      }
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`vite did not become ready on ${ORIGIN} within 60s\n${logTail()}`);
}

async function launch() {
  mkdirSync(HOME, { recursive: true });
  const existing = readPid();
  if (alive(existing)) {
    if (!isOurServer(existing)) {
      discardStalePid(existing);
    } else {
      console.log(`dev server already running pid=${existing}`);
      await waitUntilOurs(existing, {});
      return;
    }
  }
  await assertPortFree();
  if (!existsSync(join(CLIENT, "node_modules"))) {
    console.log("client/node_modules missing; running npm ci in client/");
    await new Promise((resolve, reject) => {
      const child = spawn("npm", ["ci"], { cwd: CLIENT, stdio: "inherit" });
      child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`npm ci exited ${code}`))));
    });
  }
  const logFd = await import("node:fs").then((fs) => fs.openSync(LOG_FILE, "a"));
  const earlyExit = { code: null, signal: null };
  const child = spawn(
    "npm",
    ["start", "--", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort", "--open", "false"],
    {
      cwd: CLIENT,
      detached: true,
      stdio: ["ignore", logFd, logFd],
      env: { ...process.env, ...DUMMY_ENV, BROWSER: "none" },
    }
  );
  child.on("exit", (code, signal) => {
    earlyExit.code = code;
    earlyExit.signal = signal;
  });
  child.unref();
  writeFileSync(PID_FILE, String(child.pid));
  console.log(`started vite pid=${child.pid} log=${LOG_FILE}`);
  await waitUntilOurs(child.pid, earlyExit);
}

async function doctor() {
  const problems = [];
  const chrome = chromePath();
  if (!existsSync(chrome)) problems.push(`Chrome binary missing: ${chrome} (set CHROME_PATH)`);
  else console.log(`chrome=${chrome}`);
  console.log(`node=${process.version} (CI uses Node 20)`);
  if (!existsSync(join(HOME, "node_modules", "puppeteer-core"))) {
    problems.push(`puppeteer-core missing in ${HOME}; run bootstrap`);
  } else console.log(`puppeteer-core=${HOME}`);
  const pid = readPid();
  const listeners = await listListeners();
  if (!listeners) {
    problems.push(`lsof missing; cannot confirm the listener on 127.0.0.1:${PORT} belongs to the tracked pid`);
  } else {
    const summary = listeners.map((row) => `${row.pid}@${row.name}`).join(", ") || "none";
    console.log(`listeners on ${PORT}: ${summary}`);
    const v4 = listeners.filter((row) => addressMatches(row.name, "127.0.0.1"));
    if (!v4.length) problems.push(`nothing listening on 127.0.0.1:${PORT}`);
    else {
      const foreign = v4.filter((row) => !pid || (row.pid !== pid && !isDescendant(row.pid, pid)));
      if (foreign.length) {
        problems.push(
          `127.0.0.1:${PORT} listener pid ${foreign.map((row) => row.pid).join(",")} is not tracked pid ${pid ?? "none"} or a descendant`
        );
      } else {
        console.log(`127.0.0.1:${PORT} listener=${v4.map((row) => row.pid).join(",")} tracked=${pid}`);
      }
    }
  }
  if (!alive(pid)) problems.push(`tracked vite pid ${pid ?? "none"} is not alive`);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log("doctor=ok");
}

function parentPid(pid) {
  const r = spawnSync("ps", ["-o", "ppid=", "-p", String(pid)], { encoding: "utf8" });
  const n = Number(String(r.stdout || "").trim());
  return Number.isFinite(n) ? n : null;
}

function isDescendant(pid, ancestor) {
  let current = pid;
  for (let i = 0; i < 8 && current && current > 1; i += 1) {
    if (current === ancestor) return true;
    current = parentPid(current);
  }
  return current === ancestor;
}

async function drive(routes) {
  const blocked = routes.filter((r) => PROTECTED.has(r.split("?")[0]));
  if (blocked.length) {
    throw new Error(`refusing protected routes: ${blocked.join(", ")}`);
  }
  const puppeteer = loadPuppeteer();
  const chrome = chromePath();
  if (!existsSync(chrome)) throw new Error(`Chrome binary missing: ${chrome}`);
  const runId = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = join(EVIDENCE, runId);
  mkdirSync(dir, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const report = [];
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const messages = [];
      const blockedUrls = [];
      const blockedExpected = [];
      const pending = [];
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const host = requestHost(request.url());
        if (host && host !== "127.0.0.1" && host !== "localhost") {
          const url = request.url();
          (isExpectedExternal(url) ? blockedExpected : blockedUrls).push(url);
          request.abort("blockedbyclient").catch(() => {});
          return;
        }
        request.continue().catch(() => {});
      });
      page.on("console", (msg) => {
        pending.push(
          (async () => {
            const values = [];
            for (const arg of msg.args()) {
              try {
                values.push(await arg.jsonValue());
              } catch {
                values.push(String(arg));
              }
            }
            const raw = msg.text();
            const subs = values.length && String(values[0]).includes("%s") ? values.slice(1) : values;
            let index = 0;
            const text = raw.includes("%s")
              ? raw.replace(/%s/g, () => {
                  const value = subs[index];
                  index += 1;
                  return typeof value === "string" ? value : JSON.stringify(value ?? "%s");
                })
              : raw;
            messages.push({ type: msg.type(), text });
          })()
        );
      });
      page.on("pageerror", (err) => {
        messages.push({ type: "pageerror", text: String(err) });
      });
      const selector = READY_SELECTORS[route] || "body";
      let loaded = false;
      let readinessNote;
      let response = null;
      let routeError;
      const shot = join(dir, `${route.replace(/\//g, "_") || "_root"}.png`);
      try {
        response = await page.goto(`${ORIGIN}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        if (route === "/sponsors") {
          await page.waitForSelector("body", { timeout: 15000 });
          const check = await page.evaluate(() => {
            const main = document.querySelector("main");
            if (main) return { via: "main", text: main.innerText.trim() };
            return { via: "body", text: document.body ? document.body.innerText.trim() : "" };
          });
          loaded = check.text.length > 0;
          readinessNote =
            check.via === "main"
              ? "main plus non-empty innerText"
              : "SponsorsPage has no id or main; used body plus non-empty innerText";
        } else {
          await page.waitForSelector(selector, { timeout: 15000 });
          loaded = true;
        }
        await new Promise((r) => setTimeout(r, 1000));
        await Promise.all(pending);
        await page.screenshot({ path: shot, fullPage: true });
      } catch (err) {
        loaded = false;
        routeError = err && err.message ? err.message : String(err);
      }
      const buckets = { expected: 0, known: 0, new: 0 };
      const fresh = [];
      for (const message of messages) {
        if (
          causedByBlocked(message.text, blockedUrls) ||
          causedByBlocked(message.text, blockedExpected) ||
          /net::ERR_BLOCKED_BY_CLIENT/.test(message.text)
        ) {
          continue;
        }
        const bucket = classify(message.text);
        buckets[bucket] += 1;
        if (bucket === "new") fresh.push(`[${message.type}] ${message.text}`);
      }
      buckets.new += blockedUrls.length;
      const row = {
        route,
        httpStatus: response ? response.status() : null,
        loaded,
        counts: buckets,
        readinessNote,
        error: routeError,
        blockedExpected,
        blocked: blockedUrls,
        newMessages: fresh,
        screenshot: shot,
      };
      report.push(row);
      console.log(JSON.stringify(row, null, 2));
      await page.close().catch(() => {});
    }
  } finally {
    await browser.close();
  }
  const reportPath = join(dir, "report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  const consolePath = join(dir, "console.log");
  writeFileSync(
    consolePath,
    report
      .map(
        (row) =>
          `## ${row.route}\n${row.newMessages.join("\n") || "(no NEW messages)"}\n\n### blockedExpected\n${row.blockedExpected.join("\n") || "(none)"}\n\n### blocked\n${row.blocked.join("\n") || "(none)"}`
      )
      .join("\n\n") + "\n"
  );
  console.log(`evidence=${dir}`);
  const anyNew = report.some((row) => row.counts.new > 0);
  const anyDown = report.some((row) => !row.loaded || row.httpStatus >= 400);
  if (anyNew || anyDown) process.exitCode = 1;
}

async function cleanup(removeEvidence) {
  const pid = readPid();
  let signalled = false;
  if (alive(pid) && !isOurServer(pid)) {
    discardStalePid(pid);
  } else if (alive(pid)) {
    try {
      process.kill(-pid, "SIGTERM");
    } catch {
      try {
        process.kill(pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
    signalled = true;
    console.log(`sent SIGTERM to process group ${pid}`);
  } else {
    console.log(`no live tracked pid (${pid ?? "none"})`);
  }
  if (existsSync(PID_FILE)) rmSync(PID_FILE);
  const deadline = Date.now() + 5000;
  let busyHosts = [];
  let remaining = signalled ? treePids(pid) : [];
  while (Date.now() < deadline) {
    busyHosts = [];
    for (const host of BIND_HOSTS) {
      if (await portInUse(host)) busyHosts.push(host);
    }
    remaining = signalled ? treePids(pid) : [];
    if (!busyHosts.length && !remaining.length) break;
    await new Promise((r) => setTimeout(r, 200));
  }
  if (busyHosts.length) {
    console.log(`port ${PORT} still in use on ${busyHosts.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log(`port ${PORT} free on 127.0.0.1 and ::1`);
  }
  if (remaining.length) {
    console.log(`process tree still running: ${remaining.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log("process tree clear");
  }
  if (removeEvidence && existsSync(EVIDENCE)) {
    rmSync(EVIDENCE, { recursive: true, force: true });
    console.log(`removed evidence ${EVIDENCE}`);
  } else if (existsSync(EVIDENCE)) {
    const runs = readdirSync(EVIDENCE);
    console.log(`evidence kept at ${EVIDENCE} (${runs.join(", ") || "empty"})`);
  }
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (cmd === "bootstrap") await bootstrap();
  else if (cmd === "launch") await launch();
  else if (cmd === "doctor") await doctor();
  else if (cmd === "drive") await drive(args.length ? args : DEFAULT_ROUTES);
  else if (cmd === "cleanup") await cleanup(args.includes("--evidence"));
  else {
    console.error("usage: verify.mjs bootstrap|launch|doctor|drive [routes...]|cleanup [--evidence]");
    process.exitCode = 2;
  }
} catch (err) {
  console.error(err.message || err);
  process.exitCode = 1;
}
