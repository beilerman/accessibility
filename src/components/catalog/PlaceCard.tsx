import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { DOMAIN_LABELS, dateLabel, type PublicPlace } from "@/lib/catalog";
import { photoForPlace, aiImageForPlace, artForCategory } from "@/lib/media";
import { VenuePhoto } from "./VenuePhoto";
import { AiVenueImage } from "./AiVenueImage";
import { CategoryArt } from "./CategoryArt";
import { reportsForPlace } from "@/lib/visitor-reports";
import { teamReviewForPlace } from "@/lib/team-reviews";

export function PlaceCard({ place }: { place: PublicPlace }) {
  const reportCount = reportsForPlace(place.slug).length;
  const hasTeamReview = Boolean(teamReviewForPlace(place.slug));
  const photo = photoForPlace(place.slug);
  const aiImage = aiImageForPlace(place.slug);
  const artwork = artForCategory(place.category);
  return (
    <article className="place-card" aria-labelledby={`place-${place.slug}`}>
      <div className="card-visual">
        {hasTeamReview && (
          <span className="badge-firsthand">Firsthand review</span>
        )}
        {photo ? (
          <VenuePhoto photo={photo} compact />
        ) : aiImage ? (
          <AiVenueImage image={aiImage} compact />
        ) : artwork ? (
          <CategoryArt item={artwork} compact />
        ) : null}
      </div>
      <div className="card-body">
        <div className="flex justify-between gap-3 items-center">
          <span className="eyebrow">{place.category}</span>
          <span className="region-pill">
            {place.state === "KY" ? "Northern KY" : "Ohio"}
          </span>
        </div>
        <h2 id={`place-${place.slug}`} className="font-display card-title">
          <Link href={`/venues/${place.slug}`}>
            {place.name}
            <ArrowUpRight
              className="inline ml-1 h-4 w-4 text-accent"
              aria-hidden="true"
            />
          </Link>
        </h2>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {place.city}, {place.state}
        </p>
        <p className="card-fact">{place.facts[0].text}</p>
        <ul
          className="flex flex-wrap gap-2 mt-1"
          aria-label="Information available"
        >
          {[...new Set(place.facts.map((f) => f.domain))].map((d) => (
            <li key={d} className="topic-pill">
              {DOMAIN_LABELS[d]}
            </li>
          ))}
        </ul>
        {reportCount > 0 && (
          <Link
            className="text-sm underline inline-flex min-h-11 items-center"
            href={`/venues/${place.slug}#visitor-reports`}
          >
            {reportCount} external visitor{" "}
            {reportCount === 1 ? "report" : "reports"}
            <span className="sr-only"> for {place.name}</span>
          </Link>
        )}
        <div className="card-foot">
          <p className="font-semibold text-foreground">
            From official public websites ·{" "}
            {hasTeamReview
              ? "Includes a firsthand Threshold review"
              : "Not field audited"}
          </p>
          <p className="mt-1">
            Sources checked {dateLabel(place.checked_at)} · {place.facts.length}{" "}
            notes
          </p>
        </div>
      </div>
    </article>
  );
}
  