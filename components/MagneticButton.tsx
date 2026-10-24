"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  magneticStrength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Motion spring physics matching user's exact specification
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  const x = useSpring(xValue, { stiffness: 110, damping: 31, mass: 0.7 });
  const y = useSpring(yValue, { stiffness: 110, damping: 31, mass: 0.7 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    xValue.set(deltaX);
    yValue.set(deltaY);
  };

  const handlePointerLeave = () => {
    xValue.set(0);
    yValue.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}