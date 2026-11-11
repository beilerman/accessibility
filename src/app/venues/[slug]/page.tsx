import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Route,
  Ear,
  BookOpen,
  Coffee,
} from "lucide-react";

const DOMAIN_ICONS = {
  mobility: Route,
  sensory: Ear,
  cognitive: BookOpen,
  chronic: Coffee,
} as const;
import {
  places,
  DOMAIN_LABELS,
  SOURCE_TYPE_LABELS,
  dateLabel,
  factNeedsCaution,
  latestRetrieval,
  recheckDueDate,
} from "@/lib/catalog";
import { photoForPlace, aiImageForPlace, artForCategory, accessPhotos, accessGuides } from "@/lib/media";
import { AccessMedia } from "@/components/catalog/AccessMedia";
import { VenuePhoto } from "@/components/catalog/VenuePhoto";
import { AiVenueImage } from "@/components/catalog/AiVenueImage";
import { TeamReview } from "@/components/catalog/TeamReview";
import { teamReviewForPlace } from "@/lib/team-reviews";
import { CategoryArt } from "@/components/catalog/CategoryArt";
import { reportsForPlace } from "@/lib/visitor-reports";
import { VisitorReport } from "@/components/catalog/VisitorReport";
import { reportProblemHref } from "@/lib/site";
import { ScrollToHash } from "@/components/catalog/ScrollToHash";
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
        description: `What ${p.name} in ${p.city}, ${p.state} publishes about accessibility. Sources last checked ${dateLabel(latestRetrieval(p))}; ${teamReviewForPlace(p.slug) ? "includes a firsthand Threshold review" : "no on-site audit"}.`,
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
  const teamReview = teamReviewForPlace(p.slug);
  const photo = photoForPlace(p.slug);
  const aiImage = aiImageForPlace(p.slug);
  const artwork = artForCategory(p.category);
  const hasAccessMedia = [...accessPhotos, ...accessGuides].some((item) => item.slug === p.slug);
  return (
    <div className="page-shell py-8">
      <ScrollToHash />
      <Link
        href="/venues"
        className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold underline underline-offset-4"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        All places
      </Link>
      <div className="detail-hero">
        <div className="detail-heading">
          <p className="eyebrow">
            {p.category} ·{" "}
            {p.state === "KY" ? "NORTHERN KENTUCKY" : "GREATER CINCINNATI"}
          </p>
          <h1 className="font-display">{p.name}</h1>
          <p className="flex items-center gap-2 mt-4 text-lg text-muted-foreground">
            <MapPin aria-hidden="true" className="h-5 w-5" />
            {p.city}, {p.state}
          </p>
          {teamReview && (
            <p className="mt-5">
              <a href="#threshold-review" className="badge-firsthand">
                Firsthand Threshold review
                <span className="sr-only"> (jump to review)</span>
              </a>
            </p>
          )}
          <div className="evidence-banner">
            <strong>From official public websites</strong>
            <span>
              Sources last checked {dateLabel(latestRetrieval(p))} ·{" "}
              {teamReview ? (
                <a href="#threshold-review" className="underline">
                  Includes a firsthand Threshold review
                </a>
              ) : (
                "Not field audited"
              )}
            </span>
            <p>
              The date records our source check, not a visit or confirmation by
              the venue. No organization account has verified this listing.
            </p>
          </div>
          <nav aria-label="On this page" className="page-jumps">
            <ul>
              {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
                const count = p.facts.filter((f) => f.domain === key).length;
                return (
                  <li key={key}>
                    <a href={`#${key}`}>
                      {label}{" "}
                      <span className="jump-count">
                        {count || "none yet"}
                        <span className="sr-only">
                          {count === 1 ? " note" : count ? " notes" : ""}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
              <li>
                <a href="#before-you-go">Limits to confirm</a>
              </li>
              {hasAccessMedia && (
                <li><a href="#access-photos">Access photos & guides</a></li>
              )}
              {reports.length > 0 && (
                <li>
                  <a href="#visitor-reports">
                    Visitor reports{" "}
                    <span className="jump-count">
                      {reports.length}
                      <span className="sr-only">
                        {reports.length === 1 ? " report" : " reports"}
                      </span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        {photo ? (
          <VenuePhoto photo={photo} />
        ) : aiImage ? (
          <AiVenueImage image={aiImage} />
        ) : artwork ? (
          <CategoryArt item={artwork} />
        ) : null}
      </div>
      {teamReview && <TeamReview review={teamReview} />}
      <div className="detail-grid">
        <div>
          <p className="eyebrow">FROM OFFICIAL SOURCES</p>
          <h2 className="font-display text-4xl mt-3 mb-7">
            What the venue publishes
          </h2>
          {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
            const facts = p.facts.filter((f) => f.domain === key);
            const Icon = DOMAIN_ICONS[key as keyof typeof DOMAIN_LABELS];
            return (
              <section className="fact-group" key={key} aria-labelledby={key}>
                <h3 id={key}>
                  <span className="domain-icon">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  {label}
                </h3>
                {facts.length ? (
                  <ul className="fact-list">
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
                          <div className="fact-actions">
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
                          </div>
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
          <section className="before-panel" id="before-you-go">
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
          <section className="panel-card">
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
            <a
              href={reportProblemHref(p)}
              className="underline min-h-11 inline-flex items-center"
            >
              Report a problem with this page
              <span className="sr-only"> (opens your email app)</span>
            </a>
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
      <AccessMedia slug={p.slug} />
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
