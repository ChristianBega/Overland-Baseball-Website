# Events

Public events page.

## Sub-features

Events list section. Do not activate signup buttons.

## How to get to it (user POV)

Open `/events`.

## Driving it with puppeteer-core

`node .cursor/skills/verify-overland/scripts/verify.mjs drive /events`

Wait for `#events-page` (`aria-label="Events Page"`). Proof: HTTP status, selector present, screenshot, console buckets.

## Gotchas

Empty data from the dummy Strapi host is acceptable. Connection refusals are expected noise.
