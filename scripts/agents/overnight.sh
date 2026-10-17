#!/bin/sh
# Overnight runner: pick ready tickets from Jira, build each one as the bot in its own worktree, one
# PR per ticket. Sequential. launchd (or cron) is only the trigger; this script is the whole run.
#
#   sh scripts/agents/overnight.sh            # normal run
#   AGENTS_DRY_RUN=1 sh scripts/agents/overnight.sh   # pick + claim only, build nothing
#
# Repo facts come from .claude/agents.config.json (jira, repo, bot, labels, commands, runner).
# Machine facts come from env vars (defaults in brackets):
#   AGENTS_HOME     PAUSE file, lock, worktrees, scratch    [~/.agents/<repo dir name>]
#   AGENTS_LOG_DIR  per-night logs                          [~/Library/Logs/<repo>-agents on macOS,
#                                                            ${XDG_STATE_HOME:-~/.local/state}/<repo>-agents elsewhere]
#   AGENTS_DRY_RUN  1 = stop after the claim step
#   AGENTS_WALL_CLOCK_SECONDS  override runner.wallClockMinutes (testing the watchdog)
#   BOT_KEY_PATH / BOT_APP_ID   passed through to bot-token.mjs
#
# Kill switch: `touch $AGENTS_HOME/PAUSE`. The bot token is never written to a log or a command line.

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

NIGHT=$(date +%Y-%m-%d)
LOG_DIR="$AGENTS_LOG_DIR/$NIGHT"
SUMMARY="$LOG_DIR/summary.log"
mkdir -p "$AGENTS_HOME" "$LOG_DIR" || exit 1

say() {
  printf '%s %s\n' "$(date +%H:%M:%S)" "$*" | tee -a "$SUMMARY"
}

