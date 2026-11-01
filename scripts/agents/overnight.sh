#!/bin/sh
# Overnight runner: pick ready tickets from Jira, build each one as the bot in its own worktree, one
# PR per ticket. Sequential. launchd (or cron) is only the trigger; this script is the whole run.
#
#   sh scripts/agents/overnight.sh            # normal run
#   AGENTS_DRY_RUN=1 sh scripts/agents/overnight.sh   # pick + claim only, build nothing
#   sh scripts/agents/agents.sh run|auto|status       # the owner's front door (agents.sh)
#
# Repo facts come from .claude/agents.config.json (jira, repo, bot, labels, commands, runner).
# This machine's name and schedule switch come from $AGENTS_HOME/machine.json (outside the repo):
#   { "name": "laptop", "autoRun": true }
# A run without it aborts (preflight_config). autoRun false stops scheduled runs only.
# Machine facts come from env vars (defaults in brackets):
#   AGENTS_HOME     PAUSE file, lock, worktrees, scratch    [~/.agents/<repo dir name>]
#   AGENTS_LOG_DIR  per-night logs                          [~/Library/Logs/<repo>-agents on macOS,
#                                                            ${XDG_STATE_HOME:-~/.local/state}/<repo>-agents elsewhere]
#   AGENTS_TRIGGER  schedule (launchd / Task Scheduler) or manual [manual]. Only a scheduled run
#                   honours autoRun
#   AGENTS_KEYS     space-separated ticket keys: build only these (agents.sh run KEY ...)
#   AGENTS_MAX_TICKETS  override runner.maxTicketsPerNight for this run
#   AGENTS_DRY_RUN  1 = stop after the read-only claim check (no claim push, no build)
#   AGENTS_WALL_CLOCK_SECONDS  override runner.wallClockMinutes (testing the watchdog)
#   AGENTS_START_WINDOW        override runner.startWindow (HH:MM-HH:MM)
#   AGENTS_RUN_DEADLINE_SECONDS   override runner.runDeadlineMinutes (testing the deadline)
#   AGENTS_STEP_TIMEOUT_SECONDS   override runner.stepTimeoutSeconds (testing the step timeouts)
#   AGENTS_ALLOW_BATTERY       1 = start even on battery power (macOS refuses by default: on battery
#                              the Mac deep-sleeps mid-run and the network drops; night 2 and 3)
#   BOT_KEY_PATH / BOT_APP_ID   passed through to bot-token.mjs
#
# Kill switch: `touch $AGENTS_HOME/PAUSE`. The bot token is never written to a log, a file or a
# command line: the build's git credential helper and its `gh` shim mint a fresh one on every call,
# so a build that outlives the 1 h token lifetime (sleep, slow network) still pushes and opens its PR.

set -u

REPO_ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CONFIG="$REPO_ROOT/.claude/agents.config.json"
REPO_NAME=$(basename "$REPO_ROOT")
AGENTS_HOME=${AGENTS_HOME:-$HOME/.agents/$REPO_NAME}
if [ "$(uname)" = Darwin ]; then
  AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-$HOME/Library/Logs/$REPO_NAME-agents}
else
  AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-${XDG_STATE_HOME:-$HOME/.local/state}/$REPO_NAME-agents}
fi
DRY_RUN=${AGENTS_DRY_RUN:-0}
MACHINE=""   # from machine.json (step 1b); empty on events before that

NIGHT=$(date +%Y-%m-%d)
LOG_DIR="$AGENTS_LOG_DIR/$NIGHT"
SUMMARY="$LOG_DIR/summary.log"
mkdir -p "$AGENTS_HOME" "$LOG_DIR" || exit 1

say() {
  printf '%s %s\n' "$(date +%H:%M:%S)" "$*" | tee -a "$SUMMARY"
}

# emit <event> [key=value ...] [key:=<json> ...] — one JSON line in $AGENTS_LOG_DIR/events.jsonl
# (scripts/agents/events.mjs: fields, failure_class enum). Never fatal: a bug or a full disk in the
# events code costs the event, not the build or the run.
EVENTS="$AGENTS_LOG_DIR/events.jsonl"
RUN_ID="$(date -u +%Y-%m-%dT%H:%M:%SZ)-$$"
# owner/name only: any credential in the URL is stripped, and the URL itself is never printed.
EV_REPO=$(git -C "$REPO_ROOT" remote get-url origin 2>/dev/null |
  sed -E 's#^[a-z+]+://([^@/]*@)?[^/]+/##; s#^[^@/]*@[^:]*:##; s#\.git$##')
# run_end and run_abort also post the run summary to Slack (notify_run).
emit() {
  AGENTS_EVENTS="$EVENTS" EV_NIGHT="$NIGHT" EV_RUN_ID="$RUN_ID" EV_REPO="$EV_REPO" EV_DRY_RUN="$DRY_RUN" \
    EV_MACHINE="$MACHINE" node "$REPO_ROOT/scripts/agents/events.mjs" emit "$@" </dev/null >/dev/null || true
  case $1 in run_end|run_abort) notify_run ;; esac
}

# notify_run — this run's summary to Slack (scripts/agents/notify.mjs; webhook from
# $AGENTS_HOME/slack-webhook, never on a command line). Never fatal: no webhook file or a failed
# post writes $LOG_DIR/notify-run.md instead, and the run's exit code is unchanged.
notify_run() {
  AGENTS_HOME="$AGENTS_HOME" AGENTS_LOG_DIR="$AGENTS_LOG_DIR" AGENTS_EVENTS="$EVENTS" EV_NIGHT="$NIGHT" EV_RUN_ID="$RUN_ID" \
    node "$REPO_ROOT/scripts/agents/notify.mjs" run </dev/null >/dev/null || true
}

