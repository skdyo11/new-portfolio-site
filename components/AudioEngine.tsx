"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { SoundType } from "@/types";
import { Volume2, VolumeX, Activity } from "lucide-react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
  isAudioInitialized: boolean;
  initializeAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
  playSound: () => {},
  isAudioInitialized: false,
  initializeAudio: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const audioCtxRef = useRef<window.AudioContext | null>(null);

  // Initialize Web Audio API on first user interaction
  const initializeAudio = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
        setIsAudioInitialized(true);
      }
    } else if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
      setIsAudioInitialized(true);
    }
  }, []);

  useEffect(() => {
    const handleFirstGesture = () => {
      initializeAudio();
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture);
    window.addEventListener("keydown", handleFirstGesture);

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [initializeAudio]);

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMuted) return;
      if (!audioCtxRef.current) {
        initializeAudio();
      }
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === "suspended") return;

      const now = ctx.currentTime;

      try {
        switch (type) {
          case "hover": {
            // Subtle, delicate futuristic micro-blip
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.045);
            break;
          }

          case "click": {
            // Crisp, tactical tactile snap
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);

            filter.type = "bandpass";
            filter.frequency.setValueAtTime(800, now);
            filter.Q.setValueAtTime(3, now);

            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.065);
            break;
          }

          case "beep": {
            // Resonant HUD telemetry chirp
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(1250, now);
            osc.frequency.setValueAtTime(1650, now + 0.03);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.095);
            break;
          }

          case "warp": {
            // Low-frequency spatial warp slide
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.26);
            break;
          }

          case "success": {
            // High-tech ascending arpeggio
            const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
            freqs.forEach((freq, idx) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();

              osc.type = "sine";
              osc.frequency.setValueAtTime(freq, now + idx * 0.04);

              gain.gain.setValueAtTime(0, now + idx * 0.04);
              gain.gain.linearRampToValueAtTime(0.035, now + idx * 0.04 + 0.01);
              gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.12);

              osc.connect(gain);
              gain.connect(ctx.destination);

              osc.start(now + idx * 0.04);
              osc.stop(now + idx * 0.04 + 0.13);
            });
            break;
          }

          case "overclock": {
            // Aggressive sub-bass drop with resonant cyberpunk sweep
            const subOsc = ctx.createOscillator();
            const subGain = ctx.createGain();

            subOsc.type = "sawtooth";
            subOsc.frequency.setValueAtTime(280, now);
            subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.55);

            subGain.gain.setValueAtTime(0.09, now);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

            subOsc.connect(subGain);
            subGain.connect(ctx.destination);

            subOsc.start(now);
            subOsc.stop(now + 0.56);

            // High digital siren flourish
            const sirenOsc = ctx.createOscillator();
            const sirenGain = ctx.createGain();
            sirenOsc.type = "sine";
            sirenOsc.frequency.setValueAtTime(880, now + 0.05);
            sirenOsc.frequency.linearRampToValueAtTime(1760, now + 0.25);
            sirenOsc.frequency.linearRampToValueAtTime(440, now + 0.45);

            sirenGain.gain.setValueAtTime(0.04, now + 0.05);
            sirenGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

            sirenOsc.connect(sirenGain);
            sirenGain.connect(ctx.destination);

            sirenOsc.start(now + 0.05);
            sirenOsc.stop(now + 0.46);
            break;
          }

          case "glitch": {
            // Rapid noise bursts
            const bufferSize = ctx.sampleRate * 0.08;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.setValueAtTime(2400, now);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(now);
            break;
          }
        }
      } catch {
        // Ignore audio node interruptions silently
      }
    },
    [isMuted, initializeAudio]
  );

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (isMuted) {
      playSound("beep");
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        playSound,
        isAudioInitialized,
        initializeAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}

/**
 * Floating Minimal Audio Controller (Disabled per user request: sound is always on)
 */
export function AudioHUDController() {
  return null;
}
