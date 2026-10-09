---
name: verify-overland
description: Drive the Overland Baseball Vite + React site in headless Chrome and capture per-route screenshots plus classified console output. Use when proving a public page still loads, or when checking / /boosters /events /roster /alumni /sponsors and /authentication/* for new console regressions.
---

# Verify Overland Baseball

Primary surface is the Vite React app in `client/` (harness port 3100, override with `VERIFY_PORT`). Protected routes `/dashboard`, `/documents`, and `/theme-showcase` are out of scope. Do not submit forms, click submit, sign in, or type credentials. Navigate and observe only.

If `doctor` exits non-zero, stop and report. Do not run `drive`. Never kill a process this skill did not start. The cloud environment's own dev server on `localhost:3000` must be left alone.

Harness: `node .claude/skills/verify-overland/scripts/verify.mjs <command>`. State and evidence live in `${TMPDIR:-/tmp}/overland-verify`, outside the repo. The only outbound network step is `bootstrap`. Drive talks to `127.0.0.1` only. `lsof` is required.

A passing drive proves the page shell and the console classification only. Strapi is not running, so data-driven rendering is not covered.

Dummy env uses the same names as `.github/workflows/pr-build.yml`. URL values are `http://127.0.0.1:1337` (`REACT_APP_STRAPI_URL`, `REACT_APP_STRAPI_AUTH_LOGIN_PORTAL`, `REACT_APP_VOICE_CMS_URL`, `REACT_APP_VOICE_CMS_URL_DEV`, `REACT_APP_AWS_API_BASE_URL`). The other names stay non-URL dummies. Do not read `.env` files.

## Launch

```bash
node .claude/skills/verify-overland/scripts/verify.mjs bootstrap
node .claude/skills/verify-overland/scripts/verify.mjs launch
```

`bootstrap` runs `npm install puppeteer-core@23.11.1 --ignore-scripts --prefix ${TMPDIR:-/tmp}/overland-verify` once (Node 20 compatible). It does not download a browser.

`launch` runs `npm ci` in `client/` only when `client/node_modules` is missing. Before it spawns, it connects to `PORT` (`VERIFY_PORT`, default 3100) on both `127.0.0.1` and `::1`. If either address accepts the connection it exits non-zero, names the listener with `lsof`, and does not kill anything. Run `cleanup` after a failed launch. Otherwise it starts `npm start -- --host 127.0.0.1 --port <PORT> --strictPort --open false` with `BROWSER=none` and the dummy env. It writes the npm PID to `${TMPDIR:-/tmp}/overland-verify/vite.pid` and appends logs to `vite.log`. Ready means the tracked PID is still alive, `http://127.0.0.1:<PORT>/` returns a status below 500 within 60s, and the `127.0.0.1:<PORT>` listener is that PID or a descendant. An early child exit fails the command and prints the tail of `vite.log`. One instance only: a live PID is "already running" only when `ps -o args= -p <pid>` contains `vite` or `npm start` and `--port <PORT>`. A live PID that does not match is a stale file: launch deletes it, prints `stale pid file, not signalling pid X`, and does not signal that process.

## Doctor

```bash
node .claude/skills/verify-overland/scripts/verify.mjs doctor
```

Read-only. `lsof` is required. Prints Chrome path, Node version, puppeteer-core presence, and every listener PID on `PORT`. Passes only when the listener on `127.0.0.1:<PORT>` is the tracked PID or a descendant. Does not kill anything. Fails when the Chrome binary is missing, puppeteer-core was not bootstrapped, `lsof` is missing, nothing is listening on `127.0.0.1:<PORT>`, the tracked PID is dead, or that address is held by a process outside the tracked tree. Chrome path is `$CHROME_PATH`, else macOS `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, else Linux `/usr/bin/google-chrome`. A non-zero doctor exit ends the check: do not run drive.

## Drive

```bash
node .claude/skills/verify-overland/scripts/verify.mjs drive /
node .claude/skills/verify-overland/scripts/verify.mjs drive / /roster
node .claude/skills/verify-overland/scripts/verify.mjs drive
```

With no routes, visits `/`, `/boosters`, `/events`, `/roster`, `/alumni`, `/sponsors`, `/authentication/sign-in`, `/authentication/sign-up`, `/authentication/password-reset`. Passing a protected route exits 1 and does not navigate. Headless Chrome via puppeteer-core (`executablePath` from Doctor). Each route: `page.goto` `http://127.0.0.1:<PORT><path>`, wait for the feature-map selector (15s), wait 1s for console noise, full-page screenshot. No clicks, no typing. A failure in goto, the wait, or the screenshot is caught per route: that row records `loaded: false` and the error text, and drive continues. `report.json` and `console.log` are still written. Run drive only after doctor exits 0.

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

Stdout prints the same JSON rows. A pass proves the shell and the console only, because Strapi is not running and data-driven rendering is not covered. Strapi is pointed at `http://127.0.0.1:1337`; connection refusals are expected noise. Any other host is aborted and reported under `blocked`.

## Cleanup

```bash
node .claude/skills/verify-overland/scripts/verify.mjs cleanup
node .claude/skills/verify-overland/scripts/verify.mjs cleanup --evidence
```

Before `SIGTERM`, `ps -o args= -p <pid>` must contain `vite` or `npm start` and `--port <PORT>`. A live PID that does not match is stale: cleanup deletes the file, prints `stale pid file, not signalling pid X`, and does not signal that process. A matching PID gets `SIGTERM` on its process group (then the PID itself if the group signal fails). Does not use `pkill` or process-name matches, and does not kill a process this skill did not start (including a dev server already bound to `localhost:3000`). Run cleanup after a failed launch. Then confirms `PORT` accepts no connection on `127.0.0.1` or `::1`, and that no process from the tracked tree is still alive. Prints `port <PORT> free on 127.0.0.1 and ::1` or names the addresses still in use, and `process tree clear` or the remaining PIDs. Exits non-zero if the port is still taken or the tree remains. Evidence stays unless `--evidence` is passed.

## Helpers

`scripts/verify.mjs` is the only helper. Commands: `bootstrap`, `launch`, `doctor`, `drive [routes...]`, `cleanup [--evidence]`.