# die <failure_class> <message> [event fields ...]
die() {
  class=$1 msg=$2
  shift 2
  say "ABORT: $msg"
  emit run_abort failure_class="$class" reason="$msg" "$@"
  exit 1
}

# cfg <dotted.path> — prints a config value; arrays print one item per line.
cfg() {
  node -e '
    const v = process.argv[2].split(".").reduce((o, k) => (o == null ? o : o[k]), require(process.argv[1]));
    if (v == null) process.exit(1);
    console.log(Array.isArray(v) ? v.join("\n") : typeof v === "object" ? JSON.stringify(v) : String(v));
  ' "$CONFIG" "$1"
}

# ---- 1. kill switch ---------------------------------------------------------------------------
if [ -e "$AGENTS_HOME/PAUSE" ]; then
  say "paused ($AGENTS_HOME/PAUSE exists); nothing to do"
  emit run_end outcome=idle failure_class=paused
  exit 0
fi

# ---- 1b. machine profile and schedule switch ---------------------------------------------------
TRIGGER=${AGENTS_TRIGGER:-manual}
case $TRIGGER in schedule|manual) ;; *) die preflight_config "AGENTS_TRIGGER must be schedule or manual, not '$TRIGGER'" ;; esac
PROFILE="$AGENTS_HOME/machine.json"
prof=$(node -e '
  const p = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
  if (typeof p.name !== "string" || !/^[A-Za-z0-9._-]+$/.test(p.name)) throw new Error("bad name");
  if (typeof p.autoRun !== "boolean") throw new Error("bad autoRun");
  console.log(p.name + " " + p.autoRun);
' "$PROFILE" 2>/dev/null) ||
  die preflight_config "no valid machine profile at $PROFILE; create it: printf '{ \"name\": \"<machine>\", \"autoRun\": true }\\n' > \"$PROFILE\""
MACHINE=${prof% *}
AUTO_RUN=${prof#* }
if [ "$TRIGGER" = schedule ] && [ "$AUTO_RUN" != true ]; then
  say "autoRun is off on $MACHINE ($PROFILE); scheduled run skipped (sh scripts/agents/agents.sh auto on)"
  emit run_end outcome=idle failure_class=auto_run_off
  exit 0
fi

# A scheduled run only starts inside runner.startWindow ("HH:MM-HH:MM", may wrap midnight): a slot
# missed in sleep would otherwise run at the next wake, in the middle of the owner's day.
WINDOW=${AGENTS_START_WINDOW:-$(cfg runner.startWindow || true)}
if [ "$TRIGGER" = schedule ] && [ -n "$WINDOW" ]; then
  in_window=$(node -e '
    const m = process.argv[1].match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
    if (!m) { console.log("bad"); process.exit(0); }
    const [a, b] = [m[1] * 60 + +m[2], m[3] * 60 + +m[4]];
    const d = new Date(), now = d.getHours() * 60 + d.getMinutes();
    console.log((a <= b ? now >= a && now < b : now >= a || now < b) ? "yes" : "no");
  ' "$WINDOW")
  [ "$in_window" = bad ] && die preflight_config "runner.startWindow '$WINDOW' is not HH:MM-HH:MM"
  if [ "$in_window" = no ]; then
    say "skipped: outside window $WINDOW (scheduled run at $(date +%H:%M)); agents.sh run starts one now"
    emit run_end outcome=idle failure_class=outside_window
    exit 0
  fi
fi

# ---- 2. lock (one run at a time) --------------------------------------------------------------
# The whole run has a deadline (runner.runDeadlineMinutes): a watchdog TERMs the run, whose traps
# stop the build and release the lock. A live lock older than the deadline is a wedged run that
# would otherwise cancel every following night: it is stopped and the lock taken.
DEADLINE_MIN=$(cfg runner.runDeadlineMinutes || echo 300)
DEADLINE_SEC=${AGENTS_RUN_DEADLINE_SECONDS:-$((DEADLINE_MIN * 60))}
LOCK="$AGENTS_HOME/lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  old=$(cat "$LOCK/pid" 2>/dev/null)
  started=$(cat "$LOCK/started" 2>/dev/null)
  age=$(( $(date +%s) - ${started:-$(date +%s)} ))
  if [ -n "$old" ] && kill -0 "$old" 2>/dev/null; then
    if [ "$age" -le "$((DEADLINE_SEC + 300))" ]; then
      say "another run is active (pid $old); exiting"
      emit run_end outcome=idle failure_class=lock_held
      exit 0
    fi
    say "lock held by pid $old for ${age} s, past the run deadline (${DEADLINE_SEC} s): stopping it"
    kill -TERM "$old" 2>/dev/null
    i=0
    while kill -0 "$old" 2>/dev/null && [ "$i" -lt 30 ]; do sleep 1; i=$((i + 1)); done
    kill -KILL "$old" 2>/dev/null
  fi
  say "removing stale lock (pid ${old:-?})"
  rm -rf "$LOCK"
  mkdir "$LOCK" || die lock_held "cannot take lock $LOCK"
fi
echo $$ > "$LOCK/pid"
date +%s > "$LOCK/started"
cpid="" wpid="" dpid="" CUR_BR=""
# On exit (or kill), stop any build and watchdog still running, then release the lock.
# kill -<pgid> needs job control (set -m); where the shell ignores it (dash without a tty), fall
# back to the pid.
trap '[ -n "$cpid" ] && { kill -TERM -"$cpid" 2>/dev/null || kill -TERM "$cpid" 2>/dev/null; }; for p in $wpid $dpid; do pkill -P "$p"; kill "$p"; done 2>/dev/null; rm -rf "$LOCK"' EXIT
trap '[ -n "$CUR_BR" ] && say "claim branch $CUR_BR is on origin with no finished build: delete it if it is empty, so the ticket can be built again"; if [ -e "$LOCK/deadline" ]; then say "ABORT: run deadline (${DEADLINE_SEC} s) passed"; emit run_abort failure_class=run_deadline reason="run deadline ${DEADLINE_SEC} s"; else emit run_abort failure_class=unknown reason=signal; fi; exit 130' INT TERM
( sleep "$DEADLINE_SEC"; : > "$LOCK/deadline"; kill -TERM $$ ) >/dev/null 2>&1 &
dpid=$!

# with_timeout <seconds> <step> <command ...> — run one network step with a deadline (stdout passes
# through). On timeout the command is stopped, "TIMEOUT <step>" goes to the summary, and the
# status is 124; the caller handles it like any other failure of that step.
STEP_SEC=${AGENTS_STEP_TIMEOUT_SECONDS:-$(cfg runner.stepTimeoutSeconds || echo 180)}
with_timeout() {
  t_sec=$1 t_step=$2
  shift 2
  # Own process group (as the build): a timeout stops the command and its children (claude's MCP
  # servers), which would otherwise keep a $(...) pipe open until they exit.
  set -m
  "$@" &
  t_pid=$!
  set +m
  t_flag="$LOCK/timeout.$t_pid"
  ( sleep "$t_sec"; kill -0 "$t_pid" 2>/dev/null || exit 0; : > "$t_flag"
    kill -TERM -"$t_pid" || kill -TERM "$t_pid"; sleep 5; kill -KILL -"$t_pid" || kill -KILL "$t_pid" ) >/dev/null 2>&1 &
  t_kpid=$!
  wait "$t_pid"
  t_rc=$?
  pkill -P "$t_kpid" 2>/dev/null
  kill "$t_kpid" 2>/dev/null
  if [ -e "$t_flag" ]; then
    rm -f "$t_flag"
    printf '%s TIMEOUT %s after %s s\n' "$(date +%H:%M:%S)" "$t_step" "$t_sec" | tee -a "$SUMMARY" >&2
    return 124
  fi
  return "$t_rc"
}

say "=== run start (repo $REPO_NAME, machine $MACHINE, mode=$TRIGGER, dry-run $DRY_RUN)"
emit run_start mode="$TRIGGER"

# ---- 3. preflight: all or nothing -------------------------------------------------------------
for bin in node git gh claude; do
  command -v "$bin" >/dev/null 2>&1 || die preflight_tool_missing "$bin not on PATH ($PATH)"
done
GH_BIN=$(command -v gh)
[ -f "$CONFIG" ] || die preflight_config "no config at $CONFIG"

# On battery the `pmset -c` sleep settings do not apply: the Mac deep-sleeps minutes into the run,
# the network is gone in DarkWake and the build stalls for hours (nights 2 and 3). Refuse to start
# rather than stall; the summary line says why.
if [ "$(uname)" = Darwin ] && [ "${AGENTS_ALLOW_BATTERY:-0}" != 1 ]; then
  case $(pmset -g batt 2>/dev/null | head -n 1) in
    *"AC Power"*) ;;
    *) die on_battery "on battery power: the Mac would sleep mid-run; plug in and re-run (AGENTS_ALLOW_BATTERY=1 overrides)" ;;
  esac
fi

BASE=$(cfg repo.baseBranch) || die preflight_config "repo.baseBranch missing"
JIRA_KEY=$(cfg jira.projectKey) || die preflight_config "jira.projectKey missing"
CLOUD_ID=$(cfg jira.cloudId) || die preflight_config "jira.cloudId missing"
READY=$(cfg labels.jira.readyForBuild) || die preflight_config "labels.jira.readyForBuild missing"
BLOCKED=$(cfg labels.jira.blocked) || die preflight_config "labels.jira.blocked missing"
SIZES=$(cfg runner.allowedSizes | sed 's/.*/"&"/' | paste -sd, -)
[ -n "$SIZES" ] || die preflight_config "runner.allowedSizes missing or empty"
AGENT=$(cfg runner.builderAgent) || die preflight_config "runner.builderAgent missing"
MAX_TICKETS=${AGENTS_MAX_TICKETS:-$(cfg runner.maxTicketsPerNight)} || die preflight_config "runner.maxTicketsPerNight missing"
case $MAX_TICKETS in ''|*[!0-9]*) die preflight_config "ticket cap '$MAX_TICKETS' is not a number (AGENTS_MAX_TICKETS / runner.maxTicketsPerNight)" ;; esac
# Named tickets (agents.sh run KEY ...): only these, still through every filter and the claim.
KEY_FILTER=""
for k in ${AGENTS_KEYS:-}; do
  printf '%s' "$k" | grep -Eq "^$JIRA_KEY-[0-9]+\$" || die preflight_config "not a ticket key: '$k'"
  KEY_FILTER="$KEY_FILTER${KEY_FILTER:+, }$k"
