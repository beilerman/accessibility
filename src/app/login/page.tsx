import { COMMUNITY_ENABLED } from "@/lib/catalog-mode";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: COMMUNITY_ENABLED ? "Sign In" : "Community contributions",
  description: COMMUNITY_ENABLED
    ? "Sign in to Threshold to submit reviews and manage your profile."
    : "Browse public-source accessibility information while community contributions are being prepared.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  if (!COMMUNITY_ENABLED) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16">
        <h1 className="font-display text-3xl font-bold">Community contributions are not open yet</h1>
        <p className="mt-4 text-muted-foreground">
          You can browse Threshold without an account. Our current listings summarize
          publicly available venue information and link to the original sources.
        </p>
        <p className="mt-4 text-muted-foreground">
          Sign-in, personal profiles, and review submissions will open when our
          community review process is ready.
        </p>
        <Link href="/venues" className="inline-flex items-center mt-6 px-5 py-3 min-h-[44px] rounded-lg bg-accent text-white font-medium hover:bg-accent-hover">
          Browse places
        </Link>
      </div>
    );
  }

  const params = await searchParams;

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="text-foreground font-medium">
            Sign In
          </li>
        </ol>
      </nav>

      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold">Welcome</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to submit reviews and share your accessibility experiences.
        </p>
      </div>

      {params.error === "auth" && (
        <div role="alert" className="mb-6 text-sm text-rating-not-accessible bg-rating-not-accessible/10 p-3 rounded-lg text-center">
          Authentication failed. Please try again.
        </div>
      )}

      <AuthForm redirect={params.redirect} />
    </div>
  );
}
