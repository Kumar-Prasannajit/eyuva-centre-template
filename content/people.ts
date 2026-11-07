// ─────────────────────────────────────────────────────────────
//  PEOPLE — leadership, centre team, Innovation Fellows,
//  E-YUVA fellow projects and the knowledge-hub cards.
//  All entries below are DEMO placeholders. Photos go in /public
//  (e.g. /people/vice-chancellor.webp) and are referenced by path.
//  Use "#" or null where a LinkedIn profile isn't available.
// ─────────────────────────────────────────────────────────────

import { SITE } from "./site";
import { DEMO_PHOTOS } from "./images";

export interface EyuvaProject {
  projectId: string;
  title: string;
  cohortType: string;
  projectRefNo: string;
  affiliation?: string;
  mentor: string;
  groupImage?: string;
  status?: string;
  timeline?: {
    startDate: string; // DD/MM/YYYY — the year groups projects into cohort tabs
    stipulatedCompletionDate: string;
    extensionMonths?: string;
    finalCompletionDate?: string;
  };
  metrics?: {
    prototypeEstablished?: string | null;
    publications?: string | null;
    ipDetails?: string | null;
    thirdPartyValidation?: string | null;
    startupCreated?: string | null;
    fundingRaisedLakhs?: string | null;
  };
  fellows?: { name: string; linkedin: string | null }[];
}

export type Person = {
  id: number;
  name: string;
  designation: string;
  linkedin: string;
  image: string;
  dept?: string;
};

export type PublicationsInfo = {
  published?: number;
  under_review?: number;
  submitted?: number;
};

export type InnovationFellow = {
  id: string;
  name: string;
  institute: string;
  mentors: string[];
  projectRefNo: string;
  projectTitle: string;
  startDate: string;
  stipulatedCompletionDate: string;
  extensionRequested: string;
  finalCompletionDate: string;
  prototypeEstablished: string;
  ipDetails: string | null;
  publications: PublicationsInfo | string;
  thirdPartyValidation: string | null;
  startup: string | null;
  fundRaisedLakhs: number | null;
  status: "Completed" | "Ongoing";
  photo: string;
  linkedin: string | null;
};

const CENTRE_LABEL = `E-YUVA Centre, ${SITE.university}, ${SITE.city}`;

/* ── University leadership ─────────────────────────────── */
export const LEADERSHIP: Person[] = [
  { id: 1, name: "Prof. (Dr.) Firstname Lastname", designation: "President", dept: SITE.university, linkedin: "#", image: "/demo/people/1.webp" },
  { id: 2, name: "Prof. (Dr.) Firstname Lastname", designation: "Vice President", dept: SITE.university, linkedin: "#", image: "/demo/people/2.webp" },
  { id: 3, name: "Prof. (Dr.) Firstname Lastname", designation: "Director General", dept: SITE.university, linkedin: "#", image: "/demo/people/3.webp" },
  { id: 4, name: "Prof. (Dr.) Firstname Lastname", designation: "Vice Chancellor", dept: "Academic Affairs", linkedin: "#", image: "/demo/people/4.webp" },
  { id: 5, name: "Prof. (Dr.) Firstname Lastname", designation: "Registrar", dept: "Administration", linkedin: "#", image: "/demo/people/5.webp" },
];

/* ── BIRAC / BioNEST leadership linked to the centre ───── */
export const CENTER_LEADERSHIP: Person[] = [
  { id: 1, name: "Dr. Firstname Lastname", designation: "Managing Director", dept: "BIRAC, New Delhi", linkedin: "#", image: "/demo/people/6.webp" },
  { id: 2, name: "Ms. Firstname Lastname", designation: "Officer – Incubation & Entrepreneurship Development", dept: "BIRAC, New Delhi", linkedin: "#", image: "/demo/people/7.webp" },
  { id: 3, name: "Dr. Firstname Lastname", designation: "Chief Operating Officer, BioNEST Bioincubator", dept: "Knowledge Partner Institute", linkedin: "#", image: "/demo/people/8.webp" },
];