die() {
  say "ABORT: $*"
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
  exit 0
fi

# ---- 2. lock (one run at a time) --------------------------------------------------------------
LOCK="$AGENTS_HOME/lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  old=$(cat "$LOCK/pid" 2>/dev/null)
  if [ -n "$old" ] && kill -0 "$old" 2>/dev/null; then
    say "another run is active (pid $old); exiting"
    exit 0
  fi
  say "removing stale lock (pid ${old:-?})"
  rm -rf "$LOCK"
  mkdir "$LOCK" || die "cannot take lock $LOCK"
fi
echo $$ > "$LOCK/pid"
cpid="" wpid=""
# On exit (or kill), stop any build and watchdog still running, then release the lock.
trap '[ -n "$cpid" ] && kill -TERM -"$cpid" 2>/dev/null; [ -n "$wpid" ] && { pkill -P "$wpid"; kill "$wpid"; } 2>/dev/null; rm -rf "$LOCK"' EXIT
trap 'exit 130' INT TERM

say "=== run start (repo $REPO_NAME, dry-run $DRY_RUN)"

# ---- 3. preflight: all or nothing -------------------------------------------------------------
for bin in node git gh claude; do
  command -v "$bin" >/dev/null 2>&1 || die "$bin not on PATH ($PATH)"
done
[ -f "$CONFIG" ] || die "no config at $CONFIG"

BASE=$(cfg repo.baseBranch) || die "repo.baseBranch missing"
JIRA_KEY=$(cfg jira.projectKey) || die "jira.projectKey missing"
CLOUD_ID=$(cfg jira.cloudId) || die "jira.cloudId missing"
READY=$(cfg labels.jira.readyForBuild) || die "labels.jira.readyForBuild missing"
BLOCKED=$(cfg labels.jira.blocked) || die "labels.jira.blocked missing"
SIZES=$(cfg runner.allowedSizes | sed 's/.*/"&"/' | paste -sd, -)
AGENT=$(cfg runner.builderAgent) || die "runner.builderAgent missing"
MAX_TICKETS=$(cfg runner.maxTicketsPerNight) || die "runner.maxTicketsPerNight missing"
MAX_TURNS=$(cfg runner.maxTurns || echo 150)
WALL_MIN=$(cfg runner.wallClockMinutes || echo 50)
WALL_SEC=${AGENTS_WALL_CLOCK_SECONDS:-$((WALL_MIN * 60))}
MAX_USD=$(cfg runner.maxBudgetUsd || echo 15)
PICK_MODEL=$(cfg runner.pickModel || echo sonnet)
COMMIT_NAME=$(cfg bot.commitName) || die "bot.commitName missing"
COMMIT_EMAIL=$(cfg bot.commitEmail) || die "bot.commitEmail missing"
VERIFY_CMD=$(cfg commands.verify || true)

git -C "$REPO_ROOT" fetch -q origin "$BASE" || die "git fetch origin $BASE failed"
node "$REPO_ROOT/scripts/agents/bot-token.mjs" >/dev/null || die "bot token mint failed (see bot-token message above)"

mint() {
  node "$REPO_ROOT/scripts/agents/bot-token.mjs"
}

# ---- 4. pick (read-only Jira, via a short claude -p call) -------------------------------------
JQL="project = $JIRA_KEY AND labels = \"$READY\" AND labels not in (\"$BLOCKED\") AND labels in ($SIZES) AND statusCategory != Done ORDER BY created DESC"
PICK_PROMPT="Call mcp__atlassian__searchJiraIssuesUsingJql once with cloudId \"$CLOUD_ID\", maxResults 10, fields [\"summary\"] and this JQL:
$JQL
Then reply with ONLY a JSON array of the issue keys in the order returned, e.g. [\"$JIRA_KEY-1\"], or [] if there are none. No prose. If the tool fails or needs authentication, reply with ONLY: ERROR: <one-line reason>"

say "pick: $JQL"
PICK_OUT=$(cd "$REPO_ROOT" && claude -p --model "$PICK_MODEL" --max-turns 4 --output-format json \
  --permission-prompts none --allowedTools mcp__atlassian__searchJiraIssuesUsingJql \
  -- "$PICK_PROMPT" 2>>"$LOG_DIR/pick.err") || die "pick: claude -p failed (Claude login? see $LOG_DIR/pick.err)"
printf '%s\n' "$PICK_OUT" > "$LOG_DIR/pick.json"

KEYS=$(printf '%s' "$PICK_OUT" | node -e '
  let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
    const key = process.argv[1];
    let r;
    try { r = JSON.parse(s); } catch { console.error("pick output is not JSON"); process.exit(1); }
    const text = String(r.result ?? "").trim();
    if (r.is_error || /^ERROR:/.test(text)) { console.error(text || r.subtype || "pick failed"); process.exit(1); }
    const m = text.match(/\[[\s\S]*\]/);
    let keys;
    try { keys = JSON.parse(m ? m[0] : text); } catch { console.error("no JSON array in: " + text.slice(0, 200)); process.exit(1); }
    const re = new RegExp("^" + key + "-\\d+$");
    for (const k of keys) {
      if (!re.test(k)) { console.error("unexpected key: " + k); process.exit(1); }
      console.log(k);
    }
  });' "$JIRA_KEY" 2>>"$SUMMARY") || die "pick: unusable result (raw in $LOG_DIR/pick.json)"

if [ -z "$KEYS" ]; then
  say "pick: no ready tickets; done"
  exit 0
fi
say "pick: $(printf '%s' "$KEYS" | paste -sd' ' -)"

# ---- 5. claim (no Jira write): an existing PR or remote branch means someone has it -----------
T=$(mint) || die "bot token mint failed"
claimed_by() {
  k=$1
  # A failed gh call counts as claimed: better to skip a ticket than to build a duplicate PR.
  json=$(GH_TOKEN=$T gh pr list --state all --search "$k" --limit 20 --json number,title,headRefName 2>/dev/null) ||
    { printf 'gh pr list failed'; return; }
  hit=$(printf '%s' "$json" |
    node -e '
      let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
        const re = new RegExp("(^|[^A-Za-z0-9])" + process.argv[1] + "(?![0-9])");
        const pr = JSON.parse(s).find(p => re.test(p.title) || re.test(p.headRefName));
        if (pr) console.log("PR #" + pr.number);
      });' "$k" 2>/dev/null) || hit="gh pr list unparsable"
  if [ -z "$hit" ]; then
    br=$(git -C "$REPO_ROOT" ls-remote --heads origin 2>/dev/null | awk '{print $2}' | grep -E "/$k\$" | head -1)
    [ -n "$br" ] && hit="branch ${br#refs/heads/}"
  fi
  printf '%s' "$hit"
}

