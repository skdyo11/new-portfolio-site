"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Check, ArrowRight, ShieldCheck, RefreshCw, Sparkles, Terminal } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";

interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  speed: string;
  stock: string;
  theme: {
    bg: string;
    border: string;
    activeBorder: string;
    priceColor: string;
    badgeBg: string;
    badgeText: string;
  };
}

export function DhubSim() {
  const [selectedProduct, setSelectedProduct] = useState("boosts");
  const [dispatchStatus, setDispatchStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [activeStep, setActiveStep] = useState(0);
  const { playSound } = useAudio();

  const catalog: Product[] = [
    {
      id: "boosts",
      title: "14x Discord Guild Boosts",
      category: "Level 3 Community Unlock",
      price: "$14.99",
      speed: "320ms",
      stock: "Instant Auto-Delivery",
      theme: {
        bg: "bg-gradient-to-br from-[#1E1B4B]/90 via-[#31104B]/60 to-[#0F0E1E]",
        border: "border-indigo-500/40",
        activeBorder: "border-indigo-400 ring-2 ring-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.4)]",
        priceColor: "text-indigo-300",
        badgeBg: "bg-indigo-500/20 border-indigo-400/30",
        badgeText: "text-indigo-200",
      },
    },
    {
      id: "robux",
      title: "10,000 Robux Clean Ledger",
      category: "Group Payout / Instant",
      price: "$49.50",
      speed: "780ms",
      stock: "Verified Batch #892",
      theme: {
        bg: "bg-gradient-to-br from-[#064E3B]/90 via-[#0F766E]/60 to-[#0A1F1B]",
        border: "border-emerald-500/40",
        activeBorder: "border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.4)]",
        priceColor: "text-emerald-300",
        badgeBg: "bg-emerald-500/20 border-emerald-400/30",
        badgeText: "text-emerald-200",
      },
    },
    {
      id: "nitro",
      title: "Nitro 1-Year Global Key",
      category: "Automated Bot Dispatch",
      price: "$39.99",
      speed: "180ms",
      stock: "100% Replacement Guarantee",
      theme: {
        bg: "bg-gradient-to-br from-[#4C0519]/90 via-[#831843]/60 to-[#1F0A14]",
        border: "border-rose-500/40",
        activeBorder: "border-rose-400 ring-2 ring-rose-400/50 shadow-[0_0_30px_rgba(244,63,94,0.4)]",
        priceColor: "text-rose-300",
        badgeBg: "bg-rose-500/20 border-rose-400/30",
        badgeText: "text-rose-200",
      },
    },
  ];

  const current = catalog.find((p) => p.id === selectedProduct) || catalog[0];

  const handleSimulateCheckout = () => {
    playSound("click");
    setDispatchStatus("processing");
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
      playSound("hover");
    }, 280);

    setTimeout(() => {
      setActiveStep(3);
      setDispatchStatus("completed");
      playSound("beep");
    }, 620);
  };

  const handleReset = () => {
    playSound("click");
    setDispatchStatus("idle");
    setActiveStep(0);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0D0F14] text-neutral-200 overflow-hidden font-sans p-6 sm:p-7 justify-between space-y-6">
      {/* Product Catalog Section with Vibrant Color Pops (Top bar with two dots removed) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-300 font-bold tracking-wider">
            PRODUCT SELECTION CATALOG
          </span>
          <span className="text-[11px] text-amber-400 font-medium">
            REAL-TIME INVENTORY SYNC
          </span>
        </div>

        {/* 3 Color-Popping Product Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {catalog.map((item) => {
            const isSelected = selectedProduct === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  playSound("click");
                  setSelectedProduct(item.id);
                  if (dispatchStatus === "completed") {
                    setDispatchStatus("idle");
                    setActiveStep(0);
                  }
                }}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${item.theme.bg} ${
                  isSelected ? item.theme.activeBorder : item.theme.border
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.theme.badgeBg} ${item.theme.badgeText}`}>
                    {item.speed}
                  </span>
                  <span className={`font-mono text-base font-bold ${item.theme.priceColor}`}>
                    {item.price}
                  </span>
                </div>

                <div className="font-bold text-sm text-white mt-2.5 leading-snug">
                  {item.title}
                </div>

                <div className="text-[11px] text-white/70 mt-1 line-clamp-1">
                  {item.category}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Live Fulfillment Simulator Box */}
      <div className="p-5 rounded-2xl border border-white/10 bg-black/50 space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">AUTOMATED WORKFLOW PIPELINE</span>
          <span className="text-amber-300 font-medium">{current.stock}</span>
        </div>

        {/* Stepper Pipeline */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "1. Webhook Handshake", detail: "Stripe & Cloudflare V8" },
            { label: "2. Shard Ledger Validation", detail: "Firestore Snapshot Sync" },
            { label: "3. Instant Bot Dispatch", detail: "Discord Gateway Cluster" },
          ].map((step, idx) => {
            const isDone = activeStep > idx;
            const isCurrent = activeStep === idx + 1 && dispatchStatus === "processing";
            return (
              <div
                key={step.label}
                className={`p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                  isDone
                    ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : isCurrent
                    ? "border-amber-400/70 bg-amber-400/20 text-amber-200"
                    : "border-white/[0.08] bg-white/[0.02] text-neutral-500"
                }`}
              >
                <div className="font-mono text-[10px] uppercase font-bold">{step.label}</div>
                <div className="text-[11px] truncate opacity-80 mt-0.5">{step.detail}</div>
              </div>
            );
          })}
        </div>

        {/* Simulator Trigger */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          {dispatchStatus === "completed" ? (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Check className="h-4 w-4" />
              <span>Fulfilled in 620ms via Discord Gateway!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span>Fraud-Proof Hash Verification Ready</span>
            </div>
          )}

          {dispatchStatus === "completed" ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Test Again</span>
            </button>
          ) : (
            <button
              disabled={dispatchStatus === "processing"}
              onClick={handleSimulateCheckout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold text-xs transition-all shadow-lg hover:shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
            >
              <Zap className="h-3.5 w-3.5 fill-current text-amber-500" />
              <span>
                {dispatchStatus === "processing" ? "Orchestrating..." : "Test Instant Fulfillment Simulation"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}