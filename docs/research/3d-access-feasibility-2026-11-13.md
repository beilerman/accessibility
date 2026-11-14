# 3D access models: feasibility and first pilot

Research checked November 13, 2026. **Draft research, not a deployed feature or a measured venue model.** The existing hourly venue/photo research continues separately. No account purchase, venue contact, physical capture or model export was performed.

## Recommendation

Use existing owner-published 3D tours first, with separate, sourced access notes. Then pilot a small model captured with venue permission and checked against physical measurements. Focus on the arrival-to-seat/toilet route rather than a decorative whole-building model. This is an editorial recommendation, not evidence that a particular route is usable.

| Approach | What it can add | Evidence needed before access claims |
|---|---|---|
| Link an existing hosted 3D tour | Explore room connections and different levels immediately | Correct venue identity, inspected coverage, capture date if known, specific gaps, current official route information |
| Build a model from a scan or coordinated photos | Put route landmarks and measured features in a consistent spatial frame | Capture/reuse permission, continuous route coverage, known scale, independent feature measurements and dated review |
| Create an illustrative or AI-assisted model | Explain a concept or show a proposed representation | Prominent illustration label; no invented dimensions, hidden route connections or claims about the actual venue |

A 360° panorama is a view from a camera position. A spatial model can represent geometry and connections between positions. Keep those types distinct. A model that looks convincing is not a clearance survey.

## Public tours found and inspected

- **Memorial Hall:** its [official virtual-tour page](https://www.memorialhallotr.com/virtual-tour/) embeds [Matterport model xTksdbypnot](https://my.matterport.com/show/?m=xTksdbypnot). The browser rendered a multi-level dollhouse and photographic view thumbnails; the floor selector opened and displayed labels Floor 1–4. Those are viewer labels, not independently mapped building floors. Presenter: Oval Room Group. The tour does not establish a current working lift or complete street-level accessible entrance route. First candidate for a hosted-tour pilot.
- **Fort Thomas Coffee:** [House Rules](https://fortthomascoffee.com/house-rules) embeds [model hZqLJd3d9kk](https://my.matterport.com/show/?m=hZqLJd3d9kk). The inspected view shows varied seating, tables/counter, floor areas and navigation points. Incidental patrons appear, so link the original instead of republishing frames. The complete entrance/restroom route, capture date and measurement accuracy remain unverified. Suitable everyday-venue comparison for the pilot.
- **The Transept:** its [own tour page](https://thetransept.com/virtual-tour/) embeds [model 67pFqzXDrx6](https://my.matterport.com/show/?m=67pFqzXDrx6). The viewer rendered the entrance doors and photographic room/stair thumbnails, plus a dollhouse control. Presenter: Oval Room Group. This is a new venue lead, not an imported listing or a verified step-free route. The legacy caterer page contains a broad amenities list whose selected state was not established; do not import every text label as a venue amenity.
- **The Spot on West Fifth:** its [official homepage](https://spotonwestfifth.com/) links to a [Threshold 360 tour](https://map.threshold360.com/8454068). The browser rendered a street-side panorama and navigation/Spaces controls. Classify it as a panorama-tour lead; a downloadable geometric model was not established. Threshold 360 is an external service, separate from this Threshold project.

All four public viewers rendered in the test browser using software WebGL. Initial default-headless Matterport attempts showed an unsupported-WebGL message. This is a useful reminder to retain a normal text/photo route when 3D rendering fails. Capture dates, complete coverage, third-party keyboard/screen-reader usability, export licenses and embedded-view permission were not established. No complete access route was traced.

## Practical construction route

Apple's [RoomPlan](https://developer.apple.com/augmented-reality/roomplan/) uses camera/LiDAR input on supported devices and can export a parametric room representation with dimensions in USD/USDZ. This is a feasible capture route, not a guarantee that a small threshold or door clearance is accurately resolved. Its [multi-room documentation](https://developer.apple.com/documentation/roomplan/scanning-the-rooms-of-a-single-structure) describes combining room capture into a structure.

For photogrammetry, plan a coordinated, overlapping image set and a known scale. RealityScan's [scaling documentation](https://rshelp.capturingreality.com/en-US/tutorials/scaling.htm) explains distance constraints and control points; scattered web photographs should not be treated as a measured reconstruction dataset. Record units, coordinate frame, holes, interpolation and observed error. Keep any model cleanup from silently removing a real barrier.

For a later self-hosted viewer, [model-viewer](https://modelviewer.dev/examples/annotations/) supports interactive HTML hotspots, including camera viewpoints. Start with an owned/licensed GLB asset, source-linked annotations and a reset-view control. USDZ capture output needs a conversion/quality check before a GLB web workflow; a file extension alone does not establish preserved scale.

Matterport's [Embed SDK](https://developers.matterport.com/embed-sdk/) and [platform overview](https://developers.matterport.com/overview/) provide a potential hosted integration. SDK-based work needs a key and appropriate access. Public viewing has not established permission to download or rehost geometry. Linking the official source is the immediate option; do not extract a third party's mesh or panorama set.

## First pilot acceptance criteria

1. Select one venue and one bounded route, with capture/publication permission established for any new material. No outreach has been sent.
2. Identify arrival point, actual entrance, stairs/lift, seat/rest point and relevant toilet. Leave unseen connections visibly unresolved.
3. For any published measurement, retain the measured feature/endpoints, method, units, date, reviewer and uncertainty. Compare with independent physical checks; a model ruler is not enough. No automated wheelchair-fit or compliance claim.
4. Publish a dated model description and accessible text/2D alternative. Use click-to-load, keyboard-operable controls and a reset view; check mobile performance and reduced-motion behavior. Test the selected third-party viewer rather than assuming its accessibility.
5. Keep source facts, scan geometry, independent measurements and illustrations in distinct records. Mark furniture/event layouts as time-dependent. Flag stale scans instead of treating them as today's condition.

The paired candidate JSON retains public source/model links and inspection limits. A research-only maintenance instruction is prepared on this branch for later integration; the active scheduled pass was left undisturbed. Production deployment remains capped at two per Eastern day.
