## Overview
The project uses a standard **Next.js** build system managed via **npm** scripts. It relies on the Next.js CLI for compilation, development, and production serving, with no custom build orchestration (e.g., Makefiles, Docker, or CI pipelines) currently present in the repository.

## Key Tools & Configuration
- **Package Manager**: npm (indicated by `package-lock.json`).
- **Build Tool**: Next.js 16 (`next build`, `next dev`, `next start`).
- **Language**: TypeScript 5 with strict mode enabled.
- **Linting**: ESLint 9 with `eslint-config-next` for Next.js-specific rules.
- **Styling**: Tailwind CSS 4 with PostCSS.
- **Deployment**: Recommended deployment is via the **Vercel Platform**, as per the README. No containerization (Docker) or alternative CI/CD configurations are defined.

## Build Scripts
Defined in `package.json`:
- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint checks.

## Architecture & Conventions
- **Zero-Config Build**: The `next.config.ts` is minimal, relying on Next.js defaults.
- **Type Safety**: `tsconfig.json` enforces strict typing and uses the `next` plugin for type checking during builds.
- **Path Aliases**: Uses `@/*` mapping to `./src/*` for cleaner imports.
- **Incremental Builds**: Enabled via `incremental: true` in `tsconfig.json` and Next.js default caching in `.next/`.

## Developer Rules
1. **Use NPM Scripts**: Always use `npm run <script>` for consistency, though `yarn`, `pnpm`, and `bun` are supported by Next.js.
2. **No Manual Webpack Config**: Avoid ejecting or adding custom webpack configurations unless necessary; leverage Next.js defaults.
3. **Deployment**: Deployments are intended for Vercel. If deploying elsewhere, ensure the `next start` command is used after `next build`.
4. **Linting**: Run `npm run lint` before committing to ensure code quality standards are met.