done
MAX_TURNS=$(cfg runner.maxTurns || echo 150)
WALL_MIN=$(cfg runner.wallClockMinutes || echo 50)
WALL_SEC=${AGENTS_WALL_CLOCK_SECONDS:-$((WALL_MIN * 60))}
MAX_USD=$(cfg runner.maxBudgetUsd || echo 15)
PICK_MODEL=$(cfg runner.pickModel || echo sonnet)
MODEL_PREFIX=$(cfg runner.modelLabelPrefix || echo "model:")
MACHINE_PREFIX=$(cfg labels.jira.machinePrefix || echo "machine:")
# Headless runs skip the claude.ai account connectors unless the config opts in.
[ "$(cfg runner.claudeAiConnectors || echo false)" = true ] || export ENABLE_CLAUDEAI_MCP_SERVERS=false
COMMIT_NAME=$(cfg bot.commitName) || die preflight_config "bot.commitName missing"
COMMIT_EMAIL=$(cfg bot.commitEmail) || die preflight_config "bot.commitEmail missing"
VERIFY_CMD=$(cfg commands.verify || true)

with_timeout "$STEP_SEC" fetch git -C "$REPO_ROOT" fetch -q origin "$BASE" || die fetch_timeout "git fetch origin $BASE failed"
# The commit every claim branch and build worktree of this run starts from.
BASE_SHA=$(git -C "$REPO_ROOT" rev-parse --verify -q "origin/$BASE^{commit}") || die fetch_timeout "no origin/$BASE after fetch"
# The bot identity rides on an HTTPS credential helper. Over SSH (or an insteadOf rewrite to SSH)
# git would push with the owner's key, as the owner. A credential in the URL wins over the helper
# too. The URL is never echoed (it may hold a credential). A local path (a scratch bare remote in
# tests) involves no identity at all.
PUSH_URL=$(git -C "$REPO_ROOT" remote get-url --push origin) || die push_url_unsafe "no origin remote"
case $PUSH_URL in
  https://*@*) die push_url_unsafe "origin push URL embeds a credential: pushes would not run as the bot" ;;
  https://*|/*|file:///*) ;;
  *) die push_url_unsafe "origin push URL is not HTTPS: pushes would not run as the bot" ;;
