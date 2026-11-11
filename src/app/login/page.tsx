import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community contributions",
  description:
    "Browse public-source accessibility information while community contributions are being prepared.",
};

export default function LoginPage() {
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
      <Link href="/venues" className="primary-button mt-6">
        Browse places
      </Link>
    </div>
  );
}
