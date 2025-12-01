"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { Flame, Sparkles, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  totalEntries: number;
  avgSentiment: string;
  dominantMood: string;
}

export function StatsCards({
  totalEntries,
  avgSentiment,
  dominantMood,
}: StatsCardsProps) {
  const moodEmoji: Record<string, string> = {
    joyful: "😊",
    calm: "😌",
    neutral: "😐",
    anxious: "😰",
    sad: "😔",
    angry: "😠",
  };

  const moodGradients: Record<string, string> = {
    joyful: "from-amber-200/40 via-yellow-200/30 to-transparent",
    calm: "from-emerald-200/40 via-teal-200/30 to-transparent",
    neutral: "from-gray-200/40 via-slate-200/30 to-transparent",
    anxious: "from-violet-200/40 via-purple-200/30 to-transparent",
    sad: "from-blue-200/40 via-indigo-200/30 to-transparent",
    angry: "from-rose-200/40 via-red-200/30 to-transparent",
  };

  // Calculate streak (simplified - just showing if they're active)
  const isActiveStreak = totalEntries > 0;

  return (
    <>
      {/* Journaling Streak Card */}
      <motion.div
        variants={staggerItem}
        className="md:col-span-1 relative overflow-hidden"
      >
        <div className="relative h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">
                Journaling Streak
              </p>
              <p className="text-4xl font-bold tracking-tight text-neutral-800">
                {totalEntries}
              </p>
            </div>
            <motion.div
              animate={
                isActiveStreak
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: isActiveStreak ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <Flame
                className={`w-8 h-8 ${
                  isActiveStreak ? "text-orange-500" : "text-neutral-300"
                }`}
                fill={isActiveStreak ? "currentColor" : "none"}
              />
            </motion.div>
          </div>
          <p className="text-xs font-medium text-neutral-600">
            {isActiveStreak ? "Keep the momentum!" : "Start your journey"}
          </p>
        </div>
      </motion.div>

      {/* Average Sentiment Card */}
      <motion.div
        variants={staggerItem}
        className="md:col-span-1 relative overflow-hidden"
      >
        <div className="relative h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">
                Average Sentiment
              </p>
              <p className="text-4xl font-bold tracking-tight text-neutral-800">
                {parseFloat(avgSentiment) > 0 ? "+" : ""}
                {avgSentiment}
              </p>
            </div>
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <TrendingUp
                className={`w-8 h-8 ${
                  parseFloat(avgSentiment) > 0
                    ? "text-green-500"
                    : "text-neutral-400"
                }`}
              />
            </motion.div>
          </div>
          <p className="text-xs font-medium text-neutral-600">
            {parseFloat(avgSentiment) > 0.3
              ? "Positively trending"
              : parseFloat(avgSentiment) < -0.3
                ? "Processing emotions"
                : "Balanced reflection"}
          </p>
        </div>
      </motion.div>

      {/* Dominant Mood Card - with Dynamic Background */}
      <motion.div
        variants={staggerItem}
        className="md:col-span-2 relative overflow-hidden"
      >
        <div
          className={`absolute inset-0 bg-gradient-radial ${moodGradients[dominantMood] || moodGradients.neutral}`}
        />
        <div className="relative h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-2">
                Dominant Mood
              </p>
              <div className="flex items-center gap-3">
                <span className="text-5xl">
                  {moodEmoji[dominantMood] || "😐"}
                </span>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-neutral-800 capitalize">
                    {dominantMood}
                  </p>
                  <p className="text-xs font-medium text-neutral-600 mt-1">
                    Your most frequent state
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
