import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Route, Ear, Coffee } from "lucide-react";
import { places, factCount, DOMAIN_LABELS } from "@/lib/catalog";
import { PlaceCard } from "@/components/catalog/PlaceCard";
import { illustrations, photoForPlace } from "@/lib/media";
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
const heroSlugs = [
  "cincinnati-music-hall",
  "cincinnati-museum-center",
  "southgate-house-revival",
];
const quickSearches = ["wheelchair", "elevator", "sensory", "parking"];

export default function Home() {
  const reviewed = places.filter((p) =>
    teamReviews.some((r) => r.placeSlug === p.slug),
  );
  const heroPlaces = heroSlugs.flatMap((slug) => {
    const place = places.find((p) => p.slug === slug);
    const photo = photoForPlace(slug);
    return place && photo ? [{ place, photo }] : [];
  });
  const featured = [
    "newport-aquarium",
    "cincinnati-art-museum",
    "ark-encounter",
    "the-carnegie",
    "krohn-conservatory",
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
          <p className="hero-chips">
            <span>Try:</span>
            {quickSearches.map((q) => (
              <Link key={q} href={`/venues?q=${q}`}>
                {q}
              </Link>
            ))}
          </p>
          <p className="text-sm text-muted-foreground mt-5">
            No account needed. Every access note links to its source.
          </p>
        </div>
        <div className="hero-visual">
          <div className="arch-trio">
            {heroPlaces.map(({ place, photo }) => (
              <Link
                key={place.slug}
                href={`/venues/${place.slug}`}
                className="arch"
              >
                <span className="arch-frame">
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    sizes="(max-width: 700px) 30vw, 200px"
                    priority
                  />
                </span>
                <span className="arch-label">{place.name}</span>
                <span className="arch-city">
                  {place.city}, {place.state}
                </span>
              </Link>
            ))}
          </div>
          <p className="arch-credits">
            Photos:{" "}
            {heroPlaces.map(({ photo }, i) => (
              <span key={photo.slug}>
                {i > 0 && " · "}
                <a
                  href={photo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.author}
                  <span className="sr-only"> (photo source opens in new tab)</span>
                </a>{" "}
                ({photo.license})
              </span>
            ))}
            . Cropped to fit; full frames are on each place page.
          </p>
        </div>
      </section>
      <div className="catalog-stats" aria-label="Directory coverage">
        <p>
          <strong>{places.length}</strong> places to explore
        </p>
        <p>
          <strong>{factCount}</strong> source-linked access notes
        </p>
        <p>
          <strong>{teamReviews.length}</strong> firsthand Threshold reviews
        </p>
        <p>
          <strong>2</strong> sides of the river
        </p>
      </div>
      <section className="home-section" aria-labelledby="needs-heading">
        <p className="eyebrow">START WITH WHAT MATTERS TO YOU</p>
        <h2 id="needs-heading" className="font-display text-4xl mt-3">
          What would you like to know?
        </h2>
        <div className="need-grid">
          {Object.entries(DOMAIN_LABELS).map(([k, v], i) => {
            const Icon = icons[i];
            return (
              <Link key={k} href={`/venues?domain=${k}`} className="need-link">
                <span className="need-icon">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <span>{v}</span>
                <span className="need-more">
                  <span className="need-more-text">See places</span>{" "}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-5">
          These filters find published information. They do not decide whether a
          place will work for you.
        </p>
      </section>
      {reviewed.length > 0 && (
        <section className="reviewed-band" aria-labelledby="reviewed-heading">
          <p className="eyebrow">WHERE WE&apos;VE BEEN</p>
          <h2 id="reviewed-heading" className="font-display text-4xl mt-3">
            Firsthand Threshold reviews
          </h2>
          <p className="section-lede">
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
      <section className="home-section" aria-labelledby="categories-heading">
        <p className="eyebrow">MAKE A DAY OF IT</p>
        <h2 id="categories-heading" className="font-display text-4xl mt-3">
          Find your kind of place.
        </h2>
        <div className="category-tiles">
          {categoryArt.map((item) => {
            const count = places.filter(
              (p) => p.category === item.category,
            ).length;
            return (
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
                  sizes="(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 200px"
                />
                <span className="category-tile-name">{item.category}</span>
                <span className="category-tile-count">
                  {count} {count === 1 ? "place" : "places"}
                </span>
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Category artwork is AI-generated and does not show real venues.
        </p>
      </section>
      <section className="home-section" aria-labelledby="explore-heading">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <p className="eyebrow">CLOSE TO HOME</p>
            <h2 id="explore-heading" className="font-display text-4xl mt-3">
              A few places to start
            </h2>
          </div>
          <Link
            href="/venues"
            className="inline-flex gap-2 items-center underline underline-offset-4 font-semibold min-h-11"
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
      <section className="guide-band" aria-labelledby="guide-heading">
        <div>
          <p className="eyebrow">THE VISUAL GUIDE</p>
          <h2 id="guide-heading" className="font-display text-4xl mt-3">
            Small details. Better questions.
          </h2>
          <p className="mt-4">
            See examples of access features and learn what to confirm before a
            visit.
          </p>
          <Link href="/access-in-pictures" className="guide-cta">
            Explore the visual guide{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        {illustrations[0] && <AccessIllustration item={illustrations[0]} />}
      </section>
      <section className="before-panel my-14">
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
