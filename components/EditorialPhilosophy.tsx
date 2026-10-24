"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Shield, Cpu, Code2, Database } from "lucide-react";

export function EditorialPhilosophy() {
  const disciplines = [
    {
      num: "01 / DESIGN SYSTEM",
      title: "Design Engineering",
      focus: "Focus: Polish & Kinetic Feel",
      desc: "Sub-pixel typography, fluid spring dynamics, micro-interactions, and 120 FPS inertial physics.",
      skills: ["React 18 & Next.js 14", "TypeScript Strict", "Tailwind CSS", "Web Audio API"],
    },
    {
      num: "02 / RUNTIME PERFORMANCE",
      title: "Low-Latency Compute",
      focus: "Focus: < 100ms Interactions",
      desc: "Optimizing critical rendering paths, client state hydration, and edge isolate caching.",
      skills: ["Cloudflare V8 Isolates", "Edge Middleware", "ISR Caching", "100/100 Core Web Vitals"],
    },
    {
      num: "03 / ARCHITECTURE",
      title: "Fault-Tolerant Systems",
      focus: "Focus: 99.98% Uptime",
      desc: "Decoupled microservice architectures and real-time distributed data pipelines engineered for scale.",
      skills: ["Node.js Microservices", "GCP Firestore Shards", "Redis Edge Cache", "Stripe Webhooks"],
    },
  ];

  return (
    <section id="ethos" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full border-t border-white/[0.1] select-none bg-[#141518]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.1] pb-6 mb-12 gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
            02 / CORE DISCIPLINES
          </span>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-white mt-1.5 tracking-tight font-normal">
            Philosophy &amp; Execution
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
          A disciplined engineering standard: zero bloat, high speed, and resilient architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {disciplines.map((d, i) => (
          <motion.div
            key={d.num}
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 sm:p-7 rounded-3xl border border-white/15 bg-[#1C1E26] space-y-4 hover:border-white/30 transition-all duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.03)] flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono text-neutral-400">
                <span>{d.num}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              </div>

              <div>
                <h3 className="font-syne font-bold text-xl text-white">
                  {d.title}
                </h3>
                <span className="text-xs font-mono text-amber-400 block mt-0.5">
                  {d.focus}
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {d.desc}
              </p>
            </div>

            {/* Verified Skills */}
            <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                Core Stack
              </span>
              <ul className="space-y-1 text-xs text-neutral-300 font-mono">
                {d.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-1.5">
                    <span className="text-amber-400 text-[10px]">›</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}