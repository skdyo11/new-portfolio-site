"use client";

import React, { useState } from "react";
import { Server, Activity, Volume2, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

export function SaifaliiSim() {
  const [activeFrequency, setActiveFrequency] = useState("440Hz");
  const { playSound, isMuted, toggleMute } = useAudio();

  const handleTestAudio = (soundName: "click" | "beep" | "hover") => {
    playSound(soundName);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#0C0D0F] text-neutral-200 overflow-hidden font-sans shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-white" />
          <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
            SAIFALII.DEV // Living Digital Lab &amp; Physics Engine
          </span>
        </div>
        <div className="font-mono text-[11px] text-emerald-400">
          ZERO EXTERNAL ASSETS // 100/100 LIGHTHOUSE
        </div>
      </div>

      {/* Main Interactive Laboratory Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3">
            <span>ENGINEERING PERFORMANCE METRICS</span>
            <span>HARDWARE-ACCELERATED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                Scroll Inertia
              </span>
              <div className="font-mono text-xl font-medium text-white">120 FPS</div>
              <p className="text-xs text-neutral-400 font-light">
                Lenis exponential lerp deceleration curve
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                Audio Synthesis
              </span>
              <div className="font-mono text-xl font-medium text-white">&lt; 2ms</div>
              <p className="text-xs text-neutral-400 font-light">
                Native Web Audio oscillators without audio files
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                Ecosystem Mesh
              </span>
              <div className="font-mono text-xl font-medium text-white">3 Live Apps</div>
              <p className="text-xs text-neutral-400 font-light">
                Continuous edge health monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Tactile Audio & Physics Test Bed */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-black/40 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">TACTILE AUDIO CONTEXT TESTER</span>
            <span className="text-neutral-300">
              {isMuted ? "SOUND: MUTED" : "SOUND: ACTIVE"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleTestAudio("click")}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white hover:text-black text-xs font-mono transition-colors"
            >
              Trigger Mechanical Click
            </button>
            <button
              onClick={() => handleTestAudio("beep")}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white hover:text-black text-xs font-mono transition-colors"
            >
              Trigger Harmonic Beep
            </button>
            <button
              onClick={() => handleTestAudio("hover")}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white hover:text-black text-xs font-mono transition-colors"
            >
              Trigger Whisper Pulse
            </button>
          </div>

          <div className="text-[11px] text-neutral-400 font-light pt-1">
            All auditory cues are mathematically computed using real-time Web Audio API sine &amp; bandpass filter nodes, delivering instant tactile feedback with zero network overhead.
          </div>
        </div>
      </div>
    </div>
  );
}
