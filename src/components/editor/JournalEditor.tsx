"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { AmbientMoodGlow } from "./AmbientMoodGlow";
import { WritingTipsDrawer } from "./WritingTipsDrawer";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useDebounce } from "@/lib/hooks";
import { analyzeSentiment } from "@/lib/mood-analyzer";
import { MoodData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { saveEntry } from "@/lib/local-storage";

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
  const [showFooter, setShowFooter] = useState(false);

  const debouncedContent = useDebounce(content, 5000);

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

  // Auto-save functionality
  useEffect(() => {
    if (!content.trim() || !title.trim()) return;

    const autoSaveTimer = setTimeout(() => {
      setIsSaving(true);

      try {
        saveEntry({
          title: title.trim(),
          content: content.trim(),
          mood,
          wordCount,
        });

        setSaveSuccess(true);

        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    }, 3000); // Auto-save after 3 seconds of no typing

    return () => clearTimeout(autoSaveTimer);
  }, [title, content, mood, wordCount]);

  // Show/hide footer on mouse move
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowFooter(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowFooter(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Ambient Mood Glow */}
      <AmbientMoodGlow
        mood={mood}
        isAnalyzing={isAnalyzing}
        lastAnalyzed={lastAnalyzed}
      />

      {/* Main Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundColor: mood.color,
        }}
        transition={{
          backgroundColor: {
            duration: 3,
            ease: [0.4, 0, 0.2, 1],
          },
          opacity: {
            duration: 0.5,
          },
        }}
        className="min-h-screen ml-16 transition-all duration-300"
        style={{ backgroundColor: "#FDFCF8" }}
      >
        {/* Centered Content Area */}
        <div className="max-w-3xl mx-auto py-12 px-6">
          {/* Auto-save Indicator */}
          <AnimatePresence>
            {(isSaving || saveSuccess) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-neutral-200 flex items-center gap-2">
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="font-body text-sm font-medium text-neutral-700">
                        Saved
                      </span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-700 rounded-full"
                      />
                      <span className="font-body text-sm font-medium text-neutral-700">
                        Saving...
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title Input - Borderless */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Input
              type="text"
              placeholder="Untitled Entry"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-heading text-4xl font-medium border-none shadow-none focus-visible:ring-0 h-auto p-0 bg-transparent placeholder:text-neutral-300"
              style={{
                color: "#2D2D2D",
              }}
            />
          </motion.div>

          {/* Content Editor - The Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <textarea
              placeholder="How does this moment feel?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-serif w-full min-h-[70vh] resize-none text-lg leading-relaxed focus:outline-none bg-transparent placeholder:text-neutral-300 placeholder:italic"
              style={{
                color: "#2D2D2D",
                lineHeight: "1.8",
              }}
            />
          </motion.div>

          {/* Fade-in Footer with Word Count */}
          <AnimatePresence>
            {showFooter && (content.length > 0 || wordCount > 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-0 left-16 right-0 bg-gradient-to-t from-neutral-50/90 to-transparent backdrop-blur-sm py-4"
              >
                <div className="max-w-3xl mx-auto px-6">
                  <div className="flex items-center justify-between font-body text-sm text-neutral-500">
                    <span>
                      {wordCount} {wordCount === 1 ? "word" : "words"} ·{" "}
                      {charCount} {charCount === 1 ? "character" : "characters"}
                    </span>
                    {lastAnalyzed && (
                      <span className="text-xs">
                        Last analyzed: {lastAnalyzed.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Writing Tips Drawer */}
      <WritingTipsDrawer />
    </>
  );
}
