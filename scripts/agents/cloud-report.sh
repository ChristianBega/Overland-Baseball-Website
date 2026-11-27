#!/usr/bin/env bash
# cloud-report.sh — the morning report in the cloud (OV-198, epic OV-172 Phase 2). Replaces the Mac's
# 06:30 launchd job (com.overland.morning): a Claude Code cloud scheduled task runs this at 07:47
# America/Denver with the website repo and the diary repo attached, and its prompt only runs this.
#
#   bash scripts/agents/cloud-report.sh [--night YYYY-MM-DD]
#
# 1. Slack webhook: $AGENTS_SLACK_WEBHOOK (an env var of the cloud environment) goes to a chmod 600
#    temp file for notify.mjs, which only reads a file. The URL is never echoed or put on a command
#    line, and the raw variable is unset before anything else runs. Without $AGENTS_SLACK_WEBHOOK it
#    uses $AGENTS_SLACK_WEBHOOK_FILE if set, else a missing file: nothing posts, notify.mjs writes
#    report/<night>/notify-morning.md instead, and this script reports "not posted".
# 2. Diary (config diary.repo / diary.branch): $AGENTS_DIARY_DIR if set (cloned there if missing),
#    else the attached checkout (a folder next to this repo whose origin is diary.repo), else a fresh
#    clone in a temp dir. Its origin must be diary.repo on github.com (or the cloud's GitHub proxy).
#    Then checkout diary.branch and pull --rebase.
# 3. node report.mjs --morning --diary <dir> --night <night>. The night is the date at
#    $AGENTS_AT (default 01:00): before it, yesterday. report.mjs writes report/<night>.jsonl and
#    report/<night>/ and posts to Slack once per result. Exit 2 (unreadable diary) stops here.
# 4. Commit report/ only, as the session's git identity (a fixed noreply one if it has none), and
#    push it to diary.branch: one pull --rebase and retry if rejected. Before pushing, every path the
#    push would add must be under report/; anything else refuses the push. The Mac only writes mac/,
#    so the two never conflict.
# 5. One last line on stdout:
#      cloud-report: night <night> <status>; slack <result>; diary <result>
#    Progress goes to stderr. Exit 0 when the report ran, Slack posted (or had already posted this
#    result) and report/ is pushed (or unchanged); 2 for an unreadable diary; 1 for anything else.
#
# Every run commits report/ again when report.md / report.json changed (they carry a generated time
# and the latest sweep), even when Slack is not posted again; that is the record of each run.
#
# The scheduled task (set in claude.ai/code, not in this repo): environment overland-agents (TZ,
# AGENTS_SLACK_WEBHOOK, network access to hooks.slack.com), repositories Overland-Baseball-Website
# and overland-agents-state, no connectors, schedule `CRON_TZ=America/Denver 47 7 * * *`, prompt:
#   Run `bash scripts/agents/cloud-report.sh` from the Overland-Baseball-Website checkout. Reply with
#   the last line it prints. Run no other command: do not retry, edit files, commit or push.
# The repo's .claude/settings.json hooks and permission rules do not load in a session with several
# repositories, so the push guard above (report/ only) is the only one this push has.
#
# Retiring the Mac's 06:30 job, once the posts match:
#   launchctl bootout gui/$(id -u)/com.overland.morning && rm ~/Library/LaunchAgents/com.overland.morning.plist
# (launchd/install.sh writes it again if re-run.)
#
# Test without Slack or GitHub: AGENTS_SLACK_WEBHOOK_FILE=<a local http stub's URL file> (or unset),
# AGENTS_DIARY_DIR=<scratch clone>, and a url.<bare repo>.insteadOf rewrite for the diary's URL.

set -u
umask 077
export GIT_TERMINAL_PROMPT=0

HERE=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$HERE/../.." && pwd)
CONFIG=$REPO_ROOT/.claude/agents.config.json
GIT_TIMEOUT_SEC=${CLOUD_REPORT_GIT_TIMEOUT:-90}
REPORT_DIR=report
FALLBACK_NAME="overland cloud report"
FALLBACK_EMAIL="cloud-report@overland.invalid"

say() { printf 'cloud-report: %s\n' "$*" >&2; }

NIGHT="" STATUS="not run" SLACK="not run" DIARY_RESULT="not pushed"
finish() {
  printf 'cloud-report: night %s %s; slack %s; diary %s\n' "${NIGHT:-?}" "$STATUS" "$SLACK" "$DIARY_RESULT"
  exit "$1"
}
fail() { say "FAILED: $1"; DIARY_RESULT="not pushed (failed at $1)"; finish "${2:-1}"; }

while [ $# -gt 0 ]; do
  case $1 in
    --night) NIGHT=${2:-}; shift 2 || shift ;;
    *) say "unknown argument: $1"; finish 1 ;;
  esac
