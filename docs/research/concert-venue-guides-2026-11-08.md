# Riverbend and Bogart’s: reviewed public-source guides

Reviewed November 8, 2026. This is a source review, not a venue inspection, an
organization verification, a current equipment-status check, or an access rating.
The guides add 19 source-linked notes to the public catalog. No private
correspondence, contributor identity, or unapproved first-hand account is included.

## Riverbend Music Center

Route: `/venues/riverbend-music-center`

### Practical plan

- Request accessible seating when purchasing through Ticketmaster or the box
  office. Seating is sold on a best-available basis. Existing ticketholders are
  directed to Customer Service near the main gate, but should confirm needs
  beforehand rather than depend on same-day reseating.
- The FAQ distinguishes up to three companions with advance accessible-ticket
  purchases from one companion for on-site reseating.
- Accessible parking is listed in all lots; Gate 2 is recommended for the
  closest spaces. Follow attendants. Parking is included with tickets and lots
  usually open two hours before doors, subject to the event page.
- Drop-off is described at the Gate 2 Kellogg Avenue pull-off. Rideshare pickup
  is in Lot 9 across from Gate 2. **Private-driver pickup needs confirmation:**
  the FAQ’s drop-off answer says Lot 9, while its separate pickup answer says
  the Gate 2 pull-off. Do not silently choose one.
- Request hearing-related or vision-related seating when buying. Request a
  sign-language interpreter at least three weeks ahead at info@riverbend.org;
  availability is conditional. General assistance: 513-232-5882.
- No re-entry. Medically necessary bag exceptions may be available, with
  inspection; confirm essential arrangements in advance.

### What remains unverified

Available seats and companion places for a specific show; sightlines;
entrance-to-seat route, distances and gradients; restroom features; parking
eligibility; wheelchair assistance; assistive listening; quiet spaces; and the
correct private-pickup plan. These are questions, not findings of inaccessibility.

### Source ledger

All three official pages loaded successfully and their substantive text was
read on November 8, 2026. No publisher update date or observation date was
established, so those fields remain null.

- [Accessibility](https://riverbend.org/venue-information/accessibility):
  purchasing, best-available seats, existing-ticket Customer Service route,
  hearing/vision seating, interpreter deadline and email, assistance phone.
  Supports `mobility.1`, `sensory.1–2`, and `cognitive.2`.
- [FAQ](https://riverbend.org/venue-info/faq): accessible seating answer and
  companion distinction; separate drop-off, pickup and rideshare answers;
  prohibited-item/medical-bag exception; no re-entry. Supports `mobility.2`,
  `mobility.4`, and `chronic.1`.
- [Directions & parking](https://riverbend.org/plan-your-visit/directions-parking):
  street address, parking inclusion and timing, accessible parking and Gate 2.
  Supports `mobility.3` and `cognitive.1`.

## Bogart’s

Route: `/venues/bogarts`

### Practical plan

- The venue says accessible tickets are available through Live Nation but are
  not required to use its accessible section. Contact the venue if tickets are
  already purchased. **This is not a guarantee of capacity or companion seats.**
- The FAQ puts accessible seats on the mezzanine and describes a wheelchair
  elevator **from the mezzanine to the main floor**. It explicitly says there
  is no elevator to the upstairs level. Confirm the exact level, full route,
  lift dimensions and operation for the show; do not infer a step-free route
  to every level from the word “elevator.”
- The Great Bands Entrance is listed as accessible. Drop-off is described at
  Corey and Short Vine or at the crosswalk in front. Ask staff which curbside
  point to use. Bogart’s operates no parking lot; confirm nearby accessible
  spaces and the route separately.
- Ask Guest Services on arrival for an assistive listening device. An ID is
  held at the box office during the loan. Request sign-language interpretation
  at least two weeks ahead, with ticket type and number needing interpretation;
  availability is conditional.
- Most events have general-admission standing/seating on a first-come basis.
  Confirm the specific event’s seating and accommodations. Accessibility
  contact: 513-872-8801 or BogartsBoxOffice@livenation.com.
- An accessible restroom is listed on the mezzanine, with dimensions and
  route unverified. No re-entry; the venue cannot store medication. Check the
  complete medication and bag policies before attending.

### What remains unverified

Accessible-section capacity, reservation process and companions; the complete
entrance-to-mezzanine route; lift dimensions and operating status; restroom
features; nearby accessible parking; show-specific sightlines; quiet spaces,
sensory kits and low-stimulation options. None is treated as a negative finding.

### Source ledger

Both official pages loaded successfully and their substantive text was read
on November 8, 2026. No publisher update date or observation date was
established, so those fields remain null.

- [Accessibility](https://www.bogarts.com/accessibility): accessible-ticket
  policy, entrance/drop-off, listening devices and ID, interpreter deadline,
  accessible restroom, accessibility phone/email and street address.
  Supports `mobility.1`, `mobility.3`, `sensory.1–2`, `cognitive.2`, `chronic.1`.
- [Plan your visit / FAQ](https://www.bogarts.com/visit): no venue parking,
  general admission, mezzanine/main-floor wheelchair elevator versus no
  upstairs elevator, no in-and-outs, medication storage/policy.
  Supports `mobility.2`, `mobility.4`, `cognitive.1`, `chronic.2`.

## Evidence and review rules

- Each catalog note links to the relevant venue page, records the actual
  retrieval date, and retains an append-only addition history.
- Official descriptions are attributed as such. Website availability is not
  evidence of current lift operation, actual seating capacity, or a successful
  accessible visit.
- The guides contain no first-hand reports. Historical experience remains
  separate from current public information. Future contributions need a
  permission-cleared account, visit date (or explicit uncertainty), specific
  route/show context and a separate source label before inclusion.
- Recheck the official pages and event-specific arrangements before relying
  on a guide for travel. Resolve the Riverbend pickup conflict before replacing
  the caution with a single instruction.

## Implementation verification

The additions use the existing searchable venue pages, source-history display,
limits panel and explicit gap for missing visitor reports. No database or
community-permission changes are needed. The catalog now contains 34 places
and 125 public-source notes.

- Independent content review found all 19 new notes supported by the linked
  official sources, with no private account or field-audit claim included.
- Unit tests: 33 passed across 7 files, including source provenance and the
  important companion/elevator/capacity qualifications.
- Lint: no errors; the same 16 pre-existing warnings as the baseline.
- Production build: passed, including both static venue routes.
- Pipeline unit tests: 16 passed.
- Browser tests: 19 passed, including both venue routes, automated WCAG
  A/AA checks, mobile dark mode, sources, cautions and search navigation.
  Automated checks do not establish complete WCAG compliance.
- Work was isolated from the original checkout’s unrelated uncommitted edits.
  These checks are local and do not establish production deployment.
