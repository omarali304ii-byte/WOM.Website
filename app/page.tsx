import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail, MoveRight } from "lucide-react";

const services = [
  {
    index: "01",
    title: "Strategy",
    copy: "A clear position, a useful story, and a practical route from where the brand is now to where it needs to go.",
    items: ["Research & insight", "Positioning", "Naming & narrative", "Launch strategy"],
  },
  {
    index: "02",
    title: "Identity",
    copy: "A distinctive visual and verbal system that makes every touchpoint feel recognizably yours.",
    items: ["Visual identity", "Verbal identity", "Brand guidelines", "Campaign systems"],
  },
  {
    index: "03",
    title: "Digital",
    copy: "Fast, focused websites and digital experiences that turn the brand idea into something people can use.",
    items: ["Marketing websites", "Digital art direction", "Product storytelling", "Interactive launches"],
  },
  {
    index: "04",
    title: "Motion",
    copy: "A motion language that gives the identity pace, personality, and a stronger presence in the feed and beyond.",
    items: ["Motion identity", "Brand films", "Launch content", "Social systems"],
  },
];

const process = [
  { number: "01", name: "Listen", copy: "We learn the business, the audience, and the moment the brand is stepping into." },
  { number: "02", name: "Define", copy: "We isolate the strongest truth and turn it into a position the whole team can use." },
  { number: "03", name: "Design", copy: "We build one connected identity across language, visuals, digital, and motion." },
  { number: "04", name: "Activate", copy: "We equip the team to launch consistently, measure what lands, and keep moving." },
];

const faq = [
  {
    question: "Who do you work with?",
    answer: "Founders, marketing teams, and established businesses at a point of change: launching, repositioning, or scaling into a bigger opportunity.",
  },
  {
    question: "What is the best place to start?",
    answer: "Usually with a focused strategy phase. It gives the identity, website, and launch work one clear idea to build from instead of a collection of disconnected deliverables.",
  },
  {
    question: "Can you take a brand from strategy through launch?",
    answer: "Yes. We can lead the full system or focus on the stage where your team needs the most leverage, then hand over practical tools that are built to be used.",
  },
  {
    question: "Do you work internationally?",
    answer: "Yes. Our process is designed for close remote collaboration, clear decision points, and focused working sessions across locations and time zones.",
  },
];

