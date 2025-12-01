"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { getMoodColor } from "@/lib/utils";
import { MoodLabel } from "@/types";

interface MoodDistributionProps {
  moodCounts: Record<MoodLabel, number>;
}

export function MoodDistribution({ moodCounts }: MoodDistributionProps) {
  const total = Object.values(moodCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const moodData = Object.entries(moodCounts)
    .map(([mood, count]) => ({
      mood: mood as MoodLabel,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      color: getMoodColor(mood as MoodLabel),
    }))
    .sort((a, b) => b.count - a.count);

  const moodEmoji: Record<string, string> = {
    joyful: "😊",
    calm: "😌",
    neutral: "😐",
    anxious: "😰",
    sad: "😔",
    angry: "😠",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {moodData.map(({ mood, count, percentage, color }) => (
            <motion.div key={mood} variants={staggerItem} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{moodEmoji[mood]}</span>
                  <span className="font-bold capitalize">{mood}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-600">
                    {count} entries
                  </span>
                  <Badge
                    variant="default"
                    className="font-black"
                    style={{ backgroundColor: color }}
                  >
                    {percentage.toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <motion.div
                className="h-8 border-3 border-black rounded-sm overflow-hidden shadow-neo"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
