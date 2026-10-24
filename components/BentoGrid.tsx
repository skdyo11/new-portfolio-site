"use client";

import React, { useState, useRef } from "react";
import { useAudio } from "@/components/AudioEngine";
import { useTheme } from "@/context/ThemeContext";
import {
  Cpu,
  Layers,
  Terminal,
  Volume2,
  Clock,
  Compass,
  Sparkles,
  Zap,
  Globe,
  Radio,
  Binary,
} from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(0, 240, 255, 0.25)",
  interactive = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const { playSound } = useAudio();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.65,
    });
  };

  const handleMouseEnter = () => {
    playSound("hover");
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="relative h-full w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative h-full w-full rounded-2xl border border-white/10 bg-[#0a0f1d]/80 p-6 backdrop-blur-xl transition-all duration-200 ease-out overflow-hidden shadow-xl ${className}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: glare.opacity > 0 ? `0 15px 40px -10px ${glowColor}` : undefined,
        }}
      >
        {/* Holographic Sheen Layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 mix-blend-screen"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, rgba(0,240,255,0.15) 30%, transparent 70%)`,
          }}
        />

        {/* Ambient Corner Accent */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: glowColor }}
        />

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}

export function BentoGrid({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const { playSound } = useAudio();
  const { colors } = useTheme();
  const [activeSoundDemo, setActiveSoundDemo] = useState<string | null>(null);

  const testSound = (sound: "beep" | "warp" | "glitch" | "success" | "click") => {
    setActiveSoundDemo(sound);
    playSound(sound);
    setTimeout(() => setActiveSoundDemo(null), 300);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
      {/* Section Header */}
      <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-theme-primary mb-2">
            <Radio className="h-4 w-4 animate-pulse" />
            <span>Tactile Engineering Hub & Bento Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Architecture Matrix & Core Capabilities
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-md">
          Zero-dependency physics, real-time edge orchestration, and hardware-accelerated interfaces.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
        {/* CARD 1: Saif Ali Master Profile (Spans 2 cols, 2 rows) */}
        <div className="md:col-span-2 md:row-span-2">
          <TiltCard glowColor="rgba(0, 240, 255, 0.35)" className="border-cyan-500/30">
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                      SYSTEM ARCHITECT & CREATIVE ENGINEER
                    </span>
                  </div>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                    saifalii.dev
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Forging relentlessly over-engineered systems where mathematical precision meets kinetic beauty.
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  Specializing in distributed edge fabrics, high-frequency WebAssembly runtimes, procedural
                  synthesizers, and hyper-responsive user interfaces that elevate web engineering into an art form.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <div className="text-[10px] text-neutral-400 uppercase">Sub-15ms Sync</div>
                  <div className="text-white font-bold mt-1 text-sm">Edge Mesh</div>
                </div>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <div className="text-[10px] text-neutral-400 uppercase">Frame Purity</div>
                  <div className="text-cyan-300 font-bold mt-1 text-sm">120 FPS WebGL</div>
                </div>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <div className="text-[10px] text-neutral-400 uppercase">Synthesizers</div>
                  <div className="text-emerald-300 font-bold mt-1 text-sm">Zero Assets</div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* CARD 2: Live Radar Telemetry (Spans 1 col, 1 row) */}
        <div className="md:col-span-1 md:row-span-1">
          <TiltCard glowColor="rgba(16, 185, 129, 0.3)">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                  <Globe className="h-4 w-4" />
                  <span>EDGE TELEMETRY</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">GLOBAL MESH</span>
              </div>

              {/* Radar Graphic */}
              <div className="relative my-2 flex items-center justify-center">
                <div className="relative h-20 w-20 rounded-full border border-emerald-500/30 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border border-dashed border-emerald-500/40" />
                  <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  {/* Radar sweep beam */}
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.35)_360deg)] animate-radar-sweep pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-neutral-300">
                <span>Active Nodes: 18 POPs</span>
                <span className="text-emerald-400 font-bold">0ms Packet Loss</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* CARD 3: Web Audio Synth Soundboard (Spans 1 col, 1 row) */}
        <div className="md:col-span-1 md:row-span-1">
          <TiltCard glowColor="rgba(244, 63, 94, 0.3)">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold">
                  <Volume2 className="h-4 w-4" />
                  <span>SYNTH LAB</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">PROCEDURAL</span>
              </div>

              <p className="text-[11px] text-neutral-300">
                Pure Web Audio API synthesizers. Zero mp3 downloads.
              </p>

              {/* Sound Test Triggers */}
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => testSound("beep")}
                  className="rounded border border-white/10 bg-black/40 py-1.5 text-neutral-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Beep
                </button>
                <button
                  onClick={() => testSound("warp")}
                  className="rounded border border-white/10 bg-black/40 py-1.5 text-neutral-300 hover:border-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                >
                  Warp
                </button>
                <button
                  onClick={() => testSound("glitch")}
                  className="rounded border border-white/10 bg-black/40 py-1.5 text-neutral-300 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Glitch
                </button>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* CARD 4: Konami Code Trigger Card (Spans 1 col, 1 row) */}
        <div className="md:col-span-1 md:row-span-1">
          <TiltCard glowColor="rgba(234, 179, 8, 0.35)" className="border-amber-500/30">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400 font-bold">
                  <Terminal className="h-4 w-4" />
                  <span>KONAMI TRIGGER</span>
                </div>
                <span className="text-[9px] font-mono rounded bg-amber-950/60 text-amber-300 px-1.5 py-0.5 border border-amber-500/30">
                  SECRET
                </span>
              </div>

              <div className="text-[11px] font-mono text-neutral-300">
                Key sequence: <br />
                <span className="text-amber-300 font-bold">↑ ↑ ↓ ↓ ← → ← → B A</span>
              </div>

              <button
                onClick={() => {
                  playSound("overclock");
                  onTriggerKonami();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-amber-500/50 bg-amber-500/20 py-2 font-mono text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>OVERCLOCK OVERRIDE</span>
              </button>
            </div>
          </TiltCard>
        </div>

        {/* CARD 5: Tech Stack Radar Matrix (Spans 1 col, 1 row) */}
        <div className="md:col-span-1 md:row-span-1">
          <TiltCard glowColor="rgba(168, 85, 247, 0.3)">
            <div className="flex flex-col justify-between h-full font-mono">
              <div className="flex items-center justify-between text-xs text-purple-400 font-bold">
                <div className="flex items-center gap-1.5">
                  <Binary className="h-4 w-4" />
                  <span>TECH RADAR</span>
                </div>
                <span className="text-[10px] text-neutral-400">PRODUCTION</span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {["Rust", "TypeScript", "Next.js 14", "Wasm", "Go", "WebGL", "PostGIS"].map(
                  (tech, i) => (
                    <span
                      key={i}
                      className="rounded bg-black/60 px-2 py-0.5 border border-white/10 text-neutral-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div className="text-[10px] text-neutral-400 flex items-center justify-between">
                <span>Architecture:</span>
                <span className="text-purple-300 font-bold">Decoupled Micro-Edge</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
