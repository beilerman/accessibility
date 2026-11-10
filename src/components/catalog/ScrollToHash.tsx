"use client";

import { useEffect } from "react";

/**
 * Links from Recent changes point at a single note (/venues/x#note-id).
 * On a client-side navigation the previous page's scroll position can win
 * over the anchor, so scroll to the target once this page has mounted.
 */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ block: "start" }),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}
