"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { PROJECTS } from "@/lib/projectsData";
import { ArrowUpRight, Layers, Play } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";
import { DhubSim } from "@/components/simulations/DhubSim";
import { DreamroutesSim } from "@/components/simulations/DreamroutesSim";
import { GlamluxSim } from "@/components/simulations/GlamluxSim";
import { SaifaliiSim } from "@/components/simulations/SaifaliiSim";
import { MagneticButton } from "@/components/MagneticButton";

interface ShowcaseProps {
  onOpenDrawer?: (project: Project) => void;
}

type StageMode = "simulator" | "pipeline";

export function ProjectMonographShowcase({ onOpenDrawer }: ShowcaseProps) {
  const [activeModes, setActiveModes] = useState<Record<string, StageMode>>({
    dhub: "simulator",
    dreamroutes: "simulator",
    glamlux: "simulator",
    "saifalii.dev": "simulator",
  });

  const { playSound } = useAudio();

  const toggleMode = (id: string, mode: StageMode) => {
    playSound("click");
    setActiveModes((prev) => ({ ...prev, [id]: mode }));
  };

  const getTheme = (id: string) => {
    switch (id) {
      case "dhub":
        return {
          symbol: "❖",
          badgeBorder: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
          cardBorder: "border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.12)]",
          accentColor: "text-cyan-400",
        };
      case "dreamroutes":
        return {
          symbol: "✦",
          badgeBorder: "border-amber-400/30 text-amber-300 bg-amber-400/10",
          cardBorder: "border-amber-400/30 hover:border-amber-300/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(234,179,8,0.12)]",
          accentColor: "text-amber-400",
        };
      case "glamlux":
        return {
          symbol: "✧",
          badgeBorder: "border-rose-400/30 text-rose-300 bg-rose-400/10",
          cardBorder: "border-rose-400/30 hover:border-rose-300/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(251,113,133,0.12)]",
          accentColor: "text-rose-400",
        };
      case "saifalii.dev":
      default:
        return {
          symbol: "◈",
          badgeBorder: "border-white/20 text-white bg-white/10",
          cardBorder: "border-white/25 hover:border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.08)]",
          accentColor: "text-white",
        };
    }
  };

  const renderSim = (id: string) => {
    switch (id) {
      case "dhub":
        return <DhubSim />;
      case "dreamroutes":
        return <DreamroutesSim />;
      case "glamlux":
        return <GlamluxSim />;
      case "saifalii.dev":
      default:
        return <SaifaliiSim />;
    }
  };

  return (
    <section id="work" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 w-full select-none bg-[#141518]">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.1] pb-6 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400 font-semibold">
              01 / SELECTED WORKS (2024 — 2026)
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
              Production Platforms &amp; Systems.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
            High-throughput platforms engineered for extreme velocity, fault tolerance, and tactile interaction.
          </p>
        </div>

        {/* Project Pods (with Framer layoutId + Hover Spring Animation) */}
        <div className="space-y-20 sm:space-y-28">
          {PROJECTS.map((project, idx) => {
            const currentMode = activeModes[project.id] || "simulator";
            const theme = getTheme(project.id);

            return (
              <motion.article
                key={project.id}
                id={project.id}
                layoutId={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className={`relative rounded-3xl border ${theme.cardBorder} bg-[#181A22] overflow-hidden transition-all duration-300 ring-1 ring-white/10`}
              >
                {/* Hairline Corner Crosshairs */}
                <div className={`absolute top-3 left-3 z-20 font-mono text-xs ${theme.accentColor} pointer-events-none select-none font-bold`}>
                  +
                </div>
                <div className={`absolute top-3 right-3 z-20 font-mono text-xs ${theme.accentColor} pointer-events-none select-none font-bold`}>
                  +
                </div>
                <div className={`absolute bottom-3 left-3 z-20 font-mono text-xs ${theme.accentColor} pointer-events-none select-none font-bold`}>
                  +
                </div>
                <div className={`absolute bottom-3 right-3 z-20 font-mono text-xs ${theme.accentColor} pointer-events-none select-none font-bold`}>
                  +
                </div>

                {/* Pod Top Bar */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.1] bg-white/[0.02]">
                  {/* Left: Index & Name */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-400 font-bold">
                      [0{idx + 1}]
                    </span>
                    <span className="h-3 w-px bg-white/20" />
                    <span className="font-syne font-bold text-sm tracking-wider uppercase text-white">
                      {project.name}
                    </span>
                    <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-mono ${theme.badgeBorder}`}>
                      {project.badge}
                    </span>
                  </div>

                  {/* Right: Magnetic Visit Site Button (User Request 6) */}
                  {project.externalLink ? (
                    <MagneticButton
                      onClick={() => {
                        playSound("click");
                        window.open(project.externalLink, "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold shadow-md group/btn cursor-pointer"
                    >
                      <span>Visit Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </MagneticButton>
                  ) : null}
                </div>

                {/* Pod Body: Balanced Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.1]">
                  {/* Left Column: Monograph Headline & Technical Specs */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Bold Headline */}
                      <h3 className="font-syne font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                        {project.headline}
                      </h3>

                      {/* Concise Description */}
                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Verified Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08]">
                        {project.stats.map((s) => (
                          <div key={s.label} className="p-2.5 rounded-xl bg-black/40 border border-white/[0.08]">
                            <div className="text-[9px] font-mono text-neutral-400 uppercase truncate">
                              {s.label}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                              {s.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Core Stack Badges */}
                      <div className="pt-2">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase mb-2">
                          Core Architecture:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mode Switcher: Interactive Demo vs Pipeline */}
                    <div className="pt-4 border-t border-white/[0.08] space-y-2">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        Stage View:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <button
                          onClick={() => toggleMode(project.id, "simulator")}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
                            currentMode === "simulator"
                              ? "bg-white text-black font-bold border-white shadow-sm"
                              : "border-white/15 bg-white/[0.03] text-neutral-400 hover:text-white"
                          }`}
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Live Sandbox</span>
                        </button>

                        <button
                          onClick={() => toggleMode(project.id, "pipeline")}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
                            currentMode === "pipeline"
                              ? "bg-white text-black font-bold border-white shadow-sm"
                              : "border-white/15 bg-white/[0.03] text-neutral-400 hover:text-white"
                          }`}
                        >
                          <Layers className="h-3.5 w-3.5" />
                          <span>Pipeline Specs</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Stage (High-Fidelity, Zero-Lag) */}
                  <div className="lg:col-span-7 p-4 sm:p-6 bg-black/50 flex flex-col justify-center min-h-[460px]">
                    {currentMode === "simulator" ? (
                      /* Live Interactive Simulator */
                      <div className="h-full w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                        {renderSim(project.id)}
                      </div>
                    ) : (
                      /* Architectural Execution Pipeline */
                      <div className="rounded-2xl border border-white/15 bg-[#12141A] p-6 space-y-5 text-neutral-300 shadow-xl">
                        <div className="border-b border-white/[0.08] pb-3">
                          <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                            Data Ingestion &amp; Execution Topology
                          </span>
                          <h4 className="font-syne font-bold text-lg text-white mt-1">
                            {project.buildModel.architecture.title}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                            {project.buildModel.architecture.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.buildModel.architecture.diagram.map((item, dIdx) => (
                            <div
                              key={item.step}
                              className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-1"
                            >
                              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                                <span>0{dIdx + 1}</span>
                                <span className="text-emerald-400 font-semibold">{item.latency}</span>
                              </div>
                              <div className="text-xs font-semibold text-white">
                                {item.step}
                              </div>
                              <div className="text-[10px] text-neutral-400 font-mono truncate">
                                {item.node}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pod Footer Bar */}
                <div className="flex flex-wrap items-center justify-between px-6 sm:px-8 py-3 border-t border-white/[0.1] bg-white/[0.015] text-[10px] font-mono text-neutral-400 gap-3">
                  <span>ARCHITECTURE: {project.buildModel.architecture.pattern}</span>
                  <span>RUNTIME: CLOUDFLARE EDGE V8 ISOLATES</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}