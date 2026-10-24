"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export function DennisServices() {
  const services = [
    {
      num: "01",
      title: "Design & Interaction",
      desc: "Creating category-defining digital products with brutalist-fluid aesthetics, micro-interactions, and spatial depth that demand attention.",
      tags: ["UI/UX Architecture", "Art Direction", "Interaction Design", "Motion Physics"],
    },
    {
      num: "02",
      title: "Development & Systems",
      desc: "Building rock-solid, production-ready web applications using Next.js 14 App Router, WebAssembly, and strict TypeScript patterns.",
      tags: ["Full-Stack React", "Next.js 14", "Wasm Daemons", "Tailwind CSS"],
    },
    {
      num: "03",
      title: "Edge & Cloud Fabric",
      desc: "Designing resilient distributed fabrics, edge-cached microservices with sub-14ms sync, and real-time event streaming architectures.",
      tags: ["Cloudflare Edge", "Firestore Delta Sync", "Graph Routing (A*)", "Docker API"],
    },
    {
      num: "04",
      title: "Creative WebGL & Audio",
      desc: "Engineering hardware-accelerated GLSL fragment shaders, spatial metallic lighting, and zero-dependency Web Audio procedural synthesizers.",
      tags: ["GLSL Shaders", "120 FPS WebGL", "Web Audio API Synth", "Canvas Physics"],
    },
  ];

  return (
    <section className="relative w-full bg-[#1C1D20] text-white px-6 sm:px-12 lg:px-24 py-28 sm:py-36 font-sans select-none border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <span>CAPABILITIES & DISCIPLINE</span>
          <span className="hidden sm:inline">END-TO-END ENGINEERING</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {services.map((item) => (
            <div
              key={item.num}
              className="group rounded-3xl border border-white/10 bg-[#141517] p-8 sm:p-10 transition-all duration-300 hover:border-white/30 hover:bg-[#18191C]"
            >
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
                <span>{item.num}</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-600 transition-transform duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-4">
                {item.title}
              </h3>

              <p className="text-sm font-light text-neutral-400 leading-relaxed mb-6">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
