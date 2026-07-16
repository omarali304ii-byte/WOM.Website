"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { processSteps, regions } from "../../data/site";
import { useScene } from "../../lib/motion";
import { Tape } from "../art/collage";

const ROUTE_PATH =
  "M 600 30 C 600 130 300 150 280 280 C 262 400 780 380 900 500 C 1000 600 420 640 320 760 C 240 856 560 920 600 1010";

const STAMP_TILT = [-3, 2.4, -2, 2.8, -2.4] as const;

/**
 * Scene 07 — The flight plan.
 * The red thread becomes a route: four working stages as taped notes, the
 * paper plane riding the path, and the delivery range stamped at the end.
 */
export function FlightPlan() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    const path = root.querySelector<SVGPathElement>(".plan-route-path");
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = media.reduced ? "0" : `${length}`;
    }

    if (media.reduced) return;

    g.from(".plan-intro > *", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: ".plan-intro", start: "top 80%" },
    });

    g.utils.toArray<HTMLElement>(".plan-step").forEach((step, index) => {
      g.from(step, {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 80%" },
      });
      // Notes sway gently sideways as the route is flown.
      g.to(step, {
        x: (index % 2 === 0 ? -1 : 1) * 26,
        ease: "none",
        scrollTrigger: { trigger: step, start: "top bottom", end: "bottom top", scrub: 0.5 },
      });
    });

    g.to(".plan-intro", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: ".plan-intro", start: "top bottom", end: "bottom -20%", scrub: 0.5 },
    });

    if (media.isDesktop && path) {
      const scrubTrigger = {
        trigger: ".plan-map",
        start: "top 65%",
        end: "bottom 62%",
        scrub: 0.5,
      };
      g.to(".plan-route-path", { strokeDashoffset: 0, ease: "none", scrollTrigger: { ...scrubTrigger } });
      g.to(".plan-plane", {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.6] },
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: { ...scrubTrigger },
      });
    } else {
      g.to(".plan-spine-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".plan-map", start: "top 70%", end: "bottom 70%", scrub: 0.5 },
      });
    }

    g.from(".plan-stamp", {
      scale: 1.35,
      autoAlpha: 0,
      rotation: -8,
      stagger: 0.09,
      duration: 0.5,
      ease: "power4.out",
      scrollTrigger: { trigger: ".plan-range", start: "top 84%" },
    });

    // The stamp row keeps drifting slightly after landing.
    g.to(".plan-stamp", {
      yPercent: (index) => -(8 + (index % 3) * 10),
      ease: "none",
      scrollTrigger: { trigger: ".plan-range", start: "top bottom", end: "bottom top", scrub: 0.5 },
    });
  });

  return (
    <section className="plan" id="process" ref={ref} aria-labelledby="plan-heading">
      <div className="page-container">
        <div className="plan-intro">
          <p className="eyebrow">
            <span aria-hidden="true" /> Our process
          </p>
          <h2 id="plan-heading">
            From the first conversation to <em>measurable growth.</em>
          </h2>
          <p className="plan-lede">
            A clear four-stage route keeps priorities, responsibilities, and decisions visible
            from the first briefing through delivery and ongoing improvement.
          </p>
        </div>

        <div className="plan-map">
          <svg className="plan-route" viewBox="0 0 1200 1040" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <path className="plan-route-ghost" d={ROUTE_PATH} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 9" />
            <path className="plan-route-path" d={ROUTE_PATH} stroke="var(--signal)" strokeWidth="2.4" />
          </svg>

          <Image
            src="/collage/parrot-line-b.webp"
            alt=""
            width={560}
            height={344}
            className="plan-plane"
            aria-hidden="true"
            loading="lazy"
            unoptimized
          />

          <div className="plan-spine" aria-hidden="true">
            <i className="plan-spine-fill" />
          </div>

          <ol className="plan-steps">
            {processSteps.map((step, index) => (
              <li className={`plan-step plan-step-${index + 1}`} key={step.name}>
                <Tape className="plan-step-tape" />
                <span className="plan-step-number">{step.number}</span>
                <h3>{step.name}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="plan-range" id="regions" aria-labelledby="plan-range-heading">
          <h3 id="plan-range-heading">
            <span className="eyebrow"><span aria-hidden="true" /> Delivery range</span>
            Serving clients across the region
          </h3>
          <ul className="plan-stamps" aria-label="Markets served">
            {regions.map((region, index) => (
              <li
                className="plan-stamp"
                key={region.name}
                style={{ "--tilt": `${STAMP_TILT[index]}deg` } as React.CSSProperties}
              >
                <span className="plan-stamp-code" aria-hidden="true">{region.code}</span>
                <span className="plan-stamp-name">{region.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <a className="button button-dark plan-cta" href="#contact">
          Start Your Project <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}
