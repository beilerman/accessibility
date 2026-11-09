import { DOMAIN_LABELS, dateLabel } from "@/lib/catalog";
import type { TeamReview as Review } from "@/lib/team-reviews";

export function TeamReview({ review }: { review: Review }) {
  const domains = Object.entries(DOMAIN_LABELS).filter(([key]) =>
    review.points.some((p) => p.domain === key),
  );
  const initials = review.reviewer
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <section
      id="threshold-review"
      className="team-review"
      aria-labelledby="team-review-heading"
    >
      <span className="badge-firsthand">Threshold review · Firsthand</span>
      <h2 id="team-review-heading" className="font-display">
        What we found when we went
      </h2>
      <div className="reviewer">
        <span className="reviewer-avatar" aria-hidden="true">
          {initials}
        </span>
        <div>
          <p className="reviewer-name">
            {review.reviewer}, {review.reviewerRole}
          </p>
          <p className="reviewer-context">
            {review.visitContext} Written{" "}
            <time dateTime={review.reportedAt}>
              {dateLabel(review.reportedAt)}
            </time>
            .
          </p>
        </div>
      </div>
      <div className="review-columns">
        {domains.map(([key, label]) => (
          <section key={key} aria-labelledby={`review-${key}`}>
            <h3 id={`review-${key}`}>{label}</h3>
            <ul>
              {review.points
                .filter((p) => p.domain === key)
                .map((p, i) => (
                  <li key={i}>{p.text}</li>
                ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="review-disclaimer">
        This describes our own visits, not the venue&apos;s policy. Staff,
        seating and routes can change by event; confirm what you need with the
        venue.
      </p>
    </section>
  );
}
