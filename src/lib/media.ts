import kyPhotos from "@/data/photos-ky.json";
import ohPhotos from "@/data/photos-oh.json";
import generated from "@/data/illustrations.json";
import researchPhotos from "@/data/photos-research.json";
import extraPhotos from "@/data/photos-extra.json";
import categoryImages from "@/data/category-art.json";

export interface VenuePhoto {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  author: string;
  creditText?: string;
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

export interface CategoryArt {
  category: string;
  title: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const venuePhotos: VenuePhoto[] = [
  ...kyPhotos,
  ...ohPhotos,
  ...extraPhotos,
  ...researchPhotos,
];
export const illustrations: AccessIllustration[] = generated;
export const categoryArt: CategoryArt[] = categoryImages;
export function photoForPlace(slug: string) {
  return venuePhotos.find((photo) => photo.slug === slug);
}
export function artForCategory(category: string) {
  return categoryArt.find((image) => image.category === category);
}
