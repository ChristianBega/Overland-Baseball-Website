#!/usr/bin/env node
// Slack notifier for the overnight runner (OV-130 phase D, OV-101): one message after each run and
// one after the morning check, so a quiet channel at 06:30 is the alarm.
//
//   node scripts/agents/notify.mjs run                 # overnight.sh, after run_end / run_abort
//   node scripts/agents/notify.mjs morning [report.md] # report.mjs --morning, after report.md
//
// run      one line for the run named by $EV_RUN_ID (else the night's latest) from events.jsonl:
//          outcome (or the abort / idle class), PRs, cost, time. A dry run is never posted (the
//          line only goes to the file below).
// morning  Block Kit built from report.json (written by report.mjs next to report.md): a header,
//          then colour-barred attachments with the status line (no run, aborted with a plain-English
//          hint, idle, clean or dirty; cost, streak, missed runs), waiting on you, one line per ticket
//          (PR, checks, verdict, cost), and the recent nights.
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
  auto_run_off: "autoRun is off on this machine (agents.sh auto on)",
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

// Slack mrkdwn: escape the three control characters.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const usd = (n) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");
const prLink = (repo, n) => (repo ? `<https://github.com/${repo}/pull/${n}|#${n}>` : `#${n}`);

// ---------- messages ----------

// What an abort means for the owner, in a few words (the class stays in the run post).
const ABORT_HINT = {
  on_battery: "Mac was on battery: plug it in before tonight",
  lock_held: "another run held the lock",
  fetch_timeout: "git fetch failed (network, or the Mac slept)",
  token_mint: "the bot token could not be minted",
  pick_claude_failed: "the ticket pick failed: check the Claude login",
  pick_unparsable: "the ticket pick returned an unusable result",
  preflight_tool_missing: "a tool the runner needs is not on PATH",
  preflight_config: "agents.config.json is missing a setting, or $AGENTS_HOME/machine.json is missing",
  push_url_unsafe: "the origin push URL is unsafe for bot pushes",
};
const hhmm = (ts) => {
  const d = new Date(ts);
  return Number.isNaN(d.getTime()) ? "" : `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const dayName = (night) => new Date(`${night}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const shortDay = (night) => new Date(`${night}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
// claude-sonnet-5-5 → Sonnet; anything else as is.
const modelName = (m) => {
  const x = String(m || "?").match(/^claude-([a-z]+)/);
  return x ? x[1][0].toUpperCase() + x[1].slice(1) : String(m || "?");
};
const CHECK_ICON = { success: "✅", skipped: "➖", failure: "❌", cancelled: "❌", timed_out: "❌", pending: "⏳", missing: "❔" };
const NIGHT_ICON = { clean: "🟢", dirty: "🔴", idle: "⚪", missed: "⚫" };

// One line: outcome · tickets/PRs · cost · machine · time. A dry run is marked so (and never posted).
function runMessage(events, night) {
  const runner = events.filter((e) => (e.source || "runner") === "runner" && e.night === night);
  const runId = env.EV_RUN_ID || [...runner].reverse().find((e) => e.run_id)?.run_id;
  const evs = runner.filter((e) => e.run_id === runId);
  if (!evs.length) return { text: `⚠️ Run · no events found (night ${night})`, dry: false };
  const repo = evs.find((e) => e.repo)?.repo || null;
  const dry = evs.some((e) => e.dry_run === true);
  const abort = evs.find((e) => e.event === "run_abort");
  const end = evs.find((e) => e.event === "run_end");
  const last = abort || end;
  const builds = evs.filter((e) => e.event === "build_end");
  const prs = builds.filter((b) => b.pr != null).map((b) => prLink(repo, b.pr));
  const bits = [];
  if (dry) bits.push("🧪 Dry run", end?.tickets?.length ? `would build ${end.tickets.map(esc).join(", ")}` : esc(IDLE_WHY[last?.failure_class] || last?.failure_class || "no result"));
  else if (abort) bits.push("⚠️ Run aborted", `\`${esc(abort.failure_class)}\``);
  else if (end?.outcome === "idle") bits.push("💤 Run idle", esc(IDLE_WHY[end.failure_class] || end.failure_class));
  else if (end) {
    const ok = end.outcome === "pr" && builds.every((b) => b.outcome === "pr");
    const n = end.built ?? prs.length;
    bits.push(ok ? `✅ ${n} PR${n === 1 ? "" : "s"}` : `❌ ${n} of ${end.attempted ?? builds.length} built`);
    if (!ok && end.failure_class && end.failure_class !== "none") bits.push(`\`${esc(end.failure_class)}\``);
    if (prs.length) bits.push(prs.join(" "));
    if (typeof end.cost_usd_total === "number") bits.push(usd(end.cost_usd_total));
  } else bits.push("⚠️ Run", "no run_end or run_abort yet");
  const machine = evs.find((e) => e.machine)?.machine;
  if (machine) bits.push(esc(machine));
  if (last?.ts && !dry) bits.push(hhmm(last.ts));
  return { text: bits.filter(Boolean).join(" · "), dry };
}

