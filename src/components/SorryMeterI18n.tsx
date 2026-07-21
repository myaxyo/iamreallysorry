"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useSounds } from "./useSounds";

interface Props {
  dict: {
    label: string;
    low: string;
    mid: string;
    high: string;
    error: string;
  };
}

export default function SorryMeterI18n({ dict }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [percentage, setPercentage] = useState(0);
  const { play } = useSounds();
  const boomPlayed = useRef(false);
  const rafRef = useRef<number>(0);
  const startTime = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      // 20ms per 2% = ~1470ms total to reach 147%
      const current = Math.min(Math.floor(elapsed / 10), 147);
      setPercentage(current);

      if (current >= 100 && !boomPlayed.current) {
        boomPlayed.current = true;
        play("vineBoom");
      }

      if (current < 147) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [play]
  );

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        rafRef.current = requestAnimationFrame(animate);
      }, 300);
      return () => {
        clearTimeout(timer);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [isInView, animate]);

  return (
    <div ref={ref} className="w-full max-w-lg mx-auto" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={147} aria-label={dict.label}>
      <div className="text-center mb-4">
        <p className="text-lg md:text-xl text-gray-300 font-medium">{dict.label}</p>
      </div>

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
        {percentage > 100 && (
          <motion.div
            className="absolute top-0 right-0 h-full bg-gradient-to-r from-pink-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: "0 0 20px #ec4899, 0 0 40px #9333ea" }}
          />
        )}
      </div>

      <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-400">
        <span>{dict.low}</span>
        <span>{dict.mid}</span>
        <span>{dict.high}</span>
      </div>

      <motion.div
        className="text-center mt-6"
        animate={percentage > 100 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        <span className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent" aria-live="polite">
          {percentage}%
        </span>
        {percentage > 100 && (
          <motion.p
            className="text-pink-400 mt-2 text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            role="alert"
          >
            {dict.error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
