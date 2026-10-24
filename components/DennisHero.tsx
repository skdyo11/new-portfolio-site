"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function DennisHero() {
  const [xPos, setXPos] = useState(0);
  const xPosRef = useRef(0);
  const directionRef = useRef(-1); // -1 = scrolling down (move left), 1 = scrolling up (move right)
  const lastScrollYRef = useRef(0);

  // Velocity scroll listener: scrolling down moves text LEFT, scrolling up moves text RIGHT
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current) {
        // Scrolling down -> scroll left
        directionRef.current = -1;
      } else if (currentScrollY < lastScrollYRef.current) {
        // Scrolling up -> scroll right
        directionRef.current = 1;
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Continuous tick loop with scroll acceleration
    const tick = () => {
      // Gentle, stately gliding speed
      const baseSpeed = 0.1;
      xPosRef.current += directionRef.current * baseSpeed;

      // Loop wraparound (at 50% width of duplicate text)
      if (xPosRef.current <= -50) {
        xPosRef.current = 0;
      } else if (xPosRef.current > 0) {
        xPosRef.current = -50;
      }

      setXPos(xPosRef.current);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col justify-between overflow-hidden bg-[#1C1D20] text-white select-none">
      {/* Background Image: Saif Ali Full Cover Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/saif.jpg"
          alt="Saif Ali"
          fill
          priority
          className="object-cover object-center filter contrast-[1.08] brightness-[0.70]"
        />
        {/* Editorial Dark Studio & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />
      </div>

      {/* Top Left Hanger Capsule with Dennis Snellenberg Exact Animated Globe */}
      <div className="absolute top-28 sm:top-36 left-0 z-30 flex items-center">
        <div className="flex items-center gap-4 bg-[#1C1D20]/90 backdrop-blur-md border-r border-y border-white/10 text-white pl-6 sm:pl-8 pr-3.5 py-3.5 rounded-r-full shadow-2xl">
          <p className="text-xs sm:text-sm font-normal leading-tight">
            <span className="block text-neutral-400">Located</span>
            <span className="block text-neutral-400">in</span>
            <span className="block font-medium text-white">Pakistan</span>
          </p>

          {/* Dennis Snellenberg 3D Animated Wireframe Globe */}
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2A2B2E] overflow-hidden">
            <div className="dennis-globe">
              <div className="dennis-globe-wrap">
                <div className="dennis-globe-circle" />
                <div className="dennis-globe-circle" />
                <div className="dennis-globe-circle-hor" />
                <div className="dennis-globe-circle-hor-middle" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right Subtitle & Downward Arrow */}
      <div className="absolute top-28 sm:top-36 right-6 sm:right-16 z-30 hidden sm:flex flex-col items-end text-right">
        {/* Dennis Snellenberg Arrow ↘ */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 text-white"
        >
          <path
            d="M1 1L13 13M13 13V3M13 13H3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h4 className="text-xl sm:text-2xl font-light tracking-tight text-white leading-snug">
          <span className="block text-neutral-300">Freelance</span>
          <span className="block font-medium text-white">Designer &amp; Developer</span>
        </h4>
      </div>

      {/* Spacer to allow full view of background portrait */}
      <div className="relative z-10 flex-1 min-h-[60vh]" />

      {/* Giant Text Marquee (Slow, Gliding Stately Motion Across the Viewport) */}
      <div className="pointer-events-none relative z-20 pb-10 sm:pb-16 left-0 right-0 overflow-hidden whitespace-nowrap">
        <div
          className="flex items-center text-[18vw] sm:text-[14.5vw] font-light leading-none tracking-[-0.035em] text-white will-change-transform drop-shadow-md"
          style={{
            transform: `translate3d(${xPos}%, 0, 0)`,
          }}
        >
          <span className="mr-8 flex-shrink-0">Saif Ali —</span>
          <span className="mr-8 flex-shrink-0">Designer &amp; Developer —</span>
          <span className="mr-8 flex-shrink-0">Saif Ali —</span>
          <span className="mr-8 flex-shrink-0">Designer &amp; Developer —</span>
        </div>
      </div>
    </section>
  );
}
