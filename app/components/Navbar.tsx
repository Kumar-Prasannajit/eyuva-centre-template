"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import DNAStage from "./DNAStage";
import { SITE } from "@/content/site";

const NAV_LINKS = [
  { href: "#about",       label: "About" },
  { href: "#people",      label: "People" },
  { href: "#fellows",     label: "Fellows" },
  { href: "#programs",    label: "Programs" },
  { href: "#lab-booking", label: "Lab Booking" },
  { href: "#gallery",     label: "Gallery" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const selectors = NAV_LINKS.map((link) => link.href).join(", ");
      const sections = document.querySelectorAll(selectors);
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= (sec as HTMLElement).offsetTop - 90) {
          current = sec.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-18 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10"
            : "bg-white/95 backdrop-blur-md border-b border-black/10"
          : theme === "dark"
          ? "bg-[#0a1628]/80 backdrop-blur-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Logo */}
      <Link href="/" className={`flex items-center gap-3 no-underline ${theme === 'dark' ? 'text-white' : 'text-[#1f2937]'}`}>
        <div className="w-35 h-10 flex items-center justify-center text-[#0a1628] font-black text-lg">
          <Image src={SITE.logo} alt={SITE.logoAlt} width={140} height={40} className="w-full h-full object-cover" />  
        </div>
      </Link>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={`text-[14px] font-medium no-underline transition-colors duration-200 ${
                active === href.slice(1)
                  ? "text-amber-400"
                  : theme === 'dark'
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-[#1f2937]"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Theme toggle + CTA */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-white/10 text-amber-400 hover:bg-white/20'
              : 'bg-black/10 text-amber-600 hover:bg-black/20'
          }`}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    fill="#f59e0b"
                  />
                  <path
                    d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                    fill="#1e3a5f"
                  />
                </svg>
              )}
        </button>

        <a
          href="#programs"
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-amber-500 text-[#0a1628] text-[14px] font-bold no-underline transition-all duration-200 hover:bg-amber-400 hover:-translate-y-px active:scale-95"
        >
          Apply for Fellowship
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col gap-1.25 p-2 cursor-pointer bg-transparent border-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-[#1f2937]'} ${menuOpen ? "rotate-45 translate-y-1.75" : ""}`} />
        <span className={`block w-5 h-0.5 transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-[#1f2937]'} ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-[#1f2937]'} ${menuOpen ? "-rotate-45 -translate-y-1.75" : ""}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`absolute top-18 left-0 right-0 border-b px-6 py-4 lg:hidden overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#0d1f3c]/95 backdrop-blur-md border-white/10'
            : 'bg-white/95 backdrop-blur-md border-black/10'
        }`}>
          {/* DNA Helix background animation on the right side */}
          <div className="absolute right-7.5 top-5 pointer-events-none opacity-100 scale-[0.4] origin-top-right z-0">
            <DNAStage />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-[15px] font-medium no-underline transition-colors ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-[#1f2937]'
                }`}
              >
                {label}
              </a>
            ))}
            <div className="flex gap-2 mt-2">
              <button
                onClick={toggleTheme}
                className={`flex-1 py-2 flex items-center justify-center rounded-lg transition-colors duration-200 text-lg ${
                  theme === 'dark'
                    ? 'bg-white/10 text-amber-400 hover:bg-white/20'
                    : 'bg-black/10 text-amber-600 hover:bg-black/20'
                }`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      fill="#f59e0b"
                    />
                    <path
                      d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                      fill="#1e3a5f"
                    />
                  </svg>
                )}
              </button>
              <a
                href="#programs"
                className="flex-1 inline-flex items-center justify-center px-5 py-2 rounded-lg bg-amber-500 text-[#0a1628] text-[14px] font-bold no-underline"
              >
                Apply for Fellowship
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
