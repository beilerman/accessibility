import type { Metadata } from "next";
import { getFeaturedReview, getEditorialReviews, getVenuePhoto } from "@/lib/data";
import { VenueCard } from "@/components/venue/VenueCard";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedReview } from "@/components/home/FeaturedReview";
import { CategoryLinks } from "@/components/home/CategoryLinks";
import { HowItWorks } from "@/components/home/HowItWorks";

export const metadata: Metadata = {
  title: "Accessibility Reviews | Greater Cincinnati & Northern Kentucky",
  description:
    "Real accessibility reviews by real people with mobility challenges. Find wheelchair-accessible restaurants, shops, and venues in Greater Cincinnati and Northern Kentucky.",
  openGraph: {
    title: "Know Before You Go — Accessibility Reviews",
    description:
      "Real accessibility reviews by real people with mobility challenges. Greater Cincinnati & Northern Kentucky.",
    type: "website",
  },
};

export default async function Home() {
  const featuredReview = await getFeaturedReview();
  const editorialReviews = (await getEditorialReviews()).slice(0, 6);

  // Pre-fetch photos for venue cards
  const photoMap = new Map<string, string>();
  await Promise.all(
    editorialReviews.map(async (r) => {
      const photo = await getVenuePhoto(r.venue.id);
      if (photo) photoMap.set(r.venue.id, photo);
    })
  );

  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <HeroSection />

        {/* Featured Review */}
        {featuredReview && <FeaturedReview review={featuredReview} />}

        {/* Latest Reviews */}
        {editorialReviews.length > 0 && (
          <section aria-labelledby="latest-reviews-heading" className="py-12">
            <h2
              id="latest-reviews-heading"
              className="font-display text-2xl sm:text-3xl font-bold mb-8"
            >
              Latest Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {editorialReviews.map((review) => (
                <VenueCard
                  key={review.id}
                  venue={review.venue}
                  excerpt={review.excerpt}
                  photoUrl={photoMap.get(review.venue.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Category Quick Links */}
        <CategoryLinks />

        {/* How It Works */}
        <HowItWorks />

        {/* Newsletter */}
        <div className="py-12">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