esac
# Make the mint independent of the caller's cwd (the build's helper and shim may run from the scratch
# dir, outside any checkout): both values are non-secret paths/names. Env wins over the defaults.
BOT_KEY_DIR=$(cfg bot.keyDir) || die preflight_config "bot.keyDir missing"
export BOT_KEY_PATH="${BOT_KEY_PATH:-$BOT_KEY_DIR/key.pem}"
export BOT_REPO="${BOT_REPO:-$(printf '%s' "$PUSH_URL" | sed -E 's#^https://github\.com/##; s#\.git$##')}"
with_timeout "$STEP_SEC" mint node "$REPO_ROOT/scripts/agents/bot-token.mjs" >/dev/null || die token_mint "bot token mint failed (see bot-token message above)"

mint() {
  with_timeout "$STEP_SEC" mint node "$REPO_ROOT/scripts/agents/bot-token.mjs"
}

# The bot's git credential helper, as a recipe: it mints a token when git asks for one (`get`), and a
# failed mint fails the helper rather than handing git an empty password. Used by the claim push
# below and by every git call in the build.
export AGENTS_BOT_TOKEN_SCRIPT="$REPO_ROOT/scripts/agents/bot-token.mjs"
BOT_HELPER='!f() { [ "$1" = get ] || return 0; t=$(node "$AGENTS_BOT_TOKEN_SCRIPT") || exit 1; echo username=x-access-token; echo "password=$t"; }; f'

# ---- 4. pick (read-only Jira, via a short claude -p call) -------------------------------------
# Queue order is jira.orderBy (Rank ASC: the backlog order). The window is jira.pickMaxResults but
# at least 3x the cap, so claimed and other-machine tickets near the top cannot starve the cap.
ORDER_BY=$(cfg jira.orderBy || echo "Rank ASC")
MAX_RESULTS=$(cfg jira.pickMaxResults || echo 10)
[ "$MAX_RESULTS" -ge $((MAX_TICKETS * 3)) ] 2>/dev/null || MAX_RESULTS=$((MAX_TICKETS * 3))
[ "$MAX_RESULTS" -le 100 ] || MAX_RESULTS=100
JQL="project = $JIRA_KEY${KEY_FILTER:+ AND key in ($KEY_FILTER)} AND labels = \"$READY\" AND labels not in (\"$BLOCKED\") AND labels in ($SIZES) AND statusCategory != Done ORDER BY $ORDER_BY"
PICK_PROMPT="Call mcp__atlassian__searchJiraIssuesUsingJql once with cloudId \"$CLOUD_ID\", maxResults $MAX_RESULTS, fields [\"summary\", \"labels\", \"issuetype\"] and this JQL:
$JQL
Then reply with ONLY a JSON array of objects with each issue's key, labels and issue type name, in the order returned, e.g. [{\"key\": \"$JIRA_KEY-1\", \"labels\": [\"size-s\"], \"type\": \"Task\"}], or [] if there are none. No prose. If the tool fails or needs authentication, reply with ONLY: ERROR: <one-line reason>"

say "pick: $JQL"
PICK_OUT=$(cd "$REPO_ROOT" && with_timeout "$STEP_SEC" pick claude -p --model "$PICK_MODEL" --max-turns 4 --output-format json \
  --permission-prompts none --allowedTools mcp__atlassian__searchJiraIssuesUsingJql \
  -- "$PICK_PROMPT" 2>>"$LOG_DIR/pick.err") || die pick_claude_failed "pick: claude -p failed or timed out (Claude login? see $LOG_DIR/pick.err and TIMEOUT above)"
printf '%s\n' "$PICK_OUT" > "$LOG_DIR/pick.json"

