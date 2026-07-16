import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ScrollProgress } from "../../components/layout/ScrollProgress";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { projects } from "../../data/site";
import styles from "../work.module.css";

type WorkCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found | Word of Mouth" };
  }

  return {
    title: `${project.name} — ${project.discipline} | Word of Mouth`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.discipline}`,
      description: project.summary,
      type: "article",
      images: [
        {
          url: project.image,
          width: project.width,
          height: project.height,
          alt: `${project.name} — ${project.discipline} project by Word of Mouth`,
        },
      ],
    },
  };
}

export default async function WorkCaseStudyPage({ params }: WorkCaseStudyPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const projectFacts = [
    { label: "Industry", value: project.industry },
    { label: "Service category", value: project.discipline },
  ].filter((fact) => fact.value.trim().length > 0);
  // The hero already shows the summary; an overview that merely repeats it
  // verbatim would make the page read thinner, so it is dropped.
  const overview =
    project.overview.trim() === project.summary.trim() ? "" : project.overview;
  const story = [
    { label: "Project overview", heading: "The project", copy: overview },
    { label: "Client challenge", heading: "The challenge", copy: project.challenge },
    { label: "Strategic approach", heading: "The approach", copy: project.approach },
    {
      label: "Creative direction",
      heading: "The creative direction",
      copy: project.creativeDirection,
    },
    { label: "Final solution", heading: "The solution", copy: project.solution },
  ].filter((section) => section.copy.trim().length > 0);

  return (
    <div className={`site-shell ${styles.routeShell}`}>
      <a className="skip-link" href="#case-study-content">
        Skip to content
      </a>

      <SiteHeader />
      <ScrollProgress />

      <main id="case-study-content" className={styles.caseMain}>
        <article>
          <header className={styles.caseHero} id="top">
            <div className="page-container">
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link href="/#top">Home</Link>
                  </li>
                  <li>
                    <Link href="/#work">Work</Link>
                  </li>
                  <li aria-current="page">{project.name}</li>
                </ol>
              </nav>

              <div className={styles.caseHeroGrid}>
                <div>
                  <p className={styles.eyebrow}>
                    <span aria-hidden="true" /> {project.discipline}
                  </p>
                  <h1>{project.name}</h1>
                </div>
                <div className={styles.caseIntro}>
                  <p>{project.summary}</p>
                  <dl className={styles.projectFacts}>
                    {projectFacts.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </header>

          <figure className={styles.caseVisual} data-header-dark>
            <div className="page-container">
              <Image
                src={project.image}
                alt={`${project.name} — ${project.discipline} project by Word of Mouth`}
                width={project.width}
                height={project.height}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1530px) calc(100vw - 48px), 1480px"
                priority
                unoptimized
              />
            </div>
          </figure>

          <div className={styles.caseBody}>
            <div className="page-container">
              <div className={styles.caseBodyHeading}>
                <p className={styles.eyebrow}>
                  <span aria-hidden="true" /> Case study
                </p>
                <h2>Clear thinking, shaped into real work.</h2>
              </div>

              <div className={styles.storyBlocks}>
                {story.map((section, index) => (
                  <section
                    className={styles.storyBlock}
                    key={section.label}
                    aria-labelledby={`case-section-${index}`}
                  >
                    <p className={styles.storyLabel}>
                      {String(index + 1).padStart(2, "0")} / {section.label}
                    </p>
                    <div>
                      <h3 id={`case-section-${index}`}>{section.heading}</h3>
                      <p>{section.copy}</p>
                    </div>
                  </section>
                ))}
              </div>

              <section className={styles.servicesDelivered} aria-labelledby="services-delivered-heading">
                <div>
                  <p className={styles.storyLabel}>Services delivered</p>
                  <h2 id="services-delivered-heading">What the project brought together</h2>
                </div>
                <ul>
                  {project.servicesDelivered.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>

        {relatedProjects.length > 0 ? (
          <section className={styles.related} aria-labelledby="related-heading">
            <div className="page-container">
              <div className={styles.relatedHeader}>
                <div>
                  <p className={styles.eyebrow}>
                    <span aria-hidden="true" /> More work
                  </p>
                  <h2 id="related-heading">Explore more work</h2>
                </div>
                <Link className={styles.textLink} href="/#work">
                  View all projects <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
              </div>

              <ul className={styles.relatedGrid}>
                {relatedProjects.map((related) => (
                  <li key={related.slug}>
                    <Link
                      className={styles.relatedCard}
                      href={`/work/${related.slug}`}
                      aria-label={`View the ${related.name} case study`}
                    >
                      <div className={styles.relatedImage}>
                        <Image
                          src={related.image}
                          alt=""
                          width={related.width}
                          height={related.height}
                          sizes="(max-width: 767px) calc(100vw - 40px), 31vw"
                          unoptimized
                        />
                      </div>
                      <span>{related.discipline}</span>
                      <h3>{related.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={styles.projectCta} data-header-dark aria-labelledby="case-cta-heading">
          <div className={`page-container ${styles.ctaInner}`}>
            <Link className={styles.backLinkLight} href="/#work">
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.7} />
              Back to selected work
            </Link>
            <p className={styles.eyebrowLight}>
              <span aria-hidden="true" /> Start a conversation
            </p>
            <h2 id="case-cta-heading">Have a similar project? Let&apos;s build it together.</h2>
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
