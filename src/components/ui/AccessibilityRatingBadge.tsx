import { Check, Minus, X, HelpCircle } from "lucide-react";
import type { AccessibilityRating } from "@/types/database";
import { RATING_LABELS } from "@/types/database";
import { cn } from "@/lib/utils";

interface AccessibilityRatingBadgeProps {
  rating: AccessibilityRating;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const config: Record<AccessibilityRating, { icon: typeof Check; colorClass: string }> = {
  accessible: { icon: Check, colorClass: "text-rating-accessible" },
  partially_accessible: { icon: Minus, colorClass: "text-rating-partial" },
  not_accessible: { icon: X, colorClass: "text-rating-not-accessible" },
  not_yet_reviewed: { icon: HelpCircle, colorClass: "text-muted-foreground" },
};

const sizeClasses = {
  sm: { badge: "gap-1 text-xs", icon: "h-3.5 w-3.5", dot: "h-2 w-2" },
  md: { badge: "gap-1.5 text-sm", icon: "h-4 w-4", dot: "h-2.5 w-2.5" },
  lg: { badge: "gap-2 text-base", icon: "h-5 w-5", dot: "h-3 w-3" },
};

export function AccessibilityRatingBadge({
  rating,
  size = "md",
  className,
}: AccessibilityRatingBadgeProps) {
  const { icon: Icon, colorClass } = config[rating];
  const s = sizeClasses[size];
  const label = RATING_LABELS[rating];

  return (
    <span
      className={cn("inline-flex items-center font-semibold", colorClass, s.badge, className)}
      {...(size === "sm" ? { role: "img", "aria-label": `Accessibility rating: ${label}` } : {})}
    >
      <Icon className={s.icon} aria-hidden="true" />
      {size !== "sm" && <span>{label}</span>}
    </span>
  );
}
