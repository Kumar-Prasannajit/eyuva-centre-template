"use client";

import { useTheme } from "../context/ThemeContext";

function AdaptiveSectionTag({ label }: { label: string }) {
  const { theme } = useTheme();

  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="inline-block w-5 h-[2px] bg-amber-500" />
      <span
        className={`text-[11px] font-bold tracking-[0.14em] uppercase border-b-2 pb-px transition-colors duration-300 ${theme === "dark"
            ? "text-[#1e3a5f] border-[#1e3a5f]"
            : "text-slate-300 border-slate-300"
          }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function Ecosystem() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-20 px-6 md:px-12 transition-colors duration-300 ${isDark ? "bg-[#0d1f3c]" : "bg-[#f4f6f9]"
        }`}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`relative overflow-hidden rounded-3xl p-12 md:p-16 lg:p-20 transition-all duration-300 shadow-xl ${isDark
              ? "bg-white"
              : "bg-[#112045] border border-white/10"
            }`}
        >
          {/* Corner Glow Top Left */}
<div
  className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
  style={{
    background: isDark
      ? "rgba(245,158,11,0.08)"
      : "rgba(245,158,11,0.12)",
  }}
/>

{/* Corner Glow Bottom Right */}
<div
  className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
  style={{
    background: isDark
      ? "rgba(59,130,246,0.06)"
      : "rgba(255,255,255,0.06)",
  }}
/>

{/* Grid Pattern */}
<div
  className="absolute inset-0 pointer-events-none opacity-[0.05]"
  style={{
    backgroundImage: `
      linear-gradient(to right, currentColor 1px, transparent 1px),
      linear-gradient(to bottom, currentColor 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    color: isDark ? "#1e3a5f" : "#ffffff",
  }}
/>

<div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: `
      radial-gradient(circle at top left,
      rgba(245,158,11,0.10),
      transparent 35%),

      radial-gradient(circle at bottom right,
      rgba(59,130,246,0.08),
      transparent 40%)
    `,
  }}
/>
          <div className="relative z-10 text-center">
            <AdaptiveSectionTag label="Join The Ecosystem" />

            <h2
              className={`text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight leading-[1.15] mb-6 transition-colors duration-300 ${isDark ? "text-[#0d1f3c]" : "text-white"
                }`}
            >
              Transform Ideas into{" "}
              <span className="text-amber-500">
                Impactful Innovations.
              </span>
            </h2>

            <p
              className={`text-[15px] leading-[1.7] max-w-[640px] mx-auto mb-12 transition-colors duration-300 ${isDark ? "text-slate-600" : "text-slate-300"
                }`}
            >
              Join a growing ecosystem of innovators, researchers,
              entrepreneurs, and future biotech leaders shaping India's
              bioeconomy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="py-3 px-8 rounded-full font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all duration-200 flex items-center justify-center gap-2">
                Apply for Fellowship
                <span className="text-xl">→</span>
              </button>

              <button
                className={`py-3 px-8 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isDark
                    ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    : "border border-white/20 text-white hover:bg-white/10"
                  }`}
              >
                💬 Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}