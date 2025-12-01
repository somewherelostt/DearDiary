"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  {
    text: "Today was absolutely amazing!",
    mood: "from-yellow-300 via-orange-300 to-pink-300",
  },
  {
    text: "I feel so peaceful right now...",
    mood: "from-teal-200 via-emerald-200 to-green-300",
  },
  {
    text: "Everything feels overwhelming.",
    mood: "from-violet-300 via-purple-300 to-fuchsia-300",
  },
  {
    text: "I'm grateful for this moment.",
    mood: "from-teal-200 via-emerald-200 to-green-300",
  },
];

export function TypingSimulation() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const phrase = phrases[currentPhrase];

    if (isTyping && displayText.length < phrase.text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(phrase.text.slice(0, displayText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else if (isTyping && displayText.length === phrase.text.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (!isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setIsTyping(true);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, currentPhrase]);

  const currentMood = phrases[currentPhrase].mood;

  return (
    <motion.div
      className="relative p-8 rounded-xl border-2 border-black shadow-brutal overflow-hidden"
      animate={{
        background: `linear-gradient(to right, ${currentMood})`,
      }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative z-10">
        <div className="text-xs uppercase tracking-widest font-bold mb-4 opacity-70">
          Live Mood Detection
        </div>
        <div className="min-h-[80px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              className="text-2xl md:text-3xl font-bold text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {displayText}
              {isTyping &&
                displayText.length < phrases[currentPhrase].text.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                )}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Color bloom effect */}
      <motion.div
        className="absolute inset-0 opacity-30 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at center, ${currentMood}, transparent)`,
        }}
      />
    </motion.div>
  );
}
