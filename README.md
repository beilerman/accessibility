# Threshold

Source-linked accessibility information for Northern Kentucky and Greater Cincinnati.

## Run locally

```sh
npm ci
npm run build
npm run start -- --port 3217
```

Public browsing works without environment variables or a database. The current catalog lives in `src/data/places.json`; every accessibility note includes a primary-source URL. `checked_at` is a research date, not a visit date. Missing attributes remain unknown. No generated reviews or stock photographs are displayed as venue evidence.

## Validate

```sh
npm test
npm run lint
npm run build
npm run test:e2e
python3 -m unittest discover -s pipeline -p 'test_*.py'
```

Playwright tests start the built server on port 3217. Install its Chromium browser once with `npx playwright install chromium`. Automated accessibility tests do not establish full WCAG conformance or replace manual assistive-technology testing.

## Working plan

- `docs/PLAN.md`: original Claude v1.1 plan, preserved as downloaded.
- `docs/DECISIONS.md`: corrections and implementation decisions after repository recovery.
- `docs/IMPLEMENTATION-STATUS.md`: execution ledger, validation evidence and remaining dependencies.
- `pipeline/README.md`: optional Overture staging pull and provenance handling.

The recovered repository is Next.js 16 / React 19; the plan's proposed Vite migration is unnecessary. `COMMUNITY_ENABLED` is false in `src/lib/catalog-mode.ts` while ThresholdAccess is inactive and its permissions await live review. The legacy database query implementation is preserved in `src/lib/legacy-data.ts`, reached only through the gated wrapper. Re-enabling contributions requires backend restoration, privilege/publication/upload authorization tests, moderation, and an approved owner verification process. It is not a feature-flag-only launch.

## Content updates

Use official venue/managing-organization sources, retain qualifications and restrictions, and never infer physical access from a general policy. Add source links to every fact, preserve unknown observation dates, and use an independent evidence review before inclusion. Public website summaries are distinct from verified organization submissions and field audits. Do not add identifiable people in images or fictional firsthand accounts.
