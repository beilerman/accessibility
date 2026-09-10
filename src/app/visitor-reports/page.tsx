import Link from "next/link";
import type { Metadata } from "next";
import { places, DOMAIN_LABELS } from "@/lib/catalog";
import { findVisitorReports, visitorReports } from "@/lib/visitor-reports";
import { VisitorReport } from "@/components/catalog/VisitorReport";

export const metadata: Metadata = {
  title: "Visitor reports — accessibility experiences",
  description:
    "Source-linked summaries of public accessibility reviews and visitor comments across Greater Cincinnati and Northern Kentucky, with dates and limitations.",
};

export default async function VisitorReportsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  const filters = {
    q: value("q"),
    region: value("region"),
    domain: value("domain"),
  };
  const reports = findVisitorReports(filters);
  const covered = new Set(visitorReports.map((report) => report.placeSlug))
    .size;
  return (
    <div className="page-shell py-12">
      <h1 className="font-display text-4xl sm:text-5xl">
        What visitors have experienced.
      </h1>
      <p className="text-xl mt-5 max-w-3xl leading-relaxed">
        Public reviews and comments can reveal details a policy page misses.
        These are attributed summaries of other people’s accounts, with the
        original sources one click away.
      </p>
      <div className="report-method mt-7 max-w-3xl">
        <p>
          {visitorReports.length} reports cover {covered} of {places.length}{" "}
          listed places. This is a selected collection, not a representative
          survey or an accessibility rating.
        </p>
        <p className="mt-3">
          Experiences vary by person, route, event and date. Reports are not
          independently verified and were not submitted to Threshold. Older
          accounts may describe conditions that have changed. Missing reports do
          not mean a place is accessible or inaccessible.
        </p>
        <Link
          href="/sources#visitor-evidence"
          className="underline inline-flex min-h-11 items-center"
        >
          How visitor reports are selected
        </Link>
      </div>
      <form
        action="/visitor-reports"
        className="directory-search"
        role="search"
        aria-label="Search visitor reports"
      >
        <div>
          <label htmlFor="report-search">Place or experience</label>
          <input
            id="report-search"
            name="q"
            type="search"
            defaultValue={filters.q}
          />
        </div>
        <div>
          <label htmlFor="report-region">Report area</label>
          <select
            id="report-region"
            name="region"
            defaultValue={filters.region}
          >
            <option value="">Both sides of the river</option>
            <option value="KY">Northern Kentucky</option>
            <option value="OH">Greater Cincinnati, Ohio</option>
          </select>
        </div>
        <div>
          <label htmlFor="report-domain">Report topic</label>
          <select
            id="report-domain"
            name="domain"
            defaultValue={filters.domain}
          >
            <option value="">All topics</option>
            {Object.entries(DOMAIN_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button className="primary-button" type="submit">
          Find reports
        </button>
        <Link
          href="/visitor-reports"
          className="underline inline-flex min-h-11 items-center"
        >
          Clear report filters
        </Link>
      </form>
      <p role="status" className="mb-7">
        {reports.length} {reports.length === 1 ? "report" : "reports"} found
      </p>
      {reports.length ? (
        <div className="max-w-4xl space-y-10">
          {reports.map((report) => {
            const place = places.find((p) => p.slug === report.placeSlug)!;
            return (
              <section key={report.id}>
                <h2 className="font-display text-2xl mb-3">
                  <Link
                    className="underline"
                    href={`/venues/${place.slug}#visitor-reports`}
                  >
                    {place.name}
                  </Link>
                </h2>
                <VisitorReport report={report} />
              </section>
            );
          })}
        </div>
      ) : (
        <p className="py-8">
          No reports match these filters. Try another place or topic.
        </p>
      )}
    </div>
  );
}
