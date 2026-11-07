"use client";

import type { CSSProperties } from "react";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";
import { SITE } from "@/content/site";
import {
  translationalCategoryMap,
  coeCategoryMap,
  nationalOutreachEvents,
} from "../programs/data";

type Tone = "amber" | "teal" | "blue" | "purple" | "fuchsia";

const toneStyles: Record<
  Tone,
  { text: string; textDark: string; textLight: string; bg: string; border: string; glow: string; gradient: string; shadow: string }
> = {
  amber: {
    text: "text-amber-300",
    textDark: "#fde68a",
    textLight: "#92400e",
    bg: "bg-amber-400/10",
    border: "border-amber-300/25",
    glow: "group-hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]",
    gradient: "from-amber-300 via-orange-400 to-amber-500",
    shadow: "rgba(245,158,11,0.14)",
  },
  teal: {
    text: "text-teal-300",
    textDark: "#5eead4",
    textLight: "#0f766e",
    bg: "bg-teal-300/10",
    border: "border-teal-200/20",
    glow: "group-hover:shadow-[0_20px_50px_rgba(20,184,166,0.14)]",
    gradient: "from-teal-300 via-cyan-400 to-blue-500",
    shadow: "rgba(20,184,166,0.12)",
  },
  blue: {
    text: "text-sky-300",
    textDark: "#7dd3fc",
    textLight: "#0369a1",
    bg: "bg-sky-300/10",
    border: "border-sky-200/20",
    glow: "group-hover:shadow-[0_20px_50px_rgba(56,189,248,0.14)]",
    gradient: "from-blue-300 via-sky-400 to-cyan-400",
    shadow: "rgba(56,189,248,0.12)",
  },
  purple: {
    text: "text-violet-300",
    textDark: "#c4b5fd",
    textLight: "#6d28d9",
    bg: "bg-violet-300/10",
    border: "border-violet-200/20",
    glow: "group-hover:shadow-[0_20px_50px_rgba(167,139,250,0.14)]",
    gradient: "from-violet-300 via-fuchsia-400 to-purple-500",
    shadow: "rgba(139,92,246,0.12)",
  },
  fuchsia: {
    text: "text-fuchsia-300",
    textDark: "#e879f9",
    textLight: "#86198f",
    bg: "bg-fuchsia-300/10",
    border: "border-fuchsia-200/20",
    glow: "group-hover:shadow-[0_20px_50px_rgba(232,121,249,0.14)]",
    gradient: "from-fuchsia-300 via-pink-400 to-purple-500",
    shadow: "rgba(232,121,249,0.12)",
  },
};

function themeVars(isDark: boolean): CSSProperties {
  return {
    "--p-bg": isDark ? "#0d1f3c" : "#f8fafc",
    "--p-text": isDark ? "#ffffff" : "#10233f",
    "--p-text-soft": isDark ? "#cbd5e1" : "#334155",
    "--p-text-muted": isDark ? "#94a3b8" : "#64748b",
    "--p-text-faint": isDark ? "#64748b" : "#7890aa",
    "--p-card-bg": isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.86)",
    "--p-card-border": isDark ? "rgba(255,255,255,0.08)" : "rgba(15,35,66,0.10)",
    "--p-card-border-h": isDark ? "rgba(255,255,255,0.18)" : "rgba(245,158,11,0.30)",
    "--p-panel-bg": isDark ? "rgba(2,6,23,0.30)" : "rgba(248,250,252,0.80)",
    "--p-panel-bg-s": isDark ? "rgba(2,6,23,0.50)" : "rgba(255,255,255,0.90)",
    "--p-line": isDark ? "rgba(255,255,255,0.14)" : "rgba(15,35,66,0.12)",
    "--p-grid": isDark ? "rgba(255,255,255,0.10)" : "rgba(15,35,66,0.08)",
    "--p-shadow": isDark ? "0 20px 50px rgba(0,0,0,0.22)" : "0 18px 50px rgba(15,35,66,0.10)",
    "--p-overlay": isDark
      ? "linear-gradient(135deg,rgba(255,255,255,0.06),transparent 30%,rgba(255,255,255,0.02))"
      : "linear-gradient(135deg,rgba(255,255,255,0.85),transparent 40%,rgba(245,158,11,0.06))",
    "--p-ambient": isDark
      ? "radial-gradient(ellipse_at_50%_-10%,rgba(245,158,11,0.15),transparent_40%),radial-gradient(ellipse_at_10%_35%,rgba(20,184,166,0.10),transparent_32%),radial-gradient(ellipse_at_90%_65%,rgba(124,58,237,0.12),transparent_36%)"
      : "radial-gradient(ellipse_at_50%_-10%,rgba(245,158,11,0.14),transparent_38%),radial-gradient(ellipse_at_10%_35%,rgba(20,184,166,0.08),transparent_32%),radial-gradient(ellipse_at_90%_65%,rgba(59,130,246,0.09),transparent_36%)",
    "--p-top-wash": isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.65)",
    "--p-img-overlay": isDark
      ? "linear-gradient(to bottom right,rgba(7,18,38,0.94),rgba(13,31,60,0.80),rgba(16,19,58,0.88))"
      : "linear-gradient(to bottom right,rgba(248,250,252,0.92),rgba(226,241,248,0.78),rgba(241,245,249,0.90))",
  } as CSSProperties;
}

