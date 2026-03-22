import type { Metadata } from "next";
import Link from "next/link";
import { Search, LayoutGrid, Map as MapIcon } from "lucide-react";
import { filterVenues, searchVenues, getUniqueCities, getVenuePhoto } from "@/lib/data";
import type { AccessibilityRating } from "@/types/database";
import { VenueCard } from "@/components/venue/VenueCard";
import { VenueFilters } from "@/components/venue/VenueFilters";
import { SearchBar } from "@/components/layout/SearchBar";
import { VenueMap } from "@/components/venue/VenueMap";

export const metadata: Metadata = {
  title: "Browse Accessible Venues | AccessReview",
  description:
    "Search and filter accessible venues by category, city, accessibility rating, and features.",
};

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";
  const city = typeof params.city === "string" ? params.city : "";
  const rating = typeof params.rating === "string" ? params.rating : "";
  const features = typeof params.features === "string" ? params.features : "";
  const view = params.view === "map" ? "map" : "grid";

  const cities = await getUniqueCities();

  // Parse multi-value params
  const categoryList = category ? category.split(",").filter(Boolean) : [];
  const featureList = features ? features.split(",").filter(Boolean) : [];

  // Determine venues: start from search or full list, then apply filters
  let venues = q ? await searchVenues(q) : await filterVenues({});

  // Apply sidebar filters
  if (city) {
    venues = venues.filter((v) => v.city.toLowerCase() === city.toLowerCase());
  }
  if (rating) {
    venues = venues.filter((v) => v.overall_rating === rating);
  }
  if (categoryList.length > 0) {
    venues = venues.filter((v) => categoryList.includes(v.category));
  }
  if (featureList.length > 0) {
    const featureMatched = await filterVenues({ features: featureList });
    const featureMatchIds = new Set(featureMatched.map((v) => v.id));
    venues = venues.filter((v) => featureMatchIds.has(v.id));
  }

  // Pre-fetch photos
  const photoMap = new Map<string, string>();
  await Promise.all(
    venues.map(async (v) => {
      const photo = await getVenuePhoto(v.id);
      if (photo) photoMap.set(v.id, photo);
    })
  );

  // Build result count text
  let resultText: string;
  if (q) {
    resultText =
      venues.length === 1
        ? `1 venue matching "${q}"`
        : `${venues.length} venues matching "${q}"`;
  } else {
    resultText = venues.length === 1 ? "1 venue" : `${venues.length} venues`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Browse Venues
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find accessible venues near you. Filter by category, city, rating, and accessibility
          features.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8 max-w-2xl">
        <SearchBar size="lg" placeholder="Search venues by name, category, or city..." />
      </div>

      {/* Live region for result count */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {resultText}
      </div>

      {/* Result count + view toggle */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{resultText}</p>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1" role="radiogroup" aria-label="View mode">
          <Link
            href={(() => {
              const sp = new URLSearchParams();
              if (q) sp.set("q", q);
              if (category) sp.set("category", category);
              if (city) sp.set("city", city);
              if (rating) sp.set("rating", rating);
              if (features) sp.set("features", features);
              const qs = sp.toString();
              return `/venues${qs ? `?${qs}` : ""}`;
            })()}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors min-h-[36px] ${
              view === "grid"
                ? "bg-accent text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
            role="radio"
            aria-checked={view === "grid"}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Grid</span>
          </Link>
          <Link
            href={(() => {
              const sp = new URLSearchParams();
              sp.set("view", "map");
              if (q) sp.set("q", q);
              if (category) sp.set("category", category);
              if (city) sp.set("city", city);
              if (rating) sp.set("rating", rating);
              if (features) sp.set("features", features);
              return `/venues?${sp.toString()}`;
            })()}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors min-h-[36px] ${
              view === "map"
                ? "bg-accent text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
            role="radio"
            aria-checked={view === "map"}
            aria-label="Map view"
          >
            <MapIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Map</span>
          </Link>
        </div>
      </div>

      {/* Main layout: sidebar filters + card grid */}
      <div className="lg:flex lg:gap-8">
        {/* Filters: collapsible on mobile, sticky sidebar on desktop */}
        <VenueFilters cities={cities} />

        {/* Results */}
        <div className="flex-1 min-w-0">
          {venues.length > 0 ? (
            <>
              {/* Map view */}
              {view === "map" && (
                <VenueMap
                  venues={venues.map((v) => ({
                    id: v.id,
                    name: v.name,
                    slug: v.slug,
                    latitude: v.latitude,
                    longitude: v.longitude,
                    overall_rating: v.overall_rating,
                    city: v.city,
                    state: v.state,
                  }))}
                  className="mb-8"
                />
              )}

              {/* Card grid (always rendered for accessibility as text alternative) */}
              <div
                className={view === "map" ? "sr-only" : undefined}
                aria-hidden={view === "map" ? "false" : undefined}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} photoUrl={photoMap.get(venue.id)} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-16 text-center">
              <Search
                className="h-12 w-12 text-muted-foreground mb-4"
                aria-hidden="true"
              />
              <h2 className="text-lg font-semibold text-foreground mb-2">
                No venues match your filters
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Try adjusting your search terms or removing some filters to see more results.
              </p>
              <Link
                href="/venues"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Browse all venues
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
