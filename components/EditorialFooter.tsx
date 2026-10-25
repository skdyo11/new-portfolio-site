"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Copy, Check, ArrowUpRight, Send, CheckCircle2, Sparkles, Plus, ExternalLink } from "lucide-react";
import { useAudio } from "@/components/AudioEngine";
import { MagneticButton } from "@/components/MagneticButton";

export function EditorialFooter() {
  const [copied, setCopied] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Full-Stack Web Platform",
  ]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customScope, setCustomScope] = useState("");
  // Starts way lower at $1,200 with step of $100
  const [budgetValue, setBudgetValue] = useState<number>(1200);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draftedMailto, setDraftedMailto] = useState("");
  const { playSound } = useAudio();

  const minBudget = 200;
  const maxBudget = 30000;
  const budgetStep = 100;

  const standardScopes = [
    "Full-Stack Web Platform",
    "Systems Architecture",
    "Design & Interaction",
    "AI & Microservices",
  ];

  const formatBudgetLabel = (val: number) => {
    if (val >= 25000) return `$${val.toLocaleString()}+ USD (Enterprise Flagship)`;
    if (val <= 600) return `$${val.toLocaleString()} USD (Micro-Sprint / Rapid Fix)`;
    if (val <= 2500) return `$${val.toLocaleString()} USD (MVP / Feature Module)`;
    if (val <= 8000) return `$${val.toLocaleString()} USD (Production Platform)`;
    return `$${val.toLocaleString()} USD (Distributed Architecture)`;
  };

  const toggleScope = (scope: string) => {
    playSound("click");
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const toggleOther = () => {
    playSound("click");
    setIsOtherSelected((prev) => !prev);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetValue(Number(e.target.value));
  };

  const handleCopyEmail = () => {
    playSound("click");
    navigator.clipboard.writeText("saifalii.dev@gmail.com");
    setCopied(true);
    playSound("beep");
    setTimeout(() => setCopied(false), 2000);
  };

  const composeEmailBody = () => {
    const activeScopesList = [...selectedScopes];
    if (isOtherSelected && customScope.trim()) {
      activeScopesList.push(`Custom: ${customScope.trim()}`);
    }

    return (
      `Hi Saif,\n\n` +
      `I'd like to commission a new project with you:\n\n` +
      `• Client Name: ${name.trim() || "Not specified"}\n` +
      `• Client Email: ${email.trim() || "Not specified"}\n` +
      `• Target Budget: ${formatBudgetLabel(budgetValue)}\n` +
      `• Project Scope: ${activeScopesList.length > 0 ? activeScopesList.join(", ") : "Bespoke Engineering"}\n\n` +
      `• Project Overview:\n${message.trim() || "I'd like to schedule an initial discovery discussion to explore technical requirements and timelines."}\n\n` +
      `Looking forward to connecting,\n` +
      `${name.trim() || "Prospective Client"}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound("click");

    const subject = encodeURIComponent(
      `Project Commission: ${name.trim() || "New Client"} [${formatBudgetLabel(budgetValue).split(" ")[0]}]`
    );
    const bodyText = composeEmailBody();
    const mailtoUrl = `mailto:saifalii.dev@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    setDraftedMailto(mailtoUrl);
    setIsSubmitted(true);
    playSound("beep");

    // Copy formatted email draft directly to user's clipboard
    navigator.clipboard.writeText(bodyText);

    // Auto-launch client's email application
    window.location.href = mailtoUrl;
  };

  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Slider thumb percentage position for live bubble display
  const sliderPercentage = ((budgetValue - minBudget) / (maxBudget - minBudget)) * 100;

  return (
    <footer id="contact" className="border-t border-white/[0.1] bg-[#141518] text-neutral-300 font-sans select-none py-12 sm:py-28 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-16">
        {/* Engagement Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-400 font-semibold">
            02 / INITIATE ENGAGEMENT
          </span>
          <h2 className="font-serif italic text-3xl sm:text-6xl text-white tracking-tight font-normal">
            Let&apos;s build something exceptional.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Accepting commissions for high-throughput platforms and bespoke digital experiences.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <MagneticButton
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold shadow-lg cursor-pointer"
            >
              <span>saifalii.dev@gmail.com</span>
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-neutral-500" />}
            </MagneticButton>
            <span className="text-[11px] sm:text-xs font-mono text-neutral-400">
              {copied ? "Copied to clipboard" : "Click to copy inbox"}
            </span>
          </div>
        </div>

        {/* Focused High-Contrast Interactive Inquiry Form with Scroll Popup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl border border-yellow-500/30 bg-[#1C1E26] p-4 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_35px_rgba(234,179,8,0.1)] ring-1 ring-white/10 max-w-3xl mx-auto"
        >
          {/* Form Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.1] pb-4 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                Direct Project Dossier &amp; Brief Generator
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-amber-300">
                RESPONSE TIME: &lt; 24H
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Scope Selection with Smoothly Transitioned Inline Type Bar */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                Select Scope:
              </label>

              <div className="flex flex-wrap gap-2">
                {standardScopes.map((scope) => {
                  const active = selectedScopes.includes(scope);
                  return (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => toggleScope(scope)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                        active
                          ? "bg-amber-400 text-black font-semibold shadow-md"
                          : "border border-white/15 bg-white/[0.03] text-neutral-300 hover:text-white hover:border-white/30"
                      }`}
                    >
                      {scope}
                    </button>
                  );
                })}

                {/* Other Option */}
                <button
                  type="button"
                  onClick={toggleOther}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isOtherSelected
                      ? "bg-amber-400 text-black font-semibold shadow-md"
                      : "border border-dashed border-white/25 bg-white/[0.02] text-amber-300 hover:border-amber-400"
                  }`}
                >
                  <Plus className="h-3 w-3" />
                  <span>Other / Custom</span>
                </button>
              </div>

              {/* Smooth Spring Animated Inline Type Bar (User Request 4) */}
              <AnimatePresence>
                {isOtherSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scaleY: 0.8 }}
                    animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                    exit={{ opacity: 0, height: 0, scaleY: 0.8 }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className="overflow-hidden pt-2 origin-top"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Type custom project scope (e.g. Mobile App, Discord Bot, Telegram App)..."
                      value={customScope}
                      onChange={(e) => setCustomScope(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-400/60 bg-black/60 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Target Budget Range Slider with Live Thumb Tooltip (User Request 5) */}
            <div className="space-y-4 pt-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                  Target Budget:
                </label>
                <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                  {formatBudgetLabel(budgetValue)}
                </span>
              </div>

              {/* Range Slider Container with Floating Live Amount Tooltip */}
              <div className="relative pt-6 pb-2">
                {/* Floating Tooltip Bubble that tracks the thumb */}
                <div
                  className="absolute top-0 -translate-x-1/2 px-2 py-0.5 rounded-md bg-amber-400 text-black text-[11px] font-mono font-bold shadow-md pointer-events-none transition-all duration-75 whitespace-nowrap"
                  style={{ left: `clamp(24px, ${sliderPercentage}%, calc(100% - 24px))` }}
                >
                  ${budgetValue.toLocaleString()}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-solid border-t-amber-400 border-t-4 border-x-transparent border-x-4 border-b-0" />
                </div>

                <input
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={budgetStep}
                  value={budgetValue}
                  onChange={handleSliderChange}
                  className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-2 px-0.5">
                  <span>${minBudget} <span className="hidden sm:inline">(Starter)</span></span>
                  <span>$8k <span className="hidden sm:inline">(Standard)</span></span>
                  <span>${maxBudget.toLocaleString()}+ <span className="hidden sm:inline">(Enterprise)</span></span>
                </div>
              </div>
            </div>

            {/* 3. Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Your Name
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                />
              </div>
            </div>

            {/* 4. Message Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Project Overview &amp; Goals
              </label>
              <textarea
                id="inquiry-message"
                rows={3}
                placeholder="Briefly describe your objectives, deliverables, and timeline (or leave blank to auto-generate)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
              />
            </div>

            {/* 5. Strong CTA Button */}
            <MagneticButton
              type="submit"
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-sans font-bold text-sm sm:text-base tracking-tight shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200"
            >
              <Send className="h-4 w-4 text-black shrink-0" />
              <span className="whitespace-nowrap">Send Project Inquiry</span>
              <span className="text-black font-bold text-base select-none shrink-0">➔</span>
            </MagneticButton>

            {/* 6. Transmission Confirmation Drawer */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Inquiry Auto-Drafted &amp; Staged Successfully!</span>
                  </div>
                  <span className="text-[10px] text-white/60">Copied to Clipboard ✓</span>
                </div>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  Your email client has been triggered with the complete pre-written project dossier. If your mail app didn&apos;t open automatically, use the direct link below:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={draftedMailto}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 text-black text-xs font-mono font-bold hover:bg-amber-300 transition-colors"
                  >
                    <span>Open in Default Mail Client</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=saifalii.dev@gmail.com&su=${encodeURIComponent(`Project Commission: ${name.trim() || "New Client"}`)}&body=${encodeURIComponent(composeEmailBody())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 bg-white/[0.04] text-white text-xs font-mono hover:bg-white/10 transition-colors"
                  >
                    <span>Open in Gmail Web</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </form>
        </motion.div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-wrap items-center justify-between pt-8 border-t border-white/[0.1] text-xs font-mono text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 SAIF ALII</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}