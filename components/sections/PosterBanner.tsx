"use client";

/**
 * Poster Banner Section Component
 *
 * Full-width banner for displaying a single promotional poster.
 * Used on the home page between Hero and SpiralQuote sections.
 * Supports Google Drive URLs with automatic transformation.
 */

import { motion } from "framer-motion";
import { getGoogleDriveImageUrl } from "@/lib/utils";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface PosterBannerProps {
  bannerData?: {
    imageUrl?: string;
    alt?: string;
    title?: string;
  } | null;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function PosterBanner({ bannerData }: PosterBannerProps) {
  // Don't render if no image URL
  if (!bannerData?.imageUrl) return null;

  // Transform Google Drive URL if needed
  const imageUrl = getGoogleDriveImageUrl(bannerData.imageUrl);

  // If transformation returns null, don't render
  if (!imageUrl) return null;

  return (
    <section
      className="relative w-full pt-10 pb-10 md:py-20 overflow-hidden bg-bg"
      aria-label="Featured poster"
    >
      <motion.div
        className="relative w-full h-[85vh] max-h-[900px] min-h-[500px] flex items-center justify-center p-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Blurred background wrapper for clipping */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div
            className="absolute inset-0 pointer-events-none scale-110"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(5px)", // Adjustable
              opacity: 1, // Adjustable
              zIndex: 0,
            }}
          />
        </div>

        {/* Poster Image - using img tag like ProductCard for Google Drive URLs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={bannerData.alt ?? "Divyansh International promotional poster"}
          className="relative z-10 w-auto h-full max-h-full object-contain shadow-2xl rounded-lg"
        />

        {/* Optional Title Overlay - Kept for compatibility but styled consistently */}
        {bannerData.title ? (
          <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <div className="bg-deep-brown/80 p-4 md:p-6 rounded-xl backdrop-blur-sm mx-4">
              <motion.h3
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-heading text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {bannerData.title}
              </motion.h3>
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
