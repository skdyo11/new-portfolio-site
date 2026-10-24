"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagneticButton } from "@/components/MagneticButton";
import { useAudio } from "@/components/AudioEngine";
import { X } from "lucide-react";

export function DennisNav({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { playSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    playSound("click");
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Header Navigation (Dennis Snellenberg Exact Match Screenshot #1 & #3) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between font-sans pointer-events-none">
        {/* Left: © Code by Saif (Light Gray Pill for High Contrast on All Backgrounds) */}
        <div className="pointer-events-auto">
          <MagneticButton speed={0.25} scaleOnHover={false}>
            <Link
              href="/"
              onClick={() => playSound("click")}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#EAEBED]/95 text-[#1C1D20] backdrop-blur-md border border-black/10 shadow-lg text-sm font-medium hover:bg-white transition-all"
            >
              <span className="font-light text-neutral-500">©</span>
              <span>Code by Saif</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Right: Work, About, Contact wrapped in Light Gray Pill */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#EAEBED]/95 text-[#1C1D20] backdrop-blur-md border border-black/10 shadow-lg transition-all duration-300 ${
            scrolled ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          {/* Work Link */}
          <MagneticButton speed={0.25}>
            <Link
              href="/work"
              onClick={() => playSound("click")}
              className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#1C1D20] hover:text-black hover:bg-black/5 transition-all"
            >
              <span>Work</span>
              {/* Smooth Animated Dot Underneath */}
              <span
                className={`h-1.5 w-1.5 rounded-full bg-[#1C1D20] transition-all duration-300 ${
                  pathname === "/work"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                }`}
              />
            </Link>
          </MagneticButton>

          {/* About Link */}
          <MagneticButton speed={0.25}>
            <button
              onClick={() => scrollTo("about")}
              className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#1C1D20] hover:text-black hover:bg-black/5 transition-all"
            >
              <span>About</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#1C1D20] transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100" />
            </button>
          </MagneticButton>

          {/* Contact Link */}
          <MagneticButton speed={0.25}>
            <button
              onClick={() => scrollTo("contact")}
              className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#1C1D20] hover:text-black hover:bg-black/5 transition-all"
            >
              <span>Contact</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#1C1D20] transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100" />
            </button>
          </MagneticButton>
        </nav>

        {/* Floating Fixed Circular Hamburger Button (Collapses Nav seamlessly with No Overlap) */}
        <div
          className={`pointer-events-auto fixed top-6 sm:top-8 right-6 sm:right-12 z-50 transition-all duration-400 ${
            scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none md:hidden"
          }`}
        >
          <MagneticButton speed={0.4}>
            <button
              onClick={() => {
                playSound("click");
                setMenuOpen((p) => !p);
              }}
              aria-label="Toggle menu"
              className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#1C1D20] text-white shadow-2xl transition-all duration-300 hover:bg-[#455CE9]"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <div className="flex flex-col gap-1.5 w-6 items-center">
                  <span className="h-0.5 w-6 bg-white transition-transform duration-300" />
                  <span className="h-0.5 w-6 bg-white transition-transform duration-300" />
                </div>
              )}
            </button>
          </MagneticButton>
        </div>
      </header>

      {/* Full-Screen Dennis Snellenberg Slide-In Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative flex flex-col justify-between h-full w-full max-w-lg bg-[#1C1D20] p-8 sm:p-14 text-white font-sans animate-in slide-in-from-right duration-400">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                NAVIGATION
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 text-4xl sm:text-6xl font-light">
              <div className="border-b border-white/10 pb-4">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:translate-x-3 transition-transform duration-300"
                >
                  Home
                </Link>
              </div>
              <div className="border-b border-white/10 pb-4">
                <Link
                  href="/work"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:translate-x-3 transition-transform duration-300"
                >
                  Work
                </Link>
              </div>
              <div className="border-b border-white/10 pb-4">
                <button
                  onClick={() => scrollTo("about")}
                  className="block hover:translate-x-3 transition-transform duration-300"
                >
                  About
                </button>
              </div>
              <div className="border-b border-white/10 pb-4">
                <button
                  onClick={() => scrollTo("contact")}
                  className="block hover:translate-x-3 transition-transform duration-300"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400">
              <div>
                <span className="block text-neutral-500 uppercase text-[10px] font-mono">LOCATION</span>
                <span className="text-white">Pakistan // Remote</span>
              </div>
              <div className="flex gap-4 text-white text-sm">
                <a href="https://github.com/saifalii" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
