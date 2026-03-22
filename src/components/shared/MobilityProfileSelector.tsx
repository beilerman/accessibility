"use client";

import { cn } from "@/lib/utils";
import type { MobilityType } from "@/types/database";

const MOBILITY_TYPE_LABELS: Record<MobilityType, string> = {
  scooter: "Mobility Scooter",
  manual_wheelchair: "Manual Wheelchair",
  power_wheelchair: "Power Wheelchair",
  walker: "Walker",
  cane: "Cane",
  gait_disorder: "Gait Disorder",
  temporary_injury: "Temporary Injury",
  stroller: "Stroller",
  other: "Other",
};

const MOBILITY_TYPES = Object.keys(MOBILITY_TYPE_LABELS) as MobilityType[];

interface MobilityProfileSelectorProps {
  value: string[];
  onChange: (values: string[]) => void;
}

export function MobilityProfileSelector({
  value,
  onChange,
}: MobilityProfileSelectorProps) {
  function toggle(type: string) {
    if (value.includes(type)) {
      onChange(value.filter((v) => v !== type));
    } else {
      onChange([...value, type]);
    }
  }

  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground mb-2">
        Mobility Profile
      </legend>
      <p className="text-sm text-muted-foreground mb-3">
        Select all that apply to you.
      </p>
      <div className="flex flex-wrap gap-2">
        {MOBILITY_TYPES.map((type) => {
          const selected = value.includes(type);
          return (
            <label
              key={type}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm cursor-pointer transition-colors min-h-[44px]",
                selected
                  ? "bg-accent/10 text-accent border-accent"
                  : "bg-card border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggle(type)}
                className="sr-only"
                aria-label={MOBILITY_TYPE_LABELS[type]}
              />
              <span aria-hidden="true">
                {selected ? "✓ " : ""}
              </span>
              {MOBILITY_TYPE_LABELS[type]}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
