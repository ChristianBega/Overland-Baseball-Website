#!/bin/sh
# Windows (WSL2) installer for the overnight runner: the counterpart of launchd/install.sh. Run it
# inside the WSL distro that runs the agents. It sets up the runner's own checkout, renders the
# Task Scheduler tasks (the nightly run and the morning check), their PowerShell wrapper and two
# launcher scripts into $AGENTS_HOME/windows/, then PRINTS the Windows steps. It runs nothing on the
# Windows side and nothing as admin: the owner runs those.
#
#   sh scripts/agents/windows/install.sh
#
# How a night runs: Task Scheduler wakes the PC (WakeToRun) and starts run-in-wsl.ps1, which holds
# SetThreadExecutionState (no sleep mid-run) while `wsl.exe -d <distro> -- sh <launcher>` runs. The
# launcher (nightly.sh) sets PATH and the AGENTS_* env, moves the runner checkout to the latest
# origin/<base>, copies runner.envFiles, then starts overnight.sh with AGENTS_TRIGGER=schedule, the
# same command launchd runs on a Mac (install-common.sh).
#
# Why the files stay in WSL: with automount off (the safety setup), WSL cannot write to C:. Windows
# reads them over \\wsl.localhost\<distro>\..., and the printed Copy-Item puts the .ps1 and .xml in a
# local folder, so the task runs a local script (no UNC execution-policy prompt).
#
# Env (defaults in brackets):
#   AGENTS_HOME         runner state dir      [~/.agents/<repo dir name>]
#   AGENTS_LOG_DIR      runner log dir        [${XDG_STATE_HOME:-~/.local/state}/<repo>-agents]
#   AGENTS_AT           run time, HH:MM       [01:00]
#   AGENTS_MORNING_AT   morning check, HH:MM  [06:30]
#   AGENTS_WSL_DISTRO   distro the tasks start [$WSL_DISTRO_NAME, i.e. this one]
#   AGENTS_TASK_NAME    Task Scheduler name   [<repo dir name, lowercased>-agents-overnight]
#   AGENTS_MORNING_TASK_NAME                  [<repo dir name, lowercased>-agents-morning]
#   AGENTS_WIN_DIR      Windows folder for the .ps1/.xml and task.log [C:\ProgramData\<repo>-agents]
#   AGENTS_PLATFORM     wsl to render on another OS (testing); the installer refuses other platforms
# Re-run it after changing any of these, or after switching Node versions (the PATH is pinned).

set -eu

HERE=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$HERE/../../.." && pwd)
REPO_NAME=$(basename "$REPO_ROOT")
LOWER=$(printf '%s' "$REPO_NAME" | tr 'A-Z' 'a-z')
. "$HERE/../platform.sh"
[ "$PLATFORM" = wsl ] || { echo "install: run this inside WSL (detected $PLATFORM; on a Mac use launchd/install.sh)" >&2; exit 1; }

AGENTS_HOME=${AGENTS_HOME:-$HOME/.agents/$REPO_NAME}
AGENTS_LOG_DIR=${AGENTS_LOG_DIR:-$DEFAULT_LOG_DIR}
AT=${AGENTS_AT:-01:00}
MORNING_AT=${AGENTS_MORNING_AT:-06:30}
DISTRO=${AGENTS_WSL_DISTRO:-${WSL_DISTRO_NAME:-}}
[ -n "$DISTRO" ] || { echo "install: no WSL distro name (WSL_DISTRO_NAME unset): set AGENTS_WSL_DISTRO" >&2; exit 1; }
TASK=${AGENTS_TASK_NAME:-$LOWER-agents-overnight}
MORNING_TASK=${AGENTS_MORNING_TASK_NAME:-$LOWER-agents-morning}
WIN_DIR=${AGENTS_WIN_DIR:-'C:\ProgramData'\\$LOWER-agents}
for t in "$AT" "$MORNING_AT"; do
  printf '%s' "$t" | grep -Eq '^([01][0-9]|2[0-3]):[0-5][0-9]$' || { echo "install: time '$t' is not HH:MM" >&2; exit 1; }
