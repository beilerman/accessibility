# Community-led venue expansion — November 13, 2026

Brad requested more venues and searches of message boards, Reddit and similar
public sources. This batch adds four listings, not an accessibility rating:

| New listing | Region | Official notes | Community reports |
|---|---|---:|---:|
| Element Eatery | Cincinnati, OH | 7 | 1 |
| The Schoolhouse Restaurant | Camp Dennison, OH | 3 | 1 |
| Fretboard Brewing — Blue Ash | Blue Ash, OH | 4 | 1 |
| Wabi Sabi — Covington | Covington, KY | 3 | 1 |

## Sources and what they can establish

Read four underlying public discussions, not only their search snippets:

- [Wheelchair outing/football discussion](https://www.reddit.com/r/cincinnati/comments/18x47yt/handicapped_accessible_restaurants_football/): a participant identifying as a wheelchair user names Element Eatery, Blue Ash Fretboard and thirteen other venues. It does not supply a measured route for each venue. The same cross-venue comment is not independent corroboration for consensus.
- [Restaurant access discussion](https://www.reddit.com/r/cincinnati/comments/1dzi23v/need_help_to_find_a/): a Schoolhouse ramp recommendation is followed by a prior visitor's account of difficult table navigation and a reply agreeing it can be tight. Both the recommendation and the barrier are retained in one community summary. This does not establish a current ramp layout or usable toilet.
- [Power-wheelchair dining discussion](https://www.reddit.com/r/cincinnati/comments/1uac40u/spacioushandicap_accessible_restaurant/): Wabi Sabi, Junipers, Mitas and Element are suggested. The Wabi Sabi commenter speculates about chair/table fit and entrance steps; this is not a reported successful power-chair journey. No dimensions are inferred.
- [Covington practical-visit discussion](https://www.reddit.com/r/covington/comments/1rwfznk/check_this_out_before_going_somewhere_new_in_the/): local dining suggestions include Olla, El Ocho Loco, Tom's Papa Dino's and other venues, with order-collection, crowding and restroom-route questions. These remain discovery leads pending current source checks. Another directory's existence or claimed size is not validation, and its records were not bulk-imported.

The discovery receipt records **31 named leads: four added and 27 staged**.
Public Tripadvisor forum/review, City-Data and Disboards searches were also made.
The Tripadvisor park-forum underlying fetch failed; its search snippet was not
published as a visitor report. A Precinct restroom/entrance review is staged for
reading and current checks, not copied into the catalog. No qualified City-Data
or Disboards thread was selected. No private groups, messages or posts were used.

## Official evidence and uncertainties

All 17 official notes and four location passages passed fresh verification, and
the add helper fetched the supporting sources again before saving. Five new fact
sources were baselined, all HTTP 200. Existing source findings were preserved.
The four community summaries live separately in `visitor-reports-community.json`;
no Reddit physical-access assertion was recast as a venue-official fact.

- Element's About page supplies free garage/surface parking, open seating/group
  booking, online carryout, vendor dietary choices and event planning. Parking
  and open seating do not establish a step-free connection or chair clearances.
  Duplicate sections of the page give different café/drinks schedules; the listing
  explicitly preserves the conflict rather than selecting one as definitive.
- Schoolhouse's official pages establish its blackboard menu/family-style serving
  format, split service days/hours and separate restaurant/General Store numbers.
  The ramp and crowding accounts remain public community reports. There is no
  official ramp, toilet or measured clearance claim in its new notes.
- Fretboard's Blue Ash page supports live music, variable schedules, kitchen
  closing times and carryout/delivery. The branch is identified precisely; no
  access feature is transferred from Hamilton or another Fretboard location.
- Wabi Sabi's successfully fetched `wabisabiky.com` page supports its location,
  published hours, food-service options and requests about dietary restrictions.
  Such requests do not guarantee allergy-safe preparation. An alternate branded
  site returned HTTP 521; its different hours were not imported as current facts.

Each listing identifies the remaining physical-access unknowns. The community
accounts are historical or uncertain, not Threshold visits. The thread index dates
are described cautiously in context; exact comment publication and visit dates
remain null rather than being reconstructed from relative labels. Usernames and
unnecessary personal diagnoses were not retained; original public links preserve
the source trail. Recommendations are not guarantees for another person's chair.

## Ongoing process and next work

The maintenance prompt, decisions, coverage queue and continual-update guide now
include a recurring community-led venue-discovery lane. It balances new listings
with important corrections and photo research. Investigate multiple new venues
where evidence supports them; do not let repeated blocked-source attempts crowd
out new coverage. Preserve conflicts and source boundaries. Public forum research
does not authorize joining groups, posting questions or contacting contributors.

Next: verify Junipers/Mitas and Northern Kentucky dining leads, then Brink,
Streetside, Little Miami and Mariemont restaurants. Confirm current names/operators
for the 2024 Moerlein lead, and the exact location for an unspecified MadTree
recommendation. Keep Emery restaurant in Mariemont distinct from the Emery Theater.
Seek actual entrance, table, toilet and parking-connection photographs at all four
new venues. No new photos, AI images or guide links were added in this batch.

## Validation and release boundary

Types, lint, 104 unit tests, 79 pipeline tests, a 179-page production build and all
152 browser tests passed. Four additional mobile route checks confirmed the public
community label, original Reddit links, unknown-date wording and no horizontal
overflow or page errors. Schoolhouse's official-note area does not contain the
community ramp claim. The mobile screenshot was visually inspected. A regression
check protects this source separation. Browser results are retained beside this
report; original notes, histories, reports and media were preserved.

Prepared totals: **164 venues, 1,766 active notes plus one retired, 1,746 quoted
active notes, 20 unresolved missing passages, 83 access-photo entries and 74 visual
guide entries**. Four new community reports were added. The repository batch is
for both publication branches; no Vercel deployment, preview, hosting change,
database write or private-source action was performed. The two daily Eastern-day
production deployment cap remains unchanged.
