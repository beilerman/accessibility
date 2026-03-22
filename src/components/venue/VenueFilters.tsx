"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { VenueCategory, AccessibilityRating } from "@/types/database";
import { CATEGORY_LABELS, RATING_LABELS } from "@/types/database";

const FEATURE_OPTIONS = [
  { value: "accessible_parking", label: "Accessible Parking" },
  { value: "automatic_door", label: "Automatic Door" },
  { value: "accessible_bathroom", label: "Accessible Bathroom" },
  { value: "scooter_friendly", label: "Scooter Friendly" },
  { value: "elevator", label: "Elevator" },
  { value: "scooter_charging", label: "Scooter Charging" },
] as const;

const RATING_OPTIONS: AccessibilityRating[] = [
  "accessible",
  "partially_accessible",
  "not_accessible",
  "not_yet_reviewed",
];

interface VenueFiltersProps {
  cities: string[];
}

export function VenueFilters({ cities }: VenueFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const selectedCity = searchParams.get("city") ?? "";
  const selectedRating = searchParams.get("rating") ?? "";
  const selectedFeatures = searchParams.get("features")?.split(",").filter(Boolean) ?? [];

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const handleCategoryChange = useCallback(
    (category: string, checked: boolean) => {
      let next: string[];
      if (checked) {
        next = [...selectedCategories, category];
      } else {
        next = selectedCategories.filter((c) => c !== category);
      }
      updateParams("category", next.join(","));
    },
    [selectedCategories, updateParams],
  );

  const handleFeatureChange = useCallback(
    (feature: string, checked: boolean) => {
      let next: string[];
      if (checked) {
        next = [...selectedFeatures, feature];
      } else {
        next = selectedFeatures.filter((f) => f !== feature);
      }
      updateParams("features", next.join(","));
    },
    [selectedFeatures, updateParams],
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedCity !== "" ||
    selectedRating !== "" ||
    selectedFeatures.length > 0;

  const filterContent = (
    <>
      {/* Category multi-select */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">Category</legend>
        <div className="space-y-1">
          {(Object.entries(CATEGORY_LABELS) as [VenueCategory, string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2.5 min-h-[44px] px-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedCategories.includes(value)}
                  onChange={(e) => handleCategoryChange(value, e.target.checked)}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>

      {/* City dropdown */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">City</legend>
        <select
          value={selectedCity}
          onChange={(e) => updateParams("city", e.target.value)}
          aria-label="Filter by city"
          className="w-full min-h-[44px] px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </fieldset>

      {/* Accessibility rating radio group */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Accessibility Rating
        </legend>
        <div className="space-y-1">
          <label className="flex items-center gap-2.5 min-h-[44px] px-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
            <input
              type="radio"
              name="rating"
              value=""
              checked={selectedRating === ""}
              onChange={() => updateParams("rating", "")}
              className="h-4 w-4 border-border text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-sm text-foreground">Any rating</span>
          </label>
          {RATING_OPTIONS.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2.5 min-h-[44px] px-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={() => updateParams("rating", rating)}
                className="h-4 w-4 border-border text-accent focus:ring-accent focus:ring-offset-0"
              />
              <span className="text-sm text-foreground">{RATING_LABELS[rating]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Feature checkboxes */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Accessibility Features
        </legend>
        <div className="space-y-1">
          {FEATURE_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-2.5 min-h-[44px] px-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={value}
                checked={selectedFeatures.includes(value)}
                onChange={(e) => handleFeatureChange(value, e.target.checked)}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
              />
              <span className="text-sm text-foreground">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Clear all */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-1.5 min-h-[44px] w-full justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Clear all filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="venue-filters-mobile"
          className="flex items-center gap-2 min-h-[44px] w-full justify-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          {mobileOpen ? "Hide Filters" : "Show Filters"}
          {hasFilters && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
              {selectedCategories.length + (selectedCity ? 1 : 0) + (selectedRating ? 1 : 0) + selectedFeatures.length}
            </span>
          )}
        </button>
        {mobileOpen && (
          <aside
            id="venue-filters-mobile"
            aria-label="Filters"
            className="mt-3 space-y-6 rounded-xl border border-border bg-card p-5"
          >
            {filterContent}
          </aside>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside
        aria-label="Filters"
        className="hidden lg:block w-[280px] shrink-0 sticky top-24 self-start space-y-6 rounded-xl border border-border bg-card p-5 max-h-[calc(100vh-7rem)] overflow-y-auto"
      >
        <h2 className="text-base font-bold text-foreground">Filters</h2>
        {filterContent}
      </aside>
    </>
  );
}
