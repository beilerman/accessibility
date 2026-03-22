import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to AccessReview to submit reviews and manage your profile.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
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
