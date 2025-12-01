"use client";

import { useState, useEffect } from "react";
import { StatsCards } from "@/components/analytics/StatsCards";
import { MoodDistribution } from "@/components/analytics/MoodDistribution";
import { MoodChart } from "@/components/analytics/MoodChart";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Sparkles } from "lucide-react";
import { MoodLabel } from "@/types";
import { getAnalytics } from "@/lib/local-storage";

interface Analytics {
  stats: {
    totalEntries: number;
    avgSentiment: string;
    dominantMood: string;
  };
  moodCounts: Record<MoodLabel, number>;
  moodTimeline: Array<{ date: string; score: number; label: string }>;
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [dateRange, setDateRange] = useState<7 | 30>(30);

  useEffect(() => {
    loadAnalytics(dateRange);
  }, [dateRange]);

  const loadAnalytics = (days: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const data = getAnalytics(days);
      setAnalytics({
        stats: {
          totalEntries: data.totalEntries,
          avgSentiment: data.avgSentiment,
          dominantMood: data.dominantMood,
        },
        moodCounts: data.moodCounts as Record<MoodLabel, number>,
        moodTimeline: data.moodTimeline,
      });
      setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="h-12 w-12 text-purple-600" />
          </motion.div>
          <p className="text-xl font-medium text-neutral-700">
            Analyzing your emotions...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div>
        {/* Header */}
        <motion.div
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-start justify-between mb-6">
            <PageHeader
              title="Analytics"
              subtitle="A visual map of your inner world."
            />

            {/* Date Range Picker */}
            <motion.div
              variants={staggerItem}
              className="flex gap-2 bg-white/50 backdrop-blur-xl border border-white/20 rounded-full p-1 shadow-sm"
            >
              <button
                onClick={() => setDateRange(7)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                  dateRange === 7
                    ? "bg-black text-white shadow-md"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setDateRange(30)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                  dateRange === 30
                    ? "bg-black text-white shadow-md"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                30 Days
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Stats Cards - Top Row */}
          <StatsCards
            totalEntries={analytics.stats.totalEntries}
            avgSentiment={analytics.stats.avgSentiment}
            dominantMood={analytics.stats.dominantMood}
          />

          {/* Main Chart - Spans 3 columns on desktop */}
          <motion.div
            variants={staggerItem}
            className="md:col-span-3 md:row-span-2"
          >
            <MoodChart
              timeline={analytics.moodTimeline}
              totalEntries={analytics.stats.totalEntries}
            />
          </motion.div>

          {/* Mood Distribution - Spans 1 column */}
          <motion.div
            variants={staggerItem}
            className="md:col-span-1 md:row-span-2"
          >
            <MoodDistribution moodCounts={analytics.moodCounts} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