TODO=""
n=0
for k in $KEYS; do
  [ "$n" -ge "$MAX_TICKETS" ] && break
  c=$(claimed_by "$k")
  if [ -n "$c" ]; then
    say "$k: skip (claimed: $c)"
  else
    TODO="$TODO $k"
    n=$((n + 1))
  fi
done

if [ -z "$TODO" ]; then
  say "nothing unclaimed; done"
  exit 0
fi
say "to build:$TODO"
if [ "$DRY_RUN" = 1 ]; then
  say "dry run: stopping before build"
  exit 0
fi

# reap_worktree <dir> — remove a runner worktree (and its scratch dir) unless it holds work that
# never reached the remote. Returns 1 if it was kept.
reap_worktree() {
  w=$1
  if [ -z "$(git -C "$w" status --porcelain 2>/dev/null)" ] &&
     [ -z "$(git -C "$w" log --oneline '@{u}..' 2>/dev/null)" ] &&
     { git -C "$w" rev-parse -q --verify '@{u}' >/dev/null 2>&1 ||
       [ -z "$(git -C "$w" log --oneline "origin/$BASE..HEAD" 2>/dev/null)" ]; }; then
    git -C "$REPO_ROOT" worktree remove --force "$w" 2>/dev/null && rm -rf "$TMPDIR/$(basename "$w")"
    return 0
  fi
  return 1
}

# ---- 6. build, one ticket at a time -----------------------------------------------------------
# Headless allowlist from the config, as positional args for --allowedTools.
set --
while IFS= read -r tool; do
  [ -n "$tool" ] && set -- "$@" "$tool"