done
if [ -n "$NIGHT" ] && ! [[ $NIGHT =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  say "--night must be YYYY-MM-DD"; NIGHT=""; finish 1
fi

TMPD=$(mktemp -d) || { say "mktemp failed"; finish 1; }
trap 'rm -rf "$TMPD"' EXIT

# write_webhook_file — $AGENTS_SLACK_WEBHOOK to a chmod 600 file, exported as
# AGENTS_SLACK_WEBHOOK_FILE; the variable itself is unset. printf is a builtin, so the URL is never
# in a process's argv. Phase 3 (the cloud builder) reuses this step.
write_webhook_file() {
  if [ -n "${AGENTS_SLACK_WEBHOOK:-}" ]; then
    (umask 077 && printf '%s\n' "$AGENTS_SLACK_WEBHOOK" > "$TMPD/slack-webhook") || return 1
    chmod 600 "$TMPD/slack-webhook" || return 1
    export AGENTS_SLACK_WEBHOOK_FILE="$TMPD/slack-webhook"
    say "slack webhook: from the environment"
  elif [ -n "${AGENTS_SLACK_WEBHOOK_FILE:-}" ]; then
    say "slack webhook: AGENTS_SLACK_WEBHOOK_FILE"
  else
    # Never fall through to notify.mjs's default ($AGENTS_HOME/slack-webhook, the Mac's file).
    export AGENTS_SLACK_WEBHOOK_FILE="$TMPD/no-webhook"
    say "slack webhook: none (AGENTS_SLACK_WEBHOOK is not set); the post goes to notify-morning.md"
  fi
  unset AGENTS_SLACK_WEBHOOK
}
write_webhook_file || fail "webhook file"

# cfg <dotted.path> — a config value (as overnight.sh cfg).
cfg() {
  node -e '
    const v = process.argv[2].split(".").reduce((o, k) => (o == null ? o : o[k]), require(process.argv[1]));
    if (v == null) process.exit(1);
    console.log(typeof v === "object" ? JSON.stringify(v) : String(v));
  ' "$CONFIG" "$1"
}
D_REPO=$(cfg diary.repo 2>/dev/null) || fail "config (diary.repo not readable from $CONFIG)"
D_BRANCH=$(cfg diary.branch 2>/dev/null) || D_BRANCH=main

# with_timeout <cmd...> — bounded git network steps (coreutils timeout; none on stock macOS).
with_timeout() {
  if command -v timeout >/dev/null 2>&1; then timeout "$GIT_TIMEOUT_SEC" "$@"; else "$@"; fi
}

# origin_ok <dir> — the clone's origin is diary.repo: on github.com, or through the cloud's local
# GitHub proxy (http://...@127.0.0.1:<port>/git/<owner>/<repo>). The raw config value is read
# (insteadOf is not applied), and the URL is never printed: it can hold credentials.
origin_ok() {
  local u
  u=$(git -C "$1" config --get remote.origin.url 2>/dev/null) || return 1
  case $u in
    https://github.com/"$D_REPO" | https://github.com/"$D_REPO".git | \
    git@github.com:"$D_REPO" | git@github.com:"$D_REPO".git | \
    ssh://git@github.com/"$D_REPO" | ssh://git@github.com/"$D_REPO".git) return 0 ;;
    http://*@127.0.0.1:*/git/"$D_REPO" | http://*@127.0.0.1:*/git/"$D_REPO".git | \
    http://127.0.0.1:*/git/"$D_REPO" | http://127.0.0.1:*/git/"$D_REPO".git) return 0 ;;
  esac
  return 1
}

# ---------- 2. the diary clone ----------
DIARY=""
if [ -n "${AGENTS_DIARY_DIR:-}" ]; then
  DIARY=$AGENTS_DIARY_DIR
else
  for d in "$(dirname "$REPO_ROOT")"/*/; do
    d=${d%/}
    [ -d "$d/.git" ] && [ "$d" != "$REPO_ROOT" ] && origin_ok "$d" && { DIARY=$d; break; }
  done
fi
if [ -z "$DIARY" ]; then
  DIARY=$TMPD/diary
  say "diary: cloning $D_REPO"
  with_timeout git clone -q "https://github.com/$D_REPO.git" "$DIARY" >&2 || fail "clone"
elif [ ! -e "$DIARY" ]; then
  say "diary: cloning $D_REPO into $DIARY"
  with_timeout git clone -q "https://github.com/$D_REPO.git" "$DIARY" >&2 || fail "clone"
else
  say "diary: using $DIARY"
fi
if [ -d "$DIARY/.git" ]; then
  origin_ok "$DIARY" || fail "origin check (the clone's origin is not $D_REPO)"
  cd "$DIARY" || fail "cd"
  git checkout -q "$D_BRANCH" >&2 || fail "checkout $D_BRANCH"
  with_timeout git pull -q --rebase --autostash origin "$D_BRANCH" >&2 || { git rebase --abort 2>/dev/null; fail "pull"; }
fi
# A path that is not a git clone is left to report.mjs, which exits 2 for it.

# ---------- 3. the report ----------
if [ -z "$NIGHT" ]; then
  NIGHT=$(AGENTS_AT=${AGENTS_AT:-01:00} node -e '
    const m = process.env.AGENTS_AT.match(/^(\d{1,2}):(\d{2})$/) || [0, 1, 0];
    const n = new Date();
    const d = n.getHours() * 60 + n.getMinutes() < m[1] * 60 + Number(m[2])
      ? new Date(n.getFullYear(), n.getMonth(), n.getDate() - 1, 12) : n;
    const p = (x) => String(x).padStart(2, "0");
    console.log(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`);') || fail "night"
fi
OWN=$DIARY/$REPORT_DIR/$NIGHT.jsonl
checks() { grep -c '"event":"morning_check"' "$OWN" 2>/dev/null || true; }
before=$(checks)
fallback=$DIARY/$REPORT_DIR/$NIGHT/notify-morning.md
had_fallback=0
[ -f "$fallback" ] && had_fallback=1
say "report: night $NIGHT"
node "$HERE/report.mjs" --morning --diary "$DIARY" --night "$NIGHT" >"$TMPD/report.out"
rc=$?
if [ "$rc" -eq 2 ]; then
  STATUS="not reported (diary not readable)"; SLACK="not posted"
  DIARY_RESULT="not pushed (diary not readable: $DIARY)"
  finish 2
fi
[ "$rc" -eq 0 ] || fail "report.mjs (exit $rc)"
ok=1
STATUS=$(node -e 'const d = require(process.argv[1]); console.log(d.paused ? `${d.status} (paused)` : d.status)' \
  "$DIARY/$REPORT_DIR/$NIGHT/report.json" 2>/dev/null) || { STATUS="unknown (no report.json)"; ok=0; }
# report.mjs prints to stdout only when it crashed or could not write report.md.
if [ -s "$TMPD/report.out" ]; then
  STATUS="report failed ($(grep -m 1 -o 'Report failed[^*]*' "$TMPD/report.out" || echo "report.md not written"))"
  ok=0
fi

if [ "$ok" -eq 0 ]; then
  SLACK="unknown (see report failure)"
elif [ -f "$fallback" ]; then
  why=$(head -n 1 "$fallback" | sed -e 's/^<!-- not posted: //' -e 's/ -->$//')
  SLACK="NOT posted ($why)"; ok=0
elif [ "$(checks)" != "$before" ] || [ "$had_fallback" -eq 1 ]; then
  SLACK="posted"
else
  SLACK="already posted (same result as an earlier run)"
fi

# ---------- 4. commit and push report/ ----------
git add -A -- "$REPORT_DIR" || fail "add"
if git diff --cached --quiet -- "$REPORT_DIR"; then
  DIARY_RESULT="unchanged (nothing to push)"
else
  ident=()
  if [ -z "$(git config user.email 2>/dev/null)" ] || [ -z "$(git config user.name 2>/dev/null)" ]; then
    ident=(-c "user.name=$FALLBACK_NAME" -c "user.email=$FALLBACK_EMAIL")
    say "git identity: none configured; committing as $FALLBACK_NAME"
  fi
  git ${ident[@]+"${ident[@]}"} commit -q -m "report: $NIGHT morning (cloud)" -- "$REPORT_DIR" >&2 || fail "commit"
  # Guard (the repo's push hook does not run in the cloud): push only report/ to diary.branch.
  # Every commit ahead of origin is checked, not the net diff, so a change undone later still counts.
  only_report() {
    local names bad
    names=$(git log --format= --name-only "origin/$D_BRANCH..HEAD") || { say "refusing to push: cannot list commits ahead of origin"; return 1; }
    bad=$(printf '%s\n' "$names" | grep -v -e "^$REPORT_DIR/" -e '^$' | sort -u | head -n 3 | tr '\n' ' ')
    [ -z "$bad" ] || { say "refusing to push: commits ahead of origin touch $bad"; return 1; }
  }
  only_report || fail "push guard (non-report/ changes)"
  if ! with_timeout git push -q origin "HEAD:$D_BRANCH" >&2; then
    say "push rejected or failed; one pull --rebase and retry"
    with_timeout git pull -q --rebase --autostash origin "$D_BRANCH" >&2 || { git rebase --abort 2>/dev/null; fail "pull before retry"; }
    only_report || fail "push guard (non-report/ changes)"
    with_timeout git push -q origin "HEAD:$D_BRANCH" >&2 || fail "push"
  fi
  DIARY_RESULT="pushed $(git rev-parse --short HEAD)"
fi

[ "$ok" -eq 1 ] && finish 0
finish 1
