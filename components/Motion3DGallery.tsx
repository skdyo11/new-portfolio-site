"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause, Sparkles, Terminal, Activity, Layers, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";
import { MagneticButton } from "@/components/MagneticButton";

type ProjectionMode = "HELIX" | "BARREL" | "RING" | "SPHERE";

interface GalleryCard {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  gradient: string;
  glowColor: string;
  metric: string;
  accentHex: string;
}

const GALLERY_CARDS: GalleryCard[] = [
  {
    id: "card-1",
    number: "01",
    title: "SDF Raymarching Canvas",
    category: "Shader Compute",
    badge: "120 FPS",
    description: "Real-time signed distance field raymarcher with dynamic light refraction and volumetric fog rendering on the GPU.",
    gradient: "from-amber-400 via-orange-500 to-red-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    accentHex: "#F59E0B",
    metric: "0.8ms Frame Latency",
  },
  {
    id: "card-2",
    number: "02",
    title: "Kinetic Spring Engine",
    category: "Physics Simulator",
    badge: "RK4 Solver",
    description: "Underdamped fourth-order Runge-Kutta physics simulation driving organic micro-interactions and tactile WebAudio synthesis.",
    gradient: "from-pink-500 via-rose-500 to-purple-700",
    glowColor: "rgba(244, 63, 94, 0.4)",
    accentHex: "#F43F5E",
    metric: "Zero Dropped Frames",
  },
  {
    id: "card-3",
    number: "03",
    title: "Algorithmic Pathfinding",
    category: "Graph Theory",
    badge: "Heuristic A*",
    description: "Interactive real-time graph traversal engine computing optimal flight paths with dynamic obstacle avoidance.",
    gradient: "from-cyan-400 via-blue-500 to-indigo-700",
    glowColor: "rgba(56, 189, 248, 0.4)",
    accentHex: "#38BDF8",
    metric: "40k Nodes / Sec",
  },
  {
    id: "card-4",
    number: "04",
    title: "Discord Gateway Cluster",
    category: "Distributed Mesh",
    badge: "Sub-Millisecond",
    description: "High-concurrency WebSocket event router orchestrating automated Discord server provisioning and telemetry dispatches.",
    gradient: "from-emerald-400 via-teal-500 to-slate-800",
    glowColor: "rgba(16, 185, 129, 0.4)",
    accentHex: "#10B981",
    metric: "< 14ms WebSocket RTT",
  },
  {
    id: "card-5",
    number: "05",
    title: "V8 Edge Isolate Proxy",
    category: "Cloud Runtime",
    badge: "Zero Cold Start",
    description: "Low-overhead token bucket rate limiter and request firewall running across 300+ Cloudflare edge point-of-presence nodes.",
    gradient: "from-purple-500 via-violet-600 to-indigo-950",
    glowColor: "rgba(168, 85, 247, 0.4)",
    accentHex: "#A855F7",
    metric: "99.999% Reliability",
  },
  {
    id: "card-6",
    number: "06",
    title: "Autonomous Vector Indexer",
    category: "AI Pipeline",
    badge: "HNSW Embeddings",
    description: "Headless scraper streaming technical documentation into high-density HNSW vector embeddings for sub-100ms retrieval.",
    gradient: "from-blue-500 via-cyan-600 to-slate-900",
    glowColor: "rgba(6, 182, 212, 0.4)",
    accentHex: "#06B6D4",
    metric: "< 80ms Query Cosine",
  },
];

