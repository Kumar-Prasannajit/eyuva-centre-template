"use client";

import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { SITE } from "@/content/site";

const QUICK_LINKS = [
  { href: "#about", label: "About the Center" },
  { href: "#programs", label: "Programs" },
  { href: "#projects", label: "Research Projects" },
  { href: "#lab-booking", label: "Lab Booking" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
];

const PROGRAM_LINKS = [
  "E-YUVA Fellowship",
  "Translational Research",
  "Startup Incubation",
  "Skill Development",
  "Mentorship Network",
  "Funding Access",
];

const CONTACT = [
  { label: SITE.email },
  { label: SITE.phone },
  { label: `${SITE.university}, ${SITE.city}` },
  { label: `${SITE.state} – ${SITE.pincode}` },
];

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`pt-14 pb-8 px-6 md:px-12 border-t transition-colors duration-300 ${
        isDark ? "bg-[#050c18] border-white/8" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="w-35 h-10 flex items-center justify-center text-[#0a1628] font-black text-lg mb-4">
              <Image
                src={SITE.logo}
                alt={SITE.logoAlt}
                width={140}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <p
              className={`text-[13px] leading-[1.7] max-w-60 transition-colors duration-300 ${
                isDark ? "text-slate-400" : "text-gray-600"
              }`}
            >
              {SITE.footerBlurb}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-[12px] font-bold tracking-widest uppercase mb-4 transition-colors duration-300 ${
                isDark ? "text-slate-300" : "text-[#1e3a5f]"
              }`}
            >
              Quick Links
            </h4>

            <ul className="list-none space-y-2.5">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`text-[13px] no-underline transition-colors duration-200 ${
                      isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-gray-600 hover:text-[#1e3a5f]"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4
              className={`text-[12px] font-bold tracking-widest uppercase mb-4 transition-colors duration-300 ${
                isDark ? "text-slate-300" : "text-[#1e3a5f]"
              }`}
            >
              Programs
            </h4>

            <ul className="list-none space-y-2.5">
              {PROGRAM_LINKS.map((p) => (
                <li key={p}>
                  <a
                    href="#programs"
                    className={`text-[13px] no-underline transition-colors duration-200 ${
                      isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-gray-600 hover:text-[#1e3a5f]"
                    }`}
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-[12px] font-bold tracking-widest uppercase mb-4 transition-colors duration-300 ${
                isDark ? "text-slate-300" : "text-[#1e3a5f]"
              }`}
            >
              Contact
            </h4>

            <ul className="list-none space-y-2.5">
              {CONTACT.map(({ label }) => (
                <li key={label}>
                  <span
                    className={`text-[13px] transition-colors duration-300 ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t transition-colors duration-300 ${
            isDark ? "border-white/8" : "border-gray-200"
          }`}
        >
          <p
            className={`text-[12px] transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}
          >
            © {new Date().getFullYear()} {SITE.centreName}, {SITE.university},{" "}
            {SITE.city}, {SITE.state}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {["BIRAC", "DBT Supported", "Govt. of India"].map((b) => (
              <span
                key={b}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors duration-300 ${
                  isDark
                    ? "bg-white/5 border border-white/8 text-slate-400"
                    : "bg-gray-100 border border-gray-200 text-gray-600"
                }`}
              >
                {b}
              </span>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                isDark
                  ? "bg-white/5 border border-white/8"
                  : "bg-gray-100 border border-gray-200"
              }`}
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" fill="#f59e0b" />
                  <path
                    d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                    fill="#1e3a5f"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
