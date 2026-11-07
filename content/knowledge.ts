// ─────────────────────────────────────────────────────────────
//  KNOWLEDGE HUB — data behind /knowledge/[slug] pages:
//  startups, IP, MoUs, publications and awards.
//  DEMO entries only. Document links can be Google Drive links
//  or files in /public; use null when a document isn't available.
// ─────────────────────────────────────────────────────────────

import { SITE } from "./site";

const CENTRE_DEPT = `BIRAC E-YUVA Centre, ${SITE.department}, ${SITE.university}`;

export const STARTUPS_DATA = [
  {
    startupName: "Demo Biotech Private Limited",
    founders: ["Dr. Founder Name", "Mr. Co-founder Name"],
    yearOfInception: "2024",
    registrationNumber: "000000",
    cin: "U00000XX2024PTC000000",
    dpiitCertificateNumber: "DIPP000000",
    stateStartupCertificateNumber: "SSM/0000",
    incubationDetails: "University Incubation Centre",
    registeredAddress: `${SITE.university}, ${SITE.city}, ${SITE.state} – ${SITE.pincode}`,
    contactNumber: SITE.phone,
    productDetails:
      "Demo Biotech is an agri-biotech startup developing a microbial seed-coating formulation that improves germination and shelf life while reducing chemical fertiliser use. The prototype has completed lab validation and field trials are planned with partner farmer groups. Replace this paragraph with the startup's own product description.",
    links: {
      incorporationCertificate: null,
      dpiitCertificatePdf: null,
      dpiitCertificateJpeg: null,
      stateStartupCertificatePdf: null,
      stateStartupCertificateJpeg: null,
      incubationProof: null,
      externalFundProof1: null,
      externalFundProof2: null,
    },
  },
  {
    startupName: "Sample Nutrition Private Limited",
    founders: ["Dr. Founder Name"],
    yearOfInception: "2025",
    registrationNumber: "000001",
    cin: "U00000XX2025PTC000001",
    dpiitCertificateNumber: null,
    stateStartupCertificateNumber: null,
    incubationDetails: null,
    registeredAddress: `${SITE.university}, ${SITE.city}, ${SITE.state} – ${SITE.pincode}`,
    contactNumber: SITE.phone,
    productDetails:
      "Sample Nutrition develops easy-to-digest, nutrient-dense supplements from microalgae and millets for elderly and recovering patients. Replace this paragraph with the startup's own product description.",
    links: {
      incorporationCertificate: null,
      dpiitCertificatePdf: null,
      dpiitCertificateJpeg: null,
      stateStartupCertificatePdf: null,
      stateStartupCertificateJpeg: null,
      incubationProof: null,
      externalFundProof1: null,
      externalFundProof2: null,
    },
  },
];

// ipType must be one of: "Utility", "Design", "Copyright"
export const IP_DATA = [
  {
    title: "Self-regulating irrigation device for small farms",
    applicationNumber: "202500000001",
    filingDate: "15/01/2025",
    publicationDate: "14/02/2025",
    grantNumber: null,
    ipType: "Utility",
    status: "Published & Waiting for Examination Request",
    applicant: "Demo Biotech Private Limited",
    innovators: ["Student Innovator One", "Student Innovator Two", "Dr. Mentor Name"],
    links: { pdf: null, jpeg: null, certificate: null },
  },
  {
    title: "Portable sample-collection kit",
    applicationNumber: "000000-001",
    filingDate: "01/06/2025",
    publicationDate: "01/08/2025",
    grantNumber: "000000-001",
    ipType: "Design",
    status: "Granted",
    applicant: SITE.university,
    innovators: ["Innovation Fellow One", "Dr. Mentor Name"],
    links: { pdf: null, jpeg: null, certificate: null },
  },
  {
    title: "Lab equipment booking software",
    applicationNumber: "SW-00000/2025",
    filingDate: "10/09/2025",
    publicationDate: null,
    grantNumber: "SW-00000/2025",
    ipType: "Copyright",
    status: "Registered",
    applicant: SITE.university,
    innovators: ["Student Innovator One"],
    links: { pdf: null, jpeg: null, certificate: null },
  },
];

export const MOU_DATA = [
  {
    instituteName: "Partner Research Institute",
    departmentOrCenter: CENTRE_DEPT,
    dateOfSigningMou: "01/01/2025",
    expiryDate: "31/12/2027",
    links: { mouPdf: null, mouJpeg: null },
  },
  {
    instituteName: "Industry Partner One",
    departmentOrCenter: CENTRE_DEPT,
    dateOfSigningMou: "15/03/2025",
    expiryDate: "14/03/2028",
    links: { mouPdf: null, mouJpeg: null },
  },
];

// authorship: "Author" | "Co Author"
export const PUBLICATIONS_DATA = [
  {
    title: "Microbial pigments as low-cost bioimaging agents: a review",
    authorship: "Author",
    numberOfCoAuthors: 3,
    yearOfPublication: 2025,
    journalOrConferenceOrPublisher: "Journal of Applied Biotechnology",
    type: "International",
    volumeIssuePage: "Volume 10, pages 100–110",
    doi: "#",
    isbnOrIssn: "0000-0000",
    isPeerReviewed: true,
    impactFactor: 2.1,
    researchScore: 4.5,
    links: { paperPdf: null, paperJpeg: null },
  },
  {
    title: "Biochar-based removal of ammonia from aquaculture water",
    authorship: "Co Author",
    numberOfCoAuthors: 5,
    yearOfPublication: 2024,
    journalOrConferenceOrPublisher: "Environmental Biotechnology Letters",
    type: "International",
    volumeIssuePage: "Volume 8, pages 45–52",
    doi: "#",
    isbnOrIssn: "0000-0001",
    isPeerReviewed: true,
    impactFactor: 1.4,
    researchScore: 3.8,
    links: { paperPdf: null, paperJpeg: null },
  },
];

export const AWARDS_DATA = [
  {
    name: "National Bio-Entrepreneurship Competition (NBEC) Award",
    body: "C-CAMP & BIRAC, Govt. of India",
    recipient: "Demo Biotech Pvt. Ltd.",
    year: "2025",
    details: "Demo entry — replace with the centre's own awards and recognitions.",
  },
  {
    name: "State Youth Innovation Award",
    body: `Department of Science & Technology, Govt. of ${SITE.state}`,
    recipient: "E-YUVA Student Innovator Team",
    year: "2024",
    details: "Demo entry — awarded for prototype development of a sustainable packaging material.",
  },
];
