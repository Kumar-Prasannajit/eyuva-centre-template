"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SITE } from "@/content/site";
import {
  LEADERSHIP,
  CENTER_LEADERSHIP,
  CHIEFS,
  INNOVATION_FELLOWS_DATA,
  EYUVA_PROJECTS,
  KNOWLEDGE_CARDS,
  PEOPLE_STATS_FELLOWS_LABEL,
  type Person,
  type InnovationFellow,
  type PublicationsInfo,
} from "@/content/people";

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   LINKEDIN ICON
───────────────────────────────────────────── */
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V24h-4V8Zm6.5 0h3.83v2.18h.05c.53-1.01 1.84-2.18 3.79-2.18 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.1c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.84-2.71 3.74V24h-4V8Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SECTION TAG
───────────────────────────────────────────── */
function SectionTag({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="inline-block w-5 h-0.5 bg-amber-500" />
      <span
        className="text-[11px] font-bold tracking-[0.14em] uppercase border-b-2 pb-px transition-colors duration-300"
        style={{
          color: isDark ? "#f59e0b" : "#1e3a5f",
          borderColor: isDark ? "#f59e0b" : "#1e3a5f",
        }}
      >
        {label}
      </span>
    </div>
  );
}
function LeaderCard({
  person,
  isDark,
  featured = false,
}: {
  person: Person;
  isDark: boolean;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center cursor-pointer w-[140px] sm:w-[170px] max-w-[180px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo container */}
      <div
        className={`relative overflow-hidden rounded-2xl mb-4 transition-all duration-500 ${
          featured
            ? "w-35 h-42.5 sm:w-45 sm:h-55"
            : "w-28.75 h-35 sm:w-37 sm:h-45"
        }`}
        style={{
          boxShadow: hovered
            ? "0 20px 60px rgba(245,158,11,0.25), 0 8px 24px rgba(0,0,0,0.3)"
            : isDark
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(30,58,95,0.12)",
        }}
      >
        {/* Amber top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.75 z-10 transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(90deg,#f59e0b,#f97316)"
              : "transparent",
          }}
        />

        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="180px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=1e3a5f&color=fff&size=180&bold=true`;
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.75) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0.5,
          }}
        />

        {/* LinkedIn - visible by default for better UX */}
        {person.linkedin &&
          person.linkedin !== "#" &&
          person.linkedin !== "" &&
          person.linkedin !== null && (
            <div
              className="absolute bottom-3 right-3 z-20 transition-all duration-300"
              style={{
                opacity: 1,
                transform: hovered
                  ? "translateY(0) scale(1.05)"
                  : "translateY(0) scale(1)",
              }}
            >
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-amber-500 hover:bg-amber-400 transition-colors shadow-md"
              >
                <LinkedInIcon size={14} />
              </a>
            </div>
          )}
      </div>

      {/* Name + role */}
      <div className="text-center px-2">
        <div
          className="text-[13px] font-bold leading-snug mb-1 transition-colors duration-300"
          style={{ color: isDark ? "#fff" : "#1e3a5f" }}
        >
          {person.name}
        </div>
        <div
          className="text-[11px] font-semibold tracking-widest uppercase mb-1 leading-tight"
          style={{ color: "#f59e0b", hyphens: "auto", wordBreak: "break-word" }}
        >
          {person.designation}
        </div>
        {person.dept && (
          <div
            className="text-[11px]"
            style={{ color: isDark ? "#64748b" : "#9ca3af" }}
          >
            {person.dept}
          </div>
        )}
      </div>
    </div>
  );
}

function Divider({ isDark }: { isDark: boolean }) {
  return (
    <div className="mx-6 md:mx-16 mb-16 flex items-center gap-4">
      <div
        className="flex-1 h-px"
        style={{
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.08)",
        }}
      />
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-60" />
      <div
        className="flex-1 h-px"
        style={{
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.08)",
        }}
      />
    </div>
  );
}

