# Avengers: Doomsday � The Doom Protocol

Unofficial fan experience built with React, Vite, TypeScript, Three.js and Lucide icons.

## Run locally

Requires Node.js 22.12+ (or Node 24).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

On PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

## GitHub Pages

1. Push this project, including package-lock.json, to the main or master branch.
2. In repository Settings > Pages > Build and deployment, choose GitHub Actions.
3. The workflow at .github/workflows/deploy.yml builds and deploys dist automatically. It can also be started manually from Actions.

Expected URL: https://charlespura.github.io/Avengers--Doomsday/

Vite uses a relative base so assets work under the repository subdirectory. Navigation uses page anchors; no SPA rewrite is required. No credentials or API keys are needed.

## Content and customization

Cast and release information are in src/main.tsx. Countdown targets December 18, 2026 at midnight US Eastern (05:00 UTC), a date reference rather than a confirmed screening time. Local theatrical dates may differ. Timer stops at zero after release.

Film source: https://movies.disney.com/avengers-doomsday (checked November 9, 2026).
Character source: https://www.marvel.com/characters/doctor-doom-victor-von-doom

The interactive procedural full-body model in src/Doom.tsx is a stylized fan interpretation with a green hood, faceted metal mask, mouth grille, cloak and clasp chain. It is not an official or screen-accurate movie asset. Animation respects reduced-motion preferences and can be paused. If WebGL is unavailable, a text fallback is shown. Cast grouping is editorial. Search, filters and countdown run entirely in the browser; content updates are manual.

Google Fonts are optional; local fallback fonts are configured. All characters and trademarks belong to Marvel and their respective owners. This project is not affiliated with Marvel or Disney.
