"use client";

import { useTheme } from "../../context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { nationalOutreachEvents } from "../data";
import type { EventItem } from "../data";

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
              National Outreach
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
              color: isDark ? "#7dd3fc" : "#0369a1",
              background: isDark ? "rgba(56,189,248,0.15)" : "rgba(56,189,248,0.12)",
              borderColor: isDark ? "rgba(56,189,248,0.3)" : "rgba(56,189,248,0.2)",
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
                color: isDark ? "#e879f9" : "#86198f",
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
        <p
          className="mb-4 text-sm leading-relaxed line-clamp-3"
          style={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          {event.description}
        </p>

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

        <div className="flex flex-wrap gap-1.5">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{
                background: isDark ? "rgba(232,121,249,0.1)" : "rgba(168,85,247,0.08)",
                color: isDark ? "#e879f9" : "#7e22ce",
                border: `1px solid ${isDark ? "rgba(232,121,249,0.2)" : "rgba(168,85,247,0.15)"}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NationalOutreachPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className="relative min-h-screen transition-colors duration-300"
      style={{ background: isDark ? "#0a1628" : "#f8fafc" }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 25% 10%, rgba(232,121,249,0.1), transparent 40%), radial-gradient(ellipse at 75% 80%, rgba(245,158,11,0.06), transparent 40%)"
            : "radial-gradient(ellipse at 25% 10%, rgba(168,85,247,0.06), transparent 40%), radial-gradient(ellipse at 75% 80%, rgba(245,158,11,0.04), transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-6 md:px-10 lg:px-12">
        <Link
          href="/#programs"
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:-translate-x-1"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,35,66,0.1)",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
            color: isDark ? "#e879f9" : "#86198f",
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
              borderColor: isDark ? "rgba(232,121,249,0.25)" : "rgba(168,85,247,0.15)",
              background: isDark ? "rgba(232,121,249,0.1)" : "rgba(168,85,247,0.06)",
              color: isDark ? "#e879f9" : "#7e22ce",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            National Outreach
          </div>
          <h1
            className="text-4xl font-black leading-tight md:text-5xl"
            style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            National Outreach Events Participated
          </h1>
          <p
            className="mt-3 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            National-level events, meets, competitions, science festivals, and workshops where E-YUVA Center represented and showcased innovations.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{
                background: isDark ? "rgba(232,121,249,0.12)" : "rgba(168,85,247,0.08)",
                color: isDark ? "#e879f9" : "#7e22ce",
              }}
            >
              {nationalOutreachEvents.length} Events
            </span>
          </div>
        </div>

        {nationalOutreachEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nationalOutreachEvents.map((event) => (
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
