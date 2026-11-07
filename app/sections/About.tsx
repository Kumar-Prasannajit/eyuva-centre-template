"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import PartnersMarquee from "../components/PartnersMarquee";
import { SITE } from "@/content/site";
import { CAPSULES, STATS, MINI_STATS } from "@/content/about";

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const dur = 1500;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setDisplay(Math.round(ease(p) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return <>{display}</>;
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <div className={`inline-flex items-center gap-[10px] text-[10px] font-bold tracking-[0.16em] uppercase mb-5 transition-colors duration-300 ${theme === "dark" ? "text-slate-400" : "text-gray-400"
      }`}>
      <span className="inline-block w-5 h-[2px] rounded-full bg-amber-500 flex-shrink-0" />
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ stat, theme }: { stat: (typeof STATS)[number]; theme: string }) {
  const dark = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isHero = !!stat.hero;
  const isTall = !!stat.tall;
  const isHighlight = !!stat.highlight;
  const hasBg = !!stat.bgImg;

  /* ── Card shell styles ─────────────────────────
     When a bg image is set:
       - shell is always dark (image provides colour)
       - border becomes white/10 in both themes
     When no image:
       - follow dark/light theme as before
  ──────────────────────────────────────────────── */
  const shellBorder = hasBg
    ? "border-white/10"
    : isHighlight
      ? dark
        ? "border-amber-400/30 shadow-[0_0_0_1px_rgba(245,158,11,0.12)]"
        : "border-amber-300 shadow-[0_0_0_1px_rgba(245,158,11,0.25)]"
      : dark
        ? "border-white/[0.08]"
        : "border-gray-200";

  /* ── Text colours ───────────────────────────────
     With a bg image everything is forced white/amber.
     Without, follows dark/light theme.
  ──────────────────────────────────────────────── */
  const valueColor = hasBg ? "text-white" : dark ? "text-white" : "text-[#1e3a5f]";
  const labelColor = "text-amber-400";                   // always amber
  const descColor = hasBg ? "text-white/65" : dark ? "text-slate-400" : "text-gray-500";
  const ghostColor = hasBg ? "rgba(255,255,255,0.05)" : dark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)";
  const dotColor = isHighlight || isHero ? "bg-amber-400 animate-pulse" : hasBg ? "bg-white/30" : dark ? "bg-white/20" : "bg-gray-200";

  /* Value font size: hero/tall = bigger */
  const valSize = isHero ? "text-[72px]" : isTall ? "text-[64px]" : "text-[48px]";

  /* Inner bg — only shown when no image */
  const innerBg = hasBg
    ? ""
    : isHero
      ? dark ? "bg-gradient-to-br from-[#0d2347] to-[#0a1e3a]" : "bg-gradient-to-br from-blue-50 to-white"
      : isTall
        ? dark ? "bg-gradient-to-b from-[#0f2347] to-[#0d1f3c]" : "bg-gradient-to-b from-blue-50 to-white"
        : dark ? "bg-[#112045]" : "bg-white";

  return (
    <div
      ref={ref}
      style={{ gridArea: stat.gridArea }}
      className={`relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default ${shellBorder}`}
    >
      {/* ── Background image layer ──────────────── */}
      {hasBg && (
        <>
          <Image
            src={stat.bgImg!}
            alt={stat.label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 900px) 50vw, 33vw"
          />
          {/* Scrim — adapts slightly per theme but always dark enough for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(135deg, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.65) 100%)"
                : "linear-gradient(135deg, rgba(15,30,55,0.78) 0%, rgba(15,30,55,0.60) 100%)",
            }}
          />
        </>
      )}

      {/* ── Card content ────────────────────────── */}
      <div className={`relative z-10 flex flex-col justify-between h-full p-7 ${innerBg}`}>

        {/* Dot indicator top-right */}
        <div className="flex justify-end mb-4">
          <span className={`w-[10px] h-[10px] rounded-full flex-shrink-0 ${dotColor}`} />
        </div>

        {/* Ghost watermark on tall cards */}
        {(isHero || isTall) && (
          <div
            aria-hidden
            className="absolute bottom-4 right-4 font-black leading-none pointer-events-none select-none"
            style={{ fontSize: 88, color: ghostColor }}
          >
            {stat.value}
          </div>
        )}

        {/* Value + label + desc */}
        <div className="mt-auto">
          <div className={`font-black leading-none tracking-tight mb-2 ${valSize} ${valueColor}`}>
            {isHero
              ? stat.value
              : <AnimatedCounter target={stat.value} active={active} />}
            {stat.plus && (
              <span className="text-amber-400" style={{ fontSize: "0.65em", lineHeight: 1 }}>+</span>
            )}
          </div>

          <div className={`text-[10px] font-black tracking-[0.14em] uppercase mb-2 ${labelColor}`}>
            {stat.label}
          </div>

          {stat.description && (
            <p className={`text-[12.5px] leading-relaxed ${descColor}`}>
              {stat.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function About() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      id="about"
      className={`transition-colors duration-300 ${dark ? "bg-[#0d1f3c]" : "bg-white"}`}
    >

      {/* ══════════════════════════════════════
          1. PARTNERS & SPONSORS
      ══════════════════════════════════════ */}
      <div className={`transition-colors duration-300 ${dark ? "bg-[#050c18] border-b border-white/[0.07]" : "bg-gray-50 border-b border-gray-100"
        }`}>
        <div className="px-6 md:px-16 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-end max-w-[1280px] mx-auto">
          <div>
            <SectionLabel label="Partners & Sponsors" />
            <h2 className={`text-[clamp(22px,3vw,36px)] font-bold leading-snug tracking-tight transition-colors duration-300 ${dark ? "text-white" : "text-blue-900"
              }`}>
              Backed by India&apos;s leading<br />
              <span className="text-amber-500">biotech ecosystem</span>
            </h2>
          </div>
          <p className={`text-[14px] leading-[1.75] max-w-[420px] transition-colors duration-300 ${dark ? "text-slate-400" : "text-gray-500"
            }`}>
            A consortium of national research institutions, biotech incubators,
            and government bodies powering our mission to build the next
            generation of science-led companies.
          </p>
        </div>
        <div className={`transition-colors duration-300 ${dark ? "border-t border-white/[0.07]" : "border-t border-gray-100"
          }`}>
          <PartnersMarquee />
        </div>
      </div>

      {/* ══════════════════════════════════════
          2. ABOUT E-YUVA
      ══════════════════════════════════════ */}
      <div className={`px-6 md:px-16 py-24 transition-colors duration-300 ${dark ? "bg-[#112045]" : "bg-slate-50"
        }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-[1280px] mx-auto">

          {/* LEFT — mosaic */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: "240px 240px" }}>
              <div className="row-span-2 rounded-2xl overflow-hidden relative group">
                <Image src={SITE.aboutImages[0].src} alt={SITE.aboutImages[0].alt} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="25vw" />
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                <Image src={SITE.aboutImages[1].src} alt={SITE.aboutImages[1].alt} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="25vw" />
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                <Image src={SITE.aboutImages[2].src} alt={SITE.aboutImages[2].alt} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="25vw" />
              </div>
            </div>
            <div className={`absolute bottom-5 left-3 rounded-xl shadow-xl px-5 py-4 max-w-[185px] backdrop-blur-sm transition-colors duration-300 ${dark ? "bg-[#0a1628]/90 border border-white/[0.1]" : "bg-white/90 border border-gray-100"
              }`}>
              <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-amber-500 mb-1">Since {SITE.established}</div>
              <div className={`text-[12.5px] font-semibold leading-snug transition-colors duration-300 ${dark ? "text-slate-200" : "text-blue-900"
                }`}>
                {SITE.aboutBadge}
              </div>
            </div>
          </div>

          {/* RIGHT — text */}
          <div className="pt-2">
            <SectionLabel label="About E-YUVA" />
            <h2 className={`text-[clamp(28px,3.5vw,46px)] font-extrabold leading-[1.12] tracking-tight mb-6 transition-colors duration-300 ${dark ? "text-white" : "text-blue-900"
              }`}>
              Bench to business —{" "}
              <span className="text-amber-500">built for India&apos;s next generation.</span>
            </h2>
            <p className={`text-[14px] leading-[1.8] mb-4 transition-colors duration-300 ${dark ? "text-slate-400" : "text-gray-600"
              }`}>
              {SITE.aboutParagraphs[0]}
            </p>
            <p className={`text-[14px] leading-[1.8] mb-10 transition-colors duration-300 ${dark ? "text-slate-400" : "text-gray-600"
              }`}>
              {SITE.aboutParagraphs[1]}
            </p>
            <div className="grid grid-cols-2 gap-[10px]">
              {CAPSULES.map((c) => (
                <div key={c} className={`flex items-center gap-[10px] px-4 py-[11px] rounded-full border text-[12.5px] font-medium transition-all duration-200 ${dark
                    ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-teal-500/30 hover:bg-teal-500/[0.05]"
                    : "border-gray-200 bg-white text-blue-900 hover:border-teal-400/50 hover:bg-teal-50"
                  }`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                    <circle cx="8" cy="8" r="7.2" stroke={dark ? "#14b8a6" : "#0d9488"} strokeWidth="1.2" />
                    <path d="M4.8 8l2.2 2.2 4-4.4" stroke={dark ? "#14b8a6" : "#0d9488"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          3. OUR IMPACT — DASHBOARD GRID
      ══════════════════════════════════════ */}
      <div className={`px-6 md:px-16 py-20 relative overflow-hidden transition-colors duration-300 ${dark ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"
        }`}>

        {/* Dot texture */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: dark
            ? "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(30,58,95,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="max-w-[1280px] mx-auto relative">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <SectionLabel label="Our Impact" />
              <h2 className={`text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.12] tracking-tight transition-colors duration-300 ${dark ? "text-white" : "text-[#1e3a5f]"
                }`}>
                Measurable outcomes.<br />
                <span className="text-amber-500">Lasting impact.</span>
              </h2>
            </div>
            <span className={`inline-flex items-center gap-2 px-4 py-[7px] rounded-full border text-[11px] font-semibold self-start sm:self-auto shrink-0 transition-colors duration-300 ${dark
                ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                : "border-amber-300 bg-amber-50 text-amber-600"
              }`}>
              <span className="w-[6px] h-[6px] rounded-full bg-amber-400 animate-pulse" />
              Live metrics
            </span>
          </div>

          {/* Named-area grid */}
          <style>{`
            #impact-grid {
              display: grid;
              gap: 12px;
              grid-template-columns: 1.1fr 1fr 1fr;
              grid-template-rows: 220px 220px 200px;
              grid-template-areas:
                "established students  research"
                "established students  awards"
                "grants      publications collabs";
            }
            @media (max-width: 900px) {
              #impact-grid {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto;
                grid-template-areas: none;
              }
              #impact-grid > * { grid-area: unset !important; min-height: 180px; }
            }
            @media (max-width: 560px) {
              #impact-grid { grid-template-columns: 1fr; }
            }
          `}</style>

          <div id="impact-grid">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} theme={theme} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {MINI_STATS.map((m) => (
              <div key={m.label} className="rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-amber-500">{m.value}</div>
                <div className="text-xs uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}