const emailHref =
  "mailto:hello@wordofmouth.studio?subject=New%20project%20enquiry&body=Hello%20Word%20of%20Mouth%2C%0A%0AHere%20is%20a%20little%20about%20the%20project%3A%0A%0A";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Word of Mouth",
    url: "https://wordofmouth.studio",
    email: "hello@wordofmouth.studio",
    slogan: "Make your brand the one people talk about.",
    areaServed: "Worldwide",
    serviceType: ["Brand strategy", "Brand identity", "Web design", "Motion design"],
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand-link" href="#top" aria-label="Word of Mouth home">
            <Image
              src="/brand/word-of-mouth-logo-black.svg"
              alt="Word of Mouth"
              width={1200}
              height={220}
              priority
              className="brand-logo"
            />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#about">Why us</a>
          </nav>

          <a className="header-cta" href={emailHref}>
            Start a project <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>

          <details className="mobile-menu">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation">
              <a href="#services">Services</a>
              <a href="#approach">Approach</a>
              <a href="#about">Why us</a>
              <a href={emailHref}>Start a project</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

          <div className="page-container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Independent brand studio</p>
              <h1>Make your brand the one people <em>talk about.</em></h1>
              <p className="hero-lede">
                We find the signal, sharpen the story, and build the identity and digital system that moves it through the world.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href={emailHref}>
                  Start a project <ArrowUpRight aria-hidden="true" size={18} />
                </a>
                <a className="text-link" href="#approach">
                  See how we work <ArrowDown aria-hidden="true" size={16} />
                </a>
              </div>
            </div>

            <div className="signal-board" aria-label="How Word of Mouth turns a brand signal into movement">
              <div className="board-index">WOM / 001</div>
              <div className="board-route" aria-hidden="true">
                <span className="route-line" />
                <span className="route-dot dot-one" />
                <span className="route-dot dot-two" />
                <span className="route-dot dot-three" />
              </div>
              <div className="board-step step-one">
                <span>The signal</span>
                <strong>Your strongest truth</strong>
              </div>
              <div className="board-step step-two">
                <span>The system</span>
                <strong>Strategy + identity + digital</strong>
              </div>
              <div className="board-step step-three">
                <span>The movement</span>
                <strong>A brand people remember and repeat</strong>
              </div>
              <div className="board-stamp">Strategy · Design · Motion</div>
            </div>
          </div>

          <div className="page-container hero-footer">
            <span>Clear thinking</span><i />
            <span>Distinctive identity</span><i />
            <span>Connected execution</span>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="page-container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow eyebrow-light"><span /> What we build</p>
                <h2>One idea.<br />One connected <em>system.</em></h2>
              </div>
              <p>
                Strategy is only useful when people can see it, feel it, and act on it. We connect every discipline around one sharp brand idea.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <span className="service-index">{service.index}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="page-container">
            <div className="approach-intro">
              <p className="eyebrow"><span /> How we work</p>
              <h2>From signal<br />to <em>movement.</em></h2>
              <p>Focused enough to move quickly. Structured enough to make the important decisions well.</p>
            </div>

            <ol className="process-list">
              {process.map((step) => (
                <li key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.name}</h3>
                  <p>{step.copy}</p>
                  <MoveRight aria-hidden="true" size={24} strokeWidth={1.5} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="difference-section" id="about">
          <div className="page-container difference-layout">
            <div className="difference-copy">
              <p className="eyebrow eyebrow-light"><span /> Why Word of Mouth</p>
              <h2>Good branding is not decoration.</h2>
              <p className="difference-lede">It changes how quickly people understand you, how clearly they remember you, and how confidently your team shows up.</p>
              <a className="button button-light" href={emailHref}>
                Tell us what is changing <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>

            <div className="outcome-stack">
              <article>
                <span>01 / Clarity</span>
                <h3>Easier to explain.</h3>
                <p>A position and story your team can repeat without turning it into a presentation.</p>
              </article>
              <article>
                <span>02 / Distinction</span>
                <h3>Harder to confuse.</h3>
                <p>A recognizable voice and visual system designed to belong to your brand alone.</p>
              </article>
              <article>
                <span>03 / Momentum</span>
                <h3>Ready to move.</h3>
                <p>Practical tools that make better, faster execution possible after the launch.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="moments-section">
          <div className="page-container">
            <div className="section-heading moments-heading">
              <p className="eyebrow"><span /> Built for change</p>
              <h2>For the moments that<br />change the <em>conversation.</em></h2>
            </div>
            <div className="moment-grid">
              <article><span>01</span><h3>Launching</h3><p>A new business, product, or idea needs a position people understand from day one.</p></article>
              <article><span>02</span><h3>Repositioning</h3><p>The business has changed, but the brand is still telling yesterday&apos;s story.</p></article>
              <article><span>03</span><h3>Scaling</h3><p>Growth needs a clearer system so every new touchpoint strengthens the same brand.</p></article>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="page-container faq-layout">
            <div>
              <p className="eyebrow"><span /> Common questions</p>
              <h2>Before we<br /><em>begin.</em></h2>
            </div>
            <div className="faq-list">
              {faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-grid" aria-hidden="true" />
          <div className="page-container contact-inner">
            <p className="eyebrow eyebrow-light"><span /> Start a conversation</p>
            <h2>Have something<br />worth <em>saying?</em></h2>
            <p>Tell us what is changing, what is stuck, or what you are ready to build. We will reply with a clear next step.</p>
            <a className="contact-link" href={emailHref}>
              <Mail aria-hidden="true" size={24} strokeWidth={1.5} />
              hello@wordofmouth.studio
              <ArrowUpRight aria-hidden="true" size={32} strokeWidth={1.5} />
            </a>
            <span className="contact-note">Project enquiries · We reply within two business days</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-inner">
          <Image
            src="/brand/word-of-mouth-logo-white.svg"
            alt="Word of Mouth"
            width={1200}
            height={220}
            className="footer-logo"
          />
          <p>Strategy · Design · Motion</p>
          <div className="footer-meta">
            <a href={emailHref}>hello@wordofmouth.studio</a>
            <span>© {new Date().getFullYear()} Word of Mouth</span>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
