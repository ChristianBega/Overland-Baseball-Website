# Worktrees for builder runs

Phase 1.9 of [`PLAN.md`](PLAN.md). Nothing to install — `claude -w` is built into Claude Code.

## Start a build

```bash
git switch development && git pull          # baseRef is "head": the worktree starts from here
claude -w ov-74 --agent builder-frontend "do OV-74"
```

- Creates `.claude/worktrees/ov-74` on a branch `worktree-ov-74`. The builder then creates its own
  `feature/OV-74` (or `fix/OV-74`) off `origin/development` inside it (agent step 2).
- `claude -w ov-74 --tmux --agent builder-frontend "do OV-74"` opens it in its own tmux pane — one
  pane per agent when running more than one.
- When the builder runs as a **subagent** of another session, `isolation: worktree` in
  `.claude/agents/builder-frontend.md` gives it a worktree automatically.

## Base branch

`.claude/settings.json` sets `"worktree": { "baseRef": "head" }`. The default, `fresh`, branches
from the remote default branch — `main` here, not `development` — so every worktree would start
from the wrong base. With `head`, the worktree starts from the main checkout's current commit, so
start from `development`. The builder also branches off `origin/development` explicitly, so a wrong
starting commit cannot leak into the PR.

## `.worktreeinclude`

Root file, gitignore syntax. Lists the gitignored files copied into each new worktree:

```
client/.env
```

Decided in PLAN.md Open Questions → Q6: the real `client/.env`, so the builder can exercise
Strapi-backed pages. Worktrees are local-only — never pushed, never synced to CI or a cloud
session. Never list a path you would not hand an agent. Agents still cannot `Read` it:
`settings.json` denies `Read(./client/.env*)`; only the running app consumes it.

## Guardrails need to be committed

A worktree is a checkout of a commit. Inside it, Claude Code loads the worktree's own
`.claude/settings.json`, `.claude/hooks/`, `.claude/agents/` and `CLAUDE.md` — **only the committed
versions exist there.** Uncommitted guardrail edits in the main checkout do not protect a worktree
session.

## Clean up

Worktrees are disposable: one per ticket, removed after the PR merges.

```bash
git worktree list
git worktree remove .claude/worktrees/ov-74
git branch -d worktree-ov-74
```
