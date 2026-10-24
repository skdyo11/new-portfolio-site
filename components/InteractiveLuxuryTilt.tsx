"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Eye, ShoppingBag, Droplets, Star } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

export function InteractiveLuxuryTilt() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [activeFormulation, setActiveFormulation] = useState(0);
  const { playSound } = useAudio();

  const formulations = [
    {
      name: "ROUGE ROYAL N°01 // BRIDAL ELIXIR",
      concentration: "Haute Couture Extrait (40% Oil)",
      topNotes: "Damascena Rose, Saffron, Calabrian Bergamot",
      heartNotes: "Lahori Jasmine, Royal Iris, Kashmiri Amber",
      baseNotes: "Smoked Oud, Ambergris, Bourbon Vanilla",
      price: "PKR 34,500 / $125",
      bottleTint: "from-amber-600/40 via-yellow-700/20 to-black",
      goldAccent: "#D4AF37",
    },
    {
      name: "WALIMA LUMIÈRE N°04 // ATELIER GLOW",
      concentration: "Pure Scented Elixir (35% Oil)",
      topNotes: "Champagne Accord, Pink Pepper, Neroli",
      heartNotes: "White Tuberose, Persian Orange Blossom",
      baseNotes: "Sandalwood, Cashmeran, Silk Musk",
      price: "PKR 28,000 / $100",
      bottleTint: "from-yellow-500/40 via-amber-600/20 to-black",
      goldAccent: "#FBBF24",
    },
  ];

  const current = formulations[activeFormulation];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -14;
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const switchFormulation = (idx: number) => {
    playSound("click");
    setActiveFormulation(idx);
    playSound("beep");
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-amber-500/30 bg-[#140f06] shadow-2xl overflow-hidden font-sans">
      {/* Luxe Header */}
      <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-950/40 px-3.5 py-2.5 font-mono text-xs">
        <div className="flex items-center gap-2 text-amber-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-semibold text-[11px] tracking-widest uppercase">
            Glamlux Atelier // Liquid 3D Glare
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>HAUTE COUTURE</span>
        </div>
      </div>

      {/* 3D Interactive Card Zone */}
      <div
        className="flex-1 relative flex items-center justify-center p-4 bg-gradient-to-b from-black/80 to-[#120d04] overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-sm rounded-2xl border border-amber-500/40 bg-gradient-to-br from-neutral-900/90 via-black to-neutral-950/90 p-5 shadow-[0_20px_50px_rgba(234,179,8,0.15)] transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing will-change-transform"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Holographic Specular Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 230, 150, 0.45) 0%, transparent 60%)`,
            }}
          />

          {/* Luxury Bottle Geometric Representation */}
          <div className="relative mb-3 flex items-center justify-center py-2">
            <div
              className={`h-28 w-20 rounded-t-sm rounded-b-2xl border border-amber-400/60 bg-gradient-to-b ${current.bottleTint} shadow-[0_0_30px_rgba(234,179,8,0.2)] flex flex-col items-center justify-between p-2 relative overflow-hidden`}
            >
              {/* Gold Cap */}
              <div className="w-10 h-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 rounded-t-sm shadow-sm" />

              {/* Fragrance Label */}
              <div className="text-center font-mono">
                <div className="text-[8px] tracking-widest text-amber-300 font-bold uppercase">GLAMLUX</div>
                <div className="text-[6px] tracking-widest text-neutral-400">PARIS • LAHORE</div>
              </div>

              {/* Scent Fluid Level Shimmer */}
              <div className="w-full h-8 bg-amber-500/20 rounded-b-xl border-t border-amber-400/30 flex items-center justify-center">
                <Droplets className="h-3 w-3 text-amber-300/60 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="text-center space-y-1">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-amber-100">
              {current.name}
            </h4>
            <div className="text-[10px] font-mono tracking-widest text-amber-400/90 uppercase">
              {current.concentration}
            </div>
          </div>

          {/* Scent Note Pyramid Matrix */}
          <div className="mt-3.5 space-y-1.5 rounded-lg border border-amber-500/20 bg-black/50 p-2.5 text-[10px] font-mono">
            <div className="flex justify-between items-center text-amber-200/90">
              <span className="text-amber-500 font-semibold uppercase">Top Notes:</span>
              <span className="text-neutral-300 truncate max-w-[160px]">{current.topNotes}</span>
            </div>
            <div className="flex justify-between items-center text-amber-200/90">
              <span className="text-amber-400 font-semibold uppercase">Heart:</span>
              <span className="text-neutral-300 truncate max-w-[160px]">{current.heartNotes}</span>
            </div>
            <div className="flex justify-between items-center text-amber-200/90">
              <span className="text-amber-600 font-semibold uppercase">Base:</span>
              <span className="text-neutral-300 truncate max-w-[160px]">{current.baseNotes}</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="mt-3.5 flex items-center justify-between pt-1">
            <span className="font-mono text-sm font-bold text-amber-300">{current.price}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchFormulation(activeFormulation === 0 ? 1 : 0)}
                className="rounded-full border border-amber-500/40 bg-amber-950/40 px-2.5 py-1 text-[10px] font-mono text-amber-300 hover:bg-amber-500 hover:text-black transition-colors"
              >
                Switch Edition
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs */}
      <div className="flex items-center justify-between border-t border-amber-500/20 bg-amber-950/20 px-3.5 py-2 font-mono text-[10px] text-amber-400/80">
        <span>Sub-second Next.js ISR</span>
        <span className="text-amber-300 font-bold">Liquid Glass Refraction</span>
      </div>
    </div>
  );
}
