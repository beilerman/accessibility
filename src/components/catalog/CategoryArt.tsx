import Image from "next/image";
import type { CategoryArt as Artwork } from "@/lib/media";

export function CategoryArt({
  item,
  compact = false,
}: {
  item: Artwork;
  compact?: boolean;
}) {
  return (
    <figure
      className={`category-art ${compact ? "category-art-compact" : "category-art-detail"}`}
    >
      <Image
        src={item.src}
        width={item.width}
        height={item.height}
        alt={item.alt}
        sizes={
          compact
            ? "(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 380px"
            : "(max-width: 1240px) 95vw, 1192px"
        }
      />
      <figcaption className="photo-caption">
        {compact ? (
          <p>
            AI artwork · {item.category}.{" "}
            <span>Imagined scene, not a photograph of this venue.</span>
          </p>
        ) : (
          <>
            <p className="font-medium text-foreground">
              AI artwork · {item.category}
            </p>
            <p>{item.caption}</p>
          </>
        )}
      </figcaption>
    </figure>
  );
}
