import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Route, Ear, Coffee } from "lucide-react";
import { places, factCount, DOMAIN_LABELS } from "@/lib/catalog";
import { PlaceCard } from "@/components/catalog/PlaceCard";
import { illustrations } from "@/lib/media";
import { AccessIllustration } from "@/components/catalog/AccessIllustration";
import Image from "next/image";
import { categoryArt } from "@/lib/media";
import { teamReviews } from "@/lib/team-reviews";

export const metadata: Metadata = {
  title: "Know before you go — Greater Cincinnati & Northern Kentucky",
  description:
    "Explore source-linked accessibility information for places in Northern Kentucky and Greater Cincinnati. Mobility, sensory, planning and everyday needs.",
};
const icons = [Route, Ear, BookOpen, Coffee];
export default function Home() {
  const reviewed = places.filter((p) =>
    teamReviews.some((r) => r.placeSlug === p.slug),
  );
  const featured = [
    "newport-aquarium",
    "cincinnati-art-museum",
    "cincinnati-museum-center",
    "the-carnegie",
    "cincinnati-music-hall",
    "bb-riverboats",
  ].flatMap((slug) => places.filter((p) => p.slug === slug));
  return (
    <div className="page-shell">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">GREATER CINCINNATI + NORTHERN KENTUCKY</p>
          <h1 className="font-display">
            A little more certainty.
            <br />
            <em>Before you go.</em>
          </h1>
          <p className="hero-description">
            Find the details that make an outing possible. Explore what local
            places publish about getting around, sensory support, and taking a
            break.
          </p>
          <form
            action="/venues"
            role="search"
            aria-label="Search local places"
            className="hero-search"
          >
            <label htmlFor="home-search" className="sr-only">
              Search places or access details
            </label>
            <input
              id="home-search"
              name="q"
              type="search"
              placeholder="A place, a city, or an access detail…"
            />
            <button className="primary-button" type="submit">
              Explore <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            No account needed. Every access note links to its source.
          </p>
        </div>
        <aside className="hero-visual" aria-label="Illustrated access guide">
          {illustrations[0] && <AccessIllustration item={illustrations[0]} />}
          <h2 className="font-display text-2xl mt-5">
            Small details. Better questions.
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            See examples of access features and learn what to confirm before a
            visit.
          </p>
          <Link
            href="/access-in-pictures"
            className="inline-flex items-center gap-2 underline min-h-11 mt-4"
          >
            Explore the visual guide{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </aside>
      </section>
      <div className="catalog-stats" aria-label="Directory coverage">
        <p>
          <strong>{places.length}</strong> places to explore
        </p>
        <p>
          <strong>{factCount}</strong> source-linked access notes
        </p>
        <p>
          <strong>2</strong> sides of the river
        </p>
        <p>
          <strong>0</strong> field audits so far
        </p>
      </div>
      <section
        className="py-12 border-b border-border"
        aria-labelledby="needs-heading"
      >
        <p className="eyebrow">START WITH WHAT MATTERS TO YOU</p>
        <h2 id="needs-heading" className="font-display text-3xl mt-3">
          What would you like to know?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
          {Object.entries(DOMAIN_LABELS).map(([k, v], i) => {
            const Icon = icons[i];
            return (
              <Link key={k} href={`/venues?domain=${k}`} className="need-link">
                <Icon aria-hidden="true" className="h-6 w-6 text-accent mb-5" />
                <span>{v}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 mt-4" />
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-5">
          These filters find published information. They do not decide whether a
          place will work for you.
        </p>
      </section>
      <section
        className="py-12 border-b border-border"
        aria-labelledby="categories-heading"
      >
        <p className="eyebrow">MAKE A DAY OF IT</p>
        <h2 id="categories-heading" className="font-display text-3xl mt-3">
          Find your kind of place.
        </h2>
        <div className="category-tiles mt-7">
          {categoryArt.map((item) => (
            <Link
              key={item.category}
              href={`/venues?category=${encodeURIComponent(item.category)}`}
              className="category-tile"
              aria-label={`Explore ${item.category}`}
            >
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt=""
                sizes="(max-width: 700px) 45vw, 230px"
              />
              <span className="font-semibold block px-4 pt-4">
                {item.category}
              </span>
              <span className="block px-4 pb-4 pt-1 text-xs text-muted-foreground">
                AI category artwork
              </span>
            </Link>
          ))}
        </div>
      </section>
      {reviewed.length > 0 && (
        <section className="py-12" aria-labelledby="reviewed-heading">
          <p className="eyebrow">WHERE WE&apos;VE BEEN</p>
          <h2 id="reviewed-heading" className="font-display text-3xl mt-3">
            Firsthand Threshold reviews
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed">
            Places our team has visited and written up, shown alongside what
            each venue publishes.
          </p>
          <div className="place-grid mt-8">
            {reviewed.map((p) => (
              <PlaceCard key={p.slug} place={p} />
            ))}
          </div>
        </section>
      )}
      <section className="py-12" aria-labelledby="explore-heading">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <p className="eyebrow">CLOSE TO HOME</p>
            <h2 id="explore-heading" className="font-display text-3xl mt-3">
              A few places to start
            </h2>
          </div>
          <Link
            href="/venues"
            className="inline-flex gap-2 items-center underline min-h-11"
          >
            Browse all {places.length} places{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="place-grid">
          {featured.map((p) => (
            <PlaceCard key={p.slug} place={p} />
          ))}
        </div>
      </section>
      <section className="before-panel mb-14">
        <h2 className="font-display text-2xl">The last step is yours.</h2>
        <p>
          Conditions can change. Read the linked venue guidance and contact the
          venue about anything essential to your visit. A published policy is a
          starting point, not an on-site assessment.
        </p>
      </section>
    </div>
  );
}