done

. "$HERE/../install-common.sh"   # pin_path, runner_checkout, runner_commands (shared with launchd/)
# wsl.exe starts a non-login shell (no nvm, no profile): pin the tool directories.
pin_path "/usr/local/bin:/usr/bin:/bin"

OUT="$AGENTS_HOME/windows"
mkdir -p "$OUT" "$AGENTS_HOME" "$AGENTS_LOG_DIR"
runner_checkout
runner_commands

# env.sh: the pinned PATH and AGENTS_* env, for the launchers and for a run started from Windows.
{
  printf '%s\n' '# Written by scripts/agents/windows/install.sh: the runner env inside WSL (sourced).' \
    "export PATH=$(q "$P") AGENTS_HOME=$(q "$AGENTS_HOME") AGENTS_LOG_DIR=$(q "$AGENTS_LOG_DIR") AGENTS_AT=$(q "$AT")"
} > "$OUT/env.sh"

# The launchers wsl.exe runs. Output goes to <log dir>/task.log (the night's own logs are in
# <log dir>/<date>/ as on a Mac).
launcher() { # <file> <command> [extra export]
  {
    printf '%s\n' '#!/bin/sh' \
      '# Written by scripts/agents/windows/install.sh; started by run-in-wsl.ps1 (Task Scheduler).' \
      ". $(q "$OUT/env.sh")${3:+; export $3}" \
      'mkdir -p "$AGENTS_LOG_DIR"' \
      'exec >> "$AGENTS_LOG_DIR/task.log" 2>&1' \
      "exec /bin/sh -c $(q "$2")"
  } > "$1"
  chmod 755 "$1"
}
launcher "$OUT/nightly.sh" "$NIGHTLY" "AGENTS_TRIGGER=schedule"
launcher "$OUT/morning.sh" "$MORNING"

cp "$HERE/run-in-wsl.ps1" "$OUT/run-in-wsl.ps1"

