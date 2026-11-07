// ─────────────────────────────────────────────────────────────
//  EVENTS — everything listed under Programs:
//  conferences, workshops, hackathons, webinars, FDPs, bootcamps,
//  community outreach (CoE) and national outreach.
//  DEMO entries only. Card images go in /public; document links
//  (posters, souvenirs, photo collages) can be Google Drive links.
//  type: "organized" | "participated" | "National" | "International"
// ─────────────────────────────────────────────────────────────

import { SITE } from "./site";

const ORGANISER = `BIRAC E-YUVA Centre, ${SITE.department}`;
const ORGANISER_UNI = `BIRAC E-YUVA Centre, ${SITE.university}`;
const BIRAC_SPONSOR =
  "Biotechnology Industry Research Assistance Council, Department of Biotechnology, Govt. of India (DBT-BIRAC)";

export interface EventItem {
  id: string;
  title: string;
  date: string | null;
  description?: string;
  image?: string | null;
  type: string | null;
  tags: string[];
  venue?: string;
  participants?: number;
  organizedBy?: string;
  coOrganizedBy?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
  sponsoredBy?: string | null;
  hostedBy?: string | null;
  convenorName?: string | null;
  coSponsoredBy?: string | null;
  numberOfParticipants?: number | null;
  theme?: string | null;
  links?: {
    poster?: string | null;
    eventPhotoCollage1?: string | null;
    eventPhotoCollage2?: string | null;
    posterPdf?: string | null;
    posterJpeg?: string | null;
    photoCollage1?: string | null;
    photoCollage2?: string | null;
    photoCollage3?: string | null;
    souvenir?: string | null;
    souvenirPdf?: string | null;
    souvenirJpeg?: string | null;
    abstractBookPdf?: string | null;
    abstractBookJpeg?: string | null;
    flyerPdf?: string | null;
    flyerJpeg1?: string | null;
    flyerJpeg2?: string | null;
    bannerPdf?: string | null;
    bannerJpeg?: string | null;
    photoCollages?: string[] | null;
  } | null;
}

// ── Translational Research & Academic Entrepreneurship ──

export const conferenceEvents: EventItem[] = [
  {
    id: "conf-1",
    title: "International Conference on Translational Research & Bio-Entrepreneurship 2026",
    date: "2026-02-23",
    fromDate: "23/02/2026",
    toDate: "25/02/2026",
    type: "International",
    convenorName: "Dr. Convenor Name",
    organizedBy: ORGANISER,
    sponsoredBy: "Sponsoring Agency, Govt. of India",
    coSponsoredBy: null,
    numberOfParticipants: 200,
    tags: ["Conference", "Translational Research", "Bio-Entrepreneurship"],
    links: { souvenirPdf: null, flyerPdf: null, photoCollages: [] },
  },
  {
    id: "conf-2",
    title: "National Conference on Biotechnology for Sustainable Agriculture",
    date: "2025-03-14",
    fromDate: "14/03/2025",
    toDate: "15/03/2025",
    type: "National",
    convenorName: "Dr. Convenor Name",
    organizedBy: ORGANISER,
    sponsoredBy: BIRAC_SPONSOR,
    coSponsoredBy: null,
    numberOfParticipants: 150,
    tags: ["Conference", "Agri-Biotech", "Sustainability"],
    links: { souvenirPdf: null, flyerPdf: null, photoCollages: [] },
  },
];

export const workshopEvents: EventItem[] = [
  {
    id: "ws-1",
    title: "Hands-on Workshop on 3D Bioprinting",
    date: "2025-02-10",
    description: "Intensive hands-on workshop covering 3D bioprinting techniques, bioink preparation, and tissue engineering applications.",
    image: "/demo/events/1.webp",
    type: "organized",
    tags: ["3D Printing", "Bioprinting", "Tissue Engineering"],
    venue: "E-YUVA Bio-Innovation Lab",
    participants: 45,
  },
  {
    id: "ws-2",
    title: "Research Methodology & Scientific Writing Workshop",
    date: "2025-05-18",
    description: "A comprehensive workshop on research methodology, data analysis, and scientific manuscript writing for students and early-career researchers.",
    image: "/demo/events/2.webp",
    type: "organized",
    tags: ["Research Methodology", "Scientific Writing"],
    venue: SITE.university,
    participants: 80,
  },
  {
    id: "ws-3",
    title: "Product Development & Prototyping Workshop",
    date: "2025-08-25",
    description: "Workshop on transforming research ideas into viable products — from concept validation to MVP development and market testing.",
    image: "/demo/events/3.webp",
    type: "organized",
    tags: ["Product Development", "Prototyping", "MVP"],
    venue: "E-YUVA Innovation Hub",
    participants: 60,
  },
];

