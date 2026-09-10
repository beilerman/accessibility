import { dateLabel, DOMAIN_LABELS } from "@/lib/catalog";
import {
  REPORT_LABELS,
  type VisitorReport as Report,
} from "@/lib/visitor-reports";

export function VisitorReport({ report }: { report: Report }) {
  return (
    <article className="visitor-report" aria-labelledby={`report-${report.id}`}>
      <p className="text-sm font-semibold text-accent">
        {REPORT_LABELS[report.kind]} · External source
      </p>
      <h3 id={`report-${report.id}`} className="font-display text-xl mt-2">
        <a
          href={report.sourceUrl}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {report.sourceTitle}
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </h3>
      <p className="text-sm text-muted-foreground mt-2">
        {report.author || "Author not identified"} · {report.publisher}
        {" · "}
        {report.publishedAt
          ? `Published ${dateLabel(report.publishedAt)}`
          : "Exact publication date unavailable"}
        {" · "}
        {report.visitedAt
          ? `Visit reported ${dateLabel(report.visitedAt)}`
          : "Exact visit date unknown"}
      </p>
      <p className="mt-4 leading-relaxed">{report.summary}</p>
      <p className="mt-3 text-sm leading-relaxed">
        <strong>Context: </strong>
        {report.caveat}
        {report.contextSourceUrl && (
          <>
            {" "}
            <a
              className="underline"
              href={report.contextSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Current official guidance
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            .
          </>
        )}
      </p>
      <ul
        className="flex flex-wrap gap-2 mt-4"
        aria-label="Topics in this report"
      >
        {report.domains.map((domain) => (
          <li key={domain} className="topic-pill">
            {DOMAIN_LABELS[domain]}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        Source checked {dateLabel(report.checkedAt)} · Summary by Threshold; not
        independently verified
      </p>
    </article>
  );
}
