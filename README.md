# Threshold

Source-linked accessibility information for Northern Kentucky and Greater Cincinnati.

Live at **https://thresholdaccessibility.com**.

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
(cd pipeline && .venv/bin/python -m unittest discover -p 'test_*.py')
```

Playwright tests start the built server on port 3217. Install its Chromium browser once with `npx playwright install chromium`. Automated accessibility tests do not establish full WCAG conformance or replace manual assistive-technology testing.

## Working plan

- `docs/ROADMAP.md`: **the current plan**: architecture summary, review findings, operating cadence and next work.
- `docs/HANDOFF-2026-11-10.md`: where the last session stopped and how research is done.
- `docs/PLAN.md`: original Claude v1.1 plan, preserved as downloaded (history).
- `docs/DECISIONS.md`: corrections and implementation decisions after repository recovery.
- `docs/IMPLEMENTATION-STATUS.md`: execution ledger, validation evidence and remaining dependencies.
- `pipeline/README.md`: optional Overture staging pull and provenance handling.

The recovered repository is Next.js 16 / React 19; the plan's proposed Vite migration is unnecessary. `COMMUNITY_ENABLED` is false in `src/lib/catalog-mode.ts` while community permissions and moderation are implemented and tested. The legacy database query implementation is preserved in `src/lib/legacy-data.ts`, reached only through the gated wrapper. Re-enabling contributions requires privilege/publication/upload authorization tests, moderation, and an approved owner verification process. It is not a feature-flag-only launch.

## Source monitoring

`python3 pipeline/check_sources.py` re-fetches every fact source, saves a hashed snapshot in `pipeline/source-checks/` and lists sources that changed, stopped loading or were blocked by bot protection. Where a note's verified supporting quote is stored in `pipeline/evidence/quotes.json`, a changed page is judged by whether the quote is still there: `SUPPORTED` needs no action and `QUOTE_MISSING` names the notes to re-read. After adding notes, run it with `--new-only` and commit the snapshot; a pipeline test fails if any source has no baseline. Record rechecks with `scripts/research/recheck.py`; `scripts/research/queue.py` lists what to recheck next. Before deploying, run `sh scripts/release-check.sh`. Add `--flag` to mark affected facts for editorial recheck; flagged facts show a caution on the site. After re-reading a source, set the fact's `retrieved_at`, restore `review_status` to `source_checked` and append a `rechecked` or `revised` history entry. Never renumber or reuse a fact ID.

## Images

Twenty real venue photographs are stored under `public/images/venues/`, with author, license, source and date records in `src/data/photos-ky.json`, `photos-oh.json`, `photos-extra.json`, and `photos-research.json`. These are archival context, not current access inspections. Keep the full frame and linked attribution when displaying them.

Three photorealistic educational examples live under `public/images/illustrations/`. Every appearance uses the readable caption **AI illustration — example setting**. They are never used as venue photographs. Prompts, provenance and visual review are in `docs/research/ai-illustrations.md`; reusable-photo research is in the adjacent `photos-ky.md` and `photos-oh.md` files.

Five labeled AI category artworks provide visual context for every listing without a venue photograph (21 of 41 as of November 8, 2026) and introduce the homepage category navigation. Every listing card and detail page has a visual; a browser test enforces this. The transportation artwork has an airport theme, which fits CVG better than the bus and streetcar listings. These artworks depict imagined scenes; they do not establish venue conditions. Prompts and visual review are in `docs/research/category-art.md`.

## Visitor reports

Seventeen selected public accessibility reviews/comments cover 12 venues; listings added after September 2026 have none yet. Source-linked summaries, known dates, unknown visit dates and context appear in a separate `/visitor-reports` browser and below official venue information. Reports are not Threshold submissions, independent audits or ratings. The `visitor-reports-*.json` files supply this layer; archival candidates and venue-by-venue search coverage are preserved in `docs/research/`. No private discussions, copied reviewer photos or generated reviews are used.

## Content updates

Use official venue/managing-organization sources, retain qualifications and restrictions, and never infer physical access from a general policy. Add source links to every fact, preserve unknown observation dates, and use an independent evidence review before inclusion. Public website summaries are distinct from verified organization submissions and field audits. Do not add identifiable people in images or fictional firsthand accounts.

## Domains

`thresholdaccessibility.com` is canonical (`SITE_ORIGIN` in `src/lib/site.ts`). These all 308-redirect to it via Vercel project domain settings: `www.thresholdaccessibility.com`, `thresholdaccessability.com`, `www.thresholdaccessability.com` and the old `accessibility-omega-ten.vercel.app`.

DNS is at Namecheap (registrar nameservers): `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com.` on both domains. Vercel reports the configuration valid. It optionally recommends its newer A values (`216.198.79.1`, `64.29.17.1`); applying them is not required.

