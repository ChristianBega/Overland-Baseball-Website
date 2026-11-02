#!/bin/sh
# The owner's commands for the overnight runner on this machine.
#
#   sh scripts/agents/agents.sh status            # machine profile, PAUSE, lock, last run
#   sh scripts/agents/agents.sh auto on|off       # scheduled runs on/off (machine.json autoRun)
#   sh scripts/agents/agents.sh run [KEY ...]     # a run now: the normal pick, or only these tickets
#
# `run` ignores autoRun and runner.startWindow; PAUSE and the lock still apply, and named tickets
# must still be ready-for-build and unclaimed. AGENTS_MAX_TICKETS caps the run; AGENTS_DRY_RUN=1
# stops before the build. Use the runner checkout's copy ($AGENTS_HOME/runner/scripts/agents/agents.sh)
# so a run uses the merged runner, not work in progress.
#
# Env as overnight.sh: AGENTS_HOME [~/.agents/<repo dir name>], AGENTS_LOG_DIR.

set -u

HERE=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$HERE/../.." && pwd)
REPO_NAME=$(basename "$REPO_ROOT")
AGENTS_HOME=${AGENTS_HOME:-$HOME/.agents/$REPO_NAME}
if [ "$(uname)" = Darwin ]; then
  AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-$HOME/Library/Logs/$REPO_NAME-agents}
else
  AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-${XDG_STATE_HOME:-$HOME/.local/state}/$REPO_NAME-agents}
fi
PROFILE="$AGENTS_HOME/machine.json"

usage() {
  echo "usage: agents.sh status | auto on|off | run [KEY ...]" >&2
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
