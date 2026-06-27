## Overview

This Next.js application employs a minimal, framework-native approach to error handling with no dedicated error boundary components, custom error types, or centralized error middleware.

## System Used

The codebase relies exclusively on **Next.js built-in navigation helpers** for error scenarios:

- **`notFound()`** from `next/navigation` — used consistently across all route handlers and layouts to signal missing resources (invalid locale, missing blog post)
- **Silent `.catch(() => {})`** — used for non-critical audio playback failures where errors are intentionally ignored
- **Try/catch with fallback** — single instance in `src/proxy.ts` for locale matching, falling back to default locale on failure

## Key Files

| File | Pattern |
|------|---------|
| `src/app/[lang]/layout.tsx` | `if (!hasLocale(lang)) notFound()` at line 76 |
| `src/app/[lang]/page.tsx` | `if (!hasLocale(lang)) notFound()` at line 14 |
| `src/app/[lang]/blog/page.tsx` | `if (!hasLocale(lang)) notFound()` at line 29 |
| `src/app/[lang]/blog/[slug]/page.tsx` | Dual `notFound()` calls: invalid locale (line 46) and missing post (line 49) |
| `src/proxy.ts` | Try/catch around `match()` with default locale fallback (lines 15-19) |
| `src/components/useSounds.ts` | Silent catch on `audio.play()` (lines 48, 56) |

## Architecture and Conventions

### 1. Locale Validation as Primary Error Source
All server-side route handlers validate the locale parameter using `hasLocale()` before proceeding. Invalid locales trigger `notFound()`, which renders Next.js's default 404 page. This is the only explicit error path in the entire application.

### 2. No Error Boundaries
There are **no `error.tsx` or `global-error.tsx` files** anywhere in the `src/app/` directory tree. The application does not implement React Error Boundaries or Next.js route-level error recovery pages.

### 3. No Custom Error Types
The codebase defines no custom error classes, error codes, or error enums. All error signaling goes through Next.js's `notFound()` helper.

### 4. Audio Failures Silently Ignored
In `useSounds.ts`, both `play()` and `playLoop()` functions call `.catch(() => {})` on `audio.play()`. This is intentional — browser autoplay policies may block audio, and the application degrades gracefully without surfacing errors to users.

### 5. Proxy Middleware Has Minimal Error Handling
The `proxy.ts` middleware wraps locale matching in a try/catch that falls back to `defaultLocale` (`"en"`). This prevents crashes from malformed Accept-Language headers.

## Rules Developers Should Follow

1. **Use `notFound()` for missing resources** — When a dynamic route parameter (locale, blog slug) is invalid, call `notFound()` rather than throwing raw errors or returning custom status codes.

2. **Validate locale early** — Every server component receiving a `lang` param must call `hasLocale(lang)` and invoke `notFound()` if validation fails. This pattern is consistent across all pages and layouts.

3. **Silent catches for non-critical operations** — For optional features like audio playback, use empty `.catch(() => {})` blocks. Do not surface these errors to users.

4. **No error boundaries needed for current scope** — The application is small and client-side state is minimal. If complex client-side interactions are added, consider adding `error.tsx` files at the route level.

5. **Middleware should always have a fallback** — The proxy middleware demonstrates the correct pattern: wrap potentially failing logic in try/catch and provide a safe default value.

## Gaps

- No `error.tsx` files exist for graceful error recovery within routes
- No logging or error reporting infrastructure (e.g., Sentry, console.error wrappers)
- No input validation beyond locale checking
- Blog content rendering uses regex-based markdown parsing with no error handling for malformed content
