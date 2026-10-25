#!/usr/bin/env node
// Slack notifier for the overnight runner (OV-130 phase D, OV-101): one message after each run and
// one after the morning check, so a quiet channel at 06:30 is the alarm.
//
//   node scripts/agents/notify.mjs run                 # overnight.sh, after run_end / run_abort
//   node scripts/agents/notify.mjs morning [report.md] # report.mjs --morning, after report.md
//
// run      the run named by $EV_RUN_ID (else the night's latest) from events.jsonl: outcome, tickets,
//          PRs, turns, cost, denials, and the early-exit reason. An aborted run leads with an alert.
//          A dry run is never posted (the message only goes to the file below).
// morning  report.md condensed for Slack (status, one line per ticket, waiting on you, streak). A
//          night with no run leads with a no-run alert, an aborted one with the abort class.
//
// The webhook URL is one line in ${AGENTS_SLACK_WEBHOOK_FILE:-$AGENTS_HOME/slack-webhook}, chmod
// 600 (a file others can read is refused). It is read here and only passed to fetch: never to argv,
// env, a log or a file, and errors print only "slack post failed: HTTP <code>" or "... network error".
// No webhook file, or a failed post: the message is written to <log dir>/<night>/notify-<kind>.md
// (removed again by the next post that succeeds).
// It never fails the caller: always exit 0. $AGENTS_NOTIFY_PREFIX (e.g. "[test]") prefixes the text.

import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const NAME = basename(ROOT);
const env = process.env;
// Node 18/19 print an ExperimentalWarning for fetch on stderr; keep stderr to our own lines.
process.removeAllListeners("warning");

const IDLE_WHY = {
  paused: "paused (PAUSE file)",
  pick_empty: "no ready tickets",
  claim_skip: "every pick already has a PR or branch",
  lock_held: "another run held the lock",
};

// ---------- paths, night, events (same defaults as overnight.sh / report.mjs) ----------

function localDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// As report.mjs --morning: before the nightly slot ($AGENTS_AT) the latest night is yesterday's.
function morningNight(now = new Date()) {
  const m = String(env.AGENTS_AT || "").match(/^(\d{1,2}):(\d{2})$/);
  if (m && now.getHours() * 60 + now.getMinutes() < Number(m[1]) * 60 + Number(m[2])) {
    return localDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12));
  }
  return localDate(now);
}

function logDir() {
  return env.AGENTS_LOG_DIR
    || (process.platform === "darwin"
      ? join(homedir(), "Library/Logs", `${NAME}-agents`)
      : join(env.XDG_STATE_HOME || join(homedir(), ".local/state"), `${NAME}-agents`));
}

function readEvents(path) {
  if (!existsSync(path)) return [];
  const out = [];
  for (const l of readFileSync(path, "utf8").split("\n")) {
    if (!l.trim()) continue;
    try { out.push(JSON.parse(l)); } catch {}
  }
  return out;
}

// Slack mrkdwn: escape the three control characters, turn **bold** into *bold*.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "*$1*");
const usd = (n) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");
const prLink = (repo, n) => (repo ? `<https://github.com/${repo}/pull/${n}|#${n}>` : `#${n}`);

// ---------- messages ----------

