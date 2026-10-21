#!/bin/sh
# Set up the overnight runner's own clean checkout and render its launchd plist into
# ~/Library/LaunchAgents, then print the commands that load it and schedule the wake. It loads
# nothing and runs no sudo: the owner runs those.
#
# The nightly job never runs code from this checkout. It runs from a dedicated worktree
# ($AGENTS_HOME/runner) that it moves to the latest origin/<base> before each run, so merged runner
# changes apply the next night and work in progress here never does. The gitignored files listed in
# runner.envFiles are copied from this checkout each night (copied, never read).
#
#   sh scripts/agents/launchd/install.sh
#
# Env (defaults in brackets):
#   AGENTS_LABEL    launchd label        [com.agents.<repo dir name, lowercased>.overnight]
#   AGENTS_HOME     runner state dir     [~/.agents/<repo dir name>]
#   AGENTS_LOG_DIR  runner log dir       [~/Library/Logs/<repo dir name>-agents]
#   AGENTS_AT       run time, HH:MM      [01:00]  (the wake is scheduled 5 minutes earlier)
# Re-run it after changing any of these, or after switching Node versions (the PATH is pinned).

set -eu

HERE=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$HERE/../../.." && pwd)
REPO_NAME=$(basename "$REPO_ROOT")
LOWER=$(printf '%s' "$REPO_NAME" | tr 'A-Z' 'a-z')

LABEL=${AGENTS_LABEL:-com.agents.$LOWER.overnight}
AGENTS_HOME=${AGENTS_HOME:-$HOME/.agents/$REPO_NAME}
AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-$HOME/Library/Logs/$REPO_NAME-agents}
AT=${AGENTS_AT:-01:00}
# "01:05" -> 1 and 5 (strip one leading zero so the shell does not read octal).
HOUR=$(printf '%s' "${AT%%:*}" | sed 's/^0\(.\)/\1/')
MINUTE=$(printf '%s' "${AT##*:}" | sed 's/^0\(.\)/\1/')

# launchd starts with a bare PATH: pin the directories that hold the tools the runner needs.
P=""
for bin in node git gh claude; do
  p=$(command -v "$bin") || { echo "install: $bin not on PATH" >&2; exit 1; }
  d=$(dirname "$p")
  case ":$P:" in *":$d:"*) ;; *) P="$P${P:+:}$d" ;; esac
done
P="$P:/usr/bin:/bin:/usr/sbin:/sbin"

# Wake 5 minutes before the run.
WAKE_TOTAL=$(( (HOUR * 60 + MINUTE + 1440 - 5) % 1440 ))
WAKE=$(printf '%02d:%02d:00' $((WAKE_TOTAL / 60)) $((WAKE_TOTAL % 60)))

DEST="$HOME/Library/LaunchAgents/$LABEL.plist"
mkdir -p "$HOME/Library/LaunchAgents" "$AGENTS_HOME" "$AGENTS_LOG_DIR"

# The runner's own checkout: a detached worktree of this repo at origin/<base>.
CONFIG="$REPO_ROOT/.claude/agents.config.json"
BASE=$(node -p 'require(process.argv[1]).repo.baseBranch' "$CONFIG")
RUNNER="$AGENTS_HOME/runner"
git -C "$REPO_ROOT" fetch -q origin "$BASE"
git -C "$REPO_ROOT" worktree prune # forget a runner dir that was deleted by hand
if [ ! -e "$RUNNER/.git" ]; then
  git -C "$REPO_ROOT" worktree add -q --detach "$RUNNER" "origin/$BASE"
fi

# The nightly command, run by /bin/sh -c. Move the runner checkout to the latest origin/<base>
# (skipped only while a live run holds the lock; a crashed run's stale lock does not block it),
# refresh the env files, then start overnight.sh. The update
# finishes before overnight.sh is read, so a script is never rewritten while it runs. A failed
# checkout (local edits in the runner dir) stops the night rather than running stale code.
q() { printf "'%s'" "$(printf '%s' "$1" | sed "s/'/'\\\\''/g")"; }
NIGHTLY="cd $(q "$RUNNER") || exit 1; if ! kill -0 \"\$(cat $(q "$AGENTS_HOME/lock/pid") 2>/dev/null)\" 2>/dev/null; then git fetch -q origin $(q "$BASE"); git checkout -q --detach $(q "origin/$BASE") || exit 1; fi;"
for f in $(node -p '(require(process.argv[1]).runner.envFiles || []).join(" ")' "$CONFIG"); do
  NIGHTLY="$NIGHTLY cp $(q "$REPO_ROOT/$f") $(q "$RUNNER/$f") 2>/dev/null;"
done
NIGHTLY="$NIGHTLY exec /bin/sh scripts/agents/overnight.sh"
NIGHTLY=$(printf '%s' "$NIGHTLY" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g')

esc() { printf '%s' "$1" | sed -e 's/[&|\\]/\\&/g'; }
sed -e "s|__LABEL__|$(esc "$LABEL")|g" \
    -e "s|__RUNNER__|$(esc "$RUNNER")|g" \
    -e "s|__NIGHTLY__|$(esc "$NIGHTLY")|g" \
    -e "s|__PATH__|$(esc "$P")|g" \
    -e "s|__AGENTS_HOME__|$(esc "$AGENTS_HOME")|g" \
    -e "s|__AGENTS_LOG_DIR__|$(esc "$AGENTS_LOG_DIR")|g" \
    -e "s|__HOUR__|$HOUR|g" -e "s|__MINUTE__|$MINUTE|g" \
    "$HERE/overnight.plist.template" > "$DEST"
plutil -lint "$DEST" >/dev/null

# Current AC idle-sleep setting, so the printed undo restores it (macOS default is 1 minute).
AC_SLEEP=$(pmset -g custom 2>/dev/null | sed -n '/AC Power/,$p' | awk '$1 == "sleep" { print $2; exit }')
AC_SLEEP=${AC_SLEEP:-1}

cat <<EOF
Wrote $DEST (runs $(printf '%02d:%02d' "$HOUR" "$MINUTE") nightly).
Runner checkout: $RUNNER (moves to origin/$BASE before each run; do not edit files there).

Next, run these yourself:
  launchctl bootstrap gui/\$(id -u) "$DEST"
  sudo pmset repeat wakeorpoweron MTWRFSU $WAKE
  sudo pmset -c sleep 0        # no idle sleep on AC: the Mac must stay awake from the $WAKE wake to the run
                               # (currently $AC_SLEEP; undo with: sudo pmset -c sleep $AC_SLEEP)
  pmset -g custom | sed -n '/AC Power/,\$p' | grep ' sleep '   # check: expect "sleep 0"

Check / run now / remove:
  launchctl print gui/\$(id -u)/$LABEL | head -20
  launchctl kickstart gui/\$(id -u)/$LABEL
  launchctl bootout gui/\$(id -u)/$LABEL
  pmset -g sched

Pause / resume:   touch "$AGENTS_HOME/PAUSE"   /   rm "$AGENTS_HOME/PAUSE"
Logs:             $AGENTS_LOG_DIR/<date>/summary.log

Keep the laptop on AC power: on battery the sleep setting above does not apply, so overnight.sh
refuses to start and logs why (AGENTS_ALLOW_BATTERY=1 overrides). Lid open, or closed with an
external display (clamshell). A closed lid with no display does not wake. If it slept through
01:00, launchd runs the job at the next wake.
EOF
