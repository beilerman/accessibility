# Photo release — September 10, 2026

The user approved publication of the catalog and requested internet photographs plus accurately depicted, subtly labeled AI access images. The original approved catalog reached production as `dpl_H5whfMQDvD5oh6YaBfDMgekxoKg5` at https://accessibility-omega-ten.vercel.app. HTTP 200 and Chrome confirmed the Threshold catalog with 32 places/106 facts.

## Photo update

- Nine actual venue photographs: Newport Aquarium, Carnegie, Creation Museum, BB Riverboats, Cincinnati Art Museum, Cincinnati Museum Center, Music Hall, Taft Museum and Freedom Center.
- Each photo has author, source and reuse-license links, capture date where known, and conversion/full-frame notice. Images date from 2007–2024; Freedom Center's exact date is uncertain.
- Three original AI illustrations: entrance, sensory kit, rest corner. All visible uses show **AI illustration — example setting**, retain descriptive alt text and present specific limitations. They do not depict actual catalog venues.
- New `/access-in-pictures` page explains visible features and questions for the venue, linked to official Access Board/NPS guidance.
- Home, directory, venue pages and source register integrate the images; no invented measurements, access claims or reviews were added.

## Evidence and limits

Research records: [Kentucky](research/photos-ky.md), [Ohio](research/photos-oh.md), [AI prompts/origin/review](research/ai-illustrations.md). Originals retained in ignored local staging/output folders. Published versions are local WebP files with full frames retained.

`npm test`: 24 passed across 5 files. `npm run lint`: 0 errors, 16 legacy warnings. `npm run build`:passed with 47 generated pages including 32 place pages. `npm run test:e2e`: 12 passed, including image decoding, photo credits, AI label visibility, source links, mobile/keyboard and automated accessibility checks. Build includes TypeScript validation. Browser page-error capture was empty for the new home, venue and guide routes.

One framework `Internal: NoFallbackError` log occurred during the removed sample-review URL test; its HTTP response remained the expected 404 and all browser tests passed. No error appeared on image-bearing public routes. Automated scans are not a comprehensive assistive-technology audit.

Rendered desktop home/Newport detail and 375 px mobile guide were visually inspected. An initial full-page screenshot captured smooth scrolling in flight; the capture was repeated with reduced motion and confirmed the stable layout and loaded imagery. Evidence screenshots are in `/tmp/threshold-qa/photos-*.png`.

## Deployment

Production URL: https://accessibility-omega-ten.vercel.app

Visual guide: https://accessibility-omega-ten.vercel.app/access-in-pictures

Source commit: `3dfd8ede5c941f9a89d4c6aef48ba69ac6f544da`. Deployment: `dpl_FYxWKHwxr1wr5ZqmB5BGcDubjWMy`, production READY, 16-second remote build; production alias assigned.

Live checks: all 12 image files returned 200 with SHA-256 hashes identical to local assets. Home, Newport detail, visual guide and source register returned 200; every image in those browser flows decoded successfully. Browser page-error capture was empty. Chrome navigation from home to the visual guide visibly confirmed all 3 AI disclosure labels and explanatory text. Machine-readable evidence: [photos-live-verification.json](photos-live-verification.json). Rollback target for this photo update is the already sourced catalog `dpl_H5whfMQDvD5oh6YaBfDMgekxoKg5`; it contains no new imagery.

Post-deployment log query: `vercel logs --deployment dpl_FYxWKHwxr1wr5ZqmB5BGcDubjWMy --level error --since 10m` returned no logs. This is a bounded error query, not continuous monitoring. No observability integrations were added.
