"use client";

import { Mail } from "lucide-react";

export function NewsletterSignup({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
        <a
          href="https://substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-accent hover:text-accent-hover underline"
        >
          Subscribe to our newsletter
        </a>
      </div>
    );
  }

  return (
    <section aria-labelledby="newsletter-heading" className="bg-muted rounded-2xl p-8 text-center">
      <Mail className="h-8 w-8 text-accent mx-auto mb-4" aria-hidden="true" />
      <h2 id="newsletter-heading" className="font-display text-2xl font-bold mb-2">
        Stay in the loop
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Get weekly accessibility reviews, practical tips, and venue updates delivered to your inbox.
      </p>
      <a
        href="https://substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors min-h-[44px]"
      >
        Subscribe on Substack
      </a>
    </section>
  );
}
