import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";
import { ProfileEditForm } from "./ProfileEditForm";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function ProfileEditPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile/edit");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  const initialProfile = {
    display_name: profile?.display_name ?? "",
    bio: profile?.bio ?? "",
    home_city: profile?.home_city ?? "",
    mobility_profile: profile?.mobility_profile ?? [],
  };

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
          <li>
            <Link
              href="/profile"
              className="hover:text-foreground transition-colors"
            >
              Profile
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="text-foreground font-medium">
            Edit
          </li>
        </ol>
      </nav>

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">
        {profile ? "Edit Profile" : "Create Profile"}
      </h1>

      <ProfileEditForm initialProfile={initialProfile} />
    </div>
  );
}
