import type { Metadata } from "next";
import Link from "next/link";
import { findPlaces, places } from "@/lib/catalog";
import { PlaceCard } from "@/components/catalog/PlaceCard";
import { DirectorySearch } from "@/components/catalog/DirectorySearch";
export const metadata: Metadata = {
  title: "Browse local places",
  description:
    "Find source-linked access information in Northern Kentucky and Greater Cincinnati. Search by city, venue type, and information needs.",
};
export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = Object.fromEntries(
    ["q", "region", "city", "category", "domain"].map((k) => [
      k,
      typeof params[k] === "string" ? params[k] : "",
    ]),
  );
  const results = findPlaces(filters);
  return (
    <div className="page-shell pb-12 directory-hero">
      <p className="eyebrow">YOUR LOCAL ACCESS GUIDE</p>
      <h1 className="font-display text-4xl sm:text-5xl mt-3">
        Find your next place.
      </h1>
      <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
        Explore what venues publish about access and support. Each place shows
        its sources, known limitations, and the date we checked.
      </p>
      <DirectorySearch filters={filters} />
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <p role="status" aria-live="polite" className="font-semibold">
          {results.length} {results.length === 1 ? "place" : "places"} found{" "}
          <span className="font-normal text-muted-foreground">
            of {places.length} in the guide
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Official public websites · Firsthand reviews are marked
        </p>
      </div>
      <p className="text-sm text-muted-foreground mb-7">
        “Information about” includes support and restrictions. Missing
        information means unknown, not unavailable.
      </p>
      {results.length ? (
        <div className="place-grid">
          {results.map((p) => (
            <PlaceCard key={p.slug} place={p} />
          ))}
        </div>
      ) : (
        <section className="before-panel">
          <h2 className="font-display text-2xl">
            No places match these filters.
          </h2>
          <p>Try a broader area or fewer filters. Coverage is still growing.</p>
          <Link href="/venues" className="underline">
            Clear all filters
          </Link>
        </section>
      )}
    </div>
  );
}
