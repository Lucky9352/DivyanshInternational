import { type Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { galleryQuery } from "@/lib/sanity/queries";
import GalleryContent from "@/components/pages/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery | Divyansh International",
  description:
    "Explore our collection of images showcasing our facility, products, and community events.",
};

// basic type for now to avoid 'any', ideally imported from a generated type file
type GalleryImage = {
  _key: string;
  title?: string;
  category?: string;
  imageUrl?: string;
  aspectRatio?: "auto" | "tall" | "wide";
};

type GalleryData = {
  title?: string;
  description?: string;
  images?: GalleryImage[];
};

export default async function GalleryPage() {
  const galleryData = await sanityFetch<GalleryData>({
    query: galleryQuery,
    tags: ["galleryPage"],
  });

  if (!galleryData) {
    return <GalleryContent data={{ title: "Gallery", images: [] }} />;
  }

  return <GalleryContent data={galleryData} />;
}
