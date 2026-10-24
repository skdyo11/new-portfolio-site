"use client";

import React, { useState, useRef, useEffect } from "react";
import { Project } from "@/types";
import { PROJECTS } from "@/lib/projectsData";
import { useTheme } from "@/context/ThemeContext";
import { useAudio } from "@/components/AudioEngine";
import { InteractiveTerminalSim } from "@/components/InteractiveTerminalSim";
import { InteractiveRouteCanvas } from "@/components/InteractiveRouteCanvas";
import { InteractiveLuxuryTilt } from "@/components/InteractiveLuxuryTilt";
import { InteractiveOrchestratorTopology } from "@/components/InteractiveOrchestratorTopology";
import {
  ArrowUpRight,
  Layers,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Terminal,
  Activity,
  Maximize2,
} from "lucide-react";

interface ProjectAccordionProps {
  onOpenBuildModel: (project: Project) => void;
}

export function ProjectAccordion({ onOpenBuildModel }: ProjectAccordionProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string>("dhub");
  const { setTheme, colors } = useTheme();
  const { playSound } = useAudio();

  // Floating Magnetic Preview Portal Coordinates (Snellenberg DNA)
  const [portalPos, setPortalPos] = useState({ x: -500, y: -500 });
  const [targetPos, setTargetPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    let frameId: number;
    const follow = () => {
      setPortalPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.12,
        y: prev.y + (targetPos.y - prev.y) * 0.12,
      }));
      frameId = requestAnimationFrame(follow);
    };
    frameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frameId);
  }, [targetPos]);

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    setTargetPos({ x: e.clientX, y: e.clientY });
  };

  const handleProjectHover = (project: Project) => {
    setHoveredProjectId(project.id);
    setTheme(project.themeId);
    playSound("hover");
  };

  const handleProjectLeave = () => {
    setHoveredProjectId(null);
  };

  const toggleExpand = (project: Project) => {
    playSound("click");
    if (expandedProjectId === project.id) {
      setExpandedProjectId("");
    } else {
      setExpandedProjectId(project.id);
      setTheme(project.themeId);
      playSound("beep");
    }
  };

  const renderSimulator = (project: Project) => {
    switch (project.previewType) {
      case "terminal":
        return <InteractiveTerminalSim />;
      case "route-canvas":
        return <InteractiveRouteCanvas />;
      case "luxury-tilt":
        return <InteractiveLuxuryTilt />;
      case "orchestrator-topology":
      default:
        return <InteractiveOrchestratorTopology />;
    }
  };

  return (
    <section
      id="work"
      onMouseMove={handleContainerMouseMove}
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-28 font-sans select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-theme-primary font-bold block mb-2">
            Selected Flagship Works // 2024-2026
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            ARCHITECTED ECOSYSTEM
          </h2>
        </div>
        <p className="max-w-md font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Hover over any project to project its signature ambient shader. Click to deploy its interactive
          in-situ runtime simulation and inspect the underlying Build Model.
        </p>
      </div>

      {/* Accordion List Rows (Dennis Snellenberg Style) */}
      <div className="divide-y divide-white/10">
        {PROJECTS.map((project, index) => {
          const isExpanded = expandedProjectId === project.id;
          const isHovered = hoveredProjectId === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => handleProjectHover(project)}
              onMouseLeave={handleProjectLeave}
              className="group relative transition-all duration-300"
            >
              {/* Row Banner Header */}
              <div
                onClick={() => toggleExpand(project)}
                className="flex items-center justify-between py-8 sm:py-12 cursor-pointer transition-colors duration-300"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-sm sm:text-base font-bold text-neutral-500">
                    0{index + 1}
                  </span>
                  <div className="space-y-1">
                    <h3
                      className={`text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-300 ${
                        isHovered || isExpanded
                          ? "translate-x-3 text-white"
                          : "text-neutral-400 group-hover:text-white"
                      }`}
                      style={{
                        color: isExpanded ? project.accentColor : undefined,
                      }}
                    >
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-neutral-400">
                      <span>{project.tagline}</span>
                      <span className="hidden sm:inline text-neutral-600">//</span>
                      <span
                        className="hidden sm:inline font-bold"
                        style={{ color: project.accentColor }}
                      >
                        {project.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`hidden md:inline font-mono text-xs uppercase px-3 py-1 rounded-full border transition-all ${
                      isExpanded
                        ? "bg-white/15 text-white border-white/30"
                        : "border-white/10 text-neutral-500 group-hover:text-white group-hover:border-white/30"
                    }`}
                  >
                    {isExpanded ? "SIMULATOR ACTIVE" : "EXPAND PREVIEW"}
                  </span>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 ${
                      isExpanded
                        ? "rotate-180 bg-white text-black"
                        : "group-hover:border-white/60 group-hover:bg-white/10 text-white"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Expanded In-Situ Interactive Proving Ground */}
              {isExpanded && (
                <div className="pb-12 pt-2 animate-in fade-in duration-500">
                  <div
                    className="rounded-3xl border border-white/15 bg-black/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden"
                    style={{
                      borderColor: `${project.accentColor}50`,
                      boxShadow: `0 20px 60px -20px ${project.glowColor}`,
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Deep Specs & Action Triggers */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                            {project.headline}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                            {project.summary}
                          </p>
                        </div>

                        {/* Benchmark Statistics Ribbon */}
                        <div className="grid grid-cols-3 gap-2 font-mono">
                          {project.stats.map((stat, sIdx) => (
                            <div key={sIdx} className="rounded-xl border border-white/10 bg-white/5 p-3">
                              <div className="text-[10px] text-neutral-400 uppercase truncate">
                                {stat.label}
                              </div>
                              <div
                                className="text-base sm:text-lg font-black mt-1"
                                style={{ color: project.accentColor }}
                              >
                                {stat.value}
                              </div>
                              {stat.sublabel && (
                                <div className="text-[9px] text-neutral-500 mt-0.5 truncate">
                                  {stat.sublabel}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded-lg border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[11px] text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                          <button
                            onClick={() => onOpenBuildModel(project)}
                            onMouseEnter={() => playSound("hover")}
                            style={{
                              backgroundColor: project.accentColor,
                              boxShadow: `0 0 25px ${project.glowColor}`,
                            }}
                            className="flex items-center gap-2 rounded-xl px-6 py-3.5 font-mono text-xs font-bold text-black transition-all duration-200 hover:scale-[1.03]"
                          >
                            <Layers className="h-4 w-4" />
                            <span>INSPECT BUILD MODEL</span>
                          </button>

                          {project.externalLink && (
                            <a
                              href={project.externalLink}
                              target="_blank"
                              rel="noreferrer"
                              onMouseEnter={() => playSound("hover")}
                              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 font-mono text-xs text-white hover:bg-white/15 transition-all"
                            >
                              <span>Launch Production</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right: Live Interactive Simulator Screen */}
                      <div className="lg:col-span-7 h-[400px] sm:h-[460px] w-full">
                        {renderSimulator(project)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Magnetic Hover Preview Portal (Dennis Snellenberg Style) */}
      {hoveredProjectId && !expandedProjectId && (
        <div
          className="pointer-events-none fixed z-40 hidden lg:block -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/25 bg-black/80 p-3 shadow-2xl backdrop-blur-2xl transition-transform duration-75 will-change-transform"
          style={{
            left: `${portalPos.x}px`,
            top: `${portalPos.y}px`,
            width: "320px",
            height: "190px",
            borderColor: colors.primary,
            boxShadow: `0 15px 40px -10px ${colors.glow}`,
          }}
        >
          <div className="flex flex-col justify-between h-full font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span className="font-bold uppercase text-white">Live Node Preview</span>
              <span style={{ color: colors.primary }}>120 FPS</span>
            </div>
            <div className="text-center py-4">
              <div className="text-xl font-black text-white tracking-tight uppercase">
                {hoveredProjectId}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Click row to initialize interactive runtime simulation
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-neutral-500">
              <span>LATENCY: &lt; 14ms</span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
