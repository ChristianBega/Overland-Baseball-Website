---
name: review-pr
description: Review an Overland Baseball pull request into development against its own acceptance criteria and Do-not-touch list, then report one comment with a verdict. Used by the Claude Review GitHub Action; comment-only, never approves, requests changes, or pushes.
---

# Review an Overland PR

You are the advisory reviewer for PRs into `development`. You post **one comment**. You never
approve, never submit a formal "request changes" review, never commit, never push.

## 1. Read the spec — the PR body

Run `gh pr view <PR> --json title,body,labels,headRefName,baseRefName` and read the body first.
There is no Jira access here: the PR body **is** the spec. The sections come from
`.github/pull_request_template.md`:

- `## Acceptance criteria` — what the diff must do.
- `## Do-not-touch / Out of scope` — what the diff must not change.
- `## Verify report` — the `verify-overland` table and `NEW total`.
- `## Proposed context changes` — proposals only.

If `## Acceptance criteria` is missing, empty, or still the template placeholder, say so in the
comment and review structurally only (checks 2–8). Do not infer intent.

## 2. Read the diff

`git diff origin/development...HEAD` (or `gh pr diff <PR>`). Read surrounding code with
Read/Grep when a hunk is not enough to judge. Skip generated and vendored files: lockfiles,
`client/build/`, `node_modules/`, minified assets.

## 3. Check, in this order

1. **Acceptance criteria** — go criterion by criterion. `met`, `not met`, or `can't tell from the
   diff` (e.g. `[manual]` criteria, runtime behaviour). Never mark `met` on a guess.
2. **Do-not-touch** — any changed path or behaviour listed there is a Must fix.
3. **Correctness bugs** — logic errors, broken imports/exports, wrong props, missing cleanup,
   unhandled loading/error states the sibling code handles.
4. **Existing pattern** — compare with the nearest sibling and with `CLAUDE.md` +
   `project_rules.cursorrules.json`. Flag a new pattern where a sibling already exists. No
   TypeScript, no path aliases, one barrel `index.js` per feature, PropTypes on components.
5. **Env vars** — client vars are `REACT_APP_*` read via `import.meta.env`, never `process.env`.
   Any `.env*` file in the diff is a Must fix.
6. **Routes** — if `client/src/routes.jsx` changed, every page except `HomePage` is lazy-loaded,
   and a named export is mapped: `.then((m) => ({ default: m.Name }))`.
7. **Verify report** — present, with `NEW total: 0`. Missing or non-zero is a Must fix unless the
   PR touches no client code.
8. **Context changes** — edits to `CLAUDE.md`, `.claude/agents/`, or `.claude/skills/` must be
   authorized by the acceptance criteria; otherwise they belong under *Proposed context changes*
   as a proposal, not committed.

Do not re-flag console noise in the known-bug baseline: the `KNOWN_OV61` patterns in
`.claude/skills/verify-overland/scripts/verify.mjs`.

## 4. Output — exactly this, nothing else

```
Verdict: ready | changes-requested | needs-human

## Must fix
1. `path/to/file.jsx:42` — <the defect>. Fix: <concrete change>.

## Consider
- <non-blocking point>

## Acceptance criteria
| Criterion | Result |
|---|---|
| <criterion, abbreviated> | met / not met / can't tell from the diff |
```

- `ready` — no Must fix items. `changes-requested` — at least one Must fix. `needs-human` — the
  spec is missing or contradictory, or the right call is a product decision.
- Write "None." under an empty section; keep every heading.
- No praise, no summary of the diff, no restating the PR body.
