import type { Metadata } from "next";
import Link from "next/link";
import { illustrations } from "@/lib/media";
import { AccessIllustration } from "@/components/catalog/AccessIllustration";
import { AccessMedia } from "@/components/catalog/AccessMedia";

export const metadata: Metadata = {
  title: "Access in pictures",
  description:
    "Venue access photographs and official photo walkthroughs, with dates, credits and illustrated explanations of common access features.",
};

export default function AccessInPictures() {
  return (
    <div className="page-shell py-14">
      <p className="eyebrow">A VISUAL GUIDE</p>
      <h1 className="font-display text-4xl sm:text-5xl mt-4">
        See the detail. Know what to ask.
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mt-6 leading-relaxed">
        Explore photographs of local places and the visual guides their
        operators publish to help you prepare for a visit.
      </p>
      <AccessMedia />
      <h2 className="font-display text-3xl mt-12">Illustrated access features</h2>
      <p className="mt-4 max-w-3xl leading-relaxed">
        These AI illustrations explain common features in example settings.
        Each highlights visible details and questions to ask before a visit.
      </p>
      <div className="mt-12 space-y-16">
        {illustrations.map((item) => (
          <section
            key={item.id}
            id={item.id}
            className="visual-guide-section"
            aria-labelledby={`guide-${item.id}`}
          >
            <div>
              <h2
                id={`guide-${item.id}`}
                className="font-display text-3xl mt-3 mb-6"
              >
                {item.title}
              </h2>
              <AccessIllustration item={item} />
            </div>
            <div className="guide-questions">
              <h3 className="font-semibold text-xl">Features shown</h3>
              <ul className="list-disc pl-5 space-y-3 mt-4">
                {item.shown.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <h3 className="font-semibold text-xl mt-8">
                Before you visit, ask
              </h3>
              <ul className="list-disc pl-5 space-y-3 mt-4">
                {item.confirm.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              <a
                className="source-link mt-5"
                href={item.guidanceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the underlying guidance
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </section>
        ))}
      </div>
      <div className="before-panel my-12">
        <h2 className="font-display text-2xl">
          Find the facts for your destination.
        </h2>
        <p>
          Our place pages link each access note to its source. Actual venue
          photographs carry their own author, license and date; the
          illustrations here are teaching examples.
        </p>
        <Link
          className="underline min-h-11 inline-flex items-center"
          href="/venues"
        >
          Browse local places
        </Link>
      </div>
    </div>
  );
}
