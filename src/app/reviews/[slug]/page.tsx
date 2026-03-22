import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Globe, Clock } from "lucide-react";
import { getVenueBySlug, getEditorialReviews, getVenues } from "@/lib/data";
import { CATEGORY_LABELS, MOBILITY_DEVICE_LABELS } from "@/types/database";
import type { AccessibilityRating } from "@/types/database";
import { AccessibilityRatingBadge } from "@/components/ui/AccessibilityRatingBadge";
import { formatDate } from "@/lib/utils";
import { EditorialReviewHero } from "@/components/review/EditorialReviewHero";
import { ReviewCard } from "@/components/review/ReviewCard";

// --- Body renderer ---

function renderReviewBody(body: string) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((p, i) => {
    if (p.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-display text-2xl font-bold mt-8 mb-4"
        >
          {p.slice(3)}
        </h2>
      );
    }
    const html = p.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <p
        key={i}
        className="mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

// --- Static params ---

export async function generateStaticParams() {
  const allVenues = getVenues();
  return allVenues
    .filter((v) => v.has_editorial_review)
    .map((v) => ({ slug: v.slug }));
}

// --- Metadata ---

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return { title: "Review Not Found" };

  const review = venue.reviews.find((r) => r.is_editorial);
  if (!review) return { title: "Review Not Found" };

  const title = review.title || `${venue.name} Accessibility Review`;
  const description =
    review.excerpt || `Read our in-depth accessibility review of ${venue.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

// --- Page ---

export default async function EditorialReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const editorialReview = venue.reviews.find((r) => r.is_editorial);
  if (!editorialReview) notFound();

  // Get full review with author data
  const allEditorial = getEditorialReviews();
  const review = allEditorial.find((r) => r.id === editorialReview.id);
  if (!review) notFound();

  // Related reviews (other editorial reviews, excluding current)
  const relatedReviews = allEditorial.filter((r) => r.id !== review.id);

  // Hero photo — prefer first review photo, fall back to venue primary photo
  const heroPhoto =
    review.photos[0]?.storage_path ??
    venue.photos.find((p) => p.is_primary)?.storage_path ??
    venue.photos[0]?.storage_path;
  const heroPhotoAlt =
    review.photos[0]?.alt_text ??
    venue.photos.find((p) => p.is_primary)?.alt_text;

  // Accessibility details
  const details = venue.accessibility_details;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: review.title,
    reviewBody: review.excerpt || review.body.slice(0, 300),
    author: {
      "@type": "Person",
      name: review.author.display_name,
    },
    datePublished: review.created_at,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.address_line1,
        addressLocality: venue.city,
        addressRegion: venue.state,
        postalCode: venue.zip,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "AccessReview",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Reviews
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                {review.title || venue.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <EditorialReviewHero
          title={review.title || `${venue.name} Accessibility Review`}
          photo={heroPhoto}
          photoAlt={heroPhotoAlt}
          authorName={review.author.display_name}
          authorAvatar={review.author.avatar_url}
          date={review.created_at}
          mobilityDevice={review.mobility_device_used}
          venueName={venue.name}
          overallRating={review.overall_rating}
        />

        {/* Two-column layout: prose + sidebar */}
        <div className="mt-10 flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 max-w-[720px]">
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed">
              {renderReviewBody(review.body)}
            </div>

            {/* Review photos */}
            {review.photos.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-xl font-bold mb-4">Photos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {review.photos.map((photo) => (
                    <figure key={photo.id} className="rounded-lg overflow-hidden">
                      <img
                        src={photo.storage_path}
                        alt={photo.alt_text}
                        className="w-full aspect-video object-cover"
                      />
                      {photo.caption && (
                        <figcaption className="text-sm text-muted-foreground mt-2 px-1">
                          {photo.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Author bio */}
            {review.author.bio && (
              <div className="mt-10 p-6 bg-card rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  {review.author.avatar_url && (
                    <img
                      src={review.author.avatar_url}
                      alt=""
                      className="h-14 w-14 rounded-full object-cover shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-display text-lg font-bold">
                      {review.author.display_name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {review.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Venue quick facts */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h2 className="font-display text-lg font-bold mb-4">
                  Venue Details
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{venue.name}</p>
                      <p className="text-muted-foreground">
                        {venue.address_line1}
                        {venue.address_line2 && `, ${venue.address_line2}`}
                      </p>
                      <p className="text-muted-foreground">
                        {venue.city}, {venue.state} {venue.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      {CATEGORY_LABELS[venue.category]}
                    </span>
                  </div>

                  {venue.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                      <a
                        href={`tel:${venue.phone}`}
                        className="text-accent hover:underline"
                      >
                        {venue.phone}
                      </a>
                    </div>
                  )}

                  {venue.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline truncate"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Overall Rating
                  </p>
                  <AccessibilityRatingBadge
                    rating={venue.overall_rating}
                    size="md"
                  />
                </div>

                {/* Key accessibility highlights */}
                {details && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      Key Features
                    </p>
                    <ul className="space-y-2 text-sm">
                      <AccessibilityFact
                        label="Accessible Parking"
                        value={details.has_accessible_parking}
                      />
                      <AccessibilityFact
                        label="Automatic Doors"
                        value={details.entrance_has_automatic_door}
                      />
                      <AccessibilityFact
                        label="Accessible Bathroom"
                        value={details.bathroom_accessible}
                      />
                      <AccessibilityFact
                        label="Scooter Maneuverable"
                        value={details.scooter_maneuverable}
                      />
                      <AccessibilityFact
                        label="Elevator"
                        value={details.interior_has_elevator}
                      />
                      <AccessibilityFact
                        label="Scooter Charging"
                        value={details.scooter_charging_available}
                      />
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    href={`/venues/${venue.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline font-medium"
                  >
                    View full venue details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related reviews */}
        {relatedReviews.length > 0 && (
          <section
            aria-labelledby="related-reviews-heading"
            className="mt-16 pt-10 border-t border-border"
          >
            <h2
              id="related-reviews-heading"
              className="font-display text-2xl font-bold mb-6"
            >
              More Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

// --- Helper component ---

function AccessibilityFact({
  label,
  value,
}: {
  label: string;
  value?: boolean;
}) {
  if (value === undefined) return null;
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={value ? "text-rating-accessible font-medium" : "text-rating-not-accessible font-medium"}
      >
        {value ? "Yes" : "No"}
      </span>
    </li>
  );
}
