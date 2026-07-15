"use client";

import { useEffect, useState } from "react";
import { Header } from "./wom/Header";
import { ParrotStage } from "./wom/ParrotStage";
import { S1Message, S2Voice, S3Noise, S4Direction, S5System, S6Movement, S7Proof, S8Process, S9Invitation } from "./wom/Scenes";

const SCENES = ["s1-message", "s2-voice", "s3-noise", "s4-direction", "s5-system", "s6-movement", "s7-proof", "s8-process", "s9-invitation"];

export function BirdExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const viewport = window.innerHeight;
      const center = viewport * 0.5;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      SCENES.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.5 - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });
      const active = document.getElementById(SCENES[bestIndex]);
      if (active) {
        const rect = active.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
        setSceneProgress(progress);
        setTheme(active.dataset.theme === "dark" ? "dark" : "light");
      }
      setActiveIndex(bestIndex);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative bg-canvas text-ink">
      <Header theme={theme} activeIndex={activeIndex} />
      <ParrotStage sceneIndex={activeIndex} sceneProgress={sceneProgress} />
      <main className="relative z-10">
        <S1Message />
        <S2Voice />
        <S3Noise />
        <S4Direction />
        <S5System />
        <S6Movement />
        <S7Proof />
        <S8Process />
        <S9Invitation />
        <footer className="relative z-10 border-t border-ink/10 bg-canvas px-6 py-10 lg:px-16">
          <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 text-[11px] uppercase tracking-[0.22em] text-muted-ink md:flex-row md:items-center">
            <div className="flex items-center gap-3 text-ink"><span className="h-1 w-1 rounded-full bg-signal" /><span className="font-bold">Word of Mouth</span><span className="text-muted-ink">— Strategy · Design · Motion</span></div>
            <div className="flex items-center gap-6"><span>© 2026</span><span>hello@wordofmouth.studio</span></div>
          </div>
        </footer>
      </main>
    </div>
  );
}
