"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { urlFor } from "@/lib/sanity/client-browser";
import type { SanityImageSource } from "@sanity/image-url";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";

// =============================================================================
// TYPES
// =============================================================================

export type ProductGrade = {
  _key?: string;
  grade: string;
  imageUrl?: string | null;
  image?: SanityImageSource;
  description?: string;
};

interface ProductGradingSectionProps {
  grading: ProductGrade[];
  title?: string;
  subtitle?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function ProductGradingSection({
  grading,
  title = "Grades & Sizes",
  subtitle = "Visual guide to our available sizes",
}: ProductGradingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  if (!grading || grading.length === 0) return null;

  return (
    <section
      ref={ref}
      className="py-12 bg-white relative overflow-hidden"
      aria-labelledby="grading-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h2 className="text-xl font-semibold text-deep-brown mb-2">{title}</h2>
        {subtitle ? <p className="text-text-muted text-sm">{subtitle}</p> : null}
      </motion.div>

      {/* Grading Grid */}
      <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
        {grading.map((item, index) => (
          <GradeCard key={item._key || index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// GRADE CARD COMPONENT
// =============================================================================

function GradeCard({ item, index }: { item: ProductGrade; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const imageUrl = item.imageUrl
    ? getGoogleDriveImageUrl(item.imageUrl)
    : item.image
      ? urlFor(item.image).width(200).url()
      : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col items-center group w-24 md:w-32"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-3/4 mb-3 rounded-lg overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <OptimizedImage
            src={imageUrl}
            alt={`${item.grade} size`}
            fill
            className="w-full h-full"
            imageClassName="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            quality={90}
          />
        ) : (
          <span className="text-2xl text-gray-300">🌰</span>
        )}
      </div>

      {/* Grade Name */}
      <div className="bg-deep-brown text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
        {item.grade}
      </div>

      {item.description ? (
        <span className="text-xs text-text-muted mt-1 text-center leading-tight">
          {item.description}
        </span>
      ) : null}
    </motion.div>
  );
}
