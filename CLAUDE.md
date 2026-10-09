# Overland Baseball Website

Loaded on every turn — keep it short. It points at detail; it does not restate it.

## What this is

- React 18 + **Vite 5** SPA in `client/` (not CRA). MUI v5, React Router v6, TanStack Query,
  Firebase Auth. Strapi v4 is the CMS.
- Static hosting: the build is synced to S3 by `.github/workflows/workflow.yml`. No backend —
  `server/` is a dead Express + Stripe stub, not deployed.
- **JavaScript + PropTypes only. Never introduce TypeScript** (no `.ts`/`.tsx`, no `tsconfig`).

## Commands

| Task | Command |
|---|---|
| Install | `npm run installClient` (or `cd client && npm ci`) |
| Dev server | `npm start` → Vite on **:3000** |
| Build | `npm run build` → output in **`client/build/`** |
| Preview build | `cd client && npm run preview` → **:4173** |

**There is no test runner and no linter/formatter.** Do not invent `npm test`, `npm run lint`, or
`npm run typecheck` — root `npm test` deliberately exits with an error. The only automated check
is the `verify-overland` skill (`node .claude/skills/verify-overland/scripts/verify.mjs`).

## Env vars

- All client vars are prefixed `REACT_APP_` (`envPrefix` in `client/vite.config.js`).
- Read them as `import.meta.env.REACT_APP_*` — **never `process.env`**.
- **Never read, print, or commit `.env*` files.** This repo is public.

## Branching and commits

- Branch off `development`; open PRs into `development` only.
- Branch names: `feature/OV-NN`, `fix/OV-NN`, `chore/<slug>`, `ci/<slug>`.
- Conventional Commits with the Jira key, e.g.
  `fix(routes): resolve ThemeShowcase named export inside lazy loader (OV-74)`.
- **Never push to or merge `development` or `main`.** Bots open PRs; the owner merges
  (README "Bot workflow").

## Worktrees

- One worktree per ticket: `claude -w ov-74 --agent builder-frontend "do OV-74"` →
  `.claude/worktrees/ov-74`. Add `--tmux` for a pane per agent. A builder launched as a subagent
  gets its own worktree automatically (`isolation: worktree`).
- `worktree.baseRef` is `head`, so a worktree starts from the main checkout's current commit —
  start from `development`. The builder still branches off `origin/development` explicitly.
- `.worktreeinclude` copies `client/.env` into new worktrees. Worktrees are local-only and
  disposable: remove one after its PR merges. Details: `docs/agent-workflow/worktrees.md`.

## Layout rules

- Feature-based: pages in `client/src/features/<feature>/pages/`, shared UI in
  `client/src/features/ui/components/`, hooks in `client/src/hooks/`, theme in
  `client/src/utils/theme/`, routes in `client/src/routes.jsx`.
- One barrel `index.js` per feature. No path aliases — use relative imports.
- PascalCase components, camelCase utils, UPPER_SNAKE_CASE constants.
- MUI v5 with `defaultTheme`. For responsive logic prefer the `useMediaQueries` hook
  (`client/src/utils/helpers/useMediaQueries.utils.jsx`) over MUI breakpoint utilities.
- Find the nearest existing sibling (component, page, hook) and copy its shape. Do not invent a new
  pattern when one exists.

## Pointers

| Need | Read |
|---|---|
| Component/hook API docs, styling conventions | `project_rules.cursorrules.json` |
| Route → selector feature map | `.claude/skills/verify-overland/features/README.md` |
| Verification harness contract | `.claude/skills/verify-overland/SKILL.md` |
| Ticket spec shape | `.claude/skills/overland-planner/references/spec-template.md` |
| Deploy, env, gotchas | `README.md` |
| This agent workflow | `docs/agent-workflow/PLAN.md` |

## Known gotchas

- Build output is `client/build/`, **not** `dist/`.
- In dev, Strapi is hardcoded to `http://localhost:1337` in
  `client/src/services/strapiServices.js`; `REACT_APP_STRAPI_URL` is used only in production builds.
- `netlify.TOML` is dead — deploys go through S3 / GitHub Actions.
- The deploy build sets `CI=false` so warnings don't fail it.
- `routes.jsx` lazy-loads every page except `HomePage`. `ThemeShowcase` is a **named** export, so
  its lazy loader maps it: `import("./features/themeShowcase").then((m) => ({ default: m.ThemeShowcase }))`.
