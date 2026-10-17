#!/bin/sh
# Render the overnight runner's launchd plist into ~/Library/LaunchAgents and print the commands
# that load it and schedule the wake. It loads nothing and runs no sudo: the owner runs those.
#
#   sh scripts/agents/launchd/install.sh
#
# Env (defaults in brackets):
#   AGENTS_LABEL    launchd label        [com.agents.<repo dir name, lowercased>.overnight]
#   AGENTS_HOME     runner state dir     [~/.agents/<repo dir name>]
#   AGENTS_LOG_DIR  runner log dir       [~/Library/Logs/<repo dir name>-agents]
#   AGENTS_AT       run time, HH:MM      [01:00]  (the wake is scheduled 5 minutes earlier)

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

esc() { printf '%s' "$1" | sed -e 's/[&|\\]/\\&/g'; }
sed -e "s|__LABEL__|$(esc "$LABEL")|g" \
    -e "s|__REPO_ROOT__|$(esc "$REPO_ROOT")|g" \
    -e "s|__PATH__|$(esc "$P")|g" \
    -e "s|__AGENTS_HOME__|$(esc "$AGENTS_HOME")|g" \
    -e "s|__AGENTS_LOG_DIR__|$(esc "$AGENTS_LOG_DIR")|g" \
    -e "s|__HOUR__|$HOUR|g" -e "s|__MINUTE__|$MINUTE|g" \
    "$HERE/overnight.plist.template" > "$DEST"
plutil -lint "$DEST" >/dev/null

cat <<EOF
Wrote $DEST (runs $(printf '%02d:%02d' "$HOUR" "$MINUTE") nightly).

Next, run these yourself:
  launchctl bootstrap gui/\$(id -u) "$DEST"
  sudo pmset repeat wakeorpoweron MTWRFSU $WAKE

Check / run now / remove:
  launchctl print gui/\$(id -u)/$LABEL | head -20
  launchctl kickstart gui/\$(id -u)/$LABEL
  launchctl bootout gui/\$(id -u)/$LABEL
  pmset -g sched

Pause / resume:   touch "$AGENTS_HOME/PAUSE"   /   rm "$AGENTS_HOME/PAUSE"
Logs:             $AGENTS_LOG_DIR/<date>/summary.log

Keep the laptop on power. Lid open, or closed with an external display (clamshell). A closed
lid with no display does not wake. If it slept through 01:00, launchd runs the job at the next wake.
EOF
