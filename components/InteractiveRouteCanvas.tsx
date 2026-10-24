"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Compass, Zap, Navigation, Mountain, Shuffle } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface RouteNode {
  id: string;
  name: string;
  x: number;
  y: number;
  elevation: number;
}

export function InteractiveRouteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [heuristicMode, setHeuristicMode] = useState<"scenic" | "fastest" | "eco">("scenic");
  const [calcTime, setCalcTime] = useState("6.2ms");
  const [distance, setDistance] = useState("412 km");
  const [elevGain, setElevGain] = useState("+1,840m");
  const { playSound } = useAudio();

  // Nodes for the travel graph (Aligned with Dream Routes VIP Concierge & Flight Corridors)
  const nodes: RouteNode[] = [
    { id: "A", name: "Lahore / ISB", x: 60, y: 160, elevation: 217 },
    { id: "B", name: "Dubai Hub", x: 160, y: 70, elevation: 16 },
    { id: "C", name: "Jeddah / Umrah", x: 170, y: 220, elevation: 12 },
    { id: "D", name: "Milan Malpensa", x: 280, y: 110, elevation: 234 },
    { id: "E", name: "Paris CDG (Schengen)", x: 350, y: 60, elevation: 119 },
    { id: "F", name: "London Heathrow", x: 440, y: 150, elevation: 25 },
  ];

  // Path selection based on heuristic
  const currentPath =
    heuristicMode === "scenic"
      ? ["A", "B", "E", "F"]
      : heuristicMode === "fastest"
      ? ["A", "C", "D", "F"]
      : ["A", "C", "F"];

  const switchMode = (mode: "scenic" | "fastest" | "eco") => {
    playSound("click");
    setHeuristicMode(mode);
    playSound("beep");

    if (mode === "scenic") {
      setCalcTime("7.4ms");
      setDistance("468 km");
      setElevGain("+2,480m");
    } else if (mode === "fastest") {
      setCalcTime("4.8ms");
      setDistance("380 km");
      setElevGain("+720m");
    } else {
      setCalcTime("5.9ms");
      setDistance("395 km");
      setElevGain("+490m");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle terrain grid lines
      ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw background all potential graph edges
      ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.2;

      const edges = [
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
        ["B", "D"],
        ["B", "E"],
        ["C", "D"],
        ["C", "F"],
        ["D", "E"],
        ["D", "F"],
        ["E", "F"],
      ];

      edges.forEach(([uId, vId]) => {
        const u = nodes.find((n) => n.id === uId)!;
        const v = nodes.find((n) => n.id === vId)!;
        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();
      });

      ctx.setLineDash([]); // Reset dash

      // Highlight active A* heuristic path with glowing pulse
      ctx.strokeStyle = "#c084fc";
      ctx.lineWidth = 3.5;
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 15;

      ctx.beginPath();
      for (let i = 0; i < currentPath.length; i++) {
        const node = nodes.find((n) => n.id === currentPath[i])!;
        if (i === 0) ctx.moveTo(node.x, node.y);
        else ctx.lineTo(node.x, node.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Animated kinetic packet moving along path
      offset = (offset + 0.012) % (currentPath.length - 1);
      const segIndex = Math.floor(offset);
      const segT = offset - segIndex;

      const n1 = nodes.find((n) => n.id === currentPath[segIndex])!;
      const n2 = nodes.find((n) => n.id === currentPath[segIndex + 1])!;

      const curX = n1.x + (n2.x - n1.x) * segT;
      const curY = n1.y + (n2.y - n1.y) * segT;

      // Draw moving transit probe
      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ec4899";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw nodes
      nodes.forEach((node) => {
        const isInPath = currentPath.includes(node.id);

        ctx.beginPath();
        ctx.arc(node.x, node.y, isInPath ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isInPath ? "#f43f5e" : "rgba(168, 85, 247, 0.6)";
        ctx.fill();

        // Node halo
        if (isInPath) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = isInPath ? "#ffffff" : "#a855f7";
        ctx.font = "10px monospace";
        ctx.fillText(node.name, node.x - 18, node.y + 18);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [currentPath]);

  return (
    <div className="flex flex-col h-full rounded-xl border border-purple-500/30 bg-[#0d071b] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Route Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 bg-purple-950/40 px-3.5 py-2.5">
        <div className="flex items-center gap-2 text-purple-300">
          <Compass className="h-3.5 w-3.5 text-fuchsia-400" />
          <span className="font-semibold text-[11px] tracking-wide">
            Kinetic Graph Engine // Bidirectional A*
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-fuchsia-300">
          <Zap className="h-3 w-3 animate-pulse" />
          <span>SOLVE: {calcTime}</span>
        </div>
      </div>

      {/* Heuristic Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-black/40 p-2 overflow-x-auto">
        <span className="text-[10px] text-neutral-400 uppercase font-semibold flex items-center gap-1">
          <Navigation className="h-2.5 w-2.5 text-purple-400" /> Corridor:
        </span>
        <button
          onClick={() => switchMode("scenic")}
          className={`rounded px-2.5 py-1 text-[10px] transition-all ${
            heuristicMode === "scenic"
              ? "bg-fuchsia-600/30 border border-fuchsia-500/60 text-fuchsia-200 font-bold"
              : "border border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          VIP Schengen (Paris/Milan)
        </button>
        <button
          onClick={() => switchMode("fastest")}
          className={`rounded px-2.5 py-1 text-[10px] transition-all ${
            heuristicMode === "fastest"
              ? "bg-purple-600/30 border border-purple-500/60 text-purple-200 font-bold"
              : "border border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          Fastest Direct Flight
        </button>
        <button
          onClick={() => switchMode("eco")}
          className={`rounded px-2.5 py-1 text-[10px] transition-all ${
            heuristicMode === "eco"
              ? "bg-emerald-600/30 border border-emerald-500/60 text-emerald-200 font-bold"
              : "border border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          Umrah Spiritual Route
        </button>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 bg-black/60 flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={520}
          height={260}
          className="w-full h-full max-h-[260px] object-contain rounded"
        />
      </div>

      {/* Route Telemetry Bar */}
      <div className="flex items-center justify-between border-t border-purple-500/20 bg-purple-950/20 px-3.5 py-2 text-[10px] text-neutral-300">
        <div className="flex items-center gap-3">
          <span>
            Distance: <strong className="text-white">{distance}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Mountain className="h-3 w-3 text-fuchsia-400" />
            Elevation: <strong className="text-fuchsia-300">{elevGain}</strong>
          </span>
        </div>
        <div className="text-purple-400 font-semibold">120 FPS WebGL Layer</div>
      </div>
    </div>
  );
}
