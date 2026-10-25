"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

const ROLES = ["PRODUCT DESIGNER", "SYSTEMS ARCHITECT", "CREATIVE ENGINEER"] as const;

export function EditorialHero() {
  const { playSound } = useAudio();
  const [roleIndex, setRoleIndex] = useState(0);

  // Automatically switch role title every 3.5 seconds (User Request 2)
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const headlineRole = ROLES[roleIndex];

  const toggleRole = () => {
    playSound("click");
    setRoleIndex((prev) => (prev + 1) % ROLES.length);
  };

  const scrollToContact = () => {
    playSound("click");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen bg-[#141518] text-[#ECEBE6] pt-20 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. Giant Condensed Typography Headline (Auto-Cycles with High Attention & Impact) */}
      <div className="w-full pt-1 sm:pt-6 text-center sm:text-left min-h-[58px] sm:min-h-[110px] flex items-center justify-center sm:justify-start">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={headlineRole}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={toggleRole}
            title="Click or wait to switch title"
            className="font-anton uppercase tracking-tight text-white text-[13.5vw] sm:text-[14.5vw] leading-[0.88] cursor-pointer hover:opacity-95 transition-opacity select-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.12)]"
          >
            {headlineRole}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* 2. Narrative Sub-Bar (Ultra-Short & Punchy per User Request 3) */}
      <div className="my-3 sm:my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-10 border-t border-white/[0.08] pt-3 sm:pt-5">
        <p className="text-xs sm:text-sm font-sans font-medium text-neutral-300 tracking-tight">
          Architecting high-scale digital platforms worldwide.
        </p>

        <button
          onClick={scrollToContact}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-amber-400 uppercase hover:text-white transition-colors cursor-pointer"
        >
          <span>GET IN TOUCH</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 3. Bottom Stadium Grid Visual Container with Portrait & Colorful Stickers */}
      <div className="relative w-full min-h-[380px] sm:min-h-[580px] lg:min-h-[640px] rounded-2xl sm:rounded-l-3xl sm:rounded-r-3xl md:rounded-l-2xl md:rounded-r-[260px] lg:rounded-r-[320px] overflow-hidden border border-black/10 bg-[#F1EFEA] shadow-2xl flex items-end justify-center">
        
        {/* Architectural Grid Lines Matting (Animated Black Lines Moving Continuously to the Right) */}
        <div
          className="absolute inset-0 pointer-events-none animate-grid-right"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.13) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.13) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
          }}
        />

        {/* Center Portrait of Saif Ali (Hardware-Accelerated Compositor Breathing Animation) */}
        <div className="animate-portrait-breathe relative z-10 w-[240px] sm:w-[380px] md:w-[460px] lg:w-[500px] aspect-[4/5] max-h-[88%] pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/saif.jpg"
            alt="Saif Ali"
            fill
            priority
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 460px, 500px"
            className="object-cover object-top filter contrast-[1.12] brightness-[0.88] grayscale-[30%] rounded-2xl sm:rounded-3xl"
          />
          {/* Subtle bottom fade matching grid background tone */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F1EFEA] via-[#F1EFEA]/40 to-transparent rounded-b-2xl sm:rounded-b-3xl" />
        </div>

        {/* ========================================================= */}
        {/* TACTILE GRAPHIC STICKERS (Miniaturized on Mobile, Never Flash/Disappear on Load) */}
        {/* ========================================================= */}

        {/* STICKER 1: Top-Left Teal Circle Sticker (DESIGN STRATEGY) */}
        <div className="animate-float-1 absolute top-2 sm:top-12 left-2 sm:left-14 lg:left-24 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="w-14 h-14 sm:w-44 sm:h-44 rounded-full bg-[#38C7B8] text-[#0A0A0A] shadow-lg sm:shadow-2xl flex flex-col items-center justify-center p-1 sm:p-4 text-center cursor-pointer select-none"
          >
            <div className="flex items-center gap-0.5 sm:gap-1 mb-0 sm:mb-1.5 opacity-90">
              <span className="w-1.5 h-1.5 sm:w-4 sm:h-4 rounded-l-full bg-black" />
              <span className="w-1.5 h-1.5 sm:w-4 sm:h-4 rounded-r-full bg-black" />
            </div>

            <span className="font-syne font-extrabold text-[8px] sm:text-lg leading-tight uppercase tracking-tight">
              DESIGN
            </span>

            <span className="hidden sm:block text-[8px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider leading-tight text-neutral-800 mt-1 max-w-[130px]">
              ALIGNING YOUR BUSINESS &amp; USER NEEDS
            </span>
          </motion.div>
        </div>

        {/* STICKER 2: Far-Left Yellow Pill Sticker (E-COMM. www. * EXPERIENCES) */}
        <div className="animate-float-2 absolute bottom-16 sm:bottom-40 left-1.5 sm:left-6 lg:left-10 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-lg sm:rounded-2xl bg-[#F8C822] text-[#0A0A0A] px-2 py-0.5 sm:px-5 sm:py-3 shadow-lg sm:shadow-2xl cursor-pointer select-none"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 font-sans font-bold text-[8px] sm:text-sm tracking-tight">
              <span>E—COMM.</span>
              <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-black text-[#F8C822] font-mono text-[10px]">
                ✦
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 font-syne font-extrabold text-sm sm:text-base tracking-tight uppercase mt-0.5">
              <span>EXPERIENCES</span>
            </div>
          </motion.div>
        </div>

        {/* STICKER 3: Bottom-Left Orange Angled Badge (MOTION & INTERACTION ➔ DESIGN) */}
        <div className="animate-float-3 absolute bottom-2 sm:bottom-10 left-2 sm:left-24 lg:left-36 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-lg sm:rounded-2xl bg-[#FF6326] text-white px-2 py-0.5 sm:px-6 sm:py-3.5 shadow-lg sm:shadow-2xl cursor-pointer select-none"
          >
            <div className="font-syne font-extrabold text-[8px] sm:text-base uppercase tracking-tight flex items-center gap-1">
              <span>MOTION ➔</span>
            </div>

            <div className="hidden sm:block font-syne font-extrabold text-sm sm:text-base uppercase tracking-tight">
              INTERACTION
            </div>

            <div className="hidden sm:flex font-syne font-extrabold text-sm sm:text-base uppercase tracking-tight text-white/95 mt-0.5 items-center gap-1.5">
              <span>➔ DESIGN</span>
            </div>
          </motion.div>
        </div>

        {/* STICKER 4: Upper-Right Hot Pink Notched Label (USER EXPER-IENCE DESIGN ©) */}
        <div className="animate-float-4 absolute top-2 sm:top-24 right-2 sm:right-48 lg:right-72 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-lg sm:rounded-xl bg-[#FF2A6D] text-white px-2 py-0.5 sm:px-5 sm:py-3 shadow-lg sm:shadow-2xl cursor-pointer select-none"
          >
            <div className="font-syne font-extrabold text-[8px] sm:text-sm uppercase tracking-tight leading-none">
              UX DESIGN ©
            </div>

            <div className="hidden sm:block font-syne font-extrabold text-xs sm:text-sm uppercase tracking-tight leading-none mt-1">
              EXPER—IENCE
            </div>
          </motion.div>
        </div>

        {/* STICKER 5: Mid-Right Mint Aqua Card (BRANDING & IDENTITY ©'26) */}
        <div className="animate-float-5 absolute bottom-16 sm:bottom-36 right-1.5 sm:right-16 lg:right-28 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-lg sm:rounded-2xl bg-[#42E2B8] text-[#0A0A0A] px-2 py-1 sm:p-5 shadow-lg sm:shadow-2xl cursor-pointer select-none max-w-[85px] sm:max-w-[190px]"
          >
            <div className="font-syne font-extrabold text-[8px] sm:text-base leading-tight uppercase tracking-tight flex items-center gap-1">
              <span>BRANDING</span>
              <span className="text-[7px] sm:text-xs">✸</span>
            </div>

            <div className="hidden sm:flex items-center justify-between mt-2 font-mono text-xs font-bold">
              <span>©&apos;26</span>
              <span className="text-base">✸</span>
            </div>
          </motion.div>
        </div>

        {/* STICKER 6: Bottom-Right Lime Circular Stamp (USABILITY TESTING) */}
        <div className="animate-float-6 absolute bottom-2 sm:bottom-6 right-2 sm:right-32 lg:right-44 z-20 pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="w-12 h-12 sm:w-36 sm:h-36 rounded-full bg-[#9DE538] text-[#0A0A0A] shadow-lg sm:shadow-2xl flex items-center justify-center cursor-pointer select-none group"
          >
            <div className="relative z-10 flex items-center justify-center">
              <Globe className="h-4 w-4 sm:h-9 sm:w-9 text-black group-hover:rotate-45 transition-transform duration-500" />
            </div>

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow"
              viewBox="0 0 100 100"
            >
              <path
                id="stampPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[8.5px] font-mono font-bold uppercase tracking-[0.16em] fill-black">
                <textPath href="#stampPath" startOffset="0%">
                  * USABILITY TESTING * USABILITY TESTING
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

      </div>
    </section>
  );
}