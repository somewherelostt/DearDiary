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

  useEffect(() => {
    // Fetch real analytics data from localStorage
    const loadAnalytics = () => {
      const data = getAnalytics(30);
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
    };

    // Small delay to ensure component is mounted
    setTimeout(loadAnalytics, 100);
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
            <Link href="/journal">
              <Button variant="reverse" size="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Journal
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
