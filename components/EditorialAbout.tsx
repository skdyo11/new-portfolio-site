"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioEngine";

export function EditorialAbout() {
  const { playSound } = useAudio();

  const handleInitiateChat = () => {
    playSound("click");
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("inquiry-name") || document.getElementById("inquiry-message");
        input?.focus();
      }, 500);
    }
  };

  return (
    <section id="about" className="py-10 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full select-none">
      {/* Cobalt Blue Blueprint Grid Container with Scroll Popup */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#0A3482] text-white p-4 sm:p-10 shadow-2xl border border-blue-400/25 ring-1 ring-white/10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      >
        {/* Top Clean Bar (Pills & Overlapping Bar Removed As Requested) */}
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          {/* Left Brand Badge */}
          <button
            onClick={() => {
              playSound("click");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="grid grid-cols-3 gap-0.5 p-1 rounded bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="h-0.5 w-0.5 rounded-full bg-white" />
              ))}
            </div>
            <span className="font-syne font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-blue-200 transition-colors">
              Saif Ali / Dev
            </span>
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4 text-xs font-medium font-sans">
            <a
              href="https://github.com/saifalii"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("click")}
              className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors underline underline-offset-4"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <button
              onClick={handleInitiateChat}
              className="px-4 py-1.5 rounded-full bg-white text-[#0A3482] hover:bg-neutral-100 font-bold transition-all shadow-md text-xs cursor-pointer"
            >
              Initiate Chat
            </button>
          </div>
        </div>

        {/* Upper Hero Area with Two Stat Badges + Typography (Zero Text Overlap) */}
        <div className="relative pt-6 sm:pt-8 pb-10">
          {/* Mobile: Symmetrical 2-Column Metric Row | Desktop: Anchored Top Corners */}
          <div className="flex sm:block items-center justify-between gap-3 mb-6 sm:mb-0">
            {/* Left Glass Metric Card */}
            <div className="sm:absolute sm:top-6 sm:left-0 z-10 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md shadow-lg flex-1 sm:flex-initial text-left">
              <div className="font-syne font-extrabold text-lg sm:text-2xl text-white tracking-tight whitespace-nowrap">
                4+
              </div>
              <div className="text-[8.5px] sm:text-[10px] font-mono uppercase tracking-wider text-white/70 mt-0.5 whitespace-nowrap">
                PRODUCTION APPS
              </div>
            </div>

            {/* Right Glass Metric Card */}
            <div className="sm:absolute sm:top-6 sm:right-0 z-10 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md shadow-lg flex-1 sm:flex-initial text-right">
              <div className="font-syne font-extrabold text-lg sm:text-2xl text-white tracking-tight whitespace-nowrap">
                99.98%
              </div>
              <div className="text-[8.5px] sm:text-[10px] font-mono uppercase tracking-wider text-white/70 mt-0.5 whitespace-nowrap">
                SYSTEM UPTIME
              </div>
            </div>
          </div>

          {/* Center Giant Bold Typography: WILD CREATIVE CODE */}
          <div className="text-center relative py-5 sm:py-8 overflow-hidden max-w-full">
            <h2 className="font-syne font-extrabold uppercase tracking-tight text-white text-[9.5vw] sm:text-7xl lg:text-8xl leading-[0.9] drop-shadow-md break-words">
              <span className="block">WILD</span>
              <span className="block">CREATIVE</span>
              <span className="block">CODE</span>
            </h2>

            {/* Overlapping Orange Circular Rotating Badge */}
            <div
              style={{ transform: "rotate(15deg)" }}
              onClick={() => playSound("click")}
              className="absolute right-0 sm:right-12 lg:right-20 bottom-0 z-20 w-12 h-12 sm:w-22 sm:h-22 rounded-full bg-[#FF5500] text-white shadow-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-200"
            >
              <span className="text-base sm:text-2xl font-black">⚡</span>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow"
                viewBox="0 0 100 100"
              >
                <path
                  id="aboutStampPath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[9px] font-mono font-bold uppercase tracking-[0.14em] fill-white">
                  <textPath href="#aboutStampPath" startOffset="0%">
                    * ZERO SLOP * CRAFT OVER FLUFF *
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-white/90 font-sans font-light max-w-md mx-auto leading-relaxed pt-2">
            Zero code bloat. Just pure engineering energy.
          </p>
        </div>

        {/* Bottom 4 Feature Cards (Compact 2x2 Grid on Mobile to Reduce Scroll Height) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-4 sm:pt-6 border-t border-white/15">
          {/* CARD 1: Orange */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FF4500] text-white flex flex-col justify-between min-h-[145px] sm:min-h-[210px] shadow-lg transition-transform hover:-translate-y-1 duration-200">
            <div>
              <h3 className="font-syne font-bold text-xs sm:text-lg uppercase tracking-tight">
                STEAL MY STACK
              </h3>
              <p className="text-[10px] sm:text-[11px] text-white/90 font-light mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Production-ready architectures. Pure velocity.
              </p>
            </div>
            <div className="flex flex-wrap gap-1 pt-2 sm:pt-3">
              {["Next.js", "TypeScript", "Tailwind"].map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-black/30 text-[8px] sm:text-[9px] font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 2: Peach / Sand */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F9D6C4] text-[#1E293B] flex flex-col justify-between min-h-[145px] sm:min-h-[210px] shadow-lg transition-transform hover:-translate-y-1 duration-200">
            <div>
              <h3 className="font-syne font-bold text-xs sm:text-lg uppercase tracking-tight text-[#0F172A]">
                ARCHITECTURE
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#334155] font-light mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Cloudflare V8 isolates, Next.js ISR, and Firestore shards.
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-2 sm:pt-3">
              <span className="px-2 py-0.5 rounded bg-white text-[#0A3482] text-[9px] sm:text-[10px] font-mono font-bold shadow-sm">
                ⚛ React
              </span>
              <span className="px-2 py-0.5 rounded bg-[#0F172A] text-white text-[9px] sm:text-[10px] font-mono font-bold shadow-sm">
                ▲ Next
              </span>
            </div>
          </div>

          {/* CARD 3: Electric Purple */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#6D28D9] text-white flex flex-col justify-between min-h-[145px] sm:min-h-[210px] shadow-lg transition-transform hover:-translate-y-1 duration-200">
            <div>
              <h3 className="font-syne font-bold text-xs sm:text-lg uppercase tracking-tight">
                THE CRAFT
              </h3>
              <p className="text-[10px] sm:text-[11px] text-white/90 font-light mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Kinetic motion and resilient distributed systems.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 sm:pt-3">
              <div className="relative h-6 w-6 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-white shadow-md shrink-0">
                <Image src="/saif.jpg" alt="Saif Ali" fill className="object-cover object-top" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono text-purple-200 truncate">
                Worldwide
              </span>
            </div>
          </div>

          {/* CARD 4: Mint / Cyan */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#D9F2F7] text-[#0F172A] flex flex-col justify-between min-h-[145px] sm:min-h-[210px] shadow-lg transition-transform hover:-translate-y-1 duration-200">
            <div>
              <h3 className="font-syne font-bold text-xs sm:text-lg uppercase tracking-tight text-[#0F172A]">
                HIGH-IMPACT
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#334155] font-light mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Direct venture collaboration. Less meetings, more shipping.
              </p>
            </div>
            <button
              onClick={handleInitiateChat}
              className="w-full py-1.5 px-2.5 rounded-lg sm:rounded-xl bg-[#0A3482] text-white text-[9px] sm:text-[11px] font-mono font-semibold flex items-center justify-between hover:bg-blue-900 transition-colors shadow-sm cursor-pointer"
            >
              <span>Available</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}