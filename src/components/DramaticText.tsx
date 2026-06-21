"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DramaticTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function DramaticText({
  text,
  className = "",
  delay = 0,
}: DramaticTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  return (
    <motion.div ref={ref} className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.1,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
