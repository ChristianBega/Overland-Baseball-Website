# Roster

Public team roster.

## Sub-features

Roster section only. Do not open player editors.

## How to get to it (user POV)

Open `/roster`.

## Driving it with puppeteer-core

`node .claude/skills/verify-overland/scripts/verify.mjs drive /roster`

Wait for `#roster-page` (`aria-label="Roster Page"`). Proof: HTTP status, selector present, screenshot, console buckets.

## Gotchas

Missing roster rows from the dummy API are not a harness failure. NEW console text is.
