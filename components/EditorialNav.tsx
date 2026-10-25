"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/AudioEngine";

type NavSection = "work" | "about" | "contact";

export function EditorialNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<NavSection>("work");
  const { playSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);

      // Only show the 3 navigation buttons after user scrolls past the hero section (User Request 2)
      setPastHero(currentScrollY > 440);

      // Smoothly hide when scrolling down, show when scrolling up
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          setHidden(true);
        } else if (lastScrollY - currentScrollY > 6) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Track active section based on scroll position
      const workEl = document.getElementById("work");
      const aboutEl = document.getElementById("about");
      const contactEl = document.getElementById("contact");

      const scrollPos = currentScrollY + 250;

      if (contactEl && scrollPos >= contactEl.offsetTop - 120) {
        setActiveSection("contact");
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop - 120 && (!workEl || scrollPos < workEl.offsetTop - 120)) {
        setActiveSection("about");
      } else if (workEl && scrollPos >= workEl.offsetTop - 120) {
        setActiveSection("work");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: NavSection) => {
    playSound("click");
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems: { id: NavSection; label: string }[] = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-3.5 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between ${
        hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      } ${
        scrolled
          ? "bg-[#141518]/90 backdrop-blur-md border-b border-white/[0.08] shadow-xl py-2.5 sm:py-3"
          : "bg-transparent"
      }`}
    >
      {/* Left: Capsule Logo + Saif Alii on same line */}
      <Link
        href="/"
        onClick={() => playSound("click")}
        className="group flex items-center gap-2 sm:gap-3 select-none shrink-0"
      >
        <div className="w-7 h-4 sm:w-9 sm:h-5 bg-[#F4F4F6] rounded-l-full rounded-r-none transition-transform group-hover:scale-105 duration-200" />
        <span className="text-sm sm:text-lg font-syne font-bold text-[#F4F4F6] tracking-tight whitespace-nowrap">
          Saif Alii
        </span>
      </Link>

      {/* Right: Connected Navigation Capsule (Hidden in Hero, Appears when scrolling under Hero - User Request 2) */}
      <div className="h-9 sm:h-10 flex items-center">
        <AnimatePresence>
          {pastHero && (
            <motion.nav
              initial={{ opacity: 0, y: -16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="relative p-0.5 sm:p-1 rounded-full border border-white/15 bg-[#1C1E26]/90 backdrop-blur-md flex items-center shadow-lg shadow-black/40"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`relative z-10 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.8 }}
                        className="absolute inset-0 rounded-full bg-white shadow-md -z-10"
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}