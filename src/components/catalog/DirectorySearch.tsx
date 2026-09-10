import { categories, cities, DOMAIN_LABELS } from "@/lib/catalog";
import Link from "next/link";

export function DirectorySearch({
  filters,
}: {
  filters: Record<string, string>;
}) {
  return (
    <form
      action="/venues"
      method="get"
      role="search"
      aria-label="Find places"
      className="directory-search"
    >
      <div className="search-wide">
        <label htmlFor="q">Name, place, or detail</label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder="Try Newport, headphones, or wheelchair…"
        />
      </div>
      <div>
        <label htmlFor="region">Area</label>
        <select id="region" name="region" defaultValue={filters.region}>
          <option value="">Both sides of the river</option>
          <option value="KY">Northern Kentucky</option>
          <option value="OH">Greater Cincinnati, Ohio</option>
        </select>
      </div>
      <div>
        <label htmlFor="city">City</label>
        <select id="city" name="city" defaultValue={filters.city}>
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="category">Type of place</label>
        <select id="category" name="category" defaultValue={filters.category}>
          <option value="">All types</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="domain">Information about</label>
        <select id="domain" name="domain" defaultValue={filters.domain}>
          <option value="">All access information</option>
          {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end gap-4">
        <button type="submit" className="primary-button">
          Find places
        </button>
        <Link
          href="/venues"
          className="min-h-11 inline-flex items-center underline text-sm"
        >
          Clear filters
        </Link>
      </div>
    </form>
  );
}
