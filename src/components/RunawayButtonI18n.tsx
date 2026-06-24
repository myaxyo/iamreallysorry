"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useSounds } from "./useSounds";

interface Props {
  dict: {
    question: string;
    yes: string[];
    no: string[];
    hint: string;
    success: string;
    successSub: string;
  };
  name?: string;
}

export default function RunawayButtonI18n({ dict, name }: Props) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [forgiven, setForgiven] = useState(false);
  const [noSize, setNoSize] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { play, stop } = useSounds();

  const handleNoHover = useCallback(() => {
    play("bruh");
    const maxX = containerRef.current
      ? containerRef.current.offsetWidth / 2 - 60
      : 120;
    const maxY = 100;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoPosition({ x: newX, y: newY });
    setNoAttempts((prev) => Math.min(prev + 1, dict.no.length - 1));
    setNoSize((prev) => Math.max(prev * 0.85, 0.3));
  }, [dict.no.length, play]);

  const handleYes = () => {
    setForgiven(true);
    play("airhorn");
    stop("sadViolin");

    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff1744", "#ff6b9d", "#ff9100", "#ffd600", "#aa00ff"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff1744", "#ff6b9d", "#ff9100", "#ffd600", "#aa00ff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
      colors: ["#ff1744", "#ff6b9d", "#ff9100", "#ffd600", "#aa00ff", "#00e676"],
    });
  };

  if (forgiven) {
    return (
      <motion.div
        className="text-center py-10 md:py-16 px-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <motion.div
          className="text-6xl md:text-8xl mb-6"
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          🥰
        </motion.div>
        <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
          {name ? `${name}, ` : ""}{dict.success}
        </h2>
        <motion.p
          className="text-lg md:text-xl text-pink-300"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {dict.successSub}
        </motion.p>
        <motion.div
          className="mt-8 text-5xl md:text-6xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ❤️
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center gap-6 md:gap-8 py-8 min-h-[300px] w-full overflow-hidden"
    >
      <p className="text-xl md:text-2xl text-gray-300 mb-4 text-center px-4">
        {dict.question} 🥺
      </p>

      <div className="flex gap-4 md:gap-8 items-center relative min-h-[120px]">
        <motion.button
          className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 cursor-pointer text-sm md:text-base"
          animate={{ scale: 1 + noAttempts * 0.12 }}
          whileHover={{ scale: 1.1 + noAttempts * 0.12 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYes}
        >
          {dict.yes[Math.min(noAttempts, dict.yes.length - 1)]}
        </motion.button>

        <motion.button
          className="px-6 md:px-8 py-3 md:py-4 bg-gray-700 text-gray-300 font-bold rounded-xl cursor-pointer text-sm md:text-base whitespace-nowrap"
          animate={{ x: noPosition.x, y: noPosition.y, scale: noSize }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          onClick={handleNoHover}
        >
          {dict.no[noAttempts]}
        </motion.button>
      </div>

      {noAttempts > 3 && (
        <motion.p
          className="text-pink-400 text-xs md:text-sm italic text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {dict.hint}
        </motion.p>
      )}
    </div>
  );
}
