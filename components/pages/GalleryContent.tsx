"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getGoogleDriveImageUrl } from "@/lib/utils";

interface GalleryImage {
  _key: string;
  title?: string;
  category?: string;
  imageUrl?: string;
  aspectRatio?: "auto" | "tall" | "wide";
}

interface GalleryContentProps {
  data: {
    title?: string;
    description?: string;
    images?: GalleryImage[];
  };
}

export default function GalleryContent({ data }: GalleryContentProps) {
  const images = data.images ?? [];

  return (
    <section className="py-20 md:py-24 min-h-screen bg-linear-to-b from-beige to-sand">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-deep-brown"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {data.title || "Our Gallery"}
          </motion.h1>
          {data.description ? (
            <motion.p
              className="text-lg text-(--color-slate)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {data.description}
            </motion.p>
          ) : null}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <GalleryItem key={image._key} image={image} index={index} />
          ))}
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-(--color-muted)">
            <p>No images found in the gallery yet.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const driveUrl = image.imageUrl ? getGoogleDriveImageUrl(image.imageUrl) : null;

  if (!driveUrl) return null;

  return (
    <motion.div
      className="break-inside-avoid relative group rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
    >
      <div className="relative w-full">
        {/* We don't know aspect ratio of Drive images easily ahead of time without probing.
             Next.js Image requires known width/he*/}
        <Image
          src={driveUrl}
          alt={image.title || "Gallery image"}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Info on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/80 to-transparent">
          {image.category ? (
            <span className="inline-block px-2 py-1 mb-2 text-xs font-medium text-white bg-gold/90 rounded-full backdrop-blur-md">
              {image.category}
            </span>
          ) : null}
          {image.title ? (
            <h3 className="text-white font-medium text-lg leading-tight drop-shadow-md">
              {image.title}
            </h3>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
