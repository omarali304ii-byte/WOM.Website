# Word of Mouth website

Production website for Word of Mouth, an independent brand studio. The homepage is a
scroll-driven brand story in nine scenes — *from a signal to a movement* — built on the
studio's warm-paper editorial identity with a traveling red signal as its motion signature.

## Stack

- TypeScript, React 19, Next.js App Router-compatible Vinext runtime
- GSAP (ScrollTrigger + MotionPath) in isolated client components
- Tailwind base + a hand-written design system (`app/globals.css`)
- Cloudflare Workers through Sites

## Structure

```
app/
  components/
    layout/    SiteHeader, SiteFooter, ScrollProgress
    art/       Original SVG brand artwork (ParrotMark, Feather, WingArc, …)
    sections/  The nine scroll scenes (Hero → Noise → Story → System → Movement →
               Clients → Process → Impact → Invitation)
  data/site.ts   All copy and content data
  lib/motion.ts  GSAP setup + matchMedia-scoped useScene hook
```

Docs: `MOTION_SYSTEM.md` (every scene's choreography, mobile and reduced-motion variants),
`ASSET_MANIFEST.md` (full asset inventory), `IMPLEMENTATION_REPORT.md`.

## Local development

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` creates the production Worker build, server-renders the public routes, checks the
SEO surface, and confirms that the retired 3D parrot implementation is not shipped.

Set `NEXT_PUBLIC_SITE_URL` to the final public origin if it differs from
`https://wordofmouth.studio` so `robots.txt` and `sitemap.xml` use the correct canonical
domain.
