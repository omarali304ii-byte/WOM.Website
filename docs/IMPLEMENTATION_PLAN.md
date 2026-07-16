# Word of Mouth — Rebuild Implementation Plan

Date: 2026-07-15 · Owner instruction: **no 3D parrot assets** — the parrot lives through
custom-designed brand visuals only (official symbol + original SVG feather / signal / wing-arc artwork).

## Creative direction

**From a signal to a movement.** One red signal — a dot on a drawn route — is the protagonist
of the page. It appears in the quiet editorial hero, survives the noise of the market, becomes a
story, a connected system, then movement, proof, process, impact, and finally an invitation.
The parrot appears with restraint as the *messenger*: the official vector mark at editorial scale,
plus original feather and wing-arc SVG artwork designed for this build (brand kit "Level C —
symbolic parrot language").

Identity locked by the brief: warm paper surfaces, ink typography, Signal Red accents, Geist +
Geist Mono, sharp corners, editorial grids, minimal graphic lines.

## Scenes (one continuous story)

1. **Hero / The Signal** — quiet paper page; red signal draws a route; masked headline reveal
   ("Make your brand the one people *talk about*."); parrot mark emerges from the paper; CTAs,
   scroll cue, parallax layers, pointer-reactive depth.
2. **The Noise** — layered market messages drifting at different scroll speeds; the signal line
   cuts through and isolates one true idea.
3. **The Story** — unfolding paper panels; the signal becomes a position (editorial annotations).
4. **The System** — Strategy / Identity / Digital / Motion as one interactive expanding system
   (accessible accordion drawers that recompose the composition), not four cards.
5. **The Movement** — horizontal travel inside vertical scroll: the identity moving through
   touchpoints (site, feed, film, deck) as art-directed frames built from brand material.
6. **The Company We Keep** — published results and client marks presented as proof of the work.
7. **The Process** — Listen → Define → Design → Activate along a drawn SVG route; the red signal
   travels through each stage (scroll-scrubbed path drawing).
8. **The Impact** — Clarity / Distinction / Momentum at display scale with scale/mask transitions.
9. **The Invitation** — the signal returns as a calm final composition; contact as the story's
   last scene, wing-arc artwork settling; footer.

## Technical

- Stack unchanged: vinext + React 19 + Tailwind base + custom CSS design system. Add **gsap** only.
- Server components by default; each animated scene is an isolated `"use client"` component.
- `gsap.matchMedia()` gates: `(prefers-reduced-motion: reduce)` → final readable states, no pins,
  no scrub; `(max-width: 767px)` → recomposed scenes, shorter pins, no fragile horizontal scroll.
- All animation transform/opacity-only; contexts cleaned up in effect teardown.
- Tests must keep passing: no three.js / framer-motion; no "Canvas"/"parrot.glb" strings in HTML;
  preserve title, hero line, "Independent brand studio", email, JSON-LD, robots/sitemap.

## Component architecture

```
app/
  components/layout/   SiteHeader, SiteFooter, ScrollProgress
  components/art/      ParrotMark, Feather, SignalWave, WingArc, SpeechRing (pure SVG, server)
  components/sections/ HeroScene, NoiseScene, StoryScene, ServiceSystem, MovementScene,
                       ClientsScene, ProcessRoute, ImpactScene, ContactScene
  data/site.ts         services, process, faq, outcomes, copy
  lib/motion.ts        gsap registration + shared helpers
```

## Verification

`npm install` → `npm run typecheck` → `npm run lint` → `npm test`, then dev-server visual QA at
375 / 430 / 768 / 1024 / 1440 / 1920, reduced motion, keyboard nav, console, overflow.
