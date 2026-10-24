# saifalii.dev — Autonomous Master Engineering Hub

> **An aggressively over-engineered, immersive personal portfolio website and interactive systems showcase.**

Built for **Saif Ali**, this platform fuses high-frequency WebAssembly runtimes, procedural Web Audio synthesizers, HTML5 Canvas N-body physics, and decoupled micro-edge architectures into a cohesive digital proving ground.

---

## ⚡ Core Ecosystem Showcased

1. **dhub** (`https://dhub.saifalii.dev`)
   - *Developer Command Hub & Microservice Ecosystem*
   - **Build Model Breakdown**: Edge-cached Cloudflare Workers, real-time Firestore delta stream listeners, Wasm-compiled Rust CLI client with sub-14ms P99 synchronization.
   - **Interactive Live Simulator**: Real-time terminal CLI with executable edge worker, Firestore sync, and telemetry commands.

2. **dreamroutes** (`https://dreamroutes.saifalii.dev`)
   - *Algorithmic Travel & Pathfinding Network*
   - **Build Model Breakdown**: Bidirectional A* heuristic graph routing, PostGIS spatial indexing, and kinetic 120 FPS WebGL vector tile rendering.
   - **Interactive Live Simulator**: Kinetic Canvas route simulator testing scenic alpine, fastest transit corridor, and minimal elevation (eco) profiles.

3. **glamlux** (`https://glamlux.saifalii.dev`)
   - *Ultra-Luxury Beauty & Styling E-Commerce Experience*
   - **Build Model Breakdown**: Headless MedusaJS commerce engine, Next.js Incremental Static Regeneration (ISR), and real-time liquid glass reflection shaders.
   - **Interactive Live Simulator**: 3D mouse-reactive gyro-tilt product card with dynamic holographic foil glare and fragrance note matrix.

4. **saifalii.dev** (`https://saifalii.dev`)
   - *Master Engineering Brand & Autonomous System Core*
   - **Build Model Breakdown**: Unified interaction bus with zero-asset procedural audio, dynamic theme-shifting ambient engine, and Konami terminal hypervisor.
   - **Interactive Live Simulator**: Multi-node topology mesh with live latency telemetry and health status pings.

---

## 🎮 Over-the-Top Unnecessary Features

- **Interactive Particle Gravity Field (`ParticleCanvas.tsx`)**:
  - Full-screen custom HTML5 Canvas calculating velocity damping, mouse repulsion, and constellation interconnects.
  - Clicking violently scatters particles with radial force physics.
- **Konami Code Easter Egg (`TerminalOverclock.tsx`)**:
  - Type `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the site.
  - Triggers the full-screen **Terminal Overclock** mode featuring matrix digital rain, sub-zero LN2 telemetry, and an interactive hacker terminal.
- **Procedural Sound Design / Haptic Audio API (`AudioEngine.tsx`)**:
  - 100% synthesized through native `window.AudioContext` oscillators, bi-quad filters, and gain nodes.
  - Zero external MP3 or WAV downloads required.
  - Floating HUD controller with live visualizer bars.
- **Dynamic 3D Tilt & Holographic Sheen (`BentoGrid.tsx` / `TiltCard`)**:
  - Calculates mouse coordinates to generate 3D perspective transforms with a specular glare overlay that follows the cursor.
- **Cinematic Boot Preloader (`Preloader.tsx`)**:
  - High-speed boot sequence with custom ASCII insignia and system checklist. Bypassable via `ESC` or click.
- **Theme-Shifting Ambient Engine (`ThemeContext.tsx`)**:
  - Selecting any project dynamically recalculates `--theme-primary`, `--theme-glow`, and `--theme-cursor-aura` to match its custom brand signature:
    - `dhub`: Cyberpunk Teal (`#00f0ff` / `#10b981`)
    - `dreamroutes`: Sunset Violet (`#c084fc` / `#ec4899`)
    - `glamlux`: Champagne Gold (`#fbbf24` / `#f59e0b`)
    - `saifalii.dev`: Master Electric Cyan (`#00f0ff` / `#3b82f6`)

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone or navigate into the repository
cd new-portfolio-site

# Install dependencies
npm install
# or
pnpm install
# or
bun install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Click **Deploy**.

### Deploy to Cloudflare Pages

1. Build command: `npm run build`
2. Build output directory: `.next`
3. Compatible with Cloudflare Workers Next.js runtime.

---

## 🛠️ Architecture File Tree

```
├── app/
│   ├── globals.css              # Cyberpunk grid, custom scrollbars, CSS theme variables
│   ├── layout.tsx               # Root layout, ThemeProvider, AudioProvider, Canvas
│   └── page.tsx                 # Master view uniting Preloader, Hero, Showcase, Bento
├── components/
│   ├── AudioEngine.tsx          # Zero-asset procedural Web Audio synthesizer & HUD controller
│   ├── BentoGrid.tsx            # 3D Tilt cards, telemetry radar, synth soundboard
│   ├── BuildModelModal.tsx      # Deep technical breakdown modal (Architecture, AI, Data)
│   ├── CursorAura.tsx           # Custom magnetic fluid reticle with trailing aura
│   ├── Footer.tsx               # System verification footer & back-to-top
│   ├── Hero.tsx                 # Kinetic hero section, live UTC telemetry, CTA buttons
│   ├── InteractiveLuxuryTilt.tsx# 3D tilt perfume flask with olfactory pyramid
│   ├── InteractiveOrchestratorTopology.tsx # Ecosystem node mesh & telemetry
│   ├── InteractiveRouteCanvas.tsx # Canvas A* pathfinding & kinetic transit animation
│   ├── InteractiveTerminalSim.tsx # Wasm CLI terminal simulator for dhub
│   ├── Navbar.tsx               # Ambient theme switcher pills, Konami trigger
│   ├── ParticleCanvas.tsx       # 2D N-body gravity particle field with click scatter
│   ├── Preloader.tsx            # High-speed ASCII bootloader with system check
│   └── TerminalOverclock.tsx    # Konami code cheat overlay with matrix rain
├── context/
│   └── ThemeContext.tsx         # Theme-Shifting Ambient Engine & CSS variable dispatcher
├── lib/
│   ├── projectsData.ts          # Complete technical specs, AI pipelines & benchmarks
│   └── utils.ts                 # ClassName merger & numerical formatters
├── types/
│   └── index.ts                 # TypeScript interfaces for Projects, Models & Sounds
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🛡️ License

MIT License. Designed and engineered by **Saif Ali** ([saifalii.dev](https://saifalii.dev)).
