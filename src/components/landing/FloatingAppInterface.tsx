"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function FloatingAppInterface() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full min-h-[500px] flex items-center justify-center"
    >
      {/* Main Diary Entry Window */}
      <motion.div
        className="relative w-full max-w-md bg-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a] p-6 z-10"
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Window Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b-[1.5px] border-neutral-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-full bg-green-400 border border-[#1a1a1a]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider opacity-60">
            Today&apos;s Entry
          </span>
        </div>

        {/* Entry Content */}
        <div className="space-y-3">
          <input
            type="text"
            value="A Beautiful Morning"
            readOnly
            className="w-full text-2xl font-black text-[#1a1a1a] bg-transparent border-none outline-none"
          />
          <div className="space-y-2">
            <div className="h-3 bg-gradient-to-r from-neutral-200 to-transparent rounded" />
            <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-200 to-transparent rounded" />
            <div className="h-3 w-3/4 bg-gradient-to-r from-neutral-200 to-transparent rounded" />
          </div>

          {/* Mood indicator */}
          <div className="flex gap-2 mt-4">
            <motion.div
              className="px-3 py-1 bg-gradient-to-r from-yellow-300 to-orange-300 text-[#1a1a1a] text-xs font-bold rounded border-[1.5px] border-[#1a1a1a]"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Joyful
            </motion.div>
            <div className="px-3 py-1 bg-gradient-to-r from-teal-300 to-emerald-300 text-[#1a1a1a] text-xs font-bold rounded border-[1.5px] border-[#1a1a1a]">
              Calm
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Mood Stats Card */}
      <motion.div
        className="absolute top-8 -right-4 w-48 bg-gradient-to-br from-violet-100 to-purple-100 border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[5px_5px_0px_0px_#1a1a1a] p-4 z-20"
        style={{
          rotateX: useTransform(rotateX, (v) => v * 1.5),
          rotateY: useTransform(rotateY, (v) => v * 1.5),
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">
          Weekly Stats
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Entries</span>
            <span className="text-lg font-black">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Avg Mood</span>
            <span className="text-lg font-black">😊</span>
          </div>
          <div className="w-full h-2 bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 rounded-full border border-[#1a1a1a]" />
        </div>
      </motion.div>
    </div>
  );
}
