#!/usr/bin/env node
// Morning report for the overnight runner (OV-130): reads events.jsonl, sweeps GitHub read-only for
// each PR the runner built or skipped, appends what changed, and prints a Markdown report.
//
//   node scripts/agents/report.mjs [--night YYYY-MM-DD] [--days 7] [--no-sweep] [--out <file>]
//                                  [--events <events.jsonl>] [--morning]
//
// events.jsonl: --events, else $AGENTS_EVENTS, else $AGENTS_LOG_DIR/events.jsonl (same default dir
// as overnight.sh). --night defaults to today (the runner's night is the local date at 01:00).
//
// The sweep only reads GitHub, through `gh` and the caller's own login, behind ghGet(), which
// refuses any write flag. It appends source:"sweep" events with a `key`; a key already in the file
// is never written again, so running the report twice appends nothing new:
//   review     the latest claude[bot] "Verdict:" comment (key: pr + comment id + updated_at)
//   fix_round  each review-round-N label (key: pr + label + labeled at)
//   pr_state   the whole PR view (key: pr + hash of state, merged_at, labels, approval, auto-merge
//              and required-check conclusions). With --no-sweep or gh unavailable, the report
//              falls back to the latest pr_state in the file.
//
// --morning (the 06:30 launchd job, launchd/install.sh) writes the report to <events dir>/<night>/
// report.md instead of stdout and appends one source:"morning" morning_check event: runs_seen (runner
// runs with a run_start/run_end/run_abort), failure_class missed_run when there were none (else
// none), night_status and abort_classes. Its key is night + runs_seen + class, so a re-run with the
// same result appends nothing. Without --night, a --morning run before $AGENTS_AT (the nightly slot,
// HH:MM) reports yesterday: launchd runs a 06:30 job missed during sleep at the next wake, which can
// be the 00:55 wake before tonight's run. Last, it runs `notify.mjs morning <report.md>` (Slack,
// non-fatal; see notify.mjs).
//
// It never fails the caller: missing data is stated in the report, and it always exits 0.

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { FAILURE_CLASSES } from "./events.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const CONFIG = join(ROOT, ".claude/agents.config.json");
const REVIEWER = "claude[bot]"; // Claude Review posts as the Claude GitHub App
const VERDICT_RE = /^Verdict: (ready|changes-requested|needs-human)\b/m;
// Classes that don't break a clean night.
const CLEAN_CLASSES = new Set(["none", "claim_skip"]);
// Idle nights (nothing to do) are neutral for the streak.
const NEUTRAL_IDLE = new Set(["paused", "pick_empty", "claim_skip", "lock_held"]);

// ---------- args, config, events ----------

function parseArgs(argv) {
  const o = { days: 7, sweep: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--no-sweep") o.sweep = false;
    else if (a === "--morning") o.morning = true;
    else if (a === "--night") o.night = argv[++i];
    else if (a === "--days") o.days = Math.max(1, Number(argv[++i]) || 7);
    else if (a === "--out") o.out = argv[++i];
    else if (a === "--events") o.events = argv[++i];
  }
  return o;
}

function localDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// The night a --morning run reports: today, or yesterday when it runs before the nightly slot.
function morningNight(now = new Date()) {
  const m = String(process.env.AGENTS_AT || "").match(/^(\d{1,2}):(\d{2})$/);
  if (m && now.getHours() * 60 + now.getMinutes() < Number(m[1]) * 60 + Number(m[2])) {
    return localDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12));
  }
  return localDate(now);
}

function eventsPath(opt) {
  if (opt.events) return opt.events;
  if (process.env.AGENTS_EVENTS) return process.env.AGENTS_EVENTS;
  const name = basename(ROOT);
  const dir = process.env.AGENTS_LOG_DIR
    || (process.platform === "darwin"
      ? join(homedir(), "Library/Logs", `${name}-agents`)
      : join(process.env.XDG_STATE_HOME || join(homedir(), ".local/state"), `${name}-agents`));
  return join(dir, "events.jsonl");
}

