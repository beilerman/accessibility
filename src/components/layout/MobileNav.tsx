"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MapPin, Info, Search, PenSquare, User, LogIn, LogOut } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
  onSignOut: () => void;
}

export function MobileNav({ open, onClose, user, onSignOut }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <nav
      id="mobile-nav"
      aria-label="Mobile navigation"
      className="md:hidden border-t border-border bg-background"
    >
      <div className="px-4 py-4 space-y-1">
        <Link
          href="/venues"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px]"
          onClick={onClose}
        >
          <Search className="h-5 w-5" aria-hidden="true" />
          Search Venues
        </Link>
        <Link
          href="/venues"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
            pathname === "/venues"
              ? "bg-accent/10 text-accent font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          onClick={onClose}
        >
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Browse Venues
        </Link>
        <Link
          href="/about"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
            pathname === "/about"
              ? "bg-accent/10 text-accent font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          onClick={onClose}
        >
          <Info className="h-5 w-5" aria-hidden="true" />
          About
        </Link>

        {/* Divider */}
        <div className="h-px bg-border my-2" />

        {user ? (
          <>
            <Link
              href="/submit"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-accent hover:bg-accent/10 transition-colors min-h-[44px] font-medium"
              onClick={onClose}
            >
              <PenSquare className="h-5 w-5" aria-hidden="true" />
              Submit Review
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px]"
              onClick={onClose}
            >
              <User className="h-5 w-5" aria-hidden="true" />
              Profile
            </Link>
            <button
              onClick={() => { onSignOut(); onClose(); }}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px] w-full text-left"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-accent hover:bg-accent/10 transition-colors min-h-[44px] font-medium"
            onClick={onClose}
          >
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
