"use client";

import { useState, memo, useSyncExternalStore } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export type Variant = "default" | "scattered" | "side-balanced" | "minimal";

export interface DecorativeBackgroundProps {
  variant?: Variant;
  className?: string;
}

// =============================================================================
// ASSET MAPPING
// =============================================================================

const DECORATIVE_IMAGES = {
  almond: "/almond.png",
  cashew: "/cashewsingle.png",
  walnut: "/walnut.png",
  hazelnut: "/hazelnut.png",
  raisin: "/raisin.png",
  date: "/dates.png",
};

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function FloatingImage({
  src,
  className = "",
  priority = false,
  animationClass = "animate-float-1",
}: { src: string; priority?: boolean; animationClass?: string } & Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>) {
  return (
    <div className={`absolute will-change-transform transform-gpu ${animationClass} ${className}`}>
      <div className="relative w-full h-full">
        <OptimizedImage
          src={src}
          alt=""
          fill
          className="drop-shadow-md select-none grayscale-[0.2] brightness-110"
          imageClassName="object-scale-down"
          quality={100}
          sizes="100px"
          priority={priority}
        />
      </div>
    </div>
  );
}

function GoldenDust() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [particles] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        "--duration": `${Math.random() * 10 + 10}s`,
        "--delay": `${Math.random() * 5}s`,
      } as React.CSSProperties,
    }))
  );

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold/30 blur-[1px] will-change-transform transform-gpu animate-dust"
          style={p.style}
        />
      ))}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default memo(function DecorativeBackground({
  variant = "default",
  className = "",
}: DecorativeBackgroundProps) {
  const renderDefault = () => (
    <>
      <FloatingImage
        src={DECORATIVE_IMAGES.almond}
        className="top-1/4 right-16 opacity-30 w-32 h-32"
        animationClass="animate-float-1"
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.walnut}
        className="bottom-1/3 left-20 opacity-25 w-32 h-32"
        animationClass="animate-float-2"
        style={{ animationDelay: "2s" }}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.cashew}
        className="top-1/3 left-1/4 opacity-20 w-24 h-24"
        animationClass="animate-float-3"
        style={{ animationDelay: "1s" }}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.hazelnut}
        className="bottom-1/3 left-1/2 opacity-20 w-22 h-22"
        animationClass="animate-float-4"
        style={{ animationDelay: "4s" }}
        priority={true}
      />
    </>
  );

  const renderScattered = () => (
    <>
      {/* Scattered particles */}
      <FloatingImage
        src={DECORATIVE_IMAGES.cashew}
        className="top-[15%] left-[10%] opacity-25 w-20 h-20"
        animationClass="animate-float-1"
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.walnut}
        className="top-[45%] right-[8%] opacity-20 w-32 h-32"
        animationClass="animate-float-2"
        style={{ animationDelay: "1s" }}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.almond}
        className="bottom-[25%] left-[15%] opacity-25 w-24 h-24"
        animationClass="animate-float-3"
        style={{ animationDelay: "2s" }}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.hazelnut}
        className="bottom-[10%] right-[30%] opacity-15 w-20 h-20"
        animationClass="animate-float-4"
        style={{ animationDelay: "0.5s" }}
        priority
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.raisin}
        className="top-[30%] left-[80%] opacity-20 w-16 h-16"
        animationClass="animate-float-1"
        style={{ animationDelay: "3s" }}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.date}
        className="bottom-[40%] left-[40%] opacity-20 w-24 h-24"
        animationClass="animate-float-2"
        style={{ animationDelay: "4s" }}
      />
    </>
  );

  const renderSideBalanced = () => (
    <>
      <FloatingImage
        src={DECORATIVE_IMAGES.walnut}
        className="top-[25%] left-[5%] opacity-30 w-24 h-24"
        animationClass="animate-float-4"
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.cashew}
        className="top-[65%] left-[8%] opacity-25 w-28 h-28"
        animationClass="animate-float-3"
        style={{ animationDelay: "1s" }}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.almond}
        className="bottom-[15%] right-[5%] opacity-30 w-26 h-26"
        animationClass="animate-float-2"
        style={{ animationDelay: "2s" }}
      />
    </>
  );

  const renderMinimal = () => (
    <>
      <FloatingImage
        src={DECORATIVE_IMAGES.hazelnut}
        className="-top-10 -right-10 opacity-10 w-56 h-56"
        animationClass="animate-float-1"
        priority={true}
      />

      <FloatingImage
        src={DECORATIVE_IMAGES.cashew}
        className="bottom-10 left-10 opacity-10 w-48 h-48"
        animationClass="animate-float-2"
      />

      {/* Subtle extra detail for minimal */}
      <FloatingImage
        src={DECORATIVE_IMAGES.almond}
        className="top-1/2 left-10 opacity-15 w-12 h-12"
        animationClass="animate-float-3"
        style={{ animationDelay: "5s" }}
      />
    </>
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {/* Background ambient dust for all variants */}
      <GoldenDust />

      <div className="relative z-10 w-full h-full lg:overflow-hidden">
        {variant === "default" ? renderDefault() : null}
        {variant === "scattered" ? renderScattered() : null}
        {variant === "side-balanced" ? renderSideBalanced() : null}
        {variant === "minimal" ? renderMinimal() : null}
      </div>
    </div>
  );
});
