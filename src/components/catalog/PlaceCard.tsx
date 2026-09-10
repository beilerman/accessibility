import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { DOMAIN_LABELS, dateLabel, type PublicPlace } from "@/lib/catalog";
import { photoForPlace } from "@/lib/media";
import { VenuePhoto } from "./VenuePhoto";

export function PlaceCard({ place }: { place: PublicPlace }) {
  const photo = photoForPlace(place.slug);
  return (
    <article className="place-card" aria-labelledby={`place-${place.slug}`}>
      <div className="flex justify-between gap-3 items-start">
        <span className="eyebrow">{place.category}</span>
        <span className="region-pill">
          {place.state === "KY" ? "Northern KY" : "Ohio"}
        </span>
      </div>
      <h2
        id={`place-${place.slug}`}
        className="font-display text-2xl mt-5 mb-3"
      >
        <Link href={`/venues/${place.slug}`} className="hover:underline">
          {place.name}
          <ArrowUpRight className="inline ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      </h2>
      {photo && <VenuePhoto photo={photo} compact />}
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" aria-hidden="true" />
        {place.city}, {place.state}
      </p>
      <p className="mt-5 text-sm leading-relaxed">{place.facts[0].text}</p>
      <ul
        className="flex flex-wrap gap-2 mt-5"
        aria-label="Information available"
      >
        {[...new Set(place.facts.map((f) => f.domain))].map((d) => (
          <li key={d} className="topic-pill">
            {DOMAIN_LABELS[d]}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6 text-xs text-muted-foreground border-t border-border">
        <p className="font-semibold text-foreground">
          From official public websites · Not field audited
        </p>
        <p className="mt-1">
          Sources checked {dateLabel(place.checked_at)} · {place.facts.length}{" "}
          notes
        </p>
      </div>
    </article>
  );
}
