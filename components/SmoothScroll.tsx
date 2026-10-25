"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // If mobile or touch device, rely on native 120Hz momentum scrolling for maximum responsiveness
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      // Native touch scrolling is 100% hardware-accelerated on mobile devices
      return;
    }

    // Dennis Snellenberg signature smooth inertia scroll engine for Desktop
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    let frameId: number;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
