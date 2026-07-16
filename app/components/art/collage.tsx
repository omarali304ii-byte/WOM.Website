/**
 * Physical collage furniture for the campaign wall: torn-paper seams between
 * dark and light scenes, tape strips, and hand-drawn connector arrows.
 * Pure SVG/CSS, server-safe, always decorative (aria-hidden at usage sites).
 */

type SeamProps = {
  /** Color of the scene BELOW the seam (the paper being revealed). */
  tone: "paper" | "carbon";
  className?: string;
};

// One deterministic torn edge, authored by hand — irregular enough to read
// as a tear, gentle enough to stay premium.
const TEAR_PATH =
  "M0 44 L38 36 L74 46 L120 30 L168 42 L214 26 L266 44 L318 32 L372 48 L430 30 L484 40 L540 26 L596 44 L648 34 L706 48 L764 30 L820 42 L878 28 L934 46 L992 34 L1048 46 L1104 28 L1160 40 L1214 30 L1272 46 L1330 34 L1388 44 L1440 30 L1440 90 L0 90 Z";

/** A torn-paper seam between scenes: the next scene's paper tears over the
 * previous scene's surface. `tone` is the color of the scene BELOW. */
export function TearSeam({ tone, className }: SeamProps) {
  return (
    <div
      className={`tear-seam${className ? ` ${className}` : ""}`}
      style={{ background: tone === "paper" ? "var(--carbon)" : "var(--paper)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" focusable="false">
        <path d={TEAR_PATH} fill={tone === "paper" ? "var(--paper)" : "var(--carbon)"} />
      </svg>
    </div>
  );
}

/** A strip of translucent kraft tape. Rotate/position via className. */
export function Tape({ className, light = false }: { className?: string; light?: boolean }) {
  return <span className={`tape${light ? " tape-light" : ""}${className ? ` ${className}` : ""}`} aria-hidden="true" />;
}

/** Small hand-drawn arrow used beside handwritten wall notes. */
export function HandArrow({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 90 50"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        className="hand-arrow-path"
        d="M4 8 C 30 4 58 10 78 34 M78 34 L64 28 M78 34 L74 20"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small stitched cross, the thread's tie-off knot. */
export function ThreadKnot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M5 5 L23 23 M23 5 L5 23" stroke="var(--signal)" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="12.5" stroke="var(--signal)" strokeWidth="1.4" opacity="0.45" />
    </svg>
  );
}
