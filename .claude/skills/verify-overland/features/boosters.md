# Boosters

Public boosters page.

## Sub-features

Single boosters section. No form submit.

## How to get to it (user POV)

Open `/boosters`.

## Driving it with puppeteer-core

`node .claude/skills/verify-overland/scripts/verify.mjs drive /boosters`

Wait for `#boosters-section`. Proof: HTTP status, selector present, screenshot, console buckets.

## Gotchas

OV-61 warnings (including the undefined component at `routes.jsx`) can appear on this route and still count as known.
