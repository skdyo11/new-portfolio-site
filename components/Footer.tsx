"use client";

import React from "react";
import { Terminal, Shield, ArrowUp, Github, Twitter, Linkedin, Heart } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

export function Footer({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const { playSound } = useAudio();

  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050811] py-14 px-4 sm:px-6 lg:px-8 font-mono text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-theme-primary animate-pulse" />
            <span>saifalii.dev // Autonomous Master Hub</span>
          </div>
          <p className="text-[11px] text-neutral-500 max-w-sm">
            Architected with Next.js 14, Web Audio API synthesizers, HTML5 Canvas physics, and
            decoupled micro-edge topologies.
          </p>
        </div>

        {/* Center: Overclock cheat shortcut */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={() => {
              playSound("overclock");
              onTriggerKonami();
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-neutral-300 hover:border-emerald-400 hover:text-emerald-300 transition-all"
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span>CHEAT: ↑ ↑ ↓ ↓ ← → ← → B A</span>
          </button>
          <span className="text-[10px] text-neutral-600">Terminal Overclock Root Exploit</span>
        </div>

        {/* Right: Back to top & links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/saifalii"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 p-2 text-neutral-400 hover:text-white hover:border-white/30 transition-all"
          >
            <Github className="h-4 w-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white hover:bg-white/15 transition-all"
          >
            <span>TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600 gap-2">
        <span>© {new Date().getFullYear()} Saif Ali. All rights reserved. Zero external audio dependencies.</span>
        <span>LATENCY: ZERO // PURITY: 100%</span>
      </div>
    </footer>
  );
}
