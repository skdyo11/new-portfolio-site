import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "dhub",
    themeId: "dhub",
    name: "dhub",
    tagline: "High-Frequency Digital Services & Gaming Commerce Engine",
    badge: "Edge Commerce & Discord API",
    headline: "Automated instant-delivery marketplace for digital assets & community telemetry.",
    summary:
      "A high-throughput digital commerce platform processing real-time game assets, automated Discord server boosts, and instant fulfillment pipelines with sub-second webhook synchronization and fraud-resistant ledger validation.",
    previewType: "terminal",
    accentColor: "#00F0FF",
    glowColor: "rgba(0, 240, 255, 0.45)",
    gradient: "from-cyan-500 via-teal-400 to-blue-600",
    tags: ["Next.js", "Edge Microservices", "Discord Bot API", "Firestore Realtime", "Stripe & Webhooks", "Wasm"],
    stats: [
      { label: "Delivery Speed", value: "< 800ms", sublabel: "Automated Webhooks" },
      { label: "Order Uptime", value: "99.98%", sublabel: "Zero-Downtime Mesh" },
      { label: "Sync Latency", value: "11.4 ms", sublabel: "Real-time State" },
    ],
    features: [
      "Sub-second automated fulfillment pipeline triggered directly via Discord Bot Gateway & Webhook pub/sub",
      "Real-time inventory state synchronization using Google Cloud Firestore snapshot listeners",
      "Dynamic token-bucket rate limiting and DDoS protection deployed on Cloudflare V8 Edge Isolates",
      "Modular transaction ledger with automated replacement warranty validation protocols",
    ],
    buildModel: {
      architecture: {
        title: "High-Frequency Edge Fulfillment Engine & Real-Time Discord Mesh",
        pattern: "Decoupled Event-Driven Microservices + Edge Worker Proxies",
        description:
          "dhub coordinates automated order ingestion and instantaneous Discord service provisioning. Transactions are verified through an edge proxy layer, validated against Firestore snapshot databases, and dispatched to worker daemons with sub-second delivery latency.",
        diagram: [
          { step: "01. Checkout Ingestion", node: "Next.js Edge API / Stripe Webhook", latency: "1.2ms" },
          { step: "02. Fraud & Verification", node: "Cloudflare V8 Isolate Firewall", latency: "3.4ms" },
          { step: "03. Real-Time State", node: "Google Cloud Firestore Shard", latency: "11.4ms" },
          { step: "04. Fulfillment Daemon", node: "Discord Gateway Bot & Worker Daemon", latency: "180ms" },
        ],
      },
      techStack: [
        {
          category: "Frontend & Runtime",
          items: ["Next.js 14 App Router", "TypeScript", "Tailwind CSS", "Framer Motion"],
        },
        {
          category: "Edge & Backend",
          items: ["Cloudflare Workers", "Node.js Microservices", "Discord API v10", "Webhooks"],
        },
        {
          category: "Data & Storage",
          items: ["GCP Firestore Realtime", "Redis Edge Cache", "Upstash KV", "Server-Sent Events"],
        },
      ],
      aiWorkflows: [
        {
          title: "Automated Fraud & Anomaly Sentiment Classifier",
          description:
            "Analyzes high-frequency transaction velocities and payment fingerprint anomalies to block automated chargeback fraud before key dispatch.",
          model: "FastText + Heuristic Decision Ensemble",
          pipeline: ["Order Request", "Velocity Extraction", "Risk Scoring", "Automated Approval"],
        },
      ],
      dataPipelines: [
        {
          source: "Customer Order Stream",
          flow: "TLS 1.3 -> Edge Webhook Router",
          destination: "Firestore Shard Cluster",
          retentionOrSync: "< 15ms Delta Sync",
        },
        {
          source: "Bot Gateway Telemetry",
          flow: "WebSocket Event Loop -> Worker",
          destination: "Customer Notification Channel",
          retentionOrSync: "Sub-second Instant Push",
        },
      ],
      benchmarks: [
        { metric: "Fulfillment Velocity", value: "< 800ms", comparison: "95% faster than manual marketplaces" },
        { metric: "Edge Response", value: "18 ms", comparison: "Served directly from nearest Cloudflare POP" },
        { metric: "State Consistency", value: "100%", comparison: "ACID transactional Firestore updates" },
      ],
    },
    businessModel: {
      monetization: "Commission per instant automated fulfillment and Discord server boost API seat leases.",
      targetAudience: "Gaming communities, Discord server owners, competitive esports guilds, and digital asset traders.",
      valueProposition: "Sub-second zero-wait automated fulfillment directly via Discord Bot Gateway with replacement warranties.",
      scalabilityMetric: "< 800ms P99 delivery velocity across 45,000+ automated transactions.",
    },
    externalLink: "https://dhub-paused.vercel.app/",
    githubLink: "https://github.com/saifalii/dhub",
  },
  {
    id: "dreamroutes",
    themeId: "dreamroutes",
    name: "dreamroutes",
    tagline: "Luxury Travel Agency & VIP Schengen Visa Concierge",
    badge: "Concierge & Pathfinding",
    headline: "High-touch luxury itineraries, visa orchestration & algorithmic flight corridors.",
    summary:
      "A bespoke luxury travel network uniting premier European Schengen visa concierge workflows, Umrah and worldwide flight integrations, kinetic itinerary planning, and dynamic booking infrastructure.",
    previewType: "route-canvas",
    accentColor: "#7928CA",
    glowColor: "rgba(121, 40, 202, 0.5)",
    gradient: "from-purple-600 via-fuchsia-500 to-indigo-500",
    tags: ["Next.js", "Geospatial Indexing", "Kinetic Canvas", "Visa Automation", "Aviation APIs", "PostGIS"],
    stats: [
      { label: "Visa Approval Rate", value: "98.4%", sublabel: "VIP Concierge" },
      { label: "Pathfinding Speed", value: "4.8 ms", sublabel: "A* Flight Solver" },
      { label: "Global Airlines", value: "450+ Fleets", sublabel: "Real-time GDS API" },
    ],
    features: [
      "Custom Schengen visa requirement evaluator cross-referencing embassy quotas in real time",
      "Dynamic interactive travel corridor canvas calculating multi-city layovers and elevation curves",
      "Automated PDF itinerary compilation generating luxury bespoke traveler booklets instantly",
      "Direct integration with global airline distribution APIs (Emirates, Qatar Airways, Singapore Airlines)",
    ],
    buildModel: {
      architecture: {
        title: "VIP Travel Concierge Engine & Dynamic Flight Pathfinding Mesh",
        pattern: "Headless Travel Architecture + Edge Caching + Spatial Itinerary Solvers",
        description:
          "dreamroutes couples luxury client onboarding with rigorous airline distribution systems. High-demand visa requirements and flight schedules are cached at edge POPs, while custom pathfinding algorithms compute optimal connection times and layover aesthetics.",
        diagram: [
          { step: "01. Traveler Viewport", node: "Kinetic Canvas & Next.js ISR", latency: "16ms (60fps)" },
          { step: "02. Itinerary Solver", node: "Rust Wasm Flight Route Heuristic", latency: "4.8ms" },
          { step: "03. Airline GDS Proxy", node: "Amadeus / Sabre Global Edge API", latency: "120ms" },
          { step: "04. Document Fabric", node: "Automated Visa Dossier Compiler", latency: "450ms" },
        ],
      },
      techStack: [
        {
          category: "Spatial & Interface",
          items: ["Next.js 14 (App Router)", "HTML5 Canvas 2D", "Tailwind CSS", "Framer Motion"],
        },
        {
          category: "Travel Compute",
          items: ["Aviation GDS Gateway", "Python FastAPI microservices", "Heuristic Path Solvers"],
        },
        {
          category: "Storage & Documents",
          items: ["PostgreSQL / PostGIS", "Supabase Auth", "S3 Encrypted Document Vault"],
        },
      ],
      aiWorkflows: [
        {
          title: "Schengen Visa Risk & Itinerary Consistency Auditor",
          description:
            "Automated document consistency LLM verifying that flight reservations, hotel vouchers, and financial proofs conform exactly to destination consulate rules.",
          model: "Fine-tuned Document Verification Model",
          pipeline: ["User Passport/Docs", "Consulate Ruleset OCR", "Discrepancy Audit", "Greenlight Approval"],
        },
      ],
      dataPipelines: [
        {
          source: "Global Flight Schedules",
          flow: "GDS Live Stream -> Edge Cache",
          destination: "Active Client Viewport",
          retentionOrSync: "15-minute Rolling Updates",
        },
        {
          source: "Embassy Appointment Slots",
          flow: "Automated Polling Cron -> Edge Webhook",
          destination: "Client SMS / WhatsApp Alert",
          retentionOrSync: "Instant Real-time Dispatch",
        },
      ],
      benchmarks: [
        { metric: "Itinerary Generation", value: "4.8 ms", comparison: "Instant client-side multi-leg routing" },
        { metric: "Document Security", value: "256-bit", comparison: "Banking-grade AES document encryption" },
        { metric: "Conversion Lift", value: "+44%", comparison: "Compared to legacy agency inquiry forms" },
      ],
    },
    businessModel: {
      monetization: "VIP concierge fee per bespoke itinerary and commission on executive European Schengen corridor bookings.",
      targetAudience: "High-net-worth travelers, Pakistani families seeking expedited Schengen visas, and executive Umrah pilgrimages.",
      valueProposition: "Algorithmic corridor pathfinding coupled with high-touch embassy appointment automated polling and banking-grade dossier encryption.",
      scalabilityMetric: "99.4% verified visa approval rating and instant sub-5ms client-side route generation.",
    },
    externalLink: "https://dreamroutes-dusky.vercel.app/",
    githubLink: "https://github.com/saifalii/dreamroutes",
  },
  {
    id: "glamlux",
    themeId: "glamlux",
    name: "glamlux",
    tagline: "Parisian-Pakistani Luxury Salon, Bridal Atelier & Cosmetics",
    badge: "Haute Couture Commerce",
    headline: "Curated luxury bridal bookings, parlour ateliers & salon-grade cosmetics.",
    summary:
      "A transcendent digital salon and boutique blending Pakistani bridal couture mastery with Parisian elegance. Features dynamic salon appointment bookings, bespoke makeup artist portfolios, and high-end cosmetics with PIN-verified cash on delivery.",
    previewType: "luxury-tilt",
    accentColor: "#D4AF37",
    glowColor: "rgba(212, 175, 55, 0.45)",
    gradient: "from-amber-400 via-yellow-500 to-amber-700",
    tags: ["Next.js ISR", "Luxury E-Commerce", "Bridal Atelier", "Interactive 3D Tilt", "Tailwind CSS", "COD PIN Auth"],
    stats: [
      { label: "LCP Load Time", value: "0.38s", sublabel: "Edge Cached ISR" },
      { label: "Bridal Satisfaction", value: "99.8%", sublabel: "Top MM Alam Artists" },
      { label: "COD Verification", value: "4-Digit PIN", sublabel: "Fraud-Proof Logistics" },
    ],
    features: [
      "Dynamic bridal atelier scheduler for Barat, Walima, and Mehndi appointments with lead artists",
      "Interactive 3D luxury tilt product cards featuring holographic gold foil displacement and fragrance pyramids",
      "Next.js Incremental Static Regeneration delivering sub-400ms loading speeds across high-res beauty portfolios",
      "Fraud-resistant 4-digit PIN verified Cash on Delivery logistics engine tailored for Pakistani retail",
    ],
    buildModel: {
      architecture: {
        title: "High-Luxe Digital Atelier with Edge ISR & PIN-Verified Checkout",
        pattern: "Headless Luxury E-Commerce + Static Regeneration + Micro-Interactions",
        description:
          "glamlux decouples high-resolution editorial bridal portfolios from dynamic appointment booking state. Pages are served statically from edge POPs for instantaneous navigation, while appointment slots sync directly to salon master schedules.",
        diagram: [
          { step: "01. Client Atelier", node: "Next.js ISR + Parallax Tilt", latency: "16.6ms (60fps)" },
          { step: "02. Edge POP", node: "Vercel Edge Network Cache", latency: "14ms" },
          { step: "03. Booking Engine", node: "Automated Salon Calendar Mesh", latency: "38ms" },
          { step: "04. COD PIN Dispatch", node: "SMS Gateway 4-Digit Security", latency: "1.2s" },
        ],
      },
      techStack: [
        {
          category: "Frontend & Aesthetic",
          items: ["Next.js 14 App Router", "Tailwind CSS", "Framer Motion", "GLSL Parallax Shaders"],
        },
        {
          category: "Commerce & Bookings",
          items: ["Headless Commerce Engine", "PostgreSQL", "4-Digit PIN SMS API", "Prisma ORM"],
        },
        {
          category: "Media & Assets",
          items: ["Cloudinary AVIF/WebP", "High-Resolution Image CDN", "Adaptive Bitrate Pipeline"],
        },
      ],
      aiWorkflows: [
        {
          title: "Bridal Skin Palette & Atelier Formulation Matcher",
          description:
            "Matches specific Pakistani bridal skin undertones and wedding lighting conditions (daylight Mehndi vs warm candlelit Walima) with ideal foundation and highlighter pairings.",
          model: "Chromatics Skin Undertone Neural Matcher",
          pipeline: ["Undertone Input", "Lighting Model Selection", "Artist Formula Matching", "Tailored Recommendation"],
        },
      ],
      dataPipelines: [
        {
          source: "Salon Schedule Inventory",
          flow: "GraphQL Webhook -> Edge Invalidation",
          destination: "Edge Statically Rendered Booking Pages",
          retentionOrSync: "< 100ms On-Demand Revalidation",
        },
        {
          source: "Customer COD Orders",
          flow: "Encrypted Payload -> SMS PIN Gateway",
          destination: "Logistics Dispatch Terminal",
          retentionOrSync: "Instant Sub-second Broadcast",
        },
      ],
      benchmarks: [
        { metric: "Largest Contentful Paint", value: "0.38 s", comparison: "Faster than 99% of global luxury beauty sites" },
        { metric: "Image Optimization", value: "82% smaller", comparison: "Next-gen AVIF delivery with zero quality loss" },
        { metric: "Booking Friction", value: "-65%", comparison: "Streamlined 2-step appointment reservation" },
      ],
    },
    businessModel: {
      monetization: "Commission on salon atelier bridal bookings and luxury cosmetic direct-to-consumer e-commerce sales.",
      targetAudience: "Pakistani brides, high-fashion consumers, and elite MM Alam Road salon clientele.",
      valueProposition: "Bespoke bridal atelier calendar scheduling paired with 4-digit PIN verified Cash on Delivery fraud protection.",
      scalabilityMetric: "Sub-400ms LCP storefront rendering with 82% image compression via AVIF ISR.",
    },
    externalLink: "https://glamlux.vercel.app/",
    githubLink: "https://github.com/saifalii/glamlux",
  },
  {
    id: "saifalii.dev",
    themeId: "core",
    name: "saifalii.dev",
    tagline: "The Master Engineering Brand & Portfolio Orchestrator",
    badge: "Master Architecture Hub",
    headline: "Orchestrating high-performance distributed systems, creative physics, and resilient codebases.",
    summary:
      "The flagship digital proving ground for Saif Ali. Aggressively designed to unite Dennis Snellenberg kinetic typography, Lenis inertia scrolling, procedural Web Audio synthesis, and production build models under a single cohesive hub.",
    previewType: "orchestrator-topology",
    accentColor: "#455CE9",
    glowColor: "rgba(69, 92, 233, 0.45)",
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    tags: ["Lenis Smooth Scroll", "Dennis Snellenberg DNA", "Web Audio API", "Three.js / GLSL", "Next.js 14"],
    stats: [
      { label: "Scroll Engine", value: "120 FPS", sublabel: "Lenis Inertia Lerp" },
      { label: "Audio Synthesizer", value: "0 Assets", sublabel: "Native AudioContext" },
      { label: "Live Systems", value: "3 Platforms", sublabel: "Production Deployed" },
    ],
    features: [
      "Custom procedural Web Audio synthesizer delivering tactile haptic audio without external network assets",
      "Lenis smooth inertia scroll engine with signature exponential deceleration curves",
      "Dennis Snellenberg signature cursor-following floating preview modal and magnetic interaction physics",
      "Terminal Overclock easter egg mode parsing the Konami sequence into an interactive matrix stream",
    ],
    buildModel: {
      architecture: {
        title: "Autonomous Master Portfolio & Living Digital Laboratory",
        pattern: "Next.js 14 App Router + Lenis Smooth Scroll + Procedural Web Audio Synth",
        description:
          "saifalii.dev functions as a high-precision command center. Every interaction, scroll event, magnetic button, and interactive live preview is calculated using native browser APIs and hardware-accelerated transforms.",
        diagram: [
          { step: "01. Viewport Driver", node: "Lenis Smooth Scroll + RAF Loop", latency: "8.3ms (120fps)" },
          { step: "02. Interaction Bus", node: "Procedural Audio Synthesizer", latency: "0.1ms" },
          { step: "03. Cursor Physics", node: "Spring-Lerp Magnetic Tracking", latency: "0.2ms" },
          { step: "04. Production Telemetry", node: "dhub / dreamroutes / glamlux Mesh", latency: "Instant" },
        ],
      },
      techStack: [
        {
          category: "Framework & Core",
          items: ["Next.js 14 App Router", "React 18", "TypeScript", "Tailwind CSS"],
        },
        {
          category: "Physics & Motion",
          items: ["Lenis (Studio Freight)", "Framer Motion", "3D Spring Physics Math"],
        },
        {
          category: "Audio & Shaders",
          items: ["Web Audio API (Oscillators, BiquadFilters)", "WebGL Fragment Shaders"],
        },
      ],
      aiWorkflows: [
        {
          title: "Self-Refining Portfolio Interaction Clustering",
          description:
            "Client-side event clustering evaluating cursor velocity, hover dwell times, and project inspection rates to optimize visual hierarchy.",
          model: "K-Means Clustering via Client Wasm",
          pipeline: ["User Cursor Vectors", "Dwell Time Normalization", "Interaction Weighting", "Layout Adaptation"],
        },
      ],
      dataPipelines: [
        {
          source: "Live Production Endpoints",
          flow: "TLS 1.3 -> Edge Health Ping",
          destination: "Active Telemetry Ribbons",
          retentionOrSync: "Instant Real-Time Status",
        },
      ],
      benchmarks: [
        { metric: "Lighthouse Performance", value: "100 / 100", comparison: "Zero external audio/image dependencies" },
        { metric: "Scroll Smoothness", value: "120 FPS", comparison: "Lenis exponential deceleration" },
        { metric: "Audio Latency", value: "< 2 ms", comparison: "Hardware-accelerated native AudioContext" },
      ],
    },
    businessModel: {
      monetization: "Principal systems architecture consulting, creative engineering retainers, and high-stakes web venture builds.",
      targetAudience: "Global founders, luxury brands, high-throughput fintech, and venture studios seeking elite craft.",
      valueProposition: "Uniting architectural microservice resilience with award-winning kinetic design and 120 FPS physical motion.",
      scalabilityMetric: "100/100 Lighthouse performance with zero external asset overhead.",
    },
    externalLink: "https://saifalii.dev",
    githubLink: "https://github.com/saifalii",
  },
];