function readEvents(path) {
  if (!existsSync(path)) return { events: [], note: `events file not found: ${path}` };
  const events = [];
  let bad = 0;
  for (const l of readFileSync(path, "utf8").split("\n")) {
    if (!l.trim()) continue;
    try { events.push(JSON.parse(l)); } catch { bad++; }
  }
  const note = events.length ? (bad ? `${bad} unparsable line(s) skipped` : null) : `events file is empty: ${path}`;
  return { events, note };
}

function readConfig() {
  try { return JSON.parse(readFileSync(CONFIG, "utf8")); } catch { return {}; }
}

// ---------- read-only gh ----------

const WRITE_FLAGS = /^(-X|--method|-f|-F|--field|--raw-field|--input)(=|$)|^-[XfF]./;

// GET-only `gh api`: argv array (no shell), write flags refused, bounded time. Returns parsed
// NDJSON lines (callers pass --jq '.[]' or similar) or throws a short message without gh's output.
function ghGet(path, jq) {
  const args = ["api", "--method", "GET", "--paginate", path, "--jq", jq];
  if ([path, jq].some((a) => WRITE_FLAGS.test(a)) || /^-/.test(path)) throw new Error("refused non-GET gh call");
  const r = spawnSync("gh", args, { encoding: "utf8", timeout: 30000, maxBuffer: 32 * 1024 * 1024 });
  if (r.error) throw new Error(r.error.code === "ENOENT" ? "gh not found" : `gh failed (${r.error.code || "error"})`);
  if (r.status !== 0) throw new Error(`gh exited ${r.status}`);
  const out = [];
  // jq prints strings raw, everything else as JSON.
  for (const l of r.stdout.split("\n")) {
    if (!l.trim()) continue;
    try { out.push(JSON.parse(l)); } catch { out.push(l); }
  }
  return out;
}

