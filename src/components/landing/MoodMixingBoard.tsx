"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const moods = [
  {
    id: "joy",
    label: "Joy",
    color: "#fde047",
    gradient: "from-yellow-300 to-orange-400",
  },
  {
    id: "calm",
    label: "Calm",
    color: "#5eead4",
    gradient: "from-teal-300 to-emerald-400",
  },
  {
    id: "sad",
    label: "Sad",
    color: "#93c5fd",
    gradient: "from-blue-300 to-indigo-400",
  },
  {
    id: "angry",
    label: "Angry",
    color: "#f87171",
    gradient: "from-red-400 to-rose-500",
  },
  {
    id: "anxious",
    label: "Anxious",
    color: "#c084fc",
    gradient: "from-violet-300 to-purple-400",
  },
  {
    id: "neutral",
    label: "Neutral",
    color: "#d4d4d8",
    gradient: "from-gray-300 to-slate-400",
  },
];

export function MoodMixingBoard() {
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);

  const handleMoodClick = (
    mood: (typeof moods)[0],
    event: React.MouseEvent
  ) => {
    setActiveMood(mood.id);

    // Create ripple effect
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y, color: mood.color };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <motion.div
      className="relative bg-neutral-100 border-[1.5px] rounded-lg p-8 overflow-hidden"
      animate={{
        borderColor: activeMood
          ? moods.find((m) => m.id === activeMood)?.color
          : "#1a1a1a",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-2 opacity-60">
          Mood Mixer
        </h2>
        <p className="text-4xl md:text-5xl font-black">Select Your Vibe</p>
      </div>

      {/* Mixing Board Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            className={`relative aspect-square rounded-full bg-gradient-to-br ${mood.gradient} border-[1.5px] border-[#1a1a1a] flex flex-col items-center justify-center gap-2 overflow-hidden`}
            onClick={(e) => handleMoodClick(mood, e)}
            whileHover={{
              scale: 1.1,
              boxShadow: "5px 5px 0px 0px #1a1a1a",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow:
                activeMood === mood.id
                  ? "5px 5px 0px 0px #1a1a1a"
                  : "3px 3px 0px 0px #1a1a1a",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="relative z-10 text-xs md:text-sm font-black text-[#1a1a1a] uppercase tracking-wider">
              {mood.label}
            </span>

            {/* Active indicator */}
            {activeMood === mood.id && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: ripple.color,
          }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Current selection display */}
      {activeMood && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-bold uppercase tracking-widest">
            Currently Exploring:{" "}
            <span className="text-lg">
              {moods.find((m) => m.id === activeMood)?.label}
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
