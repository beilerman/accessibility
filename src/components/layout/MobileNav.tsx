"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  MapPin,
  Info,
  BookOpen,
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

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
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
      </div>
    </nav>
  );
}
