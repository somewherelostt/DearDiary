"use client";

import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import { useState } from "react";

export function LockIcon() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <motion.div
      className="relative h-full min-h-[300px] p-8 bg-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a] flex flex-col items-center justify-center cursor-pointer group"
      onHoverStart={() => setIsUnlocked(true)}
      onHoverEnd={() => setIsUnlocked(false)}
      whileHover={{
        y: -2,
        boxShadow: "5px 5px 0px 0px #1a1a1a",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-xs uppercase tracking-widest font-bold mb-8 opacity-60">
        Security
      </div>

      {/* Lock Icon Container */}
      <motion.div
        className="relative"
        animate={{
          scale: isUnlocked ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full blur-2xl"
          animate={{
            opacity: isUnlocked ? 0.4 : 0,
            scale: isUnlocked ? 1.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Lock icon */}
        <motion.div
          className="relative"
          animate={{
            rotate: isUnlocked ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {isUnlocked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className="w-32 h-32 text-green-600" strokeWidth={3} />
            </motion.div>
          ) : (
            <Lock className="w-32 h-32 text-[#1a1a1a]" strokeWidth={2} />
          )}
        </motion.div>
      </motion.div>

      <motion.h3
        className="text-2xl font-black mt-8 text-center"
        animate={{
          color: isUnlocked ? "#16a34a" : "#1a1a1a",
        }}
      >
        {isUnlocked ? "Secured ✓" : "Privacy Shield"}
      </motion.h3>

      <p className="text-sm font-medium text-center mt-4 opacity-70 max-w-xs">
        End-to-end encryption keeps your thoughts private and secure
      </p>

      {/* Security badges */}
      <div className="mt-6 flex gap-2 flex-wrap justify-center">
        <motion.span
          className="px-3 py-1 text-xs font-bold border-[1.5px] border-[#1a1a1a] rounded"
          animate={{
            backgroundColor: isUnlocked ? "#dcfce7" : "#f5f5f5",
            borderColor: isUnlocked ? "#16a34a" : "#1a1a1a",
          }}
        >
          AES-256
        </motion.span>
        <motion.span
          className="px-3 py-1 text-xs font-bold border-[1.5px] border-[#1a1a1a] rounded"
          animate={{
            backgroundColor: isUnlocked ? "#dcfce7" : "#f5f5f5",
            borderColor: isUnlocked ? "#16a34a" : "#1a1a1a",
          }}
        >
          Zero-Knowledge
        </motion.span>
      </div>
    </motion.div>
  );
}
