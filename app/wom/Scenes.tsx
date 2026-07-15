"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  BlushDisc,
  CoordDot,
  CornerTicks,
  Crosshair,
  DottedArc,
  HatchPlane,
  SceneShell,
  SectionLabel,
} from "./tech";

export function S1Message() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBlush = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const yType = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const yTech = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <SceneShell id="s1-message">
      <div ref={ref} className="relative mx-auto flex min-h-dvh max-w-[1600px] flex-col justify-center px-6 pt-28 pb-16 lg:px-16">
        <motion.div style={{ y: yBlush }} className="absolute -right-40 top-10 lg:right-0">
          <BlushDisc className="h-[520px] w-[520px] opacity-90" />
        </motion.div>
        <motion.div style={{ y: yTech }} className="pointer-events-none absolute right-24 top-40 text-ink/40">
          <Crosshair size={110} />
        </motion.div>
        <motion.div style={{ y: yTech }} className="pointer-events-none absolute left-6 top-24 flex flex-col gap-1 text-ink/40 lg:left-16">
          <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-signal/70" />
            ))}
          </div>
          <div className="mt-1 h-3 w-4 border-l border-t border-signal/70" />
        </motion.div>

        <div className="relative z-10">
          <SectionLabel index="01" label="The Message" />
          <motion.h1
            style={{ y: yType }}
            className="text-display mt-6 max-w-[16ch] text-[clamp(3.2rem,10vw,10rem)] text-ink"
          >
            Every brand<br />has something<br />to <span className="text-signal">say.</span>
          </motion.h1>
          <p className="mt-8 max-w-md text-base text-muted-ink lg:text-lg">
            An idea can be powerful and still remain unheard. We turn signal into direction — and direction into movement.
          </p>

          <div className="mt-16 flex items-end gap-8">
            <CoordDot label="Signal 001" />
            <div className="h-px w-24 bg-ink/30" />
            <span className="text-[10px] uppercase tracking-widest text-muted-ink">Scroll — the message travels</span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-16 left-6 flex items-center gap-3 text-ink/50 lg:left-16">
          <CornerTicks className="h-4 w-4" />
          <span className="text-[10px] uppercase tracking-widest">WOM — 26.7.15</span>
        </div>
        <motion.div style={{ y: yTech }} className="pointer-events-none absolute bottom-0 right-0 h-40 w-[60%] text-ink/40">
          <HatchPlane className="h-full w-full" />
        </motion.div>
      </div>
    </SceneShell>
  );
}

