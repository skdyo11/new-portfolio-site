"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Play, ExternalLink, Sparkles, Terminal, Cpu, Zap, Activity } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface LabItem {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  tech: string[];
  gradient: string;
  glowColor: string;
  metric: string;
  demoUrl?: string;
}

const LAB_EXPERIMENTS: LabItem[] = [
  {
    id: "sdf-raymarcher",
    number: "01",
    title: "Raymarching & SDF Physics",
    category: "WebGL / Compute Shader",
    badge: "120 FPS",
    description: "Real-time signed distance field raymarcher with dynamic light refraction and volumetric fog rendering on the GPU.",
    tech: ["GLSL", "Three.js", "WebAudio", "SDF Math"],
    gradient: "from-cyan-500 via-blue-600 to-indigo-900",
    glowColor: "rgba(6, 182, 212, 0.4)",
    metric: "0.8ms Frame Latency",
  },
  {
    id: "spatial-pathfinder",
    number: "02",
    title: "Spatial Dijkstra Pathfinding",
    category: "Algorithm / Visualizer",
    badge: "Graph Theory",
    description: "Interactive real-time graph traversal engine computing optimal paths with dynamic obstacles and heuristic weighting.",
    tech: ["TypeScript", "Canvas 2D", "Binary Heap", "Web Workers"],
    gradient: "from-emerald-500 via-teal-600 to-slate-900",
    glowColor: "rgba(16, 185, 129, 0.4)",
    metric: "40k Nodes / Sec",
  },
  {
    id: "discord-daemon",
    number: "03",
    title: "Discord Gateway Daemon",
    category: "Distributed / Networking",
    badge: "Real-Time Mesh",
    description: "High-concurrency WebSocket event router orchestrating automated server provisioning and telemetry dispatches.",
    tech: ["Node.js", "WebSocket", "Redis Pub/Sub", "Discord v10"],
    gradient: "from-purple-500 via-violet-700 to-black",
    glowColor: "rgba(168, 85, 247, 0.4)",
    metric: "< 14ms WebSocket RTT",
  },
  {
    id: "edge-v8-proxy",
    number: "04",
    title: "Dynamic V8 Edge Proxy",
    category: "Cloud / Edge Compute",
    badge: "Sub-Millisecond",
    description: "Low-overhead token bucket rate limiter and request firewall running across 300+ Cloudflare edge point-of-presence nodes.",
    tech: ["Cloudflare Workers", "V8 Isolates", "Rust Wasm", "Edge KV"],
    gradient: "from-amber-500 via-orange-600 to-neutral-900",
    glowColor: "rgba(245, 158, 11, 0.4)",
    metric: "99.999% Reliability",
  },
  {
    id: "kinetic-springs",
    number: "05",
    title: "Tactile Kinetic Physics",
    category: "Interaction / Physics",
    badge: "Haptic Micro-Motion",
    description: "Underdamped fourth-order Runge-Kutta physics simulation driving organic micro-interactions and tactile WebAudio synthesis.",
    tech: ["RK4 Solver", "Framer Motion", "Web Audio API", "Tailwind"],
    gradient: "from-pink-500 via-rose-600 to-stone-900",
    glowColor: "rgba(244, 63, 94, 0.4)",
    metric: "Zero Dropped Frames",
  },
  {
    id: "vector-crawler",
    number: "06",
    title: "Autonomous Vector Indexer",
    category: "AI / Search Pipeline",
    badge: "Semantic Retrieval",
    description: "Headless scraper streaming technical documentation into high-density HNSW vector embeddings for instant retrieval.",
    tech: ["Puppeteer", "Embeddings API", "Cosine Index", "Postgres"],
    gradient: "from-blue-500 via-indigo-700 to-slate-950",
    glowColor: "rgba(59, 130, 246, 0.4)",
    metric: "< 80ms Query Cosine",
  },
];

export function CurvedCarouselLab() {
  const { playSound } = useAudio();
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = LAB_EXPERIMENTS.length;

  const handleNext = useCallback(() => {
    playSound("click");
    setActiveIndex((prev) => (prev + 1) % total);
  }, [playSound, total]);

  const handlePrev = useCallback(() => {
    playSound("click");
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [playSound, total]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setDragDeltaX(delta);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX > 50) {
      handlePrev();
    } else if (dragDeltaX < -50) {
      handleNext();
    }
    setDragDeltaX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section id="lab" className="relative py-24 sm:py-32 w-full select-none overflow-hidden bg-[#07080A]">
      {/* Background Architectural Blueprint Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 128px 128px, 128px 128px",
        }}
      />

      {/* Atmospheric radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-600/[0.04] via-purple-600/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.1] pb-6 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                02 / R&amp;D LAB &amp; KINETIC PLAYGROUND
              </span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-white mt-1.5 tracking-tight">
              Spatial 3D Curved Perspective Carousel.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              [ {activeIndex + 1} / {total} ]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="p-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="p-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Perspective Cylindrical Carousel Viewport (Image 3 Architecture) */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative h-[480px] sm:h-[520px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "center 48%",
          }}
        >
          {LAB_EXPERIMENTS.map((item, idx) => {
            // Calculate circular offset
            let offset = idx - activeIndex;
            // Wrap around for circular loop feel
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const rotateY = offset * 22; // Degree rotation around cylinder
            const translateX = offset * 240 + (isDragging ? dragDeltaX * 0.4 : 0);
            const translateZ = -Math.abs(offset) * 80;
            const scale = 1 - Math.abs(offset) * 0.08;
            const opacity = Math.max(0.25, 1 - Math.abs(offset) * 0.28);
            const zIndex = 50 - Math.abs(offset);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    playSound("click");
                    setActiveIndex(idx);
                  }
                }}
                className="absolute w-[280px] sm:w-[320px] md:w-[350px] h-[400px] sm:h-[440px] rounded-3xl border border-white/15 bg-[#0D0E13]/95 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-out select-none"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  boxShadow: isCenter
                    ? `0 25px 60px -15px ${item.glowColor}, 0 0 35px rgba(255, 255, 255, 0.04)`
                    : "0 15px 35px rgba(0, 0, 0, 0.7)",
                }}
              >
                {/* Hairline Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 font-mono text-[10px] text-white/30 pointer-events-none">
                  +
                </div>
                <div className="absolute top-2.5 right-2.5 font-mono text-[10px] text-white/30 pointer-events-none">
                  +
                </div>

                {/* Top Info Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400 font-bold">[{item.number}]</span>
                    <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] text-neutral-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Gradient Visual Pod */}
                  <div
                    className={`h-28 w-full rounded-2xl bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between relative overflow-hidden shadow-inner border border-white/10`}
                  >
                    <div className="flex items-center justify-between text-white/80">
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <Activity className="h-4 w-4" />
                    </div>

                    <div className="font-syne font-extrabold text-sm text-white flex items-center justify-between">
                      <span>VERIFIED</span>
                      <span className="font-mono text-xs">{item.metric}</span>
                    </div>
                  </div>

                  <h3 className="font-syne font-bold text-lg sm:text-xl text-white tracking-tight pt-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Tech Pills Footer */}
                <div className="pt-3 border-t border-white/[0.08] space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                    <span>STATUS: ACTIVE R&amp;D</span>
                    <span className="text-cyan-400 hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                      Inspect ➔
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Drag / Swipe Helper Prompt */}
        <div className="text-center pt-4">
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
            Drag or swipe horizontally to rotate 3D perspective cylinder • Arrow keys supported
          </p>
        </div>
      </div>
    </section>
  );
}