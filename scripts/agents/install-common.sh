# Sourced by the installers (launchd/install.sh on macOS, windows/install.sh in WSL): the parts
# that do not depend on the scheduler. Needs REPO_ROOT and AGENTS_HOME.
#
#   pin_path <system dirs>  P = the directories of node, git, gh and claude, then <system dirs>
#                           (the scheduler starts with a bare PATH); refuses a node that does not
#                           run or is below the .nvmrc major
#   runner_checkout         CONFIG, BASE, RUNNER: the runner's own detached worktree of this repo at
#                           origin/<base>, created if missing
#   runner_commands         SYNC, NIGHTLY, MORNING: the scheduled commands, for /bin/sh -c (below)

pin_path() {
  P=""
  for bin in node git gh claude; do
    p=$(command -v "$bin") || { echo "install: $bin not on PATH" >&2; exit 1; }
    d=$(dirname "$p")
    case ":$P:" in *":$d:"*) ;; *) P="$P${P:+:}$d" ;; esac
  done
  P="$P:$1"
  # The pinned node must run and be at least the .nvmrc major (a broken Homebrew node once sat first).
  nv=$(node -v 2>/dev/null) || { echo "install: node ($(command -v node)) does not run (node -v failed): put a working node first on PATH" >&2; exit 1; }
  want=$(sed -n '1s/^v\{0,1\}\([0-9][0-9]*\).*/\1/p' "$REPO_ROOT/.nvmrc" 2>/dev/null)
  have=${nv#v}
  if [ -n "$want" ] && [ "${have%%.*}" -lt "$want" ]; then
    echo "install: node $nv ($(command -v node)) is below .nvmrc $want: nvm use $want, then re-run" >&2
    exit 1
  fi
}

# The runner's own checkout: a detached worktree of this repo at origin/<base>.
runner_checkout() {
  CONFIG="$REPO_ROOT/.claude/agents.config.json"
  BASE=$(node -p 'require(process.argv[1]).repo.baseBranch' "$CONFIG")
  RUNNER="$AGENTS_HOME/runner"
  git -C "$REPO_ROOT" fetch -q origin "$BASE"
  git -C "$REPO_ROOT" worktree prune # forget a runner dir that was deleted by hand
  if [ ! -e "$RUNNER/.git" ]; then
    git -C "$REPO_ROOT" worktree add -q --detach "$RUNNER" "origin/$BASE"
  fi
}

# The nightly command, run by /bin/sh -c. Move the runner checkout to the latest origin/<base>
# (skipped only while a live run holds the lock; a crashed run's stale lock does not block it),
# refresh the env files, then start overnight.sh. The update
# finishes before overnight.sh is read, so a script is never rewritten while it runs. A failed
# checkout (local edits in the runner dir) stops the night rather than running stale code.
# The morning check syncs the same way, then runs report.mjs --morning (no env files needed).
q() { printf "'%s'" "$(printf '%s' "$1" | sed "s/'/'\\\\''/g")"; }
runner_commands() {
  SYNC="cd $(q "$RUNNER") || exit 1; if ! kill -0 \"\$(cat $(q "$AGENTS_HOME/lock/pid") 2>/dev/null)\" 2>/dev/null; then git fetch -q origin $(q "$BASE"); git checkout -q --detach $(q "origin/$BASE") || exit 1; fi;"
  NIGHTLY=$SYNC
  for f in $(node -p '(require(process.argv[1]).runner.envFiles || []).join(" ")' "$CONFIG"); do
    NIGHTLY="$NIGHTLY cp $(q "$REPO_ROOT/$f") $(q "$RUNNER/$f") 2>/dev/null;"
  done
  NIGHTLY="$NIGHTLY exec /bin/sh scripts/agents/overnight.sh"
  MORNING="$SYNC exec node scripts/agents/report.mjs --morning"
}
