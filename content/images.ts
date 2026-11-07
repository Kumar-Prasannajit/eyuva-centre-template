// Stock photos used by the demo (Unsplash, free under the Unsplash License).
// For a real centre, replace these with the centre's own photos in /public
// (e.g. "/gallery/lab/1.webp") — any local path or allowed remote URL works.

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEMO_PHOTOS = {
  // About section collage
  aboutLab: unsplash("1562789233-495f52b583dd", 1200),
  aboutMicroscope: unsplash("1518152006812-edab29b069ac", 1000),
  aboutTeam: unsplash("1631556759511-6ce895fbf0ad", 1000),

  // Impact dashboard / knowledge banners
  campus: unsplash("1592066575517-58df903152f2"),
  students: unsplash("1758270705290-62b6294dd044"),
  startup: unsplash("1557734864-c78b6dfef1b1"),
  grants: unsplash("1565350897149-38dfafa81d83"),
  patent: unsplash("1602052577122-f73b9710adba"),
  publication: unsplash("1758685734180-7a2f63f0e41d"),
  women: unsplash("1614935151651-0bea6508db6b"),
  award: unsplash("1578269174936-2709b6aeb913"),
  collabs: unsplash("1600880292089-90a7e086ee0c"),

  // Fellow project cards
  project1: unsplash("1631557676757-fcc7b1160be8", 1000),
  project2: unsplash("1581093577421-f561a654a353", 1000),
  project3: unsplash("1532187863486-abf9dbad1b69", 1000),
};

// Event photos: talks, workshops, conferences
export const EVENT_PHOTOS = [
  unsplash("1587825140708-dfaf72ae4b04"),
  unsplash("1758270704587-43339a801396"),
  unsplash("1770777845282-f6f423f2513d"),
  unsplash("1758270704286-83476deb3bd1"),
  unsplash("1582192730841-2a682d7375f9"),
  unsplash("1540575467063-178a50c2df87"),
  unsplash("1544531586-fde5298cdd40"),
  unsplash("1558008258-3256797b43f3"),
  unsplash("1531058020387-3be344556be6"),
  unsplash("1775314054195-85f31de0c944"),
];

export const LAB_PHOTOS = [
  unsplash("1614935151651-0bea6508db6b"),
  unsplash("1582560475093-ba66accbc424"),
  unsplash("1760074032600-36943c264fbf"),
  unsplash("1758685848587-7bc7487b6e85"),
  unsplash("1624957485560-47747511b32f"),
  unsplash("1582719471384-894fbb16e074"),
];

export const EQUIPMENT_PHOTOS = [
  unsplash("1518152006812-edab29b069ac"),
  unsplash("1614308459036-779d0dfe51ff"),
  unsplash("1602052577122-f73b9710adba"),
  unsplash("1639772823907-a716be4bdecc"),
];
