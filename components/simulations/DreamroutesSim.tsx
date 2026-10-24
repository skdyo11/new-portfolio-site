"use client";

import React, { useState } from "react";
import { Compass, Navigation, Plane, ArrowRight, ShieldCheck, Calendar, Clock } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface RouteOption {
  id: string;
  destination: string;
  country: string;
  stops: string;
  visaDossier: string;
  duration: string;
  coordinates: { x: number; y: number };
}

export function DreamroutesSim() {
  const [selectedRoute, setSelectedRoute] = useState<string>("paris");
  const [isCalculating, setIsCalculating] = useState(false);
  const { playSound } = useAudio();

  const routes: RouteOption[] = [
    {
      id: "paris",
      destination: "Paris (CDG) & Côte d'Azur",
      country: "France — Schengen Area",
      stops: "Direct Corridor via Dubai",
      visaDossier: "VFS Priority Biometrics / 7-Day Guarantee",
      duration: "9h 40m Total Transit",
      coordinates: { x: 340, y: 55 },
    },
    {
      id: "milan",
      destination: "Milan (MXP) & Lake Como",
      country: "Italy — Schengen Area",
      stops: "Executive Transit via Istanbul",
      visaDossier: "Embassy Slot Accelerated Alert",
      duration: "8h 50m Total Transit",
      coordinates: { x: 280, y: 80 },
    },
    {
      id: "zurich",
      destination: "Zurich (ZRH) Alpine Route",
      country: "Switzerland — Schengen Area",
      stops: "Scenic Corridor / Private Rail Access",
      visaDossier: "High-Net-Worth Diplomatic Protocol",
      duration: "10h 15m Total Transit",
      coordinates: { x: 260, y: 70 },
    },
  ];

  const current = routes.find((r) => r.id === selectedRoute) || routes[0];

  const handleSelectRoute = (id: string) => {
    playSound("click");
    setIsCalculating(true);
    setSelectedRoute(id);
    setTimeout(() => {
      playSound("beep");
      setIsCalculating(false);
    }, 250);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#0C0D0F] text-neutral-200 overflow-hidden font-sans shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <Plane className="h-4 w-4 text-white" />
          <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
            DREAMROUTES // Algorithmic Flight &amp; Schengen Visa Pathfinding
          </span>
        </div>
        <div className="font-mono text-[11px] text-neutral-400">
          GLOBAL GDS STREAM // SYNCED
        </div>
      </div>

      {/* Main Interactive Route Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3">
            <span>SELECT LUXURY ITINERARY CORRIDOR</span>
            <span>DEPARTURE: LAHORE (LHE) / ISLAMABAD (ISB)</span>
          </div>

          {/* Route Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {routes.map((route) => {
              const isSelected = selectedRoute === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => handleSelectRoute(route.id)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                    isSelected
                      ? "border-white bg-white/10 shadow-lg text-white"
                      : "border-white/[0.07] bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                  }`}
                >
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {route.country}
                  </div>
                  <div className="font-medium text-sm text-white mt-1 leading-snug">
                    {route.destination}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-2 font-mono flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-neutral-400" />
                    <span>{route.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flight Corridor Canvas Visualization */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-black/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
            <span className="text-neutral-400">PATHFINDING ITINERARY DOSSIER</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              99.4% Schengen Visa Approval Rate
            </span>
          </div>

          {/* Interactive Route Topology Diagram */}
          <div className="relative h-28 w-full rounded-lg border border-white/[0.05] bg-[#0E0F12] overflow-hidden flex items-center justify-between px-6 sm:px-12">
            {/* Origin */}
            <div className="text-center z-10">
              <div className="h-8 w-8 rounded-full border border-white/30 bg-white/10 flex items-center justify-center font-mono text-xs font-bold text-white mx-auto shadow-md">
                LHE
              </div>
              <span className="text-[10px] font-mono text-neutral-400 mt-1 block">Lahore, PK</span>
            </div>

            {/* Middle Hub */}
            <div className="text-center z-10">
              <div className="h-7 w-7 rounded-full border border-white/20 bg-black flex items-center justify-center font-mono text-[10px] text-neutral-300 mx-auto">
                DXB
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-1 block">VIP Transit</span>
            </div>

            {/* Destination */}
            <div className="text-center z-10">
              <div className="h-8 w-8 rounded-full border border-white bg-white text-black flex items-center justify-center font-mono text-xs font-bold mx-auto shadow-lg">
                {current.id === "paris" ? "CDG" : current.id === "milan" ? "MXP" : "ZRH"}
              </div>
              <span className="text-[10px] font-mono text-white mt-1 block font-medium">
                {current.destination.split(" ")[0]}
              </span>
            </div>

            {/* Connecting Arc SVG */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none stroke-white/20">
              <path
                d="M 60 56 Q 220 20 400 56"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Summary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3 rounded-lg border border-white/[0.05] bg-white/[0.02]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                Schengen Visa Concierge Protocol
              </span>
              <span className="text-neutral-200 mt-0.5 block font-medium">
                {current.visaDossier}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.05] bg-white/[0.02]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                Corridor Topology &amp; Stops
              </span>
              <span className="text-neutral-200 mt-0.5 block font-medium">
                {current.stops}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
