import Link from "next/link";
import type { Metadata } from "next";
import {
  places,
  factCount,
  dateLabel,
  SOURCE_TYPE_LABELS,
  RECHECK_AFTER_DAYS,
} from "@/lib/catalog";
import { venuePhotos, accessPhotos } from "@/lib/media";
export const metadata: Metadata = {
  title: "Sources & evidence",
  description:
    "How Threshold records source links, research dates, uncertainty and public website reporting.",
};
export default function Sources() {
  return (
    <div className="page-shell reading-page">
      <p className="eyebrow">SOURCES & EVIDENCE</p>
      <h1 className="font-display text-5xl">Know where a detail comes from.</h1>
      <p className="text-xl">
        {factCount} access notes across {places.length} places, drawn from
        official public websites.
      </p>
      <h2>What the labels mean</h2>
      <dl className="space-y-5">
        <div>
          <dt className="font-bold">From official public websites</dt>
          <dd>
            A summary of information published by the venue, its managing
            organization, an identified venue partner, or a public agency.
            These notes appear separately from visitor reports.
            This information is not a verified owner submission or an on-site
            audit.
          </dd>
        </div>
        <div>
          <dt className="font-bold">Threshold review · firsthand</dt>
          <dd>
            A review written by a member of the Threshold team after visiting
            the place, credited by name with the visit context and the date it
            was written. It records what we experienced, not the venue’s
            policy, and is shown separately from notes taken from official
            websites. Where the two differ, both are shown.
          </dd>
        </div>
        <div>
          <dt className="font-bold">Checked</dt>
          <dd>
            The date we last read that note’s source and confirmed the summary
            still matched. Each note has its own date. It does not mean the
            venue recently updated its page or that someone visited on that
            date.
          </dd>
        </div>
        <div>
          <dt className="font-bold">Source updated</dt>
          <dd>
            Shown only when the publisher states when its page changed. Most
            pages do not, so this is usually absent.
          </dd>
        </div>
        <div>
          <dt className="font-bold">Who published the source</dt>
          <dd>
            Each note names its publisher type:{" "}
            {Object.values(SOURCE_TYPE_LABELS).join("; ").toLowerCase()}. An
            operating organization may describe several locations on one page.
            A venue partner, such as a cinema-system provider, is identified
            separately and is not necessarily the venue operator.
          </dd>
        </div>
        <div>
          <dt className="font-bold">Note history and rechecks</dt>
          <dd>
            Every note keeps a dated history of when it was added, rechecked or
            revised; earlier wording is not silently replaced. We monitor source
            pages for changes and recheck each note at least every{" "}
            {RECHECK_AFTER_DAYS} days. A note whose source changed, stopped
            loading or is overdue for a recheck shows a caution until an editor
            reviews it.{" "}
            <Link href="/updates" className="underline">
              See recent corrections and withdrawn notes.
            </Link>
          </dd>
        </div>
        <div>
          <dt className="font-bold">Not documented</dt>
          <dd>
            We did not find the detail in the sources we checked. This does not
            mean a feature is absent.
          </dd>
        </div>
      </dl>
      <h2>How we handle uncertainty</h2>
      <p>
        We keep restrictions and conflicting statements visible. We do not infer
        a step-free route from an equipment rental policy, a building-wide
        feature from one room, or a visitor experience from a service-animal
        policy. Contact the venue for details essential to your visit.
      </p>
      <p>
        Search filters identify the kind of information available, including
        barriers. They are not endorsements or personal fit predictions. None of
        these listings establishes legal compliance.
      </p>
      <h2 id="visitor-evidence">Visitor reports: selection and limits</h2>
      <p>
        Visitor reports are short paraphrases of identifiable public accounts.
        Each names the publication and public author where available, links to
        the original, and distinguishes publication, visit and source-check
        dates. A source check does not verify the experience.
      </p>
      <p>
        We prioritize specific observations about routes, equipment, sensory
        conditions, communication and everyday needs. We retain barriers and
        positive experiences, disclose historical or promotional context, and
        avoid turning one account into a claim about all visits. Search snippets
        alone, generated review summaries, unattributed aggregations and private
        discussions are not included.
      </p>
      <p>
        Coverage is uneven and selected for relevance, not statistical balance.
        We do not calculate ratings, count votes as corroboration, or imply that
        public authors submitted a review here. Unknown dates remain unknown.
        Reviewer photos are not copied without a reusable license.
      </p>
      <p>
        <Link href="/visitor-reports" className="underline">
          Browse visitor reports and their original sources.
        </Link>{" "}
        Each venue page keeps these accounts below its official information,
        including any qualifications needed to interpret older reports.
      </p>
      <h2>Images, reviews, and attribution</h2>
      <p>
        Actual venue photographs carry a source, author, reuse license and photo
        date where known. They provide visual context; an older exterior
        photograph cannot confirm a current entrance, working lift or complete
        accessible route. We retain the full frame when resizing and converting
        these images for the web.
      </p>
      <p>
        Images labeled “AI illustration — example setting” are generated
        teaching examples. They do not depict the listed venues, establish
        dimensions or verify compliance. Their descriptions identify visible
        features and questions to ask.{" "}
        <Link href="/access-in-pictures" className="underline">
          Explore the visual guide.
        </Link>
      </p>
      <p>
        We do not present generated sample reviews as firsthand experiences.
        Inclusion of a source or image does not imply a partnership with
        Threshold.
      </p>
      <h2>Photo credits</h2>
      <p>
        Where a venue photograph is unavailable, stylized category artwork
        supplies visual context. Each use is labeled “AI artwork” and depicts an
        imagined scene; it makes no claim about that venue’s appearance or
        accessibility.
      </p>
      <ul className="source-register">
        {[...venuePhotos, ...accessPhotos].map((photo) => (
          <li key={photo.src}>
            <Link
              className="font-semibold underline"
              href={`/venues/${photo.slug}`}
            >
              {places.find((p) => p.slug === photo.slug)?.name}
            </Link>
            <span className="text-sm text-muted-foreground">
              Photo date: {photo.photoDate || "unknown"} · Credit checked{" "}
              {photo.checkedAt}
            </span>
            <p className="text-sm">
              <a
                className="underline"
                href={photo.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {photo.author} — original and attribution
              </a>
              {" · "}
              <a
                className="underline"
                href={photo.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {photo.license}
              </a>
            </p>
          </li>
        ))}
      </ul>
      <h2>Source register</h2>
      <p>
        Follow a place for individual access notes and their links, or open its
        primary source below. Other source links may appear on the place page.
      </p>
      <ul className="source-register">
        {places.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/venues/${p.slug}`}
              className="font-semibold underline"
            >
              {p.name}
            </Link>
            <span className="text-sm text-muted-foreground">
              {p.city}, {p.state} · Checked {dateLabel(p.checked_at)}
            </span>
            <a
              className="source-link"
              href={p.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Primary official source
              <span className="sr-only">
                {" "}
                for {p.name} (opens in a new tab)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
