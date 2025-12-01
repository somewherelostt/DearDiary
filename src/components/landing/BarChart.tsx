"use client";

import { motion } from "framer-motion";

const chartData = [
  { label: "Mon", value: 65, color: "from-yellow-300 to-orange-400" },
  { label: "Tue", value: 85, color: "from-teal-300 to-emerald-400" },
  { label: "Wed", value: 45, color: "from-violet-300 to-purple-400" },
  { label: "Thu", value: 90, color: "from-pink-300 to-rose-400" },
  { label: "Fri", value: 70, color: "from-blue-300 to-indigo-400" },
  { label: "Sat", value: 55, color: "from-green-300 to-teal-400" },
  { label: "Sun", value: 80, color: "from-orange-300 to-red-400" },
];

export function BarChart() {
  return (
    <div className="relative h-full min-h-[400px] p-8 bg-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a] flex flex-col">
      <div className="text-xs uppercase tracking-widest font-bold mb-2 opacity-60">
        Insights
      </div>
      <h3 className="text-3xl font-black mb-6">Emotional Trends</h3>

      {/* Chart Container */}
      <div className="flex-1 flex items-end justify-between gap-2 pb-8">
        {chartData.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex-1 flex flex-col items-center gap-2"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "auto", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: index * 0.1,
            }}
          >
            <motion.div
              className={`w-full bg-gradient-to-t ${item.color} border-[1.5px] border-[#1a1a1a] rounded-t-lg relative overflow-hidden`}
              style={{ height: `${item.value}%` }}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "3px 3px 0px 0px #1a1a1a",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Value indicator */}
              <motion.div
                className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-[#1a1a1a] bg-white/80 px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {item.value}%
              </motion.div>
            </motion.div>
            <span className="text-xs font-bold text-[#1a1a1a]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom grid line */}
      <div className="absolute bottom-16 left-8 right-8 border-b-[1.5px] border-[#1a1a1a] opacity-20" />
    </div>
  );
}
