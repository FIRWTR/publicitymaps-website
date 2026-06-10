# PublicityMaps website - notes & deploy

Marketing/product site for **PublicityMaps** (a FIRWTR project): sells local "visibility heat map" reports for small businesses. Interactive Leaflet map demo of Clark County WA, plus pricing/analyze/checkout/example-report pages.

- **Repo:** github.com/FIRWTR/publicitymaps-website (branch `master`)
- **Host:** Vercel, project `publicitymaps`
- **Account:** firwtroffice@gmail.com

## Stack
- Next.js 16 (App Router), React 19, Tailwind 4, TypeScript.
- Maps: leaflet + leaflet.heat + react-leaflet. Animations: framer-motion.
- Server-rendered (no static export) -> deployed on Vercel, not Cloudflare Pages.

## Where to edit
- Pages: `src/app/<route>/page.tsx` (home is `src/app/page.tsx`; routes: about, pricing, contact, analyze, checkout, example-report, terms, privacy).
- Page sections / UI: `src/components/` (e.g. `HeroMapSection.tsx`, `PricingSection.tsx`, `AnalyzeMap.tsx`).
- Map seed data: `src/data/heroLocations.ts`. Global styles: `src/app/globals.css`.

## Local dev
```
cd /home/firwtr/publicitymaps
npm install        # first time only
npm run dev        # http://localhost:3000
```

## Deploy
```
cd /home/firwtr/publicitymaps
vercel --prod      # via Vercel CLI (project is linked in .vercel/)
```
Or push to the Vercel-connected git repo and Vercel builds it.

## Backup
```
git -c credential.helper='!gh auth git-credential' push
```

## Notes
- node_modules, .next, .vercel are gitignored (regenerated / linked locally).
- Belongs to FIRWTR's wider system; see the workspace `MEMORY.md` at /home/firwtr/.openclaw/workspace for the full project map.
