"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { PROJECTS } from "@/lib/projectsData";
import { MagneticButton } from "@/components/MagneticButton";
import { useAudio } from "@/components/AudioEngine";
import { useTheme } from "@/context/ThemeContext";

interface DennisWorkProps {
  onOpenBuildModel: (project: Project) => void;
}

export function DennisWork({ onOpenBuildModel }: DennisWorkProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [smoothModalPos, setSmoothModalPos] = useState({ x: -500, y: -500 });
  const { playSound } = useAudio();
  const { setTheme } = useTheme();

  // Smooth spring lerp physics for Dennis Snellenberg floating cursor modal
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setSmoothModalPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15,
        y: prev.y + (cursorPos.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [cursorPos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnterRow = (idx: number, project: Project) => {
    setActiveIdx(idx);
    setModalActive(true);
    setTheme(project.themeId);
    playSound("hover");
  };

  const handleMouseLeaveTable = () => {
    setModalActive(false);
    setActiveIdx(null);
  };

  const handleRowClick = (project: Project) => {
    playSound("click");
    onOpenBuildModel(project);
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-white text-[#1C1D20] px-6 sm:px-12 lg:px-24 py-20 sm:py-32 font-sans select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Subtitle (Dennis Snellenberg Exact Match) */}
        <div className="border-b border-[#D2D2D2] pb-6 mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#999D9E]">
            RECENT WORK
          </span>
        </div>

        {/* Project Table Rows (Dennis Snellenberg Exact Match) */}
        <div onMouseLeave={handleMouseLeaveTable} className="divide-y divide-[#D2D2D2]">
          {PROJECTS.map((project, idx) => {
            const isHovered = activeIdx === idx;
            const displayName =
              project.id === "dhub"
                ? "Dhub"
                : project.id === "dreamroutes"
                ? "Dream Routes"
                : "GlamLux";

            const displayCategory =
              project.id === "dhub"
                ? "Interaction & Development"
                : project.id === "dreamroutes"
                ? "Design & Development"
                : "Design & Interaction";

            return (
              <div
                key={project.id}
                onMouseEnter={() => handleMouseEnterRow(idx, project)}
                onClick={() => handleRowClick(project)}
                className="group relative flex items-center justify-between py-10 sm:py-14 md:py-16 cursor-pointer transition-all duration-300"
              >
                {/* Left: Project Title (Dennis Snellenberg Authentic Editorial Sans) */}
                <h3
                  className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] transition-all duration-400 ${
                    isHovered
                      ? "translate-x-4 text-black font-normal"
                      : "text-[#1C1D20] group-hover:text-black"
                  }`}
                >
                  {displayName}
                </h3>

                {/* Right: Category Label */}
                <div className="text-sm sm:text-base font-light tracking-tight text-neutral-500 transition-colors duration-300 group-hover:text-black">
                  {displayCategory}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom "More work" Button (Dennis Snellenberg Exact Signature) */}
        <div className="mt-20 flex justify-center">
          <MagneticButton speed={0.4}>
            <Link
              href="/work"
              onClick={() => playSound("click")}
              className="group flex items-center gap-3 rounded-full border border-[#D2D2D2] bg-transparent px-10 py-5 font-sans text-base font-normal text-[#1C1D20] transition-all duration-300 hover:bg-[#1C1D20] hover:text-white"
            >
              <span>More work</span>
              <span className="text-xs font-mono text-neutral-400 group-hover:text-neutral-300">[3]</span>
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Floating Cursor Modal Window (Dennis Snellenberg Exact Signature) */}
      <div
        className="pointer-events-none fixed z-50 hidden lg:block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl transition-all duration-200 ease-out will-change-transform border border-black/10"
        style={{
          left: `${smoothModalPos.x}px`,
          top: `${smoothModalPos.y}px`,
          width: "420px",
          height: "280px",
          opacity: modalActive ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${modalActive ? 1 : 0.4})`,
        }}
      >
        <div
          className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: `translateY(-${(activeIdx ?? 0) * 100}%)`,
          }}
        >
          {PROJECTS.map((proj) => {
            const isDark = proj.id === "dhub";
            const cardBg =
              proj.id === "dhub"
                ? "#191B1F"
                : proj.id === "dreamroutes"
                ? "#E6E4DE"
                : "#ECE7E0";

            const textColor = isDark ? "text-white" : "text-[#1C1D20]";
            const subTextColor = isDark ? "text-neutral-400" : "text-neutral-600";
            const borderCol = isDark ? "border-white/10" : "border-black/10";

            return (
              <div
                key={proj.id}
                className={`flex h-full w-full flex-col justify-between p-6 ${textColor}`}
                style={{ backgroundColor: cardBg }}
              >
                {/* Clean Browser Bar Header */}
                <div className={`flex items-center justify-between border-b ${borderCol} pb-3`}>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400/40" />
                  </div>
                  <span className="text-[11px] font-mono opacity-60">
                    {proj.id === "dhub"
                      ? "dhub-paused.vercel.app"
                      : proj.id === "dreamroutes"
                      ? "dreamroutes-dusky.vercel.app"
                      : "glamlux.vercel.app"}
                  </span>
                </div>

                {/* Editorial Project Preview Content */}
                <div className="py-2 space-y-1.5">
                  <span className="inline-block text-[11px] uppercase font-mono tracking-wider opacity-70">
                    {proj.badge}
                  </span>
                  <h4 className="text-xl font-normal tracking-tight leading-snug">
                    {proj.headline}
                  </h4>
                  <p className={`text-xs ${subTextColor} line-clamp-2 leading-relaxed`}>
                    {proj.summary}
                  </p>
                </div>

                {/* Minimalist Tech Tags */}
                <div className={`flex items-center justify-between border-t ${borderCol} pt-3 text-[11px] font-mono ${subTextColor}`}>
                  <span>{proj.tags.slice(0, 2).join(" · ")}</span>
                  <span className="font-sans font-medium text-[#455CE9]">Live Case</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating "View" Cursor Button (Dennis Snellenberg Exact Cobalt Blue) */}
      <div
        className="pointer-events-none fixed z-50 hidden lg:flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#455CE9] text-white font-sans text-sm font-normal shadow-2xl transition-all duration-100 ease-out will-change-transform"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: modalActive ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${modalActive ? 1 : 0})`,
        }}
      >
        View
      </div>
    </section>
  );
}
