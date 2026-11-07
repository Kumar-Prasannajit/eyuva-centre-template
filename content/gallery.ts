// Gallery: one group per filter tab ("All" is automatic).
// Each group lists its photos — local paths in /public (e.g. "/gallery/lab/1.webp")
// or remote URLs from an allowed host (see next.config.ts).

import { EQUIPMENT_PHOTOS, EVENT_PHOTOS, LAB_PHOTOS } from "./images";

export const GALLERY_GROUPS: { category: string; label: string; images: string[] }[] = [
  { category: "Lab", label: "Lab", images: LAB_PHOTOS },
  { category: "Events", label: "Event", images: EVENT_PHOTOS.slice(0, 8) },
  { category: "Equipment", label: "Equipment", images: EQUIPMENT_PHOTOS },
];
