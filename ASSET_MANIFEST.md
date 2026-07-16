# Asset Manifest — Word of Mouth website

Complete inventory of every asset discovered in `D:\WOM Website`, what was used, and why
anything was excluded.

**Owner instruction (2026-07-15):** skip everything related to the 3D parrot and use original
creative visuals instead. All 3D-derived assets below are therefore documented as intentionally
excluded, and the parrot lives in the site through the official vector mark plus original SVG
artwork drawn for this build (`app/components/art/marks.tsx`: ParrotMark, Feather, WingArc,
SignalWave, SpeechRing).

## Used assets

| Original path | Project path | Type | Used in | Optimized |
|---|---|---|---|---|
| `word-of-mouth-logo-black.svg` | `public/brand/word-of-mouth-logo-black.svg` | Logo (SVG) | Header (light sections) | No — already lean vector |
| `word-of-mouth-logo-white.svg` | `public/brand/word-of-mouth-logo-white.svg` | Logo (SVG) | Header (dark sections), footer | No |
| `word-of-mouth-logo-red.svg` | `public/brand/word-of-mouth-logo-red.svg` | Logo (SVG) | Staged for future red-accent placements (not currently rendered) | No |
| `word-of-mouth-favicon.svg` | `public/brand/word-of-mouth-favicon.svg` | Favicon (SVG) | Site icon metadata | No |
| `word-of-mouth-symbol.svg` | `public/brand/word-of-mouth-symbol.svg` + inlined paths in `app/components/art/marks.tsx` | Brand symbol (SVG) | Hero background mark, Identity construction frame, Movement feed tile | Inlined without the white plate so it sits on any surface |
| `word-of-mouth-social-avatar.png` | `public/brand/word-of-mouth-social-avatar.png` | Social avatar (PNG) | Movement scene — feed frame avatar (44px display) | Served via `next/image` at display size |
| `brand-tokens.css` / `brand-tokens.json` | Values folded into `app/globals.css` tokens | Design tokens | Whole design system (easing, radii discipline, palette cross-check) | n/a |
| `1-Website-Narrative-and-Experience-Story.md` | Content source only | Brand doc | Scene naming, narrative arc, copy guardrails | n/a |
| `2-Brand-Identity-Kit.md` | Content source only | Brand doc | Motion principles, symbolic parrot language (Level C), typography rules | n/a |
| `3-Website-Master-Build-Plan.md` | Content source only | Brand doc | Confirmed the no-3D web direction and performance budget intent | n/a |
| `Website-Purpose-and-Positioning.md` | Content source only | Brand doc | Positioning and conversion hierarchy | n/a |
| Existing `public/og.png` | `public/og.png` | Open Graph image | Social sharing metadata | Kept as-is |

## `D:\WOM Website\New` (added 2026-07-15, second pass)

Material from the real Word of Mouth agency site (wordofmoutheg.com): client logos and
screenshots of the previous website.

### Used

| Original path | Project path | Type | Used in | Optimized |
|---|---|---|---|---|
| `New/2-150x150.png` | `public/clients/egyptair.png` | Client logo (white PNG) | Clients scene logo wall | Already tiny (≤3.5 KB each) |
| `New/5-150x150.png` | `public/clients/marka.png` | Client logo | Clients scene | No |
| `New/7-150x150.png` | `public/clients/healthy.png` | Client logo | Clients scene | No |
| `New/10-150x150.png` | `public/clients/zaneta.png` | Client logo | Clients scene | No |
| `New/11-150x150.png` | `public/clients/royallab.png` | Client logo | Clients scene | No |
| `New/12-150x150.png` | `public/clients/mercedes-benz.png` | Client logo | Clients scene | No |
| `New/13-150x150.png` | `public/clients/noon.png` | Client logo | Clients scene | No |
| `New/14-150x150.png` | `public/clients/tmg.png` | Client logo | Clients scene | No |
| `New/17-150x150.png` | `public/clients/sea-star.png` | Client logo | Clients scene | No |
| `Screenshot …164138.png` (work grid) | `public/projects/ezeefresh-branding.webp`, `public/projects/kasbra-website.webp` | Project visuals | Movement scene work frames | Cropped to the project tiles, WebP q86 (14–16 KB) |
| `Screenshot …164145.png` (work grid) | `public/projects/royallab-social.webp`, `public/projects/zaneta-media.webp` | Project visuals | Movement scene work frames | Cropped, WebP q86 (22–30 KB) |
| `Screenshot …164119.png` (stats) | Numbers transcribed, not embedded | Published figures | Clients scene counters (+11 / +840 / +2,900 / +3,700) | n/a |
| `Screenshot …164211.png` (contact) | Facts transcribed, not embedded | Contact details | Contact scene, footer, JSON-LD (email, phone, WhatsApp, address) | n/a |
| `Screenshot …164219.png` (footer) | Facts transcribed, not embedded | Partner status | Footer badges (Google Premier Partner, Meta Marketing Partner) | n/a |

### Excluded

| Original path | Reason |
|---|---|
| `Screenshot …164044.png` (about hero, macaw photo) | Photographic parrot clashes with the site's vector parrot language; copy ("digital experience that inspire") superseded by the new narrative. |
| `Screenshot …164119.png` / `164211.png` / `164219.png` as images | Screenshots of the old dark UI; their *facts* were adopted and rebuilt natively in the new design instead of embedding raster UI. |
| `Screenshot …164125.png` ("Our Work" heading) | Section heading only, no reusable content. |
| `Screenshot …164152.png` (process, parrot photos) | The Listen→Define→Design→Activate process route already covers this; photographic parrots excluded per the visual direction. |
| `Screenshot …164200.png` (blog cards) | The one-page site has no blog; embedding blog-card screenshots would create dead links. |

## Excluded assets (each with reason)

| Original path | Type | Reason excluded |
|---|---|---|
| `05-parrot-3d/**` (all Blender sources, `WOM_Parrot_Web_Test.glb`, render stills, 120 validation frames, `phase5b-rig-validation.mp4`, scripts, reports) | 3D parrot pipeline | **Owner instruction: skip anything related to the 3D parrot.** Also: production tests explicitly forbid shipping a 3D parrot implementation, and the validation frames are near-identical rig poses (~21 MB) unsuitable for a scroll sequence. |
| `word-of-mouth-logo-horizontal.svg` / `word-of-mouth-logo-stacked.svg` | Logo variants | Duplicate lockups of the same wordmark carrying the retired "Digital Marketing Solution" descriptor in additional arrangements; the black/white/red horizontal set already covers all site placements. |
| `Word-of-Mouth-Color-Palette.png` | Palette raster | The palette is already encoded in the site's design tokens; shipping a raster duplicate adds weight without value. |
| `Word-of-Mouth-Logo-Usage-Guide.pdf` / `.md` | Guidelines | Reference documentation, not a web asset. |
| `word-of-mouth-parrot-project.zip` | Archive | Stale snapshot of this same repository (superseded by the working tree). |
| `outputs/word-of-mouth-site.tgz` | Archive | Previous build artifact, not a source asset. |
| `05-parrot-3d/scripts/.vendor/**` (imageio-ffmpeg) | Tooling | Vendored render tooling, not a brand asset. |
| `.claude/`, `.wrangler/`, `.openai/` configs | Tooling | Environment configuration, not assets. |

No discovered file was ignored silently; everything above is accounted for.