// ── Data ──

const fellowshipPanels = [
  {
    title: "E-YUVA Fellowship",
    label: "Student Innovation Track",
    tone: "amber" as Tone,
    sections: [
      {
        title: "Eligibility",
        items: ["Undergraduate students", "Team of 3-5 members", "Faculty Mentor Mandatory"],
      },
      {
        title: "Benefits",
        items: ["Fellowship Support", "Research Grant", "Technical Mentorship", "Industry Exposure", "Prototype Development"],
      },
    ],
  },
  {
    title: "Innovation Fellowship",
    label: "Advanced Research Track",
    tone: "purple" as Tone,
    sections: [
      {
        title: "For",
        items: ["Post Master's Candidates", "Post Doctoral Candidates"],
      },
      {
        title: "Benefits",
        items: ["Monthly Fellowship", "Research Grant", "Startup Mentorship", "IP Support", "Commercialization Guidance"],
      },
    ],
  },
];

const roadmap = [
  "National Call",
  "Application",
  "Screening",
  "Technical Evaluation",
  "Presentation",
  "Fellowship Award",
  "Mentoring",
  "Startup Formation",
];

const outreach = [
  {
    title: "Fellowship Outreach",
    tone: "teal" as Tone,
    items: ["College Visits", "University Outreach", "Fellowship Awareness"],
  },
  {
    title: "Entrepreneurship Awareness",
    tone: "blue" as Tone,
    items: ["Entrepreneurship Orientation", "Innovation Mindset", "Startup Awareness"],
  },
];

const translationalCards: {
  title: string;
  slug: string;
  tone: Tone;
  icon: "conference" | "workshop" | "hackathon" | "webinar" | "fdp" | "bootcamp";
}[] = [
  { title: "Conferences", slug: "conferences", tone: "blue", icon: "conference" },
  { title: "Workshops", slug: "workshops", tone: "amber", icon: "workshop" },
  { title: "Hackathons", slug: "hackathons", tone: "teal", icon: "hackathon" },
  { title: "Webinars", slug: "webinars", tone: "purple", icon: "webinar" },
  { title: "FDP Conducted", slug: "fdp", tone: "amber", icon: "fdp" },
  { title: "Startup Bootcamps", slug: "startup-bootcamps", tone: "fuchsia", icon: "bootcamp" },
];

const communityCards: { title: string; slug: string; tone: Tone; chips: string[] }[] = [
  { title: "End User Interaction", slug: "end-user-interaction", tone: "amber", chips: ["Farmer Interaction", "Need Assessment", "Stakeholder Meet"] },
  { title: "Site Visits", slug: "site-visits", tone: "teal", chips: ["Rural Communities", "Industry Sites", "Tech Demo"] },
  { title: "Industry Exposure", slug: "industry-exposure", tone: "blue", chips: ["Industrial Visits", "Startup Visits", "Manufacturing"] },
  { title: "Grassroot Innovation", slug: "grassroot-innovation", tone: "purple", chips: ["Problem ID", "Innovation Mapping", "Pilot Testing"] },
];

