"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoodIndicator } from "./MoodIndicator";
import { useDebounce } from "@/lib/hooks";
import { analyzeSentiment } from "@/lib/mood-analyzer";
import { MoodData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, Check } from "lucide-react";
import { saveEntry } from "@/lib/local-storage";
import Link from "next/link";

const DEFAULT_MOOD: MoodData = {
  score: 0,
  intensity: 0,
  label: "neutral",
  color: "#D3D3D3",
  keywords: [],
};

export function JournalEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<MoodData>(DEFAULT_MOOD);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastAnalyzed, setLastAnalyzed] = useState<Date | null>(null);

  const debouncedContent = useDebounce(content, 5000); // Check every 5 seconds

  // Analyze mood when content changes
  useEffect(() => {
    if (debouncedContent.trim().length > 10) {
      setIsAnalyzing(true);
      analyzeSentiment(debouncedContent)
        .then((result) => {
          setMood(result);
          setLastAnalyzed(new Date());
        })
        .finally(() => setIsAnalyzing(false));
    } else {
      setMood(DEFAULT_MOOD);
      setLastAnalyzed(null);
    }
  }, [debouncedContent]);

  // Update word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(content.length);
  }, [content]);

  const handleSave = async () => {
    if (!content.trim() || !title.trim()) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Save to localStorage
      saveEntry({
        title: title.trim(),
        content: content.trim(),
        mood,
        wordCount,
      });

      setSaveSuccess(true);

      // Clear form after successful save
      setTimeout(() => {
        setTitle("");
        setContent("");
        setMood(DEFAULT_MOOD);
        setLastAnalyzed(null);
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to save entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        backgroundColor: mood.color,
      }}
      transition={{
        backgroundColor: {
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1],
        },
        opacity: {
          duration: 0.3,
        },
      }}
      className="min-h-screen p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
              Dear<span className="text-white">Diary</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm sm:text-base font-bold bg-white/90 px-3 sm:px-4 py-2 rounded-sm border-2 border-black shadow-neo">
                {wordCount} words
              </span>
              <span className="text-sm sm:text-base font-bold bg-white/90 px-3 sm:px-4 py-2 rounded-sm border-2 border-black shadow-neo">
                {charCount} chars
              </span>
              <Button
                onClick={handleSave}
                disabled={isSaving || !content.trim() || !title.trim()}
                variant="default"
                size="default"
                className="w-full sm:w-auto"
              >
                {saveSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saved!
                  </>
                ) : isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Entry
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mood Indicator */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <MoodIndicator
            mood={mood}
            isAnalyzing={isAnalyzing}
            lastAnalyzed={lastAnalyzed}
          />
        </motion.div>

        {/* Editor Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-4 border-black rounded-sm shadow-neo-lg"
        >
          {/* Title Input */}
          <div className="p-4 sm:p-6 border-b-4 border-black">
            <Input
              type="text"
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl sm:text-2xl md:text-3xl font-black border-none shadow-none focus-visible:ring-0 h-auto p-0"
            />
          </div>

          {/* Content Textarea */}
          <div className="p-4 sm:p-6 md:p-8">
            <textarea
              placeholder="Start writing your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] resize-none text-base sm:text-lg font-medium focus:outline-none placeholder:text-gray-400"
              style={{
                fontFamily: "var(--font-geist-sans)",
              }}
            />
          </div>

          {/* Footer with writing tips */}
          <AnimatePresence>
            {content.length === 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t-4 border-black p-4 sm:p-6 bg-yellow/10"
              >
                <p className="text-sm sm:text-base font-bold mb-2">
                  💡 Writing Tips:
                </p>
                <ul className="text-xs sm:text-sm font-medium space-y-1 list-disc list-inside">
                  <li>Write freely without judgment</li>
                  <li>Express your true feelings</li>
                  <li>The AI will detect your mood automatically</li>
                  <li>Your entries are private and secure</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Actions (Mobile-friendly) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          <Link href="/analytics">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-3 sm:p-4 bg-white border-3 border-black rounded-sm shadow-neo hover:shadow-neo-md transition-all text-center"
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📊</div>
              <div className="text-xs sm:text-sm font-bold">View Analytics</div>
            </motion.button>
          </Link>

          {[
            { emoji: "🔍", label: "Search Entries", disabled: true },
            { emoji: "⚙️", label: "Settings", disabled: true },
            { emoji: "❓", label: "Help", disabled: true },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: action.disabled ? 1 : 1.05 }}
              whileTap={{ scale: action.disabled ? 1 : 0.95 }}
              className="p-3 sm:p-4 bg-white border-3 border-black rounded-sm shadow-neo hover:shadow-neo-md transition-all text-center opacity-50 cursor-not-allowed"
              disabled={action.disabled}
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                {action.emoji}
              </div>
              <div className="text-xs sm:text-sm font-bold">{action.label}</div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
