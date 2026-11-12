# Broad and deep evening research — November 11, 2026

Prepared in the dedicated automation workspace from publication base
`d1c36932f2d03e4f52a980462f6662f36ad2c1e4`. The workspace began clean: no unfinished
edits or conflict markers. The previous latest.json summary described the completed
Cold Spring batch; its current phase was researching. No Git writes, deployments,
scheduler changes, messages, private correspondence or database access performed.
An open GitHub Source monitor issue search returned no issues.

## Public information and new coverage

Three successive batches investigated eight venues, following the coverage queue.
All claims describe published information, not a visit or equipment-operation check.

| New venue | Category | New notes | Evidence scope |
| --- | --- | ---: | --- |
| Price Hill Branch Library | Libraries | 6 | Mobility-aid description, designated quiet areas, Spanish signage, curbside listing, branch contact and library-system accommodation contact |
| LeBlond Recreation Center | Parks & outdoors | 9 | Paved river path, playground/workout equipment description, sensory garden, center contact, membership and CRC accommodation-request process |
| Walmart Supercenter — Fort Wright | Shopping | 7 | Local sensory-hours schedule and grocery pickup/delivery; separately attributed U.S. cart, Aira and Sorenson policies |

Location evidence was freshly verified before import:

- Price Hill: 970 Purcell Avenue, Cincinnati, Ohio 45205 on the
  [branch page](https://chpl.org/locations/pr/). The 2012 Commons description uses
  an older Warsaw Avenue address; it was not substituted for the current address.
- LeBlond: 2335 Riverside Dr., Cincinnati, OH 45202 on the
  [CRC facility page](https://www.cincinnati-oh.gov/crc/find-a-facility/recreation-center/leblond/).
- Walmart: 3450 Valley Plaza Pkwy, Ft Wright, KY 41017 on the
  [store 2967 page](https://www.walmart.com/store/2967-ft-wright-ky).
  Fort Wright is the catalog city spelling; the source abbreviates it Ft Wright.

Branch/system scope is explicit. No branch-specific entrance, parking connection,
restroom measurements, quiet-room conditions or equipment collection point was
inferred from a general policy. LeBlond's sensory garden is not labeled a quiet
space. Walmart's lights are lowered only where possible; its program is not a
promise of silence or a field observation at this store.

Fifteen further new notes deepen existing listings:

- Ault (2): temporary restroom in the repair notice; the picnic shelter's lack of
  nearby restrooms/electricity/grills. Preserve the April–October restroom season
  beside the undated repair notice's alternatives. November availability is unknown.
- Jungle Jim's Fairfield (2): separately sourced service-animal policy; published
  maze-like layout and animatronics, without inferring noise levels or quiet hours.
- Bettman (1): listed nature-center restrooms are not proof of entry during the
  building closure. Its appointment offer and programming-only notice conflict.
- Big Bone Lick (2): explicit campground pool closure despite generic pool listings;
  Gobbler's Trace's 62 cedar stairs and 0.6-mile card versus 0.5-mile summary.
  The JSON record's title was checked: the stair warning belongs to **Gobbler's
  Trace**, not Cedar Run. No sitewide Kentucky alert was assigned to this park
  merely because it appeared in shared page data.
- CVG (8): elevators between concourse escalators, central Terminal elevator after
  the tunnel exit, published Concourse B distance/train estimates, sound/light
  features in the children's sensory room, Braille/raised numbers in elevators,
  and the in-person ASL request email. Two further notes give Sunflower lanyard
  pickup/postal-request steps and the explicit absence of expedited screening.
  A sensory-room label does not imply silence.

Eight existing notes were revised with their IDs and earlier history retained:
Jungle Jim's chronic.1; Bettman mobility.1/cognitive.1; Big Bone Lick
mobility.3/cognitive.1; CVG mobility.2/mobility.3/chronic.2. Changes add attribution,
preserve source conflicts, supply winter museum hours and Bison Trace's gravel/grade
warning, locate family restrooms after security, describe wheelchair pickup/phone,
and limit outdoor service-animal-area re-screening to departing passengers.

## Freshness and evidence review

All **30 prior notes** at Ault (4), Jungle Jim's (4), Bettman (3), Big Bone Lick (7)
and CVG (12) received a complete source review: 22 confirmed and eight revised.
Only these five existing listings advance checked_at. Three new listings are dated
November 11. No partial existing-venue review was counted as full.

Weekly progress is **9/8 full reviews**: Brady, Newport Aquarium, Ark, Aronoff,
Ault, Jungle Jim's, Bettman, Big Bone Lick and CVG. AMC's prior partial status and
six held notes are unchanged. Bogart's and other older listings remain future
rolling candidates; the weekly target does not imply the whole catalog is fresh.

All **67 touched notes** (30 prior + 37 new) have stored quotes in
pipeline/evidence/quotes.json. Their passages matched another fresh official fetch
with scripts/research/verify.py: 67 matching checks across the final batch and two
additional lanyard checks, zero failed. Earlier preparation also
checked each new address and supplemental clauses outside a note's primary stored
passage. These include Bettman's six-acre trail description, Big Bone Creek's start
behind the visitor center, Discovery Trail hours, campground facilities, and both
CVG concourse departure sections. The identical elevator-direction sentence occurs
in both the Concourse A and B sections; a repeated phrase alone was not used to
assign a location.

Source monitor: **22 URLs fetched, all HTTP 200, zero new attention findings**.
All new venue citations have source baselines. Prior unselected source baselines,
findings and missing-quote records are preserved. Every pre-existing quote entry,
venue ID and history prefix remains intact; unrelated venue records are unchanged.

## Collection/monitor fixes

Fresh CRC and Cincinnati Parks HTML contains public text inside encoded Mura
`data-source` attributes. The monitor previously fingerprinted a navigation shell
and missed those facility details. It now extracts text blocks marked
`data-object="text"`, while continuing to ignore navigation and nontext map
configuration. Fingerprint version advances from five to six. Earlier unselected
version-five baselines remain; this is not a catalog-wide source review.

Kentucky's page encodes paragraph breaks inside JSON strings. Quote matching now
keeps the original representation and appends decoded prose without executing any
scripts. This permits readable, exact supporting passages across those paragraph
breaks. Initial quote misses were corrected before applying the second batch.
Three regression tests cover content changes in Mura blocks, ignored chrome/config,
and JSON paragraph matching including an absent/replaced passage.

The first new Shopping listing without its own hero photo exposed the missing
Shopping category fallback. Added an abstract SVG of shopping bags using the
existing category-art convention. It is explicitly labeled AI artwork, depicts no
venue, entrance, floor, route or access feature, and was rendered/visually inspected.
It is not included in the licensed access-photo count. No framework/component or
layout code changed.

## Licensed access images

Five additions: **four photographs and one creator-made photo collage**. Reuse
licences, authors, descriptions and dates were checked with fresh Commons imageinfo
responses before downloading. Every selected full frame was visually inspected
before and after conversion. No crop, scene alteration, ground-feature editing or
synthetic access imagery. Small incidental visitors in the Ault/CVG views are not
identified; the selected CVG view avoids the more prominent faces in the tunnel
candidate. The creator's collage was not rearranged or treated as one continuous
scene.

| Image | Capture date | Author | Licence | Narrow visible feature |
| --- | --- | --- | --- | --- |
| [Ault pavilion view](https://commons.wikimedia.org/wiki/File:Ault_Pavilion_view.jpg) | 2004-09-19 | Greg Hume | CC BY-SA 4.0 | Stairs, intersecting paths and benches; no step-free pavilion alternative established |
| [Fairfield main doors](https://commons.wikimedia.org/wiki/File:Main-entrance-doors_(361870735).jpg) | 2004-07-17 | Jungle Jim's International Market | CC BY 2.0 | Glass entrance doors and mats; no door-control/width/threshold measurements |
| [Fairfield restroom facade](https://commons.wikimedia.org/wiki/File:Restrooms_porta_potty_(361911252).jpg) | 2004-12-27 | Jungle Jim's International Market | CC BY 2.0 | Novelty entrance facade and wheelchair symbols; no interior or access verdict |
| [Bison-route photo collage](https://commons.wikimedia.org/wiki/File:On_the_way_to_see_the_bison.jpg) | 2010-06-26 | Janarude | CC BY 3.0 | Right panel's short gravel path/fence; named trail and exact segment unknown |
| [CVG Concourse B](https://commons.wikimedia.org/wiki/File:Cincinnati_Airport_2025b.jpg) | 2025-11-01 | Antony-22 | CC BY-SA 4.0 | Corridor near B11/B12 and overhead restroom sign; no restroom interior/changing equipment |

The two 2004 Fairfield photographs come from the market's own Flickr collection,
with Commons licence metadata. The publication dates predate Eastgate's opening;
the location/category and entrance collection identify Fairfield. These views are
historical, not representations of current facilities. No sign or wheelchair logo
is treated as proof of physical access. Asset hashes are recorded below.

## Held imagery and guide leads

- Price Hill's 2012 photograph predates the 2021 renovation. Its indexed reopening
  tour and curbside articles returned 404 on direct fetch; no stale pickup steps
  or guide link imported. The current branch/project pages fetched successfully.
- LeBlond: no location-matched licensed access photograph or inspected official
  visual guide selected. Contractor/project photographs have no confirmed reuse
  permission and were not copied into the site.
- Big Bone Lick: seven CC0 Public Lands Institute woodland images dated April 2026
  inspected. They show woods, uneven ground or water without adequately identifying
  designated routes/arrival features. No named-trail claim made from them. The eighth
  thumbnail was rate limited and remains uninspected; large originals were not
  downloaded. The selected 2010 collage has explicit route-identity limitations.
- CVG: 2011 boarding-equipment and 2014 atrium views held for limited current route
  usefulness; the 2025 tunnel view has more prominent incidental travelers. The
  official [360-degree tour](https://www.cvgairport.com/terminal-information/airport-tour/)
  and [sensory-room photo page](https://www.cvgairport.com/on-the-horizon/cvg-airport-opens-first-sensory-room-for-children/)
  are useful next inspection leads, not newly inspected guides. Browser control was
  unavailable. No unlicensed gallery images were copied or published.
- Walmart: no location-matched reusable photo selected. A generic Walmart photo or
  another branch cannot establish this store's entrance/equipment route.
- Earlier AMC, BCM/NaturePlay, Cold Spring newsletter and Aronoff photo holds remain.

**No new linked guides.** Total prepared collection: nine access images and six
previously inspected official guide links. No PDF count, size or visual inspection
was invented for an uninspected HTML/video lead.

## Validation and publication boundary

Passed on the final content: TypeScript, lint, **47 unit tests**, **42 pipeline
tests**, production build and Git whitespace/preservation checks. The unit test
first exposed the missing Shopping fallback; it passed after the SVG was added.
The pipeline's initial missing-baseline failure was resolved by baselining the new
sources before final validation. Python checks used uv, Python 3.11 and
pipeline/requirements.txt with UV_CACHE_DIR=/tmp/threshold-uv-cache. The existing
Atkinson font-fallback warning remains.

Final Playwright attempt registered **86 tests**. Chromium failed before page load
with macOS Mach-port Permission denied (1100): one launch failure, 85 not run.
The browser-control host was also unavailable. Individual media assets were visually
inspected, but no rendered-site screenshot, browser pass or accessibility audit is
claimed. Sixteen local HTTP checks passed: eight venue pages containing every
expected note, five exact image-byte matches, the visual index, the Kentucky
Shopping filter and the SVG asset. The runner must pass its full browser validation
before Git push.

Catalog: **105 venues, 756 active notes, 219 stored supporting quotes**. This pass:
three new venues with 22 notes; 15 depth additions at existing venues; eight revised
notes; five full existing-venue reviews; zero partial reviews; four photographs and
one original photo collage; zero guide links. Prepared for the runner; no claim of
commit, push or production deployment. Next: Kenwood, Florence aquatic facilities
and Butler County RTA, with premises-specific route/equipment evidence and photos.

## Published asset SHA-256 receipts

- `public/images/access/ault-park-pavilion-steps.webp` (1280 × 894):
  `2d705a3e8bbd1532fda37d3cabe685b9b08e2169ed1636beeb0a785dae9e6bb3`
- `public/images/access/jungle-jims-fairfield-entrance.webp` (1280 × 960):
  `9484af89a1516f95bf4a47aab6f996accb4a188399f541ed195804f711f3bc78`
- `public/images/access/jungle-jims-fairfield-restroom-entrances.webp` (1280 × 960):
  `fb4ae3b1570aa078ae9c599a389f68d4073924423ce467d1eb29636c91170f16`
- `public/images/access/big-bone-lick-bison-route-collage.webp` (960 × 606):
  `0b4716ce48af1ab5ce95eb813287e155721dfc6c1df3bd0c0696ef4f57c73ad6`
- `public/images/access/cvg-concourse-b-corridor.webp` (1280 × 960):
  `8a17a2a17a5a131bcd9435d31521168bf1eb37949d51380baaaea2ef661dd84f`
