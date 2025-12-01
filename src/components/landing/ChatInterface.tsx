"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ChatInterface() {
  const [showUser, setShowUser] = useState(false);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowUser(true), 500);
    const timer2 = setTimeout(() => setShowAI(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative h-full min-h-[400px] p-8 bg-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a]">
      <div className="text-xs uppercase tracking-widest font-bold mb-6 opacity-60">
        Context Aware Analysis
      </div>

      <div className="space-y-4">
        {/* User Message */}
        {showUser && (
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="max-w-[70%] bg-[#1a1a1a] text-white px-4 py-3 rounded-lg border-[1.5px] border-[#1a1a1a]">
              <p className="text-sm font-medium">I feel anxious today...</p>
            </div>
          </motion.div>
        )}

        {/* AI Response with Color Bloom */}
        {showAI && (
          <motion.div
            className="flex justify-start relative"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            {/* Color bloom background */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-br from-violet-300 via-purple-200 to-fuchsia-200 opacity-20 blur-2xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative max-w-[80%] bg-gradient-to-br from-violet-50 to-purple-50 px-4 py-3 rounded-lg border-[1.5px] border-[#1a1a1a]">
              <p className="text-sm font-medium text-[#1a1a1a]">
                I sense some anxiety in your words. Let&apos;s explore
                what&apos;s on your mind. Would you like to talk about it?
              </p>
              <motion.div
                className="mt-2 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="px-2 py-1 bg-violet-200 text-[#1a1a1a] text-xs font-bold rounded border border-[#1a1a1a]">
                  Anxious
                </span>
                <span className="px-2 py-1 bg-purple-200 text-[#1a1a1a] text-xs font-bold rounded border border-[#1a1a1a]">
                  Reflective
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Typing indicator */}
        <motion.div
          className="flex justify-start"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex gap-1 px-4 py-3 bg-neutral-100 rounded-lg border-[1.5px] border-[#1a1a1a]">
            <div className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-bounce delay-200" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
