"use client";

import { motion } from "framer-motion";
import { MoodData } from "@/types";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AmbientMoodGlowProps {
  mood: MoodData;
  isAnalyzing?: boolean;
  lastAnalyzed?: Date | null;
}

export function AmbientMoodGlow({
  mood,
  isAnalyzing,
  lastAnalyzed,
}: AmbientMoodGlowProps) {
  // Determine trend icon
  const getTrendIcon = () => {
    if (mood.score > 0.3) return <TrendingUp className="w-3 h-3" />;
    if (mood.score < -0.3) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  // Create sparkline data (simple visualization)
  const sparklinePoints = Array.from({ length: 8 }, (_, i) => {
    const variation = Math.sin(i * 0.5) * 0.3;
    return Math.max(0, Math.min(1, mood.intensity + variation));
  });

  return (
    <>
      {/* Ambient Gradient Glow at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(to bottom, ${mood.color}40, transparent)`,
              `linear-gradient(to bottom, ${mood.color}60, transparent)`,
              `linear-gradient(to bottom, ${mood.color}40, transparent)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Glassmorphic Mood Pill - Top Right */}
      {lastAnalyzed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed top-6 right-6 z-50"
        >
          <motion.div
            className="backdrop-blur-lg bg-white/80 border border-neutral-200/50 rounded-full px-5 py-3 shadow-lg"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                `0 4px 20px ${mood.color}30`,
                `0 4px 30px ${mood.color}50`,
                `0 4px 20px ${mood.color}30`,
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="flex items-center gap-3">
              {/* Mood Color Indicator */}
              <motion.div
                className="w-3 h-3 rounded-full border border-neutral-300"
                animate={{ backgroundColor: mood.color }}
                transition={{ duration: 3 }}
              />

              {/* Mood Label */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-600">
                  Detected:
                </span>
                <Badge
                  variant={mood.label}
                  className="text-xs font-semibold border-0"
                >
                  {mood.label}
                </Badge>
                {getTrendIcon()}
              </div>

              {/* Micro Sparkline */}
              <div className="flex items-end gap-0.5 h-4 ml-1">
                {sparklinePoints.map((point, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{
                      backgroundColor: mood.color,
                      opacity: 0.7,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${point * 100}%` }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Analyzing Indicator */}
              {isAnalyzing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-xs"
                >
                  🔄
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
