# Prioritized Accessibility & Code-Quality Audit

## Summary

A focused audit and set of fixes were applied to make the app accessible, stable, and closer to production readiness. Critical a11y and runtime issues were fixed; recommended improvements remain for testing, CI, and minor polish.

## Critical (Fixed)

- Accessibility: replaced non-interactive play affordances with accessible `<button>`s and added `aria-label`/`aria-pressed` where appropriate.
- Landmark semantics: removed nested `<main>` elements (e.g., `LoginSignup.jsx`).
- Keyboard & carousel: added prev/next controls and Arrow key handlers to the trending carousel.
- Images: removed empty `img.src` usage; added conditional thumbnail rendering and placeholders; centralized thumbnail resolution in `src/utils/media.js` and fixed path bugs.
- Stable keys: generated stable `id` values at load and migrated keys to `item.id || title` to prevent reordering issues.
- Context stability: memoized provider value and wrapped `toggleBookmark` in `useCallback` to reduce re-renders.

## Recommended (High Priority)

- Add unit tests for `DataContext` bookmark behavior and `src/utils/media.js` (mock data, ensure toggle/bookmark semantics).
- Replace dataset `title` keys with authoritative `id` fields in upstream `data.json`, or verify generated `id` uniqueness; if collisions exist, generate deterministic unique ids (slug+index).
- Add CI (lint/build/test) to run on PRs and block regressions.
- Add an automated a11y smoke test (axe-core or Pa11y) and Lighthouse checks as part of CI.

## Recommended (Medium Priority)

- Add a small placeholder image asset or skeleton styles for thumbnails to avoid layout jumps.
- Consider virtualization (e.g., react-window) for very large lists.
- Consolidate visual-hidden utilities (global `.sr-only` exists) and remove duplicates.

## Minor / Nice-to-have

- Add aria-live announcements for search results count.
- Image optimization pipeline for build (compress/serve WebP where supported).
- More granular memoization and code-splitting for rare routes.

## Files Touched (high level)

- [src/context/DataContext.jsx](src/context/DataContext.jsx)
- [src/utils/media.js](src/utils/media.js)
- [src/components/Trending/Trending.jsx](src/components/Trending/Trending.jsx)
- [src/components/Recommended/Recommended.jsx](src/components/Recommended/Recommended.jsx)
- [src/pages/Movies/Movies.jsx](src/pages/Movies/Movies.jsx)
- [src/pages/TvSeries/TvSeries.jsx](src/pages/TvSeries/TvSeries.jsx)
- [src/pages/Bookmarked/Bookmarked.jsx](src/pages/Bookmarked/Bookmarked.jsx)
- [src/pages/Home/Home.jsx](src/pages/Home/Home.jsx)
- [src/components/SearchBar/SearchBar.jsx](src/components/SearchBar/SearchBar.jsx)

## Next Actions (suggested)

1. Add unit tests for `DataContext` and `media.js` and add them to CI.
2. Run automated a11y checks (axe + Lighthouse) and fix any failures they report.
3. Verify unique ids across the dataset and update data source if possible.
4. Add placeholder asset and consider image optimization.

---

If you want, I can: run axe/lighthouse smoke checks locally, scaffold unit tests, or wire a simple GitHub Actions workflow for build + tests + a11y. Which should I do next?
