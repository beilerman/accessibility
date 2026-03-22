import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MapPin, Pencil, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Profile, MobilityType } from "@/types/database";

export const metadata: Metadata = {
  title: "Your Profile",
};

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

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile) {
    redirect("/profile/edit");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="text-foreground font-medium">
            Profile
          </li>
        </ol>
      </nav>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt=""
                className="h-16 w-16 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border border-border">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">
                {profile.display_name}
              </h1>
              {profile.home_city && (
                <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.home_city}
                </p>
              )}
            </div>
          </div>
          <Link
            href="/profile/edit"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium hover:bg-muted transition-colors min-h-[44px]"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Link>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-1">
              About
            </h2>
            <p className="text-foreground whitespace-pre-line">{profile.bio}</p>
          </div>
        )}

        {/* Mobility Profile */}
        {profile.mobility_profile && profile.mobility_profile.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              Mobility Profile
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.mobility_profile.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center rounded-full bg-accent/10 text-accent border border-accent px-3 py-1 text-sm"
                >
                  {MOBILITY_TYPE_LABELS[type] ?? type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Review Count */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {profile.review_count}
            </span>{" "}
            {profile.review_count === 1 ? "review" : "reviews"} submitted
          </p>
        </div>
      </div>
    </div>
  );
}
