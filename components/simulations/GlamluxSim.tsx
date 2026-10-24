"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Check, ShieldCheck, Heart } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  concentration: string;
  top: string;
  heart: string;
  base: string;
  gradient: string;
}

export function GlamluxSim() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [selectedFragrance, setSelectedFragrance] = useState<string>("rouge");
  const [isBooked, setIsBooked] = useState(false);
  const { playSound } = useAudio();

  const collection: Fragrance[] = [
    {
      id: "rouge",
      name: "Élixir Bridal N° 01",
      subtitle: "Extrait de Parfum Haute Couture",
      price: "PKR 34,500 / $125",
      concentration: "40% Pure Oil Concentration",
      top: "Damascena Rose, Saffron, Calabrian Bergamot",
      heart: "Lahori Jasmine, Royal Iris, Kashmiri Amber",
      base: "Smoked Oud, Ambergris, Bourbon Vanilla",
      gradient: "from-amber-600/30 via-stone-800/20 to-black",
    },
    {
      id: "walima",
      name: "Walima Lumière N° 04",
      subtitle: "Silk Glow Body & Hair Elixir",
      price: "PKR 28,000 / $100",
      concentration: "35% Scented Velvet Oil",
      top: "Champagne Accord, Pink Pepper, Neroli",
      heart: "White Tuberose, Persian Orange Blossom",
      base: "Creamy Sandalwood, Cashmeran, Silk Musk",
      gradient: "from-yellow-600/25 via-stone-800/20 to-black",
    },
  ];

  const current = collection.find((f) => f.id === selectedFragrance) || collection[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleBook = () => {
    playSound("click");
    setIsBooked(true);
    playSound("beep");
    setTimeout(() => setIsBooked(false), 2400);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#0C0D0F] text-neutral-200 overflow-hidden font-sans shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
            GLAMLUX // Parisian-Pakistani Haute Couture E-Commerce
          </span>
        </div>
        <div className="font-mono text-[11px] text-amber-200/80">
          NEXT.JS ISR // 0.38S LCP
        </div>
      </div>

      {/* Main Interactive Luxury Experience */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3">
            <span>SELECT ATELIER FORMULATION</span>
            <span>MM ALAM ROAD, LAHORE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {collection.map((item) => {
              const isSelected = selectedFragrance === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound("click");
                    setSelectedFragrance(item.id);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                    isSelected
                      ? "border-amber-400/80 bg-amber-950/20 shadow-lg text-white"
                      : "border-white/[0.07] bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                  }`}
                >
                  <div className="text-[10px] font-mono text-amber-300/80 uppercase tracking-wider">
                    {item.concentration}
                  </div>
                  <div className="font-serif italic text-lg text-white mt-1">
                    {item.name}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">{item.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Luxury Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="p-6 sm:p-7 rounded-xl border border-white/10 bg-gradient-to-br from-[#16171B] via-[#101114] to-[#0A0A0C] space-y-5 transition-transform duration-200 ease-out shadow-2xl"
          style={{
            transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90">
                Olfactory Monograph // Bespoke Extraction
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white mt-1">
                {current.name}
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">{current.subtitle}</p>
            </div>

            <div className="font-mono text-sm sm:text-base font-medium text-amber-200">
              {current.price}
            </div>
          </div>

          {/* Olfactory Notes */}
          <div className="space-y-2 pt-2 border-t border-white/[0.08] text-xs">
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 text-[11px] font-mono text-neutral-500 uppercase">Top</span>
              <span className="col-span-9 text-neutral-200 font-light">{current.top}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 text-[11px] font-mono text-neutral-500 uppercase">Heart</span>
              <span className="col-span-9 text-neutral-200 font-light">{current.heart}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 text-[11px] font-mono text-neutral-500 uppercase">Base</span>
              <span className="col-span-9 text-neutral-200 font-light">{current.base}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={handleBook}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-200 text-black hover:bg-white text-xs font-medium transition-all"
            >
              {isBooked ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>PIN Verified &amp; Reserved</span>
                </>
              ) : (
                <span>Reserve Bridal Atelier Session</span>
              )}
            </button>

            <span className="text-[11px] font-mono text-neutral-400">
              COD Security: <span className="text-white">4-Digit SMS OTP Authentication</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
