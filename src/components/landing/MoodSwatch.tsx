"use client";

import { motion } from "framer-motion";

interface MoodSwatchProps {
  mood: string;
  gradient: string;
  onHover: (gradient: string) => void;
  label: string;
}

export function MoodSwatch({ gradient, onHover, label }: MoodSwatchProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 cursor-pointer"
      onHoverStart={() => onHover(gradient)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${gradient} border-2 border-black shadow-brutal`}
        whileHover={{
          boxShadow: "8px 8px 0px 0px #000000",
          y: -4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.span
        className="text-xs md:text-sm font-bold uppercase tracking-widest"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
