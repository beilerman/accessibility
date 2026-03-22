"use client";

import { useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import type { AccessibilityRating } from "@/types/database";
import { RATING_LABELS } from "@/types/database";

interface MapVenue {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  overall_rating: AccessibilityRating;
  city: string;
  state: string;
}

interface VenueMapProps {
  venues: MapVenue[];
  single?: boolean;
  className?: string;
}

const RATING_COLORS: Record<AccessibilityRating, string> = {
  accessible: "#2D8B4E",
  partially_accessible: "#D4A017",
  not_accessible: "#B53A3A",
  not_yet_reviewed: "#6B6B6B",
};

const CINCINNATI_CENTER = { lat: 39.1, lng: -84.51 };

export function VenueMap({ venues, single = false, className = "" }: VenueMapProps) {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleMarkerClick = useCallback((venueId: string) => {
    setSelectedVenueId((prev) => (prev === venueId ? null : venueId));
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedVenueId(null);
  }, []);

  if (!apiKey) {
    return (
      <div
        className={`rounded-xl border border-border overflow-hidden bg-muted flex items-center justify-center ${className}`}
        style={{ minHeight: single ? 240 : 400 }}
        aria-label="Venue locations map"
      >
        <div className="text-center text-muted-foreground px-4 py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-sm font-medium">Map requires Google Maps API key</p>
          <p className="text-xs mt-1">
            Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment
          </p>
        </div>
      </div>
    );
  }

  const center =
    single && venues.length === 1
      ? { lat: venues[0].latitude, lng: venues[0].longitude }
      : CINCINNATI_CENTER;

  const zoom = single ? 15 : 11;

  const selectedVenue = selectedVenueId
    ? venues.find((v) => v.id === selectedVenueId)
    : null;

  return (
    <div
      className={`rounded-xl border border-border overflow-hidden ${className}`}
      aria-label="Venue locations map"
    >
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          mapId="accessreview-venues"
          style={{ width: "100%", height: single ? 240 : 400 }}
          gestureHandling="cooperative"
          disableDefaultUI={false}
        >
          {venues.map((venue) => (
            <AdvancedMarker
              key={venue.id}
              position={{ lat: venue.latitude, lng: venue.longitude }}
              title={venue.name}
              onClick={() => handleMarkerClick(venue.id)}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: RATING_COLORS[venue.overall_rating],
                  border: "3px solid white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  cursor: "pointer",
                }}
                aria-label={`${venue.name} - ${RATING_LABELS[venue.overall_rating]}`}
              />
            </AdvancedMarker>
          ))}

          {selectedVenue && (
            <InfoWindow
              position={{
                lat: selectedVenue.latitude,
                lng: selectedVenue.longitude,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-1 max-w-[200px]">
                <h3 className="font-semibold text-sm text-gray-900">
                  {selectedVenue.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: RATING_COLORS[selectedVenue.overall_rating] }}>
                  {RATING_LABELS[selectedVenue.overall_rating]}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedVenue.city}, {selectedVenue.state}
                </p>
                <Link
                  href={`/venues/${selectedVenue.slug}`}
                  className="inline-block mt-1.5 text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  View details &rarr;
                </Link>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
