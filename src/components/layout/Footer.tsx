import Link from "next/link";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-lg font-bold text-foreground">
              AccessReview
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Real accessibility reviews by real people with mobility challenges.
              Know before you go.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Navigate
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/venues" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse Venues
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Stay Updated
            </h2>
            <NewsletterSignup variant="compact" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AccessReview. Built for the mobility community.
          </p>
          <p className="text-xs text-muted-foreground">
            Greater Cincinnati &amp; Northern Kentucky
          </p>
        </div>
      </div>
    </footer>
  );
}
