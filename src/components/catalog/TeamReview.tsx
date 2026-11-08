import { DOMAIN_LABELS, dateLabel } from "@/lib/catalog";
import type { TeamReview as Review } from "@/lib/team-reviews";

export function TeamReview({ review }: { review: Review }) {
  const domains = Object.entries(DOMAIN_LABELS).filter(([key]) =>
    review.points.some((p) => p.domain === key),
  );
  return (
    <section
      id="threshold-review"
      className="team-review"
      aria-labelledby="team-review-heading"
    >
      <p className="eyebrow">THRESHOLD REVIEW · FIRSTHAND</p>
      <h2 id="team-review-heading" className="font-display text-3xl">
        What we found when we went
      </h2>
      <p className="fact-meta">
        By {review.reviewer}, {review.reviewerRole} · {review.visitContext}{" "}
        Written{" "}
        <time dateTime={review.reportedAt}>{dateLabel(review.reportedAt)}</time>
        .
      </p>
      {domains.map(([key, label]) => (
        <section key={key} aria-labelledby={`review-${key}`}>
          <h3 id={`review-${key}`} className="font-semibold text-lg mt-6 mb-3">
            {label}
          </h3>
          <ul className="space-y-3 list-disc pl-5">
            {review.points
              .filter((p) => p.domain === key)
              .map((p, i) => (
                <li key={i}>{p.text}</li>
              ))}
          </ul>
        </section>
      ))}
      <p className="text-sm text-muted-foreground mt-6">
        This describes our own visits, not the venue&apos;s policy. Staff,
        seating and routes can change by event; confirm what you need with the
        venue.
      </p>
    </section>
  );
}