export function S2Voice() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yDisc = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [60, -80]);

  return (
    <SceneShell id="s2-voice">
      <div ref={ref} className="relative mx-auto flex min-h-dvh max-w-[1600px] items-center px-6 py-24 lg:px-16">
        <motion.div style={{ y: yDisc }} className="absolute right-0 top-1/4 h-[600px] w-[600px]">
          <BlushDisc className="h-full w-full opacity-80" />
        </motion.div>

        <svg className="pointer-events-none absolute inset-0 h-full w-full text-ink/25" viewBox="0 0 1600 1000" fill="none" preserveAspectRatio="none">
          <path d="M 60 800 Q 500 200 900 400 T 1560 300" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="60" cy="800" r="3" fill="#db3236" />
          <circle cx="1560" cy="300" r="3" fill="#db3236" />
        </svg>

        <div className="relative z-10 grid w-full gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="02" label="The Voice" />
            <motion.h2 style={{ y: yTitle }} className="text-display mt-6 text-[clamp(2.8rem,8vw,7.5rem)] text-ink">
              We give<br />ideas a<br /><span className="text-signal">voice.</span>
            </motion.h2>
            <p className="mt-8 max-w-lg text-base text-muted-ink">
              Sharp positioning. Distinctive identity. A brand system engineered to be heard above the noise — and remembered after it fades.
            </p>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 text-[11px] uppercase tracking-widest">
              {["Positioning", "Identity", "Voice"].map((t) => (
                <div key={t} className="border-t border-ink/30 pt-3">
                  <div className="text-signal">◦</div>
                  <div className="mt-1 font-bold">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

export function S3Noise() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -160]);

  const cards = [
    { t: "notification", x: "6%", y: "20%", d: 1 },
    { t: "ad impression", x: "72%", y: "14%", d: 2 },
    { t: "unread email", x: "18%", y: "68%", d: 3 },
    { t: "push alert", x: "60%", y: "72%", d: 1 },
    { t: "brand mention", x: "38%", y: "28%", d: 2 },
    { t: "content post", x: "80%", y: "48%", d: 3 },
    { t: "story view", x: "10%", y: "40%", d: 2 },
    { t: "search query", x: "48%", y: "56%", d: 1 },
  ];

  return (
    <SceneShell id="s3-noise" dark>
      <div
        ref={ref}
        className="relative flex min-h-[110dvh] items-center justify-center px-6 py-32 lg:px-16"
      >
        {/* red atmospheric wash */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(219,50,54,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(219,50,54,0.12) 0%, transparent 55%)",
          }}
        />

        {cards.map((c, i) => {
          const y = c.d === 1 ? y1 : c.d === 2 ? y2 : y3;
          return (
            <motion.div
              key={i}
              style={{ y, left: c.x, top: c.y }}
              className="absolute w-40 border border-canvas-light/15 bg-canvas-light/5 p-3 text-[10px] uppercase tracking-widest text-canvas-light/60 backdrop-blur-sm"
            >
              <div className="mb-2 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-signal" />
                <span>{c.t}</span>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-canvas-light/15" />
                <div className="h-1 w-2/3 bg-canvas-light/10" />
                <div className="h-1 w-1/2 bg-canvas-light/10" />
              </div>
            </motion.div>
          );
        })}

        <svg className="pointer-events-none absolute inset-0 h-full w-full text-canvas-light/20" viewBox="0 0 1600 1000" fill="none">
          <path d="M -40 600 Q 400 300 800 500 T 1640 400" stroke="#db3236" strokeWidth="1" strokeDasharray="4 6" />
        </svg>

        <div className="relative z-10 text-center">
          <SectionLabel index="03" label="The Noise" />
          <h2 className="text-display mt-6 text-[clamp(2.8rem,8vw,8rem)] text-canvas-light">
            Attention is<br />everywhere.
          </h2>
          <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-bold uppercase tracking-tight text-signal">
            Meaning is rare.
          </p>
        </div>
      </div>
    </SceneShell>
  );
}