function Field({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) {
  return (
    <div>
      <div
        className="text-[10px] font-bold uppercase mb-1"
        style={{ color: isDark ? "#64748b" : "#94a3b8" }}
      >
        {label}
      </div>
      <div
        className="text-[13px] font-semibold leading-snug"
        style={{ color: isDark ? "#e2e8f0" : "#1e3a5f" }}
      >
        {value}
      </div>
    </div>
  );
}

function InnovationFellowCard({
  fellow,
  isDark,
  onOpen,
}: {
  fellow: InnovationFellow;
  isDark: boolean;
  onOpen: (fellow: InnovationFellow) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(fellow)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 max-w-50"
    >
      {/* Photo container (same size as LeaderCard: 148x180) */}
      <div
        className="relative overflow-hidden rounded-2xl mb-3 transition-all duration-500 w-28.75 h-35 sm:w-37 sm:h-45"
        style={{
          boxShadow: hovered
            ? "0 15px 45px rgba(245,158,11,0.22), 0 6px 18px rgba(0,0,0,0.25)"
            : isDark
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(30,58,95,0.12)",
        }}
      >
        {/* Amber top bar on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-0.75 z-10 transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(90deg,#f59e0b,#f97316)"
              : "transparent",
          }}
        />

        <Image
          src={fellow.photo}
          alt={fellow.name}
          fill
          sizes="148px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.75) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0.5,
          }}
        />

        {/* Status Pill overlay at top-left of image */}
        <div className="absolute left-2 top-2 z-10">
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{
              background:
                fellow.status === "Completed"
                  ? "rgba(16,185,129,0.75)"
                  : "rgba(245,158,11,0.75)",
              color: "#ffffff",
              border: `1px solid ${fellow.status === "Completed" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
            }}
          >
            {fellow.status}
          </span>
        </div>
      </div>

      {/* Name, Title, and Startup below photo */}
      <div className="text-center px-1 flex flex-col items-center">
        <h4
          className="text-[13px] font-bold leading-snug mb-1 transition-colors duration-300"
          style={{ color: isDark ? "#fff" : "#1e3a5f" }}
        >
          {fellow.name}
        </h4>

        <p
          className="text-[11px] leading-snug line-clamp-2 px-1 mb-2 transition-colors duration-300 min-h-8"
          style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
        >
          {fellow.projectTitle}
        </p>

        {fellow.startup && (
          <span
            className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border"
            style={{ borderColor: "rgba(245,158,11,0.2)" }}
          >
            {fellow.startup
              .replace(" Private Limited", " Pvt. Ltd.")
              .replace(" Private Limied", " Pvt. Ltd.")}
          </span>
        )}
      </div>
    </button>
  );
}

/* ── EYUVA Project Card (compact, premium) ── */
function EyuvaProjectCard({
  project,
  isDark,
  onOpen,
}: {
  project: (typeof EYUVA_PROJECTS)[number];
  isDark: boolean;
  onOpen: (project: (typeof EYUVA_PROJECTS)[number]) => void;
}) {
  const institute = project.affiliation ?? "";
  const timeline = project.timeline;
  const duration = timeline
    ? timeline.startDate !== "NA"
      ? `${timeline.startDate} — ${timeline.stipulatedCompletionDate}`
      : "Upcoming"
    : "";
  const statusColor =
    project.status === "Completed"
      ? { bg: "rgba(16,185,129,0.12)", text: "#10b981", dot: "bg-emerald-500" }
      : project.status === "Active"
        ? { bg: "rgba(59,130,246,0.12)", text: "#3b82f6", dot: "bg-blue-500" }
        : { bg: "rgba(245,158,11,0.12)", text: "#f59e0b", dot: "bg-amber-500" };

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group text-left rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 w-full"
      style={{
        background: isDark
          ? "linear-gradient(145deg, rgba(17,32,69,0.9), rgba(13,25,55,0.7))"
          : "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.1)",
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(30,58,95,0.08)",
      }}
    >
      {/* Image */}
      <div className="relative w-full" style={{ height: 160 }}>
        <Image
          src={project.groupImage || "/demo/projects/1.webp"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/80 via-transparent to-transparent" />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
            style={{ background: statusColor.bg, color: statusColor.text }}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
            {project.status}
          </span>
        </div>
        {/* Fellows count */}
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-[#0a1628]/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
            {project.fellows?.length ?? 0} Fellows
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4
          className="text-[14px] font-extrabold leading-snug mb-2 line-clamp-2 transition-colors duration-300 min-h-10"
          style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
        >
          {project.title}
        </h4>
        <div
          className="h-px mb-3"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(30,58,95,0.06)",
          }}
        />
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-start gap-2">
            <svg
              className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span
              className="leading-snug line-clamp-1"
              style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
            >
              {institute}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <svg
              className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span
              className="leading-snug"
              style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
            >
              {duration}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ── EYUVA Projects Section with Year Filter ── */
function EyuvaProjectsSection({
  projects,
  isDark,
  onOpen,
}: {
  projects: typeof EYUVA_PROJECTS;
  isDark: boolean;
  onOpen: (project: (typeof EYUVA_PROJECTS)[number]) => void;
}) {
  // Extract cohort years from timeline.startDate
  const getYear = (p: (typeof EYUVA_PROJECTS)[number]) => {
    const sd = p.timeline?.startDate;
    if (!sd || sd === "NA") return "Upcoming";
    const parts = sd.split("/");
    return parts[2] ?? "Upcoming";
  };

  const allYears = Array.from(new Set(projects.map(getYear))).sort((a, b) => {
    if (a === "Upcoming") return 1;
    if (b === "Upcoming") return -1;
    return Number(a) - Number(b);
  });

  // Default to current calendar year if present, otherwise latest cohort year
  const currentYearStr = new Date().getFullYear().toString();
  const defaultYear = allYears.includes(currentYearStr)
    ? currentYearStr
    : (allYears
        .filter((y) => y !== "Upcoming")
        .sort((a, b) => Number(b) - Number(a))[0] ?? "All");

  const [activeYear, setActiveYear] = useState<string>(defaultYear);

  const filtered =
    activeYear === "All"
      ? projects
      : projects.filter((p) => getYear(p) === activeYear);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h3
            className="text-[24px] md:text-[30px] font-extrabold transition-colors duration-300"
            style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
          >
            E-YUVA Fellows
          </h3>
          <p
            className="text-[14px] leading-[1.7] max-w-2xl"
            style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
          >
            Student-led biotech innovation projects supported through mentoring,
            prototype assistance, fellowship support, and ecosystem exposure.
          </p>
        </div>
        <span
          className="w-fit rounded-full px-3 py-1 text-[12px] font-bold"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(30,58,95,0.06)",
            color: isDark ? "#cbd5e1" : "#1e3a5f",
          }}
        >
          {projects.length} Projects
        </span>
      </div>

      {/* Year filter capsules */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[...allYears, "All"].map((year) => {
          const isActive = activeYear === year;
          return (
            <button
              key={year}
              type="button"
              onClick={() => setActiveYear(year)}
              className="rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #f59e0b, #d97706)"
                  : isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(30,58,95,0.05)",
                color: isActive ? "#0a1628" : isDark ? "#94a3b8" : "#6b7280",
                boxShadow: isActive
                  ? "0 4px 14px rgba(245,158,11,0.3)"
                  : "none",
                border: isActive
                  ? "none"
                  : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.08)"}`,
              }}
            >
              {year === "All"
                ? `All (${projects.length})`
                : year === "Upcoming"
                  ? `Upcoming`
                  : `Cohort ${year}`}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((project) => (
          <EyuvaProjectCard
            key={project.projectId}
            project={project}
            isDark={isDark}
            onOpen={onOpen}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-16 text-[14px]"
          style={{ color: isDark ? "#64748b" : "#9ca3af" }}
        >
          No projects found for this cohort.
        </div>
      )}
    </div>
  );
}

