# Overland Trailblazers Baseball — Official Team Website

Public-facing site for the Overland Trailblazers Baseball Team featuring game schedules, events, roster, news, and sponsors, plus an authenticated member portal for documents and an admin dashboard.

**Target users:** Public visitors (fans, potential recruits) · Team members (Players, Parents, Coaches) · Admins (content management)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.2 (Vite 5) |
| Language | JavaScript (PropTypes, no TypeScript) |
| UI | Material-UI v5 + custom theme |
| State | React Context + TanStack React Query |
| Routing | React Router v6 |
| Forms | React Hook Form (config-driven validation) |
| Animation | Framer Motion |
| Auth | Firebase Auth (role-based: Admin → Coach → Player → Parent → User) |
| CMS | Strapi v4 (headless, self-hosted) |
| Database | Firestore (user profiles, auth data) |
| Email | EmailJS |
| Hosting | AWS S3 (static site) |
| CI/CD | GitHub Actions |

## Project Structure

```
├── .github/workflows/    # CI/CD (GitHub Actions → S3)
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── features/     # Feature modules (auth, events, roster, admin, etc.)
│   │   ├── hooks/        # Shared custom hooks
│   │   ├── services/     # API services (Strapi integration)
│   │   ├── utils/        # Theme, Firebase config, helpers, animations
│   │   ├── routes.jsx    # Central route definitions
│   │   └── App.jsx       # Root component
│   ├── public/           # Static assets, manifest, robots.txt
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Client dependencies
├── server/               # Express server (Stripe stub — not actively used)
├── package.json          # Root scripts (delegates to client/)
└── project_rules.cursorrules.json  # Component docs & coding conventions
```

## Prerequisites

- **Node.js** 20+ (matches CI)
- **npm** (ships with Node)
- **Strapi v4** instance running locally or accessible remotely (CMS data source)
- **Firebase project** with Auth + Firestore enabled
- **EmailJS account** (for contact/registration forms)

## Local Development Setup

### Step 1 — Clone & install

```bash
git clone https://github.com/ChristianBega/Overland-Baseball-Website.git
cd Overland-Baseball-Website
npm run installClient
```

### Step 2 — Environment variables

Create `client/.env` with the following variables. All must be prefixed with `REACT_APP_` (Vite only exposes vars with this prefix to client code).

```env
# Firebase
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=

# Strapi CMS
REACT_APP_STRAPI_URL=https://your-strapi-instance.com
REACT_APP_STRAPI_AUTH_LOGIN_PORTAL=

# EmailJS
REACT_APP_SERVICE_ID=
REACT_APP_TEMPLATE_ID_REGISTER=
REACT_APP_TEMPLATE_ID_VOLUNTEER=
REACT_APP_TEMPLATE_PARAMS=

# AWS API endpoints
REACT_APP_AWS_API_BASE_URL_DEV=
REACT_APP_AWS_API_BASE_URL_PROD=

# Voice CMS
REACT_APP_VOICE_CMS_URL=
REACT_APP_VOICE_CMS_URL_DEV=
```

> **Note:** In local dev mode, Strapi URL auto-falls back to `http://localhost:1337` regardless of `REACT_APP_STRAPI_URL`. See `client/src/services/strapiServices.js`.

### Step 3 — Start the dev server

```bash
npm start          # runs Vite on http://localhost:3000
```

### Step 4 — (Optional) Start Strapi locally

If you're running Strapi locally, start it in a separate terminal so the frontend can fetch CMS content. Strapi must be on port 1337 (the default).

## Available Scripts

Run from the repo root:

| Command | Description |
|---------|-------------|
| `npm start` | Start Vite dev server (port 3000) |
| `npm run build` | Production build → `client/build/` |
| `npm run build:dev` | Development build (sets `REACT_APP_CUSTOM_ENV=development`) |
| `npm run installClient` | Install client dependencies |

## Deployment

Deployment is automated via **GitHub Actions** (`.github/workflows/workflow.yml`).

| Branch | Build | S3 Bucket | URL |
|--------|-------|-----------|-----|
| `main` | `npm run build` | `s3://overland-baseball` | Production |
| `development` | `npm run build:dev` | `s3://development.overlandbaseball.com` | Staging |

**How it works:**

1. Push (or merge PR) to `main` or `development`.
2. GitHub Actions installs deps, injects env vars from **GitHub Secrets**, builds, and syncs `client/build/` to the target S3 bucket.
3. AWS region: `us-east-2`.

**To add or update env vars for CI:** Go to GitHub repo → Settings → Secrets and variables → Actions → Repository secrets.

## Strapi CMS — Client Usage Notes

Strapi is the headless CMS that powers dynamic content (roster, events, sponsors, etc.).

- **Local development:** The frontend automatically hits `http://localhost:1337` when `MODE === "development"`. No env var needed.
- **Production:** Set `REACT_APP_STRAPI_URL` to the hosted Strapi instance URL.
- **API pattern:** All queries go through `client/src/services/strapiServices.js`, which provides `findMany`, `findOne`, `findFiltered`, `getEvents`, and `getEventsByType` helpers.
- **Default behavior:** All requests auto-populate related fields (`populate=*`).
- **Content types managed in Strapi:** Rosters, Events, Sponsors, Alumni, Documents, and more. Check the Strapi admin panel for the full list.

**Tips for content editors:**

- Changes in Strapi are reflected on the site immediately (no rebuild needed — data is fetched at runtime via React Query).
- Image uploads in Strapi should be optimized before uploading (no server-side image processing).

## Authentication & Roles

Firebase Auth handles authentication. Roles are stored in Firestore user profiles and checked client-side.

**Role hierarchy (highest → lowest):** `ADMIN` → `COACH` → `PLAYER` → `PARENT` → `USER`

**Protected routes:**

- `/dashboard` — Admin + Coach only
- `/documents` — All authenticated roles
- `/theme-showcase` — Admin + Coach only

**Key files:**

- `client/src/features/auth/context/AuthContext.jsx` — Auth state
- `client/src/features/auth/context/UserContext.jsx` — User profile + role
- `client/src/features/guards/components/roleGuard.jsx` — Route protection
- `client/src/hooks/useRoleCheck.jsx` — Permission checks

## Known Gotchas

- **Env var prefix:** All client env vars MUST start with `REACT_APP_`. Vite only exposes vars with this prefix (configured in `vite.config.js` via `envPrefix`).
- **Env var access:** Use `import.meta.env.REACT_APP_*` — NOT `process.env`. This is a Vite project, not CRA.
- **Strapi local fallback:** In dev mode, Strapi URL is hardcoded to `localhost:1337` in `strapiServices.js`. The `REACT_APP_STRAPI_URL` env var is only used in production builds.
- **Build output:** Vite outputs to `client/build/` (not the Vite default of `dist/`), configured in `vite.config.js`.
- **Netlify config:** `netlify.TOML` exists but references `client/public/` as build output — this is outdated. Deployment is via S3/GitHub Actions, not Netlify.
- **Server directory:** The `server/` folder contains a minimal Express + Stripe stub. It is **not** part of the deployed site and is not actively used.
- **CJS deprecation warning:** Vite 5 may show a CJS deprecation warning. This is cosmetic and will be resolved when upgrading to Vite 6 (requires adding `"type": "module"` to package.json).
- **No test suite:** There is no test runner configured (`npm test` exits with an error). Tests are manual.
- **`CI=false` in CI:** The GitHub Actions build sets `CI=false` to prevent warnings from being treated as errors during the build.
