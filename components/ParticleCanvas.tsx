"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { colors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
      isDown: false,
    };

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Violent scatter pulse on click
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 280) {
          const force = (1 - dist / 280) * 18;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
          p.radius = p.baseRadius * 2.5;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // Particle pool setup
    let particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 9500), 160);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 2 + 1;
        const baseA = Math.random() * 0.5 + 0.25;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          baseRadius: r,
          radius: r,
          alpha: baseA,
          baseAlpha: baseA,
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Extract rgb values from theme primary for dynamic alpha tint
      const primaryHex = colors.primary || "#00f0ff";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Velocity dissipation / damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Base idle movement
        if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.1;

        // Mouse repulsion & constellation attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 4;
          const angle = Math.atan2(dy, dx);
          // Scatter away from cursor
          p.vx -= Math.cos(angle) * force * 0.7;
          p.vy -= Math.sin(angle) * force * 0.7;
          p.alpha = Math.min(p.baseAlpha * 2, 0.95);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Return radius to normal smoothly
        p.radius += (p.baseRadius - p.radius) * 0.1;

        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wraparound
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryHex;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Constellation connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 110) {
            const lineAlpha = (1 - cdist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = primaryHex;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw laser connector to cursor if close
        if (dist < mouse.radius * 0.85) {
          const cursorLineAlpha = (1 - dist / (mouse.radius * 0.85)) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = primaryHex;
          ctx.globalAlpha = cursorLineAlpha;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 transition-opacity duration-700"
    />
  );
}
