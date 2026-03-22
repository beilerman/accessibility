import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  Map,
} from "lucide-react";
import { getVenueBySlug, getVenues } from "@/lib/data";
import {
  CATEGORY_LABELS,
  RATING_LABELS,
} from "@/types/database";
import type { VenueWithDetails, Review } from "@/types/database";
import { AccessibilityRatingBadge } from "@/components/ui/AccessibilityRatingBadge";
import { AccessibilityDetailCard } from "@/components/venue/AccessibilityDetailCard";
import { PhotoGallery } from "@/components/venue/PhotoGallery";
import { MobilityTips } from "@/components/venue/MobilityTips";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return {};

  const categoryLabel = CATEGORY_LABELS[venue.category];
  const ratingLabel = RATING_LABELS[venue.overall_rating];
  const description = `Accessibility review for ${venue.name} (${categoryLabel}) in ${venue.city}, ${venue.state}. Rated: ${ratingLabel}. Detailed parking, entrance, interior, and bathroom accessibility information.`;

  return {
    title: `${venue.name} Accessibility Review`,
    description,
    openGraph: {
      title: `${venue.name} - Accessibility Review`,
      description,
      type: "article",
      images: venue.photos[0]
        ? [{ url: venue.photos[0].storage_path, alt: venue.photos[0].alt_text }]
        : undefined,
    },
  };
}

function formatAddress(venue: VenueWithDetails): string {
  const parts = [venue.address_line1];
  if (venue.address_line2) parts.push(venue.address_line2);
  parts.push(`${venue.city}, ${venue.state} ${venue.zip}`);
  return parts.join(", ");
}

function buildJsonLd(venue: VenueWithDetails) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address_line1,
      addressLocality: venue.city,
      addressRegion: venue.state,
      postalCode: venue.zip,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: venue.latitude,
      longitude: venue.longitude,
    },
    ...(venue.phone && { telephone: venue.phone }),
    ...(venue.website && { url: venue.website }),
    ...(venue.photos[0] && { image: venue.photos[0].storage_path }),
  };
}

