# Morning checklist: one visit per bot PR

Approve once, turn on auto-merge, and leave. GitHub merges when the `development` ruleset is satisfied. (OV-132)

## What makes this safe

Repository setting `allow_auto_merge` is on. The `development` ruleset requires:

- 1 approving review, and stale approvals are dismissed when new commits are pushed (`dismiss_stale_reviews_on_push`)
- green `build`, `qa` and `qa-guard` checks

Auto-merge merges only when all of those hold. It never merges a PR you have not approved, or code pushed after your
approval. That holds for an admin too: the admin bypass covers only a manual "merge without waiting", not auto-merge.

## One-visit flow

For each open bot PR:

1. Read the Claude review comment (`Verdict:` line) and the diff. Skip the PR for now if you see a stop sign (below).
2. If it is a draft, mark it ready: `gh pr ready N` (draft PRs can't be auto-merged).
3. If it changes `.claude/` or `.github/workflows/`, `qa-guard` is red. Review those files, then apply `baseline-change`
   (see below).
4. Approve and enable auto-merge:

   ```
   gh pr review N --approve && gh pr merge N --auto --merge
   ```

5. Leave. Check later with `gh pr view N --json state,mergedAt,autoMergeRequest`.

## `baseline-change` step

`qa-guard` fails on a PR that changes `.claude/` or `.github/workflows/` until a human applies `baseline-change`. A bot
label doesn't count. Applying it is a label event, not a push, so:

- your approval stays, and auto-merge stays enabled
- `qa-guard` re-runs on the `labeled` event and turns green
- auto-merge fires as soon as `build`, `qa` and `qa-guard` are all green

You can apply the label before or after you approve. Either way it's one visit.

## When the auto-fixer pushes after you approve

If a review round was still running when you approved (verdict `changes-requested`, auto-fix round 1 or 2 in progress),
the fixer's push:

- dismisses your approval, so nothing merges
- leaves auto-merge enabled, so the PR stays queued until it is approved again
- if the push touched `.claude/`, also makes `qa-guard` remove `baseline-change` and fail

To finish: review the new commits, re-apply `baseline-change` if it was removed, and approve again. Auto-merge then
completes on its own. Running `gh pr merge N --auto --merge` again is harmless.

It's simpler to wait for the review to settle on `ready` (or for `needs-human`) before you approve.

## Stop signs: don't approve yet

- `needs-human` label: the auto-fix gave up or the PR needs a person. Fix by hand or close.
- `Verdict: changes-requested` with a `review-round-*` fix still running: wait for the next review.
- Red `build` or `qa`: auto-merge would only wait. Look at the failure first.

## What auto-merge can't do

- Merge without an approval, or with a red required check.
- Auto-merge a draft.
- Survive a merge conflict or a base-branch change: GitHub turns auto-merge off. Fix it and enable it again.
