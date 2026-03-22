import { Bike, Armchair, Zap, Footprints, Baby, HelpCircle, CircleDot } from "lucide-react";
import type { MobilityTip, MobilityType } from "@/types/database";

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

const MOBILITY_TYPE_ICONS: Record<MobilityType, typeof Bike> = {
  scooter: Bike,
  manual_wheelchair: Armchair,
  power_wheelchair: Zap,
  walker: Footprints,
  cane: CircleDot,
  gait_disorder: Footprints,
  temporary_injury: HelpCircle,
  stroller: Baby,
  other: HelpCircle,
};

interface MobilityTipsProps {
  tips: MobilityTip[];
}

export function MobilityTips({ tips }: MobilityTipsProps) {
  // Group tips by mobility_type
  const grouped = new Map<MobilityType, MobilityTip[]>();
  for (const tip of tips) {
    const existing = grouped.get(tip.mobility_type) ?? [];
    existing.push(tip);
    grouped.set(tip.mobility_type, existing);
  }

  return (
    <div className="space-y-5">
      {Array.from(grouped.entries()).map(([type, typeTips]) => {
        const Icon = MOBILITY_TYPE_ICONS[type];
        const label = MOBILITY_TYPE_LABELS[type];

        return (
          <div key={type}>
            <div className="flex items-center gap-2 mb-2">
              <Icon
                className="h-5 w-5 text-accent shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-sm text-foreground">
                {label}
              </h3>
            </div>
            <ul className="space-y-2 pl-7" role="list">
              {typeTips.map((tip) => (
                <li
                  key={tip.id}
                  className="text-sm text-muted-foreground relative before:content-[''] before:absolute before:-left-4 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/40"
                >
                  {tip.tip}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