/* ── Centre team ───────────────────────────────────────── */
export const CHIEFS: Person[] = [
  { id: 1, name: "Dr. Firstname Lastname", designation: "Chief Coordinator", dept: SITE.department, linkedin: "#", image: "/demo/people/9.webp" },
  { id: 2, name: "Dr. Firstname Lastname", designation: "Centre Coordinator", dept: SITE.department, linkedin: "#", image: "/demo/people/10.webp" },
  { id: 3, name: "Ms. Firstname Lastname", designation: "Project Assistant", dept: SITE.department, linkedin: "#", image: "/demo/people/11.webp" },
  { id: 4, name: "Mr. Firstname Lastname", designation: "Office Assistant", dept: SITE.department, linkedin: "#", image: "/demo/people/12.webp" },
];

/* ── BIRAC Innovation Fellows (PG and above) ───────────── */
export const INNOVATION_FELLOWS_DATA: InnovationFellow[] = [
  {
    id: "fellow-1",
    name: "Dr. Innovation Fellow One",
    institute: CENTRE_LABEL,
    mentors: ["Dr. Mentor Name, Partner Research Institute", "Dr. Mentor Name, Coordinator, EYC"],
    projectRefNo: "BT/IF0000/01/24",
    projectTitle: "Low-cost microalgae-based nutritional supplement for clinical use",
    startDate: "01/07/2024",
    stipulatedCompletionDate: "31/12/2025",
    extensionRequested: "Not Requested",
    finalCompletionDate: "31/12/2025",
    prototypeEstablished: "Yes",
    ipDetails: "01 Patent Filed",
    publications: { published: 1, under_review: 1, submitted: 2 },
    thirdPartyValidation: "In Process",
    startup: "Demo Biotech Pvt. Ltd.",
    fundRaisedLakhs: 5,
    status: "Completed",
    photo: "/demo/people/13.webp",
    linkedin: null,
  },
  {
    id: "fellow-2",
    name: "Ms. Innovation Fellow Two",
    institute: CENTRE_LABEL,
    mentors: ["Dr. Mentor Name, Coordinator, EYC"],
    projectRefNo: "BT/IF0000/02/24",
    projectTitle: "Biodegradable packaging film from agricultural waste",
    startDate: "01/03/2025",
    stipulatedCompletionDate: "31/08/2026",
    extensionRequested: "Not Requested",
    finalCompletionDate: "31/08/2026",
    prototypeEstablished: "Yes",
    ipDetails: null,
    publications: "In Process",
    thirdPartyValidation: null,
    startup: null,
    fundRaisedLakhs: null,
    status: "Ongoing",
    photo: "/demo/people/14.webp",
    linkedin: null,
  },
  {
    id: "fellow-3",
    name: "Mr. Innovation Fellow Three",
    institute: CENTRE_LABEL,
    mentors: [],
    projectRefNo: "BT/IF0000/03/25",
    projectTitle: "AI-assisted point-of-care screening tool for rural clinics",
    startDate: "01/07/2025",
    stipulatedCompletionDate: "31/12/2026",
    extensionRequested: "Not Requested",
    finalCompletionDate: "31/12/2026",
    prototypeEstablished: "No",
    ipDetails: null,
    publications: "In Process",
    thirdPartyValidation: null,
    startup: null,
    fundRaisedLakhs: null,
    status: "Ongoing",
    photo: "/demo/people/15.webp",
    linkedin: null,
  },
];

