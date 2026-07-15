"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  Feather,
  Layers3,
  Menu,
  Route,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";

type SceneName = "hero" | "direction" | "system" | "movement" | "process";
type FlightMode = "hover" | "glide" | "survey" | "wingbeat" | "perch" | "transfer";

type FlightState = {
  scene: SceneName;
  progress: number;
  x: number;
  y: number;
  mode: FlightMode;
  activeIndex: number;
};

const sceneLabels: Record<SceneName, string> = {
  hero: "At the threshold",
  direction: "Following the signal",
  system: "Surveying the system",
  movement: "Moving with the journey",
  process: "Holding the next step",
};

const territoryData = [
  { id: "01", title: "Signal", copy: "Find the meaningful change before it becomes noise.", tone: "lime" },
  { id: "02", title: "Sense", copy: "Turn observation into a shared point of view.", tone: "blue" },
  { id: "03", title: "Shape", copy: "Give the strongest idea a clear, useful form.", tone: "coral" },
  { id: "04", title: "Scale", copy: "Build the system that lets good work travel.", tone: "violet" },
];

const processData = [
  { id: "01", verb: "Listen", meta: "Week 01", copy: "Observe the field, the people, and the friction without rushing to name the answer." },
  { id: "02", verb: "Frame", meta: "Week 02", copy: "Define the real question and the outcome that would make the work matter." },
  { id: "03", verb: "Make", meta: "Weeks 03–05", copy: "Prototype the whole experience, then sharpen the moments that carry the idea." },
  { id: "04", verb: "Release", meta: "Week 06", copy: "Put it into motion, learn from reality, and leave behind a system that can grow." },
];

function ParrotModel({ mode }: { mode: FlightMode }) {
  const bird = useRef<Group>(null);
  const head = useRef<Group>(null);
  const leftWing = useRef<Mesh>(null);
  const rightWing = useRef<Mesh>(null);
  const tail = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const energy = mode === "transfer" ? 12 : mode === "wingbeat" ? 8 : mode === "survey" ? 3 : 1.8;
    const amplitude = mode === "perch" ? 0.06 : mode === "glide" ? 0.13 : 0.42;
    if (bird.current) {
      const targetTilt = mode === "transfer" ? -0.28 : mode === "glide" ? -0.1 : mode === "perch" ? 0.12 : 0;
      bird.current.rotation.z += (targetTilt - bird.current.rotation.z) * Math.min(1, delta * 5);
      bird.current.position.y = Math.sin(t * 2.2) * (mode === "perch" ? 0.025 : 0.08);
      bird.current.rotation.y += (-0.08 - bird.current.rotation.y) * Math.min(1, delta * 6);
    }
    if (head.current) {
      const headAngle = mode === "transfer" ? -0.12 : mode === "survey" ? 0.08 : mode === "perch" ? -0.035 : 0;
      head.current.rotation.z += (headAngle - head.current.rotation.z) * Math.min(1, delta * 7);
    }
    if (leftWing.current && rightWing.current) {
      const flap = Math.sin(t * energy) * amplitude;
      leftWing.current.rotation.z = -0.58 - flap;
      rightWing.current.rotation.z = 0.58 + flap;
    }
    if (tail.current) tail.current.rotation.z = Math.sin(t * 1.4) * 0.05;
  });

  return (
    <group ref={bird} rotation={[0.08, -0.08, 0]} scale={0.95}>
      <mesh castShadow position={[0, -0.05, 0]} scale={[0.76, 1.05, 0.66]}>
        <sphereGeometry args={[0.72, 28, 28]} />
        <meshStandardMaterial color="#35a85d" roughness={0.38} metalness={0.04} />
      </mesh>
      <group ref={head} position={[0.16, 0.72, 0.02]}>
        <mesh castShadow scale={[0.78, 0.74, 0.76]}>
          <sphereGeometry args={[0.62, 28, 28]} />
          <meshStandardMaterial color="#e9f05f" roughness={0.34} />
        </mesh>
        <mesh castShadow position={[0.25, -0.06, 0.49]} scale={[0.55, 0.68, 0.18]}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshStandardMaterial color="#f5efe0" roughness={0.48} />
        </mesh>
        <mesh castShadow position={[0.77, -0.08, 0.06]} rotation={[0, 0, -Math.PI / 2]} scale={[0.5, 0.45, 0.55]}>
          <coneGeometry args={[0.4, 0.78, 4]} />
          <meshStandardMaterial color="#ff764f" roughness={0.32} />
        </mesh>
        <group position={[0.33, 0.18, 0.54]}>
          <mesh><sphereGeometry args={[0.11, 18, 18]} /><meshStandardMaterial color="#13251f" /></mesh>
          <mesh position={[0.028, 0.03, 0.09]}><sphereGeometry args={[0.03, 10, 10]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.18} /></mesh>
        </group>
      </group>
      <mesh ref={leftWing} castShadow position={[-0.55, -0.08, -0.02]} rotation={[0.05, 0.12, -0.58]} scale={[0.36, 1.05, 0.24]}>
        <sphereGeometry args={[0.58, 20, 20]} />
        <meshStandardMaterial color="#176c55" roughness={0.42} />
      </mesh>
      <mesh ref={rightWing} castShadow position={[0.55, -0.08, -0.02]} rotation={[0.05, -0.12, 0.58]} scale={[0.36, 1.05, 0.24]}>
        <sphereGeometry args={[0.58, 20, 20]} />
        <meshStandardMaterial color="#176c55" roughness={0.42} />
      </mesh>
      <group ref={tail} position={[0, -1.05, -0.08]}>
        <mesh castShadow position={[-0.18, -0.58, 0]} rotation={[0, 0, 0.12]} scale={[0.22, 1, 0.18]}>
          <capsuleGeometry args={[0.28, 1.2, 8, 16]} /><meshStandardMaterial color="#116a68" />
        </mesh>
        <mesh castShadow position={[0.2, -0.62, -0.02]} rotation={[0, 0, -0.12]} scale={[0.22, 1.08, 0.18]}>
          <capsuleGeometry args={[0.28, 1.2, 8, 16]} /><meshStandardMaterial color="#2b8f84" />
        </mesh>
      </group>
      <mesh position={[-0.18, -0.78, 0.42]} rotation={[0, 0, 0.2]}><capsuleGeometry args={[0.04, 0.35, 6, 8]} /><meshStandardMaterial color="#27332e" /></mesh>
      <mesh position={[0.18, -0.78, 0.42]} rotation={[0, 0, -0.2]}><capsuleGeometry args={[0.04, 0.35, 6, 8]} /><meshStandardMaterial color="#27332e" /></mesh>
    </group>
  );
}