done <<EOF
$(cfg runner.allowedTools)
EOF
[ $# -gt 0 ] || die "runner.allowedTools is empty"

export TMPDIR="$AGENTS_HOME/tmp"
mkdir -p "$TMPDIR" "$AGENTS_HOME/worktrees"
for w in "$AGENTS_HOME"/worktrees/*; do
  [ -d "$w" ] || continue
  reap_worktree "$w" && say "removed leftover worktree $w" || say "leftover worktree kept (unpushed work): $w"
done
git -C "$REPO_ROOT" worktree prune

built=0
for k in $TODO; do
  [ -e "$AGENTS_HOME/PAUSE" ] && { say "paused mid-run; stopping before $k"; break; }

  slug=$(printf '%s' "$k" | tr 'A-Z' 'a-z')
  stamp=$(date +%H%M%S)
  WT="$AGENTS_HOME/worktrees/$slug-$stamp"
  SCRATCH="$TMPDIR/$slug-$stamp"
  TLOG="$LOG_DIR/$k.log"
  mkdir -p "$SCRATCH"

  if ! git -C "$REPO_ROOT" worktree add -q --detach "$WT" "origin/$BASE" 2>>"$SUMMARY"; then
    say "$k: FAIL worktree add"
    continue
  fi
  # Gitignored files the build needs (e.g. client/.env). Copied, never read.
  while IFS= read -r f; do
    [ -n "$f" ] && [ -f "$REPO_ROOT/$f" ] && cp "$REPO_ROOT/$f" "$WT/$f"
  done <<EOF
$(cfg runner.envFiles || true)
EOF

  T=$(mint) || { say "$k: FAIL bot token mint"; break; }
  PROMPT="do $k (unattended). Scratch directory for PR body and other temp files: $SCRATCH"
  say "$k: build start (worktree $WT, caps ${MAX_TURNS} turns / ${WALL_SEC} s / \$${MAX_USD})"

  # Job control on, so the build gets its own process group and the watchdog can kill claude plus
  # anything it started (dev server, browser) in one go.
  set -m
  # Bot identity through the environment only: gh reads GH_TOKEN; git gets a credential helper that
  # reads $GH_TOKEN at push time (the owner's helpers are reset) and the bot's author/committer.
  (
    cd "$WT" || exit 1
    export GH_TOKEN="$T"
    export GIT_CONFIG_COUNT=2
    export GIT_CONFIG_KEY_0=credential.helper GIT_CONFIG_VALUE_0=
    export GIT_CONFIG_KEY_1=credential.helper
    export GIT_CONFIG_VALUE_1='!f() { echo username=x-access-token; echo "password=$GH_TOKEN"; }; f'
    export GIT_AUTHOR_NAME="$COMMIT_NAME" GIT_AUTHOR_EMAIL="$COMMIT_EMAIL"
    export GIT_COMMITTER_NAME="$COMMIT_NAME" GIT_COMMITTER_EMAIL="$COMMIT_EMAIL"
    # Deny beats allow: the feature/* and fix/* push rules must never reach a protected branch, a
    # refspec, a deletion or a force push.
    exec claude -p --agent "$AGENT" --max-turns "$MAX_TURNS" --max-budget-usd "$MAX_USD" \
      --permission-prompts none --output-format stream-json --verbose \
      --add-dir "$SCRATCH" \
      --disallowedTools 'Bash(git push *:*)' 'Bash(git push * development*)' 'Bash(git push * main*)' \
        'Bash(git push *--force*)' 'Bash(git push * -f*)' 'Bash(git push *+*)' 'Bash(git push *--delete*)' \
      --allowedTools "$@" -- "$PROMPT"
  ) < /dev/null > "$TLOG" 2>&1 &
  cpid=$!
  set +m

  TIMED_OUT="$SCRATCH/.timed-out"
  (
    sleep "$WALL_SEC"
    if kill -0 "$cpid" 2>/dev/null; then
      : > "$TIMED_OUT"
      kill -TERM -"$cpid" 2>/dev/null || kill -TERM "$cpid" 2>/dev/null
      sleep 30
      kill -KILL -"$cpid" 2>/dev/null
    fi
  ) 2>/dev/null &
  wpid=$!

  wait "$cpid"
  rc=$?
  cpid=""
  pkill -P "$wpid" 2>/dev/null
  kill "$wpid" 2>/dev/null
  wpid=""
  T=$(mint) || T=""

  # Result line from the stream: outcome, turns, cost, denied tools.
  stats=$(node -e '
    const lines = require("fs").readFileSync(process.argv[1], "utf8").trim().split("\n");
    let r = null;
    for (const l of lines) { try { const j = JSON.parse(l); if (j.type === "result") r = j; } catch {} }
    if (!r) { console.log("no-result"); process.exit(0); }
    const d = (r.permission_denials || []).map(x => x.tool_name + (x.tool_input?.command ? "(" + String(x.tool_input.command).slice(0, 60) + ")" : ""));
    console.log(`${r.subtype} turns=${r.num_turns} cost=$${(r.total_cost_usd || 0).toFixed(2)} denials=${d.length}` + (d.length ? " [" + d.join("; ") + "]" : ""));
  ' "$TLOG" 2>/dev/null || echo "unparsed")

  pr=$(claimed_by "$k")
  if [ -e "$TIMED_OUT" ]; then
    outcome="TIMEOUT after ${WALL_SEC} s"
    [ -n "$VERIFY_CMD" ] && (cd "$WT" && $VERIFY_CMD cleanup >/dev/null 2>&1)
  elif [ "$rc" -ne 0 ]; then
    outcome="FAIL exit $rc"
  else
    outcome="done"
  fi
  say "$k: $outcome; $stats; ${pr:-no PR found}; log $TLOG"
  [ -n "$pr" ] && built=$((built + 1))

  reap_worktree "$WT" || say "$k: kept worktree $WT (unpushed work)"
done

say "=== run end: $built PR(s) for:$TODO"