# One line per ticket: "<KEY> <label,label,...|-> <scope> <branch prefix>". A bare key (no labels)
# is accepted too.
#   scope   this machine's claim on it from the <machinePrefix><name> labels (JQL cannot match a
#           label prefix): own (labelled for this machine), any (no machine label) or other:<name,...>
#   prefix  of the ticket branch, by Jira issue type (repo.branchPrefixByIssueType; the builder's
#           own rule: a Bug is fix/, anything else feature/)
PICKED=$(printf '%s' "$PICK_OUT" | node -e '
  let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
    const [key, machine, mprefix, config] = process.argv.slice(1);
    const repo = require(config).repo || {};
    const byType = repo.branchPrefixByIssueType || {};
    const allowed = new Set(repo.branchPrefixes || []);
    const prefixFor = (type) => {
      const p = byType[type] ?? byType.default;
      if (!allowed.has(p)) { console.error("repo.branchPrefixByIssueType gives " + p + " for " + (type || "no type") + ", not one of repo.branchPrefixes"); process.exit(1); }
      return p;
    };
    let r;
    try { r = JSON.parse(s); } catch { console.error("pick output is not JSON"); process.exit(1); }
    const text = String(r.result ?? "").trim();
    if (r.is_error || /^ERROR:/.test(text)) { console.error(text || r.subtype || "pick failed"); process.exit(1); }
    const m = text.match(/\[[\s\S]*\]/);
    let items;
    try { items = JSON.parse(m ? m[0] : text); } catch { console.error("no JSON array in: " + text.slice(0, 200)); process.exit(1); }
    const re = new RegExp("^" + key + "-\\d+$");
    for (const it of items) {
      const k = typeof it === "string" ? it : it?.key;
      if (!re.test(k)) { console.error("unexpected key: " + k); process.exit(1); }
      const labels = (Array.isArray(it?.labels) ? it.labels : []).filter(l => /^[A-Za-z0-9:._-]+$/.test(l));
      const machines = labels.filter(l => l.startsWith(mprefix)).map(l => l.slice(mprefix.length));
      const scope = !machines.length ? "any" : machines.includes(machine) ? "own" : "other:" + machines.join(",");
      console.log(k + " " + (labels.join(",") || "-") + " " + scope + " " + prefixFor(typeof it?.type === "string" ? it.type : ""));
    }
  });' "$JIRA_KEY" "$MACHINE" "$MACHINE_PREFIX" "$CONFIG" 2>>"$SUMMARY") || die pick_unparsable "pick: unusable result (raw in $LOG_DIR/pick.json)" pick_json="$LOG_DIR/pick.json"
KEYS=$(printf '%s\n' "$PICKED" | awk 'NF {print $1}')
emit pick pick_json="$LOG_DIR/pick.json" picked="$PICKED"
for k in ${AGENTS_KEYS:-}; do
  printf '%s\n' "$KEYS" | grep -qx "$k" ||
    say "$k: not picked (not $READY, $BLOCKED, outside runner.allowedSizes, done, or not found)"
done

# model_for <key> — the build model: a <prefix><model> label (allowed models only) wins, else the
# size map, else empty (the agent file default).
model_for() {
  printf '%s\n' "$PICKED" | awk -v k="$1" '$1 == k {print $2}' | node -e '
    let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
      const r = require(process.argv[1]).runner || {}, prefix = process.argv[2];
      const bySize = r.modelBySize || {};
      const allowed = new Set([...(r.allowedModels || []), ...Object.values(bySize)]);
      const labels = s.trim().split(",").filter(Boolean);
      const pinned = labels.filter(l => l.startsWith(prefix)).map(l => l.slice(prefix.length)).find(m => allowed.has(m));
      const sized = labels.map(l => bySize[l]).find(Boolean);
      console.log(pinned || sized || "");
    });' "$CONFIG" "$MODEL_PREFIX"
}

if [ -z "$KEYS" ]; then
  say "pick: no ready tickets; done"
  emit run_end outcome=idle failure_class=pick_empty
  exit 0
fi
say "pick: $(printf '%s' "$KEYS" | paste -sd' ' -)"

# ---- 5. claim (no Jira write) -------------------------------------------------------------------
# Two layers. Here, read-only: an existing PR or remote branch means someone has the ticket. Then,
# right before each build (step 6), the atomic claim: the bot creates the ticket branch on origin
# with an empty lease, which fails if the branch already exists, so of two machines (or two runs)
# only one wins. The branch points at a claim commit of its own (empty, on top of $BASE_SHA, naming
# the machine and run): git skips the lease check for a ref that already points at the pushed
# commit ("up to date"), so two claims of the same commit would both succeed. The build starts at
# that commit and pushes onto the branch (a fast-forward).
T=$(mint) || die token_mint "bot token mint failed"

# branch_for <key> — the ticket branch: <prefix by issue type><key>, e.g. feature/OV-12.
branch_for() {
  printf '%s%s' "$(printf '%s\n' "$PICKED" | awk -v k="$1" '$1 == k {print $4}')" "$1"
}

# claim_commit <key> — prints a new empty commit on $BASE_SHA, authored by the bot, unique to this
# machine and run.
claim_commit() {
  GIT_AUTHOR_NAME="$COMMIT_NAME" GIT_AUTHOR_EMAIL="$COMMIT_EMAIL" \
    GIT_COMMITTER_NAME="$COMMIT_NAME" GIT_COMMITTER_EMAIL="$COMMIT_EMAIL" \
    git -C "$REPO_ROOT" -c commit.gpgsign=false commit-tree "$BASE_SHA^{tree}" -p "$BASE_SHA" \
      -m "chore: claim $1 ($1)" -m "Claimed by machine $MACHINE, run $RUN_ID."
}

# claim <branch> <sha> — create <branch> on origin at <sha> as the bot, only if it does not exist
# (an empty --force-with-lease expectation). Prints "won", "lost" or "failed: <why>". The
# builder's deny rules are unchanged: this is a runner step, never a builder tool call.
claim() {
  out=$(export GIT_TERMINAL_PROMPT=0; with_timeout "$STEP_SEC" "claim push" git -C "$REPO_ROOT" -c credential.helper= -c "credential.helper=$BOT_HELPER" \
    push --porcelain --force-with-lease="refs/heads/$1:" origin "$2:refs/heads/$1" 2>&1)
  rc=$?
  if [ "$rc" -eq 0 ]; then printf 'won'
  elif printf '%s' "$out" | grep -qE '\[rejected\]|stale info|already exists'; then printf 'lost'
  else printf 'failed: claim push exit %s' "$rc"
  fi
}
claimed_by() {
  k=$1
  # A failed gh call counts as claimed: better to skip a ticket than to build a duplicate PR.
  json=$(export GH_TOKEN="$T"; with_timeout "$STEP_SEC" "gh pr list" gh pr list --state all --search "$k" --limit 20 --json number,title,headRefName 2>/dev/null) ||
    { printf 'gh pr list failed'; return; }
  hit=$(printf '%s' "$json" |
    node -e '
      let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
        const re = new RegExp("(^|[^A-Za-z0-9])" + process.argv[1] + "(?![0-9])");
        const pr = JSON.parse(s).find(p => re.test(p.title) || re.test(p.headRefName));
        if (pr) console.log("PR #" + pr.number);
      });' "$k" 2>/dev/null) || hit="gh pr list unparsable"
  if [ -z "$hit" ]; then
    heads=$(with_timeout "$STEP_SEC" ls-remote git -C "$REPO_ROOT" ls-remote --heads origin 2>/dev/null) || { printf 'git ls-remote failed'; return; }
    br=$(printf '%s\n' "$heads" | awk '{print $2}' | grep -E "/$k([^0-9]|\$)" | head -1)
    [ -n "$br" ] && hit="branch ${br#refs/heads/}"
  fi
  printf '%s' "$hit"
}

