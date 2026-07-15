"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const Parrot3D = lazy(() => import("./Parrot3D").then((module) => ({ default: module.Parrot3D })));

export function ParrotStage({ sceneIndex, sceneProgress }: { sceneIndex: number; sceneProgress: number }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
      <Suspense fallback={null}><Parrot3D sceneIndex={sceneIndex} sceneProgress={sceneProgress} /></Suspense>
    </div>
  );
}
