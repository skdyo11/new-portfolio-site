export type ThemeId = 'core' | 'dhub' | 'dreamroutes' | 'glamlux';

export interface BusinessModel {
  monetization: string;
  targetAudience: string;
  valueProposition: string;
  scalabilityMetric: string;
}

export interface BuildModel {
  architecture: {
    title: string;
    description: string;
    pattern: string;
    diagram: Array<{ step: string; node: string; latency?: string }>;
  };
  techStack: {
    category: string;
    items: string[];
  }[];
  aiWorkflows: {
    title: string;
    description: string;
    model: string;
    pipeline: string[];
  }[];
  dataPipelines: {
    source: string;
    flow: string;
    destination: string;
    retentionOrSync: string;
  }[];
  benchmarks: {
    metric: string;
    value: string;
    comparison: string;
  }[];
}

export interface Project {
  id: string;
  themeId: ThemeId;
  name: string;
  tagline: string;
  badge: string;
  headline: string;
  summary: string;
  previewType: 'terminal' | 'route-canvas' | 'luxury-tilt' | 'orchestrator-topology';
  accentColor: string;
  glowColor: string;
  gradient: string;
  stats: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  tags: string[];
  features: string[];
  buildModel: BuildModel;
  businessModel?: BusinessModel;
  externalLink?: string;
  githubLink?: string;
}

export type SoundType = 'click' | 'hover' | 'warp' | 'beep' | 'overclock' | 'success' | 'siren' | 'glitch';
