"use client";

import { motion } from "framer-motion";

const emotions = ["JOY", "RAGE", "CALM", "GRIEF", "HOPE", "FEAR"];
const shapes = [
  { type: "star", icon: "★" },
  { type: "circle", icon: "●" },
  { type: "triangle", icon: "▲" },
];

export function EmotionMarquee() {
  // Create doubled array for seamless loop
  const items = [
    ...emotions,
    ...shapes.map((s) => s.icon),
    ...emotions,
    ...shapes.map((s) => s.icon),
  ];

  return (
    <div className="relative overflow-hidden border-y-[1.5px] border-[#1a1a1a] bg-white py-12">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, index) => {
          const isShape = ["★", "●", "▲"].includes(item);

          return (
            <motion.div
              key={`${item}-${index}`}
              className="inline-block"
              whileHover={{ scale: 1.1, rotate: isShape ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isShape ? (
                <div className="text-8xl font-black text-[#1a1a1a]">{item}</div>
              ) : (
                <div
                  className="text-8xl font-black uppercase tracking-tighter"
                  style={{
                    WebkitTextStroke: "2px #1a1a1a",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {item}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