function repoFromGit() {
  const r = spawnSync("git", ["-C", ROOT, "remote", "get-url", "origin"], { encoding: "utf8", timeout: 5000 });
  if (r.status !== 0) return null;
  return r.stdout.trim().replace(/^[a-z+]+:\/\/([^@/]*@)?[^/]+\//, "").replace(/^[^@/]*@[^:]*:/, "").replace(/\.git$/, "") || null;
}

// ---------- sweep ----------

function sweepPr(repo, n, ctx) {
  const R = `repos/${repo}`;
  const [pr] = ghGet(`${R}/pulls/${n}`,
    "{state,draft,merged_at,created_at,closed_at,head_ref:.head.ref,head_sha:.head.sha,labels:[.labels[].name],auto_merge:(.auto_merge != null)}");
  const timeline = ghGet(`${R}/issues/${n}/timeline?per_page=100`,
    ".[] | {event, at:(.created_at // .submitted_at), actor_type:(.actor.type // .user.type), label:.label.name, state}");
  const comments = ghGet(`${R}/issues/${n}/comments?per_page=100`,
    `.[] | select(.user.login == "${REVIEWER}") | {id, updated_at, body}`);
  const runs = ghGet(`${R}/commits/${pr.head_sha}/check-runs?filter=all&per_page=100`,
    ".check_runs[] | {name, status, conclusion, completed_at}");

  // Required checks: the latest run per name on the head commit.
  const latest = {};
  for (const c of runs.sort((a, b) => String(a.completed_at).localeCompare(String(b.completed_at)))) latest[c.name] = c;
  const names = ctx.required || Object.keys(latest).sort();
  const checks = {};
  for (const name of names) {
    const c = latest[name];
    checks[name] = !c ? "missing" : c.status !== "completed" ? "pending" : c.conclusion;
  }

  // Verdict: the latest claude[bot] comment with a Verdict line.
  let review = null;
  for (const c of comments) {
    const m = String(c.body).match(VERDICT_RE);
    if (m && (!review || c.updated_at >= review.updated_at)) review = { comment_id: c.id, updated_at: c.updated_at, verdict: m[1] };
  }

  const L = ctx.labels;
  const rounds = timeline.filter((t) => t.event === "labeled" && L.rounds.includes(t.label)).map((t) => ({ round: t.label, at: t.at }));
  let approved = false;
  for (const t of timeline) {
    if (t.event === "reviewed" && t.state === "approved" && t.actor_type === "User") approved = true;
    if (t.event === "review_dismissed" || (t.event === "reviewed" && t.state === "changes_requested")) approved = false;
  }

  // baseline-change wait, over every commit of the PR (an auto-fix push can start a second one):
  // an episode opens at a red guard check after the PR was ready and closes at the next human
  // baseline label (a wait) or a green guard run without one (no wait).
  const readyAt = timeline.find((t) => t.event === "ready_for_review")?.at || pr.created_at;
  const shas = ghGet(`${R}/pulls/${n}/commits?per_page=100`, ".[].sha");
  const guardRuns = [];
  for (const s of shas) {
    const rs = s === pr.head_sha ? runs : ghGet(`${R}/commits/${s}/check-runs?filter=all&per_page=100`,
      ".check_runs[] | {name, status, conclusion, completed_at}");
    for (const c of rs) if (c.name === ctx.guardCheck && c.completed_at && c.completed_at >= readyAt) guardRuns.push(c);
  }
  const marks = [
    ...guardRuns.filter((c) => c.conclusion === "failure").map((c) => ({ at: c.completed_at, k: "red" })),
    ...guardRuns.filter((c) => c.conclusion === "success").map((c) => ({ at: c.completed_at, k: "green" })),
    ...timeline.filter((t) => t.event === "labeled" && t.label === L.baseline && t.actor_type === "User" && t.at >= readyAt)
      .map((t) => ({ at: t.at, k: "label" })),
  ].sort((a, b) => a.at.localeCompare(b.at) || (a.k === "label" ? -1 : 1));
  const episodes = [];
  let open = null;
  for (const m of marks) {
    if (m.k === "red") open ??= m.at;
    else if (open && m.k === "label") { episodes.push([open, m.at]); open = null; }
    else if (open && m.k === "green") open = null;
  }

  return {
    pr: n,
    ticket: ctx.tickets.get(n) || null,
    state: pr.merged_at ? "merged" : pr.state === "open" && pr.draft ? "draft" : pr.state,
    created_at: pr.created_at,
    merged_at: pr.merged_at,
    head_ref: pr.head_ref,
    labels: [...pr.labels].sort(),
    auto_merge: pr.auto_merge,
    approved,
    checks,
    verdict: review?.verdict || null,
    review,
    rounds,
    guard_red_at: episodes[0]?.[0] || open,
    baseline_label_at: episodes.at(-1)?.[1] || null,
    baseline_waits: episodes.map(([a, b]) => Math.round(secs(a, b))),
    guard_waiting_since: pr.merged_at || pr.state === "closed" ? null : open,
  };
}

const sha = (o) => createHash("sha1").update(JSON.stringify(o)).digest("hex").slice(0, 12);

function sweepEvents(view, base) {
  const out = [];
  const common = { ...base, pr: view.pr, ticket: view.ticket };
  if (view.review) {
    out.push({ ...common, event: "review", key: `review:${view.pr}:${view.review.comment_id}:${view.review.updated_at}`,
      comment_id: view.review.comment_id, verdict: view.review.verdict, updated_at: view.review.updated_at });
  }
  for (const r of view.rounds) out.push({ ...common, event: "fix_round", key: `fix_round:${view.pr}:${r.round}:${r.at}`, round: r.round, at: r.at });
  const { review, ...state } = view;
  const h = sha([view.state, view.merged_at, view.labels, view.approved, view.auto_merge, view.checks]);
  out.push({ ...common, ...state, event: "pr_state", key: `pr_state:${view.pr}:${h}` });
  return out;
}

// ---------- derive ----------

const isReal = (e) => e.dry_run !== true;
const fmtCost = (n) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");
const r2 = (n) => Math.round(n * 100) / 100;

function fmtDur(s) {
  if (s == null || !Number.isFinite(s)) return "—";
  s = Math.round(s);
  if (s < 60) return `${s} s`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} m`;
  return `${Math.floor(m / 60)} h ${m % 60} m`;
}
const secs = (a, b) => (a && b ? (Date.parse(b) - Date.parse(a)) / 1000 : null);
const median = (xs) => {
  const v = xs.filter((x) => x != null).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
};
const addDays = (night, d) => {
  const t = new Date(`${night}T12:00:00Z`);
  t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};

// Per-ticket rows for one night: builder cost + an equal share of each run's pick cost.
function nightRows(evs) {
  const rows = [];
  const pickCost = {}, builtPerRun = {};
  for (const e of evs) {
    if (e.event === "pick" && typeof e.cost_usd === "number") pickCost[e.run_id] = (pickCost[e.run_id] || 0) + e.cost_usd;
    if (e.event === "build_end") builtPerRun[e.run_id] = (builtPerRun[e.run_id] || 0) + 1;
  }
  for (const e of evs) {
    if (e.event !== "build_end" && e.event !== "claim_skip") continue;
    const share = e.event === "build_end" && pickCost[e.run_id] != null ? pickCost[e.run_id] / builtPerRun[e.run_id] : 0;
    const prM = e.event === "claim_skip" ? String(e.reason || "").match(/PR #(\d+)/) : null;
    rows.push({
      ticket: e.ticket,
      model: e.event === "build_end" ? e.model : null,
      outcome: e.outcome,
      failure_class: e.failure_class,
      turns: e.turns ?? null,
      cost: e.event === "build_end" ? (typeof e.cost_usd === "number" ? r2(e.cost_usd + share) : null) : null,
      pr: e.pr ?? (prM ? Number(prM[1]) : null),
      slept: e.slept === true,
      skipped: e.event === "claim_skip",
    });
  }
  return rows;
}

function waitingOn(v, L, guardCheck) {
  if (!v) return [];
  if (v.state === "merged" || v.state === "closed") return [];
  const w = [];
  if (v.labels.includes(L.needsHuman)) w.push(L.needsHuman);
  if (v.state === "draft") w.push("draft: mark ready");
  for (const [name, c] of Object.entries(v.checks)) {
    if (c !== "failure" && c !== "cancelled" && c !== "timed_out") continue;
    if (name === guardCheck && !v.labels.includes(L.baseline)) w.push(`${L.baseline} needed`);
    else w.push(`${name} red`);
  }
  const green = Object.values(v.checks).every((c) => c === "success" || c === "skipped");
  if (v.approved && !v.auto_merge) w.push("approved, not merged (auto-merge off)");
  if (!w.length && !v.approved && v.state === "open") w.push(green ? `review + approve (verdict ${v.verdict || "none"})` : "checks running");
  return w;
}

// A night's status for the streak: "missed", "idle", "clean" or "dirty" (with reasons).
function nightStatus(evs, views, L) {
  const real = evs.filter(isReal);
  const runner = real.filter((e) => (e.source || "runner") === "runner");
  if (!runner.some((e) => e.event === "run_start" || e.event === "run_end" || e.event === "run_abort")) return { status: "missed", why: ["no run_start/run_end/run_abort"] };
  const ends = runner.filter((e) => e.event === "run_end");
  const aborts = runner.filter((e) => e.event === "run_abort");
  const builds = runner.filter((e) => e.event === "build_end");
  // A run_abort is never idle: it lands in why via its failure_class below.
  if (!aborts.length && !builds.length && ends.length && ends.every((e) => e.outcome === "idle" && NEUTRAL_IDLE.has(e.failure_class))) {
    return { status: "idle", why: [ends.map((e) => e.failure_class).join(",")] };
  }
  const why = [];
  for (const e of runner) if (e.failure_class && !CLEAN_CLASSES.has(e.failure_class)) why.push(`${e.event} ${e.ticket || ""} ${e.failure_class}`.replace(/\s+/g, " "));
  for (const b of builds) {
    if (b.outcome !== "pr") why.push(`${b.ticket} no PR`);
    if (b.slept === true) why.push(`${b.ticket} slept`);
    const v = b.pr != null ? views.get(b.pr) : null;
    if (v?.labels.includes(L.needsHuman)) why.push(`#${b.pr} ${L.needsHuman}`);
  }
  if (!builds.length) why.push("no builds");
  return { status: why.length ? "dirty" : "clean", why };
}