/* ── BIRAC E-YUVA Fellows (UG team projects) ───────────── */
export const EYUVA_PROJECTS: EyuvaProject[] = [
  {
    projectId: "eyuva-demo-1",
    title: "Plant-based antibacterial coating for food packaging",
    cohortType: "e-yuva",
    projectRefNo: "BT/EF0000/01/24",
    affiliation: `${SITE.university}, ${SITE.city}`,
    mentor: "Dr. Mentor Name, Assistant Professor",
    groupImage: DEMO_PHOTOS.project1,
    status: "Completed",
    timeline: { startDate: "01/12/2024", stipulatedCompletionDate: "30/11/2025", extensionMonths: "0", finalCompletionDate: "30/11/2025" },
    metrics: { prototypeEstablished: "Yes", publications: "01 Published", ipDetails: null, thirdPartyValidation: null, startupCreated: null, fundingRaisedLakhs: null },
    fellows: [
      { name: "Student Fellow One", linkedin: null },
      { name: "Student Fellow Two", linkedin: null },
      { name: "Student Fellow Three", linkedin: null },
    ],
  },
  {
    projectId: "eyuva-demo-2",
    title: "Digital patient record kiosk for primary health centres",
    cohortType: "e-yuva",
    projectRefNo: "BT/EF0000/02/24",
    affiliation: "Partner Medical College",
    mentor: "Dr. Mentor Name, Professor & Head, Community Medicine",
    groupImage: DEMO_PHOTOS.project2,
    status: "Completed",
    timeline: { startDate: "01/12/2024", stipulatedCompletionDate: "30/11/2025", extensionMonths: "0", finalCompletionDate: "30/11/2025" },
    metrics: { prototypeEstablished: "Yes", publications: null, ipDetails: "01 Patent Filed", thirdPartyValidation: null, startupCreated: null, fundingRaisedLakhs: null },
    fellows: [
      { name: "Student Fellow One", linkedin: null },
      { name: "Student Fellow Two", linkedin: null },
      { name: "Student Fellow Three", linkedin: null },
    ],
  },
  {
    projectId: "eyuva-demo-3",
    title: "Low-cost biochar for aquaculture water treatment",
    cohortType: "e-yuva",
    projectRefNo: "BT/EF0000/03/25",
    affiliation: `${SITE.university}, ${SITE.city}`,
    mentor: "Dr. Mentor Name, Associate Professor",
    groupImage: DEMO_PHOTOS.project3,
    status: "Ongoing",
    timeline: { startDate: "01/12/2025", stipulatedCompletionDate: "30/11/2026" },
    metrics: { prototypeEstablished: "In Progress", publications: null, ipDetails: null, thirdPartyValidation: null, startupCreated: null, fundingRaisedLakhs: null },
    fellows: [
      { name: "Student Fellow One", linkedin: null },
      { name: "Student Fellow Two", linkedin: null },
      { name: "Student Fellow Three", linkedin: null },
      { name: "Student Fellow Four", linkedin: null },
    ],
  },
];

/* ── Knowledge hub cards (link to /knowledge/[slug]) ───── */
export const KNOWLEDGE_CARDS = [
  {
    title: "Startup Success Stories",
    href: "/knowledge/startup-success-stories",
    image: DEMO_PHOTOS.startup,
    readTime: "5 min read",
    category: "Startups",
    description: "Explore biotech startup journeys from lab validation to market entry, pilot studies, and venture success.",
  },
  {
    title: "Memorandums of Understanding (MoUs)",
    href: "/knowledge/mou",
    image: DEMO_PHOTOS.collabs,
    readTime: "4 min read",
    category: "Collaborations",
    description: "Academic, research, and corporate partnerships driving knowledge transfer and co-incubation.",
  },
  {
    title: "Scientific Publications",
    href: "/knowledge/publications",
    image: DEMO_PHOTOS.publication,
    readTime: "8 min read",
    category: "Research",
    description: "Peer-reviewed scientific articles, journals, and conference papers authored by E-YUVA research fellows.",
  },
  {
    title: "Intellectual Property & Patents",
    href: "/knowledge/ip",
    image: DEMO_PHOTOS.patent,
    readTime: "6 min read",
    category: "Patents",
    description: "Granted patents, filings, utility models, and technology transfers developed at the center.",
  },
  {
    title: "Awards & Accolades",
    href: "/knowledge/awards",
    image: DEMO_PHOTOS.award,
    readTime: "5 min read",
    category: "Recognition",
    description: "Awards, national honors, hackathon achievements, and recognition received by E-YUVA innovators.",
  },
];

/* ── Headline counts shown at the top of the People section ── */
export const PEOPLE_STATS_FELLOWS_LABEL = "20+";
