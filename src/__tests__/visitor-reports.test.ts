import { describe, it, expect } from "vitest";
import { places, DOMAIN_LABELS } from "@/lib/catalog";
import {
  visitorReports,
  findVisitorReports,
  REPORT_LABELS,
} from "@/lib/visitor-reports";

describe("External visitor evidence", () => {
  it("retains attribution and date uncertainty without inventing firsthand site reviews", () => {
    expect(visitorReports.length).toBeGreaterThan(0);
    expect(new Set(visitorReports.map((report) => report.id)).size).toBe(
      visitorReports.length,
    );
    for (const report of visitorReports) {
      expect(places.some((place) => place.slug === report.placeSlug)).toBe(
        true,
      );
      expect(new URL(report.sourceUrl).protocol).toBe("https:");
      expect(report.sourceTitle).toBeTruthy();
      expect(report.publisher).toBeTruthy();
      expect(report.summary).toBeTruthy();
      expect(report.caveat).toBeTruthy();
      expect(Object.keys(REPORT_LABELS)).toContain(report.kind);
      expect(report.domains.length).toBeGreaterThan(0);
      for (const domain of report.domains)
        expect(Object.keys(DOMAIN_LABELS)).toContain(domain);
      for (const date of [
        report.publishedAt,
        report.visitedAt,
        report.checkedAt,
      ]) {
        if (date !== null) {
          expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(new Date(date).toISOString().slice(0, 10)).toBe(date);
          expect(date <= report.checkedAt).toBe(true);
        }
      }
      expect(report).not.toHaveProperty("rating");
      expect(report).not.toHaveProperty("verified");
    }
  });
  it("combines evidence search and region/topic filters", () => {
    const reports = findVisitorReports({
      q: "touch tour",
      region: "OH",
      domain: "sensory",
    });
    expect(reports.map((report) => report.id)).toContain(
      "cam-even-grounds-touch-tour",
    );
    expect(
      findVisitorReports({ q: "touch tour", region: "KY", domain: "sensory" }),
    ).toEqual([]);
    expect(findVisitorReports({ q: "no-report-xyz" })).toEqual([]);
  });
});
