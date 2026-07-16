"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { insights, insightsIndexHref } from "../../data/site";
import { useScene } from "../../lib/motion";

/**
 * Scene 08 — Field notes.
 * Agency intelligence as an editorial journal: one lead feature, then an
 * index of issues. All articles link out to the published blog.
 */
export function InsightsJournal() {
  const [lead, ...rest] = insights;

  const ref = useScene<HTMLElement>((root, media, g) => {
    if (media.reduced) return;

    g.from(".journal-head > *", {
      y: 28,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".journal-head", start: "top 82%" },
    });

    g.from(".journal-lead", {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".journal-lead", start: "top 82%" },
    });

    g.from(".journal-row", {
      y: 26,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".journal-index", start: "top 86%" },
    });

    // The lead photograph pans inside its frame while the article passes.
    g.fromTo(
      ".journal-lead-media img",
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: ".journal-lead", start: "top bottom", end: "bottom top", scrub: 0.5 },
      },
    );
  });

  return (
    <section className="journal" id="insights" ref={ref} aria-labelledby="insights-heading">
      <div className="page-container">
        <div className="journal-head">
          <p className="eyebrow">
            <span aria-hidden="true" /> Insights
          </p>
          <h2 id="insights-heading">
            Marketing intelligence, <em>published.</em>
          </h2>
          <p className="journal-lede">
            Practical thinking from the studio on strategy, advertising, data, branding, and
            choosing the right marketing partner.
          </p>
        </div>

        <article className="journal-lead">
          <a href={lead.href} target="_blank" rel="noopener noreferrer">
            <div className="journal-lead-media">
              <Image
                src={lead.image}
                alt=""
                width={1536}
                height={1024}
                sizes="(max-width: 767px) 100vw, 52vw"
                loading="lazy"
                unoptimized
              />
            </div>
            <div className="journal-lead-body">
              <span className="journal-issue" aria-hidden="true">N°{lead.index}</span>
              <h3>{lead.title}</h3>
              <p>{lead.excerpt}</p>
              <span className="journal-read">
                Read the article <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            </div>
          </a>
        </article>

        <div className="journal-index">
          {rest.map((article) => (
            <article className="journal-row" key={article.index}>
              <a href={article.href} target="_blank" rel="noopener noreferrer">
                <span className="journal-issue" aria-hidden="true">N°{article.index}</span>
                <div className="journal-row-body">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <div className="journal-row-media" aria-hidden="true">
                  <Image src={article.image} alt="" width={1536} height={1024} sizes="220px" loading="lazy" unoptimized />
                </div>
                <span className="journal-read" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </article>
          ))}
        </div>

        <a className="text-link journal-all" href={insightsIndexHref} target="_blank" rel="noopener noreferrer">
          Browse All Insights <ArrowUpRight aria-hidden="true" size={17} />
        </a>
      </div>
    </section>
  );
}
