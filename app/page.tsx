import { ScrollProgress } from "./components/layout/ScrollProgress";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { TearSeam } from "./components/art/collage";
import { CharacterScene } from "./components/sections/CharacterScene";
import { ContactScene } from "./components/sections/ContactScene";
import { FlightPlan } from "./components/sections/FlightPlan";
import { HeroPoster } from "./components/sections/HeroPoster";
import { IdeaScene } from "./components/sections/IdeaScene";
import { InsightsJournal } from "./components/sections/InsightsJournal";
import { ProofWall } from "./components/sections/ProofWall";
import { ServiceCards } from "./components/sections/ServiceCards";
import { WorkBoards } from "./components/sections/WorkBoards";
import {
  addressLine,
  emailAddress,
  phoneNumber,
  regions,
  services,
  socialLinks,
  websiteUrl,
} from "./data/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Word of Mouth",
    url: websiteUrl,
    email: emailAddress,
    telephone: phoneNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: addressLine,
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    slogan: "Word of Mouth.",
    areaServed: regions.map((region) => region.name),
    serviceType: services.map((service) => service.title),
    sameAs: socialLinks.map((social) => social.href),
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <SiteHeader />
      <ScrollProgress />

      <main id="main-content">
        {/* Act I — carbon: the poster wall and the printed proof. */}
        <HeroPoster />
        <ProofWall />

        {/* Act II — paper: the idea and the manifesto. */}
        <TearSeam tone="paper" />
        <IdeaScene />

        {/* Act III — carbon: the character. */}
        <TearSeam tone="carbon" />
        <CharacterScene />

        {/* Act IV — paper: the system that does the work. */}
        <TearSeam tone="paper" />
        <ServiceCards />

        {/* Act V — carbon: the boards. */}
        <TearSeam tone="carbon" />
        <WorkBoards />

        {/* Act VI — paper: the route and the field notes. */}
        <TearSeam tone="paper" />
        <FlightPlan />
        <InsightsJournal />

        {/* Act VII — carbon: the brief and the sign-off. */}
        <TearSeam tone="carbon" />
        <ContactScene />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