# Every unclaimed candidate, in pick order: the build loop takes them until $MAX_TICKETS builds have
# started, so a ticket lost to a claim race is replaced by the next one.
TODO=""
n=0 n_ready=0 n_claimed=0 n_other=0
for k in $KEYS; do
  n_ready=$((n_ready + 1))
  scope=$(printf '%s\n' "$PICKED" | awk -v k="$k" '$1 == k {print $3}')
  case $scope in
    other:*) say "$k: skip (for machine ${scope#other:}, not $MACHINE)"; n_other=$((n_other + 1)); continue ;;
  esac
  c=$(claimed_by "$k")
  if [ -n "$c" ]; then
    say "$k: skip (claimed: $c)"
    emit claim_skip ticket="$k" outcome=skipped failure_class=claim_skip reason="$c"
    n_claimed=$((n_claimed + 1))
  else
    TODO="$TODO $k"
    n=$((n + 1))
  fi
done
# "Beyond window": unclaimed tickets past the cap (tonight's spares). A full window (+) means Jira
# may hold more that this pick never saw.
beyond=$((n > MAX_TICKETS ? n - MAX_TICKETS : 0))
[ "$n_ready" -ge "$MAX_RESULTS" ] && beyond="$beyond+"
say "pick: $n_ready ready, $n_claimed claimed, $n_other other-machine, $beyond beyond window (cap $MAX_TICKETS, window $MAX_RESULTS)"

if [ -z "$TODO" ]; then
  if [ "$n_claimed" -eq 0 ]; then
    say "no ready tickets for $MACHINE; done"
    emit run_end outcome=idle failure_class=pick_empty
  else
    say "nothing unclaimed; done"
    emit run_end outcome=idle failure_class=claim_skip
  fi
  exit 0
fi
# The first $MAX_TICKETS are the plan; the rest only stand in for a claim race lost.
PLAN=$(printf '%s\n' $TODO | head -n "$MAX_TICKETS" | paste -sd' ' -)
say "to build: $PLAN"
for k in $PLAN; do say "$k: branch $(branch_for "$k"), model $(model_for "$k" | sed "s/^$/agent default/")"; done
if [ "$DRY_RUN" = 1 ]; then
  say "dry run: stopping before the claim push and the build"
  emit run_end outcome=idle failure_class=none tickets="$PLAN"
  exit 0
fi

# reap_worktree <dir> — remove a runner worktree (and its scratch dir) unless it holds work that
# never reached the remote. Returns 1 if it was kept.
reap_worktree() {
  w=$1
  if [ -z "$(git -C "$w" status --porcelain 2>/dev/null)" ] &&
     [ -z "$(git -C "$w" log --oneline '@{u}..' 2>/dev/null)" ] &&
     { git -C "$w" rev-parse -q --verify '@{u}' >/dev/null 2>&1 ||
       [ -z "$(git -C "$w" log --oneline HEAD --not --remotes=origin 2>/dev/null)" ]; }; then
    git -C "$REPO_ROOT" worktree remove --force "$w" 2>/dev/null && rm -rf "$TMPDIR/$(basename "$w")"
    return 0
  fi
  return 1
}

# ---- 6. build, one ticket at a time -----------------------------------------------------------
# Headless permissions from the config, as positional args:
#   --disallowedTools <deny...> --allowedTools <allow...>
# Deny beats allow, so the feature/* and fix/* push rules can never reach a protected branch, a
# refspec, a deletion or a force push. Fail closed: no deny list, no build.
DENY=$(cfg runner.disallowedTools) || die preflight_config "runner.disallowedTools missing"
PROTECTED=$(cfg repo.protectedBranches) || die preflight_config "repo.protectedBranches missing"
set -- --disallowedTools
while IFS= read -r tool; do
  [ -n "$tool" ] && set -- "$@" "$tool"
