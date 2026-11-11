"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Search, Menu, X } from "lucide-react";
import { DarkModeToggle } from "@/components/shared/DarkModeToggle";
import { MobileNav } from "./MobileNav";
import { BrandMark } from "./BrandMark";

const navLinks = [
  { href: "/venues", label: "Browse places" },
  { href: "/visitor-reports", label: "Visitor reports" },
  { href: "/access-in-pictures", label: "Visual guide" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  return (
    <header className="site-header">
      <div className="page-shell">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="brand">
            <BrandMark />
            Threshold
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                aria-current={
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "page"
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/venues"
              className="icon-button"
              aria-label="Search places"
            >
              <Search className="h-5 w-5" />
            </Link>
            <DarkModeToggle />

          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="icon-button"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
            >
              {mobileNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <MobileNav open={mobileNavOpen} onClose={closeMobileNav} />
    </header>
  );
}
