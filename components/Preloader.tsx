"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAudio } from "@/components/AudioEngine";
import { Terminal, ShieldCheck, Zap } from "lucide-react";

const ASCII_ART = `
  ███████╗ █████╗ ██╗███████╗ █████╗ ██╗     ██╗██╗   ██╗
  ██╔════╝██╔══██╗██║██╔════╝██╔══██╗██║     ██║██║   ██║
  ███████╗███████║██║█████╗  ███████║██║     ██║██║   ██║
  ╚════██║██╔══██║██║██╔══╝  ██╔══██║██║     ██║██║   ██║
  ███████║██║  ██║██║██║     ██║  ██║███████╗██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ 
             [ MASTER ARCHITECTURE CORE v4.9 ]
`;

const BOOT_LOGS = [
  "KERNEL: Initializing V8 Isolate & Edge Micro-daemons...",
  "AUDIO_SYNTH: Calibrating dual-oscillator procedural audio bus...",
  "PHYSICS: Generating 2D N-body particle gravity field...",
  "DHUB_CORE: Priming real-time Firestore delta sync socket...",
  "DREAMROUTES: Loading A* heuristic graph routing indices...",
  "GLAMLUX: Compiling liquid glass WebGL shader pipeline...",
  "SECURITY: Enforcing TLS 1.3 cryptographic integrity...",
  "SYSTEM_STATUS: 100% OPERATIONAL. ALL CORES ACTIVE.",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { playSound } = useAudio();

  const handleBypass = useCallback(() => {
    playSound("warp");
    setIsDone(true);
    setTimeout(onComplete, 400);
  }, [onComplete, playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleBypass();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBypass]);

  useEffect(() => {
    // High-speed energetic boot ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          playSound("success");
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 500);
          }, 350);
          return 100;
        }

        // Advance log index with progress
        const logStep = Math.floor((next / 100) * BOOT_LOGS.length);
        if (logStep !== currentLogIndex) {
          setCurrentLogIndex(logStep);
          playSound("hover");
        }

        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [currentLogIndex, onComplete, playSound]);

  if (isDone) return null;

  return (
    <div
      onClick={handleBypass}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#030712] px-4 font-mono text-cyan-400 select-none transition-opacity duration-500 overflow-hidden"
    >
      {/* Background scanline & grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.6)_51%)] bg-[length:100%_4px] opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)]" />

      {/* Top telemetry bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-neutral-500 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span>SAIFALII_BOOT_ORCHESTRATOR // SYS_ID: 0x9AF4</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-neutral-400">MEM: 128MB / SWAP: OK</span>
          <button
            onClick={handleBypass}
            className="flex items-center gap-1 rounded border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1 text-[11px] text-cyan-300 transition-all hover:bg-cyan-500 hover:text-black"
          >
            <span>SKIP BOOT</span>
            <span className="text-[9px] text-neutral-400">[ESC]</span>
          </button>
        </div>
      </div>

      {/* Center ASCII Insignia */}
      <div className="relative mb-6 text-center">
        <pre className="text-[8px] sm:text-[11px] md:text-[13px] leading-tight font-extrabold tracking-tighter text-cyan-300 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
          {ASCII_ART}
        </pre>
      </div>

      {/* Boot log stream */}
      <div className="w-full max-w-xl rounded-lg border border-cyan-500/30 bg-black/80 p-4 shadow-2xl backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <Zap className="h-3.5 w-3.5 animate-spin" />
            <span className="font-semibold tracking-wider uppercase">Loading Micro-Architecture</span>
          </div>
          <span className="font-bold text-cyan-300">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-cyan-950/60 border border-cyan-500/20">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-75 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal Line Output */}
        <div className="mt-3.5 h-12 overflow-hidden text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="text-emerald-400">▶</span>
            <span className="truncate">{BOOT_LOGS[currentLogIndex] || "Executing final handoff..."}</span>
          </div>
          <div className="mt-1 text-[11px] text-neutral-500 truncate">
            {currentLogIndex > 0 ? BOOT_LOGS[currentLogIndex - 1] : "Syscall register ready."}
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-6 flex items-center gap-2 text-xs text-neutral-600">
        <ShieldCheck className="h-3.5 w-3.5 text-cyan-500/60" />
        <span>CLICK ANYWHERE OR PRESS ESC TO BYPASS PRELOADER</span>
      </div>
    </div>
  );
}
