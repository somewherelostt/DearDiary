"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cardHover } from "@/lib/animations";
import { TrendingUp, BookOpen, Heart } from "lucide-react";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={cardHover}
      >
        <Card accentColor="#FFD700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5" />
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{totalEntries}</p>
            <p className="text-sm font-bold text-gray-600 mt-2">
              Keep writing!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={cardHover}
      >
        <Card accentColor="#87CEEB">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Avg Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{avgSentiment}</p>
            <p className="text-sm font-bold text-gray-600 mt-2">
              {parseFloat(avgSentiment) > 0 ? "Positive" : "Reflective"} overall
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={cardHover}
      >
        <Card accentColor="#FF69B4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5" />
              Dominant Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">
              {moodEmoji[dominantMood] || "😐"} {dominantMood}
            </p>
            <p className="text-sm font-bold text-gray-600 mt-2">
              Most frequent
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
