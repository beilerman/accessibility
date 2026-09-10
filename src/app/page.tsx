import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Route, Ear, Coffee } from "lucide-react";
import { places, factCount, DOMAIN_LABELS } from "@/lib/catalog";
import { PlaceCard } from "@/components/catalog/PlaceCard";

export const metadata: Metadata = {
  title: "Know before you go — Greater Cincinnati & Northern Kentucky",
  description:
    "Explore source-linked accessibility information for places in Northern Kentucky and Greater Cincinnati. Mobility, sensory, planning and everyday needs.",
};
const icons = [Route, Ear, BookOpen, Coffee];
export default function Home() {
  const featured = [
    "newport-aquarium",
    "cincinnati-art-museum",
    "boone-county-public-library-walton-branch",
    "the-carnegie",
    "cincinnati-zoo-botanical-garden",
    "cincinnati-playhouse-in-the-park",
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
        <aside className="hero-note" aria-label="How to read this guide">
          <div className="door-mark" aria-hidden="true">
            <span />
          </div>
          <p className="eyebrow">A STARTING POINT FOR YOUR NEXT VISIT</p>
          <h2 className="font-display text-3xl mt-4">
            Details, with the source in sight.
          </h2>
          <p className="mt-4 leading-relaxed">
            Official website information, clearly dated. See the available
            support, the restrictions, and what still needs confirming.
          </p>
          <Link
            href="/sources"
            className="inline-flex items-center gap-2 underline min-h-11 mt-4"
          >
            How we use sources{" "}
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
