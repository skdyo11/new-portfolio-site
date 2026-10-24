"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function CursorAura() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.dataset.interactive === "true")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth physics interpolation for trailing ring
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.16,
        y: prev.y + (position.y - prev.y) * 0.16,
      }));
      frameId = requestAnimationFrame(followCursor);
    };

    frameId = requestAnimationFrame(followCursor);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Restrained Outer Follower Ring */}
      <div
        className="pointer-events-none fixed z-50 transition-all duration-150 ease-out will-change-transform"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovered ? 1.4 : 1
          })`,
        }}
      >
        <div
          className={`h-7 w-7 rounded-full border transition-colors duration-300 ${
            isHovered ? "border-stone-200/50 bg-stone-200/5" : "border-stone-400/20"
          }`}
        />
      </div>

      {/* Pinpoint Micro Dot */}
      <div
        className="pointer-events-none fixed z-50 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-100/80 transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isClicking ? "translate(-50%, -50%) scale(1.6)" : "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
