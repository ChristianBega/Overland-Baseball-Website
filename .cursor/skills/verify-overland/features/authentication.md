# Authentication

Public auth screens. Observe only.

## Sub-features

`/authentication/sign-in`, `/authentication/sign-up`, `/authentication/password-reset`. Same page shell. Do not type credentials or press submit.

## How to get to it (user POV)

Open one of the three paths. Signed-in users would be redirected away from sign-in and sign-up; this harness is logged out.

## Driving it with puppeteer-core

`node .cursor/skills/verify-overland/scripts/verify.mjs drive /authentication/sign-in`

Also pass `/authentication/sign-up` or `/authentication/password-reset`. Wait for `#authentication-page`. Proof: HTTP status, selector present, screenshot, console buckets. The harness must not call `page.type` or `page.click`.

## Gotchas

Firebase uses the dummy `REACT_APP_*` values from the workflow. Auth network errors are NEW unless they match the expected-noise patterns (they usually will not). Record them; do not sign in to clear them.
