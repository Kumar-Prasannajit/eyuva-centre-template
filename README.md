# E-YUVA Centre Website Template

A ready-made website for BIRAC E-YUVA Centres: home page with hero, about and impact dashboard, people and fellows, programs and events, lab booking, gallery, partners, and knowledge-hub pages (startups, IP, MoUs, publications, awards).

Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Light and dark themes are built in.

## Customising for a new centre

All centre-specific content lives in **`/content`**. The components never need editing for a normal rollout.

| File | What it holds |
| --- | --- |
| `content/site.ts` | Centre and university name, city, state, contacts, logo, hero and about text, SEO, footer |
| `content/about.ts` | Focus-area capsules and the impact numbers |
| `content/people.ts` | University leadership, BIRAC/BioNEST contacts, centre team, Innovation Fellows, E-YUVA fellow projects |
| `content/events.ts` | Conferences, workshops, hackathons, webinars, FDPs, bootcamps, community and national outreach |
| `content/knowledge.ts` | Startups, patents/IP, MoUs, publications, awards |
| `content/partners.ts` | Knowledge, industry and academic partners and supported institutes |
| `content/gallery.ts` | Gallery tabs and their photos |
| `content/images.ts` | Demo stock photo URLs |

### Images

The demo uses free Unsplash stock photos (listed in `content/images.ts`) plus placeholder avatars and logos in `public/demo/`. For a real centre, add photos under `public/` (for example `public/people/vice-chancellor.webp`) and point to them from the content files. Gallery photos are listed per tab in `content/gallery.ts`.

Recommended: WebP, people photos 3:4 portrait, everything else landscape around 1200px wide.

### Rollout checklist

1. Edit `content/site.ts` (name, location, contacts, logo).
2. Replace people, events, partners and knowledge data.
3. Add photos and update the gallery lists.
4. `npm run build` to check for errors.
5. Deploy (Vercel or any Node host) and connect the centre's domain.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
