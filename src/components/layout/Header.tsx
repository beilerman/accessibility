"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Menu, X, User, LogOut } from "lucide-react";
import { DarkModeToggle } from "@/components/shared/DarkModeToggle";
import { MobileNav } from "./MobileNav";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/venues", label: "Browse Venues" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-foreground hover:text-accent transition-colors"
          >
            <span aria-hidden="true" className="text-accent text-2xl">&#9899;</span>
            AccessReview
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/submit"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors min-h-[44px] flex items-center"
              >
                Submit Review
              </Link>
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/venues"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Search venues"
            >
              <Search className="h-5 w-5" />
            </Link>
            <DarkModeToggle />

            {user ? (
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
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
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
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} user={user} onSignOut={handleSignOut} />
    </header>
  );
}
