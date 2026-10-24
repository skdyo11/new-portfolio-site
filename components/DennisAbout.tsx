"use client";

import React from "react";
import { MagneticButton } from "@/components/MagneticButton";

export function DennisAbout() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="relative w-full bg-white text-[#1C1D20] px-6 sm:px-12 lg:px-24 py-28 sm:py-40 font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left: Dennis Snellenberg Exact Statement */}
        <div className="lg:col-span-8">
          <h4 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.2] tracking-tight text-[#1C1D20]">
            Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
          </h4>
        </div>

        {/* Right: Sub-statement and Dennis Snellenberg Dark Circular Button */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-10 pt-2">
          <p className="text-base sm:text-lg font-normal text-neutral-600 leading-relaxed">
            The combination of my passion for design, code &amp; interaction positions me in a unique place in the web design world.
          </p>

          <div>
            <MagneticButton speed={0.4}>
              <button
                onClick={scrollToContact}
                className="group relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-[#1C1D20] text-white shadow-xl transition-all duration-300 hover:bg-[#455CE9]"
              >
                <span className="font-sans text-sm sm:text-base font-normal tracking-tight text-white group-hover:scale-105 transition-transform duration-200">
                  About me
                </span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
