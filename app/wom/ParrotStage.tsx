"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Parrot3D = lazy(() => import("./Parrot3D").then((module) => ({ default: module.Parrot3D })));

const SCENE_IDS = ["s1-message", "s2-voice", "s3-noise", "s4-direction", "s5-system", "s6-movement", "s7-proof", "s8-process", "s9-invitation"];
const CAPTIONS = ["Carrying the signal", "Listening for a voice", "Cutting through noise", "Following the route", "Connecting the system", "Moving the message", "Landing on proof", "Working the process", "Ready to talk"];

type ActorPosition = { x: number; y: number; visible: boolean; mode: "path" | "perch" };

function pointOnPath(path: SVGPathElement, progress: number) {
  const length = path.getTotalLength();
  const point = path.getPointAtLength(Math.max(0, Math.min(1, progress)) * length);
  const matrix = path.getScreenCTM();
  if (!matrix) return null;
  const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
  return { x: screenPoint.x, y: screenPoint.y };
}

export function ParrotStage({ sceneIndex, sceneProgress }: { sceneIndex: number; sceneProgress: number }) {
  const [enabled, setEnabled] = useState(false);
  const [reacting, setReacting] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const [position, setPosition] = useState<ActorPosition>({ x: 0, y: 0, visible: false, mode: "perch" });
  const previousScene = useRef(sceneIndex);
  const reactionTimer = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (previousScene.current === sceneIndex) return;
    previousScene.current = sceneIndex;
    setTransferring(true);
    const timer = window.setTimeout(() => setTransferring(false), 640);
    return () => window.clearTimeout(timer);
  }, [sceneIndex]);

  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scene = document.getElementById(SCENE_IDS[sceneIndex]);
      if (!scene) return;
      const clampX = (value: number) => Math.max(width < 640 ? 72 : 110, Math.min(width - (width < 640 ? 72 : 110), value));
      const clampY = (value: number) => Math.max(width < 640 ? 82 : 105, Math.min(height - (width < 640 ? 82 : 105), value));
      let x = width * 0.76;
      let y = height * 0.43;
      let mode: ActorPosition["mode"] = "perch";

      if (sceneIndex === 0 || sceneIndex === 1) {
        const name = sceneIndex === 0 ? "message" : "voice";
        const mark = scene.querySelector<HTMLElement>(`[data-parrot-mark="${name}"]`);
        if (mark) {
          const rect = mark.getBoundingClientRect();
          x = rect.left;
          y = rect.top;
        }
      } else if (sceneIndex === 2) {
        mode = "path";
        x = width * (0.82 - sceneProgress * 0.58);
        y = height * (0.3 + Math.sin(sceneProgress * Math.PI) * 0.28);
      } else if (sceneIndex === 3 || sceneIndex === 5) {
        mode = "path";
        const kind = sceneIndex === 3 ? "direction" : "movement";
        const path = scene.querySelector<SVGPathElement>(`[data-parrot-path="${kind}"]`);
        const point = path ? pointOnPath(path, sceneProgress) : null;
        if (point) {
          x = point.x;
          y = point.y - (width < 640 ? 38 : 58);
        }
      } else if (sceneIndex === 4 || sceneIndex === 6 || sceneIndex === 7) {
        const kind = sceneIndex === 4 ? "system" : sceneIndex === 6 ? "proof" : "process";
        const stops = Array.from(scene.querySelectorAll<HTMLElement>(`[data-parrot-stop="${kind}"]`));
        if (stops.length) {
          const index = Math.min(stops.length - 1, Math.floor(sceneProgress * stops.length));
          const rect = stops[index].getBoundingClientRect();
          x = sceneIndex === 6 ? rect.right - 60 : rect.left + rect.width * 0.5;
          y = sceneIndex === 6 ? rect.top + 58 : rect.top - 48;
        }
      } else if (sceneIndex === 8) {
        const form = scene.querySelector<HTMLElement>("[data-parrot-mark=\"invitation\"]");
        if (form) {
          const rect = form.getBoundingClientRect();
          x = rect.right - (width < 640 ? 58 : 82);
          y = rect.top + (width < 640 ? 26 : 8);
        }
      }

      setPosition({ x: clampX(x), y: clampY(y), visible: true, mode });
    });
    return () => cancelAnimationFrame(frame);
  }, [sceneIndex, sceneProgress]);

  useEffect(() => () => window.clearTimeout(reactionTimer.current), []);

  const react = () => {
    window.clearTimeout(reactionTimer.current);
    setReacting(true);
    reactionTimer.current = window.setTimeout(() => setReacting(false), 1900);
  };

  if (!enabled) return null;
  return (
    <div
      className={`parrot-actor ${position.visible ? "is-visible" : ""} ${transferring ? "is-transfer" : position.mode === "path" ? "is-path" : "is-perch"} ${sceneIndex === 2 ? "on-dark" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      aria-live="polite"
    >
      <span className="parrot-signal-tail" aria-hidden="true" />
      <Suspense fallback={null}><Parrot3D sceneIndex={sceneIndex} sceneProgress={sceneProgress} reacting={reacting} /></Suspense>
      <button type="button" className="parrot-hit" onClick={react} aria-label="Let the Word of Mouth parrot react" />
      <span className="parrot-caption"><i />{reacting ? "Signal received" : CAPTIONS[sceneIndex]}</span>
    </div>
  );
}
