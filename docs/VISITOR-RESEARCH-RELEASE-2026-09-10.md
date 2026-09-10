# Accessibility visitor reports and expanded photography

## Result

Seventeen selected public reports cover 12 of Threshold's 32 venues: eight firsthand reviews, six community comments and three reported experiences. The collection is distinct from the 106 official-source accessibility notes. A searchable `/visitor-reports` page supports place/experience text, region and topic filters. Each venue page shows its relevant reports beneath official information, and listing cards link to available reports.

Five additional licensed photographs replace category art for CVG, Sharon Woods, Miami Whitewater Forest, Cincinnati Nature Center's Rowe Woods and Northern Kentucky Convention Center. The directory now has 20 real-photo listings and 12 clearly labeled AI-art fallbacks. Existing educational AI examples remain unchanged.

## Findings and scope

Research covered all 15 Kentucky and 17 Ohio listings. Evidence includes wheelchair display visibility and theater navigation, tactile interpretation, sensory support, crowding, staff assistance, campground surfaces and wayfinding. These observations are specific to the author, date, event and route; they are not universal accessibility judgments. Reports contain explicit attribution, source links, known publication dates, unknown or known visit dates, and context. No aggregate scores, fictional reviews, copied reviewer photos, private conversations, personal profiles or inferred diagnoses were added.

The strongest sources include the [Even Grounds touch-tour account](https://evengrounds.com/touch-tour-in-the-cincinnati-art-museum/), [Creation Museum wheelchair account](https://www.sallymatheny.com/story/family/family-entertainment/creation-museum-family-trip-2021-review/), and [UK's report of wheelchair users' CVG panel](https://research.uky.edu/news/during-busy-holiday-travel-season-uk-cvg-focus-on-air-travel-accessibility). Reported difficulties are retained with age and scope qualifications; promotional and institutional contexts remain visible. Current zoo guidance clarifies that the Access Pass preserves waiting duration and calming rooms need staff access.

Twenty venues have no selected public report in this bounded search. That gap is displayed as unknown. A historical Big Bone field guide and an undated zoo childhood recollection were archived as follow-up leads. Duplicated or machine-written review summaries, wrong-venue matches and unreadable snippets were excluded. Complete source inventories, venue-by-venue search coverage and deferred leads are in the research files below.

## Research records

- [Northern Kentucky reviews and exclusions](research/visitor-research-ky.md)
- [Ohio reviews and exclusions](research/visitor-research-oh.md)
- [Sensory, communication and wayfinding reports](research/visitor-research-specialist.md)
- [Additional photos: licenses, full-frame inspection and deferred leads](research/photos-next.md)
- [Archived historical review candidates](research/visitor-reports-archive.json)

Original images were inspected full-size. Downloaded web assets retain full frames, linked licenses and source titles. Scheben, MegaCorp and arena image originals were throttled, so metadata-only candidates were not published. The convention-center image visibly shows stairs; its caption explicitly says it does not locate a step-free entrance. No access dimensions were inferred from photos.

## Validation and release

Local: 27 unit tests passed; final data contract checks passed. Build and TypeScript passed. Fifteen browser tests passed, including automated accessibility scans, review filtering/source links, date uncertainty, venue navigation, image disclosure/loading and mobile layout. Lint has no errors and the same 16 legacy warnings. Desktop and mobile report layouts visually inspected. Independent agent review checked specialist source summaries and the report presentation; publication dates for Reddit comments were verified from matched comment IDs and timestamps.

Production verification pending.
