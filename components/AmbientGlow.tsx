"use client";

import React, { useEffect, useRef } from "react";

export function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on mobile/touch devices or low-power screens to save CPU & battery
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isTouch) return;

    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;
    let animId: number | null = null;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(updatePos);
      }
    };

    // Low-overhead direct DOM update loop (zero React state re-renders)
    const updatePos = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.12;
      currentY += dy * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }

      // Stop loop when close to target to release CPU completely (0% CPU at rest)
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        animId = requestAnimationFrame(updatePos);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Soft warm champagne/bronze spotlight - GPU accelerated direct translate3d */}
      <div
        ref={glowRef}
        className="hidden md:block absolute rounded-full blur-[90px] opacity-20 pointer-events-none"
        style={{
          width: "480px",
          height: "480px",
          left: 0,
          top: 0,
          transform: "translate3d(-400px, -400px, 0) translate(-50%, -50%)",
          willChange: "transform",
          background:
            "radial-gradient(circle, rgba(197, 168, 128, 0.22) 0%, rgba(255, 255, 255, 0.04) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
