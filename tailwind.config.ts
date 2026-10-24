import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        obsidian: "#0B0C0E",
        charcoal: {
          DEFAULT: "#121316",
          light: "#181A1F",
          card: "#15171B",
          border: "#23262D",
        },
        stone: {
          50: "#FAF9F6",
          100: "#F2F1ED",
          200: "#E5E3DC",
          300: "#CDC9BF",
          400: "#9E9A90",
          500: "#736F66",
          600: "#54514A",
          700: "#383632",
          800: "#222327",
          900: "#17181C",
        },
        champagne: {
          DEFAULT: "#C5A880",
          muted: "#A38B68",
          light: "#EADDCB",
        },
      },
      fontFamily: {
        anton: ["Anton", "Impact", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
        serif: ["var(--font-serif)", "Newsreader", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Space Grotesk", "monospace"],
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
        monograph: "0 30px 60px -20px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
