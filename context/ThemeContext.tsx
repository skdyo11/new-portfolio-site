"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeId } from "@/types";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  surface: string;
  muted: string;
  cursorAura: string;
  glslPrimary: [number, number, number];
  glslSecondary: [number, number, number];
}

export const THEME_CONFIGS: Record<ThemeId, ThemeColors> = {
  core: {
    primary: "#00F0FF",
    secondary: "#0051FF",
    accent: "#7928CA",
    glow: "rgba(0, 240, 255, 0.45)",
    surface: "rgba(5, 12, 24, 0.85)",
    muted: "rgba(148, 163, 184, 0.7)",
    cursorAura: "rgba(0, 240, 255, 0.3)",
    glslPrimary: [0.0, 0.94, 1.0],      // #00F0FF
    glslSecondary: [0.0, 0.32, 1.0],    // #0051FF
  },
  dhub: {
    primary: "#00F0FF",
    secondary: "#0D9488",
    accent: "#10B981",
    glow: "rgba(0, 240, 255, 0.45)",
    surface: "rgba(4, 20, 24, 0.85)",
    muted: "rgba(94, 234, 212, 0.7)",
    cursorAura: "rgba(13, 148, 136, 0.35)",
    glslPrimary: [0.0, 0.94, 1.0],      // #00F0FF
    glslSecondary: [0.05, 0.58, 0.53],  // #0D9488
  },
  dreamroutes: {
    primary: "#7928CA",
    secondary: "#FF0080",
    accent: "#C084FC",
    glow: "rgba(121, 40, 202, 0.5)",
    surface: "rgba(18, 6, 32, 0.85)",
    muted: "rgba(216, 180, 254, 0.7)",
    cursorAura: "rgba(255, 0, 128, 0.35)",
    glslPrimary: [0.47, 0.16, 0.79],    // #7928CA
    glslSecondary: [1.0, 0.0, 0.5],     // #FF0080
  },
  glamlux: {
    primary: "#D4AF37",
    secondary: "#996515",
    accent: "#FBBF24",
    glow: "rgba(212, 175, 55, 0.45)",
    surface: "rgba(24, 18, 5, 0.85)",
    muted: "rgba(253, 230, 138, 0.7)",
    cursorAura: "rgba(212, 175, 55, 0.35)",
    glslPrimary: [0.83, 0.69, 0.22],    // #D4AF37
    glslSecondary: [0.6, 0.4, 0.08],    // #996515
  },
};

interface ThemeContextType {
  activeTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: "core",
  setTheme: () => {},
  colors: THEME_CONFIGS.core,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("core");

  useEffect(() => {
    const config = THEME_CONFIGS[activeTheme];
    const root = document.documentElement;

    root.style.setProperty("--theme-primary", config.primary);
    root.style.setProperty("--theme-secondary", config.secondary);
    root.style.setProperty("--theme-accent", config.accent);
    root.style.setProperty("--theme-glow", config.glow);
    root.style.setProperty("--theme-surface", config.surface);
    root.style.setProperty("--theme-muted", config.muted);
    root.style.setProperty("--theme-cursor-aura", config.cursorAura);
  }, [activeTheme]);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setTheme: setActiveTheme,
        colors: THEME_CONFIGS[activeTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
