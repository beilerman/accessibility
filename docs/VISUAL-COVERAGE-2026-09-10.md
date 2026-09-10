# Full catalog visual coverage — 2026-09-10

## Changes

Six additional licensed venue photographs bring the total to 15. Five cohesive AI category artworks cover the remaining 17 listings. All 32 cards and detail pages now show a visual; real venue photos take precedence. The homepage adds five illustrated category links, and cards place their images first.

Real photos preserve full frames, dates and linked author/license/source credits. Winton Woods uses the requested Photo by Greg Hume credit. AI artwork is labeled in visible captions and descriptive alt text; fictional scenes are explicitly distinguished from venue photographs. The existing three AI teaching examples remain separate from venue evidence. No catalog accessibility claims or database features changed.

Sources and inspection notes: [extra photos](research/photos-extra.md), [category art](research/category-art.md).

## Local validation

- Production build and TypeScript passed; 47 generated pages.
- 25 unit tests passed; final airport-art metadata passed the three media tests.
- 13 browser tests passed, including route accessibility scans, all-card visual coverage, category navigation, disclosure, image loading, keyboard/mobile flow and disabled community routes.
- Lint passed with the existing 16 legacy warnings and no errors.
- Desktop homepage and 375px mobile card screenshots visually inspected; original/category assets visually reviewed.
- A test selector was corrected to wait for detail navigation and target the exact AI heading; the full browser suite then passed.
- Existing removed sample review returns the expected 404; Next logs its previously documented NoFallbackError during that test.

## Production

Published at https://accessibility-omega-ten.vercel.app.

- Source commit: `33262efa0624a4fea5276990bb2b6d412e576f8f`.
- Final production deployment: `dpl_DEWAVZPCEQLafLFTrBqeBbvTnaE4`, READY.
- Deployment URL: https://accessibility-eyfw1lr8m-brad-eilermans-projects.vercel.app.
- First deployment served the new images/components but stale CSS. Inspection confirmed absent category-art and grid selectors. Rebuilt with `--force` (without build cache); final live CSS and computed five-column category grid / card margins verified.
- All 32 listing images decoded in the production browser: 15 real venue photos and 17 labeled category-art appearances.
- All 20 selected photo/art files returned HTTP 200 and matched local bytes. All 32 detail routes returned HTTP 200 with a visual.
- All five category links led to populated filtered results; live Chrome navigation confirmed the transportation filter and AI labels.
- Final desktop homepage and 375px mobile airport-card screenshots inspected. No horizontal overflow or browser page errors.
- Bounded final deployment error-log query (10 minutes) returned no logs. This is a release-window observation, not continuous monitoring.
- Previous complete photo-release rollback: `dpl_FYxWKHwxr1wr5ZqmB5BGcDubjWMy`.

