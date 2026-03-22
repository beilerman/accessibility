import { AccessibilityRatingBadge } from "@/components/ui/AccessibilityRatingBadge";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import type { AccessibilityRating, MobilityDevice } from "@/types/database";
import { MOBILITY_DEVICE_LABELS } from "@/types/database";

interface EditorialReviewHeroProps {
  title: string;
  photo?: string;
  photoAlt?: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  mobilityDevice?: MobilityDevice;
  venueName: string;
  overallRating: AccessibilityRating;
}

export function EditorialReviewHero({
  title,
  photo,
  photoAlt,
  authorName,
  authorAvatar,
  date,
  mobilityDevice,
  venueName,
  overallRating,
}: EditorialReviewHeroProps) {
  return (
    <div className="relative w-full aspect-[21/9] min-h-[320px] max-h-[480px] overflow-hidden rounded-2xl">
      {/* Background photo */}
      {photo ? (
        <img
          src={photo}
          alt={photoAlt || `Photo of ${venueName}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          {/* Rating badge */}
          <div className="mb-3">
            <AccessibilityRatingBadge
              rating={overallRating}
              size="lg"
              className="!text-white"
            />
          </div>

          {/* Venue name */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>{venueName}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          {/* Byline */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
            {authorAvatar && (
              <img
                src={authorAvatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover border-2 border-white/30"
              />
            )}
            <span>
              By{" "}
              <span className="font-semibold text-white">{authorName}</span>
            </span>
            <span aria-hidden="true">&middot;</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={date}>{formatDate(date)}</time>
            </span>
            {mobilityDevice && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>Reviewed using: {MOBILITY_DEVICE_LABELS[mobilityDevice]}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
