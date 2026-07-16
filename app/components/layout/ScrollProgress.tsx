"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Thin signal-red page progress line under the header, plus the global
 * ScrollTrigger refresh once fonts and images settle so pinned scene
 * measurements stay correct.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const g = ensureGsap();

    g.set(bar, { scaleX: 0 });
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => g.set(bar, { scaleX: self.progress }),
      onRefresh: (self) => g.set(bar, { scaleX: self.progress }),
    });

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      trigger.kill();
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
}