// ── Icons ──

function CategoryIcon({ name, className = "" }: { name: string; className?: string }) {
  const c = "fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]";
  const icons: Record<string, React.ReactElement> = {
    conference: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path className={c} d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>
    ),
    workshop: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" /></svg>
    ),
    hackathon: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="m13 2-2 2.5h3L12 7M10 14v-2M14 14v-2" /><path className={c} d="M16.5 9.4 7.55 9.4a1 1 0 0 0-.98.8l-1.57 8a1 1 0 0 0 .98 1.2h12.05a1 1 0 0 0 .98-1.2l-1.53-8a1 1 0 0 0-.98-.8Z" /></svg>
    ),
    webinar: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M2 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8ZM22 8l-4 3v2l4 3V8Z" /></svg>
    ),
    fdp: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M22 10v6M2 10l10-5 10 5-10 5Z" /><path className={c} d="M6 12v5c3 3 10 3 12 0v-5" /></svg>
    ),
    bootcamp: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path className={c} d="m19 14 .7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9Z" /><path className={c} d="m5 17 .5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5Z" /></svg>
    ),
    fellowship: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M7 4h10v4a5 5 0 0 1-10 0V4Z" /><path className={c} d="M8 19h8M10 15v4M14 15v4M17 6h3a3 3 0 0 1-3 3M7 6H4a3 3 0 0 0 3 3" /></svg>
    ),
    outreach: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0" /><path className={c} d="M12 14v6M8 20h8" /></svg>
    ),
    community: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 21a7 7 0 0 1 14 0" /><path className={c} d="M5 10a2.5 2.5 0 1 0 0-5M19 10a2.5 2.5 0 1 1 0-5M2 20a5 5 0 0 1 5-5M22 20a5 5 0 0 0-5-5" /></svg>
    ),
    research: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M9 3v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V3" /><path className={c} d="M8 3h8M7 15h10" /></svg>
    ),
    national: (
      <svg viewBox="0 0 24 24" className={className}><path className={c} d="M3 21h18M3 10h18M5 6l7-3 7 3" /><path className={c} d="M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" /></svg>
    ),
  };
  return icons[name] || icons["conference"];
}

// ── Sub-components ──

function SectionBadge({ number, title, tone, isDark }: { number: string; title: string; tone: Tone; isDark: boolean }) {
  const s = toneStyles[tone];
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2.5">
      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${s.bg} ${s.border} ${s.text}`}>
        {number}
      </span>
      <span className="h-px w-8" style={{ background: "var(--p-line)" }} />
      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: isDark ? "#94a3b8" : "#52667f" }}>{title}</span>
    </div>
  );
}

function GlassCard({ children, className = "", tone = "amber" }: { children: React.ReactNode; className?: string; tone?: Tone }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 ${toneStyles[tone].glow} ${className}`}
      style={{
        background: "var(--p-card-bg)",
        borderColor: "var(--p-card-border)",
        boxShadow: "var(--p-shadow)",
      }}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${toneStyles[tone].gradient} opacity-60`} />
      <div className="absolute inset-0 opacity-70" style={{ background: "var(--p-overlay)" }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CompactChip({ label, tone = "amber", isDark }: { label: string; tone?: Tone; isDark: boolean }) {
  const s = toneStyles[tone];
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-tight ${s.bg} ${s.border}`}
      style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
    >
      {label}
    </span>
  );
}

