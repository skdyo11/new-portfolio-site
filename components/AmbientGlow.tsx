"use client";

import React, { useEffect, useState } from "react";

export function AmbientGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [targetPos, setTargetPos] = useState({ x: -400, y: -400 });

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth lerp loop
    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.08,
        y: prev.y + (targetPos.y - prev.y) * 0.08,
      }));
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [targetPos.x, targetPos.y]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000"
    >
      {/* Soft warm champagne/bronze spotlight */}
      <div
        className="absolute rounded-full blur-[140px] will-change-transform opacity-25"
        style={{
          width: "600px",
          height: "600px",
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(197, 168, 128, 0.18) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
