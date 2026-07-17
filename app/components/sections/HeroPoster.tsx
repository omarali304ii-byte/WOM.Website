"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { heroPhrases } from "../../data/site";
import { useScene } from "../../lib/motion";
import { ParrotMural } from "../art/marks";

/** One entry per ink pass: mural layer, its registration drift, its proof chip. */
const INK_PASSES = [
  { layer: ".mural-body", x: 0, y: 0 },
  { layer: ".mural-crest", x: -52, y: 30 },
  { layer: ".mural-tail", x: 42, y: -34 },
  { layer: ".mural-wing", x: -34, y: -46 },
] as const;

/**
 * Scene 01 — The print run.
 * The official mark is blown up to wall scale and screen-printed onto the
 * paper wall one ink pass at a time, while a squeegee blade drags the
 * lockup onto the poster in front of it. The passes drift with the pointer
 * and slip out of register as the visitor scrolls away.
 */
export function HeroPoster() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    if (media.reduced) return;

    const frame = root.querySelector<HTMLElement>(".hero-logo-frame");
    const frameWidth = frame?.offsetWidth ?? 640;
    const chips = root.querySelectorAll<HTMLElement>(".hero-pass-chip");

    const intro = g.timeline({ defaults: { ease: "power3.out" } });

    // Pass zero — the squeegee drags the lockup onto the wall.
    intro
      .set(".hero-squeegee", { autoAlpha: 1 }, 0.2)
      .fromTo(
        ".hero-logo-lockup",
        { clipPath: "inset(-2% 101% -2% 0%)" },
        { clipPath: "inset(-2% -1% -2% 0%)", duration: 0.95, ease: "power2.inOut" },
        0.2,
      )
      .fromTo(
        ".hero-squeegee",
        { x: -frameWidth * 0.18 },
        { x: frameWidth * 1.1, duration: 0.95, ease: "power2.inOut" },
        0.2,
      )
      .set(".hero-squeegee", { autoAlpha: 0 }, 1.15);

    // The mural blooms out of the lockup, then every ink lands in register:
    // body first, then red, green, blue — each pass ticking its proof chip.
    intro.from(
      ".hero-mural-mark",
      { scale: 0.62, xPercent: 12, autoAlpha: 0, duration: 1.5, ease: "power4.out" },
      0.5,
    );
    INK_PASSES.forEach((pass, i) => {
      const at = 0.75 + i * 0.16;
      intro.from(pass.layer, { x: pass.x, y: pass.y, autoAlpha: 0, duration: 0.85 }, at);
      if (chips[i]) {
        intro.from(chips[i], { scale: 0, autoAlpha: 0, duration: 0.4, ease: "back.out(2.2)" }, at + 0.35);
      }
    });

    intro
      .from(".hero-eyebrow", { y: 18, autoAlpha: 0, duration: 0.55 }, 0.35)
      .from(".hero-note", { y: 26, autoAlpha: 0, duration: 0.6 }, 1.05)
      .from(".hero-actions > *", { y: 18, autoAlpha: 0, stagger: 0.09, duration: 0.5 }, 1.2)
      .from(".hero-pass-caption", { autoAlpha: 0, duration: 0.5 }, 1.65)
      .from(".hero-ticker", { yPercent: 100, duration: 0.7 }, 1.35);

    // Idle breathing — each pass floats on its own beat, like paper on a wall.
    g.to(".mural-drift", {
      y: 12,
      duration: 7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 1.1, from: "end" },
      delay: 2.4,
    });

    // Exit — the print slips out of register as the visitor scrolls on.
    const exit = g.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.5 },
      defaults: { ease: "none" },
    });
    exit
      .to(".hero-copy", { yPercent: -14, autoAlpha: 0.25 }, 0)
      .to(".hero-mural-mark", { scale: 1.06, transformOrigin: "50% 50%" }, 0)
      .to(".hero-ticker", { xPercent: -4 }, 0);
    INK_PASSES.forEach((pass, i) => {
      exit.to(pass.layer, { yPercent: -(3 + i * 4.5) }, 0);
    });

    // Depth — the pointer parallaxes the ink passes at different rates.
    if (media.isDesktop) {
      const depths = [8, 14, 20, 26];
      const movers = INK_PASSES.map((pass, i) => ({
        x: g.quickTo(pass.layer, "x", { duration: 1.1, ease: "power3" }),
        y: g.quickTo(pass.layer, "y", { duration: 1.1, ease: "power3" }),
        depth: depths[i],
      }));
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        movers.forEach((mover) => {
          mover.x(nx * -mover.depth);
          mover.y(ny * -mover.depth);
        });
      };
      intro.eventCallback("onComplete", () => root.addEventListener("pointermove", onMove));
      return () => root.removeEventListener("pointermove", onMove);
    }
  });

  return (
    <section className="hero" id="top" ref={ref} aria-label="Word of Mouth introduction">
      <div className="hero-wall" aria-hidden="true" />

      <div className="hero-mural" aria-hidden="true">
        <ParrotMural className="hero-mural-mark" />
      </div>

      <div className="page-container hero-stage">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span aria-hidden="true" /> Digital marketing agency — Cairo
          </p>

          <h1 className="hero-heading hero-logo-heading">
            <span className="hero-logo-frame">
              <Image
                className="hero-logo-lockup"
                src="/brand/word-of-mouth-logo-stacked-ink.svg"
                alt="Word of Mouth — Digital Marketing Solution"
                width={720}
                height={320}
                priority
              />
              <span className="hero-squeegee" aria-hidden="true" />
            </span>
          </h1>

          <p className="hero-note">
            Word of Mouth is a full-service digital marketing agency in Cairo — strategy,
            creative, and campaigns built to turn attention into measurable growth across Egypt
            and the Middle East.
          </p>

          <div className="hero-actions">
            <a className="button button-signal" href="#contact">
              Start Your Project <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <a className="text-link" href="#work">
              See Our Work <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-passbar" aria-hidden="true">
        <span className="hero-pass-chip hero-pass-ink" />
        <span className="hero-pass-chip hero-pass-signal" />
        <span className="hero-pass-chip hero-pass-leaf" />
        <span className="hero-pass-chip hero-pass-sky" />
        <span className="hero-pass-caption">4-color pass — Cairo · est. 11+ yrs</span>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {[0, 1].map((run) => (
            <div className="hero-ticker-run" key={run}>
              {heroPhrases.map((phrase) => (
                <span className="hero-ticker-word" key={`${run}-${phrase}`}>
                  {phrase} <i className="tick-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
