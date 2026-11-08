import Link from "next/link";
import type { Metadata } from "next";
import {
  catalogChanges,
  dateLabel,
  DOMAIN_LABELS,
  places,
  type CatalogChange,
} from "@/lib/catalog";
import { teamReviews } from "@/lib/team-reviews";

export const metadata: Metadata = {
  title: "Recent changes",
  description:
    "Corrections, withdrawn notes, additions and source rechecks in Threshold's access information, with dates and reasons.",
};

function groupByDate(changes: CatalogChange[]) {
  const byDate = new Map<string, CatalogChange[]>();
  for (const c of changes) byDate.set(c.date, [...(byDate.get(c.date) ?? []), c]);
  return [...byDate.entries()];
}

function NoteLink({ c }: { c: CatalogChange }) {
  return (
    <Link href={`/venues/${c.place.slug}#${c.fact.id}`} className="font-semibold underline">
      {c.place.name}
    </Link>
  );
}

export default function Updates() {
  const { changes, rechecks } = catalogChanges();
  const recheckByDate = new Map(rechecks.map((r) => [r.date, r.count]));
  const dates = [
    ...new Set([
      ...changes.map((c) => c.date),
      ...rechecks.map((r) => r.date),
      ...teamReviews.map((r) => r.reportedAt),
    ]),
  ].sort((a, b) => b.localeCompare(a));
  const grouped = new Map(groupByDate(changes));

  return (
    <div className="page-shell reading-page">
      <p className="eyebrow">RECENT CHANGES</p>
      <h1 className="font-display text-5xl">What changed, and why.</h1>
      <p className="text-xl">
        We keep a dated history for every access note. Corrections and
        withdrawn notes are listed here so earlier wording is never silently
        replaced.
      </p>
      <p>
        Dates are when we read the source, not when anyone visited. Each venue
        page also shows the full history under every note.{" "}
        <Link href="/sources" className="underline">
          How sources and dates work
        </Link>
      </p>

      {dates.map((date) => {
        const items = grouped.get(date) ?? [];
        const revised = items.filter((c) => c.action === "revised");
        const retired = items.filter((c) => c.action === "retired");
        const flagged = items.filter((c) => c.action === "flagged");
        const added = items.filter((c) => c.action === "added");
        const addedByPlace = new Map<string, CatalogChange[]>();
        for (const c of added)
          addedByPlace.set(c.place.slug, [...(addedByPlace.get(c.place.slug) ?? []), c]);
        const rechecked = recheckByDate.get(date) ?? 0;
        const reviews = teamReviews.filter((r) => r.reportedAt === date);
        return (
          <section key={date} aria-labelledby={`d-${date}`} className="update-day">
            <h2 id={`d-${date}`}>
              <time dateTime={date}>{dateLabel(date)}</time>
            </h2>
            {rechecked > 0 && (
              <p>
                Rechecked {rechecked} {rechecked === 1 ? "note" : "notes"} against
                their live sources; unchanged notes are not listed.
              </p>
            )}
            {reviews.length > 0 && (
              <>
                <h3 className="font-semibold text-xl mt-8">
                  New Threshold reviews ({reviews.length})
                </h3>
                <ul className="update-list">
                  {reviews.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/venues/${r.placeSlug}#threshold-review`}
                        className="font-semibold underline"
                      >
                        {places.find((p) => p.slug === r.placeSlug)?.name}
                      </Link>{" "}
                      · Firsthand review by {r.reviewer}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {revised.length > 0 && (
              <>
                <h3 className="font-semibold text-xl mt-8">Corrected ({revised.length})</h3>
                <ul className="update-list">
                  {revised.map((c) => (
                    <li key={c.fact.id + c.date}>
                      <NoteLink c={c} /> · {DOMAIN_LABELS[c.fact.domain]}
                      <p>{c.note}</p>
                      <p className="text-sm text-muted-foreground">
                        Current wording: {c.fact.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {retired.length > 0 && (
              <>
                <h3 className="font-semibold text-xl mt-8">Withdrawn ({retired.length})</h3>
                <ul className="update-list">
                  {retired.map((c) => (
                    <li key={c.fact.id + c.date}>
                      <Link href={`/venues/${c.place.slug}`} className="font-semibold underline">
                        {c.place.name}
                      </Link>{" "}
                      · {DOMAIN_LABELS[c.fact.domain]}
                      <p>{c.note}</p>
                      <p className="text-sm text-muted-foreground">
                        Withdrawn wording: {c.fact.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {flagged.length > 0 && (
              <>
                <h3 className="font-semibold text-xl mt-8">Flagged for recheck ({flagged.length})</h3>
                <ul className="update-list">
                  {flagged.map((c) => (
                    <li key={c.fact.id + c.date}>
                      <NoteLink c={c} /> · {c.note}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {added.length > 0 && (
              <>
                <h3 className="font-semibold text-xl mt-8">
                  Added ({added.length} {added.length === 1 ? "note" : "notes"})
                </h3>
                <ul className="update-list">
                  {[...addedByPlace.values()].map((cs) => (
                    <li key={cs[0].place.slug}>
                      <Link href={`/venues/${cs[0].place.slug}`} className="font-semibold underline">
                        {cs[0].place.name}
                      </Link>{" "}
                      · {cs.length} {cs.length === 1 ? "note" : "notes"}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        );
      })}
      <p className="text-sm text-muted-foreground">
        The original catalog notes added on {dateLabel("2026-09-10")} are not
        listed individually.
      </p>
    </div>
  );
}
