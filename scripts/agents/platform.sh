# Sourced by the runner scripts (overnight.sh, agents.sh, the installers). Detects the platform
# once and sets the defaults that differ by platform. Needs REPO_NAME; sets:
#   PLATFORM          darwin | wsl | linux   (AGENTS_PLATFORM overrides, e.g. to test the WSL path on a Mac)
#   DEFAULT_LOG_DIR   ~/Library/Logs/<repo>-agents on darwin,
#                     ${XDG_STATE_HOME:-~/.local/state}/<repo>-agents elsewhere
# scripts/agents/platform.mjs is the same for the node scripts.

if [ -n "${AGENTS_PLATFORM:-}" ]; then
  PLATFORM=$AGENTS_PLATFORM
elif [ "$(uname)" = Darwin ]; then
  PLATFORM=darwin
elif grep -qi microsoft /proc/version 2>/dev/null; then
  PLATFORM=wsl
else
  PLATFORM=linux
fi
case $PLATFORM in
  darwin|wsl|linux) ;;
  *) echo "platform: AGENTS_PLATFORM must be darwin, wsl or linux, not '$PLATFORM'" >&2; exit 1 ;;
esac

if [ "$PLATFORM" = darwin ]; then
  DEFAULT_LOG_DIR=$HOME/Library/Logs/$REPO_NAME-agents
else
  DEFAULT_LOG_DIR=${XDG_STATE_HOME:-$HOME/.local/state}/$REPO_NAME-agents
fi
