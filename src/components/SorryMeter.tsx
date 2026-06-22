"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useSounds } from "./useSounds";

export default function SorryMeter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [percentage, setPercentage] = useState(0);
  const { play } = useSounds();
  const boomPlayed = useRef(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        // Animate to beyond 100%
        let current = 0;
        const interval = setInterval(() => {
          current += 2;
          if (current >= 147) {
            clearInterval(interval);
            setPercentage(147);
          } else {
            setPercentage(current);
          }
          // Play vine boom when it crosses 100
          if (current >= 100 && !boomPlayed.current) {
            boomPlayed.current = true;
            play("vineBoom");
          }
        }, 20);
        return () => clearInterval(interval);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, play]);

  return (
    <div ref={ref} className="w-full max-w-lg mx-auto">
      <div className="text-center mb-4">
        <p className="text-lg md:text-xl text-gray-300 font-medium">Насколько мне стыдно:</p>
      </div>

      {/* Meter container */}
      <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #fbbf24, #f59e0b, #ef4444, #dc2626, #9333ea, #ec4899)",
            width: `${Math.min(percentage, 100)}%`,
          }}
          initial={{ width: 0 }}
        />
        {/* Overflow effect - meter breaking */}
        {percentage > 100 && (
          <motion.div
            className="absolute top-0 right-0 h-full bg-gradient-to-r from-pink-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: "0 0 20px #ec4899, 0 0 40px #9333ea",
            }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-400">
        <span>Немного</span>
        <span>Очень</span>
        <span>Безумно</span>
      </div>

      {/* Percentage display */}
      <motion.div
        className="text-center mt-6"
        animate={percentage > 100 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        <span className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {percentage}%
        </span>
        {percentage > 100 && (
          <motion.p
            className="text-pink-400 mt-2 text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ОШИБКА: Уровень вины превышает максимальную ёмкость
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
