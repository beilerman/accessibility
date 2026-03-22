import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getVenues } from "@/lib/data";
import { ReviewForm } from "@/components/review/ReviewForm";

export const metadata: Metadata = {
  title: "Submit a Review | AccessReview",
  description:
    "Share your accessibility experience. Submit a community review to help others know before they go.",
};

export default async function SubmitReviewPage() {
  const venues = await getVenues();

  const venueOptions = venues.map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
  }));

  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="py-4">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <span aria-current="page" className="text-foreground font-medium">
                Submit Review
              </span>
            </li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="py-8">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Submit a Review
          </h1>
          <p className="mt-2 text-muted-foreground">
            Share your accessibility experience to help others know before they go.
            All reviews are moderated before publishing.
          </p>
        </div>

        {/* Form */}
        <div className="pb-16">
          <ReviewForm venues={venueOptions} />
        </div>
      </div>
    </div>
  );
}
