/** Canonical public address. Other domains 308-redirect here (Vercel project settings). */
export const SITE_ORIGIN = "https://thresholdaccessibility.com";

/** Where readers send corrections and feedback. */
export const CONTACT_EMAIL = "medpeds@gmail.com";

/** A mailto link for reporting a problem, optionally about one place. */
export function reportProblemHref(place?: { name: string; slug: string }) {
  const subject = place
    ? `Threshold correction: ${place.name}`
    : "Threshold feedback";
  const body = place
    ? `Page: ${SITE_ORIGIN}/venues/${place.slug}\n\nWhat is wrong or out of date? If it is about one note, its ID is under "Note history".\n\n`
    : "What would you like us to know?\n\n";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
