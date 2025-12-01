"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getMoodColor, getMoodLabel } from "@/lib/utils";

interface MoodChartProps {
  timeline: Array<{ date: string; score: number; label: string }>;
}

export function MoodChart({ timeline }: MoodChartProps) {
  const chartData = timeline.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    score: entry.score,
    label: entry.label,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#000"
                strokeWidth={2}
              />
              <XAxis
                dataKey="date"
                stroke="#000"
                strokeWidth={2}
                style={{ fontSize: "14px", fontWeight: "bold" }}
              />
              <YAxis
                domain={[-1, 1]}
                stroke="#000"
                strokeWidth={2}
                style={{ fontSize: "14px", fontWeight: "bold" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "3px solid #000",
                  borderRadius: "0",
                  boxShadow: "5px 5px 0px #000",
                  fontWeight: "bold",
                }}
                labelStyle={{ color: "#000", fontWeight: "bold" }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#000"
                strokeWidth={4}
                dot={{
                  r: 6,
                  fill: "#FFD700",
                  stroke: "#000",
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 8,
                  fill: "#FF69B4",
                  stroke: "#000",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
