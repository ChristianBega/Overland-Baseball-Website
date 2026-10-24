#!/usr/bin/env node
// Structured run events for the overnight runner: one JSON object per line in events.jsonl.
//
//   node scripts/agents/events.mjs emit <event> [key=value ...] [key:=<json> ...]
//   node scripts/agents/events.mjs replay <night log dir>      # build_end lines for past logs, to stdout
//
// `emit` appends to $AGENTS_EVENTS and adds the common fields from the runner's env: ts (UTC),
// night (EV_NIGHT), run_id (EV_RUN_ID), repo (EV_REPO), source "runner", dry_run (EV_DRY_RUN=1).
// It never fails the caller: any error is one line on stderr and exit 0. summary.log stays the
// human log; this file is for the morning report (OV-130) and anything else that counts nights.
//
// Derived fields:
//   pick_json=<path>  adds the pick's model, cost_usd, turns, session_id from pick.json (then dropped)
//   picked=<lines>    "<KEY> <label,label>" per line (the runner's $PICKED) -> tickets[], labels{}
//   build_end + log=<stream log> (and no outcome=) -> parsed and classified from the stream, below
//   run_end           adds cost_usd_total: pick + builds of this run_id, from events.jsonl
//
// Privacy: events carry tool names and counts, never tool input or output text, and never a
// token (the token lives only in the git helper's and gh shim's own process).
//
// failure_class is a closed list. Add a value here by PR, never free text; an unlisted value is
// written as "unknown" with the raw value beside it. missed_run is reserved for the morning check.

