"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

const writingTips = [
  {
    title: "Write Freely",
    description:
      "Don't judge your thoughts. Let them flow naturally onto the page.",
    icon: "✍️",
  },
  {
    title: "Be Honest",
    description:
      "Express your true feelings. This is your safe, private space.",
    icon: "💭",
  },
  {
    title: "AI-Powered Insights",
    description:
      "Our AI automatically detects your mood and emotional patterns.",
    icon: "🤖",
  },
  {
    title: "Consistency Matters",
    description:
      "Regular journaling helps you understand yourself better over time.",
    icon: "📅",
  },
  {
    title: "Privacy First",
    description:
      "Your entries are stored locally and remain completely private.",
    icon: "🔒",
  },
];

export function WritingTipsDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Lightbulb Icon */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center border-2 border-neutral-900 hover:bg-yellow-300 transition-colors"
        aria-label="Writing Tips"
      >
        <Lightbulb className="w-6 h-6 text-neutral-900" strokeWidth={2} />
      </motion.button>

      {/* Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white border-l border-neutral-200 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-bold text-neutral-900">
                    Writing Tips
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>

              {/* Tips Content */}
              <div className="p-6 space-y-6">
                {writingTips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Additional Context */}
                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    💡 <strong>Pro Tip:</strong> Your mood is analyzed in
                    real-time using advanced AI. The background color subtly
                    shifts to reflect your emotional state as you write.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