# Task XML, written as UTF-16LE with a BOM (what schtasks /xml expects).
xml() { printf '%s' "$1" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g'; }
esc() { printf '%s' "$1" | sed -e 's/[&|\\]/\\&/g'; }
task() { # <template> <out> <HH:MM> <launcher> <limit> <description>
  sed -e "s|__DESCRIPTION__|$(esc "$(xml "$6")")|g" \
      -e "s|__START__|2026-01-01T$3:00|g" \
      -e "s|__LIMIT__|$5|g" \
      -e "s|__PS1__|$(esc "$(xml "$WIN_DIR\\run-in-wsl.ps1")")|g" \
      -e "s|__DISTRO__|$(esc "$(xml "$DISTRO")")|g" \
      -e "s|__LAUNCHER__|$(esc "$(xml "$4")")|g" \
      -e "s|__WINLOG__|$(esc "$(xml "$WIN_DIR\\task.log")")|g" \
      "$HERE/$1" > "$2.utf8"
  { printf '\377\376'; iconv -f UTF-8 -t UTF-16LE "$2.utf8"; } > "$2"
  rm -f "$2.utf8"
}
DEADLINE_MIN=$(node -p 'require(process.argv[1]).runner?.runDeadlineMinutes ?? 300' "$CONFIG")
task overnight.task.xml.template "$OUT/overnight.task.xml" "$AT" "$OUT/nightly.sh" \
  "PT$(( (DEADLINE_MIN + 60) / 60 ))H" "$REPO_NAME overnight runner ($AGENTS_HOME)"
task morning.task.xml.template "$OUT/morning.task.xml" "$MORNING_AT" "$OUT/morning.sh" \
  "PT30M" "$REPO_NAME morning check ($AGENTS_LOG_DIR/<date>/report.md)"

UNC="\\\\wsl.localhost\\$DISTRO$(printf '%s' "$OUT" | tr '/' '\\')"

cat <<EOF
Wrote $OUT/: env.sh, nightly.sh, morning.sh (run inside WSL), run-in-wsl.ps1, overnight.task.xml, morning.task.xml.
Runner checkout: $RUNNER (moves to origin/$BASE before each run; do not edit files there).
Tasks: "$TASK" at $AT (wakes the PC), "$MORNING_TASK" at $MORNING_AT, distro "$DISTRO".

Next, in Windows PowerShell (as you, not admin unless noted):

  # 1. Copy the wrapper and task files to a local folder (Windows reads WSL files over \\\\wsl.localhost)
  New-Item -ItemType Directory -Force '$WIN_DIR' | Out-Null
  Copy-Item '$UNC\\*' '$WIN_DIR\\' -Include *.ps1,*.xml

  # 2. Register both tasks. /rp with no value prompts for your Windows password: the tasks run
  #    whether or not you are logged on (re-run with /f to replace an existing task)
  schtasks /create /tn "$TASK" /xml "$WIN_DIR\\overnight.task.xml" /ru "\$env:USERDOMAIN\\\$env:USERNAME" /rp
  schtasks /create /tn "$MORNING_TASK" /xml "$WIN_DIR\\morning.task.xml" /ru "\$env:USERDOMAIN\\\$env:USERNAME" /rp

  # 3. Allow wake timers on AC power (admin PowerShell), for the current power plan
  powercfg /setacvalueindex SCHEME_CURRENT SUB_SLEEP RTCWAKE 1
  powercfg /setactive SCHEME_CURRENT

Check / run now / remove:
  schtasks /query /tn "$TASK" /v /fo list | Select-String 'Next Run|Last Run|Last Result|Status'
  powercfg /waketimers                       # lists the task once a wake is armed
  Get-Content '$WIN_DIR\\task.log' -Tail 20  # the wrapper's start/end/exit lines
  wsl -d $DISTRO -- sh -c ". $OUT/env.sh && exec sh $RUNNER/scripts/agents/agents.sh run"   # a run now
  (in a WSL terminal: . $OUT/env.sh, then sh $RUNNER/scripts/agents/agents.sh status | run [KEY ...];
  a run now ignores autoRun and the start window)
  (schtasks /run /tn "$TASK" follows the schedule rules (AGENTS_TRIGGER=schedule): outside
  runner.startWindow or with autoRun false it exits idle. Use agents.sh run to run now.)
  schtasks /delete /tn "$TASK" /f ; schtasks /delete /tn "$MORNING_TASK" /f

Machine profile (required; a run without it aborts):
  printf '{ "name": "<machine>", "autoRun": true }\n' > "$AGENTS_HOME/machine.json"
  AGENTS_HOME="$AGENTS_HOME" sh "$RUNNER/scripts/agents/agents.sh" status | auto on|off | run [KEY ...]
  (autoRun false: the scheduled run exits idle; agents.sh run still builds now. A Jira label
  machine:<name> sends a ticket to one machine; unlabelled tickets go to either.)

Inside WSL (Windows / WSL notes):
  - Chrome for the verify step: install Google Chrome in this distro (the .deb from google.com,
    then sudo apt install ./google-chrome-stable_current_amd64.deb). verify.mjs looks for
    /usr/bin/google-chrome; set CHROME_PATH to use another binary.
  - Node: the PATH above is pinned to the node, git, gh and claude found now (nvm is not loaded
    by wsl.exe). Re-run this installer after switching Node versions.
  - Secrets stay in WSL: the bot key ($(node -p 'require(process.argv[1]).bot.keyDir' "$CONFIG")/key.pem),
    $AGENTS_HOME/slack-webhook (chmod 600) and the runner.envFiles in this checkout.

Pause / resume:   touch "$AGENTS_HOME/PAUSE"   /   rm "$AGENTS_HOME/PAUSE"
Logs:             $AGENTS_LOG_DIR/<date>/summary.log, <date>/report.md, task.log (inside WSL);
                  $WIN_DIR\\task.log (the Windows wrapper)

Sleep: the task wakes the PC only if wake timers are allowed (step 3) and the PC is asleep, not
shut down or hibernated with wake disabled. A slot missed while it was off is not run late; the
06:30 check then reports a missed run.
EOF