// The colour bar down the left of the morning report: where it starts and ends, and the night at a glance.
const BAR = { clean: "#2EB67D", idle: "#9AA0A6", aborted: "#ECB22E", dirty: "#E01E5A", missed: "#E01E5A" };
const GREEN = new Set(["success", "skipped"]);

// One ticket, one line: icon, ticket, PR + state, then model, checks, verdict, rounds, cost.
function ticketLine(r, repo) {
  const checks = Object.entries(r.checks || {});
  const red = checks.filter(([, c]) => CHECK_ICON[c] === "❌");
  const pending = checks.filter(([, c]) => !GREEN.has(c) && CHECK_ICON[c] !== "❌");
  const icon = r.skipped ? "↪️" : r.pr == null || red.length ? "❌" : pending.length || !r.checks ? "⏳" : "✅";
  const bits = [`${icon} *${esc(r.ticket || "?")}*` + (r.pr != null ? ` ${prLink(repo, r.pr)}${r.pr_state ? ` ${esc(r.pr_state)}` : ""}` : "")];
  if (r.skipped) bits.push("skipped (already has a PR)");
  else {
    bits.push(esc(modelName(r.model)));
    if (r.pr == null) bits.push(`no PR: \`${esc(r.failure_class || r.outcome)}\``);
  }
  if (r.checks) {
    bits.push(red.length || pending.length
      ? [...red, ...pending].map(([k, c]) => `${CHECK_ICON[c] || "❔"} ${esc(k)}`).join(" ")
      : "checks passed");
  }
  if (r.verdict) bits.push(esc(r.verdict));
  if (r.rounds) bits.push(`${r.rounds} fix round${r.rounds === 1 ? "" : "s"}`);
  if (!r.skipped) bits.push(usd(r.cost));
  if (r.slept) bits.push("😴 slept");
  return bits.join(" · ");
}

