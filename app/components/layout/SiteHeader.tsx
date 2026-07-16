"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { emailAddress, emailHref, navigation, phoneHref, phoneNumber } from "../../data/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which story chapter is in view for the stitched active state.
  useEffect(() => {
    const sections = navigation.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Light-on-dark treatment while floating over carbon scenes. Overlap is
  // tracked per section — adjacent dark scenes hand off without a flash.
  useEffect(() => {
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-dark]"));
    if (darkSections.length === 0) return;
    const headerHeight = 76;
    const overlapping = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top <= headerHeight) {
            overlapping.add(entry.target);
          } else {
            overlapping.delete(entry.target);
          }
        });
        setOverDark(overlapping.size > 0);
      },
      { rootMargin: `0px 0px -${Math.max(window.innerHeight - headerHeight, 0)}px 0px`, threshold: 0 },
    );
    darkSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu behaviour: Escape closes, outside pointer closes, body scroll locks.
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const headerClass = [
    "site-header",
    scrolled ? "is-scrolled" : "",
    overDark || menuOpen ? "is-over-dark" : "",
    menuOpen ? "is-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <a className="brand-link" href="#top" aria-label="Word of Mouth home">
          <Image
            src="/brand/word-of-mouth-logo-black.svg"
            alt="Word of Mouth"
            width={1200}
            height={220}
            priority
            className="brand-logo brand-logo-dark"
          />
          <Image
            src="/brand/word-of-mouth-logo-white.svg"
            alt=""
            aria-hidden="true"
            width={1200}
            height={220}
            className="brand-logo brand-logo-light"
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={`stitch-link${active === item.id ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/#contact">
          Get a Quote <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
        </Link>

        <div className="menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
            <span className="menu-toggle-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>

          <nav id="site-menu" aria-label="Site menu" className="site-menu" hidden={!menuOpen}>
            <ol className="site-menu-links">
              {navigation.map((item, index) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active === item.id ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
            <div className="site-menu-foot">
              <Link href="/#contact" className="button button-signal" onClick={() => setMenuOpen(false)}>
                Get a Quote <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
              <div className="site-menu-contact">
                <a href={emailHref}>{emailAddress}</a>
                <a href={phoneHref}>{phoneNumber}</a>
              </div>
            </div>
            <Image
              src="/collage/parrot-ink-b.webp"
              alt=""
              width={560}
              height={584}
              className="site-menu-parrot"
              aria-hidden="true"
              loading="lazy"
              unoptimized
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
