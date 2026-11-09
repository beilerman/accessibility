"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { COMMUNITY_ENABLED } from "@/lib/catalog-mode";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Menu, X, User, LogOut } from "lucide-react";
import { DarkModeToggle } from "@/components/shared/DarkModeToggle";
import { MobileNav } from "./MobileNav";
import { BrandMark } from "./BrandMark";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/venues", label: "Browse places" },
  { href: "/visitor-reports", label: "Visitor reports" },
  { href: "/access-in-pictures", label: "Visual guide" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = useMemo(
    () => (COMMUNITY_ENABLED ? createClient() : null),
    [],
  );
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    router.replace("/");
    router.refresh();
  }, [supabase, router]);

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
            {COMMUNITY_ENABLED && user && (
              <Link
                href="/submit"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors min-h-[44px] flex items-center"
              >
                Submit Review
              </Link>
            )}
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

            {COMMUNITY_ENABLED &&
              (user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/profile"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Your profile"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors min-h-[44px] flex items-center text-sm"
                >
                  Sign In
                </Link>
              ))}
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
      <MobileNav
        open={mobileNavOpen}
        onClose={closeMobileNav}
        user={user}
        onSignOut={handleSignOut}
      />
    </header>
  );
}
