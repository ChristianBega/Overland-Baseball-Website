# Spec template and question lists

Used by `.claude/skills/overland-planner/SKILL.md`.

---

## Part A — the spec template

Every ticket uses these headings, in this order. Omit "Cross-feature notes" when there are none.
Keep nothing else.

```markdown
## Goal

One or two lines. What is true after this ships.

## Surfaces to touch

Confirmed paths only. Use `path:line` when the line is known.
Mark anything you could not confirm as `unverified`.

- `client/src/...`

## Do-not-touch

- `.github/workflows/`
- `package.json` and `package-lock.json`, root and `client/`
- `.env` and any `.env.*`
- `.claude/skills/overland-planner/`
- (add any path specific to this ticket; see "Do-not-touch and shifting warnings" below)

## Acceptance criteria

One per line. Each line ends with `[verify-overland]` or `[manual]`.
Given/When/Then only where `verify-overland` can check it.

- ... [verify-overland]
- ... [manual]

## Regression checks

- PR Build Check passes.
- `verify-overland` reports 0 NEW.

## Out of scope

- ...

## Open questions

Unresolved items from the interview. Never leave one out.

- ...

## Related tickets

- relates to OV-NN — why

## Cross-feature notes

Only if the change may affect another feature. Name the feature and the ticket.
```

### Regression checks are conditional

The template above shows both lines. Only one of them is unconditional.

`PR Build Check passes.` is always in.

`verify-overland reports 0 NEW.` goes in **only when the ticket touches `client/src/`**. The verify
skill drives routes in a browser. A ticket that changes only docs, CI, or config has no runtime
surface to regress, so the line would be true and empty. Leave it out.

Doc-only and config-only tickets get `PR Build Check passes.` alone.

### Builder rules the spec must fit

The spec is wrong if it cannot be executed under these rules.

- One ticket per Builder run.
- Branch off `development`. Open the PR into `development` only. Never push to or merge
  `development` or `main` (`README.md:169-171`).
- Run the verify skill: `node .claude/skills/verify-overland/scripts/verify.mjs`.
- Put the evidence in the PR body.
- Update the matching skill or docs in the same PR.
- Never touch the protected paths in Do-not-touch.
- Stop after 2 review rounds and ask the owner.

### Known-bug behavior

If the ticket changes behavior that the verify baseline currently treats as a known bug, the scope
MUST include updating the baseline in the same PR.

The baseline is the `KNOWN_OV61` regex array at
`.claude/skills/verify-overland/scripts/verify.mjs:90-105`. There is no JSON baseline file and no
update command — the regexes are edited by hand. Removing a regex makes that console item count as
NEW again, which is the point.

Write this as its own acceptance criterion, not as a note.

### Do-not-touch and shifting warnings

**Rule 1: Do-not-touch lists things unsafe to change.**

- The standard protected paths (`.github/workflows/`, both `package.json` / `package-lock.json`,
  `.env*`, `.claude/skills/overland-planner/`) always stay in Do-not-touch.
- Rule 1 applies only to ticket-specific additions. List validation, submit logic, JSON configs,
  workflows and protected paths. Do not list a field or file because it is warning-free in today's
  baseline. A clean baseline is a snapshot, not a constraint.

**Rule 2: "0 NEW" criteria name the warnings likely to shift.** When an AC says "0 NEW" after a fix,
same-family warnings may move to neighboring elements. Name the likely elements in the AC or in
Open questions.

**Worked example (OV-75).** The ticket added `autocomplete` to the password fields. Chrome then
flagged the remaining unlabelled inputs (`suggested: "username"`), and on sign-up that included
`userName`, not only the field before the password. The planner had put the email and username
fields in Do-not-touch because their autocomplete "is not flagged today", so "0 NEW" was
unreachable without an owner exception. The final tokens were email → `username` on both forms
(email is the Firebase login), sign-up `userName` → `nickname`, and passwords →
`current-password` / `new-password`; the full table is in PR #112.

`autocomplete="username"` means "the login identifier", not "a field called username".

---

## Part B — question lists

Ask ONE at a time. Skip anything already answered. Follow-ups are allowed.

### All types

1. What is the problem, and why now?
2. What will be different for the user when it is done?
3. What is out of scope, and what must not change?
4. How will you check it works?

### Bug adds

5. Which route or page?
6. How do you reproduce it?
7. What happens, versus what should happen?

### Quick fix adds

5. What is the exact change, and where?

### Feature adds

5. Who uses it, and in what situation?
6. What is the smallest version that is still useful?
7. What should it show when there is nothing to show, or on an error?

### Never ask

- Which files are touched. Read the repo.
- Whether duplicates or related tickets exist. Search Jira.
- Whether a check is `verify-overland` or `manual`. Work it out from the route.
