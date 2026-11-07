"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

import { PARTNERS } from "@/content/partners";

export { PARTNERS };

function PartnerCard({
  partner,
  isDark,
}: {
  partner: (typeof PARTNERS)[number];
  isDark: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-between rounded-xl border p-5 text-center ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mb-4 flex h-24 w-full items-center justify-center">
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={140}
          height={60}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-semibold">{partner.name}</h4>
        {partner.website ? (
          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-amber-500 hover:underline"
          >
            Visit website
          </a>
        ) : (
          <span className="text-sm text-slate-400">Website coming soon</span>
        )}
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [showPartnersModal, setShowPartnersModal] = useState(false);

  const marqueePartners = PARTNERS.filter(
    (p) => p.logo
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const speed = 0.5;
    const step = () => {
      if (!pausedRef.current) {
        pos -= speed;
        if (Math.abs(pos) >= track.scrollWidth / 3) pos = 0;
        track.style.transform = `translateX(${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...marqueePartners, ...marqueePartners, ...marqueePartners];

  return (
    <>
      <div
        className="overflow-hidden w-full relative group"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {/* View Partners Button */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={() => setShowPartnersModal(true)}
            className="pointer-events-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-xl"
          >
            View Our Partners
          </button>
        </div>

        {/* Edge Fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${isDark ? "#050c18" : "#f8fafc"
              }, transparent)`,
          }}
        />

        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${isDark ? "#050c18" : "#f8fafc"
              }, transparent)`,
          }}
        />

        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{ width: "max-content" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center flex-shrink-0 px-10 py-5"
              style={{
                borderRight: `1px solid ${isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(30,58,95,0.08)"
                  }`,
                opacity: 0.75,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.75";
              }}
            >
              <div
                className="relative flex-shrink-0"
                style={{
                  width: 140,
                  height: 60,
                }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PARTNERS MODAL */}

      {showPartnersModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowPartnersModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 ${isDark
                ? "bg-[#0d1f3c] text-white"
                : "bg-white text-[#1e3a5f]"
              }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                Our Partner Ecosystem
              </h2>

              <button
                onClick={() => setShowPartnersModal(false)}
                className="w-10 h-10 rounded-full bg-red-500 text-white"
              >
                ✕
              </button>
            </div>

            {/* Knowledge Partners */}

            <div className="mb-10">
              <h3 className="text-xl font-bold text-amber-500 mb-4">
                Knowledge Partners
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {PARTNERS.filter(
                  (p) => p.category === "Knowledge Partner"
                ).map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} isDark={isDark} />
                ))}
              </div>
            </div>

            {/* Industry Partners */}

            <div className="mb-10">
              <h3 className="text-xl font-bold text-amber-500 mb-4">
                Industry Partners
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {PARTNERS.filter(
                  (p) => p.category === "Industry Partner"
                ).map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} isDark={isDark} />
                ))}
              </div>
            </div>

            {/* Academic Partners */}

            <div className="mb-10">
              <h3 className="text-xl font-bold text-amber-500 mb-4">
                Academic & Research Partner
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {PARTNERS.filter(
                  (p) => p.category === "Academic Partner"
                ).map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} isDark={isDark} />
                ))}
              </div>
            </div>

            {/* Institutes */}

            <div>
              <h3 className="text-xl font-bold text-amber-500 mb-4">
                Academic & Research Institutes Supported
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {PARTNERS.filter(
                  (p) => p.category === "Supported Institute"
                ).map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} isDark={isDark} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}