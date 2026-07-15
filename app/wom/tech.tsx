"use client";

import type { CSSProperties, ReactNode } from "react";

export function Crosshair({
  className = "",
  size = 120,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={0.6}
    >
      <circle cx="60" cy="60" r="58" />
      <circle cx="60" cy="60" r="42" strokeDasharray="2 3" />
      <circle cx="60" cy="60" r="22" />
      <circle cx="60" cy="60" r="2" fill={color} />
      <line x1="0" y1="60" x2="14" y2="60" />
      <line x1="106" y1="60" x2="120" y2="60" />
      <line x1="60" y1="0" x2="60" y2="14" />
      <line x1="60" y1="106" x2="60" y2="120" />
    </svg>
  );
}

export function CornerTicks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M0 12 V0 H12" />
      <path d="M28 0 H40 V12" />
      <path d="M40 28 V40 H28" />
      <path d="M12 40 H0 V28" />
    </svg>
  );
}

export function DottedArc({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5">
      <path d="M10 180 Q 200 -60 390 180" />
    </svg>
  );
}

export function HatchPlane({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 400 120" className={className} fill="none" stroke="currentColor" strokeWidth={0.6}>
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform={flip ? "rotate(-45)" : "rotate(45)"}>
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <path d="M0 120 L120 40 L220 90 L320 20 L400 70 L400 120 Z" fill="url(#hatch)" opacity="0.7" />
      <path d="M0 120 L120 40 L220 90 L320 20 L400 70" />
    </svg>
  );
}

export function CoordDot({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {label && <span className="text-[10px] uppercase tracking-widest text-muted-ink">{label}</span>}
    </span>
  );
}

export function BlushDisc({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #f6d9cc 0%, #f2cfc1 40%, rgba(242,207,193,0) 72%)",
        ...style,
      }}
    />
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-eyebrow text-ink/70">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="text-signal">{index}</span>
      <span className="h-px w-8 bg-ink/30" />
      <span>{label}</span>
    </div>
  );
}

export function SceneShell({
  id,
  children,
  className = "",
  dark = false,
  min = "min-h-dvh",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  min?: string;
}) {
  return (
    <section
      id={id}
      data-scene={id}
      data-theme={dark ? "dark" : "light"}
      className={`relative ${min} w-full overflow-hidden grain ${
        dark ? "bg-carbon text-canvas-light" : "bg-canvas text-ink"
      } ${className}`}
    >
      {children}
    </section>
  );
}

