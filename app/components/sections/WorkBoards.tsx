"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/site";
import { useScene } from "../../lib/motion";
import { Tape } from "../art/collage";

const BOARD_TILT = [-1.4, 1.2, -1.0, 1.6] as const;

/**
 * Scene 06 — The boards.
 * Selected work hangs as campaign boards on the dark wall. Desktop rides a
 * pinned horizontal track; touch gets a native snap rail.
 */
export function WorkBoards() {
  const ref = useScene<HTMLElement>((root, media, g) => {
    if (media.reduced) return;

    g.from(".boards-intro > *", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: ".boards-intro", start: "top 80%" },
    });

    if (media.isDesktop) {
      const track = root.querySelector<HTMLElement>(".boards-track");
      const viewport = root.querySelector<HTMLElement>(".boards-viewport");
      if (!track || !viewport) return;

      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tl = g.timeline({
        scrollTrigger: {
          trigger: ".boards-stage",
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.2}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });
      tl.to(track, { x: () => -distance() });
      tl.to(".boards-needle", { scaleX: 1 }, 0);
      tl.to(".boards-intro", { yPercent: -16, autoAlpha: 0.55, ease: "none" }, 0);

      // Inner counter-drift keeps each shot alive while the wall travels.
      g.utils.toArray<HTMLElement>(".board").forEach((board, index) => {
        const art = board.querySelector(".board-art img");
        if (art) {
          g.fromTo(
            art,
            { xPercent: -7, yPercent: index % 2 === 0 ? -2 : 2 },
            {
              xPercent: 7,
              yPercent: index % 2 === 0 ? 2 : -2,
              ease: "none",
              scrollTrigger: {
                trigger: board,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }
      });
      return;
    }

    g.from(".board", {
      y: 36,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".boards-viewport", start: "top 85%" },
    });
  });

  return (
    <section className="boards" id="work" ref={ref} data-header-dark aria-labelledby="work-heading">
      <div className="boards-stage">
        <div className="page-container boards-intro">
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" /> Our work
          </p>
          <h2 id="work-heading">
            Work built to elevate brands and solve <em>real business challenges.</em>
          </h2>
          <p className="boards-lede">
            Selected projects across branding, websites, social media, and media production —
            each one a real brief, a clear direction, and work that shipped.
          </p>
        </div>

        <div className="boards-viewport" tabIndex={0} role="group" aria-label="Selected work — scroll horizontally">
          <div className="boards-track">
            {projects.map((project, index) => (
              <article
                className="board"
                key={project.slug}
                style={{ "--tilt": `${BOARD_TILT[index]}deg` } as React.CSSProperties}
              >
                <Link className="board-link" href={`/work/${project.slug}`} aria-label={`View ${project.name} case study`}>
                  <header className="board-head">
                    <span className="board-name">{project.name}</span>
                    <span className="board-chip">{project.discipline}</span>
                  </header>
                  <div className="board-art">
                    <Tape className="board-tape-1" light />
                    <Tape className="board-tape-2" light />
                    <Image
                      src={project.image}
                      alt={`${project.name} — ${project.discipline} by Word of Mouth`}
                      width={project.width}
                      height={project.height}
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  <footer className="board-meta">
                    <span className="board-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <p>{project.summary}</p>
                    <span className="board-open">
                      Open case <ArrowUpRight aria-hidden="true" size={16} />
                    </span>
                  </footer>
                </Link>
              </article>
            ))}

            <article className="board board-cta" style={{ "--tilt": "1.8deg" } as React.CSSProperties}>
              <Image
                src="/collage/paper-plane.webp"
                alt=""
                width={520}
                height={344}
                className="board-cta-plane"
                aria-hidden="true"
                loading="lazy"
                unoptimized
              />
              <p className="board-cta-kicker">Next board</p>
              <p className="board-cta-title">
                Your brand <em>here.</em>
              </p>
              <a className="button button-signal" href="#contact">
                Start Your Project <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </article>
          </div>
        </div>

        <div className="boards-progress" aria-hidden="true">
          <span className="boards-needle" />
        </div>

        <div className="page-container boards-actions">
          <Link className="button button-light" href="/work">
            View All Projects <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
