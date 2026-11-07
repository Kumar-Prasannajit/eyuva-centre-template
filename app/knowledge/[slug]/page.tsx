"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { SITE } from "@/content/site";
import { DEMO_PHOTOS } from "@/content/images";
import {
  STARTUPS_DATA,
  IP_DATA,
  MOU_DATA,
  PUBLICATIONS_DATA,
  AWARDS_DATA,
} from "@/content/knowledge";

// 1. Startup Success Stories dataset (6 real startups)
const KNOWLEDGE_DATA = {
  "startup-success-stories": {
    category: "Startups",
    title: "Startup Success Stories",
    readTime: "5 min read",
    bannerImage: DEMO_PHOTOS.startup,
    summary: "E-YUVA incubation support has successfully translated biotechnology research into market-ready ventures, establishing registered companies, securing DPIIT recognitions, and raising seed funds.",
    items: STARTUPS_DATA
  },
  "mou": {
    category: "Collaborations",
    title: "Memorandums of Understanding (MoUs)",
    readTime: "4 min read",
    bannerImage: DEMO_PHOTOS.collabs,
    summary: "Strengthening our translational research ecosystem through formal agreements with leading national research institutes, hospitals, and testing laboratories.",
    items: MOU_DATA
  },
  "publications": {
    category: "Research",
    title: "Scientific Publications",
    readTime: "8 min read",
    bannerImage: DEMO_PHOTOS.publication,
    summary: "Showcasing peer-reviewed research papers and academic works published by our fellows and investigators in reputed high-impact biotechnology journals.",
    items: PUBLICATIONS_DATA
  },
  "ip": {
    category: "Patents",
    title: "Intellectual Property & Patents",
    readTime: "6 min read",
    bannerImage: DEMO_PHOTOS.patent,
    summary: "Protecting novel biotechnology methods, chemical formulations, and software architectures engineered by our innovators.",
    items: IP_DATA
  },
  "awards": {
    category: "Recognition",
    title: "Awards & Accolades",
    readTime: "5 min read",
    bannerImage: DEMO_PHOTOS.award,
    summary: "Celebrating the national and regional honors received by our research fellows, coordinators, and student innovators.",
    items: AWARDS_DATA
  }
};

type KnowledgeSlug = keyof typeof KNOWLEDGE_DATA;

