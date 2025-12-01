"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BreathingCardProps {
  children: ReactNode;
  className?: string;
}

export function BreathingCard({
  children,
  className = "",
}: BreathingCardProps) {
  return (
    <motion.div
      className={`glass-morph rounded-xl p-8 relative overflow-hidden ${className}`}
      animate={{
        scale: [1, 1.02, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Ambient color blob background */}
      <motion.div
        className="absolute inset-0 bg-gradient-joy opacity-20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-calm opacity-20 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
