"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X as XIcon } from "lucide-react";
import type { VenuePhoto } from "@/types/database";

interface PhotoGalleryProps {
  photos: VenuePhoto[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const isOpen = lightboxIndex !== null;

  const openLightbox = useCallback(
    (index: number, button: HTMLButtonElement) => {
      triggerRef.current = button;
      setLightboxIndex(index);
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    // Return focus to the trigger button
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  // Keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Tab": {
          // Focus trap: cycle through close, prev, next
          e.preventDefault();
          const focusable = [closeRef.current, prevRef.current, nextRef.current].filter(
            (el): el is HTMLButtonElement => el !== null,
          );
          if (focusable.length === 0) return;
          const currentIndex = focusable.indexOf(
            document.activeElement as HTMLButtonElement,
          );
          const nextIndex = e.shiftKey
            ? (currentIndex - 1 + focusable.length) % focusable.length
            : (currentIndex + 1) % focusable.length;
          focusable[nextIndex].focus();
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox, goToPrev, goToNext]);

  // Focus the close button when lightbox opens
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={(e) => openLightbox(index, e.currentTarget)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 min-h-[44px]"
            aria-label={`View photo: ${photo.alt_text}`}
          >
            <Image
              src={photo.storage_path}
              alt={photo.alt_text}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, 33vw"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            aria-label="Close photo viewer"
          >
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-4 w-full max-w-5xl px-4">
            <button
              ref={prevRef}
              type="button"
              onClick={goToPrev}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full aspect-[16/10] max-h-[70vh]">
                <Image
                  src={currentPhoto.storage_path}
                  alt={currentPhoto.alt_text}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center max-w-lg">
                <p className="text-white text-sm">{currentPhoto.alt_text}</p>
                {currentPhoto.caption && (
                  <p className="text-white/70 text-xs mt-1">
                    {currentPhoto.caption}
                  </p>
                )}
                <p className="text-white/50 text-xs mt-2">
                  {lightboxIndex! + 1} of {photos.length}
                </p>
              </div>
            </div>

            <button
              ref={nextRef}
              type="button"
              onClick={goToNext}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
