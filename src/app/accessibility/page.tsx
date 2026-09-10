import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Using this site" };
export default function Accessibility() {
  return (
    <div className="page-shell reading-page">
      <p className="eyebrow">USING THRESHOLD</p>
      <h1 className="font-display text-5xl">Built to be easier to use.</h1>
      <p className="text-xl">
        Browse as a text directory, search with the keyboard, and open sources
        without creating an account.
      </p>
      <h2>Available features</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>A skip link takes you to the main content.</li>
        <li>Search and filters use labeled, native form controls.</li>
        <li>Light and dark themes follow your preference.</li>
        <li>Reduced-motion preferences are respected.</li>
        <li>
          Access information is written in text; no map interaction is required.
        </li>
      </ul>
      <h2>Work still to do</h2>
      <p>
        Automated checks are only one part of accessibility testing. A complete
        manual assistive-technology review and disability-community usability
        sessions remain part of the beta plan. This page is not a certification
        of conformance.
      </p>
      <p>
        Community reports and a dedicated feedback channel are not open yet. For
        a venue-specific need, use the official website linked on its place
        page.
      </p>
      <Link href="/venues" className="primary-button">
        Browse the text directory
      </Link>
    </div>
  );
}
