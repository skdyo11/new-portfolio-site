"use client";

import React, { useState } from "react";
import { ArrowUpRight, ExternalLink, Eye, Play, Sparkles } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface LiveAppEmbedProps {
  url: string;
  title: string;
}

export function LiveAppEmbed({ url, title }: LiveAppEmbedProps) {
  const [loadIframe, setLoadIframe] = useState(false);
  const { playSound } = useAudio();

  const handleVisitSite = () => {
    playSound("click");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleToggleIframe = () => {
    playSound("click");
    setLoadIframe((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-[480px] rounded-2xl border border-white/15 bg-[#171920] overflow-hidden shadow-2xl">
      {/* Chrome Header: No 3 dots, no raw url input, no mobile/tablet toggles */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-white/[0.03] select-none text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-neutral-400 text-xs uppercase tracking-wider">
            Production Deployment
          </span>
          <span className="text-white font-medium text-xs">
            // {title}
          </span>
        </div>

        {/* Visit Site Action Button (Requested by User) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleVisitSite}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all shadow-md group"
          >
            <span>Visit Site</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Main View Area (Anti-Lag, Fast, Always Working) */}
      <div className="relative flex-1 bg-[#101217] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {loadIframe ? (
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0 rounded-xl bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        ) : (
          <div className="max-w-md space-y-5 flex flex-col items-center">
            {/* Ambient card graphic */}
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 shadow-inner">
              <ExternalLink className="h-7 w-7 text-[#EAB308]" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-syne font-bold text-xl text-white">
                {title} Live Web Environment
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Deployed on Vercel Edge with zero latency. Open the live platform in full fidelity or preview directly inside this container.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleVisitSite}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-lg"
              >
                <span>Visit Live Site</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleToggleIframe}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 bg-white/[0.04] text-neutral-300 hover:text-white hover:border-white/40 text-xs font-mono transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Load In-Page Frame</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-neutral-500 pt-2">
              Note: External browser security may restrict some cross-origin iframes.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}