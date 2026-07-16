"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";

let registered = false;

/** Registers GSAP plugins exactly once, browser-only. */
export function ensureGsap(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return gsap;
}

/** Media conditions shared by every scene so the whole site breathes together. */
export const MEDIA = {
  /** Full choreography: pointer-first viewports with motion allowed. */
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  /** Wide, tall viewports that can support a cinematic pinned canvas. */
  cinematic:
    "(min-width: 1024px) and (min-height: 640px) and (min-aspect-ratio: 134/100) and (prefers-reduced-motion: no-preference)",
  /** Recomposed, lighter choreography for small screens with motion allowed. */
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  /** Everything settles into its final readable state. */
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export type SceneMedia = {
  isDesktop: boolean;
  cinematic: boolean;
  isMobile: boolean;
  reduced: boolean;
};

type SceneBuilder<T extends HTMLElement> = (
  root: T,
  media: SceneMedia,
  g: typeof gsap,
) => void | (() => void);

/**
 * Runs a GSAP scene inside `gsap.matchMedia`, scoped to the returned ref.
 * The builder re-runs whenever a media condition flips; everything it
 * creates is reverted automatically on cleanup, so scenes never leak
 * tweens, ScrollTriggers, or listeners.
 */
export function useScene<T extends HTMLElement>(builder: SceneBuilder<T>) {
  const ref = useRef<T | null>(null);
  const builderRef = useRef(builder);

  useEffect(() => {
    builderRef.current = builder;
  });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const g = ensureGsap();
    const mm = g.matchMedia(root);

    mm.add(
      {
        isDesktop: MEDIA.desktop,
        cinematic: MEDIA.cinematic,
        isMobile: MEDIA.mobile,
        reduced: MEDIA.reduced,
      },
      (context) => {
        const conditions = context.conditions as SceneMedia | undefined;
        return builderRef.current(
          root,
          {
            isDesktop: Boolean(conditions?.isDesktop),
            cinematic: Boolean(conditions?.cinematic),
            isMobile: Boolean(conditions?.isMobile),
            reduced: Boolean(conditions?.reduced),
          },
          g,
        );
      },
    );

    return () => mm.revert();
  }, []);

  return ref;
}

/** Splits a headline element into masked line wrappers for staggered reveals. */
export function maskLines(root: HTMLElement, selector: string): HTMLElement[] {
  const lines = Array.from(root.querySelectorAll<HTMLElement>(selector));
  lines.forEach((line) => line.classList.add("mask-line"));
  return lines;
}
