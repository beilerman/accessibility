# Optional Overture identity seed pipeline

This pipeline prepares **unreviewed place identity records** for the Threshold team. It cannot update the site, connect to its database, publish, merge records, or create accessibility evidence. Keep the curated venue research separate. A place existing in Overture says nothing about its entrance, restrooms, sensory environment or suitability.

## Plan improvements implemented

- Pinned release `2026-08-19.0`, confirmed as latest through the [official STAC catalog](https://stac.overturemaps.org/catalog.json) on September 10, 2026. Re-check before deliberately changing the pin.
- Use `basic_category` and `taxonomy`, because Overture has [deprecated `categories` for removal in September 2026](https://docs.overturemaps.org/blog/).
- Export the original feature ID, version, complete `sources` array (including upstream record IDs and raw license fields), source Parquet filename, coordinates, release and retrieval time.
- Apply confidence **at least 0.5** and the plan bounds: west `-84.95`, east `-84.15`, south `38.85`, north `39.40`. Missing confidence is excluded. Confidence concerns existence, not whether the business is operating now or accessible. See the [official places guide](https://docs.overturemaps.org/guides/places/).
- Identify possible duplicates for human review. Shared source IDs and matching normalized names within 30 meters create candidate groups. Co-location alone does not. No matching rule is permission to merge a building, its tenant, a program, or separate branches.
- Save licenses and a manifest with counts, query and SHA-256 hashes in each run. Existing output directories are never overwritten.

## Run

From this directory, Python 3.9 or newer:

```sh
python3 seed_overture.py --dry-run
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python seed_overture.py --fetch --limit 25 --output staging/sample-2026-08-19
```

The first command is fully offline, needs no dependencies, and writes no files. Remote execution is explicitly selected with `--fetch`; it installs DuckDB's official httpfs extension if needed. It reads public S3 data without credentials, using Parquet filtering described in [Overture's DuckDB documentation](https://docs.overturemaps.org/getting-data/duckdb/). DuckDB 1.4.5 is pinned for compatibility with the workspace's Python 3.9; this is not a claim it is the newest DuckDB version. Point coordinates are decoded from standard 2D WKB using Python's standard library, avoiding a spatial extension dependency. Non-point, nonfinite or unexpected geometry encodings are rejected for schema review.

The default output cap is 100 and the maximum is 100,000. `--limit 25` caps returned rows, **not network traffic**: metadata and matching row groups may still require appreciable downloads. The deterministic `ORDER BY id` can scan the whole bounded subset. The 180-second query timeout can be changed with `--timeout-seconds`; extension installation occurs before that timer. A 25-row remote sample was executed successfully; no bulk regional extraction has been run.

```sh
.venv/bin/python seed_overture.py --fetch --limit 50000 --output staging/region-2026-08-19
```

If `manifest.json` says `limit_reached: true`, completeness is unknown. The limit applies to bbox matches before an exact-coordinate filter; the manifest reports both counts. A run below the cap contains all matching records from the chosen snapshot/query, not a census of all real-world venues. Region bounds form a rectangle, not county boundaries. Outlying Ohio/Indiana locations inside that rectangle still need geographic scope review. No category filter is imposed: reviewers must exclude records outside the intended public-facing venue scope.

## Output and review

Each new output directory contains:

- `places.ndjson`: identity staging, each with `review_status: unreviewed`, `evidence_type: directory_seed`, and empty `accessibility_facts`.
- `dedupe-candidates.ndjson`: candidate IDs and reason, with `action: human_review_only`. Candidate coverage is intentionally conservative and is not a full duplicate audit.
- `manifest.json`: exact parameters, release, input kind, versions and hashes. Only `status: complete_staging_only` represents a completed run; an interrupted write can leave `status: writing`.
- `licenses/`: source license text and notices, retained with the staging records.

Before any future import: reconcile IDs to existing venues; verify name, branch, location and public-facing scope; check operating status; review per-source licensing and notices; attach accessibility claims only from separately reviewed, dated sources. Do not overwrite curated facts with seed data. An absent field remains unknown. Unknown license providers are explicitly unresolved rather than assigned a guessed license. `publication_allowed: false` is an export label, not an automatic approval gate.

## Licensing provenance

The [official attribution page](https://docs.overturemaps.org/attribution/#places) documents CDLA Permissive 2.0 for Meta, Microsoft, PinMeTo, Krick, RenderSEO, DAC and BrightQuery; Apache 2.0 for Foursquare; and CC0 1.0 for AllThePlaces. The script's dated provider mapping is only a review aid. Raw license values remain intact, including null values. A joined record can contain multiple sources; do not assume a single blanket license.

`licenses/sources.json` records official download URLs and SHA-256 hashes, checked September 10, 2026. CDLA and Apache license texts are included; full Foursquare NOTICE and CC0 source pages are retained as HTML, alongside the Overture attribution page. The Overture page's Foursquare copyright year (2024) and current upstream notice (2026) differ; preserve both and resolve release-specific notice requirements before distribution. Threshold transformations are projection, regional/confidence filtering, serialization and addition of staging/provenance labels; no identity values are intentionally edited.

This staging folder and its metadata are not a public redistribution workflow. Preserve the license texts, relevant notices and a clear modifications notice when building a later distribution, following the original licenses. Do not scrape upstream provider websites to fill in license gaps automatically.

## Validation

```sh
.venv/bin/python -m unittest -v test_seed_overture.py
```

Eight tests passed on September 10, 2026. They exercise the actual SQL and command-line staging output against a small, generated local Parquet fixture with WKB points, including the geographic boundary, confidence floor, null confidence exclusion, provenance preservation, output limit, candidate-only dedupe, invalid geometry and overwrite refusal. They do not download Overture place data. Optional local fixture execution is available with `--input-parquet FILE --output NEW_DIRECTORY`; those records are prominently labeled `LOCAL TEST FIXTURE`.

The final local workflow needs no extensions. A separate manual check wrote a GeoParquet point using DuckDB's spatial extension and read it in a fresh connection without the extension; the geometry arrived as the expected 21-byte WKB.

### Remote sample verified September 10, 2026

```sh
.venv/bin/python seed_overture.py --fetch --limit 25 --timeout-seconds 180 --output staging/remote-sample-2026-09-10
```

This command exited successfully against release `2026-08-19.0` and staged **25 rows with 25 distinct IDs**. All 25 satisfied the exact plan bounds and confidence floor, retained source arrays and Parquet filenames, and had empty accessibility facts. Confidence ranged from `0.75` to `0.9916659295558929`. There were zero dedupe candidate groups in this limited sample. Both data-file hashes match the manifest; `limit_reached` is true, so this is not a complete regional catalog.

The remote schema supplied `basic_category`, `taxonomy`, standard Point WKB, and the expected raw source fields. Observed datasets were BrightQuery, Foursquare, Microsoft, meta, Overture and Overture-signals. All records had upstream provenance. Twenty-five source entries lacked `record_id`; these were Overture confidence-calculation entries, preserved as null rather than invented. Source-specific raw licenses were retained even for providers absent from the dated license-candidate mapping. No network or schema errors occurred in this run, and no retry was needed.

The staging files are intentionally ignored by Git and available locally at `pipeline/staging/remote-sample-2026-09-10/`. A compact evidence record is in `verification/remote-sample-2026-09-10.json`. No sample row was imported into the website or database. This verifies the bounded remote extraction and source handling; it does not establish venue existence, accessibility, complete coverage or redistribution clearance.
