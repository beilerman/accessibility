import {
  Car,
  DoorOpen,
  LayoutGrid,
  Bath,
  Bike,
  Check,
  X,
  Users,
  Volume2,
  Sun,
} from "lucide-react";
import type { VenueAccessibilityDetails } from "@/types/database";
import { formatDate } from "@/lib/utils";

interface AccessibilityDetailCardProps {
  details: VenueAccessibilityDetails;
}

function BooleanField({
  label,
  value,
}: {
  label: string;
  value: boolean | undefined;
}) {
  if (value === undefined) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      {value ? (
        <Check className="h-4 w-4 text-rating-accessible shrink-0" aria-hidden="true" />
      ) : (
        <X className="h-4 w-4 text-rating-not-accessible shrink-0" aria-hidden="true" />
      )}
      <span className="text-foreground">{label}</span>
      <span className="sr-only">{value ? "Yes" : "No"}</span>
    </div>
  );
}

function TextField({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium capitalize">
        {value.replace(/_/g, " ")}
      </span>
    </div>
  );
}

function NotesField({ notes }: { notes: string | undefined }) {
  if (!notes) return null;
  return <p className="text-sm italic text-muted-foreground mt-2">{notes}</p>;
}

function DetailSection({
  icon: Icon,
  title,
  children,
  defaultOpen,
}: {
  icon: typeof Car;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex items-center gap-2 cursor-pointer list-none min-h-[44px] py-2 px-1 rounded-lg hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
        <Icon className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
        <span className="font-semibold text-sm text-foreground flex-1">
          {title}
        </span>
        <span
          className="text-muted-foreground transition-transform group-open:rotate-90"
          aria-hidden="true"
        >
          &#9654;
        </span>
      </summary>
      <div className="pl-7 pb-3 space-y-2">{children}</div>
    </details>
  );
}

export function AccessibilityDetailCard({
  details,
}: AccessibilityDetailCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-display text-lg font-bold mb-4">
        Accessibility Details
      </h3>

      <div className="divide-y divide-border">
        {/* Parking */}
        <DetailSection icon={Car} title="Parking" defaultOpen>
          <BooleanField
            label="Accessible parking"
            value={details.has_accessible_parking}
          />
          <TextField
            label="Distance to entrance"
            value={details.parking_distance_to_entrance}
          />
          <NotesField notes={details.parking_notes} />
        </DetailSection>

        {/* Entrance */}
        <DetailSection icon={DoorOpen} title="Entrance">
          <TextField label="Entrance type" value={details.entrance_type} />
          <TextField label="Door width" value={details.entrance_door_width} />
          <BooleanField
            label="Automatic door"
            value={details.entrance_has_automatic_door}
          />
          <TextField label="Ramp slope" value={details.entrance_ramp_slope} />
          <NotesField notes={details.entrance_notes} />
        </DetailSection>

        {/* Interior */}
        <DetailSection icon={LayoutGrid} title="Interior">
          <TextField
            label="Floor surface"
            value={details.interior_floor_surface}
          />
          <TextField
            label="Aisle width"
            value={details.interior_aisle_width}
          />
          <BooleanField
            label="Elevator available"
            value={details.interior_has_elevator}
          />
          <BooleanField
            label="Multiple floors"
            value={details.interior_multiple_floors}
          />
          <TextField
            label="Seating options"
            value={details.interior_seating_options}
          />
          <TextField
            label="Table height"
            value={details.interior_table_height}
          />
          <NotesField notes={details.interior_notes} />
        </DetailSection>

        {/* Bathroom */}
        <DetailSection icon={Bath} title="Bathroom">
          <BooleanField
            label="Accessible bathroom"
            value={details.bathroom_accessible}
          />
          <TextField
            label="Stall width"
            value={details.bathroom_stall_width}
          />
          <BooleanField
            label="Grab bars"
            value={details.bathroom_has_grab_bars}
          />
          <TextField label="Door width" value={details.bathroom_door_width} />
          <NotesField notes={details.bathroom_notes} />
        </DetailSection>

        {/* Scooter / Mobility */}
        <DetailSection icon={Bike} title="Scooter / Mobility">
          <BooleanField
            label="Scooter maneuverable"
            value={details.scooter_maneuverable}
          />
          <BooleanField
            label="Charging available"
            value={details.scooter_charging_available}
          />
          <NotesField notes={details.scooter_notes} />
        </DetailSection>
      </div>

      {/* Overall Environment */}
      {(details.staff_helpfulness ||
        details.noise_level ||
        details.lighting) && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Environment
          </h4>
          {details.staff_helpfulness && (
            <div className="flex items-center gap-2 text-sm">
              <Users
                className="h-4 w-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <span className="text-muted-foreground">Staff</span>
              <span className="text-foreground font-medium capitalize ml-auto">
                {details.staff_helpfulness.replace(/_/g, " ")}
              </span>
            </div>
          )}
          {details.noise_level && (
            <div className="flex items-center gap-2 text-sm">
              <Volume2
                className="h-4 w-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <span className="text-muted-foreground">Noise</span>
              <span className="text-foreground font-medium capitalize ml-auto">
                {details.noise_level.replace(/_/g, " ")}
              </span>
            </div>
          )}
          {details.lighting && (
            <div className="flex items-center gap-2 text-sm">
              <Sun
                className="h-4 w-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <span className="text-muted-foreground">Lighting</span>
              <span className="text-foreground font-medium capitalize ml-auto">
                {details.lighting.replace(/_/g, " ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Last Verified */}
      {details.last_verified_at && (
        <p className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
          Last verified: {formatDate(details.last_verified_at)}
        </p>
      )}
    </div>
  );
}
