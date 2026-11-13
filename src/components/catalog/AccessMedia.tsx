import Image from "next/image";
import Link from "next/link";
import { accessPhotos, accessGuides } from "@/lib/media";
import { dateLabel, places } from "@/lib/catalog";

export function AccessMedia({ slug }: { slug?: string }) {
  const photos = accessPhotos.filter((photo) => !slug || photo.slug === slug);
  const guides = accessGuides.filter((guide) => !slug || guide.slug === slug);
  if (!photos.length && !guides.length) return null;

  return (
    <section
      id="access-photos"
      className="access-media"
      aria-labelledby="access-media-heading"
    >
      <h2 id="access-media-heading" className="font-display text-3xl">
        Access photos & visual guides
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed">
        Look at entrances, route surfaces and facilities before you visit. Photo
        dates and guide versions are shown below. Confirm current conditions and
        the complete route with the venue.
      </p>
      <div
        className={
          slug && photos.length > 0 && guides.length > 0
            ? "access-media-venue"
            : undefined
        }
      >
        {photos.length > 0 && (
          <div className="access-photo-grid">
            {photos.map((photo) => (
              <figure key={photo.id} className="access-photo" id={photo.id}>
                <a
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="access-photo-image"
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    unoptimized
                  />
                  <span className="sr-only">Open full photo in a new tab</span>
                </a>
                <figcaption className="photo-caption">
                  <h3 className="font-display text-2xl text-foreground">
                    {photo.title}
                  </h3>
                  {!slug && (
                    <Link
                      className="underline"
                      href={`/venues/${photo.slug}#access-photos`}
                    >
                      {places.find((place) => place.slug === photo.slug)?.name}
                    </Link>
                  )}
                  <p>{photo.caption}</p>
                  <p className="font-medium text-foreground">
                    {photo.photoDate ? (
                      <>
                        Photographed{" "}
                        <time dateTime={photo.photoDate}>
                          {dateLabel(photo.photoDate)}
                        </time>
                      </>
                    ) : (
                      "Photo date unknown"
                    )}
                  </p>
                  <p>{photo.limitations}</p>
                  <p>
                    <a
                      href={photo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Photo by {photo.author}
                    </a>
                    {" · "}
                    <a
                      href={photo.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {photo.license}
                    </a>
                    {" · Full frame, resized to WebP"}
                  </p>
                  {photo.relatedFactIds.map((id) => (
                    <Link
                      key={id}
                      href={`/venues/${photo.slug}#${id}`}
                      className="underline inline-flex min-h-11 items-center"
                    >
                      Read the published route information
                    </Link>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {guides.length > 0 && (
          <div className="access-guide-grid">
            {guides.map((guide) => (
              <article key={guide.id} className="panel-card">
                <h3 className="font-display text-2xl">{guide.title}</h3>
                {!slug && (
                  <Link
                    className="underline"
                    href={`/venues/${guide.slug}#access-photos`}
                  >
                    {places.find((place) => place.slug === guide.slug)?.name}
                  </Link>
                )}
                <p>{guide.description}</p>
                <p className="text-sm text-muted-foreground">
                  {guide.publisher} ·{" "}
                  {guide.documentDate || "Guide date unknown"}
                  {" · "}Link checked {dateLabel(guide.checkedAt)}
                </p>
                <a
                  href={guide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link inline-flex min-h-11 items-center"
                >
                  {guide.format === "web"
                    ? `Open photo guide (web page, ${guide.imageCount} ${guide.imageCount === 1 ? "photo" : "photos"})`
                    : `Open photo guide (PDF, ${guide.pageCount} pages, ${guide.sizeLabel})`}
                  <span className="sr-only">
                    {" "}
                    — {guide.title} (opens in a new tab)
                  </span>
                </a>
                <a
                  href={guide.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline inline-flex min-h-11 items-center"
                >
                  Publisher’s source page
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