export default function KnowledgeArticlePage() {
  const { slug } = useParams() as { slug: string };
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [ipTypeFilter, setIpTypeFilter] = useState("All");
  const [startupSearch, setStartupSearch] = useState("");
  const [pubSearch, setPubSearch] = useState("");
  const [pubTypeFilter, setPubTypeFilter] = useState("All"); // Authorship filter: "All", "Author", "Co Author"
  const [pubYearFilter, setPubYearFilter] = useState("All"); // Year filter
  const [mouSearch, setMouSearch] = useState("");

  const article = KNOWLEDGE_DATA[slug as KnowledgeSlug];

  if (!article) notFound();

  // Handle IP type filtering
  const filteredIpItems = slug === "ip"
    ? ipTypeFilter === "All"
      ? article.items
      : article.items.filter((item: any) => item.ipType === ipTypeFilter)
    : [];

  // Handle Startup Search
  const filteredStartupItems = slug === "startup-success-stories"
    ? article.items.filter((item: any) =>
        item.startupName.toLowerCase().includes(startupSearch.toLowerCase()) ||
        item.founders.some((f: string) => f.toLowerCase().includes(startupSearch.toLowerCase())) ||
        (item.productDetails && item.productDetails.toLowerCase().includes(startupSearch.toLowerCase()))
      )
    : [];

  // Handle MoU Search
  const filteredMouItems = slug === "mou"
    ? article.items.filter((item: any) =>
        item.instituteName.toLowerCase().includes(mouSearch.toLowerCase()) ||
        item.departmentOrCenter.toLowerCase().includes(mouSearch.toLowerCase())
      )
    : [];

  // Handle Publications Search & Filters
  const filteredPubItems = slug === "publications"
    ? article.items.filter((item: any) => {
        // Search filter
        const matchQuery =
          item.title.toLowerCase().includes(pubSearch.toLowerCase()) ||
          (item.journalOrConferenceOrPublisher &&
            item.journalOrConferenceOrPublisher.toLowerCase().includes(pubSearch.toLowerCase()));

        // Authorship filter
        const matchAuthorship =
          pubTypeFilter === "All" ? true : item.authorship === pubTypeFilter;

        // Year filter
        const matchYear =
          pubYearFilter === "All"
            ? true
            : item.yearOfPublication.toString() === pubYearFilter;

        return matchQuery && matchAuthorship && matchYear;
      })
    : [];

  // Helper to render details card for an IP item
  const renderIpCard = (item: any, idx: number) => {
    return (
      <div
        key={idx}
        className="rounded-2xl p-6 border transition-all duration-300"
        style={{
          background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.06)",
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(30,58,95,0.04)"
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <span
            className="w-fit text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: item.status.includes("Granted") ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
              color: item.status.includes("Granted") ? "#10b981" : "#f59e0b"
            }}
          >
            {item.status}
          </span>
          <span className="text-[12px] font-bold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>
            Filing Date: {item.filingDate}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-extrabold leading-snug mb-3" style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}>
          {item.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-4 text-[13px] border-b pb-4"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}
        >
          <div>
            <span className="font-semibold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>App Number:</span>{" "}
            <span className="font-bold" style={{ color: isDark ? "#cbd5e1" : "#334155" }}>{item.applicationNumber}</span>
          </div>
          {item.grantNumber && (
            <div>
              <span className="font-semibold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>Grant Number:</span>{" "}
              <span className="font-bold text-emerald-500">{item.grantNumber}</span>
            </div>
          )}
          <div>
            <span className="font-semibold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>IP Type:</span>{" "}
            <span className="font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[11px]">{item.ipType}</span>
          </div>
          {item.publicationDate && (
            <div>
              <span className="font-semibold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>Published:</span>{" "}
              <span style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>{item.publicationDate}</span>
            </div>
          )}
          <div className="sm:col-span-2 mt-1">
            <span className="font-semibold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>Applicant / Startup:</span>{" "}
            <span className="italic font-bold text-amber-500">{item.applicant}</span>
          </div>
        </div>

        {item.innovators && item.innovators.length > 0 && (
          <div className="mb-4">
            <div className="text-[12px] font-bold uppercase tracking-wider text-amber-500 mb-2">Innovators</div>
            <div className="flex flex-wrap gap-1.5">
              {item.innovators.map((name: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(30,58,95,0.04)",
                    color: isDark ? "#cbd5e1" : "#4b5563"
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Drive Links */}
        {(item.links.pdf || item.links.jpeg || item.links.certificate) && (
          <div className="flex flex-wrap gap-2.5 pt-2">
            {item.links.pdf && (
              <a
                href={item.links.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-red-500/10 text-red-500 hover:bg-red-500/20"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>PDF Document</span>
              </a>
            )}
            {item.links.jpeg && (
              <a
                href={item.links.jpeg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Image Preview</span>
              </a>
            )}
            {item.links.certificate && (
              <a
                href={item.links.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
                <span>View Certificate</span>
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <main
      className="min-h-screen pt-[72px] transition-colors duration-300 pb-20"
      style={{ background: isDark ? "#0a1628" : "#f8fafc" }}
    >
      {/* Dynamic ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-16">
        {/* Navigation back */}
        <Link
          href="/#people"
          className="inline-flex items-center gap-2 text-sm font-bold no-underline transition-colors duration-200 mb-8"
          style={{ color: "#f59e0b" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Ecosystem
        </Link>

        {/* Hero Metadata */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{
              background: isDark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.15)",
              color: "#f59e0b"
            }}
          >
            {article.category}
          </span>
          <span
            className="rounded-full border px-3 py-1 text-[11px] font-bold"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.08)",
              color: isDark ? "#cbd5e1" : "#4b5563",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(30,58,95,0.03)"
            }}
          >
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6 transition-colors duration-300"
          style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}
        >
          {article.title}
        </h1>

        {/* Summary Description */}
        <p
          className="text-[16px] md:text-[18px] leading-[1.8] mb-12 transition-colors duration-300 font-medium"
          style={{ color: isDark ? "#94a3b8" : "#4b5563" }}
        >
          {article.summary}
        </p>

        {/* Dynamic content rendering based on slug */}
        <div className="flex flex-col gap-6">
          {slug === "startup-success-stories" && (
            <div className="grid grid-cols-1 gap-8">
              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search startups by name, founders, or product details..."
                  value={startupSearch}
                  onChange={(e) => setStartupSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                  style={{
                    background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.1)",
                    color: isDark ? "#ffffff" : "#1e3a5f"
                  }}
                />
                <svg
                  className="absolute left-4 top-3.5 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ color: isDark ? "#64748b" : "#9ca3af" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {filteredStartupItems.map((item: any, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border transition-all duration-300 flex flex-col gap-5"
                  style={{
                    background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.06)",
                    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(30,58,95,0.04)"
                  }}
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}
                  >
                    <div>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}>
                        {item.startupName}
                      </h3>
                      <div className="text-[12px] font-semibold text-amber-500 mt-1">
                        Inception: {item.yearOfInception} | Reg No: {item.registrationNumber}
                      </div>
                    </div>
                    {item.dpiitCertificateNumber && (
                      <span
                        className="w-fit text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          background: "rgba(59,130,246,0.12)",
                          color: "#3b82f6"
                        }}
                      >
                        DPIIT: {item.dpiitCertificateNumber}
                      </span>
                    )}
                  </div>

                  {/* Founders & Incubation & Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px]">
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">Founders</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.founders.map((founder: string, idx: number) => (
                            <span
                              key={idx}
                              className="font-bold px-2.5 py-1 rounded-full text-[12px]"
                              style={{
                                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(30,58,95,0.04)",
                                color: isDark ? "#cbd5e1" : "#4b5563"
                              }}
                            >
                              {founder}
                            </span>
                          ))}
                        </div>
                      </div>

                      {item.stateStartupCertificateNumber && (
                        <div>
                          <span className="font-semibold text-slate-400">{SITE.stateStartupScheme} No:</span>{" "}
                          <span className="font-bold" style={{ color: isDark ? "#e2e8f0" : "#334155" }}>{item.stateStartupCertificateNumber}</span>
                        </div>
                      )}

                      {item.incubationDetails && (
                        <div>
                          <span className="font-semibold text-slate-400">Incubated At:</span>{" "}
                          <span className="font-bold" style={{ color: isDark ? "#e2e8f0" : "#334155" }}>{item.incubationDetails}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:border-l md:pl-6" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}>
                      <div>
                        <span className="font-semibold text-slate-400">CIN:</span>{" "}
                        <span className="font-mono font-bold" style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>{item.cin}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-400">Address:</span>{" "}
                        <span style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>{item.registeredAddress}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-400">Contact:</span>{" "}
                        <span className="font-semibold text-amber-500">{item.contactNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details Description */}
                  {item.productDetails && (
                    <div
                      className="p-4 rounded-xl text-[13.5px] leading-[1.7]"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(30,58,95,0.02)",
                        color: isDark ? "#cbd5e1" : "#4b5563",
                        borderLeft: "3px solid #f59e0b"
                      }}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1.5">Product & Innovation Profile</div>
                      {item.productDetails}
                    </div>
                  )}

                  {/* Document & Proof Verification Links */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}>
                    {item.links.incorporationCertificate && (
                      <a
                        href={item.links.incorporationCertificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Incorporation Certificate</span>
                      </a>
                    )}

                    {(item.links.dpiitCertificatePdf || item.links.dpiitCertificateJpeg) && (
                      <a
                        href={item.links.dpiitCertificatePdf || item.links.dpiitCertificateJpeg || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                        </svg>
                        <span>DPIIT Certificate</span>
                      </a>
                    )}

                    {(item.links.stateStartupCertificatePdf || item.links.stateStartupCertificateJpeg) && (
                      <a
                        href={item.links.stateStartupCertificatePdf || item.links.stateStartupCertificateJpeg || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                        </svg>
                        <span>{SITE.stateStartupScheme} Cert</span>
                      </a>
                    )}

                    {item.links.incubationProof && (
                      <a
                        href={item.links.incubationProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Incubation Proof</span>
                      </a>
                    )}

                    {item.links.externalFundProof1 && (
                      <a
                        href={item.links.externalFundProof1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-teal-500/10 text-teal-500 hover:bg-teal-500/20"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M8 11h8" />
                        </svg>
                        <span>Funding Grant 1</span>
                      </a>
                    )}

                    {item.links.externalFundProof2 && (
                      <a
                        href={item.links.externalFundProof2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-teal-500/10 text-teal-500 hover:bg-teal-500/20"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M8 11h8" />
                        </svg>
                        <span>Funding Grant 2</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {filteredStartupItems.length === 0 && (
                <div className="text-center py-8" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>
                  No startups matched your search filter.
                </div>
              )}
            </div>
          )}

          {slug === "mou" && (
            <div className="grid grid-cols-1 gap-6">
              {/* Search Bar for MoUs */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search MoUs by institute name or department..."
                  value={mouSearch}
                  onChange={(e) => setMouSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                  style={{
                    background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.1)",
                    color: isDark ? "#ffffff" : "#1e3a5f"
                  }}
                />
                <svg
                  className="absolute left-4 top-3.5 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ color: isDark ? "#64748b" : "#9ca3af" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {filteredMouItems.map((item: any, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border transition-all duration-300 flex flex-col gap-4"
                  style={{
                    background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.06)",
                    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(30,58,95,0.04)"
                  }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}
                  >
                    <h3 className="text-lg md:text-xl font-extrabold" style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}>
                      {item.instituteName}
                    </h3>
                    {(item.dateOfSigningMou || item.expiryDate) ? (
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-500 uppercase tracking-wide shrink-0"
                      >
                        {item.dateOfSigningMou ? `Signed: ${item.dateOfSigningMou}` : ""}
                        {item.expiryDate ? ` | Expires: ${item.expiryDate}` : ""}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-500 uppercase tracking-wide shrink-0">
                        Active Collaboration
                      </span>
                    )}
                  </div>

                  <div className="text-[13px]">
                    <span className="font-semibold text-slate-400">Department/Center:</span>{" "}
                    <span style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>{item.departmentOrCenter}</span>
                  </div>

                  {/* Document & Proof Verification Links */}
                  {(item.links.mouPdf || item.links.mouJpeg) && (
                    <div className="flex flex-wrap gap-2.5 pt-2 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}>
                      {item.links.mouPdf && (
                        <a
                          href={item.links.mouPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>PDF Document</span>
                        </a>
                      )}
                      {item.links.mouJpeg && (
                        <a
                          href={item.links.mouJpeg}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Image Preview</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {filteredMouItems.length === 0 && (
                <div className="text-center py-8" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>
                  No MoUs matched your search criteria.
                </div>
              )}
            </div>
          )}

          {slug === "publications" && (
            <div className="grid grid-cols-1 gap-6">
              {/* Publication Search & Filters */}
              <div className="flex flex-col gap-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search publications by title or journal..."
                    value={pubSearch}
                    onChange={(e) => setPubSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                    style={{
                      background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                      borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,58,95,0.1)",
                      color: isDark ? "#ffffff" : "#1e3a5f"
                    }}
                  />
                  <svg
                    className="absolute left-4 top-3.5 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ color: isDark ? "#64748b" : "#9ca3af" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-bold">
                  {/* Authorship Filter */}
                  <div className="flex items-center gap-2">
                    <span style={{ color: isDark ? "#64748b" : "#9ca3af" }}>Authorship:</span>
                    <div className="flex gap-1 bg-black/10 p-0.5 rounded-lg">
                      {["All", "Author", "Co Author"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPubTypeFilter(type)}
                          className={`px-3 py-1 rounded-md transition-colors ${pubTypeFilter === type ? "bg-amber-500 text-[#0a1628]" : (isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900")}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="flex items-center gap-2">
                    <span style={{ color: isDark ? "#64748b" : "#9ca3af" }}>Year:</span>
                    <div className="flex gap-1 bg-black/10 p-0.5 rounded-lg">
                      {["All", "2026", "2025", "2024", "2023"].map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setPubYearFilter(yr)}
                          className={`px-3 py-1 rounded-md transition-colors ${pubYearFilter === yr ? "bg-amber-500 text-[#0a1628]" : (isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900")}`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {filteredPubItems.map((item: any, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border transition-all duration-300 flex flex-col gap-4"
                  style={{
                    background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.06)",
                    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(30,58,95,0.04)"
                  }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-3"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,58,95,0.05)" }}
                  >
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {item.journalOrConferenceOrPublisher ? (
                        <span
                          className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                          style={{
                            background: "rgba(59,130,246,0.12)",
                            color: "#3b82f6"
                          }}
                        >
                          {item.journalOrConferenceOrPublisher}
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold italic text-slate-500">Not Specified Journal</span>
                      )}
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 uppercase tracking-wide">
                        {item.type}
                      </span>
                      {item.isPeerReviewed && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 uppercase tracking-wide">
                          Peer Reviewed
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-bold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>
                      Published: {item.yearOfPublication}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold leading-snug" style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}>
                    {item.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px] text-slate-400">
                    <div>
                      <span className="font-semibold">Authorship:</span>{" "}
                      <span className="font-bold text-amber-500">{item.authorship}</span>{" "}
                      {item.numberOfCoAuthors !== null && (
                        <span>({item.numberOfCoAuthors} Co-authors)</span>
                      )}
                    </div>
                    {item.volumeIssuePage && (
                      <div className="sm:col-span-2">
                        <span className="font-semibold">Volume / Issue:</span>{" "}
                        <span style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>{item.volumeIssuePage}</span>
                      </div>
                    )}
                    {item.isbnOrIssn && (
                      <div>
                        <span className="font-semibold">ISSN / ISBN:</span>{" "}
                        <span className="font-mono" style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>{item.isbnOrIssn}</span>
                      </div>
                    )}
                    {item.impactFactor && (
                      <div>
                        <span className="font-semibold">Impact Factor:</span>{" "}
                        <span className="font-bold text-emerald-500">{item.impactFactor}</span>
                      </div>
                    )}
                    {item.researchScore && (
                      <div>
                        <span className="font-semibold">Research Score:</span>{" "}
                        <span className="font-bold text-blue-500">{item.researchScore}</span>
                      </div>
                    )}
                  </div>

                  {item.doi && (
                    <div className="text-[12px]">
                      <span className="font-semibold text-slate-400">DOI:</span>{" "}
                      <a
                        href={item.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-amber-500 hover:text-amber-400 no-underline break-all"
                      >
                        {item.doi}
                      </a>
                    </div>
                  )}

                  {item.links.paperPdf && (
                    <div className="pt-2">
                      <a
                        href={item.links.paperPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold no-underline transition-colors bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>PDF Document</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {filteredPubItems.length === 0 && (
                <div className="text-center py-8" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>
                  No publications matched your search criteria.
                </div>
              )}
            </div>
          )}

          {slug === "ip" && (
            <div className="grid grid-cols-1 gap-6">
              {/* Type Filtering Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["All", "Utility", "Design", "Copyright"].map((type) => {
                  const count = type === "All"
                    ? article.items.length
                    : article.items.filter((item: any) => item.ipType === type).length;
                  const isActive = ipTypeFilter === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setIpTypeFilter(type)}
                      className="rounded-full px-4 py-1.5 text-[12px] font-bold transition-all duration-300 border focus:outline-none"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #f59e0b, #d97706)"
                          : isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(30,58,95,0.05)",
                        borderColor: isActive
                          ? "transparent"
                          : isDark
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(30,58,95,0.08)",
                        color: isActive
                          ? "#0a1628"
                          : isDark
                            ? "#cbd5e1"
                            : "#4b5563"
                      }}
                    >
                      {type} ({count})
                    </button>
                  );
                })}
              </div>

              {filteredIpItems.map((item: any, i) => renderIpCard(item, i))}
            </div>
          )}

          {slug === "awards" && (
            <div className="grid grid-cols-1 gap-6">
              {article.items?.map((item: any, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border transition-all duration-300"
                  style={{
                    background: isDark ? "rgba(13,31,60,0.5)" : "#ffffff",
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(30,58,95,0.06)",
                    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(30,58,95,0.04)"
                  }}
                >
                  <div className="flex justify-between items-center gap-4 mb-3">
                    <span className="text-[12px] font-extrabold text-amber-500 uppercase tracking-wider">
                      {item.body}
                    </span>
                    <span className="text-[12px] font-bold" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>
                      Received: {item.year}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold mb-1" style={{ color: isDark ? "#ffffff" : "#1e3a5f" }}>
                    {item.name}
                  </h3>
                  <div className="text-[13px] font-semibold mb-3" style={{ color: isDark ? "#cbd5e1" : "#4b5563" }}>
                    Recipient: {item.recipient}
                  </div>
                  <p className="text-[14px] leading-[1.75]" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
