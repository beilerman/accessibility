import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-muted-foreground text-lg mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/venues"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors min-h-[44px]"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
          Search Venues
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-border transition-colors min-h-[44px]"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
