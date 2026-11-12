# Civic services, indoor swimming and Florence shopping — November 12, 2026

Prepared in the dedicated automation workspace from publication base
`a0f29e5cdcd4fc69629ce45885d116619ea8ad7a`. All retained edits from handoff
sections 27–28 were reviewed and preserved. There were no conflict markers.
The previous `latest.json` phase and summary were read. A fresh public GitHub
Source monitor issue search returned no open issues. No Git writes, pushes,
deployment, preview, messages, private correspondence, database or administrative
changes were performed. The runner owns final validation and publication writes.

## New public information and coverage

This pass adds **three venues and 30 notes**, investigating City Hall, Mt. Auburn,
Independence library and Sam’s Club Florence in depth. Additional food and
courthouse leads remain held rather than being counted as new coverage.

- **Cincinnati City Hall: nine notes.** DOTE’s fourth-floor elevator and hallway
  directions; office and building hours; floor-by-floor service orientation;
  citywide communication-aid requests and three-to-five-business-day notice;
  remote council registration, written comments and in-person registration;
  tour duration and two-week booking notice. The welcome page opens the building
  at 8:30 a.m., while DOTE gives its office an 8 a.m. start. Both are retained;
  early entry needs confirmation. Neither the elevator statement nor the photo
  identifies a current step-free street doorway or confirms lift operation.
- **Mt. Auburn Indoor Pool: six notes.** CRC’s indoor/year-round/warm-water
  description; twelve-month pool membership and program requirements; seasonal
  timetable links; pool, Aquatics Office and weather telephone numbers; and
  systemwide inclusion requests covering adaptive equipment, personal assistance
  and communication tools. These are procedures, not a local lift or transfer
  inventory. Water temperature, parking-to-water continuity, toilets and changing
  equipment remain unknown. Year-round does not guarantee daily opening.
- **Sam’s Club Florence: nine notes.** The current local page identifies the
  Houston Road club and shopping hours, curbside pickup and grocery delivery.
  Separate U.S. chain policies cover motorized carts, limited-to-some-clubs manual
  wheelchairs, Membership Desk shopping/loading help, app-based curbside check-in,
  order/ID requirements, an additional pickup person, delayed-order escalation and
  the 24-hour hold, plus the TTY/TDD page’s stated telephone-line gap and daily
  live-chat support hours (7 a.m.–11 p.m. Central). This is chain support, not
  a confirmed Florence curbside check-in alternative. The FAQ directs a customer waiting over ten minutes to go
  inside; this barrier remains explicit. Equipment count, collection point, device
  fit, phone-only check-in and actual bay/door/toilet layouts remain unknown.
  Plus-member early entry is not described as a sensory session, and pickup hours
  are kept separate from shopping hours.
- **Independence library: six depth notes.** November closures; named drive-through
  pickup and return service and its hours; the telescope exception requiring entry;
  the three-day ready-hold window and notifications; collection by family members
  with the card number; and district homebound eligibility. The district FAQ names
  Independence, Covington and Erlanger, but also has an older “all three” wording;
  no drive-through claim was transferred to Latonia. The branch lists a November 13
  staff-development closure while advertising a used-book sale that day. Confirm
  event admission instead of assuming ordinary library services will operate.

**Arrival-source correction:** Mt. Auburn’s current printed address and CRC facility
register identify **2034 Young Street, 45219**, but the HTML iframe map URL names
**5545 Belmont Avenue, 45224**. A second fresh HTML fetch confirmed that attribute;
it was entity-decoded and percent-decoded without executing page scripts. The
listing’s limitations explain the mismatch. This is not a visually inspected map
or a finding about the current route. Because the text-only quote normalizer drops
iframe attributes, the raw URL and interpretation are retained separately in the
evidence file instead of manufacturing a quoted fact.

Independence’s limitations were also corrected to acknowledge its published
family-assisted restrooms while leaving layouts and adult-changing equipment
unknown. There are **no revisions or retirements of existing fact text this pass**.

## Freshness and retained progress

All **four old Independence notes** were confirmed from fresh branch and homebound
pages, preserving IDs and prior history. Its full-review date advances to November
12. This is **one additional full venue recheck**, no new partial review, taking
the documented week to **27/8**. New-venue initial reviews are counted separately.

Including the retained sections 27–28 work, the prepared delta from the publication
base is **nine new venues, 102 new notes, four revised old notes, seven full existing
venue rechecks and one partial review**. The full reviews cover Bogart’s, Main
Library, Covington library, Winton, Burnet, Licking River and Independence library.
Forty-two prior notes were reviewed: 38 confirmed and four revised. Central Park’s
one-note partial review keeps its November 8 full-review date. AMC’s six held notes
and full-review date remain unchanged. Old IDs, history prefixes, unselected quotes,
media and monitor records/findings were checked against the publication base.

## Photographs and original guides

**This pass:** one newly collected licensed full-frame photograph and one guide
entry for an already linked document.

- City Hall’s March 10, 2019 doorway view by **Warren LeMay, CC0**, shows sidewalk
  steps continuing through the recessed doorway toward the glass doors, with a
  central handrail and the 801 address. Source frame and final WebP were inspected.
  It shows a barrier, not an alternative entrance. Capture date, author, original
  source, licence and current limits are retained. The same final bytes provide
  the venue context image; that second use is not a second capture.
- Page **17** of the Clerk’s September 2026 general-election pictorial shows
  Independence library’s entrance frontage, paved forecourt and bollards next to
  a circular meeting-room plan. The text places parking/main entrance behind the
  building. Cover and page 17 were rendered and inspected; the original **34-page,
  6,915,159-byte** PDF was freshly fetched, matching the earlier document hash.
  Photo capture date is unknown. The new card is explicitly election-specific,
  not a current daily-access walkthrough or a future voting instruction. No guide
  photographs were republished.