function runMessage(events, night) {
  const runner = events.filter((e) => (e.source || "runner") === "runner" && e.night === night);
  const runId = env.EV_RUN_ID || [...runner].reverse().find((e) => e.run_id)?.run_id;
  const evs = runner.filter((e) => e.run_id === runId);
  if (!evs.length) return { text: `⚠️ Overnight run (night ${night}): no events found for this run.`, dry: false };
  const repo = evs.find((e) => e.repo)?.repo || null;
  const dry = evs.some((e) => e.dry_run === true);
  const abort = evs.find((e) => e.event === "run_abort");
  const end = evs.find((e) => e.event === "run_end");
  const builds = evs.filter((e) => e.event === "build_end");
  const skips = evs.filter((e) => e.event === "claim_skip");
  const lines = [];

  if (dry && end) {
    lines.push(`🧪 *Dry run* (night ${night}): ` + (end.tickets?.length ? `would build ${end.tickets.map(esc).join(", ")}` : esc(IDLE_WHY[end.failure_class] || end.failure_class)));
  } else if (abort) {
    lines.push(`⚠️ *Overnight run aborted* (night ${night}): \`${esc(abort.failure_class)}\``);
    if (abort.reason) lines.push(esc(abort.reason));
  } else if (end?.outcome === "idle") {
    lines.push(`💤 *Overnight run idle* (night ${night}): ${esc(IDLE_WHY[end.failure_class] || end.failure_class)}`);
  } else if (end) {
    const icon = end.outcome === "pr" && builds.every((b) => b.outcome === "pr") ? "✅" : "❌";
    lines.push(`${icon} *Overnight run* (night ${night}): ${end.built ?? 0} of ${end.attempted ?? builds.length} built` +
      (end.failure_class && end.failure_class !== "none" ? `, stopped: \`${esc(end.failure_class)}\`` : ""));
  } else {
    lines.push(`⚠️ *Overnight run* (night ${night}): no run_end or run_abort yet.`);
  }

  for (const b of builds) {
    const bits = [esc(b.ticket || "?"), esc(b.model || "?"), esc(b.outcome)];
    if (b.pr != null) bits.push(prLink(repo, b.pr));
    else if (b.branch) bits.push(`branch \`${esc(b.branch)}\``);
    if (b.turns != null) bits.push(`${b.turns} turns`);
    bits.push(usd(b.cost_usd));
    if (b.denials) bits.push(`${b.denials} denials`);
    if (b.failure_class && b.failure_class !== "none") bits.push(`\`${esc(b.failure_class)}\``);
    if (b.slept) bits.push("slept");
    lines.push(`• ${bits.join(" · ")}`);
  }
  for (const s of skips) lines.push(`• ${esc(s.ticket || "?")} skipped (${esc(s.reason || "claimed")})`);
  if (end && typeof end.cost_usd_total === "number") lines.push(`Run cost ${usd(end.cost_usd_total)} (pick + builds).`);
  return { text: lines.join("\n"), dry };
}

