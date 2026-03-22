"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: "sm" | "lg";
}

export function SearchBar({
  placeholder = "Search venues by name, category, or city...",
  className = "",
  size = "sm",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/venues?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const inputClasses = size === "lg"
    ? "pl-12 pr-4 py-4 text-lg"
    : "pl-10 pr-4 py-2.5 text-sm";

  const iconClasses = size === "lg"
    ? "left-4 h-5 w-5"
    : "left-3 h-4 w-4";

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Search venues" className={className}>
      <div className="relative">
        <Search
          className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${iconClasses}`}
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${inputClasses}`}
          aria-label="Search venues"
        />
      </div>
    </form>
  );
}
