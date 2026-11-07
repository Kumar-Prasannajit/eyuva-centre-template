// Gallery: each group is a folder of numbered photos in /public.
// e.g. folder "/demo/gallery/lab" with count 6 → /demo/gallery/lab/1.webp … 6.webp
// Add a group to add a filter tab; the "All" tab is automatic.

export const GALLERY_GROUPS = [
  { category: "Lab", label: "Lab", folder: "/demo/gallery/lab", count: 6 },
  { category: "Events", label: "Event", folder: "/demo/gallery/events", count: 8 },
  { category: "Equipment", label: "Equipment", folder: "/demo/gallery/equipment", count: 4 },
];
