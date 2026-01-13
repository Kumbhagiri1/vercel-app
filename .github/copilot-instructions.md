# Copilot / Agent Instructions for this repository

Purpose: quickly onboard AI coding agents with the concrete, discoverable
patterns and workflows in this Next.js + TypeScript project.

- Project type: Next.js app-directory (app/) using Next 16, React 19 and TypeScript.
- Dev commands: `npm run dev` (local), `npm run build`, `npm run start`, `npm run lint`.

Big picture
- The app uses the `app/` directory (server components by default). Small UI lives
  in `app/page.tsx` and top-level structure in `app/layout.tsx` (fonts, html/body).
- Styling is Tailwind + global CSS variables (`app/globals.css`) and PostCSS
  (`postcss.config.mjs`). Dark-mode uses CSS variables via `prefers-color-scheme`.
- Images and static assets are served from `public/` and used through `next/image`.

Key files to reference
- `package.json` - scripts and core deps (Next 16, React 19, Tailwind).
- `tsconfig.json` - `strict` TypeScript, `noEmit`, and path alias `@/*` → `./*`.
- `app/layout.tsx` - root layout and `next/font/google` usage (fonts set via CSS vars).
- `app/page.tsx` - example server component using `next/image` and Tailwind utilities.
- `app/globals.css` - global variables, `@import "tailwindcss"`, and theme rules.
- `postcss.config.mjs` - Tailwind is enabled via `@tailwindcss/postcss` plugin.
- `eslint.config.mjs` - ESLint config extends Next.js core web vitals and typescript rules.
- `next.config.ts` - present but empty; preferred place for Next configuration.

Conventions & patterns (specific to this repo)
- Components default to Server Components. Add `"use client"` at the top of a file
  when you need client-side behavior (hooks, state, event handlers).
- Use `next/image` for images (see `app/page.tsx`) to get automatic optimization.
- Fonts: use `next/font/google` and assign variables (e.g. `--font-geist-sans`) in
  `app/layout.tsx`. Use these CSS variables in `app/globals.css` for fallback styles.
- Styling: prefer Tailwind utilities for layout & components; keep global theme
  variables and dark-mode toggles in `app/globals.css`.
- Imports: the TypeScript `paths` mapping `@/*` → `./*` is available; use it for
  repo-root imports when helpful.

Developer workflows
- Run the dev server locally:

```bash
npm run dev
```

- Build and verify production output before PRs:

```bash
npm run build
npm run lint
```

- Linting: `npm run lint` runs ESLint which uses `eslint.config.mjs` (based on
  `eslint-config-next`). Fix format & lint issues before merging.

Integration points & external dependencies
- Uses Vercel-flavored defaults; deployment target is Vercel (static/public + Next).
- Tailwind + PostCSS are configured; do not remove `@import "tailwindcss"` from
  `app/globals.css` without updating `postcss.config.mjs`.
- No explicit runtime env files checked in; if you add secrets, follow typical
  `.env.local` usage and Vercel environment variable configuration.

What the agent should do when making changes
- Edit components under `app/`. If adding client-side interactions, add
  `"use client"`. Keep server-only code free of browser APIs.
- Run `npm run dev` and `npm run lint` locally after edits. If changing build
  behavior, run `npm run build` to ensure no production errors.
- Prefer minimal, focused changes and reference the files listed above in PR
  descriptions.

If anything above is unclear or you want additional examples (routes, API
handlers, or a sample client component), tell me which area and I'll expand
the instructions with concrete code snippets from this repo.
