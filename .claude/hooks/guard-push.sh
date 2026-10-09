#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash) — push-target guard.
#
# permissions.deny globs in .claude/settings.json are prefix patterns and miss shapes like
# `git push origin HEAD:development` or `cd <main checkout> && git push`. This hook is the
# robust layer. Exit 2 blocks the tool call and returns stderr to the model; exit 0 allows it.
#
# Blocks:
#   - git push whose target resolves to development or main (explicit refspec, src:dst,
#     :main deletion, --delete, HEAD/@ or a bare push while on a protected branch)
#   - git push --all / --mirror
#   - gh pr merge, gh pr review
#   - gh api with a non-GET method (explicit -X/--method, or implicit POST via -f/-F/--input)

PROTECTED_RE='^(development|main|UNRESOLVED-BRANCH)$'

input=$(cat)
cmd=$(printf '%s' "$input" | node -e '
  let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
    try { process.stdout.write(JSON.parse(s).tool_input?.command ?? ""); } catch { process.exit(3); }
  });')
status=$?
if [ $status -ne 0 ]; then
  echo "guard-push: could not parse hook input; blocking to be safe." >&2
  exit 2
fi
hook_cwd=$(printf '%s' "$input" | node -e '
  let s = ""; process.stdin.on("data", d => s += d).on("end", () => {
    try { process.stdout.write(JSON.parse(s).cwd ?? ""); } catch {}
  });')
[ -n "$hook_cwd" ] || hook_cwd=$PWD

block() {
  echo "guard-push: BLOCKED — $1" >&2
  echo "Rule: agents never push to, merge, or review into development/main, and never call gh api with a write method. Push only your own feature/fix/chore branch and open a PR; the owner merges. (CLAUDE.md → Branching and commits)" >&2
  exit 2
}

# Prints the checked-out branch, or a sentinel that fails safe (treated as protected).
current_branch() {
  local b
  b=$(git -C "$1" symbolic-ref --short -q HEAD 2>/dev/null) && [ -n "$b" ] || b=UNRESOLVED-BRANCH
  printf '%s' "$b"
}

# Normalise a refspec to its destination branch name.
dest_of() {
  local r=${1#+}
  [[ $r == *:* ]] && r=${r##*:}
  r=${r#refs/heads/}
  printf '%s' "$r"
}

# Split the command into simple segments on ; && || | and newlines. Quotes are stripped, so a
# separator inside a quoted string can over-split — that only ever makes the guard stricter.
nl=$'\n'
segments=$(printf '%s' "$cmd" | tr -d "\"'")
segments=${segments//&&/$nl}
segments=${segments//||/$nl}
segments=${segments//;/$nl}
segments=${segments//|/$nl}

dir=$hook_cwd
while IFS= read -r seg; do
  read -ra t <<< "$seg"
  n=${#t[@]}
  [ "$n" -eq 0 ] && continue

  # Track `cd <dir>` so a bare push is checked against the right checkout.
  # The path may span several tokens if it contained spaces.
  if [ "${t[0]}" = "cd" ] && [ "$n" -ge 2 ]; then
    target="${t[*]:1}"
    case $target in
      /*) dir=$target ;;
      ~*) dir=${target/#\~/$HOME} ;;
      *)  dir=$dir/$target ;;
    esac
    continue
  fi

  for ((i = 0; i < n; i++)); do
    # ---- git [global opts] push ... ----
    if [ "${t[i]}" = "git" ]; then
      # Find the push subcommand. Positional parsing breaks on quoted paths with spaces
      # (quotes are stripped), so take the first literal `push` token after `git`.
      j=-1
      for ((k = i + 1; k < n; k++)); do
        [ "${t[k]}" = "push" ] && { j=$k; break; }
      done
      [ $j -lt 0 ] && continue

      # Resolve `git -C <dir>`; the dir may span several tokens if it contained spaces.
      gdir=$dir
      for ((k = i + 1; k < j; k++)); do
        if [ "${t[k]}" = "-C" ]; then
          gdir="${t[*]:k+1:j-k-1}"
          [[ $gdir != /* ]] && gdir=$dir/$gdir
          break
        fi
      done

      positional=()
      for ((k = j + 1; k < n; k++)); do
        case ${t[k]} in
          --all|--mirror) block "git push ${t[k]} would push every branch, including development/main." ;;
          -o|--push-option|--repo|--receive-pack|--exec) k=$((k + 1)) ;;
          -*) ;;
          *) positional+=("${t[k]}") ;;
        esac
      done

      # positional[0] is the remote; the rest are refspecs.
      refspecs=("${positional[@]:1}")
      if [ ${#refspecs[@]} -eq 0 ]; then
        b=$(current_branch "$gdir")
        [[ $b =~ $PROTECTED_RE ]] && block "bare 'git push' while on '$b'."
        continue
      fi
      for r in "${refspecs[@]}"; do
        d=$(dest_of "$r")
        if [ "$d" = "HEAD" ] || [ "$d" = "@" ]; then
          d=$(current_branch "$gdir")
        fi
        [[ $d =~ $PROTECTED_RE ]] && block "git push refspec '$r' targets '$d'."
      done
    fi

    # ---- gh pr merge / gh pr review / gh api <write> ----
    if [ "${t[i]}" = "gh" ]; then
      sub=${t[i+1]}; act=${t[i+2]}
      if [ "$sub" = "pr" ] && { [ "$act" = "merge" ] || [ "$act" = "review" ]; }; then
        block "gh pr $act is owner-only."
      fi
      if [ "$sub" = "api" ]; then
        method="" implicit_post=""
        for ((k = i + 2; k < n; k++)); do
          case ${t[k]} in
            -X|--method) method=${t[k+1]}; k=$((k + 1)) ;;
            -X*) method=${t[k]#-X} ;;
            --method=*) method=${t[k]#--method=} ;;
            -f|-F|--field|--raw-field|--input|-f*|-F*|--field=*|--raw-field=*|--input=*) implicit_post=1 ;;
          esac
        done
        method=$(printf '%s' "$method" | tr '[:lower:]' '[:upper:]')
        if [ -n "$method" ] && [ "$method" != "GET" ]; then
          block "gh api with method $method."
        fi
        if [ -z "$method" ] && [ -n "$implicit_post" ]; then
          block "gh api with -f/-F/--input defaults to POST."
        fi
      fi
    fi
  done
done <<< "$segments"

exit 0
