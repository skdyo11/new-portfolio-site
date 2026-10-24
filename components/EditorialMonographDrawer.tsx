"use client";

import React, { useEffect } from "react";
import { Project } from "@/types";
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, Activity, ShieldCheck } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface DrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditorialMonographDrawer({ project, isOpen, onClose }: DrawerProps) {
  const { playSound } = useAudio();

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative flex flex-col justify-between h-full w-full max-w-2xl bg-[#181920] border-l border-white/15 text-neutral-200 overflow-y-auto z-10 shadow-2xl animate-in slide-in-from-right duration-400">
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.08] bg-[#181920]/95 px-6 sm:px-8 py-5 backdrop-blur-md">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              SPECIFICATION SHEET // {project.badge}
            </span>
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white mt-0.5">
              {project.name}
            </h3>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 font-sans">
          {/* Architecture Overview */}
          <section className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              01. System Architecture
            </span>
            <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2">
              <div className="font-medium text-sm text-white">
                {project.buildModel.architecture.pattern}
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {project.buildModel.architecture.description}
              </p>
            </div>
          </section>

          {/* Pipeline */}
          <section className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              02. Execution Pipeline
            </span>
            <div className="space-y-2">
              {project.buildModel.architecture.diagram.map((item, idx) => (
                <div
                  key={item.step}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.01]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-xs font-mono text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-white">{item.step}</div>
                      <div className="text-[11px] font-mono text-neutral-400">{item.node}</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-emerald-400">{item.latency}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              03. Technology Stack
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.buildModel.techStack.map((stack) => (
                <div
                  key={stack.category}
                  className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.01] space-y-2"
                >
                  <div className="font-mono text-[10px] uppercase text-neutral-400">
                    {stack.category}
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-300 font-light">
                    {stack.items.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Benchmarks */}
          <section className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              04. Verified Benchmarks
            </span>
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] font-mono text-xs">
              {project.buildModel.benchmarks.map((bm) => (
                <div key={bm.metric} className="py-3 flex items-center justify-between">
                  <span className="text-neutral-400">{bm.metric}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{bm.value}</span>
                    <span className="text-[11px] text-neutral-400">({bm.comparison})</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Production Guarantees */}
          <section className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              05. Production Guarantees
            </span>
            <div className="space-y-2">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 border-t border-white/[0.08] bg-[#0C0D0F]/95 p-6 backdrop-blur-md flex items-center justify-between">
          <span className="font-mono text-xs text-neutral-400">
            ENGINEERED BY SAIF ALI
          </span>

          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("click")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors"
            >
              <span>Visit Live Platform</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
