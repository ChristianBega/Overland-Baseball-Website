---
name: verify-overland
description: Drive the Overland Baseball Vite + React site in headless Chrome and capture per-route screenshots plus classified console output. Use when proving a public page still loads, or when checking / /boosters /events /roster /alumni /sponsors and /authentication/* for new console regressions.
---

# Verify Overland Baseball

Primary surface is the Vite React app in `client/` (dev port 3000). Protected routes `/dashboard`, `/documents`, and `/theme-showcase` are out of scope. Do not submit forms, click submit, sign in, or type credentials. Navigate and observe only.

Harness: `node .cursor/skills/verify-overland/scripts/verify.mjs <command>`. State and evidence live in `${TMPDIR:-/tmp}/overland-verify`, outside the repo. The only outbound network step is `bootstrap`. Drive talks to `127.0.0.1` only.

Dummy env uses the same names as `.github/workflows/pr-build.yml`. URL values are `http://127.0.0.1:1337` (`REACT_APP_STRAPI_URL`, `REACT_APP_STRAPI_AUTH_LOGIN_PORTAL`, `REACT_APP_VOICE_CMS_URL`, `REACT_APP_VOICE_CMS_URL_DEV`, `REACT_APP_AWS_API_BASE_URL`). The other names stay non-URL dummies. Do not read `.env` files.

## Launch

```bash
node .cursor/skills/verify-overland/scripts/verify.mjs bootstrap
node .cursor/skills/verify-overland/scripts/verify.mjs launch
```

`bootstrap` runs `npm install puppeteer-core@23.11.1 --ignore-scripts --prefix ${TMPDIR:-/tmp}/overland-verify` once (Node 20 compatible). It does not download a browser.

`launch` runs `npm ci` in `client/` only when `client/node_modules` is missing, then starts `npm start -- --host 127.0.0.1 --port 3000 --strictPort --open false` with `BROWSER=none` and the dummy env. It writes the npm PID to `${TMPDIR:-/tmp}/overland-verify/vite.pid` and appends logs to `vite.log`. Ready means `http://127.0.0.1:3000/` returns a status below 500 within 60s. One instance only: if that PID is alive, launch does not start a second server.

## Doctor

```bash
node .cursor/skills/verify-overland/scripts/verify.mjs doctor
```

Read-only. Prints Chrome path, Node version, puppeteer-core presence, and the listener on port 3000. If `lsof` is missing, doctor uses the HTTP readiness check on `http://127.0.0.1:3000/` instead of a PID owner. Fails when the Chrome binary is missing, puppeteer-core was not bootstrapped, nothing is listening, the tracked PID is dead, or port 3000 is held by a process that is not the tracked server (or its child). Chrome path is `$CHROME_PATH`, else macOS `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, else Linux `/usr/bin/google-chrome`.

## Drive

```bash
node .cursor/skills/verify-overland/scripts/verify.mjs drive /
node .cursor/skills/verify-overland/scripts/verify.mjs drive / /roster
node .cursor/skills/verify-overland/scripts/verify.mjs drive
```

With no routes, visits `/`, `/boosters`, `/events`, `/roster`, `/alumni`, `/sponsors`, `/authentication/sign-in`, `/authentication/sign-up`, `/authentication/password-reset`. Passing a protected route exits 1 and does not navigate. Headless Chrome via puppeteer-core (`executablePath` from Doctor). Each route: `page.goto` `http://127.0.0.1:3000<path>`, wait for the feature-map selector (15s), wait 1s for console noise, full-page screenshot. No clicks, no typing.

Loaded means the feature-map selector appeared. `SponsorsPage` has no id and no `main`. `/sponsors` checks `main` for non-empty `innerText` when that element exists, otherwise `body` plus non-empty `innerText`, and records which one in `readinessNote`.

Request interception aborts any request whose host is not `127.0.0.1` or `localhost`. `fonts.googleapis.com`, `fonts.gstatic.com`, and `www.google.com` paths starting with `/maps` go in `blockedExpected` and are not counted NEW. Every other aborted URL is listed in `blocked` and counted NEW once. Console lines that cite either URL, or `net::ERR_BLOCKED_BY_CLIENT`, are omitted so they are not counted again.

Console text is built by substituting `msg.args()` into `%s` before matching. Buckets:

1. **expected** — `http://127.0.0.1:1337` or `http://localhost:1337`, `ERR_CONNECTION_REFUSED`, `ECONNREFUSED`, `Strapi API error`, `Failed to load events|schedules|rosters|alumni`, `[vite]`, React DevTools tip, React Router future-flag warnings (`v7_startTransition`, `v7_relativeSplatPath`).
2. **known** — Jira OV-61: `routes.jsx:96`, empty-string `same key, \`\``, DOM props `marginZero`, `backgroundImage`, `currentTheme`, `isTransparent`, `navListType`, `currentUrl`, `url`, `showLabel`, `stackProps`, `DataStateDisplay` invalid or missing `error` prop, `logo192.png`, `TextBlock` missing required `title` or `body`, and `SectionLayout` missing required `ariaLabel` (ariaLabel and stackProps are to be added to OV-61).
3. **new** — everything else, plus each blocked URL. This is the regression signal.

Exit code 1 when any route failed to load, returned HTTP >= 400, or logged a NEW message.

## Evidence

Each drive writes `${TMPDIR:-/tmp}/overland-verify/evidence/<timestamp>/`:

- `<route>.png` screenshot
- `report.json` — per route: `httpStatus`, `loaded`, `readinessNote` (sponsors), `counts` (`expected` / `known` / `new`), `blockedExpected`, `blocked`, `newMessages` (full text), `screenshot`
- `console.log` — NEW message text per route

Stdout prints the same JSON rows. Proof is the real navigation plus the resulting DOM selector and the console classification, not a test-only endpoint. Strapi is pointed at `http://127.0.0.1:1337`; connection refusals are expected noise. Any other host is aborted and reported under `blocked`.

## Cleanup

```bash
node .cursor/skills/verify-overland/scripts/verify.mjs cleanup
node .cursor/skills/verify-overland/scripts/verify.mjs cleanup --evidence
```

Sends `SIGTERM` to the process group of the PID in `vite.pid` only, then deletes that PID file. Does not use `pkill` or process-name matches. Then checks port 3000 (via `lsof`, or the HTTP readiness check when `lsof` is missing) and prints `port 3000 free` or `port 3000 still in use`. Evidence stays unless `--evidence` is passed.

## Helpers

`scripts/verify.mjs` is the only helper. Commands: `bootstrap`, `launch`, `doctor`, `drive [routes...]`, `cleanup [--evidence]`.
