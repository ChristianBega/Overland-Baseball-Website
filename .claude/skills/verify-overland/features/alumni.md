# Alumni

Public alumni timeline.

## Sub-features

Alumni page and timeline heading. No edits.

## How to get to it (user POV)

Open `/alumni`.

## Driving it with puppeteer-core

`node .claude/skills/verify-overland/scripts/verify.mjs drive /alumni`

Wait for `#alumni-page`. Proof: HTTP status, selector present, screenshot, console buckets.

## Gotchas

Timeline data may be empty when Strapi is unreachable. That is expected noise if the console line matches the Strapi bucket.