/* ── EYUVA Project Detail Modal ── */
function EyuvaProjectModal({
  project,
  isDark,
  onClose,
}: {
  project: (typeof EYUVA_PROJECTS)[number] | null;
  isDark: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const p = project;
  const timeline = p.timeline;
  const metrics = p.metrics;
  const fellows = p.fellows ?? [];
  const statusColor =
    project.status === "Completed"
      ? { bg: "rgba(16,185,129,0.12)", text: "#10b981", dot: "bg-emerald-500" }
      : project.status === "Active"
        ? { bg: "rgba(59,130,246,0.12)", text: "#3b82f6", dot: "bg-blue-500" }
        : { bg: "rgba(245,158,11,0.12)", text: "#f59e0b", dot: "bg-amber-500" };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4 py-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-[#020617]/80 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-3xl rounded-2xl border overflow-hidden max-h-[95vh] flex flex-col"
        style={{
          background: isDark ? "#0d1f3c" : "#ffffff",
          borderColor: isDark
            ? "rgba(255,255,255,0.12)"
            : "rgba(30,58,95,0.12)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Hero Image */}
        <div className="relative w-full shrink-0" style={{ height: 200 }}>
          <Image
            src={
              p.groupImage ||
              "https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={project.title}
            fill
            sizes="800px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/80 via-[#0a1628]/30 to-transparent" />

          {/* Close button over image */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/40 text-white hover:text-amber-400 backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close details"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4l10 10M14 4 4 14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Status + ref no overlay at bottom of image */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                style={{
                  background: statusColor.bg,
                  color: statusColor.text,
                  border: `1px solid ${statusColor.text}30`,
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`}
                />
                {project.status}
              </span>
              <span
                className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full backdrop-blur-md"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  color: "#cbd5e1",
                }}
              >
                {p.projectRefNo}
              </span>
            </div>
            <span className="rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
              {fellows.length} Fellows
            </span>
          </div>
        </div>

        {/* Header — title + affiliation */}
        <div
          className="px-5 py-4 border-b shrink-0"
          style={{
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(30,58,95,0.08)",
          }}
        >
          <h3
            className="text-[18px] md:text-[22px] font-extrabold leading-tight"
            style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
          >
            {project.title}
          </h3>
          <p
            className="text-[13px] mt-1 font-semibold"
            style={{ color: "#f59e0b" }}
          >
            {p.affiliation}
          </p>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Start Date",
                value: timeline?.startDate !== "NA" ? timeline?.startDate : "—",
              },
              {
                label: "Target Completion",
                value:
                  timeline?.stipulatedCompletionDate !== "NA"
                    ? timeline?.stipulatedCompletionDate
                    : "—",
              },
              {
                label: "Extension",
                value:
                  timeline?.extensionMonths && timeline.extensionMonths !== "NA"
                    ? `${timeline.extensionMonths} months`
                    : "—",
              },
              {
                label: "Final Completion",
                value:
                  timeline?.finalCompletionDate !== "NA"
                    ? timeline?.finalCompletionDate
                    : "—",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border p-3 text-center"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(30,58,95,0.06)",
                  background: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(30,58,95,0.02)",
                }}
              >
                <div
                  className="text-[9px] font-bold uppercase tracking-wider mb-1"
                  style={{ color: "#f59e0b" }}
                >
                  {item.label}
                </div>
                <div
                  className="text-[13px] font-bold"
                  style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Mentor & Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Mentor */}
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(30,58,95,0.06)",
                background: isDark
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(30,58,95,0.02)",
              }}
            >
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2">
                Mentor
              </h5>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}
              >
                {p.mentor}
              </p>
            </div>

            {/* Metrics */}
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(30,58,95,0.06)",
                background: isDark
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(30,58,95,0.02)",
              }}
            >
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2">
                Metrics
              </h5>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                {[
                  { k: "Prototype", v: metrics?.prototypeEstablished },
                  { k: "Publications", v: metrics?.publications },
                  { k: "IP Details", v: metrics?.ipDetails },
                  { k: "Validation", v: metrics?.thirdPartyValidation },
                  { k: "Startup", v: metrics?.startupCreated },
                  {
                    k: "Funding",
                    v: metrics?.fundingRaisedLakhs
                      ? `${metrics.fundingRaisedLakhs} Lakh`
                      : null,
                  },
                ]
                  .filter((m) => m.v && m.v !== "NA")
                  .map((m) => (
                    <div key={m.k}>
                      <div
                        className="text-[9px] font-bold uppercase tracking-wider mb-0.5"
                        style={{ color: isDark ? "#64748b" : "#9ca3af" }}
                      >
                        {m.k}
                      </div>
                      <div
                        className="font-semibold"
                        style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}
                      >
                        {m.v}
                      </div>
                    </div>
                  ))}
                {[
                  metrics?.prototypeEstablished,
                  metrics?.publications,
                  metrics?.ipDetails,
                  metrics?.thirdPartyValidation,
                  metrics?.startupCreated,
                ].every((v) => !v || v === "NA") && (
                  <div
                    className="col-span-2 text-[12px] italic"
                    style={{ color: isDark ? "#475569" : "#9ca3af" }}
                  >
                    Metrics data not yet available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fellows */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-3">
              Team Fellows ({fellows.length})
            </h5>
            <div className="flex flex-wrap gap-2">
              {fellows.map((f) =>
                f.linkedin ? (
                  <a
                    key={f.name}
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold no-underline transition-colors hover:border-amber-500/40"
                    style={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(30,58,95,0.1)",
                      color: isDark ? "#cbd5e1" : "#4b5563",
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(30,58,95,0.03)",
                    }}
                  >
                    {f.name}
                    <LinkedInIcon size={12} />
                  </a>
                ) : (
                  <span
                    key={f.name}
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-semibold"
                    style={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(30,58,95,0.06)",
                      color: isDark ? "#64748b" : "#9ca3af",
                      background: isDark
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(30,58,95,0.02)",
                    }}
                  >
                    {f.name}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeCard({
  card,
  isDark,
  className = "",
}: {
  card: (typeof KNOWLEDGE_CARDS)[number];
  isDark: boolean;
  className?: string;
}) {
  return (
    <Link
      href={card.href}
      className={`group relative min-h-65 overflow-hidden rounded-2xl border p-5 no-underline transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.1)",
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.28)"
          : "0 4px 22px rgba(30,58,95,0.08)",
      }}
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a1628] via-[#0a1628]/68 to-[#0a1628]/20" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-[#0a1628]">
            {card.category}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            {card.readTime}
          </span>
        </div>
        <h4 className="text-[22px] font-extrabold leading-tight text-white">
          {card.title}
        </h4>
        <p className="mt-3 text-[13px] leading-[1.65] text-slate-300">
          {card.description}
        </p>
      </div>
    </Link>
  );
}

function InnovationFellowModal({
  fellow,
  isDark,
  onClose,
}: {
  fellow: InnovationFellow | null;
  isDark: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!fellow) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [fellow, onClose]);

  if (!fellow) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4 py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fellow-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-[#020617]/75 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-4xl rounded-2xl border flex flex-col overflow-hidden max-h-[95vh] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
        style={{
          background: isDark ? "#0d1f3c" : "#ffffff",
          borderColor: isDark
            ? "rgba(255,255,255,0.12)"
            : "rgba(30,58,95,0.12)",
        }}
      >
        {/* Header Bar */}
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(30,58,95,0.08)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full text-amber-500"
              style={{
                background: isDark
                  ? "rgba(245,158,11,0.08)"
                  : "rgba(245,158,11,0.1)",
              }}
            >
              BIRAC Case Dossier
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{
                background:
                  fellow.status === "Completed"
                    ? "rgba(16,185,129,0.12)"
                    : "rgba(245,158,11,0.12)",
                color: fellow.status === "Completed" ? "#10b981" : "#f59e0b",
              }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${fellow.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`}
              />
              {fellow.status}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-500/10 text-slate-400 hover:text-amber-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close details"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4l10 10M14 4 4 14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto">
          {/* Top row: Photo and identity */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div
              className="relative h-28 w-24 shrink-0 rounded-lg overflow-hidden border bg-slate-900 shadow-md self-center sm:self-start"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(30,58,95,0.15)",
              }}
            >
              <Image
                src={fellow.photo}
                alt={fellow.name}
                fill
                sizes="96px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3
                id="fellow-modal-title"
                className="text-[22px] md:text-[26px] font-extrabold leading-tight mb-1"
                style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
              >
                {fellow.name}
              </h3>
              <div
                className="text-[12px] font-semibold mb-2"
                style={{ color: "#f59e0b" }}
              >
                {fellow.institute}
              </div>
              <h4
                className="text-[14px] md:text-[15px] font-bold leading-relaxed"
                style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}
              >
                {fellow.projectTitle}
              </h4>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid gap-5 md:grid-cols-2 items-start">
            {/* Left: Mentorship & Publications */}
            <div className="space-y-4">
              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(30,58,95,0.06)",
                  background: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(30,58,95,0.02)",
                }}
              >
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2">
                  Academic Mentorship
                </h5>
                {fellow.mentors && fellow.mentors.length > 0 ? (
                  <div className="space-y-2">
                    {fellow.mentors.map((mentor, i) => (
                      <div
                        key={i}
                        className="flex gap-2 text-[12px] leading-relaxed"
                        style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>{mentor}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[12px] italic text-slate-400">
                    No direct academic mentors assigned.
                  </div>
                )}
              </div>

              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(30,58,95,0.06)",
                  background: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(30,58,95,0.02)",
                }}
              >
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-2.5">
                  Publications & Scientific Output
                </h5>
                {typeof fellow.publications === "string" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold bg-slate-500/10 text-slate-300">
                    {fellow.publications}
                  </span>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        label: "Published",
                        value: fellow.publications.published || 0,
                      },
                      {
                        label: "Review",
                        value: fellow.publications.under_review || 0,
                      },
                      {
                        label: "Submitted",
                        value: fellow.publications.submitted || 0,
                      },
                    ].map((pub) => (
                      <div
                        key={pub.label}
                        className="rounded-lg border py-1.5 text-center"
                        style={{
                          borderColor: isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(30,58,95,0.06)",
                        }}
                      >
                        <div className="text-[16px] font-extrabold text-amber-500">
                          {pub.value}
                        </div>
                        <div className="text-[8px] uppercase font-bold text-slate-400">
                          {pub.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Metadata */}
            <div
              className="rounded-xl border p-4 grid grid-cols-2 gap-x-4 gap-y-3.5"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(30,58,95,0.06)",
                background: isDark
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(30,58,95,0.02)",
              }}
            >
              <div className="col-span-2">
                <Field
                  label="Project Reference No."
                  value={fellow.projectRefNo}
                  isDark={isDark}
                />
              </div>
              <Field
                label="Timeline"
                value={`${fellow.startDate} — ${fellow.finalCompletionDate}`}
                isDark={isDark}
              />
              <Field
                label="Extension Requested"
                value={fellow.extensionRequested}
                isDark={isDark}
              />
              <Field
                label="Prototype Ready"
                value={fellow.prototypeEstablished}
                isDark={isDark}
              />
              <Field
                label="Intellectual Property"
                value={fellow.ipDetails || "None"}
                isDark={isDark}
              />
              <Field
                label="Validation"
                value={fellow.thirdPartyValidation || "Not Initiated"}
                isDark={isDark}
              />
              <Field
                label="Startup Venture"
                value={fellow.startup || "None"}
                isDark={isDark}
              />
              {fellow.fundRaisedLakhs && (
                <div className="col-span-2">
                  <Field
                    label="Funds Raised"
                    value={`${fellow.fundRaisedLakhs} Lakh INR`}
                    isDark={isDark}
                  />
                </div>
              )}
            </div>
          </div>

          {/* LinkedIn */}
          {fellow.linkedin && (
            <div
              className="border-t pt-4 flex justify-end"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(30,58,95,0.08)",
              }}
            >
              <a
                href={fellow.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-5 rounded-lg flex items-center gap-1.5 font-bold text-white bg-amber-500 hover:bg-amber-400 transition-colors text-[12.5px]"
              >
                <LinkedInIcon size={13} />
                Connect on LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function People() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedFellow, setSelectedFellow] = useState<InnovationFellow | null>(
    null,
  );
  const [selectedEyuvaProject, setSelectedEyuvaProject] = useState<
    (typeof EYUVA_PROJECTS)[number] | null
  >(null);

  const closeModal = () => {
    setSelectedFellow(null);
    setSelectedEyuvaProject(null);
  };

  return (
    <section
      id="people"
      className="relative py-24 overflow-hidden transition-colors duration-300"
      style={{ background: isDark ? "#0a1628" : "#f8fafc" }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-150 h-100"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(245,158,11,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-125 h-75"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(59,130,246,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-450 mx-auto relative">
        {/* ── HEADER ────────────────────────── */}
        <div className="px-6 md:px-16 mb-20">
          <SectionTag label="Leadership & Team" isDark={isDark} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h2
              className="text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.05] tracking-tight transition-colors duration-300"
              style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
            >
              The People
              <br />
              <span style={{ color: "#f59e0b" }}>Behind</span> the
              <br />
              Innovation.
            </h2>
            <div>
              <p
                className="text-[15px] leading-[1.8] mb-6 transition-colors duration-300"
                style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
              >
                Meet the leadership, advisors, researchers and innovators
                driving the BIRAC E-YUVA ecosystem at {SITE.university}.
              </p>
              {/* Quick stats row */}
              <div className="flex gap-6">
                {[
                  { n: String(LEADERSHIP.length).padStart(2, "0"), l: "Leadership" },
                  { n: String(CENTER_LEADERSHIP.length).padStart(2, "0"), l: "Centre Leadership" },
                  { n: String(CHIEFS.length).padStart(2, "0"), l: "Core Team" },
                  { n: PEOPLE_STATS_FELLOWS_LABEL, l: "Fellows" },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      className="text-[26px] font-extrabold leading-none"
                      style={{ color: "#f59e0b" }}
                    >
                      {s.n}
                    </div>
                    <div
                      className="text-[12px] font-semibold uppercase tracking-wide mt-1 transition-colors duration-300"
                      style={{ color: isDark ? "#64748b" : "#9ca3af" }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── UNIVERSITY LEADERSHIP ─────────── */}
        <div className="px-6 md:px-16 mb-12">
          <div className="flex items-center gap-4 mb-10">
            <h3
              className="text-[20px] font-bold transition-colors duration-300"
              style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
            >
              University Leadership
            </h3>
            <div
              className="flex-1 h-px"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(30,58,95,0.08)",
              }}
            />
            <span
              className="text-[12px] font-semibold px-3 py-1 rounded-full"
              style={{
                background: isDark
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(245,158,11,0.12)",
                color: "#f59e0b",
              }}
            >
              5 Members
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {LEADERSHIP.map((p, i) => (
              <LeaderCard
                key={p.id}
                person={p}
                isDark={isDark}
                featured={i === 0}
              />
            ))}
          </div>
        </div>

        <Divider isDark={isDark} />

        {/* ── E-YUVA CENTRE LEADERSHIP ─────────── */}
        <div className="px-6 md:px-16 mb-12">
          <div className="flex items-center gap-4 mb-10">
            <h3
              className="text-[20px] font-bold transition-colors duration-300"
              style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
            >
              E-YUVA Centre Leadership
            </h3>
            <div
              className="flex-1 h-px"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(30,58,95,0.08)",
              }}
            />
            <span
              className="text-[12px] font-semibold px-3 py-1 rounded-full"
              style={{
                background: isDark
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(245,158,11,0.12)",
                color: "#f59e0b",
              }}
            >
              3 Members
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {CENTER_LEADERSHIP.map((p) => (
              <LeaderCard
                key={p.id}
                person={p}
                isDark={isDark}
                featured={false}
              />
            ))}
          </div>
        </div>

        <Divider isDark={isDark} />

        {/* ── E-YUVA CENTRE TEAM ────────────── */}
        <div className="px-6 md:px-16 mb-12">
          <div className="flex items-center gap-4 mb-10">
            <h3
              className="text-[20px] font-bold transition-colors duration-300"
              style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
            >
              E-YUVA Centre Team
            </h3>
            <div
              className="flex-1 h-px"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(30,58,95,0.08)",
              }}
            />
            <span
              className="text-[12px] font-semibold px-3 py-1 rounded-full"
              style={{
                background: isDark
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(245,158,11,0.12)",
                color: "#f59e0b",
              }}
            >
              4 Members
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-16">
            {CHIEFS.map((p) => (
              <LeaderCard key={p.id} person={p} isDark={isDark} featured />
            ))}
          </div>
        </div>

        <Divider isDark={isDark} />

        {/* Current fellows */}
        <div id="fellows" className="px-6 md:px-16 mb-20">
          <SectionTag label="Current Fellows" isDark={isDark} />
          <div className="mb-10 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 items-end">
            <h2
              className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-tight transition-colors duration-300"
              style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
            >
              Fellowship Projects
              <br />
              Built Around
              <br />
              <span style={{ color: "#f59e0b" }}>Real Problems.</span>
            </h2>
            <p
              className="text-[15px] leading-[1.8] transition-colors duration-300"
              style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
            >
              Innovation fellows are represented by individual profiles
              highlighting their biotechnology projects, patents, and startup
              ventures, while E-YUVA student innovators are represented as
              project groups.
            </p>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h3
                  className="text-[24px] md:text-[30px] font-extrabold transition-colors duration-300"
                  style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
                >
                  Innovation Fellows
                </h3>
                <p
                  className="text-[14px] leading-[1.7] max-w-2xl"
                  style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
                >
                  Advanced translational projects led by fellows working across
                  health-tech, bioeconomy, materials, and commercialization
                  pathways.
                </p>
              </div>
              <span
                className="w-fit rounded-full px-3 py-1 text-[12px] font-bold"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(30,58,95,0.06)",
                  color: isDark ? "#cbd5e1" : "#1e3a5f",
                }}
              >
                {INNOVATION_FELLOWS_DATA.length} Fellows
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
              {INNOVATION_FELLOWS_DATA.map((fellow) => (
                <InnovationFellowCard
                  key={fellow.id}
                  fellow={fellow}
                  isDark={isDark}
                  onOpen={(f) => setSelectedFellow(f)}
                />
              ))}
            </div>
          </div>

          <EyuvaProjectsSection
            projects={EYUVA_PROJECTS}
            isDark={isDark}
            onOpen={(project) => setSelectedEyuvaProject(project)}
          />
        </div>

        {/* Centre, knowledge hub, and alumni ecosystem */}

        <Divider isDark={isDark} />

        <div className="px-6 md:px-16 mb-20">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionTag
                label="Biotech Innovation Ecosystem Awareness"
                isDark={isDark}
              />
              <h2
                className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-tight transition-colors duration-300"
                style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
              >
                Knowledge Hub for
                <br />
                Emerging Innovators.
              </h2>
            </div>
            <p
              className="max-w-xl text-[15px] leading-[1.8] transition-colors duration-300"
              style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
            >
              A curated awareness layer for bioeconomy literacy, BIRAC funding
              readiness, startup inspiration, and applied innovation thinking.
            </p>
          </div>

          <div className="grid auto-rows-[260px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <KnowledgeCard
              card={KNOWLEDGE_CARDS[0]}
              isDark={isDark}
              className="md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2"
            />
            <KnowledgeCard
              card={KNOWLEDGE_CARDS[1]}
              isDark={isDark}
              className="md:col-span-2 xl:col-span-2"
            />
            <KnowledgeCard
              card={KNOWLEDGE_CARDS[2]}
              isDark={isDark}
              className="md:col-span-1 xl:col-span-1"
            />
            <KnowledgeCard
              card={KNOWLEDGE_CARDS[3]}
              isDark={isDark}
              className="md:col-span-1 xl:col-span-1"
            />
            <KnowledgeCard
              card={KNOWLEDGE_CARDS[4]}
              isDark={isDark}
              className="md:col-span-2 xl:col-span-4"
            />
          </div>
        </div>
      </div>

      <InnovationFellowModal
        fellow={selectedFellow}
        isDark={isDark}
        onClose={closeModal}
      />

      <EyuvaProjectModal
        project={selectedEyuvaProject}
        isDark={isDark}
        onClose={closeModal}
      />
    </section>
  );
}
