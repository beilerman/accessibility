"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  RATING_LABELS,
  MOBILITY_DEVICE_LABELS,
} from "@/types/database";
import type { AccessibilityRating, MobilityDevice } from "@/types/database";
import { CheckCircle, AlertTriangle, XCircle, Upload, X, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VenueOption {
  id: string;
  name: string;
  slug: string;
}

interface ReviewFormProps {
  venues: VenueOption[];
}

interface PhotoPreview {
  file: File;
  url: string;
}

const RATABLE_OPTIONS: { value: AccessibilityRating; icon: typeof CheckCircle; colorClass: string; bgClass: string; borderClass: string }[] = [
  {
    value: "accessible",
    icon: CheckCircle,
    colorClass: "text-rating-accessible",
    bgClass: "bg-rating-accessible/10",
    borderClass: "border-rating-accessible",
  },
  {
    value: "partially_accessible",
    icon: AlertTriangle,
    colorClass: "text-rating-partial",
    bgClass: "bg-rating-partial/10",
    borderClass: "border-rating-partial",
  },
  {
    value: "not_accessible",
    icon: XCircle,
    colorClass: "text-rating-not-accessible",
    bgClass: "bg-rating-not-accessible/10",
    borderClass: "border-rating-not-accessible",
  },
];

export function ReviewForm({ venues }: ReviewFormProps) {
  // Form state
  const [venueId, setVenueId] = useState("");
  const [venueSearch, setVenueSearch] = useState("");
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [rating, setRating] = useState<AccessibilityRating | "">("");
  const [body, setBody] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [mobilityDevice, setMobilityDevice] = useState<MobilityDevice | "">("");
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedVenueSlug, setSubmittedVenueSlug] = useState("");

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const venueDropdownRef = useRef<HTMLDivElement>(null);
  const venueInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Filtered venues
  const filteredVenues = venueSearch.trim()
    ? venues.filter((v) =>
        v.name.toLowerCase().includes(venueSearch.toLowerCase())
      )
    : venues;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        venueDropdownRef.current &&
        !venueDropdownRef.current.contains(e.target as Node)
      ) {
        setShowVenueDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset highlighted index when filtered list changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [venueSearch]);

  const selectVenue = useCallback(
    (venue: VenueOption) => {
      setVenueId(venue.id);
      setVenueSearch(venue.name);
      setShowVenueDropdown(false);
      setHighlightedIndex(-1);
    },
    []
  );

  const handleVenueKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showVenueDropdown) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          setShowVenueDropdown(true);
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredVenues.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredVenues.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredVenues.length) {
            selectVenue(filteredVenues[highlightedIndex]);
          }
          break;
        case "Escape":
          setShowVenueDropdown(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [showVenueDropdown, highlightedIndex, filteredVenues, selectVenue]
  );

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const item = listboxRef.current.children[highlightedIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const handlePhotoSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newPhotos: PhotoPreview[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          newPhotos.push({ file, url: URL.createObjectURL(file) });
        }
      }
      setPhotos((prev) => [...prev, ...newPhotos]);

      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!venueId) {
      setError("Please select a venue.");
      return;
    }
    if (!rating) {
      setError("Please select an accessibility rating.");
      return;
    }
    if (body.trim().length < 50) {
      setError("Review must be at least 50 characters long.");
      return;
    }
    if (body.trim().length > 5000) {
      setError("Review must be 5000 characters or fewer.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("You must be signed in to submit a review. Please log in and try again.");
        setSubmitting(false);
        return;
      }

      // Insert review
      const { data: review, error: insertError } = await supabase
        .from("reviews")
        .insert({
          venue_id: venueId,
          author_id: user.id,
          is_editorial: false,
          body: body.trim(),
          overall_rating: rating,
          visit_date: visitDate || null,
          mobility_device_used: mobilityDevice || null,
          published: false,
          featured: false,
          status: "pending",
          helpful_count: 0,
        })
        .select("id")
        .single();

      if (insertError || !review) {
        throw new Error(insertError?.message ?? "Failed to create review.");
      }

      // Upload photos
      if (photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const ext = photo.file.name.split(".").pop() ?? "jpg";
          const storagePath = `${user.id}/${review.id}/${i}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from("review-images")
            .upload(storagePath, photo.file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            console.error("Photo upload failed:", uploadError.message);
            continue;
          }

          // Insert review_photos record
          await supabase.from("review_photos").insert({
            review_id: review.id,
            storage_path: storagePath,
            alt_text: `Review photo ${i + 1}`,
            sort_order: i,
          });
        }
      }

      // Find the venue slug for the success link
      const selectedVenue = venues.find((v) => v.id === venueId);
      setSubmittedVenueSlug(selectedVenue?.slug ?? "");
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rating-accessible/10">
            <CheckCircle className="h-6 w-6 text-rating-accessible" aria-hidden="true" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Review Submitted
          </h2>
          <p className="text-muted-foreground mb-6">
            Your review has been submitted and is pending moderation. Thank you for
            helping others know before they go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {submittedVenueSlug && (
              <Link
                href={`/venues/${submittedVenueSlug}`}
                className="inline-flex min-h-[44px] items-center rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                View Venue
              </Link>
            )}
            <Link
              href="/venues"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Browse Venues
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedVenueName = venues.find((v) => v.id === venueId)?.name;

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-card border border-border rounded-xl p-6 space-y-8"
      >
        {/* Error banner */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-rating-not-accessible/30 bg-rating-not-accessible/10 px-4 py-3 text-sm text-rating-not-accessible"
          >
            {error}
          </div>
        )}

        {/* Venue selector */}
        <div>
          <label
            htmlFor="venue-search"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Venue <span className="text-rating-not-accessible">*</span>
          </label>
          <div ref={venueDropdownRef} className="relative">
            <input
              ref={venueInputRef}
              id="venue-search"
              type="text"
              role="combobox"
              aria-expanded={showVenueDropdown}
              aria-controls="venue-listbox"
              aria-activedescendant={
                highlightedIndex >= 0
                  ? `venue-option-${highlightedIndex}`
                  : undefined
              }
              aria-autocomplete="list"
              autoComplete="off"
              placeholder="Search for a venue..."
              value={venueSearch}
              onChange={(e) => {
                setVenueSearch(e.target.value);
                setVenueId("");
                setShowVenueDropdown(true);
              }}
              onFocus={() => setShowVenueDropdown(true)}
              onKeyDown={handleVenueKeyDown}
              className={cn(
                "w-full min-h-[44px] rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                venueId ? "border-rating-accessible/50" : "border-border"
              )}
            />
            {venueId && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rating-accessible">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
              </span>
            )}

            {showVenueDropdown && (
              <ul
                ref={listboxRef}
                id="venue-listbox"
                role="listbox"
                className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-card shadow-lg"
              >
                {filteredVenues.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    No venues found
                  </li>
                ) : (
                  filteredVenues.map((venue, index) => (
                    <li
                      key={venue.id}
                      id={`venue-option-${index}`}
                      role="option"
                      aria-selected={highlightedIndex === index}
                      className={cn(
                        "cursor-pointer px-3 py-2 text-sm transition-colors",
                        highlightedIndex === index
                          ? "bg-accent/10 text-foreground"
                          : "text-foreground hover:bg-muted",
                        venue.id === venueId && "font-semibold"
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectVenue(venue);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {venue.name}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          {selectedVenueName && venueId && (
            <p className="mt-1 text-xs text-muted-foreground">
              Selected: {selectedVenueName}
            </p>
          )}
        </div>

        {/* Overall rating */}
        <fieldset>
          <legend className="block text-sm font-semibold text-foreground mb-3">
            Overall Accessibility Rating{" "}
            <span className="text-rating-not-accessible">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RATABLE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = rating === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors",
                    "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
                    isSelected
                      ? cn(opt.borderClass, opt.bgClass)
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => setRating(opt.value)}
                    className="sr-only"
                  />
                  <Icon
                    className={cn("h-6 w-6", opt.colorClass)}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isSelected ? opt.colorClass : "text-foreground"
                    )}
                  >
                    {RATING_LABELS[opt.value]}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Review body */}
        <div>
          <label
            htmlFor="review-body"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Your Review <span className="text-rating-not-accessible">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Describe your accessibility experience. What worked? What
            didn&apos;t? Be specific — your details help others.
          </p>
          <textarea
            id="review-body"
            rows={6}
            minLength={50}
            maxLength={5000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe the entrance, interior layout, bathroom accessibility, staff helpfulness..."
            className="w-full min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 resize-y"
          />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {body.length} / 5000 characters
            {body.length > 0 && body.length < 50 && (
              <span className="text-rating-not-accessible">
                {" "}(minimum 50)
              </span>
            )}
          </p>
        </div>

        {/* Visit date */}
        <div>
          <label
            htmlFor="visit-date"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Date of Visit
          </label>
          <input
            id="visit-date"
            type="date"
            value={visitDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          />
        </div>

        {/* Mobility device */}
        <div>
          <label
            htmlFor="mobility-device"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Mobility Device Used
          </label>
          <select
            id="mobility-device"
            value={mobilityDevice}
            onChange={(e) => setMobilityDevice(e.target.value as MobilityDevice | "")}
            className="w-full min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <option value="">Select a device (optional)</option>
            {(Object.entries(MOBILITY_DEVICE_LABELS) as [MobilityDevice, string][]).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>
        </div>

        {/* Photo upload */}
        <div>
          <span className="block text-sm font-semibold text-foreground mb-1.5">
            Photos
          </span>
          <p className="text-xs text-muted-foreground mb-3">
            Add photos of the entrance, interior, bathroom, or anything relevant.
            Photos make reviews more helpful.
          </p>

          {/* Photo previews */}
          {photos.length > 0 && (
            <div className="mb-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={photo.url}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={photo.url}
                    alt={`Upload preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoSelect}
            className="sr-only"
            id="photo-upload"
            aria-label="Upload photos"
          />
          <label
            htmlFor="photo-upload"
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
          >
            {photos.length > 0 ? (
              <>
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
                Add More Photos ({photos.length} selected)
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" aria-hidden="true" />
                Choose Photos
              </>
            )}
          </label>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              submitting
                ? "cursor-not-allowed bg-accent/50 text-white/70"
                : "bg-accent text-white hover:bg-accent/90"
            )}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              "Submit Review for Moderation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
