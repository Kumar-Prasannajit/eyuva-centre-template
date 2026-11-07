"use client";

import { useTheme } from "../../../context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { coeCategoryMap } from "../../data";
import type { EventItem } from "../../data";

function EventCard({ event, isDark }: { event: EventItem; isDark: boolean }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
      style={{
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.88)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,35,66,0.1)",
        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,0.3)"
          : "0 8px 32px rgba(15,35,66,0.08)",
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 flex flex-col items-center justify-center p-4"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #071226 0%, #1e293b 100%)"
                : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-500 mb-1">
              E-YUVA Outreach
            </div>
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.2"
              style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(15,35,66,0.15)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-8.268-5.496A1 1 0 0 1 3 14.67V6.33a1 1 0 0 1 .732-.964L12 2l8.268 3.366A1 1 0 0 1 21 6.33v8.34a1 1 0 0 1-.732.964L12 21z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v9" />
            </svg>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(to top, rgba(7,18,38,0.85) 0%, transparent 60%)"
              : "linear-gradient(to top, rgba(248,250,252,0.9) 0%, transparent 60%)",
          }}
        />
        <div className="absolute right-3 top-3">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase backdrop-blur-md border"
            style={{
              color: isDark
                ? event.type === "organized" ? "#6ee7b7" : "#7dd3fc"
                : event.type === "organized" ? "#047857" : "#0369a1",
              background: isDark
                ? event.type === "organized" ? "rgba(16,185,129,0.15)" : "rgba(56,189,248,0.15)"
                : event.type === "organized" ? "rgba(16,185,129,0.12)" : "rgba(56,189,248,0.12)",
              borderColor: isDark
                ? event.type === "organized" ? "rgba(16,185,129,0.3)" : "rgba(56,189,248,0.3)"
                : event.type === "organized" ? "rgba(16,185,129,0.2)" : "rgba(56,189,248,0.2)",
            }}
          >
            {event.type}
          </span>
        </div>
        {event.date && (
          <div className="absolute bottom-3 left-3">
            <span
              className="rounded-lg px-2.5 py-1 text-xs font-bold backdrop-blur-md"
              style={{
                background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)",
                color: isDark ? "#22d3ee" : "#0e7490",
              }}
            >
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="mb-2 text-lg font-extrabold leading-snug line-clamp-2"
          style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
        >
          {event.title}
        </h3>
        
        {event.description && (
          <p
            className="mb-4 text-sm leading-relaxed line-clamp-3"
            style={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            {event.description}
          </p>
        )}

        {event.organizedBy && (
          <div className="mb-4 text-[12px] leading-relaxed flex flex-col gap-1">
            <div>
              <span className="font-semibold text-amber-500">Organized By:</span>{" "}
              <span style={{ color: isDark ? "#cbd5e1" : "#475569" }}>{event.organizedBy}</span>
            </div>
            {event.coOrganizedBy && (
              <div>
                <span className="font-semibold text-teal-400">Co-Organized:</span>{" "}
                <span style={{ color: isDark ? "#cbd5e1" : "#475569" }}>{event.coOrganizedBy}</span>
              </div>
            )}
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
          {event.venue && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.venue}
            </span>
          )}
          {event.participants && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {event.participants}+ attendees
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{
                background: isDark ? "rgba(56,189,248,0.1)" : "rgba(56,189,248,0.08)",
                color: isDark ? "#7dd3fc" : "#0369a1",
                border: `1px solid ${isDark ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.15)"}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Verification links */}
        {event.links && (event.links.poster || event.links.eventPhotoCollage1 || event.links.eventPhotoCollage2) && (
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,35,66,0.08)" }}>
            {event.links.poster && (
              <a
                href={event.links.poster}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-500 text-[11px] font-bold no-underline hover:bg-amber-500/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Poster</span>
              </a>
            )}
            {event.links.eventPhotoCollage1 && (
              <a
                href={event.links.eventPhotoCollage1}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 text-[11px] font-bold no-underline hover:bg-blue-500/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Photo 1</span>
              </a>
            )}
            {event.links.eventPhotoCollage2 && (
              <a
                href={event.links.eventPhotoCollage2}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 text-[11px] font-bold no-underline hover:bg-blue-500/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Photo 2</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function COECategoryPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const params = useParams();
  const category = params.category as string;
  const data = coeCategoryMap[category];

  if (!data) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center transition-colors duration-300"
        style={{ background: isDark ? "#0a1628" : "#f8fafc" }}
      >
        <h1 className="mb-4 text-3xl font-black" style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>
          Category Not Found
        </h1>
        <Link
          href="/#programs"
          className="rounded-lg px-5 py-2.5 text-sm font-bold transition-colors"
          style={{
            background: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.1)",
            color: isDark ? "#fbbf24" : "#92400e",
          }}
        >
          ← Back to Programs
        </Link>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen transition-colors duration-300"
      style={{ background: isDark ? "#0a1628" : "#f8fafc" }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 30% 15%, rgba(56,189,248,0.1), transparent 40%), radial-gradient(ellipse at 70% 75%, rgba(20,184,166,0.08), transparent 40%)"
            : "radial-gradient(ellipse at 30% 15%, rgba(56,189,248,0.06), transparent 40%), radial-gradient(ellipse at 70% 75%, rgba(20,184,166,0.05), transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-6 md:px-10 lg:px-12">
        <Link
          href="/#programs"
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:-translate-x-1"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,35,66,0.1)",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
            color: isDark ? "#22d3ee" : "#0e7490",
          }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Programs
        </Link>

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-black uppercase"
            style={{
              borderColor: isDark ? "rgba(56,189,248,0.25)" : "rgba(56,189,248,0.15)",
              background: isDark ? "rgba(56,189,248,0.1)" : "rgba(56,189,248,0.06)",
              color: isDark ? "#7dd3fc" : "#0284c7",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Community Outreach
          </div>
          <h1
            className="text-4xl font-black leading-tight md:text-5xl"
            style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            {data.title}
          </h1>
          <p
            className="mt-3 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            {data.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{
                background: isDark ? "rgba(20,184,166,0.12)" : "rgba(20,184,166,0.08)",
                color: isDark ? "#5eead4" : "#0f766e",
              }}
            >
              {data.events.length} Events in this category
            </span>
          </div>
        </div>

        {/* Category Toggles */}
        <div className="mb-8 flex flex-wrap gap-2.5 border-b pb-4" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,35,66,0.06)" }}>
          {Object.entries(coeCategoryMap).map(([key, cat]) => {
            const isActive = category === key;
            const count = cat.events.length;
            return (
              <Link
                key={key}
                href={`/programs/coe/${key}`}
                className="rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 border no-underline flex items-center gap-2"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #0284c7, #0369a1)"
                    : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(15,35,66,0.04)",
                  borderColor: isActive
                    ? "transparent"
                    : isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(15,35,66,0.08)",
                  color: isActive
                    ? "#ffffff"
                    : isDark
                      ? "#cbd5e1"
                      : "#475569"
                }}
              >
                <span>{cat.title}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-black"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : (isDark ? "rgba(255,255,255,0.06)" : "rgba(15,35,66,0.06)"),
                    color: isActive ? "#ffffff" : (isDark ? "#94a3b8" : "#64748b")
                  }}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        {data.events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.events.map((event) => (
              <EventCard key={event.id} event={event} isDark={isDark} />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border py-20"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,35,66,0.08)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)",
            }}
          >
            <p className="text-lg font-bold" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
              No events yet — check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