All **eight pending access-photo entries** had their current Commons licences and
capture dates fetched again. Original-to-output aspect ratios confirmed full-frame
resizing. The retained guide documents were freshly fetched and relevant pages
rendered/inspected. Combined pending media is **eight access entries: seven newly
collected captures and one existing Covington capture reused**, plus **four guide
entries covering two newly linked distinct documents**. Totals are **24 access
photos, 14 guide entries and eleven distinct guide documents**.

The Recreation & fitness category lacked an illustration fallback because its
previous sole listing had a real photograph. The new pool reproduced the existing
media test failure. A small generic SVG of a ball, dumbbell and goggles now fills
that category, following the existing shopping/food illustration convention. Its
render was visually inspected; it is labelled AI artwork and depicts no facility,
entrance, pool entry or access features. This is not an access photograph. No
Next.js framework code or hosting/image settings changed; installed Image docs
confirm the existing automatic unoptimized handling of `.svg` sources.

## Source-fetch repair

Python rejected certificate chains on several official help/court sources while
normal system curl, with certificate verification enabled, loaded them. The source
monitor now retries **only certificate-verification errors** using verified system
curl. HTTP 403/429 blocks are not retried. HTTPS-only redirects, a download limit,
timeout and disabled curl configuration files keep the fallback bounded. A second
TLS error or missing curl leaves the source unavailable. Final-response timestamps
are not inherited from a redirect. Fingerprinting and quote normalization did not
change, so fingerprint version six and unselected baselines are retained.

**Six regression cases** cover successful verified retrieval and quote/hash parity,
redirect timestamps, original/fallback HTTP blocks, missing curl/second TLS failure,
and other network errors. The three selected Sam’s Club help pages were then freshly
fetched and checked through this exact monitor path. No certificate warning was
bypassed and no bot-protection refusal was converted into confirmation.

## Held findings and next concrete batch

See `civic-pool-library-2026-11-12-holds.json` and the media receipt.

- City Hall’s Ninth Street entrance remains a secondary-source lead. No current
  official doorway instruction was established. Do not transfer 805 Central Avenue
  facilities, other cities’ halls or old security proposals to 801 Plum Street.
- Mt. Auburn’s official page links two photographs, including a chair-named image.
  No reuse licence was established, so no photograph was downloaded/imported. The
  image could not be visually inspected through available browser tools. Do not
  infer lift model, transfer procedure or operation from the filename. The fall
  and December schedule PDFs were text-reviewed, but their mixed/expired adapted
  session dates were not promoted into current program availability.
- MRBL owner pages confirm location, current hours and music listings, and link
  OpenTable. The indexed west-side glass-elevator instruction could not be matched
  by direct fetch. No listing or route claim was added. New Riff and Mad Mike’s
  official pages returned direct-fetch 403; no location/access claims imported.
  New Riff’s six Commons results identify West Campus, not the prospective visitor
  destination; none were transferred or downloaded.
- Hamilton County Courts’ parking page loaded with ordinary verified curl after
  Python’s TLS failure. Its queue/parking information is a useful next batch, but
  no complete entrance/accommodation/imagery review was finished and no listing
  added. Avoid unofficial court-record aggregators and similarly named counties.
- Sam’s Club’s older linked pickup article redirects to a script shell; the guessed
  older help URL yields an error page. The working 3980 FAQ was used. No matched
  reusable Florence access image or photo guide was found. Costco Florence’s
  official page was read as a lead; no physical access evidence established and
  no Canadian policy transferred.

**Next:** resolve Mt. Auburn’s map/arrival discrepancy with current venue-origin
instructions, find permitted imagery of actual pool entry/changing facilities and
confirm adapted-session dates; identify City Hall’s current street doorway and
security/queue assistance; establish Sam’s Club’s bay/check-in fallback and device
collection/return steps; clarify Independence’s November 13 event-only services,
rear-door controls and family-restroom layout. A following courthouse batch can
use the repaired verified-TLS path for a complete source and image review. Retain
all earlier Government Center, UC, Dunham, Central Park, Winton, outlet, grocery and
food-route gaps in the coverage queue.

## Validation and publication boundary

Final receipt: `civic-pool-library-2026-11-12-validation.json`.

- **220 fresh quote/address/support checks across 58 official source pages**, zero
  misses, plus the separately documented fresh iframe-attribute check.
- **66 unit tests, 54 pipeline tests, types, lint and production build pass.**
- **39 final-build HTTP checks** verify every active note and limitation at all
  seventeen touched/new venues, six category/region filters, public media/source/
  update/home pages, the eight access assets, three context assets and category SVG.
- New source baselines return HTTP 200. No new attention findings or missing quotes;
  unselected source findings and records are preserved. Whitespace/conflict-marker
  checks and append-only/preservation checks pass.
- **106 browser tests are listed, not passed.** The targeted City Hall route test
  fails before navigation: macOS denies Chromium Mach-port registration (1100).
  CUA’s browser host is unavailable. No rendered-site screenshot, full browser pass,
  live-site verification or full accessibility audit is claimed. The runner must
  complete browser validation before its atomic Git pushes. Only the scheduled
  release job deploys.

Prepared totals: **123 venues, 1,024 active notes, 564 stored supporting quotes,
24 access photos and 14 guide entries/eleven distinct documents**. This report
supersedes the prior combined validation receipt for the final pending state;
previous per-pass receipts remain as dated records.