export const hackathonEvents: EventItem[] = [
  {
    id: "hack-1",
    title: "BioHack: Food & Health Innovation Challenge",
    date: "2025-09-19",
    fromDate: "19/09/2025",
    toDate: "20/09/2025",
    type: "organized",
    theme: "Food Innovation",
    numberOfParticipants: 180,
    tags: ["Hackathon", "Food Innovation", "Health"],
    links: { posterPdf: null, posterJpeg: null, photoCollage1: null, souvenir: null },
  },
];

export const webinarEvents: EventItem[] = [
  {
    id: "web-1",
    title: "5-Day Hands-on Training on 3D/2D Modelling, Design & Printing",
    date: "2025-02-22",
    fromDate: "22/02/2025",
    toDate: "26/02/2025",
    type: "organized",
    tags: ["3D Modelling", "Design & Printing"],
    organizedBy: ORGANISER,
    sponsoredBy: BIRAC_SPONSOR,
    hostedBy: `${SITE.university}, ${SITE.city}`,
    links: { posterPdf: null, posterJpeg: null, photoCollage1: null },
  },
  {
    id: "web-2",
    title: "Webinar: Funding Pathways for Biotech Startups",
    date: "2025-06-10",
    fromDate: "10/06/2025",
    toDate: "10/06/2025",
    type: "organized",
    tags: ["Webinar", "Funding", "Startups"],
    organizedBy: ORGANISER,
    sponsoredBy: BIRAC_SPONSOR,
    hostedBy: `${SITE.university}, ${SITE.city}`,
    links: { posterPdf: null, posterJpeg: null, photoCollage1: null },
  },
];

export const fdpEvents: EventItem[] = [
  {
    id: "fdp-1",
    title: "FDP on Bioinformatics & Computational Biology",
    date: "2025-03-01",
    description: "A 5-day Faculty Development Program covering bioinformatics tools, computational approaches to biology, and data-driven research methods.",
    image: "/demo/events/4.webp",
    type: "organized",
    tags: ["FDP", "Bioinformatics", "Computational Biology"],
    venue: SITE.university,
    participants: 40,
  },
  {
    id: "fdp-2",
    title: "FDP on Innovation & Entrepreneurship in Academia",
    date: "2025-07-12",
    description: "Faculty Development Program focused on fostering innovation culture, IP management, and entrepreneurial thinking in academic institutions.",
    image: "/demo/events/5.webp",
    type: "organized",
    tags: ["FDP", "Innovation", "Entrepreneurship"],
    venue: SITE.university,
    participants: 55,
  },
];

export const startupBootcampEvents: EventItem[] = [
  {
    id: "sb-1",
    title: "BioStartup Bootcamp — Cohort 1",
    date: "2025-02-20",
    description: "A 2-week intensive bootcamp for aspiring biotech entrepreneurs covering business model canvas, funding strategies, pitching, and MVP development.",
    image: "/demo/events/6.webp",
    type: "organized",
    tags: ["Startup", "Bootcamp", "Entrepreneurship"],
    venue: "E-YUVA Incubation Center",
    participants: 30,
  },
  {
    id: "sb-2",
    title: "Startup Bootcamp — From Lab to Market",
    date: "2025-09-05",
    description: "An intensive bootcamp guiding researchers through the journey of commercializing their biotech innovations — from lab bench to market launch.",
    image: "/demo/events/7.webp",
    type: "organized",
    tags: ["Commercialization", "Startup", "Market Entry"],
    venue: "E-YUVA Innovation Hub",
    participants: 35,
  },
];

// ── Community Outreach Events (COE) ──

export const coeEndUserEvents: EventItem[] = [
  {
    id: "coe-eu-1",
    title: "Orientation on the BIRAC E-YUVA Scheme for Future Biotech Entrepreneurs",
    date: null,
    type: "organized",
    tags: ["Orientation", "Outreach", "Biotech Entrepreneurship"],
    organizedBy: ORGANISER_UNI,
    coOrganizedBy: null,
    description: "Orientation program highlighting entrepreneurship opportunities, funding schemes, and mentoring resources available under BIRAC E-YUVA for prospective biotech innovators.",
  },
  {
    id: "coe-eu-2",
    title: "Farmer Interaction on Biofertilizer Adoption",
    date: "2025-11-08",
    type: "organized",
    tags: ["Farmers", "Need Assessment", "Agri-Biotech"],
    organizedBy: ORGANISER_UNI,
    coOrganizedBy: null,
    description: "Interaction with local farmer groups to understand field challenges and gather feedback on biofertilizer prototypes developed by fellows.",
  },
];

export const coeSiteVisitEvents: EventItem[] = [
  {
    id: "coe-sv-1",
    title: "E-YUVA Roadshow: Campus Visit to a Partner Institute",
    date: null,
    type: "organized",
    tags: ["Outreach", "Roadshow", "Partner Institute"],
    organizedBy: ORGANISER_UNI,
    coOrganizedBy: null,
    description: "Orientation and roadshow visit to engage student teams at a partner institute and coordinate incubation pathways.",
  },
];

