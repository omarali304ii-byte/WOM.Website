import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  addressLine,
  emailAddress,
  emailHref,
  mapsHref,
  navigation,
  partnerBadges,
  phoneHref,
  phoneNumber,
  services,
  socialLinks,
} from "../../data/site";
import { ThreadKnot } from "../art/collage";

/** The sign-off: the red thread ties off next to the perched brand mark. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-thread" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" focusable="false">
          <path d="M-10 20 C 300 70 640 30 900 58 C 1080 77 1260 60 1450 74" stroke="var(--signal)" strokeWidth="2" fill="none" strokeDasharray="7 9" />
        </svg>
        <ThreadKnot className="footer-knot" />
        <Image
          src="/collage/parrot-badge.webp"
          alt=""
          width={560}
          height={591}
          className="footer-badge-sticker"
          loading="lazy"
          unoptimized
        />
      </div>

      <div className="page-container footer-inner">
        <div className="footer-brand">
          <Image
            src="/brand/word-of-mouth-logo-white.svg"
            alt="Word of Mouth"
            width={1200}
            height={220}
            className="footer-logo"
          />
          <p className="footer-line">
            Word of Mouth is a full-service digital marketing agency helping businesses
            strengthen their brands, reach the right audiences, and build more effective
            digital growth systems.
          </p>
          <Link className="button button-signal footer-cta" href="/#contact">
            Get a Quote <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <div className="footer-badges" aria-label="Partner credentials">
            {partnerBadges.map((badge) => <span className="footer-badge" key={badge}>{badge}</span>)}
          </div>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <h2>Navigate</h2>
          {navigation.map((item) => <Link key={item.id} href={item.href}>{item.label}</Link>)}
          <Link href="/work">All Projects</Link>
        </nav>

        <nav className="footer-column footer-services" aria-label="Services">
          <h2>Services</h2>
          {services.map((service) => <Link key={service.title} href="/#services">{service.title}</Link>)}
        </nav>

        <div className="footer-column footer-contact">
          <h2>Contact</h2>
          <a href={emailHref}>{emailAddress}</a>
          <a href={phoneHref}>{phoneNumber}</a>
          <a href={mapsHref} target="_blank" rel="noopener noreferrer">
            {addressLine} <ArrowUpRight aria-hidden="true" size={14} />
          </a>
          <div className="footer-socials" aria-label="Social media">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-meta">
          <span className="footer-stamp">Made in Cairo — heard everywhere.</span>
          <span>© {new Date().getFullYear()} Word of Mouth. All rights reserved.</span>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
