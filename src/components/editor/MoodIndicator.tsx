"use client";

import { Badge } from "@/components/ui/badge";
import { MoodData } from "@/types";
import { motion } from "framer-motion";

interface MoodIndicatorProps {
  mood: MoodData;
  isAnalyzing?: boolean;
}

export function MoodIndicator({ mood, isAnalyzing }: MoodIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6 border-3 border-black rounded-sm bg-white shadow-neo"
    >
      {/* Mood Circle */}
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
        animate={{
          scale: isAnalyzing ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isAnalyzing ? Infinity : 0,
        }}
      >
        <div
          className="w-full h-full rounded-full border-4 border-black relative overflow-hidden"
          style={{ backgroundColor: mood.color }}
        >
          {/* Intensity fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black/20"
            initial={{ height: 0 }}
            animate={{ height: `${mood.intensity * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Pulse effect */}
        {isAnalyzing && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-black"
            style={{ backgroundColor: mood.color }}
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>

      {/* Mood Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-lg sm:text-xl font-black">Current Mood:</h3>
          <Badge variant={mood.label} className="text-sm sm:text-base">
            {mood.label.toUpperCase()}
          </Badge>
        </div>

        {/* Mood Metrics */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm font-medium mb-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sentiment:</span>
            <span className="font-bold">
              {mood.score > 0 ? "+" : ""}
              {(mood.score * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Intensity:</span>
            <span className="font-bold">
              {(mood.intensity * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Keywords */}
        {mood.keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {mood.keywords.map((keyword, index) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="neutral" className="text-xs">
                  {keyword}
                </Badge>
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Analyzing indicator */}
      {isAnalyzing && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-2xl"
        >
          🔄
        </motion.div>
      )}
    </motion.div>
  );
}
