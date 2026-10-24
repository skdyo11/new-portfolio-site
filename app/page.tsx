"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { EditorialNav } from "@/components/EditorialNav";
import { EditorialHero } from "@/components/EditorialHero";
import { EditorialAbout } from "@/components/EditorialAbout";
import { ProjectMonographShowcase } from "@/components/ProjectMonographShowcase";
import { Motion3DGallery } from "@/components/Motion3DGallery";
import { EditorialPhilosophy } from "@/components/EditorialPhilosophy";
import { EditorialFooter } from "@/components/EditorialFooter";
import { EditorialMonographDrawer } from "@/components/EditorialMonographDrawer";

export default function HomePage() {
  const [selectedDrawerProject, setSelectedDrawerProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#141518] text-[#F4F4F6] font-sans antialiased selection:bg-[#EAB308] selection:text-black">
      {/* Editorial Top Navigation */}
      <EditorialNav />

      {/* Editorial Hero Statement & Portrait */}
      <EditorialHero />

      {/* Blueprint About Me Architecture */}
      <EditorialAbout />

      {/* Core Platforms Showcase (dhub, dreamroutes, glamlux, saifalii.dev) */}
      <ProjectMonographShowcase
        onOpenDrawer={(project) => setSelectedDrawerProject(project)}
      />

      {/* Motion+ Reverse-Engineered 3D Gallery (Helix, Barrel, Ring, Sphere) */}
      <Motion3DGallery />

      {/* Architectural Philosophy & Discipline Manifesto */}
      <EditorialPhilosophy />

      {/* Direct Colophon & Contact Dialogue */}
      <EditorialFooter />

      {/* Deep Architectural Monograph Slide-Over Drawer */}
      <EditorialMonographDrawer
        project={selectedDrawerProject}
        isOpen={Boolean(selectedDrawerProject)}
        onClose={() => setSelectedDrawerProject(null)}
      />
    </main>
  );
}