function BirdStage({ state }: { state: FlightState }) {
  return (
    <div
      className={`bird-orbit bird-${state.mode}`}
      style={{ left: `${state.x}px`, top: `${state.y}px` }}
      aria-hidden="true"
    >
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0.15, 5.2], fov: 36 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.8} />
        <directionalLight castShadow position={[4, 6, 5]} intensity={3.2} color="#fff4d9" />
        <pointLight position={[-3, -1, 3]} intensity={1.4} color="#83d9ff" />
        <ParrotModel mode={state.mode} />
        <ContactShadows position={[0, -2.05, 0]} opacity={0.22} scale={4} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function useFlightChoreography(
  sceneRefs: React.RefObject<HTMLElement | null>[],
  pathRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>,
  journeyRef: React.RefObject<HTMLDivElement | null>,
  stepRefs: React.RefObject<(HTMLDivElement | null)[]>,
) {
  const [state, setState] = useState<FlightState>({ scene: "hero", progress: 0, x: 900, y: 420, mode: "hover", activeIndex: 0 });
  const priorScene = useRef<SceneName>("hero");
  const priorMark = useRef("hero:0");
  const transferUntil = useRef(0);

  useEffect(() => {
    let raf = 0;
    let settleTimer = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let scene: SceneName = "hero";
      let progress = clamp(window.scrollY / Math.max(1, h * 0.78));
      let pinnedSceneFound = false;

      for (let index = 0; index < sceneRefs.length; index += 1) {
        const el = sceneRefs[index].current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 1 && rect.bottom >= h - 1) {
          pinnedSceneFound = true;
          scene = (["direction", "system", "movement", "process"] as SceneName[])[index];
          progress = clamp(-rect.top / Math.max(1, rect.height - h));
        }
      }

      if (!pinnedSceneFound && window.scrollY > h * 0.72) return;

      if (scene !== priorScene.current) {
        priorScene.current = scene;
        transferUntil.current = performance.now() + 560;
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(measure, 576);
      }

      let x = w * 0.72;
      let y = h * (0.46 - progress * 0.06);
      let activeIndex = 0;
      let baseMode: FlightMode = "hover";

      if (scene === "direction" && pathRef.current) {
        const rect = pathRef.current.getBoundingClientRect();
        x = rect.left + rect.width * (0.07 + progress * 0.86);
        y = rect.top + rect.height * (0.72 - Math.sin(progress * Math.PI) * 0.48 + Math.sin(progress * Math.PI * 2) * 0.05);
        baseMode = "glide";
      } else if (scene === "system") {
        activeIndex = Math.min(3, Math.floor(progress * 4));
        const card = cardRefs.current[activeIndex];
        if (card) {
          const mark = card.querySelector<HTMLElement>("[data-bird-mark]");
          const rect = (mark ?? card).getBoundingClientRect();
          x = mark ? rect.left + rect.width * 0.5 : rect.left + rect.width * 0.5;
          y = mark ? rect.top + rect.height * 0.5 : rect.top - 54;
        }
        baseMode = "survey";
      } else if (scene === "movement" && journeyRef.current) {
        const line = journeyRef.current.querySelector<HTMLElement>(".journey-line");
        const rect = (line ?? journeyRef.current).getBoundingClientRect();
        x = rect.left + rect.width * progress;
        y = rect.top - 72;
        activeIndex = Math.min(3, Math.floor(progress * 4));
        baseMode = "wingbeat";
      } else if (scene === "process") {
        activeIndex = Math.min(3, Math.floor(progress * 4));
        const step = stepRefs.current[activeIndex];
        if (step) {
          const mark = step.querySelector<HTMLElement>("[data-bird-mark]");
          const rect = (mark ?? step).getBoundingClientRect();
          x = mark ? rect.left + rect.width * 0.5 - 26 : rect.right - 78;
          y = mark ? rect.top + rect.height * 0.5 - 54 : rect.top + rect.height * 0.5;
        }
        baseMode = "perch";
      }

      const mark = `${scene}:${activeIndex}`;
      if ((scene === "system" || scene === "process") && mark !== priorMark.current) {
        transferUntil.current = performance.now() + 420;
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(measure, 436);
      }
      priorMark.current = mark;

      const safeRadius = w < 620 ? 68 : 92;
      x = Math.max(safeRadius, Math.min(w - safeRadius, x));
      y = Math.max(safeRadius, Math.min(h - safeRadius, y));

      setState((previous) => {
        const next = {
          scene,
          progress,
          x,
          y,
          activeIndex,
          mode: performance.now() < transferUntil.current ? "transfer" as FlightMode : baseMode,
        };
        if (
          previous.scene === next.scene &&
          previous.activeIndex === next.activeIndex &&
          previous.mode === next.mode &&
          Math.abs(previous.progress - next.progress) < 0.002
        ) return previous;
        return next;
      });
    };

    const onMove = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [cardRefs, journeyRef, pathRef, sceneRefs, stepRefs]);

  return state;
}

