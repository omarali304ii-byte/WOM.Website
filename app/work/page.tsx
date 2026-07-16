import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ScrollProgress } from "../components/layout/ScrollProgress";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { projects } from "../data/site";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Selected work | Word of Mouth",
  description:
    "Selected Word of Mouth projects across branding, websites, social media, and media production.",
};

export default function WorkPage() {
  return (
    <div className={`site-shell ${styles.routeShell}`}>
      <a className="skip-link" href="#work-content">
        Skip to content
      </a>

      <SiteHeader />
      <ScrollProgress />

      <main id="work-content" className={styles.indexMain}>
        <section className={styles.indexHero} id="top" aria-labelledby="work-heading">
          <div className={`page-container ${styles.heroGrid}`}>
            <div>
              <Link className={styles.backLink} href="/#work">
                <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.7} />
                Back to the homepage
              </Link>
              <p className={styles.eyebrow}>
                <span aria-hidden="true" /> Our Work
              </p>
              <h1 id="work-heading">Work built to elevate brands and solve real business challenges.</h1>
            </div>
            <p className={styles.heroCopy}>
              Explore selected projects across branding, websites, social media, and media
              production. Each project presents the challenge, creative direction, delivered
              solution, and final outcome whenever that information is available.
            </p>
          </div>
        </section>

        <section className={styles.indexProjects} aria-label="Selected projects">
          <div className="page-container">
            <ul className={styles.workGrid}>
              {projects.map((project, index) => (
                <li className={styles.workItem} key={project.slug}>
                  <Link
                    className={styles.workCard}
                    href={`/work/${project.slug}`}
                    aria-label={`View the ${project.name} case study`}
                  >
                    <div className={styles.cardImage}>
                      <Image
                        src={project.image}
                        alt={`${project.name} — ${project.discipline} project by Word of Mouth`}
                        width={project.width}
                        height={project.height}
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1200px) 46vw, 700px"
                        unoptimized
                      />
                      <span className={styles.cardNumber} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span>{project.discipline}</span>
                        <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.7} />
                      </div>
                      <h2>{project.name}</h2>
                      <p>{project.summary}</p>
                      <span className={styles.cardAction}>View case study</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.projectCta} data-header-dark aria-labelledby="work-cta-heading">
          <div className={`page-container ${styles.ctaInner}`}>
            <p className={styles.eyebrowLight}>
              <span aria-hidden="true" /> Let&apos;s collaborate
            </p>
            <h2 id="work-cta-heading">Have a similar project? Let&apos;s build it together.</h2>
            <Link className={styles.lightButton} href="/#contact">
              Get a Quote <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
