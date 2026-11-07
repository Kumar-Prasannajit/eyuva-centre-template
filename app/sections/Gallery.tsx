"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { GALLERY_GROUPS } from "@/content/gallery";

/* ── DATA ──────────────────────────────────── */
const createImages = () => {
  const images: any[] = [];

  const getRandomSize = () => {
    const rand = Math.random();

    if (rand > 0.92) return "tall";
    if (rand > 0.82) return "wide";
    return "normal";
  };

  for (const group of GALLERY_GROUPS) {
    for (let i = 1; i <= group.count; i++) {
      images.push({
        src: `${group.folder}/${i}.webp`,
        thumb: `${group.folder}/${i}.webp`,
        alt: `${group.label} ${i}`,
        label: `${group.label} ${i}`,
        category: group.category,
        size: getRandomSize(),
      });
    }
  }

  return images.sort(() => Math.random() - 0.5);
};

const CATEGORIES = ["All", ...GALLERY_GROUPS.map((g) => g.category)];
const PAGE_SIZE = 8; // images revealed per "Load More" click

/* ── LIGHTBOX ───────────────────────────────── */
function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: any[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const img = images[index];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} aria-label="Close"
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image + caption */}
      <div className="flex flex-col items-center gap-4 max-w-[88vw]"
        onClick={(e) => e.stopPropagation()}>
        <Image src={img.src} alt={img.alt} width={880} height={720} className="rounded-2xl object-contain shadow-2xl"
          style={{ maxHeight: "72vh", maxWidth: "88vw" }} />
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-bold tracking-wide uppercase">
            {img.category}
          </span>
          <span className="text-white/80 text-[14px] font-medium">{img.label}</span>
          <span className="text-white/35 text-[13px]">{index + 1} / {images.length}</span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
        {images.map((im, i) => (
          <button key={i} onClick={(e) => e.stopPropagation()}
            className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 cursor-default ${i === index ? "border-amber-500 scale-110" : "border-transparent opacity-40 hover:opacity-70"
              }`}>
            <Image src={im.thumb} alt={im.alt} width={48} height={48} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── MAIN ───────────────────────────────────── */
export default function Gallery() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    setGalleryImages(createImages());
  }, []);

  /* All galleryImages matching the filter */
  const shuffleArray = (arr: any[]) => {
    return [...arr];
  };

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
        (im) => im.category === activeCategory
      );

  /* Slice to what's currently visible */
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  /* Reset count when category changes */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setLightboxIndex(null);
  }, [activeCategory]);

  /* Load more with a brief fake-load feel */
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
      setIsLoading(false);
    }, 400);
  };

  /* Lightbox handlers */
  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => i === null ? null : (i - 1 + visible.length) % visible.length),
    [visible.length]);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => i === null ? null : (i + 1) % visible.length),
    [visible.length]);

  const spanClass = (size: string) => {
    switch (size) {
      case "tall":
        return "row-span-2";

      case "wide":
        return "md:col-span-2";

      default:
        return "";
    }
  };

  /* ── theme tokens ── */
  const bg = isDark ? "#0d1f3c" : "#f8fafc";
  const headingColor = isDark ? "#ffffff" : "#1e3a5f";
  const subColor = isDark ? "#94a3b8" : "#6b7280";
  const tagColor = isDark ? "#f59e0b" : "#1e3a5f";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.1)";
  const countBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.07)";
  const countColor = isDark ? "#cbd5e1" : "#1e3a5f";
  const countBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(30,58,95,0.15)";
  const pillIdle = {
    bg: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.06)",
    text: isDark ? "#cbd5e1" : "#374151",
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(30,58,95,0.15)",
  };

  return (
    <section
      id="gallery"
      className="relative py-16 md:py-24 overflow-hidden transition-colors duration-300"
      style={{ background: bg }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* ── Header ─────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block w-5 h-[2px] bg-amber-500" />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase border-b-2 pb-px transition-colors duration-300"
                style={{ color: tagColor, borderColor: tagColor }}>
                Gallery
              </span>
            </div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-tight leading-[1.15] mb-2 transition-colors duration-300"
              style={{ color: headingColor }}>
              Life at E-YUVA Center
            </h2>
            <p className="text-[15px] leading-[1.7] max-w-[480px] transition-colors duration-300"
              style={{ color: subColor }}>
              Moments from our labs, workshops, hackathons, and fellowship programs.
            </p>
          </div>

          {/* Count badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold flex-shrink-0 border transition-colors duration-300"
            style={{ background: countBg, color: countColor, borderColor: countBorder }}>
            📸 {filtered.length} Photos
          </div>
        </div>

        {/* ── Category filter pills ───────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-4 py-[7px] rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer border"
                style={{
                  background: active ? "#f59e0b" : pillIdle.bg,
                  color: active ? "#1e3a5f" : pillIdle.text,
                  borderColor: active ? "#f59e0b" : pillIdle.border,
                  transform: active ? "scale(1.04)" : "scale(1)",
                }}>
                {cat}
                {cat !== "All" && (
                  <span className="ml-2 text-[11px] opacity-55">
                    {galleryImages.filter((i) => i.category === cat).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Progress indicator ──────────────── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[3px] rounded-full overflow-hidden"
            style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(visibleCount / filtered.length) * 100}%`,
                background: "linear-gradient(to right, #f59e0b, #f97316)",
              }}
            />
          </div>
          <span className="text-[12px] font-semibold flex-shrink-0 transition-colors duration-300"
            style={{ color: subColor }}>
            {Math.min(visibleCount, filtered.length)} / {filtered.length}
          </span>
        </div>

        {/* ── Masonry grid ───────────────────── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          style={{ gridAutoRows: "220px" }}
        >
          {visible.map((item, i) => (
            <div
              key={`${activeCategory}-${item.label}-${i}`}
              onClick={() => openLightbox(i)}
              className={`relative group rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-2xl ${spanClass(item.size)}`}
              style={{
                borderColor: cardBorder,
                /* staggered fade-in for newly loaded items */
                animation: i >= visibleCount - PAGE_SIZE
                  ? `fadeSlideIn 0.4s ease ${((i % PAGE_SIZE) * 60)}ms both`
                  : "none",
              }}
            >
              <Image
                src={item.thumb}
                alt={item.alt}
                fill
                priority={i < 8}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 25vw"
              />

              {/* Always-on bottom gradient */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(5,15,35,0.6) 0%, transparent 55%)" }} />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(8,18,40,0.62)" }}>
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4"
                      stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white text-[13px] font-semibold drop-shadow">{item.label}</span>
              </div>

              {/* Category badge */}
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <span className="px-[9px] py-[3px] rounded-md bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide uppercase">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[15px] transition-colors duration-300" style={{ color: subColor }}>
            No photos in this category yet.
          </div>
        )}

        {/* ── Load More / Collapse ────────────── */}
        <div ref={loadMoreRef} className="mt-10 flex flex-col items-center gap-3">
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-[14px] font-bold transition-all duration-200 border cursor-pointer disabled:opacity-60"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.07)",
                color: isDark ? "#ffffff" : "#1e3a5f",
                borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(30,58,95,0.2)",
              }}
            >
              {isLoading ? (
                <>
                  {/* Spinner */}
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                    <path d="M14 8a6 6 0 0 0-6-6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Loading…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Load More
                  <span className="px-2 py-[2px] rounded-full bg-amber-500/20 text-amber-500 text-[11px]">
                    +{Math.min(PAGE_SIZE, remaining)} more
                  </span>
                </>
              )}
            </button>
          )}

          {/* Collapse back to first page once all loaded */}
          {!hasMore && filtered.length > PAGE_SIZE && (
            <button
              onClick={() => {
                setVisibleCount(PAGE_SIZE);
                // scroll back up to gallery section
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 px-6 py-[9px] rounded-full text-[13px] font-semibold transition-all duration-200 border cursor-pointer"
              style={{
                background: "transparent",
                color: subColor,
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(30,58,95,0.15)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Show Less
            </button>
          )}
        </div>

        {/* Keyframe for staggered card entrance */}
        <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

        {/* ── Lightbox ───────────────────────── */}
        {lightboxIndex !== null && (
          <Lightbox
            images={visible}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </div>
    </section>
  );
}