# Scout rubric

The checks the scout scores a surface against. This file says how to pick and read them; the checks themselves
are in `standards.yaml`. No `SKILL.md` yet: the scout's instructions arrive with the `scout-spec.md` edit
(`docs/agent-workflow/scout-spec.md`, Phase 6 of the scout plan). Until then §3.2 of the spec is superseded by this
folder.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `standards.yaml` | Every standard, one entry per permanent check ID (`L<layer>.<slug>`): threshold, severity, how to verify, who can verify, where a fix lives, which questionnaire keys switch it on, stage | No. Generated from the playbook docs |
| `questionnaire.yaml` | The applicability questions (keys only, no answers) and which IDs each key switches on | No. Generated from the playbook docs |
| `rubric.md` | This file | Yes |

Source of truth is the owner's "Industry Standard Web App Playbook" (Google Docs, not in the repo). A change goes
into the docs first, then into both YAMLs with targeted edits, then the drift check in the playbook's
"03 Check ID Index". Both files carry `version` and `generated`; never hand-edit one without the docs.

Private inputs, never committed:

| File | Location |
|---|---|
| Questionnaire answers for this project | `~/.overland-agents/scout/questionnaire-answers.yaml` |
| Project overrides (blocked, owner-action, adjusted thresholds, n/a, raised) | `~/.overland-agents/scout/overrides.yaml` |

## Picking the applicable checks

1. A standard applies when `applies_if` is `[always]`, or when any listed key is `yes` in the answers file.
2. Keep standards whose `stage` is at or below the project's current stage (`launch` < `growth` < `scale`).
3. Severity is `severity`, unless `severity_by_stage` names the current stage; then that value wins. The same goes
   for `threshold` and `threshold_by_stage`.
4. Apply the overrides file last. An override row changes routing or severity for that ID only.
5. Route by `verifiable_by` and `fix_lives_in`. `fix_lives_in` lists every place a fix can land; the overrides
   file narrows it for this project. The scout proposes builder tickets only for gaps a tool can verify and the
   repo can fix. Gaps that need infrastructure or owner access become owner-action tickets labeled `area:infra`,
   never `ready-for-build`.

`covered_by` lists playbook rows that are checked under another ID: score the target ID, not the row.
`not_a_standard` lists items that are deliberately not checks.

## Layers

| Layer | Name | IDs |
|---|---|---|
| L0 | Verification and Delivery Pipeline | 11 |
| L1 | Presentation and UX | 9 |
| L2 | Rendering, Routing and Delivery | 8 |
| L3 | Crawlability, Indexing and AI Access | 10 |
| L4 | Metadata, Semantics and Structured Data | 11 |
| L5 | Performance | 22 |
| L6 | Accessibility | 15 |
| L7 | Application Security | 17 |
| L8 | Privacy, Legal and Trust | 17 |
| L9 | Measurement and Analytics | 7 |
| L10 | Integrations, Forms and Email | 12 |
| L11 | Infrastructure, Operations and Reliability | 12 |
| L12 | Content and Growth | 8 |
| | **Total** | **159** |

## Overland layer: `docs/conventions.md`

The playbook is stack-neutral. `docs/conventions.md` sits on top of it with this repo's code rules (page shape,
forms, data loading, styling). Those rules have no `L` IDs: cite them as `docs/conventions.md#<heading>`. When a
playbook check and a convention both cover a gap, the ticket cites both; the convention says how to fix it here.

## Citing a check

Tickets, evidence and overrides cite the check ID exactly as it appears in `standards.yaml`, for example
`L6.icon-button-name`. IDs are permanent: never renamed or reused. A retired ID stays listed in the playbook index.
