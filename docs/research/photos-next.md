# Additional licensed venue photographs — September 10, 2026

Five exact-venue photographs are ready in `src/data/photos-research.json`. They add five previously uncovered slugs to the 15 existing real-photo venues; parent integration would yield 20 real-photo venues and 12 category-art fallbacks. This research did not modify shared media/UI code or deploy.

## Selection and processing

Searched Wikimedia Commons file metadata/categories and web-indexed Commons/Flickr pages for all 17 missing catalog venues. Accepted only photographs with explicit reusable CC BY, CC BY-SA or CC0 licensing and exact location evidence. Public visibility alone was not treated as permission. The original photo license applies to each WebP, including share-alike obligations; it does not change the application code license. Source titles, authors, license links, capture dates and check dates are retained in the manifest; UI must keep those credits and its full-frame resize/WebP notice visible. Attribution never implies endorsement.

Every selected original JPEG was downloaded and visually inspected using `view_image` at original detail. Originals and raw Wikimedia imageinfo metadata are preserved under ignored `output/image-sources/next/`. Output WebPs preserve the complete frame, with automatic EXIF orientation, proportional resize to 1600 pixels wide (no enlargement), and WebP quality 86. No crop, retouching, generative filling or color changes. Sharp-confirmed pixel dimensions are in the manifest. Photos are dated venue context, never accessibility ratings or fresh site inspections.

## Accepted photographs

### cincinnati-northern-kentucky-international-airport-cvg

- Source: [CVG Gate B5 (2022-11-25 458am).jpg](https://commons.wikimedia.org/wiki/File:CVG_Gate_B5_%282022-11-25_458am%29.jpg)
- Photographer: IagoQnsi; license: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); capture date: 2022-11-25; verified: 2026-09-10.
- Output: `/images/venues/research-cincinnati-northern-kentucky-international-airport-cvg.webp`, 1600 × 1205.
- QA: The Commons author description and coordinates identify CVG Gate B5 (Concourse B). The original shows empty gate seating, windows, gate counter and incidental screens. It is an early-morning 2022 scene, not evidence of typical crowding, sensory conditions, assistance availability or current seating. Author attribution follows the file page: IagoQnsi.

### sharon-woods

- Source: [Sharon Woods Harbor - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Sharon_Woods_Harbor_-_panoramio.jpg)
- Photographer: Jeffery Roberts; license: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); capture date: 2015-05-02; verified: 2026-09-10.
- Output: `/images/venues/research-sharon-woods.webp`, 1600 × 1067.
- QA: Original photograph and its GPS coordinates (39.283161, -84.389870) identify Sharon Lake in Sharonville. This is not the similarly named Sharon Woods Metro Park near Columbus. Full original landscape retained rather than the separately uploaded cropped panorama. It shows lake/shoreline context; the path is not graded, measured or assessed.

### miami-whitewater-forest

- Source: [Shaker trace trail.jpeg](https://commons.wikimedia.org/wiki/File:Shaker_trace_trail.jpeg)
- Photographer: Quadell; license: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); capture date: 2013-05-12; verified: 2026-09-10.
- Output: `/images/venues/research-miami-whitewater-forest.webp`, 1600 × 1200.
- QA: The author description explicitly identifies Shaker Trace Trail at Miami Whitewater Forest. Date is supplied by the Commons file metadata from EXIF. The original is sharp enough for venue context and shows a walker and cyclist from behind on a paved trail. No measurements or current trail-condition claims are inferred.

### cincinnati-nature-center-rowe-woods