done <<EOF
$DENY
$(printf '%s\n' "$PROTECTED" | sed '/./s/.*/Bash(git push * &*)/')
EOF
[ $# -gt 1 ] || die preflight_config "deny list is empty"
set -- "$@" --allowedTools
n_deny=$#
while IFS= read -r tool; do
  [ -n "$tool" ] && set -- "$@" "$tool"
done <<EOF
$(cfg runner.allowedTools)
EOF
[ $# -gt "$n_deny" ] || die preflight_config "runner.allowedTools is empty"

export TMPDIR="$AGENTS_HOME/tmp"
mkdir -p "$TMPDIR" "$AGENTS_HOME/worktrees"
for w in "$AGENTS_HOME"/worktrees/*; do
  [ -d "$w" ] || continue
  reap_worktree "$w" && say "removed leftover worktree $w" || say "leftover worktree kept (unpushed work): $w"
done
git -C "$REPO_ROOT" worktree prune
rm -rf "$TMPDIR"/*-bin   # gh shim dirs a killed run left behind (recipes only, never a token)

built=0 attempted=0 run_class=none RUN_KEYS=""
for k in $TODO; do
  [ "$attempted" -ge "$MAX_TICKETS" ] && break
  [ -e "$AGENTS_HOME/PAUSE" ] && { say "paused mid-run; stopping before $k"; run_class=paused; break; }

  # A kept worktree from an earlier failed build (night 3: OV-112) still owns the ticket's local
  # branch, and the builder's `git switch -c <prefix>/<key>` would fail with no permitted recovery.
  # Skip with a clear line instead of spending a build; the owner removes the worktree and branch.
  stale=$(git -C "$REPO_ROOT" branch --list "*/$k" | sed 's/^[*+ ]*//' | head -n 1)
  if [ -n "$stale" ]; then
    say "$k: skip (local branch $stale already exists; remove the kept worktree and the branch, then re-run)"
    emit claim_skip ticket="$k" outcome=skipped failure_class=claim_skip reason="local branch $stale"
    continue
  fi

  # Fail fast if the bot cannot mint at all (bad key, no network); the build mints its own later.
  # Before the claim, so a failed mint never leaves an empty claim branch on origin.
  mint >/dev/null || { attempted=$((attempted + 1)); say "$k: FAIL bot token mint"; emit build_end ticket="$k" outcome=failed failure_class=token_mint; run_class=token_mint; break; }

  # The atomic claim. Lost: another machine or run created the branch since the check above.
  BR=$(branch_for "$k")
  if CLAIM_SHA=$(claim_commit "$k"); then c=$(claim "$BR" "$CLAIM_SHA"); else c="failed: claim commit"; fi
  case $c in
    won) say "$k: claimed $BR on origin"; CUR_BR=$BR ;;
    lost)
      say "$k: skip (claim race lost: $BR already exists on origin)"
      emit claim_skip ticket="$k" outcome=skipped failure_class=claim_skip reason="claim race lost" branch="$BR"
      continue ;;
    *)
      say "$k: skip ($c)"
      emit claim_skip ticket="$k" outcome=skipped failure_class=claim_skip reason="$c" branch="$BR"
      continue ;;
  esac
  RUN_KEYS="$RUN_KEYS $k"

  slug=$(printf '%s' "$k" | tr 'A-Z' 'a-z')
  stamp=$(date +%H%M%S)
  WT="$AGENTS_HOME/worktrees/$slug-$stamp"
  SCRATCH="$TMPDIR/$slug-$stamp"
  TLOG="$LOG_DIR/$k.log"
  mkdir -p "$SCRATCH"
  attempted=$((attempted + 1))

  # Detached at the claim commit, not on the branch: the builder's `git switch -c <branch>` (no
  # start point) then creates its local branch there, and `git push -u origin <branch>` is a
  # fast-forward onto the claim.
  if ! git -C "$REPO_ROOT" worktree add -q --detach "$WT" "$CLAIM_SHA" 2>>"$SUMMARY"; then
    say "$k: FAIL worktree add; claim branch $BR left empty on origin; delete it to let the ticket be built again"
    emit build_end ticket="$k" outcome=failed failure_class=worktree_add claim_branch="$BR" claim_empty:=true
    run_class=worktree_add CUR_BR=""
    continue
  fi
  # Gitignored files the build needs (e.g. client/.env). Copied, never read.
  while IFS= read -r f; do
    [ -n "$f" ] && [ -f "$REPO_ROOT/$f" ] && cp "$REPO_ROOT/$f" "$WT/$f"
  done <<EOF