// Block Kit from report.json (report.mjs --morning). A header, then everything else behind one
// colour bar: the status line, waiting on you, one line per ticket, the recent nights.
// `text` is the notification preview.
function morningMessage(d, night, reportPath) {
  const prefix = env.AGENTS_NOTIFY_PREFIX ? `${env.AGENTS_NOTIFY_PREFIX} ` : "";
  const title = `${prefix}☀️ Morning report · ${dayName(night)}`;
  const header = [{ type: "header", text: { type: "plain_text", text: title.slice(0, 150), emoji: true } }];
  if (!d) {
    const msg = `🚨 No report data: ${esc(reportPath.replace(/\.md$/, ".json").replace(homedir(), "~"))} is missing.`;
    return { text: `${esc(title)}: ${msg}`, blocks: header,
      attachments: [{ color: BAR.missed, blocks: [{ type: "section", text: { type: "mrkdwn", text: msg } }] }] };
  }
  // Two short attachments with the same bar, not one long one: Slack folds a long attachment
  // behind "Show more". top = status + waiting on you; bottom = last night + recent nights.
  const top = [], bottom = [];
  let body = top;
  const section = (t) => body.push({ type: "section", text: { type: "mrkdwn", text: t.slice(0, 3000) } });
  const divider = () => body.push({ type: "divider" });

  let lead, bar = BAR[d.status] || BAR.dirty;
  if (d.status === "missed") lead = `🚨 *No run recorded*: the ${esc(env.AGENTS_AT || "01:00")} slot did not fire (Mac asleep or off?)`;
  else if (d.aborts?.length) {
    bar = BAR.aborted;
    lead = `⚠️ *Run aborted*: ` + [...new Set(d.aborts.map((a) => a.failure_class))].map((c) => esc(ABORT_HINT[c] || c)).join("; ");
  } else if (d.status === "idle") lead = `💤 *Idle*: ${esc((d.idle || []).map((c) => IDLE_WHY[c] || c).join("; ") || "nothing to build")}`;
  else if (d.status === "clean") lead = "✅ *Clean night*";
  else lead = `🔴 *Dirty night*: ${esc((d.why || []).join("; "))}`;
  const missedN = (d.missed_nights || []).length;
  const stats = [
    ...(d.status === "missed" ? [] : [`cost ${usd(d.cost ?? 0)}`]),
    `clean streak ${d.streak ?? "?"}`,
    missedN ? `${missedN} missed run${missedN === 1 ? "" : "s"}` : "no missed runs",
  ];
  section(`${lead}\n${stats.join("  ·  ")}`);

  const waiting = d.waiting || [];
  divider();
  section(waiting.length
    ? `👉 *Waiting on you*\n${waiting.map((w) => `• ${prLink(d.repo, w.pr)}${w.ticket ? ` ${esc(w.ticket)}` : ""}: ${esc(w.items.join("; "))}`).join("\n")}`
    : "👉 *Waiting on you*: nothing 🎉");

  body = bottom;
  const rows = d.rows || [];
  if (rows.length) {
    divider();
    section(`*Last night*\n${rows.slice(0, 10).map((r) => ticketLine(r, d.repo)).join("\n")}` +
      (rows.length > 10 ? `\n+${rows.length - 10} more in report.md` : ""));
  }

  const foot = [];
  if (d.nights?.length) foot.push(d.nights.slice(-7).map((n) => `${shortDay(n.night)} ${NIGHT_ICON[n.status] || n.status}`).join("    "));
  if (d.sweep_note) foot.push(`⚠️ ${esc(d.sweep_note)}`);
  if (foot.length) {
    divider();
    body.push({ type: "context", elements: [{ type: "mrkdwn", text: foot.join("\n").slice(0, 3000) }] });
  }

  const text = `${esc(title)}: ${lead.replace(/\*/g, "")}` + (waiting.length ? ` · ${waiting.length} waiting on you` : "");
  return { text, blocks: header, attachments: [top, bottom].filter((b) => b.length).map((blocks) => ({ color: bar, blocks })) };
}

// The fallback file: the same message as readable markdown.
function asMarkdown({ text, blocks, attachments }) {
  const links = (t) => t.replace(/<(https?:[^|>]+)\|([^>]+)>/g, "[$2]($1)");
  if (!blocks) return links(text);
  const out = [];
  for (const b of [...blocks, ...(attachments || []).flatMap((a) => a.blocks)]) {
    if (b.type === "header") out.push(`## ${b.text.text}`);
    else if (b.type === "divider") out.push("---");
    else if (b.type === "section") out.push(b.text.text);
    else if (b.type === "context") out.push(b.elements.map((e) => e.text).join(" "));
  }
  return links(out.join("\n\n"));
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

async function post(url, { text, blocks, attachments }) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(blocks ? { text, blocks, attachments } : { text }),
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
  let dir, msg, dry = false;
  if (kind === "run") {
    const night = /^\d{4}-\d{2}-\d{2}$/.test(env.EV_NIGHT || "") ? env.EV_NIGHT : localDate();
    const eventsFile = env.AGENTS_EVENTS || join(logDir(), "events.jsonl");
    dir = join(dirname(eventsFile), night);
    const r = runMessage(readEvents(eventsFile), night);
    dry = r.dry;
    msg = { text: env.AGENTS_NOTIFY_PREFIX ? `${esc(env.AGENTS_NOTIFY_PREFIX)} ${r.text}` : r.text, blocks: null };
  } else {
    // report.md and report.json live at <events dir>/<night>/ (report.mjs --morning).
    const dn = file ? basename(dirname(file)) : null;
    const night = dn && /^\d{4}-\d{2}-\d{2}$/.test(dn) ? dn : morningNight();
    const report = file || join(logDir(), night, "report.md");
    dir = dirname(report);
    let digest = null;
    try { digest = JSON.parse(readFileSync(join(dir, "report.json"), "utf8")); } catch {}
    msg = morningMessage(digest, night, report);
  }
  const text = asMarkdown(msg);

  if (dry) { fallback(dir, kind, text, "dry run"); return; }
  const w = webhook();
  if (!w.url) {
    const f = fallback(dir, kind, text, w.why);
    process.stderr.write(`notify: ${w.why}${f ? `; wrote ${f}` : ""}\n`);
    return;
  }
  const err = await post(w.url, msg);
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
