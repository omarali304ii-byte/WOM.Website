"use client";

import {
  ArrowUpRight,
  Camera,
  Fingerprint,
  MessageCircle,
  Monitor,
  MousePointerClick,
  Search,
  Sparkles,
  Video,
  Workflow,
} from "lucide-react";
import { useId, useState } from "react";
import { services } from "../../data/site";
import { useScene } from "../../lib/motion";
import { Tape } from "../art/collage";

const SERVICE_ICONS = [
  Sparkles,
  MessageCircle,
  Monitor,
  Fingerprint,
  Search,
  Camera,
  Video,
  MousePointerClick,
  Workflow,
] as const;

/**
 * Scene 05 — The campaign desk.
 * Nine services live as one physical card on the desk; the numbered index
 * drives which card is on top. The card mechanics stay a real accessible
 * accordion — the desk is presentation, never the only path to content.
 */
export function ServiceCards() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const ActiveIcon = SERVICE_ICONS[active];
  const activeService = services[active];

  const ref = useScene<HTMLElement>((root, media, g) => {
    if (media.reduced) return;

    g.from(".services-intro > *", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: ".services-intro", start: "top 80%" },
    });

    g.from(".service-row", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".service-index", start: "top 82%" },
    });

    if (media.isDesktop) {
      g.from(".service-desk", {
        y: 44,
        rotation: -2,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: ".services-layout", start: "top 76%" },
      });
    }

    // The under-paper fans out and the intro drifts while the visitor works
    // through the index, keeping the desk physically alive.
    g.to(".service-desk-under", {
      rotation: 5.5,
      yPercent: 6,
      ease: "none",
      scrollTrigger: { trigger: ".services-layout", start: "top bottom", end: "bottom top", scrub: 0.5 },
    });

    g.to(".services-intro", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
    });
  });

  return (
    <section className="services" id="services" ref={ref} aria-labelledby="services-heading">
      <div className="page-container">
        <div className="services-intro">
          <p className="eyebrow">
            <span aria-hidden="true" /> Our services
          </p>
          <h2 id="services-heading">
            Nine services. <em>One growth system.</em>
          </h2>
          <p className="services-lede">
            A strong brand needs more than one isolated service. We connect strategy,
            creativity, content, technology, advertising, and customer management so every
            piece works toward the same goal.
          </p>
        </div>

        <div className="services-layout">
          {/* The physical card on the desk mirrors the active row. */}
          <div className="service-desk" aria-hidden="true">
            <div className="service-card" key={activeService.title} data-index={activeService.index}>
              <Tape className="service-card-tape" />
              <p className="service-card-label">{activeService.title}</p>
              <ActiveIcon className="service-card-icon" strokeWidth={1.1} />
              <p className="service-card-signal">
                <span>{activeService.index}</span> {activeService.signal}
              </p>
              <span className="service-card-grommet" />
              <span className="service-card-square" />
              <svg className="service-card-thread" viewBox="0 0 120 260" fill="none" preserveAspectRatio="none">
                <path d="M8 10 C 60 40 30 130 88 168 C 116 187 112 224 96 252" stroke="var(--signal)" strokeWidth="2" />
              </svg>
            </div>
            <span className="service-desk-under" />
          </div>

          <div className="service-index">
            {services.map((service, index) => {
              const open = active === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              const RowIcon = SERVICE_ICONS[index];

              return (
                <article className={`service-row${open ? " is-open" : ""}`} key={service.title}>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(index)}
                      className="service-trigger"
                    >
                      <span className="service-num">{service.index}</span>
                      <RowIcon className="service-row-icon" aria-hidden="true" size={19} strokeWidth={1.5} />
                      <span className="service-title">{service.title}</span>
                      <span className="service-plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="service-panel">
                    <div className="service-panel-inner">
                      <p className="service-tagline">{service.tagline}</p>
                      <p className="service-copy">{service.copy}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="services-actions">
          <a className="button button-dark" href="#contact">
            Discuss Your Project <ArrowUpRight aria-hidden="true" size={18} />
          </a>
          <a className="text-link" href="#work">
            See The Work It Produces <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
