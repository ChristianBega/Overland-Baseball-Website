#!/bin/sh
# The owner's commands for the overnight runner on this machine.
#
#   sh scripts/agents/agents.sh status            # machine profile, PAUSE, AGENTS_PAUSED, lock, last run
#   sh scripts/agents/agents.sh pause|resume      # master kill switch: repo variable AGENTS_PAUSED true|false
#   sh scripts/agents/agents.sh auto on|off       # scheduled runs on/off (machine.json autoRun)
#   sh scripts/agents/agents.sh run [KEY ...]     # a run now: the normal pick, or only these tickets
#
# pause/resume set AGENTS_PAUSED with your own `gh` login (GH_TOKEN / GITHUB_TOKEN ignored): every
# machine's runs stop before the next ticket, and nothing starts. The bot can only read it. The local
# $AGENTS_HOME/PAUSE file is still a per-machine stop on top of it.
# They also write the cloud's copy of the switch (OV-198): cloud sessions cannot read AGENTS_PAUSED
# (the Claude GitHub proxy blocks every Actions API path), so control/AGENTS_PAUSED.json in the
# diary repo (config diary.repo) holds the value for them. It is pushed from a fresh temp clone with
# your git login. If that push fails the variable is still set: the command says so and exits 1, and
# the next scheduled run's tripwire (overnight.sh diary_push) fixes the copy. Flip the switch with
# these commands, not on github.com, or the copy is stale until that run.
#
# `run` ignores autoRun and runner.startWindow; PAUSE, AGENTS_PAUSED and the lock still apply, and
# named tickets must still be ready-for-build and unclaimed. AGENTS_MAX_TICKETS caps the run;
# AGENTS_DRY_RUN=1 stops before the build. Use the runner checkout's copy ($AGENTS_HOME/runner/scripts/agents/agents.sh)
# so a run uses the merged runner, not work in progress.
#
# Env as overnight.sh: AGENTS_HOME [~/.agents/<repo dir name>], AGENTS_LOG_DIR.

set -u

HERE=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$HERE/../.." && pwd)
REPO_NAME=$(basename "$REPO_ROOT")
AGENTS_HOME=${AGENTS_HOME:-$HOME/.agents/$REPO_NAME}
. "$HERE/platform.sh"   # PLATFORM, DEFAULT_LOG_DIR
AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-$DEFAULT_LOG_DIR}
PROFILE="$AGENTS_HOME/machine.json"
# owner/name of origin, as overnight.sh (any credential in the URL is stripped).
REPO=$(git -C "$REPO_ROOT" remote get-url origin 2>/dev/null |
  sed -E 's#^[a-z+]+://([^@/]*@)?[^/]+/##; s#^[^@/]*@[^:]*:##; s#\.git$##')

CONFIG="$REPO_ROOT/.claude/agents.config.json"
# cfg <dotted.path> — a config value (as overnight.sh cfg).
cfg() {
  node -e '
    const v = process.argv[2].split(".").reduce((o, k) => (o == null ? o : o[k]), require(process.argv[1]));
    if (v == null) process.exit(1);
    console.log(String(v));
  ' "$CONFIG" "$1"
}
SWITCH_COPY=control/AGENTS_PAUSED.json

# switch_copy_push <true|false> <set_by> — write the copy and push it to diary.branch, from a fresh
# shallow clone (whatever $AGENTS_HOME this shell has). One pull --rebase and retry if rejected.
switch_copy_push() {
  d_repo=$(cfg diary.repo 2>/dev/null) || { echo "agents: diary.repo not readable from $CONFIG" >&2; return 1; }
  d_branch=$(cfg diary.branch 2>/dev/null) || d_branch=main
  d_tmp=$(mktemp -d) || return 1
  (
    unset GH_TOKEN GITHUB_TOKEN
    export GIT_TERMINAL_PROMPT=0
    git clone -q --depth 1 --branch "$d_branch" "https://github.com/$d_repo.git" "$d_tmp/diary" || exit 1
    cd "$d_tmp/diary" || exit 1
    mkdir -p "$(dirname "$SWITCH_COPY")" || exit 1
    node -e 'const [f, value, by, repo] = process.argv.slice(1);
      require("fs").writeFileSync(f, JSON.stringify({ value, set_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"), set_by: by, repo }) + "\n");' \
      "$SWITCH_COPY" "$1" "$2" "$REPO" || exit 1
    git add -- "$SWITCH_COPY" || exit 1
    git diff --cached --quiet || git commit -q -m "control: AGENTS_PAUSED=$1 ($2)" || exit 1
    git push -q origin "HEAD:$d_branch" ||
      { git pull -q --rebase origin "$d_branch" && git push -q origin "HEAD:$d_branch"; }
  )
  d_rc=$?
  rm -rf "$d_tmp"
  [ "$d_rc" -eq 0 ] && echo "cloud copy: $SWITCH_COPY=$1 pushed to $d_repo"
  return "$d_rc"
}

# switch_copy_line <real value> — the status line for the copy (read with your gh login).
switch_copy_line() {
  d_repo=$(cfg diary.repo 2>/dev/null) || { echo "cloud copy: diary.repo not readable from $CONFIG"; return; }
  c=$(env -u GH_TOKEN -u GITHUB_TOKEN gh api "repos/$d_repo/contents/$SWITCH_COPY" -H "Accept: application/vnd.github.raw" 2>/dev/null |
    node -e 'let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
      try { const j = JSON.parse(s); console.log(`${j.value}\t${j.set_by || "?"}, ${j.set_at || "?"}`); } catch { process.exit(1); } });') ||
    { echo "cloud copy: missing or unreadable ($d_repo $SWITCH_COPY; the cloud report treats this as paused)"; return; }
  cv=${c%%"	"*} why=${c#*"	"}
  if [ "$cv" = "$1" ]; then echo "cloud copy: $cv ($why) matches"
  else
    case $1 in true) fix="; run agents.sh pause to fix" ;; false) fix="; run agents.sh resume to fix" ;; *) fix="" ;; esac
    echo "cloud copy: $cv ($why) STALE: AGENTS_PAUSED is ${1:-unreadable}$fix"
  fi
}

