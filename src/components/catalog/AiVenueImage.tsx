import Image from "next/image";
import type { AiVenueImage as AiImage } from "@/lib/media";
import { dateLabel } from "@/lib/catalog";

export function AiVenueImage({
  image,
  compact = false,
}: {
  image: AiImage;
  compact?: boolean;
}) {
  return (
    <figure
      className={
        compact
          ? "venue-photo ai-venue-image venue-photo-compact"
          : "venue-photo ai-venue-image venue-photo-detail"
      }
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={
          compact
            ? "(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 380px"
            : "(max-width: 1240px) 95vw, 1192px"
        }
      />
      <figcaption className="photo-caption">
        <p className="font-medium text-foreground">
          AI-generated image · not a photograph
        </p>
        {!compact && (
          <>
            <p>{image.caption}</p>
            <p>
              Checked against{" "}
              <a
                href={image.referencePage}
                target="_blank"
                rel="noopener noreferrer"
              >
                the reference photo
                <span className="sr-only"> (opens in new tab)</span>
              </a>{" "}
              on {dateLabel(image.checkedAt)}. Reference photo date:{" "}
              {image.referenceDate}. Known differences:{" "}
              {image.knownDifferences}
            </p>
            <p>
              Entrances, steps, paths and ground level are deliberately left
              out. Do not use this image to judge physical access.
            </p>
          </>
        )}
      </figcaption>
    </figure>
  );
}