- Source: [Kope Formation along the east branch of Avey's Run - 14779576419.jpg](https://commons.wikimedia.org/wiki/File:Kope_Formation_along_the_east_branch_of_Avey%27s_Run_-_14779576419.jpg)
- Photographer: Kyle Hartshorn; license: [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); capture date: 2014-08-16; verified: 2026-09-10.
- Output: `/images/venues/research-cincinnati-nature-center-rowe-woods.webp`, 1600 × 1064.
- QA: The author description explicitly names Cincinnati Nature Center at Rowe Woods and Avey’s Run. This is a genuine on-site geological/stream scene, with some softness at full resolution; it is not a visitor-center or access-route photo. The caption explicitly prevents interpreting the rocky stream as a represented accessible route. Flickr-origin photographer attribution retained through Commons.

### northern-kentucky-convention-center

- Source: [Northern Kentucky Convention Center.jpg](https://commons.wikimedia.org/wiki/File:Northern_Kentucky_Convention_Center.jpg)
- Photographer: Waffleiron692; license: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/); capture date: 2026-04-08; verified: 2026-09-10.
- Output: `/images/venues/research-northern-kentucky-convention-center.webp`, 1600 × 1200.
- QA: The source is an own-work CC0 release dated 2026-04-08. The entrance signage visibly confirms exact venue identity. The original shows steps prominently, and the caption explicitly says this does not identify the step-free entrance. No claim that this is the only entrance, or that the venue is inaccessible, is made.

## Rejected, deferred and remaining leads

- **Scheben Branch:** [Boone County Public Library - Scheben Branch.jpg](https://commons.wikimedia.org/wiki/File:Boone_County_Public_Library_-_Scheben_Branch.jpg), Mhuy222, 2019-12-31, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), 2051 × 2563. Metadata specifically describes the marquee and rear facade in Union, Kentucky. Strong exact-venue candidate, but original download repeatedly returned Wikimedia HTTP 429 despite backoff. No image was accepted without full-original visual QA. Highest-priority next retry.
- **MegaCorp Pavilion:** [The Beths, 2026-06-30](https://commons.wikimedia.org/wiki/File:MegaCorp_Pavilion_20260630_200232317_The_Beths.jpg), Hayden Schiff, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), 4080 × 3072. Source identifies the indoor Newport venue. Download throttled; not visually accepted. If later used, caption as a particular concert/event, without representing everyday lighting, sound or seating.
- **Truist Arena:** [Northern Kentucky University arena.jpg](https://commons.wikimedia.org/wiki/File:Northern_Kentucky_University_arena.jpg), Samvscat, 2008-05-31, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), 1000 × 603. Source identifies the NKU arena; download throttled and no original QA completed. It predates later venue branding and is a low-priority historical option.
- **Big Bone Lick:** [BIG BONE LICK STATE PARK.jpg](https://commons.wikimedia.org/wiki/File:BIG_BONE_LICK_STATE_PARK.jpg), Jerrye & Roy Klotz MD, 2012, CC BY-SA 3.0, was downloaded and inspected. It is chiefly a close-up of modern animal-replica sculpture; the photo license does not separately establish depicted sculpture rights. Excluded. [On the way to see the bison.jpg](https://commons.wikimedia.org/wiki/File:On_the_way_to_see_the_bison.jpg), Janarude, 2010-06-26, CC BY 3.0, is explicitly described as a collage rather than a single contextual photograph; not chosen for this bundle.
- **Pyramid Hill:** [Wilks Pyramid house.jpg](https://commons.wikimedia.org/wiki/File:Wilks_Pyramid_house.jpg), TMorata, 2020-06-01, CC BY-SA 4.0, explicitly includes a Harry Wilks statue; depicted-artwork reuse was not independently established. The alternate [Pyramid Hill Home of Harry Wilks](https://www.flickr.com/photos/elycefeliz/3084565850), elycefeliz, 2008-11-09, links to [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/), so it was not accepted for this freely reusable image set. Numerous search hits were actually Pyramid Hill in Australia, Hong Kong or North Dakota and were rejected as wrong places.
- **Sharon Woods wrong-place trap:** [Sharon Woods-Waterfowl Habitat in Schrock Lake 1.jpg](https://commons.wikimedia.org/wiki/File:Sharon_Woods-Waterfowl_Habitat_in_Schrock_Lake_1.jpg) belongs to the Columbus-area Metro Park, not Sharonville. Excluded despite a reusable license.
- **Other Boone branches (Florence, Hebron, Main and Walton):** no exact-branch, explicitly reusable current building photo was established. Commons search mostly returned scanned historical newspapers contributed by BCPL; contributor identity is not evidence of a branch photograph. Public library website/blog photos were not copied without a reuse license.
- **Florence Family Aquatic Center, Francis RecreAcres, Harrison Branch Library:** no exact-venue open-license photograph established in the bounded search. Some Harrison library results belonged to Carmel, California or Indianapolis; excluded.
- **Playhouse replacement:** Commons [Cincinnati Playhouse in the Park category](https://commons.wikimedia.org/wiki/Category:Cincinnati_Playhouse_in_the_Park) contains the existing 2004 night exterior, a 2008 exterior, and 2024 photographs of the *Stew* set/cast. The 2008 option does not solve current-building representation, and the 2024 options primarily depict a production rather than the visitor setting (with separate staged-set rights not established). No replacement was added; preserve the existing explicit historical caption.

Wikimedia returned HTTP 429 during both searching and some original-file downloads. Requests were backed off, and unavailable originals were deferred. Metadata-only candidates above are not included in `photos-research.json`. No unsupported “no photos exist” claim is made; further permission requests or later bounded retrieval may expand coverage.
