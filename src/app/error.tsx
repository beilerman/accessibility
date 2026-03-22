"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <AlertTriangle className="h-12 w-12 text-rating-not-accessible mx-auto mb-4" aria-hidden="true" />
      <h1 className="font-display text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground text-lg mb-8">
        We encountered an error loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors min-h-[44px]"
      >
        <RefreshCw className="h-5 w-5" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
