"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js 16",
  "TypeScript",
  "Sanity CMS",
  "Groq AI",
  "GROQ Queries",
  "Zustand",
  "Tailwind CSS",
  "Framer Motion",
  "Neobrutalism",
  "Lucide React",
];

export function TechStackMarquee() {
  // Duplicate the array for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden py-12 border-y-2 border-black">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [0, -50 + "%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTech.map((tech, index) => (
          <motion.div
            key={`${tech}-${index}`}
            className="flex items-center gap-4 px-6 py-3 border-2 border-black rounded-lg bg-white shadow-brutal"
            whileHover={{
              scale: 1.05,
              opacity: 1,
              boxShadow: "6px 6px 0px 0px #000000",
            }}
            initial={{ opacity: 0.7 }}
          >
            <span className="font-bold text-lg tracking-tight">{tech}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
