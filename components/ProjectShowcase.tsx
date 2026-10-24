"use client";

import React, { useState } from "react";
import { Project, ThemeId } from "@/types";
import { PROJECTS } from "@/lib/projectsData";
import { useTheme } from "@/context/ThemeContext";
import { useAudio } from "@/components/AudioEngine";
import { InteractiveTerminalSim } from "@/components/InteractiveTerminalSim";
import { InteractiveRouteCanvas } from "@/components/InteractiveRouteCanvas";
import { InteractiveLuxuryTilt } from "@/components/InteractiveLuxuryTilt";
import { InteractiveOrchestratorTopology } from "@/components/InteractiveOrchestratorTopology";
import {
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Maximize2,
  Terminal,
  Compass,
  Star,
  Activity,
  Zap,
} from "lucide-react";

interface ProjectShowcaseProps {
  onOpenBuildModel: (project: Project) => void;
}

export function ProjectShowcase({ onOpenBuildModel }: ProjectShowcaseProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("dhub");
  const { setTheme } = useTheme();
  const { playSound } = useAudio();

  const handleProjectSelect = (project: Project) => {
    playSound("click");
    setSelectedProjectId(project.id);
    setTheme(project.themeId);
    playSound("beep");
  };

  const currentProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const renderSimulation = (project: Project) => {
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
    <section id="ecosystem" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-theme-primary mb-2">
            <Zap className="h-4 w-4 animate-pulse" />
            <span>Interactive Live Simulation Proving Ground</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Flagship Ecosystem & Systems
          </h2>
        </div>
        <p className="text-sm text-neutral-400 font-mono max-w-lg">
          Click any ecosystem node below to initiate the <span className="text-white font-bold">Theme-Shifting Ambient Engine</span> and engage its live simulated runtime.
        </p>
      </div>

      {/* Project Switcher Navigation Pills */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {PROJECTS.map((proj) => {
          const isActive = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => handleProjectSelect(proj)}
              onMouseEnter={() => playSound("hover")}
              className={`group relative flex items-center gap-3 rounded-xl border px-5 py-3 transition-all duration-300 font-mono text-xs ${
                isActive
                  ? "border-theme-primary bg-white/10 text-white shadow-glow"
                  : "border-white/10 bg-black/40 text-neutral-400 hover:border-white/30 hover:text-white"
              }`}
              style={{
                borderColor: isActive ? proj.accentColor : undefined,
              }}
            >
              <span
                className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: proj.accentColor }}
              />
              <span className="font-bold text-sm tracking-wide">{proj.name}</span>
              <span className="hidden sm:inline text-[10px] text-neutral-400">
                [{proj.badge}]
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Project Display Container */}
      <div
        className="relative rounded-3xl border border-white/15 bg-[#080d19]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all duration-500 overflow-hidden"
        style={{
          boxShadow: `0 20px 80px -20px ${currentProject.glowColor}`,
          borderColor: `${currentProject.accentColor}50`,
        }}
      >
        {/* Ambient Top Glow Beam */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full blur-3xl opacity-30 transition-all duration-700"
          style={{ backgroundColor: currentProject.accentColor }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Project Editorial & Telemetry Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${currentProject.accentColor}25`,
                    color: currentProject.accentColor,
                    borderColor: `${currentProject.accentColor}40`,
                  }}
                >
                  {currentProject.badge}
                </span>
                <span className="font-mono text-xs text-neutral-500">PRODUCTION DEPLOYED</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentProject.name}
              </h3>
              <p
                className="text-sm font-semibold font-mono"
                style={{ color: currentProject.accentColor }}
              >
                {currentProject.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {currentProject.summary}
            </p>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-3 gap-2 font-mono">
              {currentProject.stats.map((stat, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-black/50 p-3">
                  <div className="text-[10px] text-neutral-400 uppercase truncate">{stat.label}</div>
                  <div
                    className="text-base sm:text-lg font-black mt-1"
                    style={{ color: currentProject.accentColor }}
                  >
                    {stat.value}
                  </div>
                  {stat.sublabel && (
                    <div className="text-[9px] text-neutral-500 mt-0.5 truncate">{stat.sublabel}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => onOpenBuildModel(currentProject)}
                className="flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-xs font-bold text-black transition-all duration-200 hover:scale-[1.02] shadow-lg"
                style={{
                  backgroundColor: currentProject.accentColor,
                  boxShadow: `0 0 25px ${currentProject.glowColor}`,
                }}
              >
                <Layers className="h-4 w-4" />
                <span>INSPECT BUILD MODEL</span>
              </button>

              {currentProject.externalLink && (
                <a
                  href={currentProject.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => playSound("hover")}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-mono text-xs text-white hover:bg-white/15 transition-all"
                >
                  <span>Launch External</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Live Simulation Container (7 cols) */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] w-full">
            {renderSimulation(currentProject)}
          </div>
        </div>
      </div>
    </section>
  );
}
