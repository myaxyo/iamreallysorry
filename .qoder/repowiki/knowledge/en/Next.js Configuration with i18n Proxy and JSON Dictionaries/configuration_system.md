## Configuration System Overview

This repository uses a **minimal, convention-driven configuration approach** typical of Next.js applications. There is no dedicated configuration framework or complex layering system — configuration is handled through standard Next.js config files, TypeScript path aliases, and a custom middleware proxy for internationalization.

### What System/Approach Is Used

- **Next.js native configuration**: The application relies on `next.config.ts` (currently empty/default), `tsconfig.json`, and standard tooling configs (`eslint.config.mjs`, `postcss.config.mjs`).
- **No environment variable usage**: A grep for `process.env` and `NEXT_PUBLIC` returned zero matches in source code. The application does not currently use runtime environment variables for feature flags, API keys, or behavioral toggles.
- **i18n via middleware proxy**: Locale routing is implemented through a custom `src/proxy.ts` middleware that performs content negotiation using the `negotiator` and `@formatjs/intl-localematcher` packages. This acts as the primary "configuration" mechanism for language selection.
- **JSON dictionary files**: Translations are stored as static JSON files under `src/app/[lang]/dictionaries/`, loaded dynamically via lazy imports in `src/app/[lang]/dictionaries.ts`.

### Key Files and Packages

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js build/runtime config (currently default/empty) |
| `tsconfig.json` | TypeScript compiler options, including `@/*` path alias to `./src/*` |
| `src/proxy.ts` | Middleware implementing locale detection and URL rewriting |
| `src/app/[lang]/dictionaries.ts` | Registry of available locales and lazy-loading logic for translation JSON files |
| `src/app/[lang]/dictionaries/*.json` | Per-locale translation dictionaries (11 languages: en, ru, es, pt, fr, de, tr, ar, hi, ja, ko) |
| `eslint.config.mjs` | ESLint configuration extending `eslint-config-next` |
| `postcss.config.mjs` | PostCSS config enabling Tailwind CSS v4 |
| `.gitignore` | Excludes `.env*` files, indicating env vars are supported but unused |
| `package.json` | Declares dependencies; no dotenv or config-management libraries present |

### Architecture and Conventions

1. **Locale configuration is centralized in two places**:
   - `src/proxy.ts` defines the `locales` array and `defaultLocale` for URL routing.
   - `src/app/[lang]/dictionaries.ts` mirrors this list for dictionary loading.
   - These two lists must be kept in sync manually — there is no single source of truth.

2. **No environment-based configuration layering**: The app does not differentiate behavior between development, staging, or production via environment variables. All configuration is compile-time or file-based.

3. **Static asset configuration**: Sound files (`.mp3`) and PWA assets (favicons, `site.webmanifest`) live in `public/` and are referenced by relative paths at runtime. No manifest or build-time injection is used.

4. **Path alias convention**: The `@/*` alias maps to `./src/*`, used throughout the codebase for clean imports.

### Rules Developers Should Follow

- **Adding a new locale requires changes in two files**: Update both the `locales` array in `src/proxy.ts` and the `dictionaries` object in `src/app/[lang]/dictionaries.ts`, plus add a corresponding JSON file.
- **Environment variables are not currently used**: If adding secrets or runtime config, use `NEXT_PUBLIC_` prefix for client-accessible values and ensure `.env*` files remain gitignored (per `.gitignore` line 34).
- **Keep `next.config.ts` minimal**: The project intentionally avoids custom Next.js config overrides. Any additions should be justified and documented.
- **No feature flag system exists**: Behavioral changes are controlled through code, not runtime flags. Introducing a feature flag system would require adding a dedicated library (e.g., `@vercel/flags`) or custom implementation.