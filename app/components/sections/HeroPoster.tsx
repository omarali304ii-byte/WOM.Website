"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { heroPhrases } from "../../data/site";
import { useScene } from "../../lib/motion";
import { ParrotMark } from "../art/marks";
import { Tape } from "../art/collage";

/**
 * Scene 01 — The poster wall.
 * A dark studio wall: the megaphone releases the red thread, the headline is
 * pasted up like a print run, and the brand mark hangs as a taped poster.
 */
export function HeroPoster() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    const thread = root.querySelector<SVGPathElement>(".hero-thread-path");
    const mask = root.querySelector<SVGPathElement>(".hero-thread-mask-path");
    if (thread && mask) {
      const maskLength = mask.getTotalLength();
      thread.style.strokeDasharray = "7 9";
      mask.style.strokeDasharray = `${maskLength}`;
      mask.style.strokeDashoffset = media.reduced ? "0" : `${maskLength}`;
    }

    const ellipse = root.querySelector<SVGPathElement>(".talk-ellipse .draw-path");
    if (ellipse) {
      const ellipseLength = ellipse.getTotalLength();
      ellipse.style.strokeDasharray = `${ellipseLength}`;
      ellipse.style.strokeDashoffset = media.reduced ? "0" : `${ellipseLength}`;
    }

    if (media.reduced) return;

    const intro = g.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".hero-line > span", { yPercent: 112, duration: 0.85, stagger: 0.11, ease: "power4.out" }, 0.1)
      .from(".hero-note", { y: 26, rotation: -4, autoAlpha: 0, duration: 0.65 }, 0.5)
      .from(".hero-actions > *", { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.55 }, 0.62)
      .from(".hero-board", { y: 34, rotation: 1.5, autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 0.35)
      .from(".hero-megaphone", { scale: 0.82, autoAlpha: 0, rotation: -8, duration: 0.7, ease: "back.out(1.6)" }, 0.75)
      .to(".talk-ellipse .draw-path", { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.9)
      .from(".hero-ticker", { yPercent: 100, duration: 0.7, ease: "power3.out" }, 0.9);

    // The thread draws out of the megaphone as the visitor scrolls, and the
    // ink parrot rides it toward the next scene.
    if (thread && mask) {
      const threadTrigger = { trigger: root, start: "top top", end: "bottom 30%", scrub: 0.5 } as const;
      g.to(mask, { strokeDashoffset: 0, ease: "none", scrollTrigger: { ...threadTrigger } });
      g.to(".hero-flyer", {
        motionPath: { path: thread, align: thread, alignOrigin: [0.5, 0.62] },
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: { ...threadTrigger },
      });
    }

    const exit = g.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.5 },
      defaults: { ease: "none" },
    });
    exit
      .to(".hero-copy", { yPercent: -14, autoAlpha: 0.25 }, 0)
      .to(".hero-note", { yPercent: -10 }, 0)
      .to(".hero-board", { yPercent: media.isMobile ? -6 : -22 }, 0)
      .to(".hero-megaphone", { y: 90 }, 0)
      .to(".hero-ticker", { xPercent: -4 }, 0);

    if (media.isDesktop) {
      const boardX = g.quickTo(".hero-board", "x", { duration: 0.9, ease: "power3" });
      const boardY = g.quickTo(".hero-board", "y", { duration: 0.9, ease: "power3" });
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        boardX(nx * -14);
        boardY(ny * -10);
      };
      root.addEventListener("pointermove", onMove);
      return () => root.removeEventListener("pointermove", onMove);
    }
  });

  return (
    <section className="hero" id="top" ref={ref} data-header-dark aria-label="Word of Mouth introduction">
      <div className="hero-wall" aria-hidden="true" />

      <div className="page-container hero-stage">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" /> Digital marketing agency — Cairo
          </p>

          <h1 className="hero-heading">
            <span className="hero-line mask-line">
              <span>Word of</span>
            </span>
            <span className="hero-line mask-line">
              <span className="talk-wrap">
                <em className="hero-remember">
                  mouth.
                  <svg className="talk-ellipse" viewBox="0 0 320 120" fill="none" aria-hidden="true" preserveAspectRatio="none">
                    <path
                      className="draw-path"
                      d="M160 10 C 252 6 308 30 308 60 C 308 92 238 112 158 112 C 78 112 12 94 12 62 C 12 32 72 12 178 10"
                      stroke="var(--signal)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </em>
              </span>
            </span>
          </h1>

          <p className="hero-note">
            <Tape className="hero-note-tape" />
            Word of Mouth is a full-service digital marketing agency in Cairo — strategy,
            creative, and campaigns built to turn attention into measurable growth across Egypt
            and the Middle East.
          </p>

          <div className="hero-actions">
            <a className="button button-signal" href="#contact">
              Start Your Project <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <a className="text-link text-link-light" href="#work">
              See Our Work <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>

        <div className="hero-board" aria-hidden="true">
          <Tape className="hero-board-tape-1" light />
          <Tape className="hero-board-tape-2" light />
          <ParrotMark tone="full" className="hero-board-mark" aria-hidden="true" />
          <p className="hero-board-caption">
            Word of Mouth <span>Est. 11+ years — Cairo</span>
          </p>
          <span className="hero-board-square" />
        </div>
      </div>

      <Image
        src="/collage/megaphone.webp"
        alt=""
        width={560}
        height={508}
        priority
        className="hero-megaphone"
        aria-hidden="true"
        unoptimized
      />

      <svg className="hero-thread" viewBox="0 0 1440 760" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <mask id="hero-thread-mask" maskUnits="userSpaceOnUse">
          <path
            className="hero-thread-mask-path"
            d="M330 596 C 470 500 600 610 740 520 C 890 424 980 490 1110 400 C 1240 312 1330 330 1470 250"
            stroke="#fff"
            strokeWidth="10"
          />
        </mask>
        <path
          className="hero-thread-path"
          d="M330 596 C 470 500 600 610 740 520 C 890 424 980 490 1110 400 C 1240 312 1330 330 1470 250"
          stroke="var(--signal)"
          strokeWidth="2.2"
          mask="url(#hero-thread-mask)"
        />
      </svg>

      <Image
        src="/collage/parrot-ink-a.webp"
        alt=""
        width={552}
        height={527}
        className="hero-flyer"
        aria-hidden="true"
        loading="lazy"
        unoptimized
      />

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
