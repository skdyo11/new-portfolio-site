"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { useAudio } from "@/components/AudioEngine";

export function DennisFooter({ onTriggerKonami }: { onTriggerKonami: () => void }) {
  const { playSound } = useAudio();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#1C1D20] text-white font-sans select-none overflow-hidden">
      {/* Dennis Snellenberg Organic Curved Dome Transition (Exact CSS Shape) */}
      <div className="relative w-full h-16 sm:h-28 overflow-hidden bg-white pointer-events-none">
        <div
          className="absolute top-0 left-[-25%] w-[150%] h-[200%] rounded-t-[50%] bg-[#1C1D20]"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pt-12 pb-16">
        {/* Main Footer Header (Dennis Snellenberg Exact Match) */}
        <div className="relative pb-24 sm:pb-32">
          {/* Top Row: Avatar + Let's work together */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Circular Avatar */}
              <div className="relative h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-white/20 shadow-xl flex-shrink-0">
                <Image
                  src="/saif.jpg"
                  alt="Saif Ali"
                  fill
                  className="object-cover object-top filter grayscale contrast-110"
                />
              </div>

              {/* Massive Title */}
              <h2 className="text-5xl sm:text-8xl md:text-9xl font-light tracking-tighter text-white leading-none">
                <span className="block">Let’s work</span>
                <span className="block font-normal">together</span>
              </h2>
            </div>

            {/* Downward Arrow (Top Right) */}
            <div className="hidden sm:block self-start pt-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M1 1L13 13M13 13V3M13 13H3"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Horizontal Line with Overlapping Cobalt Blue "Get in touch" Button */}
          <div className="relative mt-16 sm:mt-24 border-t border-white/15">
            {/* Dennis Snellenberg Signature Blue Button (Right Aligned Overlapping Line) */}
            <div className="absolute right-6 sm:right-16 -top-16 sm:-top-24">
              <MagneticButton speed={0.4}>
                <a
                  href="mailto:hello@saifalii.dev"
                  onClick={() => playSound("click")}
                  className="group relative flex h-36 w-36 sm:h-48 sm:w-48 flex-col items-center justify-center rounded-full bg-[#455CE9] text-white shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative overflow-hidden font-sans text-sm sm:text-lg font-normal tracking-wide">
                    <span className="block transition-transform duration-400 group-hover:-translate-y-full">
                      Get in touch
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-400 group-hover:translate-y-0 font-medium">
                      Say hello
                    </span>
                  </div>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Contact Pills (Dennis Snellenberg Exact Match) */}
          <div className="pt-16 sm:pt-20 flex flex-wrap items-center gap-4">
            <MagneticButton speed={0.3}>
              <a
                href="mailto:hello@saifalii.dev"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-5 text-sm sm:text-base font-normal text-white hover:bg-white hover:text-black transition-all"
              >
                <span>hello@saifalii.dev</span>
              </a>
            </MagneticButton>

            <MagneticButton speed={0.3}>
              <a
                href="tel:+923000000000"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-5 text-sm sm:text-base font-normal text-white hover:bg-white hover:text-black transition-all"
              >
                <span>+92 300 0000000</span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Bar: Version, Time & Social Links (Dennis Snellenberg Exact Match) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between text-xs sm:text-sm font-sans text-neutral-400 gap-6">
          <div className="flex items-center gap-8">
            <div>
              <span className="block text-neutral-500 uppercase text-[10px] font-mono tracking-wider">
                VERSION
              </span>
              <span className="text-white font-normal">2026 © Edition</span>
            </div>
            <div>
              <span className="block text-neutral-500 uppercase text-[10px] font-mono tracking-wider">
                LOCAL TIME
              </span>
              <span className="text-white font-normal">{time || "10:15 PM PKT"}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 sm:gap-8 text-white font-normal">
            <a
              href="https://github.com/saifalii"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Twitter
            </a>
            <button
              onClick={scrollToTop}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
