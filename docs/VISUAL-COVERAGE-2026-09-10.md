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

Pending deployment and live verification.
