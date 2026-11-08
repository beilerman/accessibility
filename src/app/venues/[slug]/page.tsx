import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import {
  places,
  DOMAIN_LABELS,
  SOURCE_TYPE_LABELS,
  dateLabel,
  factNeedsCaution,
  latestRetrieval,
  recheckDueDate,
} from "@/lib/catalog";
import { photoForPlace, aiImageForPlace, artForCategory } from "@/lib/media";
import { VenuePhoto } from "@/components/catalog/VenuePhoto";
import { AiVenueImage } from "@/components/catalog/AiVenueImage";
import { CategoryArt } from "@/components/catalog/CategoryArt";
import { reportsForPlace } from "@/lib/visitor-reports";
import { VisitorReport } from "@/components/catalog/VisitorReport";
// Re-render daily so overdue-recheck cautions (computed from today's date)
// appear without waiting for a new deploy.
export const revalidate = 86400;

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = places.find((p) => p.slug === slug);
  return p
    ? {
        title: `${p.name} — Access information`,
        description: `What ${p.name} in ${p.city}, ${p.state} publishes about accessibility. Sources last checked ${dateLabel(latestRetrieval(p))}; no on-site audit.`,
      }
    : {};
}
export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = places.find((p) => p.slug === slug);
  if (!p) notFound();
  const reports = reportsForPlace(p.slug);
  const photo = photoForPlace(p.slug);
  const aiImage = aiImageForPlace(p.slug);
  const artwork = artForCategory(p.category);
  return (
    <div className="page-shell py-10">
      <Link
        href="/venues"
        className="inline-flex items-center gap-2 min-h-11 text-sm underline"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        All places
      </Link>
      <div className="detail-heading">
        <p className="eyebrow">
          {p.category} ·{" "}
          {p.state === "KY" ? "NORTHERN KENTUCKY" : "GREATER CINCINNATI"}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl mt-4">{p.name}</h1>
        <p className="flex items-center gap-2 mt-4 text-muted-foreground">
          <MapPin aria-hidden="true" className="h-4 w-4" />
          {p.city}, {p.state}
        </p>
      </div>
      {photo ? (
        <VenuePhoto photo={photo} />
      ) : aiImage ? (
        <AiVenueImage image={aiImage} />
      ) : artwork ? (
        <CategoryArt item={artwork} />
      ) : null}
      <div className="evidence-banner">
        <strong>From official public websites</strong>
        <span>
          Sources last checked {dateLabel(latestRetrieval(p))} · Not field
          audited
        </span>
        <p>
          The date records our source check, not a visit or confirmation by the
          venue. No organization account has verified this listing.
        </p>
      </div>
      <div className="detail-grid">
        <div>
          <h2 className="font-display text-3xl mb-7">
            What the venue publishes
          </h2>
          {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
            const facts = p.facts.filter((f) => f.domain === key);
            return (
              <section className="fact-group" key={key} aria-labelledby={key}>
                <h3 id={key} className="font-semibold text-xl mb-4">
                  {label}
                </h3>
                {facts.length ? (
                  <ul className="space-y-5">
                    {facts.map((f, i) => {
                      const caution = factNeedsCaution(f);
                      return (
                        <li key={f.id} id={f.id} className="fact-note">
                          <p>{f.text}</p>
                          {caution && (
                            <p className="fact-caution" role="note">
                              {f.review_status === "source_unavailable"
                                ? "The source for this note no longer loads. Confirm with the venue."
                                : "This note is due for a source recheck. Confirm with the venue."}
                            </p>
                          )}
                          <p className="fact-meta">
                            {SOURCE_TYPE_LABELS[f.source_type]} · Checked{" "}
                            <time dateTime={f.retrieved_at}>
                              {dateLabel(f.retrieved_at)}
                            </time>
                            {f.published_at && (
                              <>
                                {" "}
                                · Source updated{" "}
                                <time dateTime={f.published_at}>
                                  {dateLabel(f.published_at)}
                                </time>
                              </>
                            )}
                          </p>
                          <a
                            href={f.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                          >
                            Official source{" "}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-3 w-3"
                            />
                            <span className="sr-only">
                              {" "}
                              for {label.toLowerCase()} note {i + 1} (opens in
                              new tab)
                            </span>
                          </a>
                          <details className="fact-history">
                            <summary>
                              Note history
                              <span className="sr-only">
                                {" "}
                                for {label.toLowerCase()} note {i + 1}
                              </span>
                            </summary>
                            <ol>
                              {f.history.map((h, j) => (
                                <li key={j}>
                                  <time dateTime={h.date}>
                                    {dateLabel(h.date)}
                                  </time>{" "}
                                  — {h.note}
                                </li>
                              ))}
                            </ol>
                            <p>
                              Next source check due{" "}
                              {dateLabel(recheckDueDate(f))}. Note ID{" "}
                              <code>{f.id}</code>
                            </p>
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="unknown-note">
                    Not documented in the sources we checked. Confirm with the
                    venue.
                  </p>
                )}
              </section>
            );
          })}
        </div>
        <aside aria-label="Plan your visit" className="space-y-6">
          <section className="before-panel">
            <p className="eyebrow">BEFORE YOU GO</p>
            <h2 className="font-display text-2xl">
              Limits & things to confirm
            </h2>
            <p>{p.limitations}</p>
            <p>
              Confirm the specific entrance, route, restroom, equipment, and
              timing you need. Services and spaces may vary by event.
            </p>
          </section>
          <section className="place-card">
            <h2 className="font-display text-2xl">Plan your visit</h2>
            <p>
              {p.address ||
                `${p.city}, ${p.state}. See the official website for the entrance address.`}
            </p>
            <a
              className="primary-button"
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit official website{" "}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            {p.address && (
              <a
                className="underline min-h-11 inline-flex items-center"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ", " + p.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find on a map
                <span className="sr-only">
                  {" "}
                  (opens Google Maps in a new tab)
                </span>
              </a>
            )}
            <Link href="/sources" className="text-sm underline">
              How sources and dates work
            </Link>
            <Link
              href="/access-in-pictures"
              className="text-sm underline min-h-11 inline-flex items-center"
            >
              Explore illustrated access features
            </Link>
          </section>
        </aside>
      </div>
      <section
        id="visitor-reports"
        className="py-10 border-t border-border"
        aria-labelledby="visitor-heading"
      >
        <h2 id="visitor-heading" className="font-display text-3xl">
          Visitor reports from around the web
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed">
          These accounts describe individual experiences and may be historical.
          They are separate from the venue’s published information and have not
          been independently verified by Threshold.
        </p>
        {reports.length ? (
          <div className="mt-7 max-w-4xl space-y-7">
            {reports.map((report) => (
              <VisitorReport key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-muted-foreground">
            No sufficiently attributable accessibility report is included for
            this place yet. That is a research gap, not evidence about the
            quality of access.
          </p>
        )}
        <Link
          href="/visitor-reports"
          className="underline inline-flex min-h-11 items-center mt-5"
        >
          Explore all visitor reports
        </Link>
      </section>
    </div>
  );
}
