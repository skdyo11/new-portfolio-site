"use client";

import React, { useState } from "react";
import { Server, Activity, ShieldCheck, Database, Globe, ArrowRight } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";
import { useTheme } from "@/context/ThemeContext";
import { ThemeId } from "@/types";

export function InteractiveOrchestratorTopology() {
  const [selectedNode, setSelectedNode] = useState<string>("core");
  const { playSound } = useAudio();
  const { setTheme } = useTheme();

  const nodes = [
    {
      id: "core",
      themeId: "core" as ThemeId,
      name: "saifalii.dev",
      type: "Master Orchestrator",
      status: "PRIMARY_ACTIVE",
      latency: "0.2ms",
      load: "14%",
      color: "#00f0ff",
      description: "Root identity, Web Audio synthesis, and dynamic ambient dispatch.",
    },
    {
      id: "dhub",
      themeId: "dhub" as ThemeId,
      name: "dhub",
      type: "Discord & Gaming Marketplace",
      status: "DISPATCH_ONLINE",
      latency: "11.4ms",
      load: "99.98% uptime",
      color: "#00F0FF",
      description: "Automated instant-delivery marketplace for legal Robux & Discord services.",
    },
    {
      id: "dreamroutes",
      themeId: "dreamroutes" as ThemeId,
      name: "dreamroutes",
      type: "Luxury Travel & Visa Concierge",
      status: "GDS_ONLINE",
      latency: "4.8ms",
      load: "98.4% approval",
      color: "#7928CA",
      description: "VIP Schengen visa concierge and dynamic flight corridor routing.",
    },
    {
      id: "glamlux",
      themeId: "glamlux" as ThemeId,
      name: "glamlux",
      type: "Bridal Atelier & Cosmetics",
      status: "ISR_WARMED",
      latency: "14ms",
      load: "0.38s LCP",
      color: "#D4AF37",
      description: "Parisian-Pakistani luxury bridal parlour appointments and COD PIN cosmetics.",
    },
  ];

  const handleSelect = (nodeId: string, themeId: ThemeId) => {
    playSound("click");
    setSelectedNode(nodeId);
    setTheme(themeId);
    playSound("beep");
  };

  const active = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="flex flex-col h-full rounded-xl border border-cyan-500/30 bg-[#07131d] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Topology Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 bg-cyan-950/40 px-3.5 py-2.5">
        <div className="flex items-center gap-2 text-cyan-300">
          <Server className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-semibold text-[11px] tracking-wide">
            Ecosystem Topology & Node Telemetry
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MESH: ALL CORES HEALTHY</span>
        </div>
      </div>

      {/* Interactive System Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-3 bg-black/60">
        {nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => handleSelect(node.id, node.themeId)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? "bg-white/10 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5"
              }`}
              style={{
                borderColor: isSelected ? node.color : undefined,
              }}
            >
              {/* Pulsing indicator */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs" style={{ color: node.color }}>
                  {node.name}
                </span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                  style={{
                    backgroundColor: `${node.color}22`,
                    color: node.color,
                  }}
                >
                  {node.status}
                </span>
              </div>

              <div className="text-[10px] text-neutral-400 truncate mb-2">{node.type}</div>

              <div className="flex items-center justify-between text-[10px] text-neutral-300 font-mono pt-1 border-t border-white/5">
                <span>Latency: {node.latency}</span>
                <span className="text-white font-semibold">{node.load}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep Dive Bar */}
      <div className="border-t border-cyan-500/20 bg-cyan-950/30 p-3 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold text-white flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span>Active Focus: {active.name}</span>
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">{active.description}</div>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold">
            THEME SYNCHRONIZED
          </span>
        </div>
      </div>
    </div>
  );
}
