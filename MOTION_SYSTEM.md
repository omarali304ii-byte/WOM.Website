# Motion System — Word of Mouth

One motion language for the whole site: **the signal travels**. A red dot on a drawn route is
the recurring protagonist; every scene animates transform/opacity (plus SVG stroke drawing)
only. All choreography lives in isolated `"use client"` components built on
`useScene` (`app/lib/motion.ts`), which wraps `gsap.matchMedia` with three shared conditions:

- `desktop` — `(min-width: 768px) and (prefers-reduced-motion: no-preference)`
- `mobile` — `(max-width: 767px) and (prefers-reduced-motion: no-preference)`
- `reduced` — `(prefers-reduced-motion: reduce)`

Everything a scene creates is reverted automatically when conditions flip or the component
unmounts, so no tweens, ScrollTriggers, or listeners leak. `ScrollProgress` re-runs
`ScrollTrigger.refresh()` after `window.load` and `document.fonts.ready` so pinned
measurements stay correct.

Global easing tokens: `--ease-out: cubic-bezier(0.22,1,0.36,1)`, `--ease-in-out:
cubic-bezier(0.65,0,0.35,1)`. Micro-interactions 150–250 ms, component transitions
250–460 ms, editorial reveals 500–900 ms, cinematic scenes scroll-controlled.

---

## Scene 01 — Hero / The Signal (`HeroScene`)

- **Trigger:** page load (intro timeline) + scroll scrub for exit.
- **Duration:** intro ≈ 1.9 s; exit scrub spans hero height (unpinned).
- **Pinned:** no.
- **Layers:** signal route SVG (stroke draw + dot pop), masked headline lines (staggered
  y-reveal), red ellipse annotation around "talk about." (stroke draw), lede/actions/eyebrow
  fades, ghosted parrot mark rise, three feathers, scroll cue, ticker strip.
- **Parallax speeds (scrub):** mark −14% y (slow background), copy −8% y with fade,
  feathers +60/+90/+150 px at different rotations (foreground), ticker −18% x.
- **Pointer:** desktop-only quickTo depth — mark ±18 px, feathers ±26 px.
- **Mobile:** same intro shortened by layout (route + third feather hidden), mark anchored
  bottom-right at 78vw, parallax reduced (−6% mark).
- **Reduced motion:** no intro, no scrub, no pointer; route pre-drawn via
  `strokeDashoffset: 0`; everything rendered in final state; cue-dot CSS animation disabled.

## Scene 02 — The Noise (`NoiseScene`)

- **Trigger:** a small preview begins as the scene enters at 96% of the viewport; the full pinned
  animation starts when `.noise-stage` reaches the top.
- **Duration:** short entry scrub until the scene reaches the top; full sequence remains pinned for
  +170% viewport height with scrub 0.7.
- **Pinned:** yes (desktop only).
- **Layers:** three depth fields of market chips become partially visible during entry, then finish
  their original reveal as the masked headline enters and keep drifting −60/−130/−210 px),
  masked headline, red signal line (stroke draw at 45% progress), chip scatter-to-blur, keeper chip
  scale-up 1.12, outro copy reveal.
- **Mobile:** no pin. Two chip rows drift horizontally (±16/12% scrub across the section),
  headline mask reveal on enter, line draws when outro enters, outro fades up.
- **Reduced motion:** chips at 28–30% opacity in final scattered state, line pre-drawn,
  keeper and copy fully visible.

## Scene 03 — The Story (`StoryScene`)

- **Trigger:** per-element `start: "top 72–80%"`, play-once reveals.
- **Duration:** 0.5–0.9 s per group.
- **Pinned:** no.
- **Layers:** intro copy stagger; statement words rise from line masks (0.05 stagger); red
  working underlines draw; margin annotations fade in; three "moments" panels unfold from
  their top edge (rotationX −58° → 0, perspective 1200); signal-wave ornament drifts −30% y
  on scrub.
- **Mobile:** panels slide up (+40 px) instead of 3D unfolding; wave and third note hidden.
- **Reduced motion:** underlines pre-drawn; all text and panels static in final state.

## Scene 04 — The System (`ServiceSystem`)

- **Trigger:** `start: "top 78–80%"` reveals; interaction-driven afterwards.
- **Duration:** reveals 0.7–0.9 s; accordion 460 ms; diagram highlight 400 ms.
- **Pinned:** left diagram is `position: sticky` while the accordion scrolls (desktop).
- **Layers:** intro stagger, accordion items rise, diagram scale/fade in. Opening a
  discipline is the main interaction: CSS `grid-template-rows 0fr→1fr` drawer (accessible,
  no layout thrash), plus the SVG diagram routing the signal to the active node (stroke and
  fill transitions).
