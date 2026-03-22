import Link from "next/link";
import type { ReviewWithAuthor } from "@/types/database";
import { AccessibilityRatingBadge } from "@/components/ui/AccessibilityRatingBadge";
import { formatDate } from "@/lib/utils";

interface FeaturedReviewProps {
  review: ReviewWithAuthor;
}

export function FeaturedReview({ review }: FeaturedReviewProps) {
  const photo = review.photos[0];

  return (
    <section aria-labelledby="featured-review-heading" className="py-12">
      <h2
        id="featured-review-heading"
        className="font-display text-2xl sm:text-3xl font-bold mb-8"
      >
        Featured Review
      </h2>
      <article className="bg-card rounded-2xl border border-border overflow-hidden lg:grid lg:grid-cols-2 lg:gap-0">
        {/* Photo */}
        <div className="aspect-video lg:aspect-auto lg:h-full bg-muted overflow-hidden">
          {photo ? (
            <img
              src={photo.storage_path}
              alt={photo.alt_text}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground min-h-[240px]">
              <span className="text-sm">No photo available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <AccessibilityRatingBadge rating={review.overall_rating} size="md" />

          <h3 className="font-display text-xl sm:text-2xl font-bold mt-4">
            <Link
              href={`/venues/${review.venue.slug}`}
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            >
              {review.title || review.venue.name}
            </Link>
          </h3>

          {review.excerpt && (
            <p className="mt-3 text-muted-foreground line-clamp-4">
              {review.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            {review.author.avatar_url && (
              <img
                src={review.author.avatar_url}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span>
              By{" "}
              <span className="font-medium text-foreground">
                {review.author.display_name}
              </span>
            </span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={review.created_at}>
              {formatDate(review.created_at)}
            </time>
          </div>

          <div className="mt-6">
            <Link
              href={`/venues/${review.venue.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors min-h-[44px]"
            >
              Read full review
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
