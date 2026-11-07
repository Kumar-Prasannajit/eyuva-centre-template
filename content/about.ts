// About section: focus-area capsules and the impact dashboard numbers.
// Demo values — replace with the centre's real figures.
import { SITE } from "./site";

export const CAPSULES = [
  "Innovation",
  "Entrepreneurship",
  "Research",
  "Biotechnology",
  "Startup Development",
  "Incubation",
];

export const STATS = [
  {
    value: SITE.established,
    label: "ESTABLISHED",
    plus: false,
    description:
      "Founded under BIRAC's E-YUVA scheme to nurture biotech innovation and entrepreneurship.",
    gridArea: "established",
    hero: true,
    bgImg: "/demo/impact/campus.webp",
  },

  {
    value: 40,
    label: "STUDENT ENTREPRENEURS",
    plus: true,
    description:
      "Students supported through innovation, startup incubation and entrepreneurship programs.",
    gridArea: "students",
    tall: true,
    bgImg: "/demo/impact/students.webp",
  },

  {
    value: 5,
    label: "STARTUPS GENERATED",
    plus: true,
    description:
      "Biotech and innovation-driven startups successfully incubated through the center.",
    gridArea: "research",
    bgImg: "/demo/impact/startup.webp",
  },

  {
    value: 50,
    label: "LAKH GRANTS RAISED",
    plus: true,
    description:
      "External funding secured by students and startups associated with the E-YUVA ecosystem.",
    gridArea: "grants",
    bgImg: "/demo/impact/grants.webp",
  },

  {
    value: 10,
    label: "PATENT APPLICATIONS",
    plus: true,
    description:
      "Intellectual property filings generated from student and startup innovations.",
    gridArea: "awards",
    bgImg: "/demo/impact/patent.webp",
  },

  {
    value: 12,
    label: "PUBLICATIONS",
    plus: true,
    description:
      "Research publications contributed to reputed journals and scientific conferences.",
    gridArea: "publications",
    bgImg: "/demo/impact/publication.webp",
  },

  {
    value: 20,
    label: "FEMALE INNOVATORS",
    plus: true,
    description:
      "Women innovators and entrepreneurs supported through mentorship and incubation programs.",
    gridArea: "collabs",
    highlight: true,
    bgImg: "/demo/impact/women.webp",
  },
];

// Small stat tiles shown under the impact grid.
export const MINI_STATS = [
  { value: "10+", label: "Institutions Sensitized" },
  { value: "2", label: "Granted Patents" },
  { value: "1", label: "Product Commercialized" },
  { value: "5", label: "MVPs Developed" },
];