- **Mobile:** diagram stacks above the accordion, not sticky.
- **Reduced motion:** no reveals; accordion switches instantly (transition removed);
  diagram highlight still updates (state, not motion).

## Scene 05 — The Movement (`MovementScene`) — selected real work

- **Trigger:** `.movement-stage` top hits viewport top.
- **Duration:** pin length = horizontal track overflow + 20vh, scrub 0.6,
  `invalidateOnRefresh` for resize safety.
- **Pinned:** yes (desktop only).
- **Layers:** vertical scroll drives the four work frames horizontally (`x: -distance`) —
  real projects (KASBRA / Website, ROYALLAB / Social media, Zaneta / Media production,
  Ezeefresh / Branding) framed with client-name headers and mono captions; red progress
  underline scales with travel; each frame's image counter-drifts ±5%
  (`containerAnimation` inner parallax); intro copy reveals before the pin.
- **Mobile:** no pin — native `overflow-x` scroll-snap row (touch-friendly), frames fade up
  on enter.
- **Reduced motion:** frames remain a swipeable/scrollable row with no animation.

## Scene 06 — The Company We Keep (`ClientsScene`)

- **Trigger:** per-group `start: "top 80–85%"`, play-once.
- **Duration:** intro 0.8 s; counters 1.6 s; logo stagger 0.06 s each.
- **Pinned:** no.
- **Layers:** intro reveal; the agency's published figures count up from zero
  (GSAP counter objects with integer snap, `tabular-nums` so nothing shifts); nine client
  logos rise into a bordered wall; hover lifts each logo to full opacity with a signal-red
  border.
- **Mobile:** stats 2×2, logo wall 3 columns; same reveals.
- **Reduced motion:** counters render their final numbers server-side (the animation only
  ever runs on top of real markup), logos static.

## Scene 07 — The Process (`ProcessRoute`)

- **Trigger:** route scrub `.process-map` `top 65%` → `bottom 60%`.
- **Duration:** scrub 0.5 across the whole map; step reveals 0.75 s each.
- **Pinned:** no.
- **Layers:** dashed ghost route (static), red route drawing via dash offset, signal dot
  flying the path with `MotionPathPlugin` (auto-rotate off, aligned to path), four stages
  fading up as the dot passes.
- **Mobile:** SVG route hidden; a left spine fills top-to-bottom (`scaleY` scrub) beside
  stacked steps.
- **Reduced motion:** route fully drawn, all steps visible, dot rests at start.

## Scene 08 — The Impact (`ImpactScene`)

- **Trigger:** per-block scrub `top 80%` → `top 30%` (desktop) / `top 55%` (mobile).
- **Duration:** scroll-controlled.
- **Pinned:** no.
- **Layers:** display words (Clarity / Distinction / Momentum) settle from
  yPercent 40 / scale 1.15 / 15% opacity to rest; red periods ride along; detail column
  (heading, copy, before→after chips) staggers in.
- **Mobile:** same scrub with smaller scale delta (1.04) and shorter range.
- **Reduced motion:** words and details static at final scale.

## Scene 09 — The Invitation (`ContactScene`)

- **Trigger:** FAQ `top 80%`; invitation timeline `top 72%`; landing-dot scrub
  `top 70%` → `top 30%`.
- **Duration:** wing arcs 1.1 s staggered draw; headline masks 0.8 s; details 0.5–0.6 s.
- **Pinned:** no.
- **Layers:** FAQ items rise; wing arcs draw and their dot pops (the signal landing);
  masked headline; red landing dot descends 160 px on scrub and settles beside "saying?";
  feather drifts −70 px on scrub; native `<details>` FAQ with animated plus markers.
- **Mobile:** arc moved off-edge at 45% opacity; feather hidden; no landing-dot scrub.
- **Reduced motion:** arcs pre-drawn, all content static and readable.

## Global

- **Scroll progress:** fixed 2px signal-red line under the header; `ScrollTrigger`
  `onUpdate` sets `scaleX` deterministically (no scrub lag, correct after resize).
- **Header:** background/blur after 24 px scroll; light-on-dark treatment while overlapping
  `[data-header-dark]` sections (IntersectionObserver); active-section underline via
  IntersectionObserver; CSS-only transitions.
- **Reduced motion global:** CSS kills all animations/transitions (10 ms), smooth scrolling
  disabled, GSAP `reduced` context renders final states — the full narrative reads top to
  bottom with zero required motion.
