# Home

Public landing page.

## Sub-features

Hero, schedule, news, events, and contact sections on one page. Do not use contact or signup controls.

## How to get to it (user POV)

Open `/`.

## Driving it with puppeteer-core

`node .cursor/skills/verify-overland/scripts/verify.mjs drive /`

Wait for `#home-page` (`aria-label="Home Page"`). Proof: HTTP status from `goto`, selector present, screenshot, console buckets.

## Gotchas

Strapi `localhost:1337` refusals and OV-61 console warnings are baseline, not regressions. Do not click schedule or contact actions.
