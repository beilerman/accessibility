"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MobilityProfileSelector } from "@/components/shared/MobilityProfileSelector";

interface ProfileFormData {
  display_name: string;
  bio: string;
  home_city: string;
  mobility_profile: string[];
}

interface ProfileEditFormProps {
  initialProfile: ProfileFormData;
}

export function ProfileEditForm({ initialProfile }: ProfileEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileFormData>(initialProfile);

  function updateField<K extends keyof ProfileFormData>(
    key: K,
    value: ProfileFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!form.display_name.trim()) {
      setError("Display name is required.");
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      return;
    }

    const { error: upsertError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        display_name: form.display_name.trim(),
        bio: form.bio.trim() || null,
        home_city: form.home_city.trim() || null,
        mobility_profile: form.mobility_profile,
      },
      { onConflict: "id" }
    );

    if (upsertError) {
      setError("Failed to save profile. Please try again.");
      return;
    }

    startTransition(() => {
      router.push("/profile");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
        {error && (
          <div
            role="alert"
            className="text-sm text-rating-not-accessible bg-rating-not-accessible/10 p-3 rounded-lg"
          >
            {error}
          </div>
        )}

        {/* Display Name */}
        <div>
          <label
            htmlFor="display_name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Display Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="display_name"
            type="text"
            required
            value={form.display_name}
            onChange={(e) => updateField("display_name", e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="How others see you"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-y"
            placeholder="Tell others a bit about yourself and your accessibility needs"
          />
        </div>

        {/* Home City */}
        <div>
          <label
            htmlFor="home_city"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Home City
          </label>
          <input
            id="home_city"
            type="text"
            value={form.home_city}
            onChange={(e) => updateField("home_city", e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="e.g. Cincinnati, OH"
          />
        </div>

        {/* Mobility Profile */}
        <MobilityProfileSelector
          value={form.mobility_profile}
          onChange={(values) => updateField("mobility_profile", values)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <a
          href="/profile"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors min-h-[44px]"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-accent text-white px-6 py-2 text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          {isPending ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
