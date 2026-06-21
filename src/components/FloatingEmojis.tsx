"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingEmojis() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    setHeight(window.innerHeight);

    const emojiList = ["💕", "🌹", "💖", "✨", "💗", "🥺", "💝", "🦋", "💐", "🌸"];
    // Fewer emojis on mobile for performance
    const count = window.innerWidth < 768 ? 8 : 15;
    const generated: Emoji[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      size: window.innerWidth < 768 ? 1.2 + Math.random() * 1 : 1.5 + Math.random() * 2,
    }));
    setEmojis(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute bottom-0"
          style={{
            left: `${emoji.x}%`,
            fontSize: `${emoji.size}rem`,
          }}
          animate={{
            y: [0, -(height + 100)],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: emoji.duration,
            delay: emoji.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}
    </div>
  );
}
