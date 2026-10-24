"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types";
import { useAudio } from "@/components/AudioEngine";
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
  Github,
} from "lucide-react";

interface BuildModelModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabKey = "architecture" | "techStack" | "aiWorkflows" | "dataPipelines" | "benchmarks";

export function BuildModelModal({ project, isOpen, onClose }: BuildModelModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("architecture");
  const { playSound } = useAudio();

  useEffect(() => {
    if (isOpen) {
      playSound("warp");
      setActiveTab("architecture");
    }
  }, [isOpen, playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const { buildModel } = project;

  const handleTabClick = (tab: TabKey) => {
    playSound("click");
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md">
      <div
        className="relative flex flex-col h-full max-h-[88vh] w-full max-w-5xl rounded-2xl border border-white/20 bg-[#090d16] shadow-2xl overflow-hidden font-sans"
        style={{
          boxShadow: `0 0 60px ${project.glowColor}`,
          borderColor: project.accentColor,
        }}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border text-white"
              style={{
                backgroundColor: `${project.accentColor}25`,
                borderColor: project.accentColor,
              }}
            >
              <Workflow className="h-5 w-5" style={{ color: project.accentColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">{project.name}</h3>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold"
                  style={{
                    backgroundColor: `${project.accentColor}25`,
                    color: project.accentColor,
                    borderColor: `${project.accentColor}40`,
                  }}
                >
                  BUILD MODEL DEEP-DIVE
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">{buildModel.architecture.pattern}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
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
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-neutral-400 hover:bg-white/15 hover:text-white transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-white/10 bg-black/30 px-6 overflow-x-auto">
          {[
            { id: "architecture", label: "01. Architecture Topology", icon: Layers },
            { id: "techStack", label: "02. Tech Stack Matrix", icon: Cpu },
            { id: "aiWorkflows", label: "03. AI Workflows", icon: Bot },
            { id: "dataPipelines", label: "04. Data Pipelines", icon: Database },
            { id: "benchmarks", label: "05. Benchmarks", icon: Gauge },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as TabKey)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-mono whitespace-nowrap transition-all ${
                  isActive
                    ? "border-theme-primary text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
                style={{
                  borderColor: isActive ? project.accentColor : "transparent",
                  color: isActive ? project.accentColor : undefined,
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: ARCHITECTURE */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-sm font-bold text-white mb-2">{buildModel.architecture.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {buildModel.architecture.description}
                </p>
              </div>

              {/* Latency Step Diagram */}
              <div>
                <h5 className="text-xs font-mono uppercase text-neutral-400 mb-3 tracking-wider">
                  Request Execution & State Flow Pipeline
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {buildModel.architecture.diagram.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl border border-white/10 bg-black/60 p-4 transition-all hover:border-white/30"
                    >
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">{item.step}</div>
                      <div className="text-xs font-bold text-white mt-1">{item.node}</div>
                      {item.latency && (
                        <div
                          className="mt-3 inline-block rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold"
                          style={{
                            backgroundColor: `${project.accentColor}20`,
                            color: project.accentColor,
                          }}
                        >
                          Latency: {item.latency}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECH STACK MATRIX */}
          {activeTab === "techStack" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {buildModel.techStack.map((group, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
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
                        className="rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-mono text-neutral-300"
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
                  className="rounded-xl border border-white/10 bg-black/50 p-5 space-y-4 hover:border-white/25 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" style={{ color: project.accentColor }} />
                      <h4 className="text-sm font-bold text-white">{ai.title}</h4>
                    </div>
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${project.accentColor}25`,
                        color: project.accentColor,
                      }}
                    >
                      Model: {ai.model}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{ai.description}</p>

                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-400 mb-2">
                      Execution Pipeline
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {ai.pipeline.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-white">
                            {step}
                          </span>
                          {sIdx < ai.pipeline.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-neutral-500" />
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
                  className="rounded-xl border border-white/10 bg-black/60 p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-500">Source Stream</div>
                    <div className="font-semibold text-white mt-1">{pipe.source}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-500">
                      Transport Flow
                    </div>
                    <div className="font-mono text-neutral-300 mt-1">{pipe.flow}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-500">Destination</div>
                    <div className="font-mono text-white mt-1">{pipe.destination}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-500">
                      Sync Frequency
                    </div>
                    <div
                      className="font-mono font-semibold mt-1"
                      style={{ color: project.accentColor }}
                    >
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
                  className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 space-y-2"
                >
                  <div className="text-xs font-mono uppercase text-neutral-400">{bench.metric}</div>
                  <div className="text-2xl font-extrabold text-white font-mono">{bench.value}</div>
                  <div className="text-xs text-emerald-400 font-semibold">{bench.comparison}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-6 py-3 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Architecture Validated & Verified in Production</span>
          </div>
          <div>PRESS ESC TO CLOSE</div>
        </div>
      </div>
    </div>
  );
}