function formatHoursDay(hours: { open: string; close: string }): string {
  return `${hours.open} - ${hours.close}`;
}

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="border border-border rounded-lg p-4"
      aria-labelledby={`review-${review.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          {review.title && (
            <h4
              id={`review-${review.id}`}
              className="font-semibold text-foreground"
            >
              {review.title}
            </h4>
          )}
          <div className="flex items-center gap-2 mt-1">
            <AccessibilityRatingBadge rating={review.overall_rating} size="sm" />
            {review.visit_date && (
              <span className="text-xs text-muted-foreground">
                Visited {formatDate(review.visit_date)}
              </span>
            )}
          </div>
        </div>
      </div>
      {review.excerpt ? (
        <p className="text-sm text-muted-foreground mt-2">{review.excerpt}</p>
      ) : (
        <p className="text-sm text-muted-foreground mt-2 line-clamp-4">
          {review.body}
        </p>
      )}
      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
        {review.mobility_device_used && (
          <span>Device: {review.mobility_device_used.replace(/_/g, " ")}</span>
        )}
        {review.helpful_count > 0 && (
          <span>{review.helpful_count} found this helpful</span>
        )}
        <span>{formatDate(review.created_at)}</span>
      </div>
    </article>
  );
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  const primaryPhoto = venue.photos.find((p) => p.is_primary) ?? venue.photos[0];
  const editorialReview = venue.reviews.find((r) => r.is_editorial);
  const communityReviews = venue.reviews.filter((r) => !r.is_editorial);
  const address = formatAddress(venue);
  const jsonLd = buildJsonLd(venue);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-muted border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="hover:text-foreground transition-colors min-h-[44px] inline-flex items-center"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/venues"
                className="hover:text-foreground transition-colors min-h-[44px] inline-flex items-center"
              >
                Venues
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-foreground font-medium truncate max-w-[200px]">
              {venue.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section aria-label="Venue header" className="relative">
        <div className="aspect-[21/9] w-full bg-muted overflow-hidden relative">
          {primaryPhoto ? (
            <Image
              src={primaryPhoto.storage_path}
              alt={primaryPhoto.alt_text}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <MapPin className="h-16 w-16" aria-hidden="true" />
            </div>
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            aria-hidden="true"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
              {CATEGORY_LABELS[venue.category]}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-1">
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
              <div className="flex items-center gap-1.5 text-white/90 text-sm">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{address}</span>
              </div>
              <AccessibilityRatingBadge
                rating={venue.overall_rating}
                size="lg"
                className="!text-white [&_svg]:!text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {venue.photos.length > 1 && (
        <section aria-label="Venue photos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="font-display text-xl font-bold mb-4">Photos</h2>
          <PhotoGallery photos={venue.photos} />
        </section>
      )}

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 max-w-3xl space-y-10">
            {/* Editorial review excerpt */}
            {venue.has_editorial_review && editorialReview && (
              <section aria-labelledby="editorial-heading">
                <div className="flex items-center gap-2 mb-3">
                  <Star
                    className="h-5 w-5 text-accent"
                    aria-hidden="true"
                  />
                  <h2
                    id="editorial-heading"
                    className="font-display text-xl font-bold"
                  >
                    Editorial Review
                  </h2>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  {editorialReview.title && (
                    <h3 className="font-semibold text-lg mb-2">
                      {editorialReview.title}
                    </h3>
                  )}
                  <p className="text-muted-foreground leading-relaxed">
                    {editorialReview.excerpt ?? editorialReview.body}
                  </p>
                  <Link
                    href={`/reviews/${editorialReview.id}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors min-h-[44px]"
                  >
                    Read full review
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            )}

            {/* Community Reviews */}
            <section aria-labelledby="reviews-heading">
              <h2
                id="reviews-heading"
                className="font-display text-xl font-bold mb-4"
              >
                Community Reviews
                {communityReviews.length > 0 && (
                  <span className="text-muted-foreground font-body text-base font-normal ml-2">
                    ({communityReviews.length})
                  </span>
                )}
              </h2>
              {communityReviews.length > 0 ? (
                <div className="space-y-4">
                  {communityReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="bg-muted rounded-xl p-6 text-center">
                  <p className="text-muted-foreground">
                    No community reviews yet. Be the first to share your
                    experience!
                  </p>
                </div>
              )}
            </section>

            {/* Mobility Tips */}
            {venue.mobility_tips.length > 0 && (
              <section aria-labelledby="tips-heading">
                <h2
                  id="tips-heading"
                  className="font-display text-xl font-bold mb-4"
                >
                  Mobility Tips
                </h2>
                <MobilityTips tips={venue.mobility_tips} />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="w-full lg:w-[320px] shrink-0 space-y-6"
            aria-label="Venue details sidebar"
          >
            {/* Accessibility Details */}
            {venue.accessibility_details && (
              <AccessibilityDetailCard
                details={venue.accessibility_details}
              />
            )}

            {/* Map Placeholder */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Map className="h-10 w-10 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm">Map coming soon</p>
                </div>
              </div>
            </div>

            {/* Venue Info */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display text-lg font-bold mb-4">
                Venue Info
              </h3>
              <dl className="space-y-3 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <dt>
                    <MapPin
                      className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd className="text-foreground">{address}</dd>
                </div>

                {/* Phone */}
                {venue.phone && (
                  <div className="flex items-start gap-3">
                    <dt>
                      <Phone
                        className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd>
                      <a
                        href={`tel:${venue.phone}`}
                        className="text-accent hover:text-accent-hover transition-colors min-h-[44px] inline-flex items-center"
                      >
                        {venue.phone}
                      </a>
                    </dd>
                  </div>
                )}

                {/* Website */}
                {venue.website && (
                  <div className="flex items-start gap-3">
                    <dt>
                      <Globe
                        className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Website</span>
                    </dt>
                    <dd>
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover transition-colors break-all min-h-[44px] inline-flex items-center"
                      >
                        {venue.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    </dd>
                  </div>
                )}

                {/* Hours */}
                {venue.hours && (
                  <div className="flex items-start gap-3">
                    <dt>
                      <Clock
                        className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Hours</span>
                    </dt>
                    <dd>
                      <dl className="space-y-0.5">
                        {DAY_ORDER.map((day) => {
                          const h = venue.hours?.[day];
                          if (!h) return null;
                          return (
                            <div key={day} className="flex gap-2">
                              <dt className="w-20 capitalize text-muted-foreground">
                                {day}
                              </dt>
                              <dd className="text-foreground">
                                {formatHoursDay(h)}
                              </dd>
                            </div>
                          );
                        })}
                      </dl>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
