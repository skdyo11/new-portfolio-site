"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types";
import { useAudio } from "@/components/AudioEngine";
import { useTheme } from "@/context/ThemeContext";
import {
  X,
  Layers,
  Cpu,
  Bot,
  Database,
  Gauge,
  ArrowRight,
  Workflow,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface BuildModelDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "architecture" | "techStack" | "aiWorkflows" | "dataPipelines" | "benchmarks";

export function BuildModelDrawer({ project, isOpen, onClose }: BuildModelDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("architecture");
  const { playSound } = useAudio();
  const { colors } = useTheme();

  useEffect(() => {
    if (isOpen) {
      playSound("warp");
      setActiveTab("architecture");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        playSound("click");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, playSound]);

  if (!isOpen || !project) return null;

  const { buildModel } = project;

  const switchTab = (tab: TabType) => {
    playSound("click");
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md transition-all duration-300">
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-Over Drawer Container */}
      <div
        className="relative z-10 flex flex-col h-full w-full max-w-2xl sm:max-w-3xl border-l border-white/15 bg-[#070b16]/95 backdrop-blur-3xl shadow-2xl overflow-hidden font-sans transition-all duration-500 will-change-transform"
        style={{
          boxShadow: `-10px 0 50px -10px ${project.glowColor}`,
          borderColor: `${project.accentColor}40`,
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-6 sm:px-8 py-5">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: `${project.accentColor}20`,
                borderColor: project.accentColor,
                color: project.accentColor,
              }}
            >
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight uppercase">
                  {project.name}
                </h3>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase"
                  style={{
                    backgroundColor: `${project.accentColor}25`,
                    color: project.accentColor,
                  }}
                >
                  BUILD MODEL
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono tracking-wide">
                {buildModel.architecture.pattern}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound("hover")}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              onClick={() => {
                playSound("click");
                onClose();
              }}
              onMouseEnter={() => playSound("hover")}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-neutral-400 hover:text-white hover:bg-white/15 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector Navigation Bar */}
        <div className="flex items-center border-b border-white/10 bg-black/20 px-6 sm:px-8 overflow-x-auto scrollbar-none">
          {[
            { id: "architecture", label: "01. Architecture Topology", icon: Layers },
            { id: "techStack", label: "02. Tech Matrix", icon: Cpu },
            { id: "aiWorkflows", label: "03. AI Workflows", icon: Bot },
            { id: "dataPipelines", label: "04. Data Pipelines", icon: Database },
            { id: "benchmarks", label: "05. Benchmarks", icon: Gauge },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id as TabType)}
                onMouseEnter={() => playSound("hover")}
                className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                  isActive ? "text-white font-bold" : "border-transparent text-neutral-400 hover:text-white"
                }`}
                style={{
                  borderColor: isActive ? project.accentColor : "transparent",
                  color: isActive ? project.accentColor : undefined,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Body Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB 1: ARCHITECTURE TOPOLOGY */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  Design Logic & Core Pattern
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  {buildModel.architecture.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  {buildModel.architecture.description}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                  Decoupled Execution Pipeline
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {buildModel.architecture.diagram.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-xl border border-white/10 bg-black/60 p-4 transition-all hover:border-white/30"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                        <span>{item.step}</span>
                        {item.latency && (
                          <span
                            className="font-bold px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${project.accentColor}20`,
                              color: project.accentColor,
                            }}
                          >
                            {item.latency}
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-2">
                        {item.node}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECH STACK MATRIX */}
          {activeTab === "techStack" && (
            <div className="grid grid-cols-1 gap-4">
              {buildModel.techStack.map((group, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span>{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs font-mono text-neutral-200 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: AI WORKFLOWS */}
          {activeTab === "aiWorkflows" && (
            <div className="space-y-4">
              {buildModel.aiWorkflows.map((ai, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-black/60 p-6 space-y-4 transition-all hover:border-white/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="h-4 w-4" style={{ color: project.accentColor }} />
                      <h4 className="text-base font-bold text-white">{ai.title}</h4>
                    </div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${project.accentColor}25`,
                        color: project.accentColor,
                      }}
                    >
                      {ai.model}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {ai.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Inference & Evaluation Pipeline
                    </div>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      {ai.pipeline.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white">
                            {step}
                          </span>
                          {sIdx < ai.pipeline.length - 1 && (
                            <ChevronRight className="h-3 w-3 text-neutral-500" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DATA PIPELINES */}
          {activeTab === "dataPipelines" && (
            <div className="space-y-3">
              {buildModel.dataPipelines.map((pipe, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-black/60 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono"
                >
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Source Node
                    </div>
                    <div className="text-white font-bold mt-1 text-sm">{pipe.source}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Flow Protocol
                    </div>
                    <div className="text-neutral-300 mt-1">{pipe.flow}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Destination Shard
                    </div>
                    <div className="text-white mt-1">{pipe.destination}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Retention & Sync
                    </div>
                    <div className="font-bold mt-1" style={{ color: project.accentColor }}>
                      {pipe.retentionOrSync}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: BENCHMARKS */}
          {activeTab === "benchmarks" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {buildModel.benchmarks.map((bench, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/60 p-6 space-y-2 font-mono"
                >
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                    {bench.metric}
                  </div>
                  <div className="text-3xl font-black text-white">{bench.value}</div>
                  <div className="text-xs text-emerald-400 font-semibold">{bench.comparison}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Telemetry */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-6 sm:px-8 py-4 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Architecture Tested & Deployed in Production</span>
          </div>
          <span>[ESC TO CLOSE]</span>
        </div>
      </div>
    </div>
  );
}
