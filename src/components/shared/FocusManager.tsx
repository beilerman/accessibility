"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function FocusManager() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    // Preserve the normal tab order on initial load; move focus only after navigation.
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const main = document.getElementById("main-content");
    if (main) {
      main.focus({ preventScroll: false });
    }
  }, [pathname]);

  return null;
}