// ---------- morning check ----------

// Write <events dir>/<night>/report.md and append the night's morning_check event (once per result).
function morningCheck({ path, night, tonight, st, repo, text, keys }) {
  const report = join(dirname(path), night, "report.md");
  try {
    mkdirSync(dirname(report), { recursive: true });
    writeFileSync(report, text);
  } catch (e) {
    process.stderr.write(`report: could not write ${report} (${e.code || e.message})\n`);
    process.stdout.write(text);
  }
  const runs = new Set(tonight.filter((e) => e.event === "run_start" || e.event === "run_end" || e.event === "run_abort")
    .map((e) => e.run_id || `${e.event}@${e.ts}`));
  const failure_class = runs.size ? "none" : "missed_run";
  const key = `morning_check:${night}:${runs.size}:${failure_class}`;
  if (!keys.has(key)) appendMorningCheck(path, {
    ts: new Date().toISOString().replace(/\.\d+Z$/, "Z"), night, run_id: null, repo: repo || null, source: "morning",
    event: "morning_check", runs_seen: runs.size, failure_class, night_status: st.status,
    abort_classes: [...new Set(tonight.filter((e) => e.event === "run_abort").map((e) => e.failure_class))],
    report, key,
  });
  // Slack after the event, so the message can lead with a missed-run alert. Never fatal.
  const r = spawnSync(process.execPath, [join(ROOT, "scripts/agents/notify.mjs"), "morning", report],
    { stdio: ["ignore", "ignore", "inherit"], timeout: 30000 });
  if (r.error) process.stderr.write(`report: notify failed (${r.error.code || "error"})\n`);
}

