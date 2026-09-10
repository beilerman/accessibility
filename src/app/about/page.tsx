import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "About Threshold" };
export default function About() {
  return (
    <div className="page-shell reading-page">
      <p className="eyebrow">ABOUT THRESHOLD</p>
      <h1 className="font-display text-5xl">A more informed way out.</h1>
      <p className="text-xl">
        Threshold helps people plan visits across Northern Kentucky and Greater
        Cincinnati with practical, source-linked accessibility information.
      </p>
      <h2>Facts you can follow</h2>
      <p>
        We collect concise notes from official venue, library, park, and
        government websites. Each note links to its source. We include
        restrictions and uncertainty alongside available support.
      </p>
      <p>
        This directory combines official public website research with a separate
        collection of attributed visitor reports from external sources. It has
        no Threshold field audits or verified organization submissions. A public
        policy or another person’s experience does not confirm what you will
        experience on the day.
      </p>
      <h2>Different needs, useful details</h2>
      <p>
        Explore mobility, sensory and communication support, advance planning,
        and rest or everyday needs. You choose what matters for your visit; the
        site does not assign a universal accessibility score.
      </p>
      <h2>What comes next</h2>
      <p>
        Field visits, disability-community feedback, and a reviewed contribution
        process are the next steps. Community accounts are not open yet.
        Browsing does not require an account or a disability profile.
      </p>
      <div className="flex flex-wrap gap-5">
        <Link href="/venues" className="primary-button">
          Explore places
        </Link>
        <Link
          href="/sources"
          className="underline min-h-11 inline-flex items-center"
        >
          Read our source approach
        </Link>
      </div>
    </div>
  );
}