export function S4Direction() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dash = useTransform(scrollYProgress, [0, 1], [800, 0]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const stops = ["Audience", "Insight", "Position", "Story", "Channel", "Goal"];

  return (
    <SceneShell id="s4-direction">
      <div ref={ref} className="relative mx-auto min-h-dvh max-w-[1600px] px-6 py-24 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="04" label="Direction" />
            <motion.h2 style={{ y: yTitle }} className="text-display mt-6 text-[clamp(2.4rem,6.5vw,6rem)] text-ink">
              Strategy turns<br />noise into<br /><span className="text-signal">direction.</span>
            </motion.h2>
            <p className="mt-6 max-w-md text-muted-ink">
              We map the terrain, spot the signal, and draw the shortest line from your brand to the people who need to hear it.
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <svg viewBox="0 0 800 500" className="h-full w-full">
              <defs>
                <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#db3236" />
                </marker>
              </defs>
              {/* grid */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="500" stroke="#050505" strokeOpacity="0.06" />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 80} x2="800" y2={i * 80} stroke="#050505" strokeOpacity="0.06" />
              ))}

              {/* the route */}
              <motion.path
                d="M 40 420 C 180 260, 260 380, 360 240 S 560 120, 760 180"
                fill="none"
                stroke="#db3236"
                strokeWidth="2"
                strokeDasharray="800"
                style={{ strokeDashoffset: dash }}
                markerEnd="url(#arrow-red)"
              />

              {/* stops */}
              {[
                [40, 420],
                [180, 340],
                [300, 300],
                [420, 220],
                [560, 200],
                [700, 180],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="14" fill="none" stroke="#050505" strokeWidth="0.7" />
                  <circle cx={x} cy={y} r="4" fill="#050505" />
                  <text x={x} y={y - 24} fontSize="10" fill="#050505" textAnchor="middle" fontWeight="700" letterSpacing="2">
                    {stops[i].toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

export function S5System() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBlush = useTransform(scrollYProgress, [0, 1], [-60, 120]);

  const pillars = [
    {
      k: "Build",
      copy: "Clear thinking. Smart positioning. Brand systems that create direction and drive results.",
      icon: (
        <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="40" cy="40" r="30" strokeDasharray="2 3" />
          <path d="M25 50 L40 20 L55 50 Z" stroke="#db3236" strokeWidth="1.5" />
          <path d="M25 50 L55 50" />
          <circle cx="40" cy="20" r="2" fill="#db3236" />
        </svg>
      ),
    },
    {
      k: "Communicate",
      copy: "Distinct by design. Visual identities and experiences that connect and inspire.",
      icon: (
        <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="40" cy="40" r="30" />
          <path d="M30 30 L40 20 L50 30 L45 45 L35 45 Z" stroke="#db3236" strokeWidth="1.5" />
          <line x1="40" y1="45" x2="40" y2="60" stroke="#db3236" />
          <circle cx="30" cy="30" r="1.5" fill="currentColor" />
          <circle cx="50" cy="30" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      k: "Grow",
      copy: "Ideas that move. Motion that engages, explains, and leaves a lasting impression.",
      icon: (
        <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="40" cy="40" r="30" />
          <circle cx="40" cy="40" r="18" strokeDasharray="2 3" />
          <polygon points="35,30 35,50 52,40" fill="#db3236" />
        </svg>
      ),
    },
  ];

  return (
    <SceneShell id="s5-system">
      <div ref={ref} className="relative mx-auto min-h-dvh max-w-[1600px] px-6 py-24 lg:px-16">
        <motion.div style={{ y: yBlush }} className="absolute right-10 top-20 h-[500px] w-[500px]">
          <BlushDisc className="h-full w-full opacity-70" />
        </motion.div>

        <div className="relative z-10">
          <SectionLabel index="05" label="The Connected System" />
          <motion.h2 style={{ y: yTitle }} className="text-display mt-6 max-w-[14ch] text-[clamp(3rem,10vw,10rem)] text-ink">
            Build.<br />Communicate.<br /><span className="text-signal">Grow.</span>
          </motion.h2>

          <div className="mt-8 flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-bold">Word of Mouth</span>
            <span className="h-px w-8 bg-ink/40" />
            <span>Strategy</span>
            <span className="text-signal">· Design</span>
            <span className="text-signal">· Motion</span>
          </div>
        </div>

        {/* red dotted path linking pillars */}
        <svg className="pointer-events-none absolute inset-x-0 bottom-40 h-40 w-full" viewBox="0 0 1600 200" fill="none" preserveAspectRatio="none">
          <path d="M 100 100 Q 500 20 800 120 T 1500 80" stroke="#db3236" strokeWidth="1.2" strokeDasharray="3 6" />
        </svg>

        <div className="relative z-10 mt-20 grid gap-10 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.k} className="border-t border-ink/20 pt-6">
              <div className="flex items-start gap-5">
                <div className="text-ink">{p.icon}</div>
                <div>
                  <div className="text-eyebrow text-signal">— {p.k}</div>
                  <h3 className="text-display mt-2 text-2xl text-ink">{p.k}.</h3>
                  <p className="mt-3 max-w-xs text-sm text-muted-ink">{p.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom hatched mountain */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 text-ink/30">
          <HatchPlane className="h-full w-full" />
        </div>
      </div>
    </SceneShell>
  );
}

export function S6Movement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dash = useTransform(scrollYProgress, [0.1, 0.9], [1200, 0]);
  const stations = ["Brand", "Content", "Campaign", "Website", "Lead", "CRM", "Growth"];

  return (
    <SceneShell id="s6-movement">
      <div ref={ref} className="relative mx-auto min-h-dvh max-w-[1600px] px-6 py-24 lg:px-16">
        <SectionLabel index="06" label="Movement" />
        <h2 className="text-display mt-6 max-w-[18ch] text-[clamp(2.4rem,7vw,7rem)] text-ink">
          From message<br />to <span className="text-signal">movement.</span>
        </h2>

        <div className="relative mt-24">
          <svg viewBox="0 0 1400 300" className="h-[300px] w-full">
            <motion.path
              d="M 40 220 C 200 60, 380 260, 560 140 S 900 260, 1080 120 S 1300 220, 1360 100"
              fill="none"
              stroke="#db3236"
              strokeWidth="2.4"
              strokeDasharray="1200"
              style={{ strokeDashoffset: dash }}
            />
            {[
              [40, 220],
              [240, 130],
              [460, 210],
              [660, 150],
              [880, 220],
              [1120, 130],
              [1360, 100],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="18" fill="none" stroke="#050505" strokeWidth="0.8" />
                <circle cx={x} cy={y} r="18" fill="none" stroke="#050505" strokeWidth="0.4" strokeDasharray="2 3" />
                <circle cx={x} cy={y} r="5" fill="#050505" />
                <text
                  x={x}
                  y={y + (i % 2 === 0 ? 42 : -30)}
                  fontSize="11"
                  fill="#050505"
                  textAnchor="middle"
                  fontWeight="800"
                  letterSpacing="2"
                >
                  {stations[i].toUpperCase()}
                </text>
                <text
                  x={x}
                  y={y + (i % 2 === 0 ? 56 : -44)}
                  fontSize="8"
                  fill="#6f6b68"
                  textAnchor="middle"
                  letterSpacing="1.5"
                >
                  0{i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <p className="mt-16 max-w-lg text-muted-ink">
          Every station connects. The signal doesn't just get seen — it moves, it lands, it converts, and it keeps compounding.
        </p>
      </div>
    </SceneShell>
  );
}

export function S7Proof() {
  const cases = [
    {
      client: "Northline Coffee",
      kind: "Brand system & packaging",
      note: "A neighborhood roaster gets a voice that travels beyond the block.",
      accent: "01 / Identity",
    },
    {
      client: "Halden Studio",
      kind: "Website & motion",
      note: "An architecture studio turns their portfolio into a scroll-driven film.",
      accent: "02 / Digital",
    },
    {
      client: "Meridian Wealth",
      kind: "Positioning & campaign",
      note: "A finance brand replaces jargon with clarity — and books the meetings.",
      accent: "03 / Strategy",
    },
  ];

  return (
    <SceneShell id="s7-proof">
      <div className="mx-auto min-h-dvh max-w-[1600px] px-6 py-24 lg:px-16">
        <SectionLabel index="07" label="Proof" />
        <h2 className="text-display mt-6 max-w-[16ch] text-[clamp(2.2rem,6vw,6rem)] text-ink">
          Work that moved<br />businesses <span className="text-signal">forward.</span>
        </h2>

        <div className="mt-20 space-y-24">
          {cases.map((c, i) => (
            <article
              key={c.client}
              className={`grid gap-10 lg:grid-cols-12 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="lg:col-span-7">
                <div className="group relative aspect-[16/10] w-full overflow-hidden bg-canvas-warm">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #efd8ca 0%, #f2cfc1 40%, #f4e8de 100%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-end p-8">
                    <span className="text-display text-6xl text-ink/25 lg:text-8xl">
                      0{i + 1}
                    </span>
                  </div>
                  <svg className="absolute inset-0 h-full w-full text-ink/25" viewBox="0 0 600 400" fill="none">
                    <path d="M 40 320 Q 220 100 400 220 T 580 160" stroke="#db3236" strokeWidth="1.2" strokeDasharray="3 5" />
                    <circle cx="580" cy="160" r="3" fill="#db3236" />
                    <circle cx="40" cy="320" r="3" fill="#db3236" />
                  </svg>
                  <CornerTicks className="absolute right-3 top-3 h-4 w-4 text-ink/50" />
                </div>
              </div>
              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="text-eyebrow text-signal">{c.accent}</div>
                <h3 className="text-display mt-4 text-3xl text-ink lg:text-5xl">{c.client}</h3>
                <div className="mt-3 text-[11px] uppercase tracking-widest text-muted-ink">
                  {c.kind}
                </div>
                <p className="mt-6 max-w-sm text-muted-ink">{c.note}</p>
                <a
                  href="#s9-invitation"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
                >
                  Read the case →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

export function S8Process() {
  const steps = [
    { k: "Listen", copy: "We start by understanding the brand, the market, and the room it walks into." },
    { k: "Plan", copy: "We turn insight into a route — sharp, opinionated, measurable." },
    { k: "Create", copy: "We build the identity, the assets, and the film that carries the message." },
    { k: "Grow", copy: "We measure, iterate, and compound the signal into lasting brand equity." },
  ];

  return (
    <SceneShell id="s8-process">
      <div className="mx-auto min-h-dvh max-w-[1600px] px-6 py-24 lg:px-16">
        <SectionLabel index="08" label="Process" />
        <h2 className="text-display mt-6 max-w-[18ch] text-[clamp(2.2rem,6vw,6rem)] text-ink">
          Listen. Plan.<br />Create. <span className="text-signal">Grow.</span>
        </h2>

        <div className="mt-20 grid gap-10 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.k} className="relative">
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-signal">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-ink/30" />
              </div>
              <h3 className="text-display mt-6 text-4xl text-ink">{s.k}.</h3>
              <p className="mt-4 text-sm text-muted-ink">{s.copy}</p>
              <DottedArc className="mt-8 h-20 w-full text-ink/40" />
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

export function S9Invitation() {
  return (
    <SceneShell id="s9-invitation">
      <div className="mx-auto min-h-dvh max-w-[1600px] px-6 py-24 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="09" label="Invitation" />
            <h2 className="text-display mt-6 text-[clamp(2.6rem,7vw,7rem)] text-ink">
              Let's create<br />a brand worth<br /><span className="text-signal">talking about.</span>
            </h2>
            <p className="mt-8 max-w-md text-muted-ink">
              Tell us about the brand, the moment, the problem. We'll reply with a route.
            </p>

            <div className="mt-12 flex items-center gap-4 text-sm text-muted-ink">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                <span>hello@wordofmouth.studio</span>
              </div>
              <div className="hidden h-px w-8 bg-ink/30 lg:block" />
              <div className="hidden lg:block">Reply within 2 business days</div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const btn = e.currentTarget.querySelector("button");
              if (btn) btn.innerText = "Signal received ✓";
            }}
            className="relative border border-ink/15 bg-canvas-light/60 p-8 backdrop-blur-sm lg:col-span-6 lg:p-12"
          >
            <CornerTicks className="absolute right-3 top-3 h-4 w-4 text-ink/40" />
            <div className="text-eyebrow text-signal">Start a project</div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Field label="Your name" name="name" />
              <Field label="Company" name="company" />
              <Field label="Email" name="email" type="email" />
              <Field label="Budget" name="budget" />
            </div>
            <div className="mt-6">
              <label className="text-[10px] uppercase tracking-widest text-muted-ink">Tell us about it</label>
              <textarea
                name="brief"
                rows={4}
                className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-sm text-ink outline-none focus:border-signal"
              />
            </div>
            <button
              type="submit"
              className="mt-10 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-canvas-light transition hover:bg-signal"
            >
              <span className="h-1 w-1 rounded-full bg-signal" />
              Send the signal
              <span className="ml-2">→</span>
            </button>
          </form>
        </div>
      </div>
    </SceneShell>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-ink">{label}</span>
      <input
        type={type}
        name={name}
        className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-sm text-ink outline-none focus:border-signal"
      />
    </label>
  );
}
