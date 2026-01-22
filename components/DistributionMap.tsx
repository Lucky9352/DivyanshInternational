"use client";

/**
 * Distribution Map Component
 *
 * Visualizes distribution network using a dynamic Leaflet map.
 * Data is now passed via props instead of hardcoded.
 * Validated with Zod for type safety.
 */

import dynamic from "next/dynamic";
import { z } from "zod";

// =============================================================================
// ZOD VALIDATION SCHEMAS
// =============================================================================

export const DistributionLocationSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  radius: z.number().optional().default(50000),
});

const DistributionMapPropsSchema = z.object({
  heading: z.string().optional(),
  locations: z.array(DistributionLocationSchema).optional(),
});

// =============================================================================
// TYPES
// =============================================================================

export type DistributionLocation = z.infer<typeof DistributionLocationSchema>;
export type DistributionMapProps = z.infer<typeof DistributionMapPropsSchema>;

// =============================================================================
// LAZY LOADED COMPONENTS
// =============================================================================

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-paper animate-pulse flex items-center justify-center text-text-muted">
      <span className="sr-only">Loading Map...</span>
      <svg className="w-8 h-8 animate-spin text-gold" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  ),
});

// =============================================================================
// COMPONENT
// =============================================================================

export default function DistributionMap({
  heading = "Our Reach",
  locations = [],
}: DistributionMapProps) {
  // Validate props in development
  if (process.env.NODE_ENV === "development") {
    const result = DistributionMapPropsSchema.safeParse({ heading, locations });
    if (!result.success) {
      console.warn("[DistributionMap] Prop validation warning:", result.error.flatten());
    }
  }

  if (!locations || locations.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-100 md:h-125 lg:h-150 bg-paper rounded-lg overflow-hidden shadow-md group isolate">
      {heading ? (
        <div className="absolute top-2 left-2 md:top-4 md:left-4 z-1000 bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-sm pointer-events-none">
          <h4 className="font-bold text-deep-brown text-sm md:text-base">{heading}</h4>
        </div>
      ) : null}

      {/* Regions Overlay */}
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-1000 bg-white/95 backdrop-blur-md p-2.5 md:p-4 rounded-lg md:rounded-xl shadow-lg border border-border max-w-40 md:max-w-50 pointer-events-none">
        <h5 className="text-xs md:text-sm font-bold text-deep-brown mb-1.5 md:mb-2 uppercase tracking-wider">
          Key Regions
        </h5>
        <ul className="space-y-1 md:space-y-1.5">
          {locations.map((loc) => (
            <li
              key={loc.name}
              className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-text-muted"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold shrink-0" />
              {loc.name}
            </li>
          ))}
        </ul>
      </div>

      <LeafletMap locations={locations} />
    </div>
  );
}
