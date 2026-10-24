"use client";

import React, { useState, useEffect } from "react";
import { useAudio } from "@/components/AudioEngine";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowDown,
  Terminal,
  Activity,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Cpu,
} from "lucide-react";

export function Hero({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const { playSound } = useAudio();
  const { colors } = useTheme();
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTimeString(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToEcosystem = () => {
    playSound("warp");
    document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden text-center">
      {/* Background radial ambient glow spotlight */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-8">
        {/* Top Status Capsule */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 backdrop-blur-xl font-mono text-xs text-neutral-300">
          <span className="flex h-2 w-2 relative">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: colors.primary }}
            />
          </span>
          <span className="text-neutral-400">TELEMETRY ONLINE:</span>
          <span className="font-bold text-white tracking-wider">
            UTC {timeString || "12:00:00"} // 120 FPS
          </span>
        </div>

        {/* Massive Cyber Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase font-sans">
            ENGINEERING <br className="hidden sm:inline" />
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              WITHOUT LIMITS.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto font-mono text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
            The master architecture proving ground for{" "}
            <strong className="text-white font-bold underline decoration-theme-primary">
              Saif Ali
            </strong>
            . Orchestrating distributed edge microservices, algorithmic graph engines, procedural Web
            Audio synthesizers, and unapologetically over-engineered interactive interfaces.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={scrollToEcosystem}
            onMouseEnter={() => playSound("hover")}
            className="group relative flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-xs font-bold text-black transition-all duration-300 hover:scale-105 shadow-glow"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <Layers className="h-4 w-4" />
            <span>EXPLORE ECOSYSTEM</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => {
              playSound("overclock");
              onTriggerKonami();
            }}
            onMouseEnter={() => playSound("hover")}
            className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/50 px-6 py-3.5 font-mono text-xs font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20"
          >
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>TRIGGER OVERCLOCK</span>
            <span className="text-[10px] text-neutral-500 font-normal">[KONAMI]</span>
          </button>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-10 w-full max-w-4xl border-t border-white/10 font-mono text-xs">
          <div className="p-3 rounded-lg bg-black/40 border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase">Edge Sync</div>
            <div className="text-lg font-bold text-white mt-0.5">&lt; 14ms P99</div>
            <div className="text-[9px] text-neutral-500">Firestore Delta Mesh</div>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase">Routing Engine</div>
            <div className="text-lg font-bold text-theme-primary mt-0.5">1.2M Nodes/s</div>
            <div className="text-[9px] text-neutral-500">Bidirectional A*</div>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase">Shader Render</div>
            <div className="text-lg font-bold text-emerald-300 mt-0.5">120 FPS</div>
            <div className="text-[9px] text-neutral-500">Hardware Accelerated</div>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase">Audio Bus</div>
            <div className="text-lg font-bold text-amber-300 mt-0.5">Procedural</div>
            <div className="text-[9px] text-neutral-500">0 Network Downloads</div>
          </div>
        </div>
      </div>
    </section>
  );
}
