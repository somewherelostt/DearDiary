"use client";

import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { MoodLabel } from "@/types";

interface MoodDistributionProps {
  moodCounts: Record<MoodLabel, number>;
}

export function MoodDistribution({ moodCounts }: MoodDistributionProps) {
  const total = Object.values(moodCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Mood color palette
  const moodColors: Record<string, string> = {
    joyful: "#FCD34D", // Amber
    calm: "#6EE7B7", // Emerald
    neutral: "#D1D5DB", // Gray
    anxious: "#C4B5FD", // Violet
    sad: "#93C5FD", // Blue
    angry: "#FCA5A5", // Rose
  };

  const moodEmoji: Record<string, string> = {
    joyful: "😊",
    calm: "😌",
    neutral: "😐",
    anxious: "😰",
    sad: "😔",
    angry: "😠",
  };

  // Prepare data for Radar Chart
  const radarData = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
    fullMark: Math.max(...Object.values(moodCounts), 1),
  }));

  // Prepare data for the mini stats
  const statsData = Object.entries(moodCounts)
    .map(([mood, count]) => ({
      mood: mood as MoodLabel,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      color: moodColors[mood],
      emoji: moodEmoji[mood],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold text-neutral-800 mb-6">
        Emotional Balance
      </h3>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-6"
      >
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#E5E7EB" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="mood"
              tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, "auto"]}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
            />
            <Radar
              name="Mood"
              dataKey="value"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.6}
              strokeWidth={2}
              animationDuration={1500}
              animationBegin={300}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats List */}
      <div className="space-y-3">
        {statsData.slice(0, 3).map((item, index) => (
          <motion.div
            key={item.mood}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-white/30"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-neutral-800 capitalize">
                  {item.mood}
                </p>
                <p className="text-xs text-neutral-500">
                  {item.count} {item.count === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>
            <div
              className="text-lg font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: item.color + "40",
                color: item.color.replace("#", "#").slice(0, 7),
              }}
            >
              {item.percentage.toFixed(0)}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Text */}
      {total > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-6 text-xs text-center text-neutral-500 italic"
        >
          Your emotional spectrum shows {statsData[0].mood} leading at{" "}
          {statsData[0].percentage.toFixed(0)}%
        </motion.p>
      )}
    </div>
  );
}
