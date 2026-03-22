import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Venue } from "@/types/database";
import { CATEGORY_LABELS } from "@/types/database";
import { AccessibilityRatingBadge } from "@/components/ui/AccessibilityRatingBadge";
import { getVenuePhoto } from "@/lib/data";

interface VenueCardProps {
  venue: Venue;
  excerpt?: string;
}

export function VenueCard({ venue, excerpt }: VenueCardProps) {
  const photo = getVenuePhoto(venue.id);

  return (
    <article
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-colors"
      aria-labelledby={`venue-${venue.id}`}
    >
      {/* Photo */}
      <div className="aspect-[16/10] bg-muted overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={`${venue.name} exterior view`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <MapPin className="h-8 w-8" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {CATEGORY_LABELS[venue.category]}
            </span>
            <h3 id={`venue-${venue.id}`} className="font-display text-lg font-bold mt-0.5">
              <Link
                href={`/venues/${venue.slug}`}
                className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
              >
                {venue.name}
              </Link>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{venue.city}, {venue.state}</span>
        </div>

        <AccessibilityRatingBadge rating={venue.overall_rating} size="sm" />

        {excerpt && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        )}
      </div>
    </article>
  );
}
