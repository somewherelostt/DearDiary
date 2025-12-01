"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PenLine } from "lucide-react";
import Link from "next/link";

interface MoodChartProps {
  timeline: Array<{ date: string; score: number; label: string }>;
  totalEntries: number;
}

export function MoodChart({ timeline, totalEntries }: MoodChartProps) {
  const chartData = timeline.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    score: entry.score,
    label: entry.label,
  }));

  // Custom Tooltip Component
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: { date: string; label: string; score: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl px-4 py-3 shadow-lg">
          <p className="text-sm font-medium text-neutral-600 mb-1">
            {data.date}
          </p>
          <p className="text-lg font-bold text-neutral-900 capitalize">
            {data.label}
          </p>
          <p className="text-sm text-neutral-600 mt-1">
            Sentiment:{" "}
            <span className="font-semibold">{data.score.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Empty State
  if (totalEntries === 0) {
    return (
      <div className="h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-800 mb-6">
          Mood Timeline
        </h3>
        <div className="relative h-[400px] flex items-center justify-center">
          {/* Ghost Chart */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-neutral-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path
              d="M 0 200 Q 150 100, 300 150 T 600 180 L 600 400 L 0 400 Z"
              fill="currentColor"
              className="text-neutral-200"
              opacity="0.3"
            />
          </svg>

          {/* CTA */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PenLine className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-neutral-700 mb-2">
                Your story begins here
              </h4>
              <p className="text-neutral-500 mb-6 max-w-sm">
                Write your first entry to unlock insights into your emotional
                patterns
              </p>
              <Link href="/journal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Start Writing
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold text-neutral-800 mb-6">
        Mood Timeline
      </h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {/* Beautiful Gradient Definition */}
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#EC4899" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              strokeWidth={1}
              opacity={0.3}
            />

            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              strokeWidth={1}
              tick={{ fill: "#6B7280", fontSize: 12, fontFamily: "monospace" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />

            <YAxis
              domain={[-1, 1]}
              stroke="#9CA3AF"
              strokeWidth={1}
              tick={{ fill: "#6B7280", fontSize: 12, fontFamily: "monospace" }}
              tickLine={{ stroke: "#E5E7EB" }}
              ticks={[-1, -0.5, 0, 0.5, 1]}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Area with Gradient */}
            <Area
              type="monotone"
              dataKey="score"
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#colorScore)"
              animationDuration={1500}
              animationBegin={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="font-mono">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="font-mono">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="font-mono">Reflective</span>
        </div>
      </div>
    </div>
  );
}
