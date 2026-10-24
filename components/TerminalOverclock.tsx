"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAudio } from "@/components/AudioEngine";
import { Terminal, Flame, Cpu, ShieldAlert, X, Sparkles } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function TerminalOverclock({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { playSound } = useAudio();
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "OVERCLOCK_CORE: KERNEL EXPLOIT ARMED.",
    "VOLTAGE_REGULATOR: Overridden -> 1.48V [DANGER]",
    "CLOCK_FREQUENCY: 9.84 GHz (Liquid Nitrogen Cooling Simulated)",
    "ALL SECURITY CONSTRAINTS REVOKED. ROOT SHELL ACTIVE.",
    "Type 'help' for available commands or 'exit' to disengage.",
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      playSound("overclock");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, playSound]);

  // Matrix Rain Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "01SAIFALIIDEV0123456789ABCDEF$#@%*&~<>+/=";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playSound("click");
    const newLogs = [...terminalLogs, `$ ${inputVal}`];

    switch (cmd) {
      case "help":
        newLogs.push(
          "Available Overclock Commands:",
          "  status     - Query liquid core thermals and clock speeds",
          "  projects   - Output raw system addresses for all apps",
          "  glitch     - Trigger audio-visual EMP wave",
          "  boost      - Increase bus bandwidth to maximum theoretical",
          "  clear      - Clear terminal screen buffer",
          "  exit       - Return to normal human interface mode"
        );
        break;
      case "status":
        newLogs.push(
          "CORE 0-15: 9.84 GHz [ACTIVE]",
          "THERMAL TJUNC: -184°C (LN2 Submersion Active)",
          "SYSTEM ARCHITECTURE: saifalii.dev Hypervisor v4.9",
          "POWER DRAW: 480W // ZERO THROTTLING"
        );
        break;
      case "projects":
        newLogs.push(
          "[NODE 01] dhub -> https://dhub-paused.vercel.app/",
          "[NODE 02] dreamroutes -> https://dreamroutes-dusky.vercel.app/",
          "[NODE 03] glamlux -> https://glamlux.vercel.app/",
          "[NODE 04] saifalii.dev -> MASTER_CORE"
        );
        break;
      case "glitch":
        playSound("glitch");
        newLogs.push(">>> EMP WAVE TRANSMITTED. FRAME BUFFER SCRAMBLED. <<<");
        break;
      case "boost":
        playSound("warp");
        newLogs.push(">> MEMORY BANDWIDTH ACCELERATED TO 1.4 TB/S <<");
        break;
      case "clear":
        setTerminalLogs([]);
        setInputVal("");
        return;
      case "exit":
      case "quit":
        onClose();
        return;
      default:
        newLogs.push(`Command not recognized: '${cmd}'. Type 'help' for command list.`);
        break;
    }

    setTerminalLogs(newLogs);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 font-mono select-none">
      {/* Background Matrix Rain */}
      <canvas ref={matrixCanvasRef} className="pointer-events-none absolute inset-0 opacity-40" />

      {/* CRT Scanline & chromatic aberration border */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-80" />

      {/* Main Terminal Window */}
      <div className="relative z-10 flex h-[90vh] w-full max-w-4xl flex-col rounded-xl border-2 border-emerald-500/70 bg-black/95 shadow-[0_0_60px_rgba(16,185,129,0.35)] backdrop-blur-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/40 bg-emerald-950/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider text-sm">
              <Terminal className="h-4 w-4" />
              <span>TERMINAL OVERCLOCK // KERNEL HACK INTERFACE</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-amber-400">
              <Flame className="h-4 w-4 animate-bounce" />
              <span>9.84 GHz // SUB-ZERO</span>
            </div>
            <button
              onClick={() => {
                playSound("click");
                onClose();
              }}
              className="flex items-center gap-1.5 rounded border border-emerald-500/50 bg-emerald-900/30 px-3 py-1 text-xs text-emerald-300 transition-colors hover:bg-emerald-500 hover:text-black"
            >
              <X className="h-3.5 w-3.5" />
              <span>DISENGAGE [ESC]</span>
            </button>
          </div>
        </div>

        {/* Live Overclock Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-emerald-500/20 bg-black/60 p-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <Cpu className="h-4 w-4 text-emerald-300" />
            <div>
              <div className="text-[10px] text-neutral-400 uppercase">Multi-Core</div>
              <div className="font-bold">16 Cores @ 9.8GHz</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Flame className="h-4 w-4 text-red-400" />
            <div>
              <div className="text-[10px] text-neutral-400 uppercase">Thermal Margin</div>
              <div className="font-bold text-cyan-300">-184.2°C LN2</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-neutral-400 uppercase">Protection</div>
              <div className="font-bold text-amber-300">OVERRIDDEN</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <div>
              <div className="text-[10px] text-neutral-400 uppercase">Mode</div>
              <div className="font-bold text-emerald-300">GOD_MODE</div>
            </div>
          </div>
        </div>

        {/* Output Screen */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs text-emerald-400 font-mono scrollbar-thin">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-emerald-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
              <span className={log.startsWith("$") ? "font-bold text-white" : ""}>{log}</span>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommand} className="flex items-center border-t border-emerald-500/40 bg-emerald-950/30 p-3">
          <span className="mr-2 font-bold text-emerald-400">root@saifalii:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white outline-none placeholder-emerald-700/70 caret-emerald-400"
          />
          <button
            type="submit"
            className="rounded border border-emerald-500/60 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Global Konami Code Listener
 */
export function useKonamiListener(onTrigger: () => void) {
  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const expectedKey = KONAMI_CODE[index];

      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        index++;
        if (index === KONAMI_CODE.length) {
          onTrigger();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTrigger]);
}