function DetailPanel({ panel, isDark }: { panel: (typeof fellowshipPanels)[number]; isDark: boolean }) {
  const s = toneStyles[panel.tone];
  return (
    <div
      className="rounded-lg border p-4 backdrop-blur-md transition-all duration-300 hover:border-white/15"
      style={{ background: "var(--p-panel-bg)", borderColor: "var(--p-card-border)" }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className={`mb-1.5 text-[10px] font-black uppercase tracking-wider ${s.text}`}>{panel.label}</p>
          <h4 className="text-lg font-black" style={{ color: "var(--p-text)" }}>{panel.title}</h4>
        </div>
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${s.bg} ${s.border} ${s.text}`}>
          <CategoryIcon name="fellowship" className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-3.5">
        {panel.sections.map((section) => (
          <div key={section.title}>
            <h5 className="mb-2 text-[11px] font-black uppercase tracking-wider" style={{ color: "var(--p-text-faint)" }}>{section.title}</h5>
            <div className="flex flex-wrap gap-1.5">
              {section.items.map((item) => (
                <CompactChip key={item} label={item} tone={panel.tone} isDark={isDark} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactRoadmap({ isDark }: { isDark: boolean }) {
  return (
    <div className="mt-6 rounded-lg border p-4 backdrop-blur-md" style={{ background: "var(--p-panel-bg)", borderColor: "var(--p-card-border)" }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--p-text)" }}>Fellowship Journey</h4>
        <span className="hidden rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-300 sm:inline-flex">
          Idea → Startup
        </span>
      </div>

      {/* Desktop horizontal */}
      <div className="hidden grid-cols-8 gap-1.5 lg:grid">
        {roadmap.map((step, i) => (
          <div key={step} className="relative text-center">
            {i < roadmap.length - 1 && (
              <span className="absolute left-[calc(50%+14px)] top-[14px] h-px w-[calc(100%-16px)]" style={{ background: "var(--p-line)" }} />
            )}
            <div
              className="relative mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full border border-amber-300/25 bg-amber-300/10 text-[10px] font-black"
              style={{ color: isDark ? "#fde68a" : "#92400e" }}
            >
              {i + 1}
            </div>
            <p className="text-[10px] font-bold leading-tight" style={{ color: "var(--p-text-muted)" }}>{step}</p>
          </div>
        ))}
      </div>

      {/* Mobile vertical */}
      <div className="flex flex-wrap gap-2 lg:hidden">
        {roadmap.map((step, i) => (
          <span
            key={step}
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/15 bg-amber-300/8 px-2.5 py-1 text-[11px] font-bold"
            style={{ color: isDark ? "#fde68a" : "#92400e" }}
          >
            <span className="text-[10px] font-black opacity-60">{i + 1}.</span>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureBlock({ title, items, tone, isDark }: { title: string; items: string[]; tone: Tone; isDark: boolean }) {
  const s = toneStyles[tone];
  return (
    <div
      className="rounded-lg border p-4 transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: "var(--p-panel-bg)", borderColor: "var(--p-card-border)" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${s.gradient}`} />
        <h4 className="text-sm font-extrabold" style={{ color: "var(--p-text)" }}>{title}</h4>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <CompactChip key={item} label={item} tone={tone} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

function NetworkDecoration({ isDark }: { isDark: boolean }) {
  return (
    <svg className="absolute right-0 top-8 h-64 w-64 md:right-8 md:h-96 md:w-96" style={{ opacity: isDark ? 0.25 : 0.18 }} viewBox="0 0 420 420" aria-hidden="true">
      <defs>
        <linearGradient id="netG" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#netG)" strokeWidth="1.2">
        <path d="M80 160c50-78 147-75 198-14 42 50 20 128-40 155-71 32-157-11-161-88" />
        <path d="M134 99c32 49 91 80 179 69M111 256c52-42 111-52 182-31M199 63c-18 82 15 164 86 247" />
      </g>
      {[80, 134, 199, 278, 313, 111, 293, 238].map((x, i) => (
        <circle key={`${x}-${i}`} cx={x} cy={[160, 99, 63, 146, 168, 256, 225, 301][i]} r={i % 3 === 0 ? 4.5 : 3} fill="#f8fafc" opacity="0.75" />
      ))}
    </svg>
  );
}

// ── Main Component ──

export default function Programs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="programs"
      className="relative overflow-hidden transition-colors duration-300"
      style={{ ...themeVars(isDark), background: "var(--p-bg)", color: "var(--p-text)" }}
    >
      <style jsx>{`
        @keyframes timelineFlow {
          from { transform: translateX(-110%); }
          to { transform: translateX(220%); }
        }
        @keyframes cardShine {
          from { transform: translateX(-120%) rotate(25deg); }
          to { transform: translateX(120%) rotate(25deg); }
        }
      `}</style>

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--p-ambient)" }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-size:38px_38px]"
        style={{ backgroundImage: "linear-gradient(var(--p-grid) 1px,transparent 1px),linear-gradient(90deg,var(--p-grid) 1px,transparent 1px)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(to bottom,var(--p-top-wash),transparent)" }} />
      <NetworkDecoration isDark={isDark} />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-12">
        {/* Header — compact */}
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 live-dot" />
            Programs & Fellowships
          </div>
          <h2 className="text-3xl font-black leading-[1.08] md:text-5xl" style={{ color: "var(--p-text)" }}>
            Empowering the Next Generation of Biotech Innovators
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 md:text-base" style={{ color: "var(--p-text-muted)" }}>
            Fellowship support, translational research, entrepreneurship development, and community impact programs.
          </p>
        </div>

        {/* Quick nav pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[
            { label: "Fellowship", href: "#prog-01", tone: "amber" as Tone },
            { label: "Community (COE)", href: "#prog-02", tone: "blue" as Tone },
            { label: "Translational Research", href: "#prog-03", tone: "purple" as Tone },
            { label: "National Outreach", href: "#prog-04", tone: "fuchsia" as Tone },
          ].map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${toneStyles[pill.tone].bg} ${toneStyles[pill.tone].border}`}
              style={{ color: isDark ? toneStyles[pill.tone].textDark : toneStyles[pill.tone].textLight }}
            >
              {pill.label}
            </a>
          ))}
        </div>

        <div className="space-y-8 md:space-y-12">

          {/* ═══════════ PROGRAM 01 — Fellowship ═══════════ */}
          <GlassCard tone="amber" className="p-5 md:p-7" >
            <div id="prog-01" className="absolute -top-24" />
            <SectionBadge number="01" title="Flagship Fellowship" tone="amber" isDark={isDark} />
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg border border-amber-300/25 bg-amber-300/10 text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                  <CategoryIcon name="fellowship" className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black leading-tight md:text-3xl" style={{ color: "var(--p-text)" }}>
                  E-YUVA & Innovation Fellowship Program
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--p-text-muted)" }}>
                  A flagship fellowship supporting student innovators, researchers, and aspiring biotech entrepreneurs through funding, mentorship, and startup creation.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {fellowshipPanels.map((panel) => (
                  <DetailPanel key={panel.title} panel={panel} isDark={isDark} />
                ))}
              </div>
            </div>
            <div className="hidden sm:block">
              <CompactRoadmap isDark={isDark} />
            </div>
          </GlassCard>



          {/* ═══════════ PROGRAM 02 — Community Outreach (COE) ═══════════ */}
          <div
            className="relative overflow-hidden rounded-xl border shadow-xl"
            style={{ background: "var(--p-panel-bg-s)", borderColor: "var(--p-card-border)", boxShadow: "var(--p-shadow)" }}
          >
            <div id="prog-02" className="absolute -top-24" />
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SITE.programsBackground})`, opacity: isDark ? 0.22 : 0.14 }} />
            <div className="absolute inset-0" style={{ background: "var(--p-img-overlay)" }} />
            <div className="absolute inset-0" style={{ background: isDark ? "radial-gradient(ellipse_at_20%_12%,rgba(245,158,11,0.16),transparent_36%),radial-gradient(ellipse_at_80%_80%,rgba(20,184,166,0.12),transparent_38%)" : "radial-gradient(ellipse_at_20%_12%,rgba(245,158,11,0.12),transparent_36%),radial-gradient(ellipse_at_80%_80%,rgba(20,184,166,0.08),transparent_38%)" }} />
            <div className="relative z-10 p-5 md:p-7">
              <SectionBadge number="02" title="Community Outreach Events" tone="blue" isDark={isDark} />
              <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg border border-sky-200/20 bg-sky-300/10 text-sky-300">
                    <CategoryIcon name="community" className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black leading-tight md:text-3xl" style={{ color: "var(--p-text)" }}>
                    Community Outreach Events (COE)
                  </h3>
                </div>
                <p className="text-sm leading-7" style={{ color: "var(--p-text-muted)" }}>
                  Field immersion programs connecting biotechnology innovators with communities, industries, and rural ecosystems.
                </p>
              </div>
              {/* COE category cards (display only) */}
              <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
                {communityCards.map((card) => {
                  const s = toneStyles[card.tone];
                  const eventCount = coeCategoryMap[card.slug]?.events.length || 0;
                  return (
                    <Link
                      key={card.slug}
                      href={`/programs/coe/${card.slug}`}
                      className="relative overflow-hidden rounded-lg border p-4 transition-all duration-300 hover:-translate-y-1 block group/coe-card"
                      style={{ background: "var(--p-panel-bg)", borderColor: "var(--p-card-border)" }}
                    >
                      {/* Mobile Background Watermark Number */}
                      {eventCount > 0 && (
                        <div
                          className="absolute right-2 bottom-[-10px] select-none text-[70px] font-black leading-none pointer-events-none opacity-[0.06] sm:hidden"
                          style={{ color: "var(--p-text)" }}
                        >
                          {eventCount}
                        </div>
                      )}
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${s.gradient}`} />
                          <h4 className="text-sm font-extrabold transition-colors group-hover/coe-card:text-amber-500" style={{ color: "var(--p-text)" }}>{card.title}</h4>
                        </div>
                        {eventCount > 0 && (
                          <span className="hidden sm:inline-flex rounded-full bg-sky-500/10 text-sky-400 text-[9px] font-black px-2 py-0.5 border border-sky-400/20">
                            {eventCount} {eventCount === 1 ? "event" : "events"}
                          </span>
                        )}
                      </div>
                      <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
                        {card.chips.map((chip) => (
                          <CompactChip key={chip} label={chip} tone={card.tone} isDark={isDark} />
                        ))}
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-bold"
                        style={{ color: isDark ? s.textDark : s.textLight }}
                      >
                        Explore Category →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══════════ PROGRAM 03 — Translational Research ═══════════ */}
          <div>
            <div id="prog-03" className="absolute -top-24" />
            <SectionBadge number="03" title="Translational Research & Academic Entrepreneurship" tone="purple" isDark={isDark} />
            <div className="mb-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg border border-violet-200/20 bg-violet-300/10 text-violet-300">
                  <CategoryIcon name="research" className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black leading-tight md:text-3xl" style={{ color: "var(--p-text)" }}>
                  Translational Research & Academic Entrepreneurship Awareness Program
                </h3>
              </div>
              <p className="text-sm leading-7" style={{ color: "var(--p-text-muted)" }}>
                A full-stack academic innovation platform for exposure, skill building, product thinking, startup readiness, and industry connectivity.
              </p>
            </div>

            {/* 6-card bento grid — clickable */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {translationalCards.map((card) => {
                const s = toneStyles[card.tone];
                const eventCount = translationalCategoryMap[card.slug]?.events.length || 0;
                return (
                  <Link
                    key={card.slug}
                    href={`/programs/${card.slug}`}
                    className={`group/tr relative flex flex-col overflow-hidden rounded-xl border p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${s.glow}`}
                    style={{
                      background: "var(--p-card-bg)",
                      borderColor: "var(--p-card-border)",
                      boxShadow: "var(--p-shadow)",
                    }}
                  >
                    {/* Top accent line */}
                    <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.gradient} opacity-60`} />
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover/tr:opacity-100">
                      <div
                        className="absolute -inset-full h-[200%] w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                        style={{ animation: "cardShine 1.8s ease-in-out" }}
                      />
                    </div>
                    <div className="relative z-10 flex flex-1 flex-col">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className={`grid h-10 w-10 place-items-center rounded-lg border ${s.bg} ${s.border} ${s.text}`}>
                          <CategoryIcon name={card.icon} className="h-5 w-5" />
                        </div>
                        {eventCount > 0 && (
                          <span
                            className="rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 font-black inline-flex items-baseline gap-0.5"
                            style={{
                              background: isDark ? `${s.shadow}` : `${s.shadow}`,
                              color: isDark ? s.textDark : s.textLight,
                            }}
                          >
                            <span className="text-[12px] sm:text-[11px] font-black leading-none">{eventCount}</span>
                            <span className="text-[8px] sm:text-[10px] font-bold opacity-80 uppercase leading-none">events</span>
                          </span>
                        )}
                      </div>
                      <h4 className="mb-2 text-lg font-black" style={{ color: "var(--p-text)" }}>{card.title}</h4>
                      <p className="hidden sm:block mb-4 flex-1 text-xs leading-relaxed" style={{ color: "var(--p-text-muted)" }}>
                        {translationalCategoryMap[card.slug]?.description || ""}
                      </p>
                      <span
                        className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-bold transition-all duration-300 group-hover/tr:gap-2.5"
                        style={{ color: isDark ? s.textDark : s.textLight }}
                      >
                        View All
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ═══════════ PROGRAM 05 — National Outreach ═══════════ */}
          <GlassCard tone="fuchsia" className="p-5 md:p-7">
            <div id="prog-04" className="absolute -top-24" />
            <SectionBadge number="04" title="National Outreach Events" tone="fuchsia" isDark={isDark} />
            <div className="mb-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg border border-fuchsia-200/20 bg-fuchsia-300/10 text-fuchsia-300">
                  <CategoryIcon name="national" className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black leading-tight md:text-3xl" style={{ color: "var(--p-text)" }}>
                  National Outreach Events Participated
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--p-text-muted)" }}>
                  National-level events, meets, competitions, and science festivals where E-YUVA Center showcased innovations and represented {SITE.university}.
                </p>
              </div>

              {/* Summary stat cards */}
              <div className="hidden sm:grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Events", value: nationalOutreachEvents.length.toString() },
                  { label: "Cities", value: `${new Set(nationalOutreachEvents.map(e => e.venue?.split(",").pop()?.trim())).size}+` },
                  { label: "Reach", value: `${Math.round(nationalOutreachEvents.reduce((a, e) => a + (e.participants || 0), 0) / 100) * 100}+` },
                  { label: "Type", value: "Participated" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border p-3 text-center backdrop-blur-md"
                    style={{ background: "var(--p-panel-bg)", borderColor: "var(--p-card-border)" }}
                  >
                    <p className="text-xl font-black" style={{ color: isDark ? "#e879f9" : "#7e22ce" }}>{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--p-text-faint)" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event preview cards (compact) */}
            <div className="hidden sm:grid mb-4 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nationalOutreachEvents.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border p-3 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--p-panel-bg)", borderColor: "var(--p-card-border)" }}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                      style={{
                        background: isDark ? "rgba(56,189,248,0.12)" : "rgba(56,189,248,0.08)",
                        color: isDark ? "#7dd3fc" : "#0369a1",
                      }}
                    >
                      {event.type}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: "var(--p-text-faint)" }}>
                      {event.date ? new Date(event.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Upcoming"}
                    </span>
                  </div>
                  <h5 className="mb-1.5 text-sm font-extrabold leading-snug line-clamp-2" style={{ color: "var(--p-text)" }}>
                    {event.title}
                  </h5>
                  {event.venue && (
                    <p className="flex items-center gap-1 text-[11px]" style={{ color: "var(--p-text-faint)" }}>
                      <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="line-clamp-1">{event.venue}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* View all link */}
            <Link
              href="/programs/national-outreach"
              className="group/nat inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: isDark ? "rgba(232,121,249,0.25)" : "rgba(168,85,247,0.15)",
                background: isDark ? "rgba(232,121,249,0.08)" : "rgba(168,85,247,0.06)",
                color: isDark ? "#e879f9" : "#7e22ce",
              }}
            >
              View All National Events
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/nat:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