function SectionEyebrow({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="eyebrow"><span>{number}</span><span>{children}</span></div>;
}

export function BirdExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const directionRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLElement>(null);
  const movementRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sceneRefs = useMemo(() => [directionRef, systemRef, movementRef, processRef], []);
  const flight = useFlightChoreography(sceneRefs, pathRef, cardRefs, journeyRef, stepRefs);

  const jumpTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const pathDots = useMemo(() => Array.from({ length: 22 }, (_, index) => {
    const p = index / 21;
    return { left: `${7 + p * 86}%`, top: `${72 - Math.sin(p * Math.PI) * 48 + Math.sin(p * Math.PI * 2) * 5}%` };
  }), []);

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => jumpTo("top")} aria-label="Return to top">
          <span className="brand-mark"><Feather size={17} strokeWidth={2.4} /></span>
          <span>Fieldwork®</span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {["Direction", "System", "Movement", "Process"].map((item) => (
            <button key={item} onClick={() => jumpTo(item.toLowerCase())} className={flight.scene === item.toLowerCase() ? "active" : ""}>{item}</button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {["Direction", "System", "Movement", "Process"].map((item, index) => (
            <button key={item} onClick={() => jumpTo(item.toLowerCase())}><span>0{index + 1}</span>{item}</button>
          ))}
        </div>
      )}

      <BirdStage state={flight} />

      <div className="flight-readout" aria-hidden="true">
        <span className="flight-pulse" />
        <span>{sceneLabels[flight.scene]}</span>
        <span className="readout-progress">{String(Math.round(flight.progress * 100)).padStart(2, "0")}</span>
      </div>

      <section id="top" className="hero">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-copy">
          <p className="hero-kicker"><Sparkles size={15} /> Strategy · Design · Motion</p>
          <h1>Ideas need<br />room to <em>fly.</em></h1>
          <p className="hero-deck">We turn living signals into clear systems, useful experiences, and momentum people can feel.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => jumpTo("direction")}>Follow the flight <ArrowDown size={17} /></button>
            <span>Scroll to move the story</span>
          </div>
        </div>
        <div className="hero-index">
          <span>Independent creative practice</span>
          <span>Cairo · Everywhere</span>
        </div>
      </section>

      <section id="direction" ref={directionRef} className="scene scene-direction">
        <div className="scene-sticky direction-stage">
          <div className="scene-heading">
            <SectionEyebrow number="01">Direction</SectionEyebrow>
            <h2>A strong signal<br />changes the route.</h2>
            <p>Direction is not a fixed destination. It is a point of view precise enough to guide the next good decision.</p>
          </div>
          <div ref={pathRef} className="flight-path" aria-hidden="true">
            {pathDots.map((dot, index) => <i key={index} className={index % 5 === 0 ? "path-dot major" : "path-dot"} style={dot} />)}
            <span className="path-label path-start">Curiosity</span>
            <span className="path-label path-middle">Clarity</span>
            <span className="path-label path-end">Conviction</span>
          </div>
          <div className="direction-note"><Compass size={20} /><span>The route redraws itself as the evidence gets sharper.</span></div>
          <div className="scene-number">01</div>
        </div>
      </section>

      <section id="system" ref={systemRef} className="scene scene-system">
        <div className="scene-sticky system-stage">
          <div className="system-intro">
            <SectionEyebrow number="02">System</SectionEyebrow>
            <h2>One idea.<br />Four territories.</h2>
            <p>A connected system lets the work stay coherent while every expression does a different job.</p>
          </div>
          <div className="territory-grid">
            {territoryData.map((item, index) => (
              <div
                key={item.id}
                ref={(node) => { cardRefs.current[index] = node; }}
                className={`territory-card tone-${item.tone} ${flight.scene === "system" && flight.activeIndex === index ? "is-active" : ""}`}
              >
                <span className="bird-mark card-bird-mark" data-bird-mark aria-hidden="true" />
                <div className="card-top"><span>{item.id}</span><Layers3 size={18} /></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span className="card-status">{flight.scene === "system" && flight.activeIndex === index ? "In focus" : "Territory"}</span>
              </div>
            ))}
          </div>
          <div className="scene-number">02</div>
        </div>
      </section>

      <section id="movement" ref={movementRef} className="scene scene-movement">
        <div className="scene-sticky movement-stage">
          <div className="movement-header">
            <div>
              <SectionEyebrow number="03">Movement</SectionEyebrow>
              <h2>Make the change<br />feel inevitable.</h2>
            </div>
            <p>Momentum comes from the right sequence: each moment earns the next, and the whole journey stays visible.</p>
          </div>
          <div ref={journeyRef} className="journey-track">
            <div className="journey-line"><span style={{ width: `${flight.scene === "movement" ? flight.progress * 100 : 0}%` }} /></div>
            {["Notice", "Understand", "Believe", "Act"].map((label, index) => (
              <div key={label} className={`journey-stop stop-${index + 1} ${flight.scene === "movement" && flight.activeIndex >= index ? "passed" : ""}`}>
                <span className="stop-node">{flight.scene === "movement" && flight.activeIndex > index ? <Check size={15} /> : `0${index + 1}`}</span>
                <strong>{label}</strong>
                <small>{["A signal surfaces", "The pattern resolves", "The value becomes clear", "A new behavior begins"][index]}</small>
              </div>
            ))}
          </div>
          <div className="movement-caption"><Route size={18} /><span>One continuous line. No disconnected moments.</span></div>
          <div className="scene-number">03</div>
        </div>
      </section>

      <section id="process" ref={processRef} className="scene scene-process">
        <div className="scene-sticky process-stage">
          <div className="process-title">
            <SectionEyebrow number="04">Process</SectionEyebrow>
            <h2>Clear enough<br />to move.</h2>
            <p>Four deliberate steps. Enough structure to hold the work, enough space to discover what it wants to become.</p>
          </div>
          <div className="process-list">
            {processData.map((step, index) => (
              <div
                key={step.id}
                ref={(node) => { stepRefs.current[index] = node; }}
                className={`process-step ${flight.scene === "process" && flight.activeIndex === index ? "is-active" : ""}`}
              >
                <span className="bird-mark step-bird-mark" data-bird-mark aria-hidden="true" />
                <span className="step-id">{step.id}</span>
                <h3>{step.verb}</h3>
                <p>{step.copy}</p>
                <span className="step-meta">{step.meta}</span>
              </div>
            ))}
          </div>
          <div className="scene-number">04</div>
        </div>
      </section>

      <footer className="closing">
        <div className="closing-badge"><Feather size={19} /> Fieldwork®</div>
        <h2>Have a signal<br />worth following?</h2>
        <button className="closing-link">Start a conversation <ArrowUpRight size={28} /></button>
        <div className="footer-meta"><span>© 2026 Fieldwork Studio</span><span>Built for movement</span><span>Cairo · GMT+3</span></div>
      </footer>
    </main>
  );
}