usage() {
  echo "usage: agents.sh status | pause | resume | auto on|off | run [KEY ...]" >&2
  exit 2
}

no_profile() {
  echo "agents: no machine profile at $PROFILE; create it:" >&2
  echo "  printf '{ \"name\": \"<machine>\", \"autoRun\": true }\\n' > \"$PROFILE\"" >&2
  exit 1
}

case ${1:-} in
  status)
    if [ -f "$PROFILE" ]; then
      printf 'profile: %s (%s)\n' "$(tr '\n' ' ' < "$PROFILE" | tr -s ' ')" "$PROFILE"
    else
      echo "profile: missing ($PROFILE)"
    fi
    [ -e "$AGENTS_HOME/PAUSE" ] && echo "PAUSE:   yes ($AGENTS_HOME/PAUSE)" || echo "PAUSE:   no"
    v=$(env -u GH_TOKEN -u GITHUB_TOKEN gh variable get AGENTS_PAUSED -R "$REPO" 2>/dev/null) || v=""
    case $v in
      true) echo "AGENTS_PAUSED: true (runs are paused; agents.sh resume)" ;;
      false) echo "AGENTS_PAUSED: false" ;;
      *) echo "AGENTS_PAUSED: unreadable${v:+ (\"$v\")} for $REPO (runs treat this as paused)" ;;
    esac
    switch_copy_line "$v"
    pid=$(cat "$AGENTS_HOME/lock/pid" 2>/dev/null)
    if [ -z "$pid" ]; then echo "lock:    free"
    elif kill -0 "$pid" 2>/dev/null && ps -p "$pid" -o command= 2>/dev/null | grep -q 'overnight\.sh'; then
      echo "lock:    held by pid $pid (a run is active)"
    else echo "lock:    stale (pid $pid is not a running overnight.sh; the next run removes it)"
    fi
    node -e '
      const fs = require("fs");
      let last = null;
      try {
        for (const l of fs.readFileSync(process.argv[1], "utf8").split("\n")) {
          try { const e = JSON.parse(l); if (e.event === "run_end" || e.event === "run_abort") last = e; } catch {}
        }
      } catch {}
      if (!last) { console.log("last run: none in " + process.argv[1]); process.exit(0); }
      const bits = [last.ts, last.event, last.outcome, last.failure_class, last.machine && "machine " + last.machine,
        last.dry_run && "dry run", last.reason].filter(Boolean);
      console.log("last run: " + bits.join(" · "));
    ' "$AGENTS_LOG_DIR/events.jsonl"
    ;;
  pause | resume)
    [ "$1" = pause ] && v=true || v=false
    [ -n "$REPO" ] || { echo "agents: no origin remote in $REPO_ROOT" >&2; exit 1; }
    env -u GH_TOKEN -u GITHUB_TOKEN gh variable set AGENTS_PAUSED --body "$v" -R "$REPO" ||
      { echo "agents: could not set AGENTS_PAUSED on $REPO (gh auth status?)" >&2; exit 1; }
    echo "AGENTS_PAUSED=$v on $REPO"
    switch_copy_push "$v" "agents.sh $1" ||
      { echo "agents: AGENTS_PAUSED is set, but the cloud copy was NOT pushed (the cloud reads a stale value until the next run fixes it; re-run agents.sh $1)" >&2; exit 1; }
    ;;
  auto)
    case ${2:-} in on) v=true ;; off) v=false ;; *) usage ;; esac
    [ -f "$PROFILE" ] || no_profile
    node -e '
      const fs = require("fs"), f = process.argv[1];
      const p = JSON.parse(fs.readFileSync(f, "utf8"));
      p.autoRun = process.argv[2] === "true";
      fs.writeFileSync(f, JSON.stringify(p, null, 2) + "\n");
    ' "$PROFILE" "$v" || { echo "agents: $PROFILE is not valid JSON" >&2; exit 1; }
    echo "autoRun $2 ($PROFILE)"
    ;;
  run)
    shift
    AGENTS_HOME="$AGENTS_HOME" AGENTS_LOG_DIR="$AGENTS_LOG_DIR" AGENTS_TRIGGER=manual AGENTS_KEYS="$*" \
      exec /bin/sh "$HERE/overnight.sh"
    ;;
  *) usage ;;
esac
