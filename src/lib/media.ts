import kyPhotos from "@/data/photos-ky.json";
import ohPhotos from "@/data/photos-oh.json";
import generated from "@/data/illustrations.json";

export interface VenuePhoto {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  photoDate?: string;
  checkedAt: string;
}

export interface AccessIllustration {
  id: string;
  title: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  shown: string[];
  confirm: string[];
  guidanceUrl: string;
}

export const venuePhotos: VenuePhoto[] = [...kyPhotos, ...ohPhotos];
export const illustrations: AccessIllustration[] = generated;
export function photoForPlace(slug: string) {
  return venuePhotos.find((photo) => photo.slug === slug);
}
