import Link from "next/link";
import type { ReviewWithAuthor } from "@/types/database";
import { AccessibilityRatingBadge } from "@/components/ui/AccessibilityRatingBadge";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  review: ReviewWithAuthor;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const photo = review.photos[0];

  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-lg">
      <Link
        href={`/reviews/${review.venue.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
      >
        {/* Photo */}
        <div className="aspect-video bg-muted overflow-hidden">
          {photo ? (
            <img
              src={photo.storage_path}
              alt={photo.alt_text}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-sm">No photo available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <AccessibilityRatingBadge rating={review.overall_rating} size="sm" />

          <h3 className="font-display text-lg font-bold mt-2 line-clamp-2 group-hover:text-accent transition-colors">
            {review.title || review.venue.name}
          </h3>

          {review.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {review.excerpt}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            {review.author.avatar_url && (
              <img
                src={review.author.avatar_url}
                alt=""
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="font-medium text-foreground">
              {review.author.display_name}
            </span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={review.created_at}>
              {formatDate(review.created_at)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
