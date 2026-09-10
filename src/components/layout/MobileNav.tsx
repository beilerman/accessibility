"use client";

import Link from "next/link";
import { COMMUNITY_ENABLED } from "@/lib/catalog-mode";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  MapPin,
  Info,
  BookOpen,
  PenSquare,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
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
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
            pathname === "/venues"
              ? "bg-accent/10 text-accent font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          onClick={onClose}
        >
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Browse places
        </Link>
        <Link
          href="/sources"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
            pathname === "/sources"
              ? "bg-accent/10 text-accent font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          onClick={onClose}
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          Sources
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

        <Link
          href="/access-in-pictures"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-3 rounded-lg min-h-[44px] text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          Visual guide
        </Link>
        <Link
          href="/visitor-reports"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-3 rounded-lg min-h-[44px] text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          Visitor reports
        </Link>
        {/* Divider */}
        {COMMUNITY_ENABLED && <div className="h-px bg-border my-2" />}

        {COMMUNITY_ENABLED &&
          (user ? (
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
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
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
          ))}
      </div>
    </nav>
  );
}