export const coeIndustryEvents: EventItem[] = [
  {
    id: "coe-ind-1",
    title: "Roundtable Discussion on Bridging the Gap Between Industry & Academia",
    date: "2025-12-12",
    type: "organized",
    tags: ["Roundtable", "Industry-Academia", "Synergy"],
    organizedBy: "University Incubation Centre",
    coOrganizedBy: ORGANISER_UNI,
    description: "A dialogue aligning curriculum, applied biotechnology research, industrial constraints, and commercial validation to accelerate technology transfer.",
    venue: `${SITE.university} Boardroom`,
  },
];

export const coeGrassrootEvents: EventItem[] = [
  {
    id: "coe-gr-1",
    title: "Harnessing Indigenous Knowledge: Barriers to Mainstreaming and Scale-Up",
    date: null,
    type: "organized",
    tags: ["Grassroot", "Indigenous Knowledge", "Intellectual Property"],
    organizedBy: "University Incubation Centre",
    coOrganizedBy: ORGANISER_UNI,
    description: "Expert panel on documenting, validating, protecting, and commercializing traditional medicinal and crop formulations.",
  },
];

// ── National Outreach Events Participated ──

export const nationalOutreachEvents: EventItem[] = [
  {
    id: "nat-1",
    title: "BIRAC Innovators Meet — New Delhi",
    date: "2025-02-15",
    description: "Participated in the annual BIRAC Innovators Meet showcasing E-YUVA centre achievements, fellowship outcomes, and startup success stories.",
    image: "/demo/events/8.webp",
    type: "participated",
    tags: ["BIRAC", "National Meet", "Innovation"],
    venue: "New Delhi",
    participants: 500,
  },
  {
    id: "nat-2",
    title: "National Bio-Entrepreneurship Competition (NBEC)",
    date: "2025-04-20",
    description: "E-YUVA fellows presented biotech startup ideas and competed for national recognition and seed funding.",
    image: "/demo/events/9.webp",
    type: "participated",
    tags: ["NBEC", "Competition", "Entrepreneurship"],
    venue: "Bengaluru",
    participants: 300,
  },
  {
    id: "nat-3",
    title: "India International Science Festival (IISF)",
    date: "2025-08-10",
    description: "Showcased research and innovation projects at India's premier science festival, engaging with scientists, policymakers, and industry leaders.",
    image: "/demo/events/10.webp",
    type: "participated",
    tags: ["IISF", "Science Festival", "National"],
    venue: "India",
    participants: 1000,
  },
];

// ── Lookup maps for dynamic routing ──

export const translationalCategoryMap: Record<string, { title: string; events: EventItem[]; description: string }> = {
  conferences: {
    title: "Conferences",
    description: "National and international conferences on biotechnology, healthcare, agriculture, and bioeconomy.",
    events: conferenceEvents,
  },
  workshops: {
    title: "Workshops",
    description: "Hands-on technical training, research methodology, and product development workshops.",
    events: workshopEvents,
  },
  hackathons: {
    title: "Hackathons",
    description: "Innovation challenges, product design competitions, and problem-solving events.",
    events: hackathonEvents,
  },
  webinars: {
    title: "Webinars",
    description: "Expert-led webinars featuring industry leaders, scientists, and entrepreneurs.",
    events: webinarEvents,
  },
  fdp: {
    title: "FDP Conducted",
    description: "Faculty Development Programs on bioinformatics, innovation, entrepreneurship, and emerging technologies.",
    events: fdpEvents,
  },
  "startup-bootcamps": {
    title: "Startup Bootcamps",
    description: "Intensive bootcamps for aspiring biotech entrepreneurs — from idea validation to market launch.",
    events: startupBootcampEvents,
  },
};

export const coeCategoryMap: Record<string, { title: string; events: EventItem[]; description: string }> = {
  "end-user-interaction": {
    title: "End User Interaction",
    description: "Farmer interactions, community need assessments, and stakeholder consultations.",
    events: coeEndUserEvents,
  },
  "site-visits": {
    title: "Site Visits",
    description: "Visits to rural communities, industry sites, and technology demonstration centres.",
    events: coeSiteVisitEvents,
  },
  "industry-exposure": {
    title: "Industry Exposure",
    description: "Industrial visits, startup ecosystem tours, manufacturing exposure, and product development immersion.",
    events: coeIndustryEvents,
  },
  "grassroot-innovation": {
    title: "Grassroot Innovation",
    description: "Local problem identification, indigenous technology documentation, innovation mapping, and community pilot testing.",
    events: coeGrassrootEvents,
  },
};

export const nationalOutreachMap: Record<string, { title: string; events: EventItem[]; description: string }> = {
  "all": {
    title: "National Outreach Events",
    description: "National-level events, meets, competitions, and festivals participated in by E-YUVA Center.",
    events: nationalOutreachEvents,
  },
};