function morningMessage(events, night, reportPath) {
  const tonight = events.filter((e) => e.night === night);
  const lines = [];
  const missed = tonight.some((e) => e.event === "morning_check" && e.failure_class === "missed_run");
  const aborts = [...new Set(tonight.filter((e) => e.event === "run_abort" && (e.source || "runner") === "runner" && e.dry_run !== true)
    .map((e) => e.failure_class))];
  if (missed) lines.push(`🚨 *No run recorded for night ${night}*: the ${esc(env.AGENTS_AT || "01:00")} slot did not fire (Mac asleep or off?).`);
  if (aborts.length) lines.push(`⚠️ *Run aborted* (night ${night}): ${aborts.map((c) => `\`${esc(c)}\``).join(", ")}`);

  if (!existsSync(reportPath)) {
    lines.push(`🚨 *Morning report missing* for night ${night}: ${esc(reportPath)}`);
    return lines.join("\n");
  }
  const report = readFileSync(reportPath, "utf8").split("\n");
  lines.push(`☀️ *Morning report* (night ${night})`);
  let section = "";
  const waiting = [], trailing = [];
  for (const l of report) {
    if (l.startsWith("### ")) { section = l.slice(4); continue; }
    if (section === "Last night") {
      if (/^(Runs:|\*\*No run recorded)/.test(l)) lines.push(md(l));
      else if (l.startsWith("- Idle run:")) lines.push(md(l.replace(/^- /, "• ")));
      else if (l.startsWith("| ") && !/^\| Ticket \|/.test(l)) {
        // | Ticket | Model | Outcome | Class | Turns | Cost | PR | Checks | Verdict | Rounds | Waiting on you |
        const c = l.split("|").slice(1, -1).map((x) => x.trim());
        const bits = [c[0], c[1], c[2], ...(c[5] && c[5] !== "—" ? [c[5]] : []), c[6], c[7], `verdict ${c[8]}`];
        if (c[10] && c[10] !== "—") bits.push(`waiting: ${c[10]}`);
        lines.push(`• ${bits.map(md).join(" · ")}`);
      }
    } else if (section === "Waiting on you") {
      if (l.startsWith("- ")) waiting.push(`• ${md(l.slice(2))}`);
    } else if (section.startsWith("Trailing window")) {
      if (/^- (Clean-night streak|Missed runs|Nights):/.test(l)) trailing.push(md(l.slice(2).replace(/ \(idle nights.*\)\.$/, ".")));
    } else if (/^\*\*GitHub sweep unavailable/.test(l)) lines.push(md(l));
  }
  lines.push(waiting.length ? `*Waiting on you*\n${waiting.join("\n")}` : "*Waiting on you*: nothing.");
  lines.push(...trailing);
  return lines.join("\n");
}

// ---------- transport ----------

function webhook() {
  const home = env.AGENTS_HOME || join(homedir(), ".agents", NAME);
  const f = env.AGENTS_SLACK_WEBHOOK_FILE || join(home, "slack-webhook");
  try {
    if (!existsSync(f)) return { why: `no webhook file (${f})` };
    if (statSync(f).mode & 0o077) return { why: `webhook file ${f} is readable by group/other: chmod 600 it` };
    const url = readFileSync(f, "utf8").split(/\r?\n/)[0].trim();
    if (!/^https:\/\/\S+$/.test(url) && !/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/\S*$/.test(url)) {
      return { why: `webhook file ${f} does not hold an https URL` };
    }
    return { url };
  } catch {
    return { why: `webhook file ${f} is unreadable` };
  }
}

async function post(url, text) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(10000),
    });
    await r.text().catch(() => {});
    return r.ok ? null : `slack post failed: HTTP ${r.status}`;
  } catch {
    return "slack post failed: network error";
  }
}

function fallback(dir, kind, text, why) {
  const file = join(dir, `notify-${kind}.md`);
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(file, `<!-- not posted: ${why} -->\n${text}\n`);
    return file;
  } catch (e) {
    process.stderr.write(`notify: could not write ${file} (${e.code || "error"})\n`);
    return null;
  }
}

// ---------- main ----------

async function main() {
  const [kind, file] = process.argv.slice(2);
  if (kind !== "run" && kind !== "morning") {
    process.stderr.write("usage: notify.mjs run | morning [report.md]\n");
    return;
  }
  let night, eventsFile, dir, text, dry = false;
  if (kind === "run") {
    night = /^\d{4}-\d{2}-\d{2}$/.test(env.EV_NIGHT || "") ? env.EV_NIGHT : localDate();
    eventsFile = env.AGENTS_EVENTS || join(logDir(), "events.jsonl");
    dir = join(dirname(eventsFile), night);
    ({ text, dry } = runMessage(readEvents(eventsFile), night));
  } else {
    // report.md lives at <events dir>/<night>/report.md (report.mjs --morning).
    const dn = file ? basename(dirname(file)) : null;
    night = dn && /^\d{4}-\d{2}-\d{2}$/.test(dn) ? dn : morningNight();
    const report = file || join(logDir(), night, "report.md");
    eventsFile = file ? join(dirname(dirname(report)), "events.jsonl") : env.AGENTS_EVENTS || join(logDir(), "events.jsonl");
    dir = dirname(report);
    text = morningMessage(readEvents(eventsFile), night, report);
  }
  if (env.AGENTS_NOTIFY_PREFIX) text = `${esc(env.AGENTS_NOTIFY_PREFIX)} ${text}`;

  if (dry) { fallback(dir, kind, text, "dry run"); return; }
  const w = webhook();
  if (!w.url) {
    const f = fallback(dir, kind, text, w.why);
    process.stderr.write(`notify: ${w.why}${f ? `; wrote ${f}` : ""}\n`);
    return;
  }
  const err = await post(w.url, text);
  if (err) {
    process.stderr.write(err + "\n");
    fallback(dir, kind, text, err);
  } else {
    // Posted: drop a fallback left by an earlier failed post (report.mjs --morning retries on it).
    rmSync(join(dir, `notify-${kind}.md`), { force: true });
  }
}

try {
  await main();
} catch {
  process.stderr.write("notify: failed\n");
}
process.exit(0);
