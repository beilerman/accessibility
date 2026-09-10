import Image from "next/image";
import type { AccessIllustration as Illustration } from "@/lib/media";

export function AccessIllustration({ item }: { item: Illustration }) {
  return (
    <figure className="access-illustration">
      <Image
        src={item.src}
        width={item.width}
        height={item.height}
        alt={
          item.alt.startsWith("AI") ? item.alt : `AI illustration: ${item.alt}`
        }
        sizes="(max-width: 800px) 90vw, 700px"
      />
      <figcaption className="photo-caption">
        <p className="font-medium text-foreground">
          AI illustration — example setting
        </p>
        <p>{item.caption}</p>
      </figcaption>
    </figure>
  );
}