$(cfg runner.envFiles || true)
EOF

  MODEL=$(model_for "$k")
  PROMPT="do $k (unattended). Branch: $BR (already on origin, pointing at the claim commit you start on: run git switch -c $BR with no start point, then push onto it). Build model: ${MODEL:-agent default}. Scratch directory for PR body and other temp files: $SCRATCH"
  say "$k: build start (worktree $WT, branch $BR, model ${MODEL:-agent default}, caps ${MAX_TURNS} turns / ${WALL_SEC} s / \$${MAX_USD})"
  emit build_start ticket="$k" branch="$BR" model="${MODEL:-agent default}" log="$TLOG" \
    caps:="{\"turns\":${MAX_TURNS:-null},\"wall_s\":${WALL_SEC:-null},\"usd\":${MAX_USD:-null}}"

  # `gh` shim for the build: mints a token for each call, so no token sits in the environment and
  # none can age out. Lives beside the scratch dir, outside it (the builder has --add-dir on scratch).
  SHIM="$TMPDIR/$slug-$stamp-bin"
  mkdir -p "$SHIM" "$SHIM/gh-home"
  printf '%s\n' '#!/bin/sh' \
    '# Written by overnight.sh: run gh as the bot with a token minted now (installation tokens last 1 h).' \
    'GH_TOKEN=$(node "$AGENTS_BOT_TOKEN_SCRIPT") || exit 1' \
    'export GH_TOKEN' \
    'exec "$AGENTS_GH_BIN" "$@"' > "$SHIM/gh"
  chmod 755 "$SHIM/gh"

  # Job control on, so the build gets its own process group and the watchdog can kill claude plus
  # anything it started (dev server, browser) in one go.
  set -m
  # Bot identity through the environment only, and only as a recipe: the git credential helper
  # mints a token when git asks for one (the owner's helpers are reset), the gh shim does the same
  # per call, and the commits carry the bot's author/committer. No token value is exported.
  (
    cd "$WT" || exit 1
    export AGENTS_GH_BIN="$GH_BIN"
    export PATH="$SHIM:$PATH"
    unset GH_TOKEN GITHUB_TOKEN
    # Fail closed: a `gh` reached without the shim finds no stored login (empty config dir) and errors
    # out instead of acting as the owner. The shim's gh still works from the GH_TOKEN it sets.
    export GH_CONFIG_DIR="$SHIM/gh-home"
    export GIT_CONFIG_COUNT=3
    export GIT_CONFIG_KEY_0=credential.helper GIT_CONFIG_VALUE_0=
    export GIT_CONFIG_KEY_1=credential.helper GIT_CONFIG_VALUE_1="$BOT_HELPER"
    export GIT_CONFIG_KEY_2=commit.gpgsign GIT_CONFIG_VALUE_2=false
    export GIT_TERMINAL_PROMPT=0
    export GIT_AUTHOR_NAME="$COMMIT_NAME" GIT_AUTHOR_EMAIL="$COMMIT_EMAIL"
    export GIT_COMMITTER_NAME="$COMMIT_NAME" GIT_COMMITTER_EMAIL="$COMMIT_EMAIL"
    [ -n "$MODEL" ] && set -- --model "$MODEL" "$@"
    exec claude -p --agent "$AGENT" --max-turns "$MAX_TURNS" --max-budget-usd "$MAX_USD" \
      --permission-prompts none --output-format stream-json --verbose \
      --add-dir "$SCRATCH" "$@" -- "$PROMPT"
  ) < /dev/null > "$TLOG" 2>&1 &
  cpid=$!
  set +m
  t0=$(date +%s)

  TIMED_OUT="$SCRATCH/.timed-out"
  (
    sleep "$WALL_SEC"
    if kill -0 "$cpid" 2>/dev/null; then
      : > "$TIMED_OUT"
      kill -TERM -"$cpid" 2>/dev/null || kill -TERM "$cpid" 2>/dev/null
      sleep 30
      kill -KILL -"$cpid" 2>/dev/null || kill -KILL "$cpid" 2>/dev/null
    fi
  ) 2>/dev/null &
  wpid=$!

  wait "$cpid"
  rc=$?
  # claude usually exits on TERM before the watchdog's KILL: finish off anything left in its group
  # that ignored TERM (browser, vite under npm).
  [ -e "$TIMED_OUT" ] && { kill -KILL -"$cpid" 2>/dev/null || kill -KILL "$cpid" 2>/dev/null; }
  cpid=""
  pkill -P "$wpid" 2>/dev/null
  kill "$wpid" 2>/dev/null
  wpid=""
  # Real seconds, sleep included; the watchdog above counts awake time only, so a gap between the
  # two means the Mac slept (night 3: 3 h 24 min for a 10-turn build).
  elapsed=$(( $(date +%s) - t0 ))
  rm -rf "$SHIM"
  T=$(mint) || T=""

  # Result line from the stream: model, MCP servers, outcome, turns, cost, denied tools.
  stats=$(node -e '
    const lines = require("fs").readFileSync(process.argv[1], "utf8").trim().split("\n");
    let r = null, init = null;
    for (const l of lines) { try { const j = JSON.parse(l); if (j.type === "result") r = j; if (j.type === "system" && j.subtype === "init") init = j; } catch {} }
    const head = init ? `model=${init.model} mcp=${(init.mcp_servers || []).map(m => m.name).join(",") || "none"} ` : "";
    if (!r) { console.log(head + "no-result"); process.exit(0); }
    const d = (r.permission_denials || []).map(x => x.tool_name + (x.tool_input?.command ? "(" + String(x.tool_input.command).slice(0, 60) + ")" : ""));
    console.log(head + `${r.subtype} turns=${r.num_turns} cost=$${(r.total_cost_usd || 0).toFixed(2)} denials=${d.length}` + (d.length ? " [" + d.join("; ") + "]" : ""));
  ' "$TLOG" 2>/dev/null || echo "unparsed")

  pr=$(claimed_by "$k")
  # Our own claim branch, still at the claim commit, is not a result: the build pushed nothing.
  # It stays on origin and keeps the ticket claimed until the owner deletes it (rebuilds: OV-122).
  claim_empty=false
  if [ "$pr" = "branch $BR" ] &&
     [ "$(with_timeout "$STEP_SEC" ls-remote git -C "$REPO_ROOT" ls-remote origin "refs/heads/$BR" 2>/dev/null | awk '{print $1}')" = "$CLAIM_SHA" ]; then
    pr="" claim_empty=true
  fi
  if [ -e "$TIMED_OUT" ]; then
    outcome="TIMEOUT after ${WALL_SEC} s"
    [ -n "$VERIFY_CMD" ] && (cd "$WT" && $VERIFY_CMD cleanup >/dev/null 2>&1)
  elif [ "$rc" -ne 0 ]; then
    outcome="FAIL exit $rc"
  else
    outcome="done"
  fi
  say "$k: $outcome; $stats elapsed=${elapsed}s; ${pr:-no PR found}; log $TLOG"
  [ "$claim_empty" = true ] && say "$k: claim branch $BR left empty on origin; delete it to let the ticket be built again"
  # Classified from the stream, not the exit code: a build with no PR is never a success here.
  timed_out=false
  [ -e "$TIMED_OUT" ] && timed_out=true
  emit build_end ticket="$k" log="$TLOG" rc:="$rc" elapsed_s:="$elapsed" timed_out:="$timed_out" claimed="$pr" \
    claim_branch="$BR" claim_empty:="$claim_empty"
  CUR_BR=""
  case $pr in "PR #"*|"branch "*) built=$((built + 1)) ;; esac

  reap_worktree "$WT" || say "$k: kept worktree $WT (unpushed work)"
done

say "=== run end (machine $MACHINE, mode=$TRIGGER): $built PR(s) for:$RUN_KEYS"
if [ "$attempted" -eq 0 ]; then run_outcome=idle; elif [ "$built" -gt 0 ]; then run_outcome=pr; else run_outcome=failed; fi
emit run_end outcome="$run_outcome" failure_class="$run_class" built:="$built" attempted:="$attempted" tickets="$RUN_KEYS"
