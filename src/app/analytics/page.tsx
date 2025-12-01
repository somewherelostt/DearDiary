"use client";

import { useState, useEffect } from "react";
import { StatsCards } from "@/components/analytics/StatsCards";
import { MoodDistribution } from "@/components/analytics/MoodDistribution";
import { MoodChart } from "@/components/analytics/MoodChart";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  pageTransition,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { MoodLabel } from "@/types";

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

  useEffect(() => {
    // Simulate fetching analytics data
    // Replace with actual API call: fetch("/api/analytics?userId=...")
    setTimeout(() => {
      setAnalytics({
        stats: {
          totalEntries: 42,
          avgSentiment: "0.35",
          dominantMood: "calm",
        },
        moodCounts: {
          joyful: 12,
          calm: 15,
          neutral: 8,
          anxious: 4,
          sad: 2,
          angry: 1,
        } as Record<MoodLabel, number>,
        moodTimeline: [
          { date: "2024-11-01", score: 0.3, label: "calm" },
          { date: "2024-11-05", score: 0.7, label: "joyful" },
          { date: "2024-11-10", score: -0.2, label: "sad" },
          { date: "2024-11-15", score: 0.5, label: "calm" },
          { date: "2024-11-20", score: 0.8, label: "joyful" },
          { date: "2024-11-25", score: 0.1, label: "neutral" },
          { date: "2024-11-30", score: 0.4, label: "calm" },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Calendar className="h-12 w-12" />
          </motion.div>
          <p className="mt-4 font-bold text-xl">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen bg-white p-4 sm:p-6 md:p-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={staggerItem} className="mb-6">
            <Link href="/dashboard">
              <Button variant="reverse" size="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4"
          >
            Your <span className="text-yellow">Analytics</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl font-bold text-gray-700"
          >
            Discover patterns in your emotional journey
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards
          totalEntries={analytics.stats.totalEntries}
          avgSentiment={analytics.stats.avgSentiment}
          dominantMood={analytics.stats.dominantMood}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MoodChart timeline={analytics.moodTimeline} />
          <MoodDistribution moodCounts={analytics.moodCounts} />
        </div>
      </div>
    </motion.div>
  );
}