function appendMorningCheck(path, ev) {
  try {
    mkdirSync(dirname(path), { recursive: true });
    appendFileSync(path, JSON.stringify(ev) + "\n");
  } catch (e) {
    process.stderr.write(`report: could not append morning_check (${e.code || e.message})\n`);
  }
}

// ---------- main ----------

function main() {
  const opt = parseArgs(process.argv.slice(2));
  const night = /^\d{4}-\d{2}-\d{2}$/.test(opt.night || "") ? opt.night : opt.morning ? morningNight() : localDate();
  const cfg = readConfig();
  const gl = cfg.labels?.github || {};
  const L = {
    needsHuman: gl.needsHuman || "needs-human",
    baseline: gl.baselineChange || "baseline-change",
    rounds: gl.reviewRounds || [],
  };
  const keyRe = new RegExp(`^${cfg.jira?.projectKey || "[A-Z][A-Z0-9]+"}-\\d+$`);
  const path = eventsPath(opt);
  const { events: all, note: readNote } = readEvents(path);
  const events = all.filter(isReal);
  const notes = [];
  if (readNote) notes.push(readNote);
  const dryCount = all.length - events.length;
  if (dryCount) notes.push(`${dryCount} dry-run event(s) ignored`);

  const from = addDays(night, -(opt.days - 1));
  const tracked = events.map((e) => e.night).filter(Boolean).sort();
  const firstTracked = tracked[0] || null;
  // Nights before the first tracked one are unknown, not missed; with nothing tracked, only tonight counts.
  const windowFrom = !firstTracked ? night : firstTracked > from ? firstTracked : from;
  const inWindow = (n) => n && n >= windowFrom && n <= night;

  // PRs to look at: built or claim-skipped in the window.
  const tickets = new Map();
  for (const e of events) {
    if (!inWindow(e.night)) continue;
    if (e.event === "build_end" && e.pr != null) tickets.set(e.pr, e.ticket);
    const m = e.event === "claim_skip" && String(e.reason || "").match(/PR #(\d+)/);
    if (m) tickets.set(Number(m[1]), e.ticket);
  }
  for (const [pr, t] of tickets) if (t && !keyRe.test(t)) tickets.set(pr, null);

  // Last sweep state per PR from the file (the fallback).
  const lastState = new Map();
  for (const e of events) if (e.event === "pr_state" && tickets.has(e.pr)) lastState.set(e.pr, e);

  const views = new Map();
  let sweepNote = null, appended = 0;
  const repo = [...events].reverse().find((e) => e.repo)?.repo || repoFromGit();
  if (!opt.sweep) sweepNote = "GitHub sweep skipped (--no-sweep)";
  else if (!repo) sweepNote = "GitHub sweep unavailable: repo unknown";
  else if (tickets.size) {
    try {
      let required = null;
      try {
        required = ghGet(`repos/${repo}/rules/branches/${cfg.repo?.baseBranch || "development"}`,
          '.[] | select(.type == "required_status_checks") | .parameters.required_status_checks[].context');
        if (!required.length) required = null;
      } catch (e) {
        if (/not found|failed/.test(e.message)) throw e;
      }
      if (!required) notes.push("required checks unknown: showing every check on the head commit");
      // The guard check is the required check that reacts to the baseline label; by convention its
      // name is the qa-guard job. Without required checks, fall back to that name.
      const guardCheck = (required || []).find((c) => /guard/.test(c)) || "qa-guard";
      const ctx = { required, labels: L, tickets, guardCheck };
      const keys = new Set(events.map((e) => e.key).filter(Boolean));
      const base = { ts: new Date().toISOString().replace(/\.\d+Z$/, "Z"), run_id: null, repo, source: "sweep" };
      const fresh = [];
      for (const n of [...tickets.keys()].sort((a, b) => a - b)) {
        let v;
        try { v = sweepPr(repo, n, ctx); } catch (e) { notes.push(`#${n}: sweep failed (${e.message})`); continue; }
        v.guard_check = guardCheck;
        views.set(n, v);
        const prNight = events.find((e) => (e.pr === n || String(e.reason || "").includes(`PR #${n}`)) && e.night)?.night || null;
        for (const ev of sweepEvents(v, { ...base, night: prNight })) if (!keys.has(ev.key)) { keys.add(ev.key); fresh.push(ev); }
      }
      if (fresh.length && existsSync(path)) {
        try { appendFileSync(path, fresh.map((e) => JSON.stringify(e)).join("\n") + "\n"); appended = fresh.length; }
        catch (e) { notes.push(`could not append sweep events (${e.code || e.message})`); }
      }
    } catch (e) {
      sweepNote = `GitHub sweep unavailable: ${e.message}`;
    }
  }
  let fromFile = 0;
  for (const [n, s] of lastState) if (!views.has(n)) { views.set(n, s); fromFile++; }
  if (sweepNote && fromFile) sweepNote += `; PR state below is from the last sweep in events.jsonl`;
  else if (sweepNote && tickets.size) sweepNote += "; no earlier sweep in events.jsonl, so PR state is unknown";

  // ---------- render ----------
  const out = [];
  const tonight = events.filter((e) => e.night === night && (e.source || "runner") === "runner");
  const st = nightStatus(tonight, views, L);
  out.push(`## Morning report — night ${night}`, "");
  out.push(`Generated ${new Date().toISOString().replace(/\.\d+Z$/, "Z")} from \`${path}\`.`);
  if (sweepNote) out.push(`**${sweepNote}.**`);
  else if (tickets.size) out.push(`GitHub sweep: ${views.size - fromFile} PR(s) checked, ${appended} new sweep event(s) appended.`);
  for (const n of notes) out.push(`- Note: ${n}`);
  out.push("");

  out.push("### Last night", "");
  const runStarts = tonight.filter((e) => e.event === "run_start");
  const runEnds = tonight.filter((e) => e.event === "run_end");
  const aborts = tonight.filter((e) => e.event === "run_abort");
  if (st.status === "missed") {
    out.push(`**No run recorded for ${night}** (no \`run_start\` or \`run_end\` in events.jsonl): the 01:00 slot did not fire, or the events file is missing.`, "");
  } else {
    const total = runEnds.reduce((s, e) => s + (typeof e.cost_usd_total === "number" ? e.cost_usd_total : 0), 0);
    out.push(`Runs: ${runEnds.length} finished (${runStarts.length} started)` +
      (aborts.length ? `, ${aborts.length} aborted (${aborts.map((a) => `\`${a.failure_class}\`${a.reason ? ": " + a.reason : ""}`).join("; ")})` : "") +
      `. Run cost ${fmtCost(r2(total))} (pick + builds; CI n/a (OV-131)). Night: **${st.status}**${st.why.length && st.status !== "clean" ? ` (${st.why.join("; ")})` : ""}.`, "");
    for (const e of runEnds) if (e.outcome === "idle") out.push(`- Idle run: \`${e.failure_class}\``);
    const rows = nightRows(tonight);
    if (rows.length) {
      out.push("| Ticket | Model | Outcome | Class | Turns | Cost | PR | Checks | Verdict | Rounds | Waiting on you |");
      out.push("|---|---|---|---|---|---|---|---|---|---|---|");
      for (const r of rows) {
        const v = r.pr != null ? views.get(r.pr) : null;
        const checks = v ? Object.entries(v.checks).map(([k, c]) => `${k} ${c === "success" ? "✓" : c === "failure" ? "✗" : c}`).join(", ") : "unknown";
        const wait = v ? waitingOn(v, L, v.guard_check || "qa-guard") : [];
        const prCell = r.pr != null ? `#${r.pr}${v ? ` (${v.state})` : ""}` : "—";
        out.push(`| ${r.ticket || "?"} | ${r.model || (r.skipped ? "(skipped)" : "?")} | ${r.outcome} | ${r.failure_class} | ${r.turns ?? "—"} | ${r.skipped ? "—" : fmtCost(r.cost)} | ${prCell} | ${checks} | ${v?.verdict || "—"} | ${v ? v.rounds.length : "—"} | ${wait.join("; ") || "—"} |`);
      }
      out.push("");
      for (const r of rows) {
        const v = r.pr != null ? views.get(r.pr) : null;
        if (!v?.guard_red_at) continue;
        const w = v.baseline_waits || [];
        out.push(`- #${r.pr}: \`${v.guard_check || "qa-guard"}\` red from ${v.guard_red_at}` +
          (w.length ? `; human \`${L.baseline}\` wait ${w.map(fmtDur).join(" + ")}${w.length > 1 ? ` (${w.length} episodes, a push re-opened it)` : ""}, last label ${v.baseline_label_at}` : "") +
          (v.guard_waiting_since ? `; waiting for \`${L.baseline}\` since ${v.guard_waiting_since}` : "") +
          (v.merged_at ? `; merged ${v.merged_at}` : "") + ".");
      }
    } else out.push("No builds or skips this night.");
    out.push("");
  }

  // Everything open from the window that still needs the owner.
  const waiting = [...views.values()].filter((v) => v.pr != null && v.state !== "merged" && v.state !== "closed")
    .map((v) => ({ v, w: waitingOn(v, L, v.guard_check || "qa-guard") })).filter((x) => x.w.length);
  out.push("### Waiting on you", "");
  if (waiting.length) for (const { v, w } of waiting) out.push(`- #${v.pr}${v.ticket ? ` ${v.ticket}` : ""}: ${w.join("; ")}`);
  else out.push(views.size || !tickets.size ? "Nothing." : "Unknown (no PR state).");
  out.push("");

  // ---------- trailing window ----------
  out.push(`### Trailing window: ${windowFrom} → ${night}` + (windowFrom > from ? ` (events start ${firstTracked}; ${opt.days}-day window clipped)` : ""), "");
  const nights = [];
  for (let d = windowFrom; d && d <= night; d = addDays(d, 1)) nights.push(d);
  const byNight = new Map(nights.map((n) => [n, events.filter((e) => e.night === n && (e.source || "runner") === "runner")]));
  const builds = events.filter((e) => inWindow(e.night) && e.event === "build_end" && (e.source || "runner") === "runner");
  const allRows = nights.flatMap((n) => nightRows(byNight.get(n)).filter((r) => !r.skipped));

  const perTicket = new Map(), perModel = new Map();
  for (const r of allRows) {
    if (typeof r.cost === "number") {
      perTicket.set(r.ticket, r2((perTicket.get(r.ticket) || 0) + r.cost));
      perModel.set(r.model || "?", r2((perModel.get(r.model || "?") || 0) + r.cost));
    }
  }
  const ok = builds.filter((b) => b.outcome === "pr").length;
  const hist = {};
  for (const e of events) {
    if (!inWindow(e.night) || (e.source || "runner") !== "runner" || !e.failure_class || e.failure_class === "none") continue;
    if (e.event === "build_end" || e.event === "run_abort" || (e.event === "run_end" && e.outcome === "idle")) {
      const k = FAILURE_CLASSES.includes(e.failure_class) ? e.failure_class : "unknown";
      hist[k] = (hist[k] || 0) + 1;
    }
  }
  const prViews = [...views.values()];
  const ttm = prViews.filter((v) => v.merged_at).map((v) => secs(v.created_at, v.merged_at));
  const waits = prViews.flatMap((v) => v.baseline_waits || []);
  const waitPrs = prViews.filter((v) => (v.baseline_waits || []).length).length;
  const openGuard = prViews.filter((v) => v.guard_waiting_since).length;
  const needsHuman = prViews.filter((v) => v.labels.includes(L.needsHuman)).length;
  const sleptNights = nights.filter((n) => byNight.get(n).some((e) => e.event === "build_end" && e.slept === true));
  const statuses = nights.map((n) => ({ n, ...nightStatus(byNight.get(n), views, L) }));
  // Phase C's morning_check can also mark a night missed.
  const mcMissed = new Set(events.filter((e) => e.event === "morning_check" && e.failure_class === "missed_run").map((e) => e.night));
  const missed = statuses.filter((s) => s.status === "missed" || mcMissed.has(s.n)).map((s) => s.n);
  let streak = 0;
  for (const s of [...statuses].reverse()) {
    if (s.status === "idle") continue;
    if (s.status === "clean" && !mcMissed.has(s.n)) streak++;
    else break;
  }

  const kv = (m) => [...m].map(([k, v]) => `${k} ${fmtCost(v)}`).join(", ") || "—";
  out.push(`- Builds: ${builds.length}, with a PR: ${ok}${builds.length ? ` (${Math.round((100 * ok) / builds.length)}%)` : ""}.`);
  out.push(`- Cost per ticket (builder + pick share; CI n/a (OV-131)): ${kv(perTicket)}.`);
  out.push(`- Cost per model: ${kv(perModel)}.`);
  out.push(`- Failure classes: ${Object.entries(hist).map(([k, v]) => `\`${k}\` ${v}`).join(", ") || "none"}.`);
  out.push(`- Median time to merge: ${fmtDur(median(ttm))} (${ttm.length} merged of ${prViews.length} PR(s) with state).`);
  out.push(`- \`${L.needsHuman}\` rate: ${prViews.length ? `${needsHuman}/${prViews.length}` : "unknown"}.`);
  out.push(`- \`${L.baseline}\` wait (red guard → human label): median ${fmtDur(median(waits))}, total ${fmtDur(waits.reduce((x, y) => x + y, 0) || null)} over ${waits.length} wait(s) on ${waitPrs} PR(s)${openGuard ? `; ${openGuard} still waiting` : ""}.`);
  out.push(`- Slept nights: ${sleptNights.length ? sleptNights.join(", ") : "none"}.`);
  out.push(`- Missed runs: ${missed.length ? missed.join(", ") : "none"}.`);
  out.push(`- Nights: ${statuses.map((s) => `${s.n} ${s.status}`).join(", ") || "none"}.`);
  out.push(`- Clean-night streak: ${streak} (idle nights don't count; a missed or dirty night ends it).`);
  if (!firstTracked) out.push("- No tracked nights yet: every figure above is empty.");
  out.push("");

  const text = out.join("\n");
  if (opt.morning) {
    morningCheck({ path, night, tonight, st, repo, text, keys: new Set(all.map((e) => e.key).filter(Boolean)) });
    return;
  }
  if (opt.out) {
    try { writeFileSync(opt.out, text); } catch (e) { process.stderr.write(`report: could not write ${opt.out} (${e.code || e.message})\n`); process.stdout.write(text); }
  } else process.stdout.write(text);
}

try {
  main();
} catch (e) {
  process.stdout.write(`## Morning report\n\n**Report failed: ${String(e.message).split("\n")[0]}.**\n`);
}
process.exit(0);
