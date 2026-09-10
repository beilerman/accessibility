import Image from "next/image";
import type { VenuePhoto as Photo } from "@/lib/media";

export function VenuePhoto({
  photo,
  compact = false,
}: {
  photo: Photo;
  compact?: boolean;
}) {
  return (
    <figure
      className={
        compact
          ? "venue-photo venue-photo-compact"
          : "venue-photo venue-photo-detail"
      }
    >
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        sizes={
          compact
            ? "(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 380px"
            : "(max-width: 1240px) 95vw, 1192px"
        }
      />
      <figcaption className="photo-caption">
        <p className="font-medium text-foreground">
          Venue photo
          {photo.photoDate ? ` · ${photo.photoDate}` : " · Date unknown"}
        </p>
        {!compact && <p>{photo.caption}</p>}
        <p>
          <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">
            Photo: {photo.author}
            <span className="sr-only"> (source opens in new tab)</span>
          </a>
          {" · "}
          <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">
            {photo.license}
            <span className="sr-only"> (license opens in new tab)</span>
          </a>
        </p>
        {!compact && (
          <p>
            Context photograph. Access details and current conditions require
            separate confirmation. Resized and converted to WebP; full frame
            retained.
          </p>
        )}
      </figcaption>
    </figure>
  );
}
