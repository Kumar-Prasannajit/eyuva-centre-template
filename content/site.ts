// ─────────────────────────────────────────────────────────────
//  SITE CONFIG — the one file to edit for a new E-YUVA centre.
//  Everything that names the centre, its university, contacts
//  and branding lives here. Detailed lists (people, events,
//  partners, gallery, knowledge pages) live in the other files
//  in this folder.
// ─────────────────────────────────────────────────────────────

import { DEMO_PHOTOS, EVENT_PHOTOS } from "./images";

export const SITE = {
  // Identity
  centreName: "BIRAC E-YUVA Center",
  university: "Demo University",
  universityShort: "DU",
  department: "Department of Biotechnology",
  city: "Your City",
  state: "Your State",
  pincode: "000000",
  established: 2021,
  // State startup programme name shown on startup cards, e.g. "Startup Odisha", "StartupTN"
  stateStartupScheme: "State Startup Mission",

  // Branding — replace /demo/logo.webp with the centre's logo
  logo: "/demo/logo.webp",
  logoAlt: "E-YUVA Center logo",

  // Contact
  email: "eyuva@demo-university.edu.in",
  phone: "+91-00000-00000",

  // SEO
  metaDescription:
    "Empowering young innovators, researchers, and entrepreneurs through biotechnology innovation, translational research, mentorship, incubation, and funding support.",
  keywords: ["BIRAC", "E-YUVA", "Biotechnology", "Research", "Fellowship", "Incubation"],

  // Hero
  heroQuote: "Embrace Youth Innovation, Empower the Nation.",
  heroDescription:
    "Empowering young innovators, researchers, and entrepreneurs through biotechnology innovation, translational research, mentorship, incubation, and funding support.",
  heroLiveLab: "Genomics Sequencer · Slot Available",
  heroFellowshipLabel: "Fellowship 2026",
  heroFellowshipValue: "₹5L Grant · 6 mo Mentorship",

  // About
  aboutBadge: "A flagship biotech innovation hub in the region",
  aboutParagraphs: [
    "The E-YUVA Center at Demo University is established with support from BIRAC and the Department of Biotechnology, Government of India. We nurture innovation, translational research, startup development, and entrepreneurship among students and researchers — turning ideas into impactful, scalable ventures.",
    "From bench to business — we provide infrastructure, mentorship, funding pathways, and a vibrant ecosystem where young minds build science-led companies that solve real-world problems.",
  ],
  aboutImages: [
    { src: DEMO_PHOTOS.aboutLab, alt: "Researcher at a microscope" },
    { src: DEMO_PHOTOS.aboutMicroscope, alt: "Lab equipment" },
    { src: DEMO_PHOTOS.aboutTeam, alt: "Scientists collaborating" },
  ],

  // Background photo behind the fellowship panel in Programs
  programsBackground: EVENT_PHOTOS[5],

  // Footer
  footerBlurb:
    "Empowering youth through biotechnology innovation, translational research, mentorship, and funding support. Supported by DBT & BIRAC, Government of India.",
} as const;

// Derived strings used across the site
export const LOCATION_LINE = `${SITE.university} · ${SITE.city} · ${SITE.state}`;
export const FULL_NAME = `${SITE.centreName} – ${SITE.university}`;
