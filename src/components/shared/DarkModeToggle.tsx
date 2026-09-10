"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Toggle dark mode"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-muted hover:bg-border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}
