"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAudio } from "@/components/AudioEngine";
import { useTheme } from "@/context/ThemeContext";
import { ArrowDownRight, Terminal, Globe, Sparkles, Activity } from "lucide-react";

export function HeroSection({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const { playSound } = useAudio();
  const { colors } = useTheme();
  const [time, setTime] = useState("");
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Snellenberg Magnetic Button Physics
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setBtnOffset({
      x: (e.clientX - centerX) * 0.35,
      y: (e.clientY - centerY) * 0.35,
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const scrollToProjects = () => {
    playSound("warp");
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-32 pb-12 select-none overflow-hidden font-sans">
      {/* Top Meta Status Row (Snellenberg editorial style) */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: colors.primary }}
            />
          </span>
          <span className="text-white font-bold">SAIFALII.DEV</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300">AVANT-GARDE SYSTEMS & INTERACTION</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-neutral-400" />
            <span>UTC {time || "00:00:00"}</span>
          </div>
          <span className="hidden md:inline text-neutral-500">|</span>
          <div className="hidden md:flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">120 FPS GLSL SHADERS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Center Kinetic Typography (Brutalist massive viewport scale) */}
      <div className="relative z-10 my-auto py-12">
        <div className="overflow-hidden">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 mb-2">
            CREATIVE TECHNOLOGIST & DISTRIBUTED FABRIC ARCHITECT
          </p>
        </div>

        <div className="overflow-hidden">
          <h1 className="text-[13vw] sm:text-[11.5vw] font-black leading-[0.88] tracking-tighter text-white uppercase transition-transform duration-700 hover:scale-[1.01]">
            SAIF ALI
          </h1>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
          <p className="max-w-xl text-base sm:text-xl font-light text-neutral-300 leading-relaxed font-sans">
            Crafting hyper-fluid digital experiences at the bleeding edge where{" "}
            <span className="text-white font-semibold italic">mathematical physics</span>,{" "}
            <span
              className="font-semibold transition-colors duration-500"
              style={{ color: colors.primary }}
            >
              procedural audio
            </span>
            , and{" "}
            <span className="text-white font-semibold">decoupled micro-edge topologies</span>{" "}
            converge.
          </p>

          {/* Magnetic CTA Action */}
          <div className="flex items-center gap-4">
            <button
              ref={btnRef}
              onClick={scrollToProjects}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              onMouseEnter={() => playSound("hover")}
              style={{
                transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                backgroundColor: colors.primary,
                boxShadow: `0 0 35px ${colors.glow}`,
              }}
              className="group relative flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full text-black font-mono text-xs font-bold transition-transform duration-150 ease-out will-change-transform"
            >
              <ArrowDownRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
              <span className="mt-1 tracking-wider text-[11px]">PROJECTS</span>
            </button>

            <button
              onClick={() => {
                playSound("overclock");
                onTriggerKonami();
              }}
              onMouseEnter={() => playSound("hover")}
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-5 py-3.5 font-mono text-xs text-white backdrop-blur-xl transition-all duration-300 hover:border-emerald-400 hover:text-emerald-300"
            >
              <Terminal className="h-4 w-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>TERMINAL OVERCLOCK</span>
              <span className="text-[10px] text-neutral-500">[↑↑↓↓]</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Grid Metrics */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6 font-mono text-xs text-neutral-400">
        <div>
          <span className="text-[10px] text-neutral-500 uppercase block">Discipline 01</span>
          <span className="text-white font-bold text-sm">Edge Micro-Daemons</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 uppercase block">Discipline 02</span>
          <span className="text-white font-bold text-sm">Algorithmic Heuristics</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 uppercase block">Discipline 03</span>
          <span className="text-white font-bold text-sm">GLSL Spatial Shaders</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 uppercase block">Discipline 04</span>
          <span
            className="font-bold text-sm transition-colors duration-500"
            style={{ color: colors.primary }}
          >
            Zero-Asset Audio Synth
          </span>
        </div>
      </div>
    </section>
  );
}
