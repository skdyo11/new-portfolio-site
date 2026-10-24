"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { PROJECTS } from "@/lib/projectsData";
import { EditorialNav } from "@/components/EditorialNav";
import { EditorialFooter } from "@/components/EditorialFooter";
import { EditorialMonographDrawer } from "@/components/EditorialMonographDrawer";
import { DhubSim } from "@/components/simulations/DhubSim";
import { DreamroutesSim } from "@/components/simulations/DreamroutesSim";
import { GlamluxSim } from "@/components/simulations/GlamluxSim";
import { SaifaliiSim } from "@/components/simulations/SaifaliiSim";
import { useAudio } from "@/components/AudioEngine";
import { ArrowUpRight, ChevronRight, Layers, Play } from "lucide-react";

export default function WorkPage() {
  const [selectedDrawerProject, setSelectedDrawerProject] = useState<Project | null>(null);
  const { playSound } = useAudio();

  const renderSimulation = (projectId: string) => {
    switch (projectId) {
      case "dhub":
        return <DhubSim />;
      case "dreamroutes":
        return <DreamroutesSim />;
      case "glamlux":
        return <GlamluxSim />;
      case "saifalii.dev":
      default:
        return <SaifaliiSim />;
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-[#0B0C0E] text-[#F2F1ED] font-sans antialiased selection:bg-[#C5A880] selection:text-[#0B0C0E]">
      <EditorialNav />

      {/* Header */}
      <section className="pt-36 sm:pt-44 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="space-y-4 border-b border-stone-800/80 pb-8">
          <span className="font-mono text-xs tracking-widest uppercase text-stone-400">
            INDEX // COMPLETE PRODUCTION SUITE
          </span>
          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-stone-100">
            Architectural Catalog &amp; Systems
          </h1>
          <p className="text-sm sm:text-base text-stone-400 font-light max-w-2xl leading-relaxed">
            Directing four flagship architectures across distributed high-frequency commerce, algorithmic travel networks, and haute couture bridal booking.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 sm:px-10 lg:px-16 pb-32 max-w-7xl mx-auto w-full space-y-24">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className="border border-stone-800/80 rounded-2xl bg-[#0D0E11] p-6 sm:p-10 shadow-monograph space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
              <div>
                <span className="font-mono text-xs text-stone-400">
                  № 0{idx + 1} // {project.badge}
                </span>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-stone-100 mt-1">
                  {project.name}
                </h2>
                <p className="text-xs text-stone-400 font-light mt-1 max-w-xl">
                  {project.headline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-700 bg-stone-100 text-[#0B0C0E] hover:bg-white text-xs font-medium transition-colors"
                  >
                    <span>Visit Live</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}

                <button
                  onClick={() => {
                    playSound("click");
                    setSelectedDrawerProject(project);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-800 bg-[#141519] text-stone-300 hover:text-white text-xs font-mono transition-colors"
                >
                  <span>Build Model</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Simulation Preview */}
            <div className="min-h-[400px]">
              {renderSimulation(project.id)}
            </div>
          </div>
        ))}
      </section>

      <EditorialFooter />

      <EditorialMonographDrawer
        project={selectedDrawerProject}
        isOpen={Boolean(selectedDrawerProject)}
        onClose={() => setSelectedDrawerProject(null)}
      />
    </main>
  );
}
