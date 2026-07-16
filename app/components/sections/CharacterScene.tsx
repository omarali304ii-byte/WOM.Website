"use client";

import Image from "next/image";
import { Crosshair, Heart, Lightbulb, Megaphone, TrendingUp } from "lucide-react";
import { characterTraits, characterValues, cultureNotes } from "../../data/site";
import { useScene } from "../../lib/motion";
import { HandArrow, Tape } from "../art/collage";

const VALUE_ICONS = { lightbulb: Lightbulb, crosshair: Crosshair, megaphone: Megaphone, "trending-up": TrendingUp, heart: Heart } as const;

/**
 * Scene 04 — The character.
 * The parrot in person: a streetwear portrait pinned to the dark wall,
 * annotated by hand, backed by the values the team actually works by.
 * Built from the owner's own brand mockup.
 */
export function CharacterScene() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    const arrows = root.querySelectorAll<SVGPathElement>(".hand-arrow-path");
    arrows.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = media.reduced ? "0" : `${length}`;
    });

    if (media.reduced) return;

    g.from(".char-copy > *", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: ".char-copy", start: "top 78%" },
    });

    g.from(".char-portrait", {
      y: 46,
      rotation: -2.5,
      autoAlpha: 0,
      duration: 0.95,
      ease: "power2.out",
      scrollTrigger: { trigger: ".char-collage", start: "top 74%" },
    });

    g.utils.toArray<HTMLElement>(".char-trait").forEach((trait, index) => {
      const tl = g.timeline({
        scrollTrigger: { trigger: trait, start: "top 84%" },
        defaults: { ease: "power3.out" },
      });
      tl.from(trait, { y: 22, autoAlpha: 0, duration: 0.5, delay: index * 0.05 });
      const arrow = trait.querySelector(".hand-arrow-path");
      if (arrow) tl.to(arrow, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.15");
    });

    // The collage layers separate in depth while the scene passes — the
    // portrait, torn backings, and paper dots all ride at different rates.
    const collageDrift = {
      trigger: ".char-collage",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    } as const;
    g.to(".char-portrait", {
      yPercent: media.isMobile ? -7 : -14,
      ease: "none",
      scrollTrigger: { ...collageDrift },
    });
    g.to(".char-backing-1", { yPercent: 16, rotation: -6.5, ease: "none", scrollTrigger: { ...collageDrift } });
    g.to(".char-backing-2", { yPercent: -20, rotation: 5.5, ease: "none", scrollTrigger: { ...collageDrift } });
    g.to(".char-dot-red", { y: -90, ease: "none", scrollTrigger: { ...collageDrift } });
    g.to(".char-dot-blue", { y: 60, x: -20, ease: "none", scrollTrigger: { ...collageDrift } });
    g.to(".char-dots-grid", { y: -46, ease: "none", scrollTrigger: { ...collageDrift } });

    g.from(".char-value", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.07,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".char-values", start: "top 86%" },
    });

    g.from(".char-note", {
      y: 26,
      rotation: 4,
      autoAlpha: 0,
      duration: 0.65,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".char-note", start: "top 88%" },
    });
  });

  return (
    <section className="character" ref={ref} data-header-dark aria-labelledby="character-heading">
      <div className="page-container">
        <div className="char-layout">
          <div className="char-copy">
            <p className="eyebrow eyebrow-light">
              <span aria-hidden="true" /> Our character
            </p>
            <h2 id="character-heading">
              More than a mascot. <em>A mindset that moves ideas.</em>
            </h2>
            <p className="char-lede">
              Our parrot represents how we think, create, and show up for our clients — loud in
              ideas, sharp in strategy, and fearless in execution.
            </p>

            <ul className="char-traits" aria-label="What the character stands for">
              {characterTraits.map((trait, index) => (
                <li className="char-trait" key={trait.word}>
                  <span className="char-trait-word">
                    {trait.word}
                    <HandArrow className="char-trait-arrow" flip={index % 2 === 1} />
                  </span>
                  <span className="char-trait-note">{trait.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="char-collage" aria-hidden="true">
            <span className="char-backing char-backing-1" />
            <span className="char-backing char-backing-2" />
            <span className="char-dot char-dot-blue" />
            <span className="char-dot char-dot-red" />
            <span className="char-dots-grid" />
            <div className="char-portrait">
              <Tape className="char-portrait-tape" light />
              <Image
                src="/collage/parrot-streetwear.webp"
                alt=""
                width={814}
                height={952}
                sizes="(max-width: 767px) 82vw, 38vw"
                loading="lazy"
                unoptimized
              />
            </div>
          </figure>
        </div>

        <div className="char-values-row">
          <ul className="char-values" aria-label="What we stand for">
            {characterValues.map((value) => {
              const ValueIcon = VALUE_ICONS[value.icon as keyof typeof VALUE_ICONS];
              return (
                <li className="char-value" key={value.name}>
                  <ValueIcon aria-hidden="true" size={22} strokeWidth={1.4} />
                  <h3>{value.name}</h3>
                  <p>{value.copy}</p>
                </li>
              );
            })}
          </ul>

          <aside className="char-note" aria-label="Culture note">
            <span className="char-note-clip" aria-hidden="true" />
            <p className="char-note-title">
              Not just a parrot. <br /> A part of our culture.
            </p>
            <ul>
              {cultureNotes.map((note) => (
                <li key={note}>
                  <svg viewBox="0 0 18 14" aria-hidden="true" focusable="false">
                    <path d="M2 8 L7 12 L16 2" stroke="var(--signal)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {note}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
