"use client";

/**
 * Drone Diaries Section Component
 *
 * Video gallery showcasing facility tours and behind-the-scenes content.
 * Supports YouTube/Vimeo embeds with custom thumbnails.
 */

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, X } from "lucide-react";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface Video {
  _key?: string;
  title: string;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface DroneDiariesProps {
  sectionData?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    videos?: Video[];
  } | null;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2]?.length === 11 ? match[2] : null;
}

function getYouTubeThumbnail(url: string | undefined): string | null {
  if (!url) return null;
  const videoId = getYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function DroneDiaries({ sectionData }: DroneDiariesProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const handleOpenVideo = useCallback((video: Video) => {
    setActiveVideo(video);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  // Don't render if no data or no videos
  if (!sectionData || !sectionData.videos || sectionData.videos.length === 0) {
    return null;
  }

  return (
    <>
      <section
        className="py-20 bg-deep-brown relative overflow-hidden"
        aria-labelledby="drone-diaries-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {sectionData.eyebrow ? (
              <motion.p
                className="uppercase tracking-[0.4em] text-xs text-gold mb-4 font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {sectionData.eyebrow}
              </motion.p>
            ) : null}
            {sectionData.title ? (
              <motion.h2
                id="drone-diaries-heading"
                className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {sectionData.title}
              </motion.h2>
            ) : null}
            {sectionData.description ? (
              <motion.p
                className="text-lg text-bg/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {sectionData.description}
              </motion.p>
            ) : null}
          </div>

          {/* Video Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {sectionData.videos.map((video, index) => (
              <VideoCard key={video._key ?? index} video={video} onPlay={handleOpenVideo} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo ? <VideoModal video={activeVideo} onClose={handleCloseVideo} /> : null}
    </>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

function VideoCard({ video, onPlay }: VideoCardProps) {
  const thumbnail =
    video.thumbnailUrl || (video.videoUrl ? getYouTubeThumbnail(video.videoUrl) : null);

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-video bg-graphite-dark"
      variants={fadeInUp}
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPlay(video)}
      aria-label={`Play video: ${video.title}`}
    >
      {/* Thumbnail */}
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-deep-brown flex items-center justify-center">
          <span className="text-bg/50 text-sm">No thumbnail</span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-graphite/40 group-hover:bg-graphite/60 transition-colors duration-300" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-graphite ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Title Card */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-deep-brown/90 backdrop-blur-sm">
        <h3 className="text-white font-bold text-lg">{video.title}</h3>
        {video.description ? (
          <p className="text-bg/70 text-sm line-clamp-2 mt-1">{video.description}</p>
        ) : null}
      </div>
    </motion.article>
  );
}

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

function VideoModal({ video, onClose }: VideoModalProps) {
  const youtubeId = video.videoUrl ? getYouTubeId(video.videoUrl) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${video.title}`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center transition-colors"
        aria-label="Close video"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Video Container */}
      <div className="w-full max-w-5xl aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-graphite-dark flex items-center justify-center">
            <p className="text-bg/50">Video URL not available</p>
          </div>
        )}
      </div>
    </div>
  );
}
