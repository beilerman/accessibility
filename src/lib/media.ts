import kyPhotos from "@/data/photos-ky.json";
import ohPhotos from "@/data/photos-oh.json";
import generated from "@/data/illustrations.json";
import researchPhotos from "@/data/photos-research.json";
import extraPhotos from "@/data/photos-extra.json";
import commonsPhotos from "@/data/photos-commons.json";
import flickrPhotos from "@/data/photos-flickr.json";
import categoryImages from "@/data/category-art.json";
import aiVenueImageData from "@/data/ai-venue-images.json";
import accessPhotoData from "@/data/access-photos.json";
import accessGuideData from "@/data/access-guides.json";

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

export interface AccessPhoto extends VenuePhoto {
  id: string;
  title: string;
  limitations: string;
  relatedFactIds: string[];
}

export interface AccessGuide {
  id: string;
  slug: string;
  title: string;
  description: string;
  publisher: string;
  url: string;
  sourceUrl: string;
  documentDate: string | null;
  pageCount: number;
  sizeLabel: string;
  checkedAt: string;
}

/**
 * AI-generated image of a real place, used only where no freely licensed
 * photo exists. Generated from a text description of a reference photo
 * (never from the photo itself), compared with that photo, and cropped above
 * ground level so it shows no entrances, steps, paths or thresholds.
 */
export interface AiVenueImage {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  referencePage: string;
  referenceDate: string;
  knownDifferences: string;
  checkedAt: string;
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
  ...commonsPhotos,
  ...flickrPhotos,
];
export const illustrations: AccessIllustration[] = generated;
export const categoryArt: CategoryArt[] = categoryImages;
export const aiVenueImages: AiVenueImage[] = aiVenueImageData;
export const accessPhotos: AccessPhoto[] = accessPhotoData;
export const accessGuides: AccessGuide[] = accessGuideData;
export function photoForPlace(slug: string) {
  return venuePhotos.find((photo) => photo.slug === slug);
}
export function aiImageForPlace(slug: string) {
  return aiVenueImages.find((image) => image.slug === slug);
}
export function artForCategory(category: string) {
  return categoryArt.find((image) => image.category === category);
}
