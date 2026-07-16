# Implementation Report — Word of Mouth rebuild

Date: 2026-07-15 (updated: real-agency content pass; QA/polish pass 2026-07-16; FULL
REDESIGN "The Campaign Wall" 2026-07-16 evening)

## Update — complete redesign: "The Campaign Wall" (2026-07-16)

The owner requested a ground-up UI/UX redesign (not a polish pass). The whole site is now
one continuous studio wall: carbon and cream acts joined by torn-paper seams, physical
paper/tape/stamp furniture, one red thread travelling the page, and the parrot as a living
character (ink flight sketches + the owner's streetwear portrait mockup, realized as the
new Character scene).

Architecture (12 sections → 9 scenes + footer): HeroPoster → ProofWall → IdeaScene(#about)
→ CharacterScene → ServiceCards(#services) → WorkBoards(#work) → FlightPlan(#process,
#regions) → InsightsJournal(#insights) → ContactScene(#contact) → SiteFooter. Deleted:
HeroScene, TrustStrip, NoiseScene, AboutScene, ServiceSystem, ConversationScene,
StoryBuildScene, MovementScene, ProcessRoute, RegionsScene, InsightsScene (content merged
or rebuilt). globals.css rewritten from scratch (~5,200 → ~2,500 lines, one generation).
Assets: 11 crops processed from /Assets via scripts/process-collage.mjs (sharp) into
public/collage (~640 KB total), integrated with blend modes (screen on carbon, multiply on
cream) so sketches sit in the wall rather than in rectangles. Caveat added via next/font
for handwritten wall notes. No runtime dependencies added; GSAP-only motion preserved with
full reduced-motion fallbacks.

Verified: npm run check (typecheck, lint, production build, 4/4 SSR tests), quote form
end-to-end through the real UI (201 + stored), mobile/tablet/desktop passes, wall menu,
keyboard/skip-link, clean console. Fixed during QA: header dark-handoff Set-tracking,
menu containing-block trap (backdrop-filter), intro-grid column placement, service-desk
underlay escape on mobile, footer knot specificity, board-CTA blend backdrop.

## Update — full-site QA and polish pass (2026-07-16)

Full desktop + mobile review of every route, then five surgical fixes:

- **Client logo wall restored to visibility.** All nine `public/clients/*.png` marks are
  pure white on transparent; the paper tiles + `mix-blend-mode: multiply` rendered the
  entire "Trusted by ambitious brands" strip empty. Tiles are now transparent on the
  carbon strip with a signal-red hover underline.
- **Hero conversion path restored.** The headline-only hero regained its lede, a
  "Start Your Project" primary CTA, a "See Our Work" secondary, and the scroll cue —
  wired into the existing intro timeline. On mobile the actions stack full-width and the
  secondary becomes a solid paper chip so it layers cleanly over the bottom-anchored mark
  (mark nudged to keep the parrot's head visible).
- **Process medallion off the copy.** The parrot roundel overlapped step-04 text on
  mobile and at mid desktop widths; it now perches at the route's terminus (bottom centre)
  on desktop and sits in flow at the end of the spine on mobile.
- **Region stamps.** Emoji flags render as bare letter pairs on Windows; replaced with
  designed mono country-code "postal stamps" (tilted, hover-straightening) — identical on
  every OS and native to the editorial system.
- **Case studies read tighter.** The template drops an overview that repeats the hero
  summary verbatim (and already dropped empty narrative fields).

Verified: quote form → `/api/quote` → local D1 end-to-end (201 + stored row); mobile menu;
skip link; `npm run check` (typecheck ✅ lint ✅ tests 4/4 ✅); console clean.

## Update — real agency content (second pass)

The owner supplied the real agency's material (`D:\WOM Website\New`) and the nine service
descriptions, and asked to remove anything not related to the marketing agency Word of Mouth.

- **Nine real services** replace the fictional four disciplines in the System scene; the
  diagram now routes one signal through nine numbered nodes, and each drawer carries the
  service's tagline and description.
- **Movement scene now shows real work** — KASBRA (website), ROYALLAB (social media),
  Zaneta (media production), Ezeefresh (branding) — cropped from the previous site's work
  screenshots and re-framed in the new editorial language (client header, mono caption).
- **New Scene 06 — The Company We Keep**: the agency's published figures (+11 years,
  +840 ongoing, +2,900 happy clients, +3,700 completed) count up on entry, above a wall of
  nine real client logos (EgyptAir, Mercedes-Benz, noon, TMG, Zaneta, RoyalLab, Marka,
  Healthy, Sea Star). Later scenes renumbered 08–10.
- **Real agency facts everywhere**: info@wordofmoutheg.com, +20 155 334 2722, WhatsApp
  chat link, the Cairo address, and Google Premier / Meta Marketing Partner badges in the
  contact scene, footer, and JSON-LD (with PostalAddress and all nine serviceTypes).
  Canonical domain, robots, and sitemap now default to `https://wordofmoutheg.com`; the
  metadata reads "Digital marketing agency in Cairo".
- **Removed fictional-studio content**: hello@wordofmouth.studio, "Independent brand
  studio" (now "Integrated marketing agency — Cairo"), wordofmouth.studio URLs, and the
  invented mock frames in the Movement scene. Production tests updated to assert the real
  email, positioning line, and domain — all passing.
- **Image serving fix**: the Worker has no `IMAGES`/`ASSETS` binding for the optimizer
  endpoint, so pre-optimized rasters are served directly (`unoptimized` on the raster
  `next/image` usages; all artwork was already hand-sized WebP/small PNGs).
- Screenshots not embedded (old dark-UI captures, blog cards, macaw photography) are
  documented with reasons in `ASSET_MANIFEST.md`; their facts were rebuilt natively.
- Social profile links were **not** added because the screenshots show icons without URLs —
  supply the Facebook/Instagram/YouTube/TikTok links and they can be added to the footer
  and JSON-LD `sameAs`.

Verification after the update: `npm run typecheck` ✅, `npm run lint` ✅, `npm test` ✅ 3/3,
browser QA at desktop/mobile (9-node system, pinned work travel, counters, logo wall,
contact channels, no horizontal overflow, images loading).

---

## Final creative direction

**From a signal to a movement.** The site is one continuous scroll story in nine scenes on
the preserved warm-paper editorial identity (paper surfaces, ink typography, Signal Red,
Geist + Geist Mono, sharp corners, hairline rules). A red signal — a dot on a drawn route —
is the connective signature: it draws the hero route, cuts through the market noise, becomes
an annotated story, routes the service system, flies the process path, and lands beside the
final invitation.

**Per owner instruction, all 3D parrot assets were skipped.** The parrot lives through
original creative visuals instead: the official vector mark (ghosted at editorial scale in
the hero, as a construction spread in Identity, on the feed tile in Movement) plus original
SVG artwork drawn for this build — feathers, wing arcs, a speech ring, and signal waves
(the brand kit's own "Level C symbolic parrot language").

Scenes: 01 Hero/Signal → 02 Noise → 03 Story → 04 Identity → 05 System → 06 Movement (dark)
→ 07 Process → 08 Impact → 09 Invitation + FAQ (dark) → footer.

## Files added

- `app/data/site.ts` — all copy/content data (services, process, outcomes, moments, FAQ,
  noise fragments, hero ticker words, contact links).
- `app/lib/motion.ts` — GSAP registration, shared media conditions, `useScene` hook
  (matchMedia-scoped, auto-reverting).
- `app/components/art/marks.tsx` — original SVG brand artwork: `ParrotMark` (official
  paths, four tones), `Feather`, `WingArc`, `SignalWave`, `SpeechRing`.
- `app/components/layout/SiteHeader.tsx` — sticky header, active-section indication,
  light/dark treatment over carbon scenes, accessible mobile menu (Escape/outside close).
- `app/components/layout/ScrollProgress.tsx` — signal-red page progress + global
  ScrollTrigger refresh on load/fonts-ready.
- `app/components/layout/SiteFooter.tsx`.
- `app/components/sections/` — `HeroScene`, `NoiseScene`, `StoryScene`, `ServiceSystem`,
  `MovementScene`, `ClientsScene`, `ProcessRoute`, `ImpactScene`, `ContactScene`.
- `docs/IMPLEMENTATION_PLAN.md`, `ASSET_MANIFEST.md`, `MOTION_SYSTEM.md`, this report.
- `.claude/launch.json` — dev-server launch config for preview.
- `public/brand/word-of-mouth-logo-red.svg`, `public/brand/word-of-mouth-social-avatar.png`
  (copied from the asset folder).

## Files changed

- `app/page.tsx` — now composes the nine scenes; JSON-LD, skip link, and required copy
  preserved.
- `app/globals.css` — complete design-system rewrite (tokens, type scale, header, all nine
  scenes, footer, responsive recomposition, reduced-motion rules). `.not-found` styles kept.
- `README.md` — updated for the new experience.

Unchanged: `app/layout.tsx` (metadata/fonts/canonical logic), `app/not-found.tsx`,
`app/robots.ts`, `app/sitemap.ts`, `worker/index.ts`, `tests/rendered-html.test.mjs`,
build config.

## Dependencies added

- `gsap` (ScrollTrigger + MotionPathPlugin, both from the core package). Nothing else.
  No three.js, no framer-motion (both remain forbidden by the production tests).

## Assets used / excluded

See `ASSET_MANIFEST.md`. Highlights: official logos + symbol + social avatar used; the
entire `05-parrot-3d` pipeline excluded per owner instruction; duplicate logo lockups,
palette raster, archives excluded with reasons.

## Main animations

Documented per scene in `MOTION_SYSTEM.md`: hero intro timeline + parallax exit + pointer
depth; pinned noise field with three parallax depths and the signal line resolving one true
idea; unfolding story panels and annotated statement; clip-path identity frames; sticky
system diagram driven by an accessible accordion; pinned horizontal movement track with
inner counter-parallax; MotionPath process route; scrubbed impact display type; wing-arc
invitation with a landing signal dot; global scroll progress.

## Responsive decisions

- Mobile (≤767px) is recomposed, not shrunk: hero mark anchors bottom-right under the copy;
  signal route hidden; noise loses its pin and becomes two drifting rows; movement becomes a
  native scroll-snap swipe row; process route becomes a filling left spine; identity and
  story stack single-column; menu becomes a toggle panel with 44px targets.
- Tablet (768–1023px) stacks system/identity/impact/faq layouts and tightens the header.
- Verified at 375, 430 (mobile preset), 768, 1024, 1440, 1920.

## Accessibility work

- Semantic sections with labels, correct heading order (one h1), skip-to-content link
  (first tab stop, verified).
- Real `<button>` accordion with `aria-expanded`/`aria-controls`; drawer uses
  `grid-template-rows` + `visibility` so closed content leaves the a11y tree and tab order.
- Native `<details>` FAQ; keyboard-operable menu with Escape and outside-click close.
- All decorative SVG/art `aria-hidden`; meaningful mark carries a `<title>`.
- Visible 3px signal focus outline on every interactive element.
- Full reduced-motion experience: GSAP `reduced` context renders final readable states (no
  pins, no scrubs, routes pre-drawn), CSS disables transitions/animations and smooth scroll.
- No information exists only in motion; horizontal movement viewport is focusable with a
  group label.

## Performance optimizations

- Transform/opacity-only animation; SVG stroke drawing for line work; no filters beyond one
  1.5px blur on scattered noise chips.
- No WebGL, no video, no heavy rasters: the only bitmaps are the 44px social avatar
  (`next/image`) and the existing OG image. All artwork is inline SVG.
- GSAP contexts fully cleaned up; `matchMedia` reverts on breakpoint flips;
  `invalidateOnRefresh` on the pinned horizontal scene; ScrollTrigger refresh after fonts.
- `content: clip` overflow discipline — document width equals viewport width (verified),
  zero horizontal overflow and no CLS from animation (reveals use transforms, not layout).

## Commands executed and results

| Command | Result |
|---|---|
| `npm install` (adding `gsap`) | ✅ 0 vulnerabilities |
| `npm run typecheck` | ✅ clean |
| `npm run lint` | ✅ clean (one `react-hooks/refs` issue found and fixed during build) |
| `npm test` (production Worker build + SSR tests) | ✅ 3/3 pass — homepage SSR + SEO surface, no-3D-parrot guard, robots/sitemap |
| Dev server + browser QA | ✅ all nine scenes, pins, accordion/diagram sync, mobile menu, progress bar, keyboard focus verified; no console errors from current code (one stale HMR error observed mid-session before reload, not reproducible on the final build) |

## Known limitations

- Reduced-motion behavior is implemented via `gsap.matchMedia` + CSS and verified by code
  path review; the embedded browser could not emulate `prefers-reduced-motion` directly.
- The wordmark SVGs still carry the legacy "Digital Marketing Solution" descriptor baked
  into the supplied files; the brand kit recommends retiring it, but rebuilding the logo was
  out of scope (the kit forbids approximate-font reconstructions).
- No real client/project imagery exists in the asset folder, so the Movement scene shows the
  identity traveling through art-directed brand surfaces (site, feed, film, deck) rather
  than case studies — no fake clients or metrics were invented.
