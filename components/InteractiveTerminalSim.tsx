"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Play, Cpu, CheckCircle, Wifi, RefreshCw } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

const COMMANDS = [
  {
    cmd: "dhub order dispatch --item robux-verified --instant",
    output: [
      "[EDGE] Ingesting order token from Stripe webhook...",
      "[FIREBASE] Verifying user ledger balance in Firestore shard-02...",
      "[GATEWAY] Discord Bot Gateway handshake established...",
      "[DELIVERY] Dispatched 10,000 Robux in 740ms. Replacement warranty logged.",
    ],
  },
  {
    cmd: "dhub provision boosts --count 14x --guild automated",
    output: [
      "[DISCORD] Resolving target Discord Guild permissions...",
      "[SSL] TLS 1.3 encrypted bearer token authenticated...",
      "[INVENTORY] 14x Level 3 Server Boost batch provisioned...",
      "[STATUS] Guild perks unlocked successfully in 1.1s.",
    ],
  },
  {
    cmd: "dhub telemetry inspect --live-mesh",
    output: [
      "[UPTIME] 99.98% operational over 45,000 transactions",
      "[SPEED] P99 delivery latency: 780ms across global POPs",
      "[BOT] Discord WebSocket latency: 12ms",
      "[HEALTH] All fulfillment queues nominal.",
    ],
  },
];

export function InteractiveTerminalSim() {
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [logLines, setLogLines] = useState<string[]>(COMMANDS[0].output);
  const { playSound } = useAudio();

  const runCommand = (idx: number) => {
    playSound("click");
    setActiveCmdIdx(idx);
    setRunning(true);
    setLogLines(["$ " + COMMANDS[idx].cmd, "[...] Executing isolate runtime..."]);

    setTimeout(() => {
      playSound("beep");
      setLogLines(["$ " + COMMANDS[idx].cmd, ...COMMANDS[idx].output]);
      setRunning(false);
    }, 380);
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-cyan-500/30 bg-[#061019] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 bg-cyan-950/40 px-3.5 py-2.5">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="h-3.5 w-3.5" />
          <span className="font-semibold text-[11px] tracking-wide">dhub-cli v2.4 // Edge Runtime</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-cyan-400/80">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <Wifi className="h-3 w-3" />
            <span>EDGE SYNC: 11ms</span>
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">MEM: 11.4MB</span>
        </div>
      </div>

      {/* Quick Interactive Command Runner Bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/40 p-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-neutral-400 uppercase mr-1 flex items-center gap-1">
          <Play className="h-2.5 w-2.5 text-cyan-400" /> Run:
        </span>
        {COMMANDS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => runCommand(idx)}
            className={`rounded px-2.5 py-1 text-[11px] whitespace-nowrap transition-all ${
              activeCmdIdx === idx
                ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-semibold shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                : "border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.cmd.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* Terminal Content Screen */}
      <div className="flex-1 p-3.5 space-y-2 overflow-y-auto bg-black/50 text-neutral-300">
        <div className="text-neutral-500 text-[10px]">
          # Simulated Wasm CLI environment connecting to Cloudflare Edge isolates
        </div>
        <div className="text-cyan-400 font-semibold">$ {COMMANDS[activeCmdIdx].cmd}</div>

        <div className="space-y-1 pt-1">
          {logLines.map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                line.includes("[STATUS]") || line.includes("[HEALTH]")
                  ? "text-emerald-400 font-bold"
                  : line.includes("[BENCH]")
                  ? "text-cyan-300"
                  : "text-neutral-300"
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {running && (
          <div className="flex items-center gap-2 text-cyan-400 pt-2 text-[11px]">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span>Streaming edge packets...</span>
          </div>
        )}
      </div>

      {/* Terminal Footer Telemetry */}
      <div className="flex items-center justify-between border-t border-cyan-500/10 bg-cyan-950/20 px-3 py-1.5 text-[10px] text-neutral-400">
        <div className="flex items-center gap-1 text-emerald-400">
          <CheckCircle className="h-3 w-3" />
          <span>Firestore Snapshot Stream: ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>P99: 13.8ms</span>
          <span className="text-cyan-400 font-bold">48.2k RPS</span>
        </div>
      </div>
    </div>
  );
}
