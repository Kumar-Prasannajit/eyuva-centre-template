// About section: focus-area capsules and the impact dashboard numbers.
// Demo values — replace with the centre's real figures.
import { SITE } from "./site";
import { DEMO_PHOTOS } from "./images";

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
    bgImg: DEMO_PHOTOS.campus,
  },

  {
    value: 40,
    label: "STUDENT ENTREPRENEURS",
    plus: true,
    description:
      "Students supported through innovation, startup incubation and entrepreneurship programs.",
    gridArea: "students",
    tall: true,
    bgImg: DEMO_PHOTOS.students,
  },

  {
    value: 5,
    label: "STARTUPS GENERATED",
    plus: true,
    description:
      "Biotech and innovation-driven startups successfully incubated through the center.",
    gridArea: "research",
    bgImg: DEMO_PHOTOS.startup,
  },

  {
    value: 50,
    label: "LAKH GRANTS RAISED",
    plus: true,
    description:
      "External funding secured by students and startups associated with the E-YUVA ecosystem.",
    gridArea: "grants",
    bgImg: DEMO_PHOTOS.grants,
  },

  {
    value: 10,
    label: "PATENT APPLICATIONS",
    plus: true,
    description:
      "Intellectual property filings generated from student and startup innovations.",
    gridArea: "awards",
    bgImg: DEMO_PHOTOS.patent,
  },

  {
    value: 12,
    label: "PUBLICATIONS",
    plus: true,
    description:
      "Research publications contributed to reputed journals and scientific conferences.",
    gridArea: "publications",
    bgImg: DEMO_PHOTOS.publication,
  },

  {
    value: 20,
    label: "FEMALE INNOVATORS",
    plus: true,
    description:
      "Women innovators and entrepreneurs supported through mentorship and incubation programs.",
    gridArea: "collabs",
    highlight: true,
    bgImg: DEMO_PHOTOS.women,
  },
];

// Small stat tiles shown under the impact grid.
export const MINI_STATS = [
  { value: "10+", label: "Institutions Sensitized" },
  { value: "2", label: "Granted Patents" },
  { value: "1", label: "Product Commercialized" },
  { value: "5", label: "MVPs Developed" },
];
