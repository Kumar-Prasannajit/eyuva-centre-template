"use client";

import DnaHelix from "../components/DNAStage";
import { useTheme } from "../context/ThemeContext";
import { SITE, LOCATION_LINE } from "@/content/site";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center pt-[100px] pb-16 px-6 md:px-12 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0a1628]' : 'bg-white'
        }`}
      style={{
        background: isDark
          ? `
              radial-gradient(ellipse 80% 60% at 70% 50%, rgba(37,99,235,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(245,158,11,0.06) 0%, transparent 60%),
              #0a1628
            `
          : `
              radial-gradient(ellipse 80% 60% at 70% 50%, rgba(37,99,235,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(245,158,11,0.03) 0%, transparent 60%),
              #f8f9fa
            `,
      }}
    >
      {/* Star / dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
      `
            : `
        linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)
      `,
          backgroundSize: "56px 56px",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(circle at center, black 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 50%, transparent 100%)",
        }}
      />
      <div className="w-full relative z-10 flex flex-col lg:flex-row items-start gap-12 justify-center align center">
        {/* ── LEFT: Content ────────────────────── */}
        <div className="relative z-10 flex-1 max-w-[620px]">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 mb-9 ${isDark
              ? 'border-white/18 bg-white/[0.04] text-slate-300'
              : 'border-blue-300 bg-blue-50 text-blue-600'
            }`}>
            <span className="text-base leading-none">✦</span>
            Supported by BIRAC · DBT · Govt. of India
          </div>

          {/* Headline */}
          <h1 className={`text-[clamp(52px,7vw,80px)] font-black leading-[1.0] tracking-tight mb-3 transition-colors duration-300 ${isDark ? 'text-white' : 'text-blue-900'
            }`}>
            BIRAC{" "}
            <span className="text-amber-500">E-YUVA</span>
            <br />
            Center
          </h1>

          {/* Location */}
          <p className={`text-[13px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'
            }`}>
            {LOCATION_LINE}
          </p>

          {/* Quote */}
          <p className={`text-[17px] italic font-medium transition-colors duration-300 mb-5 ${isDark ? 'text-amber-300' : 'text-amber-600'
            }`}>
            &ldquo;{SITE.heroQuote}&rdquo;
          </p>

          {/* Description */}
          <p className={`text-[15px] leading-[1.7] max-w-[500px] transition-colors duration-300 mb-10 ${isDark ? 'text-slate-300' : 'text-gray-600'
            }`}>
            {SITE.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-7">
            <a
              href="#programs"
              className={`inline-flex items-center gap-2 px-7 py-[14px] rounded-lg text-[15px] font-bold no-underline transition-all duration-200 ${isDark
                  ? 'bg-amber-500 text-[#0a1628] hover:bg-amber-400'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
                } hover:-translate-y-px active:scale-95`}
            >
              🚀 Explore Programs
            </a>
            <a
              href="#projects"
              className={`inline-flex items-center gap-2 px-7 py-[14px] rounded-lg border text-[15px] font-semibold no-underline transition-all duration-200 ${isDark
                  ? 'border-white/25 text-white hover:border-white/50 hover:bg-white/[0.04]'
                  : 'border-blue-900/25 text-blue-900 hover:border-blue-900/50 hover:bg-blue-900/[0.04]'
                }`}
            >
              🔬 View Research Projects
            </a>
          </div>

          {/* Text link */}
          <a
            href="#lab-booking"
            className={`inline-flex items-center gap-2 text-[14px] font-medium no-underline transition-colors duration-200 group ${isDark
                ? 'text-slate-300 hover:text-white'
                : 'text-blue-700 hover:text-blue-900'
              }`}
          >
            Book Laboratory Equipment
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* ── RIGHT: Visual ─────────────────────── */}
        <div className="relative z-10 flex flex-col items-center w-full lg:flex-shrink-0 lg:w-auto lg:items-end gap-4 lg:ml-8">
          {/* Live lab card */}
          <div className={`relative z-20 rounded-xl p-4 min-w-[240px] backdrop-blur-sm transition-colors duration-300 ${isDark
              ? 'bg-[#112045]/90 border border-white/12'
              : 'bg-white/50 border border-gray-200'
            }`}>
            <div className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-2 ${isDark ? 'text-amber-500' : 'text-amber-600'
              }`}>
              ⚡ Live Lab
            </div>
            <div className={`text-[15px] font-semibold transition-colors duration-300 mb-2 ${isDark ? 'text-white' : 'text-blue-900'
              }`}>
              {SITE.heroLiveLab}
            </div>
            <div className={`flex items-center gap-2 text-[12px] transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
              <span
                className="live-dot w-[7px] h-[7px] rounded-full bg-green-500"
                style={{ boxShadow: "0 0 6px #22c55e" }}
              />
              Real-time availability
            </div>
          </div>

          {/* DNA Helix */}
          <div className="relative w-[380px] h-[500px] lg:-translate-y-15">
            <DnaHelix />

            {/* Fellowship card (overlaid at bottom-right) */}
            <div className={`absolute bottom-5 right-0 rounded-xl px-5 py-3 backdrop-blur-sm transition-colors duration-300 ${isDark
                ? 'bg-[#112045]/90 border border-white/12'
                : 'bg-white/50 border border-gray-200'
              }`}>
              <div className={`text-[10px] font-bold tracking-[0.14em] uppercase transition-colors duration-300 mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'
                }`}>
                {SITE.heroFellowshipLabel}
              </div>
              <div className={`text-[14px] font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-blue-900'
                }`}>
                {SITE.heroFellowshipValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
