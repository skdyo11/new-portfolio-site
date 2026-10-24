"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

export function EditorialHero() {
  const { playSound } = useAudio();
  const [headlineRole, setHeadlineRole] = useState<"PRODUCT DESIGNER" | "SYSTEMS ARCHITECT" | "CREATIVE ENGINEER">("PRODUCT DESIGNER");

  const toggleRole = () => {
    playSound("click");
    setHeadlineRole((prev) =>
      prev === "PRODUCT DESIGNER"
        ? "SYSTEMS ARCHITECT"
        : prev === "SYSTEMS ARCHITECT"
        ? "CREATIVE ENGINEER"
        : "PRODUCT DESIGNER"
    );
  };

  const scrollToContact = () => {
    playSound("click");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-[#141518] text-[#ECEBE6] pt-28 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. Giant Condensed Typography Headline */}
      <div className="w-full pt-4 sm:pt-8 text-center sm:text-left">
        <h1
          onClick={toggleRole}
          title="Click to toggle title"
          className="font-anton uppercase tracking-tight text-[#ECEBE6] text-[13.5vw] sm:text-[13vw] leading-[0.88] cursor-pointer hover:opacity-95 transition-opacity"
        >
          {headlineRole}
        </h1>
      </div>

      {/* 2. Three-Column Narrative Sub-Bar */}
      <div className="my-8 sm:my-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 text-xs sm:text-[13px] leading-relaxed text-[#D2D0C9] font-sans items-baseline border-t border-white/[0.08] pt-6">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="font-light">
            I&apos;m currently orchestrating digital systems &amp; high-conversion web platforms for leading tech companies and venture-backed ventures across the globe.
          </p>
        </div>

        <div className="md:col-span-5 lg:col-span-5">
          <p className="font-light">
            I&apos;m a passionate designer and engineer with many years of experience who uses research, data, and thoughtful design to create delightful products that scale.
          </p>
        </div>

        <div className="md:col-span-2 lg:col-span-3 flex md:justify-end">
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-white uppercase underline underline-offset-8 hover:text-[#38C7B8] transition-colors"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Stadium Grid Visual Container with Portrait & Colorful Stickers */}
      <div className="relative w-full min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] rounded-l-3xl rounded-r-3xl md:rounded-l-2xl md:rounded-r-[260px] lg:rounded-r-[320px] overflow-hidden border border-black/10 bg-[#F1EFEA] shadow-2xl flex items-end justify-center">
        
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

        {/* Center Portrait of Saif Ali (With Rounded Corners & Organic Breathing Animation) */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.014, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[500px] aspect-[4/5] max-h-[82%] pointer-events-none rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/saif.jpg"
            alt="Saif Ali"
            fill
            priority
            className="object-cover object-top filter contrast-[1.12] brightness-[0.88] grayscale-[30%] rounded-3xl"
          />
          {/* Subtle bottom fade matching grid background tone */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F1EFEA] via-[#F1EFEA]/40 to-transparent rounded-b-3xl" />
        </motion.div>

        {/* ========================================================= */}
        {/* TACTILE GRAPHIC STICKERS (With Floating/Breathing Motion & Hover Physics) */}
        {/* ========================================================= */}

        {/* STICKER 1: Top-Left Teal Circle Sticker (DESIGN STRATEGY) */}
        <motion.div
          className="absolute top-6 sm:top-12 left-4 sm:left-14 lg:left-24 z-20 pointer-events-auto"
          animate={{ y: [0, -10, 0], rotate: [-1, 2, -1] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-[#38C7B8] text-[#0A0A0A] shadow-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer select-none"
          >
            <div className="flex items-center gap-1 mb-1.5 opacity-90">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-l-full bg-black" />
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-r-full bg-black" />
            </div>

            <span className="font-syne font-extrabold text-sm sm:text-lg leading-tight uppercase tracking-tight">
              DESIGN STRATEGY
            </span>

            <span className="text-[8px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider leading-tight text-neutral-800 mt-1 max-w-[110px] sm:max-w-[130px]">
              ALIGNING YOUR BUSINESS &amp; USER NEEDS
            </span>
          </motion.div>
        </motion.div>

        {/* STICKER 2: Far-Left Yellow Pill Sticker (E-COMM. www. * EXPERIENCES) */}
        <motion.div
          className="absolute bottom-32 sm:bottom-40 left-2 sm:left-6 lg:left-10 z-20 pointer-events-auto"
          animate={{ y: [0, 9, 0], x: [0, 4, 0], rotate: [1, -2, 1] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -7 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.2 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-2xl bg-[#F8C822] text-[#0A0A0A] px-4 sm:px-5 py-3 shadow-2xl cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5 font-sans font-bold text-xs sm:text-sm tracking-tight">
              <span>E—COMM.</span>
              <span className="px-2 py-0.5 rounded-full bg-black text-[#F8C822] font-mono text-[10px]">
                www. ✦
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-syne font-extrabold text-sm sm:text-base tracking-tight uppercase mt-0.5">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-black">
                ●
              </span>
              <span>EXPERIENCES</span>
            </div>
          </motion.div>
        </motion.div>

        {/* STICKER 3: Bottom-Left Orange Angled Badge (MOTION & INTERACTION ➔ DESIGN) */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-10 sm:left-24 lg:left-36 z-20 pointer-events-auto"
          animate={{ y: [0, -8, 0], rotate: [-1, 2, -1] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: -9 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.3 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-2xl bg-[#FF6326] text-white px-5 sm:px-6 py-3.5 shadow-2xl cursor-pointer select-none"
          >
            <div className="font-syne font-extrabold text-sm sm:text-base uppercase tracking-tight flex items-center gap-1.5">
              <span>M</span>
              <span className="tracking-widest font-mono text-xs opacity-90">≡≡</span>
              <span>TION &amp;</span>
            </div>

            <div className="font-syne font-extrabold text-sm sm:text-base uppercase tracking-tight">
              INTERACTION
            </div>

            <div className="font-syne font-extrabold text-sm sm:text-base uppercase tracking-tight text-white/95 mt-0.5 flex items-center gap-1.5">
              <span>➔ DESIGN</span>
            </div>
          </motion.div>
        </motion.div>

        {/* STICKER 4: Upper-Right Hot Pink Notched Label (USER EXPER-IENCE DESIGN ©) */}
        <motion.div
          className="absolute top-16 sm:top-24 right-20 sm:right-48 lg:right-72 z-20 pointer-events-auto"
          animate={{ y: [0, 8, 0], rotate: [-1, 2, -1], scale: [1, 1.025, 1] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 18 }}
            animate={{ scale: 1, opacity: 1, rotate: 4 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.25 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-xl bg-[#FF2A6D] text-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl cursor-pointer select-none"
          >
            <div className="font-syne font-extrabold text-xs sm:text-sm uppercase tracking-tight leading-none">
              USER
            </div>

            <div className="font-syne font-extrabold text-xs sm:text-sm uppercase tracking-tight leading-none mt-1">
              EXPER—IENCE
            </div>

            <div className="font-syne font-extrabold text-xs sm:text-sm uppercase tracking-tight leading-none mt-1 flex items-center gap-1">
              <span>DESIGN</span>
              <span className="text-[10px] font-mono">©</span>
            </div>
          </motion.div>
        </motion.div>

        {/* STICKER 5: Mid-Right Mint Aqua Card (BRANDING & IDENTITY ©'26) */}
        <motion.div
          className="absolute bottom-28 sm:bottom-36 right-4 sm:right-16 lg:right-28 z-20 pointer-events-auto"
          animate={{ y: [0, -9, 0], rotate: [1, -2, 1] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 25 }}
            animate={{ scale: 1, opacity: 1, rotate: 13 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.35 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="rounded-2xl bg-[#42E2B8] text-[#0A0A0A] p-4 sm:p-5 shadow-2xl cursor-pointer select-none max-w-[160px] sm:max-w-[190px]"
          >
            <div className="font-syne font-extrabold text-sm sm:text-base leading-tight uppercase tracking-tight">
              BRANDING &amp; IDENTITY
            </div>

            <div className="flex items-center justify-between mt-2 font-mono text-xs font-bold">
              <span>©&apos;26</span>
              <span className="text-base">✸</span>
            </div>
          </motion.div>
        </motion.div>

        {/* STICKER 6: Bottom-Right Lime Circular Stamp (USABILITY TESTING) */}
        <motion.div
          className="absolute bottom-2 sm:bottom-6 right-16 sm:right-32 lg:right-44 z-20 pointer-events-auto"
          animate={{ y: [0, 10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.4 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 40, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#9DE538] text-[#0A0A0A] shadow-2xl flex items-center justify-center cursor-pointer select-none group"
          >
            <div className="relative z-10 flex items-center justify-center">
              <Globe className="h-7 w-7 sm:h-9 sm:w-9 text-black group-hover:rotate-45 transition-transform duration-500" />
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
        </motion.div>

      </div>
    </section>
  );
}