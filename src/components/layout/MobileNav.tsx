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
  MessageSquareText,
  Images,
  History,
} from "lucide-react";

const mobileLinks = [
  { href: "/venues", label: "Browse places", Icon: MapPin },
  { href: "/visitor-reports", label: "Visitor reports", Icon: MessageSquareText },
  { href: "/access-in-pictures", label: "Visual guide", Icon: Images },
  { href: "/sources", label: "Sources", Icon: BookOpen },
  { href: "/updates", label: "Recent changes", Icon: History },
  { href: "/about", label: "About", Icon: Info },
];
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
        {mobileLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            aria-current={pathname === href ? "page" : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors min-h-[48px] text-lg ${
              pathname === href
                ? "bg-accent-soft text-foreground font-bold"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
            {label}
          </Link>
        ))}
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
