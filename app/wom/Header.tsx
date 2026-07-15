"use client";

import { useEffect, useState } from "react";

const NAV = [
  { id: "s1-message", label: "Message" },
  { id: "s2-voice", label: "Voice" },
  { id: "s4-direction", label: "Direction" },
  { id: "s5-system", label: "System" },
  { id: "s7-proof", label: "Work" },
  { id: "s8-process", label: "Process" },
];

export function Header({
  theme,
  activeIndex,
}: {
  theme: "light" | "dark";
  activeIndex: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = theme === "dark";
  const ink = dark ? "text-canvas-light" : "text-ink";
  const border = dark ? "border-canvas-light/10" : "border-ink/10";
  const bg = scrolled
    ? dark
      ? "bg-carbon/70 backdrop-blur-md"
      : "bg-canvas/70 backdrop-blur-md"
    : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b ${border} ${bg} transition-colors duration-500 ${ink}`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        <a href="#s1-message" className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-signal">
            <path d="M4 12c4-8 12-8 16 0-4 8-12 8-16 0z" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="15" cy="11" r="1.4" fill="currentColor" />
          </svg>
          <span className="text-[13px] font-bold uppercase tracking-[0.22em]">
            Word of Mouth
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item, i) => {
            const active = activeIndex >= indexFor(item.id) - 0 && activeIndex <= indexFor(item.id);
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.22em] opacity-80 transition hover:opacity-100"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-1 w-1 rounded-full transition ${
                      active ? "bg-signal" : "bg-transparent"
                    }`}
                  />
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        <a
          href="#s9-invitation"
          className={`group inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] transition ${
            dark
              ? "bg-canvas-light text-ink hover:bg-signal hover:text-canvas-light"
              : "bg-ink text-canvas-light hover:bg-signal"
          }`}
        >
          <span className="h-1 w-1 rounded-full bg-signal group-hover:bg-canvas-light" />
          Start a project
        </a>
      </div>
    </header>
  );
}

function indexFor(id: string): number {
  const map: Record<string, number> = {
    "s1-message": 0,
    "s2-voice": 1,
    "s3-noise": 2,
    "s4-direction": 3,
    "s5-system": 4,
    "s6-movement": 5,
    "s7-proof": 6,
    "s8-process": 7,
    "s9-invitation": 8,
  };
  return map[id] ?? 0;
}