export function Motion3DGallery() {
  const [mode, setMode] = useState<ProjectionMode>("HELIX");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GalleryCard | null>(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  const { playSound } = useAudio();
  const total = GALLERY_CARDS.length;
  const stepAngle = 360 / total;

  // Continuous smooth auto-orbit animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (isAutoPlay && !isDragging && !isHovered) {
        // Continuous orbit: ~10 degrees per second (36 seconds per full revolution)
        setRotationAngle((prev) => (prev + 10 * dt) % 360);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlay, isDragging, isHovered]);

  // Step controls
  const handleNext = useCallback(() => {
    playSound("click");
    setRotationAngle((prev) => (prev + stepAngle) % 360);
  }, [playSound, stepAngle]);

  const handlePrev = useCallback(() => {
    playSound("click");
    setRotationAngle((prev) => (prev - stepAngle + 360) % 360);
  }, [playSound, stepAngle]);

  const handleSwitchMode = (newMode: ProjectionMode) => {
    playSound("click");
    setMode(newMode);
  };

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartAngle(rotationAngle);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    // Map pixels to rotation degrees
    const sensitivity = 0.25;
    setRotationAngle((dragStartAngle - deltaX * sensitivity + 3600) % 360);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
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

  // Compute frontmost card index
  // The front-most card is the one whose relative angle is closest to 0 (or 360)
  const getFrontIndex = () => {
    let minDiff = 360;
    let closestIndex = 0;
    for (let i = 0; i < total; i++) {
      const cardAngle = (rotationAngle + i * stepAngle) % 360;
      const diff = Math.min(cardAngle, 360 - cardAngle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const frontIndex = getFrontIndex();
  const progressRatio = ((rotationAngle % 360) / 360);

  // Compute 3D continuous parametric placement
  const getCardTransform = (index: number) => {
    // Exact angular position around the ring
    const cardAngleDeg = (rotationAngle + index * stepAngle) % 360;
    const thetaRad = (cardAngleDeg * Math.PI) / 180;

    // Radii of 3D cylinder
    const radiusX = 330;
    const radiusZ = 190;

    const translateX = Math.sin(thetaRad) * radiusX;
    const translateZ = (Math.cos(thetaRad) - 1) * radiusZ; // Front: 0px, Back: -380px

    let translateY = 0;
    let rotateX = 0;
    let rotateY = -Math.sin(thetaRad) * 38; // Face smoothly toward center viewer

    switch (mode) {
      case "HELIX": {
        // Continuous smooth ascending spiral
        translateY = -Math.sin(thetaRad) * 45 + Math.cos(thetaRad) * 15;
        rotateX = Math.cos(thetaRad) * 8;
        break;
      }
      case "BARREL": {
        // Arched convex curve
        translateY = (Math.cos(thetaRad) - 1) * 36;
        rotateX = -Math.sin(thetaRad) * 16;
        break;
      }
      case "SPHERE": {
        // Spherical orbital dome
        translateY = Math.sin(thetaRad * 2) * 28;
        rotateX = -Math.cos(thetaRad) * 20;
        break;
      }
      case "RING":
      default: {
        translateY = 0;
        rotateX = 0;
        break;
      }
    }

    // Depth factor: 1 at front, 0 at deep back
    const depthFactor = (Math.cos(thetaRad) + 1) / 2;
    const scale = 0.78 + 0.22 * depthFactor;
    const opacity = 0.4 + 0.6 * depthFactor;
    const zIndex = Math.round(depthFactor * 100);
    const isFront = depthFactor > 0.88;

    return {
      style: {
        transform: `translateX(${translateX.toFixed(1)}px) translateY(${translateY.toFixed(1)}px) translateZ(${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateX(${rotateX.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
        zIndex,
        opacity,
      },
      isFront,
      depthFactor,
    };
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 w-full select-none overflow-hidden bg-[#101115] border-t border-white/[0.08]">
      {/* Scroll / Rotation Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 origin-left transition-transform duration-100 ease-linear"
          style={{ transform: `scaleX(${progressRatio.toFixed(3)})` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.1] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest uppercase text-amber-400 font-semibold">
                03 / 3D SPATIAL LAB GALLERY
              </span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-white mt-1.5 tracking-tight">
              Reverse-Engineered Motion+ 3D Projections.
            </h2>
          </div>

          {/* Orbit Controls (Play/Pause, Step, Indicator) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlay((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              title={isAutoPlay ? "Pause Auto Orbit" : "Play Auto Orbit"}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="h-3 w-3 text-amber-400" />
                  <span className="hidden sm:inline">Orbiting</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-emerald-400" />
                  <span className="hidden sm:inline">Paused</span>
                </>
              )}
            </button>

            <span className="text-xs font-mono text-neutral-400">
              [{frontIndex + 1} / {total}]
            </span>

            <div className="flex items-center gap-2">
              <MagneticButton
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 text-white transition-colors cursor-pointer"
                aria-label="Previous Project"
              >
                <ArrowLeft className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 text-white transition-colors cursor-pointer"
                aria-label="Next Project"
              >
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 3D Kinetic Perspective Stage */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-[480px] sm:h-[530px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "center 48%",
            transformStyle: "preserve-3d",
          }}
        >
          {GALLERY_CARDS.map((card, idx) => {
            const { style, isFront } = getCardTransform(idx);

            return (
              <div
                key={card.id}
                onClick={() => {
                  playSound("click");
                  if (isFront) {
                    setSelectedCard(card);
                  } else {
                    // Rotate this card to the front
                    const targetAngle = (360 - idx * stepAngle) % 360;
                    setRotationAngle(targetAngle);
                  }
                }}
                className={`absolute w-[260px] sm:w-[295px] h-[380px] sm:h-[415px] rounded-3xl border transition-colors duration-200 p-5 sm:p-6 flex flex-col justify-between cursor-pointer group ${
                  isFront
                    ? "border-amber-400/50 bg-[#161822]/98 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.18)] ring-1 ring-amber-400/30"
                    : "border-white/15 bg-[#141620]/90 backdrop-blur-md shadow-xl"
                }`}
                style={{
                  ...style,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
              >
                {/* Hairline Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 font-mono text-[10px] text-white/30 pointer-events-none select-none">
                  +
                </div>
                <div className="absolute top-2.5 right-2.5 font-mono text-[10px] text-white/30 pointer-events-none select-none">
                  +
                </div>

                {/* Card Top Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400 font-bold">[{card.number}]</span>
                    <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] text-neutral-300">
                      {card.badge}
                    </span>
                  </div>

                  {/* Gradient Visual Pod */}
                  <div
                    className={`h-24 sm:h-28 w-full rounded-2xl bg-gradient-to-br ${card.gradient} p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden shadow-inner border border-white/15`}
                  >
                    <div className="flex items-center justify-between text-white/90">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                        {card.category}
                      </span>
                      <Activity className="h-3.5 w-3.5" />
                    </div>

                    <div className="font-syne font-extrabold text-xs sm:text-sm text-white flex items-center justify-between">
                      <span className="tracking-wider">VERIFIED</span>
                      <span className="font-mono text-[11px] font-normal">{card.metric}</span>
                    </div>
                  </div>

                  <h3 className="font-syne font-bold text-base sm:text-lg text-white tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom Bar */}
                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${isFront ? "bg-amber-400 animate-pulse" : "bg-white/30"}`} />
                    <span>{isFront ? "FOCUSED" : "ORBIT"}</span>
                  </span>
                  <span className="text-amber-400 group-hover:text-white transition-colors">
                    {isFront ? "Inspect Dossier ➔" : "Focus"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Mode Switcher Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.1]">
          {/* Left: Motion+ Exclusive Badge */}
          <div className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            MOTION + EXCLUSIVE
          </div>

          {/* Center Mode Switcher Tabs */}
          <div className="p-1 rounded-full border border-white/15 bg-[#1C1E26] flex items-center gap-1 shadow-lg">
            {(["HELIX", "BARREL", "RING", "SPHERE"] as ProjectionMode[]).map((tab) => {
              const isActive = mode === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleSwitchMode(tab)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-colors duration-200 ${
                    isActive ? "text-black" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-mode-active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white shadow-md -z-10"
                    />
                  )}
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Right helper prompt */}
          <div className="text-xs font-mono text-neutral-400 hidden sm:block">
            Drag horizontally to orbit • Auto-motion active
          </div>
        </div>

        {/* Card Detail Modal */}
        <AnimatePresence>
          {selectedCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="absolute inset-0" onClick={() => setSelectedCard(null)} />

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative z-10 w-full max-w-lg rounded-3xl border border-white/20 bg-[#181A22] p-8 shadow-2xl space-y-6 text-white"
              >
                <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      [{selectedCard.number}] // {selectedCard.category}
                    </span>
                    <h3 className="font-syne font-bold text-2xl text-white">
                      {selectedCard.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="p-2 rounded-full border border-white/15 bg-white/[0.04] text-neutral-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className={`h-36 w-full rounded-2xl bg-gradient-to-br ${selectedCard.gradient} p-5 flex flex-col justify-between border border-white/10 shadow-inner`}>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/90">
                    Live Performance Verified
                  </span>
                  <div className="font-syne font-extrabold text-xl text-white flex justify-between items-center">
                    <span>STATUS: OPTIMAL</span>
                    <span className="font-mono text-sm">{selectedCard.metric}</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {selectedCard.description}
                </p>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <MagneticButton
                    onClick={() => setSelectedCard(null)}
                    className="px-5 py-2.5 rounded-full bg-white text-black font-syne font-bold text-xs cursor-pointer"
                  >
                    Close Dossier
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
