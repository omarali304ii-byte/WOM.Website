"use client";

import Image from "next/image";
import { clients, stats } from "../../data/site";
import { useScene } from "../../lib/motion";
import { Tape } from "../art/collage";

// Deterministic pin angles so the wall reads hand-hung, not randomized.
const PRINT_TILT = [-2.4, 1.8, -1.2, 2.6, -1.8, 1.2, -2.8, 2.2, -1.4] as const;
const FIGURE_TILT = [-1.6, 1.4, -1.1, 1.8] as const;

/**
 * Scene 02 — Printed proof.
 * Client marks hang as taped prints on the dark wall; the agency's published
 * figures are stamped beside them in signal red.
 */
export function ProofWall() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    if (media.reduced) return;

    g.from(".proof-head > *", {
      y: 28,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".proof-head", start: "top 82%" },
    });

    g.from(".proof-print", {
      y: 34,
      rotation: 0,
      autoAlpha: 0,
      stagger: { each: 0.05, from: "random" },
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".proof-wall", start: "top 84%" },
    });

    // Continuous drift while the wall passes: each print rides at its own
    // rate and sway, so the wall reads as hand-pinned paper, not a grid.
    g.to(".proof-print", {
      yPercent: (index) => -(14 + (index % 3) * 16),
      x: (index) => (index % 2 === 0 ? -1 : 1) * (6 + (index % 4) * 5),
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
    });

    g.to(".proof-head", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
    });

    g.to(".proof-figure", {
      yPercent: (index) => -(10 + (index % 2) * 14),
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
    });

    // Stamped figures count up once, on real server-rendered numbers.
    const figures = g.utils.toArray<HTMLElement>(".proof-figure-value");
    figures.forEach((figure) => {
      const target = Number(figure.dataset.value ?? "0");
      const state = { n: target };
      g.from(figure, {
        autoAlpha: 0,
        scale: 1.4,
        rotation: -6,
        duration: 0.45,
        ease: "power4.out",
        scrollTrigger: { trigger: figure, start: "top 88%" },
      });
      g.fromTo(
        state,
        { n: 0 },
        {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: figure, start: "top 88%" },
          onUpdate: () => {
            figure.textContent = Math.round(state.n).toLocaleString("en-US");
          },
        },
      );
    });
  });

  return (
    <section className="proof" ref={ref} data-header-dark aria-labelledby="proof-heading">
      <div className="page-container">
        <div className="proof-head">
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" /> Trusted by ambitious brands
          </p>
          <h2 id="proof-heading">
            Good company is <em>part of the proof.</em>
          </h2>
          <p className="proof-lede">
            We collaborate across industries to build stronger identities, better digital
            experiences, and marketing that moves people to act.
          </p>
        </div>

        <ul className="proof-wall" aria-label="Clients">
          {clients.map((client, index) => (
            <li
              className="proof-print"
              key={client.name}
              style={{ "--tilt": `${PRINT_TILT[index]}deg` } as React.CSSProperties}
            >
              <Tape className="proof-print-tape" light />
              <Image src={client.file} alt={client.name} width={150} height={150} loading="lazy" unoptimized />
            </li>
          ))}
        </ul>

        <dl className="proof-figures" aria-label="Published agency figures">
          {stats.map((stat, index) => (
            <div
              className="proof-figure"
              key={stat.label}
              style={{ "--tilt": `${FIGURE_TILT[index]}deg` } as React.CSSProperties}
            >
              <dd>
                <span className="proof-figure-value" data-value={stat.value}>
                  {stat.value.toLocaleString("en-US")}
                </span>
                <span className="proof-figure-suffix" aria-hidden="true">{stat.suffix}</span>
              </dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
