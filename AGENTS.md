# Agents

## Project Structure

npm-workspaces monorepo that builds and serves multiple "versions" of the same personal portfolio from one content source on a single domain (`rubuy.me`, `rubuy.me/retro`, ...).

- `apps/main` — the Astro hub site (React + Tailwind, SSR on Vercel). Serves `rubuy.me/*` and owns all serverless endpoints (`src/pages/api/*`, e.g. the pstr regex checker used by the playground).
- `apps/retro` — the retro version (static Astro build, `base: '/retro'`, mounted under `rubuy.me/retro`).
- `packages/content` — single source of truth for all personal info: `data/profile.json` (name, role, email, links, interests), `data/projects.json` (+ `listed: false` keeps a project's page alive but out of grids), `data/projects/*.md` (articles), `data/about-me.md`, `assets/` (shared images).
- `scripts/mount.mjs` — copies `apps/<version>/dist` into `apps/main/public/<version>` so one deploy serves every version.
- `apps/main/src/middleware/` — dev-only shim: Astro's dev server doesn't resolve clean URLs (`/retro/about-me`) to `index.html` inside public subdirectories, so the middleware serves those from `public/` in dev. Production never hits it (Vercel serves the static output before any function runs).

Version apps consume content two ways: typed getters from `@portfolio/content` (`getProfile()`, `getProjects()`, `getListedProjects()`, `getProject(slug)`), and markdown imported directly (`@portfolio/content/data/projects/*.md` as Astro `Content` components — Vite resolves the articles' relative images, e.g. `../../assets/foo.png` from `data/projects/*.md` resolves into `packages/content/assets/`).

Any personal fact (email, years of experience, project list, bio) must be edited in `packages/content`, never hardcoded in a version app. The old copy-paste drift (two different emails, 2 vs 3 years of experience) is exactly what this rule exists to prevent.

## Build & Deploy

```bash
npm run build        # hub chain: content -> retro -> mount -> main (Vercel output in apps/main/.vercel/output)
npm run dev          # main site on :4321 (also serves /retro after a build)
npm run dev:retro    # retro site on :4322 (iterate on retro itself)
npm run preview      # preview main's production build
vercel               # deploy (Vercel project Root Directory must be apps/main)
```

Vercel project settings: Root Directory `apps/main`. Vercel auto-detects npm workspaces and installs from the repo root; `apps/main`'s build script runs the hub chain itself, so deploys pick up every version.

## Adding a new version

1. `mkdir apps/<name>` with a `package.json` (`"@portfolio/content": "*"`, `astro` if it's an Astro app) and run `npm install`.
2. Build the app with `base: '/<name>'` and `output: 'static'` in its `astro.config.mjs`. Every internal link must be base-prefixed — copy the `withBase()` helper from `apps/retro/src/utils/base.ts`.
3. Root `package.json`: append `&& node scripts/mount.mjs <name>` to `build:hub`, add a `dev:<name>` script.
4. `.gitignore`: add `apps/main/public/<name>/` (it's a build artifact).
5. `npm run build` — the version is now served at `rubuy.me/<name>`.

Version apps must stay static-output; anything needing a server (APIs, LLM endpoints) belongs to the hub at `apps/main/src/pages/api/*` and can be called from any version.
