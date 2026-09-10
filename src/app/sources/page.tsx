import Link from "next/link";
import type { Metadata } from "next";
import { places, factCount, dateLabel } from "@/lib/catalog";
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
            A summary of information published by the venue or its managing
            organization. This is the evidence used in the current directory. It
            is not a verified owner submission or an on-site audit.
          </dd>
        </div>
        <div>
          <dt className="font-bold">Sources checked</dt>
          <dd>
            The date we retrieved and checked the source. It does not mean the
            venue recently updated its page or that someone visited on that
            date.
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
      <h2>Images, reviews, and attribution</h2>
      <p>
        This directory does not use stock photographs as evidence of a venue. It
        does not present generated sample reviews as firsthand experiences. The
        linked publishers remain the source of their own policies and
        information; inclusion does not imply a partnership with Threshold.
      </p>
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
