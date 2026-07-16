"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { manifesto, noiseFragments } from "../../data/site";
import { useScene } from "../../lib/motion";
import { Tape } from "../art/collage";

// Hand-placed scatter for the market noise scraps (percent coordinates).
const SCRAP_LAYOUT = [
  { top: 4, left: 4, depth: 1, tilt: -4 },
  { top: 1, left: 30, depth: 2, tilt: 3 },
  { top: 6, left: 56, depth: 1, tilt: -2 },
  { top: 2, left: 80, depth: 3, tilt: 5 },
  { top: 22, left: 12, depth: 3, tilt: 2 },
  { top: 26, left: 38, depth: 1, tilt: -5 },
  { top: 20, left: 66, depth: 2, tilt: 4 },
  { top: 28, left: 88, depth: 1, tilt: -3 },
  { top: 46, left: 2, depth: 2, tilt: 6 },
  { top: 50, left: 26, depth: 3, tilt: -6 },
  { top: 44, left: 54, depth: 1, tilt: 2 },
  { top: 52, left: 78, depth: 2, tilt: -2 },
  { top: 68, left: 10, depth: 1, tilt: 5 },
  { top: 74, left: 34, depth: 2, tilt: -4 },
  { top: 66, left: 62, depth: 3, tilt: 3 },
  { top: 72, left: 86, depth: 1, tilt: -5 },
  { top: 88, left: 20, depth: 2, tilt: 4 },
  { top: 86, left: 70, depth: 1, tilt: -3 },
] as const;

/**
 * Scene 03 — The idea.
 * The market's noise drifts as paper scraps; one true idea survives it, and
 * the agency manifesto answers.
 */
export function IdeaScene() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    const line = root.querySelector<SVGPathElement>(".idea-line-path");
    if (line) {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = media.reduced ? "0" : `${length}`;
    }

    if (media.reduced) {
      g.set(".idea-scrap", { autoAlpha: 0.3 });
      return;
    }

    // Depth-layered drift: further scraps move less, closer scraps more.
    // Each scrap also sways sideways and rotates slightly in alternating
    // directions so the noise field visibly churns while scrolling.
    [1, 2, 3].forEach((depth) => {
      g.to(`.idea-depth-${depth}`, {
        y: () => -85 * depth,
        x: (index) => (index % 2 === 0 ? -1 : 1) * (18 + depth * 14),
        rotation: (index) => (index % 2 === 0 ? -1 : 1) * (2.5 + depth * 1.5),
        ease: "none",
        scrollTrigger: { trigger: ".idea-field", start: "top bottom", end: "bottom top", scrub: 0.45 },
      });
    });

    g.from(".idea-heading .mask-line > span", {
      yPercent: 110,
      stagger: 0.1,
      duration: 0.8,
      ease: "power4.out",
      scrollTrigger: { trigger: ".idea-heading", start: "top 78%" },
    });

    // Scraps blur away as the keeper arrives.
    g.to(".idea-scrap", {
      autoAlpha: 0.14,
      filter: "blur(1.5px)",
      stagger: { each: 0.015, from: "random" },
      scrollTrigger: { trigger: ".idea-keeper", start: "top 90%", end: "top 45%", scrub: 0.6 },
    });

    if (line) {
      g.to(line, {
        strokeDashoffset: 0,
        ease: "power2.inOut",
        duration: 1.1,
        scrollTrigger: { trigger: ".idea-keeper", start: "top 82%" },
      });
    }

    g.from(".idea-keeper", {
      scale: 0.86,
      rotation: -3,
      autoAlpha: 0,
      duration: 0.65,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: ".idea-keeper", start: "top 78%" },
    });

    // The headline and the keeper card ride the scroll at their own pace.
    g.to(".idea-heading", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: ".idea-inner", start: "top bottom", end: "bottom top", scrub: 0.5 },
    });

    g.to(".idea-keeper", {
      yPercent: -46,
      ease: "none",
      scrollTrigger: { trigger: ".idea-resolve", start: "top bottom", end: "bottom top", scrub: 0.5 },
    });

    g.from(".idea-manifesto > *", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: ".idea-manifesto", start: "top 78%" },
    });

    g.from(".idea-principle", {
      x: -22,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.55,
      ease: "power3.out",
      scrollTrigger: { trigger: ".idea-principles", start: "top 84%" },
    });
  });

  return (
    <section className="idea" id="about" ref={ref} aria-labelledby="idea-heading">
      <div className="idea-field" aria-hidden="true">
        {SCRAP_LAYOUT.map((slot, index) => (
          <span
            className={`idea-scrap idea-depth-${slot.depth}`}
            key={noiseFragments[index]}
            style={{ top: `${slot.top}%`, left: `${slot.left}%`, "--tilt": `${slot.tilt}deg` } as React.CSSProperties}
          >
            {noiseFragments[index]}
          </span>
        ))}
        <Image
          src="/collage/sketch-instagram.webp"
          alt=""
          width={480}
          height={508}
          className="idea-scrap-art idea-depth-2"
          loading="lazy"
          unoptimized
        />
      </div>

      <div className="page-container idea-inner">
        <p className="eyebrow">
          <span aria-hidden="true" /> The market is loud
        </p>
        <h2 className="idea-heading" id="idea-heading">
          <span className="mask-line"><span>Attention is everywhere.</span></span>
          <span className="mask-line"><span>Meaning is <em>rare.</em></span></span>
        </h2>

        <div className="idea-resolve">
          <svg className="idea-line" viewBox="0 0 900 220" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="idea-line-path"
              d="M-10 30 C 180 90 320 40 450 110 C 560 168 700 150 910 196"
              stroke="var(--signal)"
              strokeWidth="2.4"
            />
          </svg>
          <p className="idea-keeper">
            <Tape className="idea-keeper-tape" />
            One true idea
          </p>
        </div>

        <div className="idea-manifesto">
          <p className="eyebrow">
            <span aria-hidden="true" /> About Word of Mouth
          </p>
          <h3>
            {manifesto.heading} <em>{manifesto.headingEm}</em>
          </h3>
          <p className="idea-lede">{manifesto.lede}</p>
          {manifesto.body.map((paragraph) => (
            <p className="idea-body" key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}

          <ul className="idea-principles" aria-label="How we shape the work">
            {manifesto.principles.map((principle, index) => (
              <li className="idea-principle" key={principle}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {principle}
              </li>
            ))}
          </ul>

          <a className="text-link" href="#services">
            See How We Do It <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