import { appendFileSync, existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const FAILURE_CLASSES = [
  "none", "missed_run", "paused", "lock_held", "on_battery", "preflight_tool_missing",
  "preflight_config", "fetch_timeout", "push_url_unsafe", "token_mint", "pick_claude_failed",
  "pick_unparsable", "pick_empty", "claim_skip", "worktree_add", "auth_push", "build_fail",
  "verify_fail", "max_turns", "max_budget", "agent_error", "timeout", "no_pr", "sleep_stall", "unknown",
];
export const OUTCOMES = ["pr", "branch_only", "failed", "timeout", "skipped", "idle"];

// Real (wall) seconds minus the stream's own active time above this means the Mac slept.
const SLEPT_THRESHOLD_S = 300;
const AUTH_RE = /invalid username or token|bad credentials|http 401|401 unauthorized|authentication failed/i;
const BUILD_RE = /npm (ci|run build)\b/;
const VERIFY_RE = /verify\.mjs/;
const PUSH_RE = /\bgit push\b|\bgh /;

const CONFIG = join(dirname(fileURLToPath(import.meta.url)), "../../.claude/agents.config.json");

function parseArgs(args) {
  const o = {};
  for (const a of args) {
    const typed = a.match(/^([A-Za-z_][A-Za-z0-9_]*):=([\s\S]*)$/);
    const plain = a.match(/^([A-Za-z_][A-Za-z0-9_]*)=([\s\S]*)$/);
    if (typed) {
      try { o[typed[1]] = JSON.parse(typed[2]); } catch { o[typed[1]] = null; }
    } else if (plain) {
      o[plain[1]] = plain[2];
    }
  }
  return o;
}

function readLines(path) {
  const out = [];
  for (const l of readFileSync(path, "utf8").split("\n")) {
    if (!l.trim()) continue;
    try { out.push(JSON.parse(l)); } catch {}
  }
  return out;
}

const round2 = (n) => Math.round(n * 100) / 100;

function pickFields(path) {
  if (!path || !existsSync(path)) return {};
  let r;
  try { r = JSON.parse(readFileSync(path, "utf8")); } catch { return {}; }
  const models = Object.keys(r.modelUsage || {});
  return {
    model: models.length ? models.join(",") : null,
    cost_usd: typeof r.total_cost_usd === "number" ? r.total_cost_usd : null,
    turns: r.num_turns ?? null,
    session_id: r.session_id ?? null,
  };
}

function pickedFields(text) {
  const tickets = [], labels = {};
  for (const line of String(text).split("\n")) {
    const [k, l] = line.trim().split(/\s+/);
    if (!k) continue;
    tickets.push(k);
    labels[k] = l ? l.split(",").filter(Boolean) : [];
  }
  return { tickets, labels };
}

// The build_end fields from a stream-json log plus what the runner knows: rc, elapsed_s (wall),
// timed_out (watchdog flag) and claimed (the runner's claimed_by string: "PR #N", "branch b" or "").
export function buildEndFields(log, { rc = null, elapsed_s = null, timed_out = false, claimed = "" } = {}) {
  const lines = existsSync(log) ? readLines(log) : [];
  let init = null, result = null, pr = null, branch = null, gapMax = 0, prevTs = null, firstTs = null, lastTs = null;
  const commands = new Map(), errors = [];
  for (const j of lines) {
    if (j.type === "system" && j.subtype === "init") init = j;
    if (j.type === "result") result = j;
    if (j.type === "system" && j.subtype === "code_change_published") {
      if (j.identifier != null && /^\d+$/.test(String(j.identifier))) pr = Number(j.identifier);
      if (j.branch) branch = j.branch;
    }
    const t = j.timestamp ? Date.parse(j.timestamp) : NaN;
    if (!Number.isNaN(t)) {
      if (prevTs != null) gapMax = Math.max(gapMax, t - prevTs);
      prevTs = t;
      firstTs ??= t;
      lastTs = t;
    }
    for (const c of Array.isArray(j.message?.content) ? j.message.content : []) {
      if (c.type === "tool_use") commands.set(c.id, { name: c.name, command: String(c.input?.command ?? "") });
      if (c.type === "tool_result" && c.is_error) {
        const text = typeof c.content === "string" ? c.content : JSON.stringify(c.content ?? "");
        errors.push({ ...(commands.get(c.tool_use_id) || {}), text });
      }
    }
  }

  const claimedPr = String(claimed).match(/^PR #(\d+)/);
  const claimedBranch = String(claimed).match(/^branch (\S+)/);
  pr ??= claimedPr ? Number(claimedPr[1]) : null;
  branch ??= claimedBranch ? claimedBranch[1] : null;

  const span_s = firstTs != null ? Math.round((lastTs - firstTs) / 1000) : null;
  const active_s = typeof result?.duration_ms === "number" ? Math.round(result.duration_ms / 1000) : null;
  const slept = elapsed_s != null && active_s != null ? elapsed_s - active_s > SLEPT_THRESHOLD_S : null;
  const subtype = result?.subtype ?? null;
  const denials = result?.permission_denials || [];

  const subtypeClass =
    !result ? "agent_error"
    : subtype === "error_max_turns" ? "max_turns"
    : subtype === "error_max_budget_usd" ? "max_budget"
    : subtype !== "success" || result.is_error ? "agent_error"
    : null;

  let outcome, failure_class;
  if (timed_out) {
    outcome = "timeout";
    failure_class = "timeout";
  } else if (pr != null) {
    outcome = "pr";
    failure_class = subtypeClass || "none";
  } else {
    outcome = branch ? "branch_only" : "failed";
    const resultText = String(result?.result ?? "");
    failure_class =
      errors.some((e) => PUSH_RE.test(e.command) && AUTH_RE.test(e.text)) || AUTH_RE.test(resultText) ? "auth_push"
      : subtypeClass ? subtypeClass
      : rc != null && rc !== 0 ? "agent_error"
      : errors.some((e) => BUILD_RE.test(e.command)) ? "build_fail"
      : errors.some((e) => VERIFY_RE.test(e.command)) ? "verify_fail"
      : slept ? "sleep_stall"
      : "no_pr";
  }

  return {
    ticket: undefined,
    model: init?.model ?? null,
    mcp: init ? (init.mcp_servers || []).map((m) => m.name) : null,
    session_id: init?.session_id ?? result?.session_id ?? null,
    outcome,
    failure_class,
    rc,
    result_subtype: subtype,
    turns: result?.num_turns ?? null,
    cost_usd: typeof result?.total_cost_usd === "number" ? result.total_cost_usd : null,
    denials: denials.length,
    denied_tools: denials.map((d) => d.tool_name),
    tool_errors: errors.length,
    pr,
    branch,
    elapsed_s,
    active_s,
    span_s,
    gap_max_s: firstTs != null ? Math.round(gapMax / 1000) : null,
    slept,
    log,
  };
}

function runCost(eventsPath, runId) {
  if (!runId || !existsSync(eventsPath)) return null;
  let total = 0;
  for (const e of readLines(eventsPath)) {
    if (e.run_id === runId && (e.event === "pick" || e.event === "build_end") && typeof e.cost_usd === "number") total += e.cost_usd;
  }
  return round2(total);
}

function emit(event, args) {
  const env = process.env;
  const path = env.AGENTS_EVENTS;
  if (!path) throw new Error("AGENTS_EVENTS not set");
  let fields = parseArgs(args);

  if ("pick_json" in fields) {
    const { pick_json, ...rest } = fields;
    fields = { ...pickFields(pick_json), ...rest };
  }
  if ("picked" in fields) {
    const { picked, ...rest } = fields;
    fields = { ...rest, ...pickedFields(picked) };
  }
  if (event === "build_end" && fields.log && !fields.outcome) {
    const { ticket, log, rc, elapsed_s, timed_out, claimed, ...rest } = fields;
    fields = { ...buildEndFields(log, { rc, elapsed_s, timed_out: timed_out === true, claimed: claimed ?? "" }), ...rest, ticket };
  }
  if (typeof fields.tickets === "string") fields.tickets = fields.tickets.split(/\s+/).filter(Boolean);
  if (event === "run_end") fields.cost_usd_total = runCost(path, env.EV_RUN_ID);

  if ("failure_class" in fields && !FAILURE_CLASSES.includes(fields.failure_class)) {
    fields.failure_class_raw = fields.failure_class;
    fields.failure_class = "unknown";
  }
  if ("outcome" in fields && !OUTCOMES.includes(fields.outcome)) {
    fields.outcome_raw = fields.outcome;
    fields.outcome = "failed";
  }

  const line = {
    ts: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    night: env.EV_NIGHT || null,
    run_id: env.EV_RUN_ID || null,
    repo: env.EV_REPO || null,
    source: "runner",
    event,
    ...(env.EV_DRY_RUN === "1" ? { dry_run: true } : {}),
    ...fields,
  };
  for (const k of Object.keys(line)) if (line[k] === undefined) delete line[k];
  appendFileSync(path, JSON.stringify(line) + "\n");
}

// Replay a night folder: build_end for each <KEY>.log, with rc / timeout / PR taken from that
// ticket's summary.log result line and elapsed from its `elapsed=` (or the stream span before #152).
function replay(dir) {
  const key = JSON.parse(readFileSync(CONFIG, "utf8")).jira.projectKey;
  const fileRe = new RegExp("^(" + key + "-\\d+)\\.log$");
  const summary = existsSync(join(dir, "summary.log")) ? readFileSync(join(dir, "summary.log"), "utf8").split("\n") : [];
  for (const f of readdirSync(dir).sort()) {
    const m = f.match(fileRe);
    if (!m) continue;
    const k = m[1];
    const res = summary.find((l) => new RegExp("^\\S+ " + k + ": (done|FAIL exit \\d+|TIMEOUT after \\d+ s);").test(l)) || "";
    const rcM = res.match(/FAIL exit (\d+)/);
    const elM = res.match(/ elapsed=(\d+)s;/);
    const claimed = (res.match(/; (PR #\d+|branch \S+|no PR found); log /) || [])[1] || "";
    const log = join(dir, f);
    let fields = buildEndFields(log, { rc: rcM ? Number(rcM[1]) : 0, timed_out: /TIMEOUT after/.test(res), claimed });
    const elapsed_s = elM ? Number(elM[1]) : fields.span_s;
    fields = buildEndFields(log, { rc: fields.rc, elapsed_s, timed_out: /TIMEOUT after/.test(res), claimed });
    console.log(JSON.stringify({ event: "build_end", replay: true, ...fields, ticket: k }));
  }
}

// CLI only when run directly, so report.mjs can import the enums without emitting anything.
let direct = false;
try { direct = realpathSync(process.argv[1] || "") === realpathSync(fileURLToPath(import.meta.url)); } catch {}

const [cmd, ...rest] = direct ? process.argv.slice(2) : [];
if (direct) {
  try {
    if (cmd === "emit" && rest[0]) emit(rest[0], rest.slice(1));
    else if (cmd === "replay" && rest[0]) replay(rest[0]);
    else throw new Error("usage: events.mjs emit <event> [k=v ...] | replay <dir>");
  } catch (e) {
    process.stderr.write(`events: ${e.message}\n`);
    if (cmd === "replay") process.exit(1);
  }
}
