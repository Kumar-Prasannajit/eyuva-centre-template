/* LabBooking.tsx — with theme support */

"use client";

import { useTheme } from "../context/ThemeContext";

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.6"/>
        <path d="M10 6v4l2.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real-Time Availability",
    desc:  "Live slots for every instrument across labs.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="white" strokeWidth="1.6"/>
        <path d="M3 8h14M7 2v3M13 2v3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: "Slot Booking",
    desc:  "Reserve in seconds with calendar-style picker.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="11" rx="2" stroke="white" strokeWidth="1.6"/>
        <path d="M6 9h8M6 13h5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="13" y="2" width="5" height="5" rx="1" stroke="white" strokeWidth="1.4"/>
      </svg>
    ),
    title: "Equipment Management",
    desc:  "Track usage, maintenance and SOPs in one place.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="8" width="10" height="9" rx="1.5" stroke="white" strokeWidth="1.6"/>
        <path d="M7 8V6a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="1.2" fill="white"/>
      </svg>
    ),
    title: "Facility Access",
    desc:  "Unified access to centralized research infrastructure.",
  },
];

/* Teal check circle SVG */
function TealCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="flex-shrink-0">
      <circle cx="11" cy="11" r="10" stroke="#0d9488" strokeWidth="1.4"/>
      <path d="M7 11l3 3 5-5.5" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Blurred browser mockup (right side) */
function BrowserMockup() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Fake blurred table rows
  const rows = [
    { w1: "w-36", w2: "w-20", color: "bg-emerald-400" },
    { w1: "w-44", w2: "w-16", color: "bg-amber-400" },
    { w1: "w-32", w2: "w-24", color: "bg-red-400" },
    { w1: "w-40", w2: "w-20", color: "bg-emerald-400" },
    { w1: "w-36", w2: "w-16", color: "bg-amber-300" },
  ];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border shadow-xl transition-colors duration-300 ${
        isDark
          ? 'border-white/[0.08]'
          : 'border-gray-200'
      }`}
      style={{
        background: isDark
          ? "rgba(13,31,60,0.55)"
          : "rgba(226,232,240,0.55)",
        backdropFilter: "blur(2px)"
      }}
    >
      {/* Browser chrome */}
      <div className={`flex items-center gap-2 px-4 py-3 border-b transition-colors duration-300 ${
        isDark
          ? 'bg-white/5 border-white/[0.08]'
          : 'bg-white/60 border-gray-200/60'
      }`}>
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className={`ml-3 flex-1 h-[22px] rounded-md transition-colors duration-300 ${
          isDark ? 'bg-white/10' : 'bg-gray-200/70'
        }`} />
      </div>

      {/* Blurred content beneath overlay */}
      <div className="relative px-6 pt-5 pb-6">
        {/* Fake blurred rows */}
        <div className="space-y-4 blur-[3px] select-none pointer-events-none">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className={`h-3 ${r.w1} rounded ${isDark ? 'bg-white/20' : 'bg-gray-300/80'}`} />
              <div className={`h-6 ${r.w2} rounded-full ${r.color} opacity-70`} />
            </div>
          ))}
        </div>

        {/* Coming-soon card — centred overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <div className={`rounded-2xl shadow-2xl px-8 py-8 text-center w-full max-w-[320px] transition-colors duration-300 ${
            isDark ? 'bg-[#0d1f3c]' : 'bg-white'
          }`}>
            {/* Lock + label */}
            <div className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase mb-4 transition-colors duration-300 ${
              isDark ? 'text-slate-500' : 'text-gray-500'
            }`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="3" y="6" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Coming Soon
            </div>

            <h3 className={`text-[22px] font-extrabold mb-3 leading-snug transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-[#1e3a5f]'
            }`}>
              Launch Booking Portal
            </h3>
            <p className={`text-[14px] leading-[1.6] mb-6 transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}>
              Our online lab equipment booking portal is launching soon.
              Stay tuned.
            </p>

            <button className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-white text-[15px] font-bold transition-all duration-200 hover:-translate-y-px active:scale-95 cursor-pointer border-none">
              Launch Booking Portal
            </button>
          </div>
        </div>

        {/* Extra bottom rows to push height */}
        <div className="space-y-4 blur-[3px] select-none pointer-events-none mt-4">
          {rows.slice(0, 2).map((r, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className={`h-3 ${r.w1} rounded ${isDark ? 'bg-white/20' : 'bg-gray-300/80'}`} />
              <div className={`h-6 ${r.w2} rounded-full ${r.color} opacity-70`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SECTION TAG ───────────────────────────── */
function AdaptiveSectionTag({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="inline-block w-5 h-[2px] bg-amber-500" />
      <span className={`text-[11px] font-bold tracking-[0.14em] uppercase border-b-2 pb-px transition-colors duration-300 ${
        theme === 'dark'
          ? 'text-slate-400 border-slate-400'
          : 'text-[#1e3a5f] border-[#1e3a5f]'
      }`}>
        {label}
      </span>
    </div>
  );
}

/* ── MAIN ──────────────────────────────────── */
export default function LabBooking() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
  id="lab-booking"
  className={`relative px-6 md:px-16 pt-16 pb-24 overflow-hidden transition-colors duration-300 ${
    isDark ? "bg-[#0d1f3c]" : "bg-[#f4f6f9]"
  }`}
>
      {/* ── Centered header ─────────────────── */}
      <div className="text-center max-w-[680px] mx-auto mb-16">
        <AdaptiveSectionTag label="Lab Operations" />
        <h2
  className={`text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.1] mb-5 transition-colors duration-300 ${
    isDark ? "text-white" : "text-[#1e3a5f]"
  }`}
>
          Book Laboratory Equipment{" "}
          <span className="text-amber-500">Online</span>
        </h2>
        <p
  className={`text-[16px] leading-[1.7] transition-colors duration-300 ${
    isDark ? "text-slate-400" : "text-gray-500"
  }`}
>
          Reserve advanced laboratory instruments and research facilities
          through our digital booking platform.
        </p>
      </div>

      {/* ── 2-col layout ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto">

        {/* LEFT — feature list */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`flex flex-col items-center text-center p-3 gap-2 sm:flex-row sm:items-center sm:text-left sm:gap-4 rounded-xl transition-all duration-300 ${
                isDark
                  ? "bg-[#112045] border border-white/[0.08]"
                  : "bg-white border border-gray-200 hover:shadow-sm"
              }`}
            >
              {/* Navy icon square */}
              <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? "bg-[#1b315f]" : "bg-[#1e3a5f]"
              }`}>
                <div className="scale-75 sm:scale-100 flex items-center justify-center">
                  {f.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[11px] sm:text-[15px] font-bold mb-[1px] leading-tight transition-colors duration-300 line-clamp-2`}
                  style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
                >
                  {f.title}
                </div>
                <div
                  className={`hidden sm:block text-[13px] transition-colors duration-300`}
                  style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
                >
                  {f.desc}
                </div>
              </div>

              {/* Teal check */}
              <div className="hidden sm:block">
                <TealCheck />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — browser mockup */}
        <BrowserMockup />
      </div>
    </section>
  );
}