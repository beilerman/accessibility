import Link from "next/link";
import {
  Utensils,
  Beer,
  Coffee,
  ShoppingBag,
  Building2,
  Ticket,
  Trees,
  MapPin,
} from "lucide-react";
import type { VenueCategory } from "@/types/database";
import { CATEGORY_LABELS } from "@/types/database";

const CATEGORIES: { key: VenueCategory; icon: typeof Utensils }[] = [
  { key: "restaurant", icon: Utensils },
  { key: "bar_brewery", icon: Beer },
  { key: "coffee_shop", icon: Coffee },
  { key: "retail", icon: ShoppingBag },
  { key: "hospital", icon: Building2 },
  { key: "entertainment", icon: Ticket },
  { key: "park_trail", icon: Trees },
  { key: "other", icon: MapPin },
];

export function CategoryLinks() {
  return (
    <section aria-labelledby="categories-heading" className="py-12">
      <h2
        id="categories-heading"
        className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center"
      >
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CATEGORIES.map(({ key, icon: Icon }) => (
          <Link
            key={key}
            href={`/venues?category=${key}`}
            className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-sm transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Icon
              className="h-7 w-7 text-accent"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-foreground text-center">
              {CATEGORY_LABELS[key]}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
