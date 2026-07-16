/**
 * One-off collage asset pipeline: crops the raw art in /Assets into tight,
 * levelled WebPs under public/collage/.
 *
 * Dark-background sketches get their blacks crushed to true black so
 * `mix-blend-mode: screen` melts them into carbon scenes; light-background
 * sketches get their paper lifted to true white so `multiply` melts them
 * into cream scenes. Run: node scripts/process-collage.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd());
const SRC = path.join(ROOT, "Assets");
const OUT = path.join(ROOT, "public", "collage");

/** crop values are fractions of the source width/height */
const JOBS = [
  {
    src: "ChatGPT Image Jul 16, 2026, 04_12_23 PM.png",
    out: "parrot-streetwear.webp",
    crop: { left: 0.2, top: 0.05, width: 0.53, height: 0.93 },
    width: 860,
    mode: "none",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_12_17 PM.png",
    out: "parrot-badge.webp",
    crop: { left: 0.14, top: 0.12, width: 0.72, height: 0.76 },
    width: 560,
    mode: "light",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_13_07 PM.png",
    out: "card-voice.webp",
    crop: { left: 0.13, top: 0.1, width: 0.75, height: 0.82 },
    width: 640,
    mode: "none",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_13_12 PM.png",
    out: "card-focus.webp",
    crop: { left: 0.1, top: 0.09, width: 0.78, height: 0.84 },
    width: 640,
    mode: "none",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_13_17 PM.png",
    out: "paper-plane.webp",
    crop: { left: 0.33, top: 0.22, width: 0.34, height: 0.4 },
    width: 520,
    mode: "dark",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_13_22 PM.png",
    out: "megaphone.webp",
    crop: { left: 0.16, top: 0.26, width: 0.36, height: 0.58 },
    width: 560,
    mode: "dark",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_13_27 PM.png",
    out: "parrot-ink-a.webp",
    crop: { left: 0.28, top: 0.28, width: 0.44, height: 0.42 },
    width: 560,
    mode: "dark",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_13_43 PM.png",
    out: "parrot-ink-b.webp",
    crop: { left: 0.28, top: 0.24, width: 0.46, height: 0.48 },
    width: 560,
    mode: "dark",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_18_30 PM.png",
    out: "parrot-line-a.webp",
    crop: { left: 0.24, top: 0.16, width: 0.52, height: 0.58 },
    width: 640,
    mode: "light",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_23_02 PM.png",
    out: "parrot-line-b.webp",
    crop: { left: 0.28, top: 0.3, width: 0.44, height: 0.36 },
    width: 560,
    mode: "light",
  },
  {
    src: "ChatGPT Image Jul 16, 2026, 04_30_51 PM (2).png",
    out: "sketch-instagram.webp",
    crop: { left: 0.16, top: 0.14, width: 0.68, height: 0.72 },
    width: 480,
    mode: "light",
  },
];

await mkdir(OUT, { recursive: true });

for (const job of JOBS) {
  const file = path.join(SRC, job.src);
  const base = sharp(file);
  const meta = await base.metadata();
  const region = {
    left: Math.round(meta.width * job.crop.left),
    top: Math.round(meta.height * job.crop.top),
    width: Math.round(meta.width * job.crop.width),
    height: Math.round(meta.height * job.crop.height),
  };

  let img = base.extract(region).resize({ width: job.width, withoutEnlargement: true });

  if (job.mode === "dark") {
    // Crush near-black paper to #000 so `screen` blending hides the plate.
    img = img.linear(1.13, -14);
  } else if (job.mode === "light") {
    // Lift near-white paper to #fff so `multiply` blending hides the plate.
    img = img.linear(1.09, 0).modulate({ brightness: 1.02 });
  }

  await img.webp({ quality: 82 }).toFile(path.join(OUT, job.out));
  console.log(`${job.out} <- ${job.src} [${region.width}x${region.height}]`);
}
console.log("done");
