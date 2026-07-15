"use client";

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";

const Parrot3D = lazy(() => import("./Parrot3D").then((module) => ({ default: module.Parrot3D })));

type FlightPoint = readonly [number, number];

// One continuous route through the viewport. Every scene owns a single leg,
// so forward and reverse scrolling always retrace the same natural flight.
const FLIGHT_POINTS: FlightPoint[] = [
  [0.77, 0.58],
  [0.60, 0.46],
  [0.25, 0.56],
  [0.72, 0.44],
  [0.34, 0.66],
  [0.76, 0.54],
  [0.24, 0.43],
  [0.68, 0.67],
  [0.31, 0.47],
  [0.73, 0.56],
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

export function ParrotStage({ sceneIndex, sceneProgress }: { sceneIndex: number; sceneProgress: number }) {
  const [mounted, setMounted] = useState(false);
  const [flying, setFlying] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(-1);
  const stopTimer = useRef(0);
  const previousProgress = useRef(sceneIndex + sceneProgress);

  useEffect(() => {
    setMounted(true);
    return () => window.clearTimeout(stopTimer.current);
  }, []);

  const position = useMemo(() => {
    const leg = clamp(sceneIndex, 0, FLIGHT_POINTS.length - 2);
    const progress = clamp(sceneProgress, 0, 1);
    const start = FLIGHT_POINTS[leg];
    const end = FLIGHT_POINTS[leg + 1];
    const arc = Math.sin(progress * Math.PI) * (leg % 2 === 0 ? 0.06 : 0.05);
    const current = Math.sin(progress * Math.PI * 2) * 0.014;

    return {
      x: mix(start[0], end[0], progress),
      y: clamp(mix(start[1], end[1], progress) - arc + current, 0.4, 0.72),
      horizontalTravel: end[0] - start[0],
    };
  }, [sceneIndex, sceneProgress]);

  useEffect(() => {
    const globalProgress = sceneIndex + sceneProgress;
    const scrollDirection = Math.sign(globalProgress - previousProgress.current);
    previousProgress.current = globalProgress;

    if (scrollDirection !== 0) {
      const horizontalDirection = Math.sign(position.horizontalTravel) * scrollDirection;
      if (horizontalDirection !== 0) setDirection(horizontalDirection > 0 ? 1 : -1);
      setFlying(true);
      window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => setFlying(false), 210);
    }
  }, [position.horizontalTravel, sceneIndex, sceneProgress]);

  if (!mounted) return null;

  return (
    <div
      className={`parrot-actor is-visible ${flying ? "is-flying" : "is-hovering"}`}
      style={{ left: `${position.x * 100}vw`, top: `${position.y * 100}vh` }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Parrot3D flying={flying} direction={direction} />
      </Suspense>
    </div>
  );
}
