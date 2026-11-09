import type { Metadata } from "next";
import {
  Fraunces,
  Atkinson_Hyperlegible_Next,
  JetBrains_Mono,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SITE_ORIGIN } from "@/lib/site";
import { SkipToContent } from "@/components/shared/SkipToContent";
import { FocusManager } from "@/components/shared/FocusManager";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Fraunces: a warm, soft serif for headings.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

// Atkinson Hyperlegible Next: designed by the Braille Institute so that
// easily confused letters stay distinct for low-vision readers.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Threshold | Local access information for Greater Cincinnati & Northern Kentucky",
    template: "%s | Threshold",
  },
  description:
    "Source-linked accessibility information for places in Greater Cincinnati and Northern Kentucky. Know before you go.",
  openGraph: {
    title: "Threshold",
    description: "Public-source access information for Greater Cincinnati & Northern Kentucky",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${atkinson.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipToContent />
          <FocusManager />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
