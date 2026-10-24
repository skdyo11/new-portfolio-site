"use client";

import React, { useState } from "react";
import { useTheme, THEME_CONFIGS } from "@/context/ThemeContext";
import { useAudio } from "@/components/AudioEngine";
import { ThemeId } from "@/types";
import { Terminal, Shield, Zap, Sparkles, Volume2, VolumeX, Menu, X } from "lucide-react";

export function Navbar({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const { activeTheme, setTheme, colors } = useTheme();
  const { isMuted, toggleMute, playSound } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themeOptions: { id: ThemeId; label: string; color: string }[] = [
    { id: "core", label: "Core", color: "#00f0ff" },
    { id: "dhub", label: "dhub", color: "#10b981" },
    { id: "dreamroutes", label: "dreamroutes", color: "#c084fc" },
    { id: "glamlux", label: "glamlux", color: "#fbbf24" },
  ];

  const handleThemeChange = (id: ThemeId) => {
    playSound("click");
    setTheme(id);
    playSound("beep");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 py-4 pointer-events-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Brand Core */}
        <a
          href="#"
          onMouseEnter={() => playSound("hover")}
          className="pointer-events-auto group flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:border-theme-primary hover:shadow-glow"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-theme-primary"></span>
          </span>
          <span className="font-mono text-sm font-black tracking-wider text-white">
            saifalii<span className="text-theme-primary">.dev</span>
          </span>
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-widest text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            v4.9 MASTER
          </span>
        </a>

        {/* Desktop Nav Actions */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3">
          {/* Theme Shift Ambient Engine Switcher */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-xl">
            {themeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleThemeChange(opt.id)}
                title={`Switch to ${opt.label} signature theme`}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono transition-all ${
                  activeTheme === opt.id
                    ? "bg-white/15 text-white font-bold shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Konami Overclock Button */}
          <button
            onClick={() => {
              playSound("overclock");
              onTriggerKonami();
            }}
            onMouseEnter={() => playSound("hover")}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1.5 backdrop-blur-xl font-mono text-xs text-neutral-300 transition-all hover:border-emerald-400 hover:text-emerald-300"
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span>OVERCLOCK</span>
            <span className="text-[9px] text-neutral-500">[↑↑↓↓]</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="pointer-events-auto md:hidden">
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="rounded-full border border-white/10 bg-black/60 p-2 text-white backdrop-blur-xl"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto mt-2 rounded-2xl border border-white/15 bg-black/90 p-4 backdrop-blur-2xl md:hidden space-y-3 font-mono text-xs">
          <div className="text-[10px] text-neutral-400 uppercase">Select Ambient Theme:</div>
          <div className="grid grid-cols-2 gap-2">
            {themeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  handleThemeChange(opt.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2 rounded-lg border text-left ${
                  activeTheme === opt.id
                    ? "bg-white/15 border-white text-white font-bold"
                    : "border-white/10 text-neutral-400"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: opt.color }} />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                onTriggerKonami();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 py-2.5 text-emerald-300 font-bold"
            >
              <Terminal className="h-4 w-4" />
              <span>TERMINAL OVERCLOCK [KONAMI]</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
