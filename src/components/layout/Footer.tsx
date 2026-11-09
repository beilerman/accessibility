import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell py-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div>
            <Link href="/" className="brand">
              <BrandMark />
              Threshold
            </Link>
            <p className="footer-tagline">
              Local access information, with sources you can follow.
              <br />
              Greater Cincinnati &amp; Northern Kentucky.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-12 gap-y-1 content-start"
          >
            <Link href="/venues">Browse places</Link>
            <Link href="/sources">Sources &amp; evidence</Link>
            <Link href="/visitor-reports">Visitor reports</Link>
            <Link href="/updates">Recent changes</Link>
            <Link href="/access-in-pictures">Visual guide</Link>
            <Link href="/accessibility">Using this site</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <p className="footer-note">
          Public website research and firsthand Threshold reviews · Confirm
          essential details with the venue before visiting.
        </p>
      </div>
    </footer>
  );
}
