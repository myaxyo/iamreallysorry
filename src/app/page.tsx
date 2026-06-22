"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import DramaticText from "@/components/DramaticText";
import SorryMeter from "@/components/SorryMeter";
import RunawayButton from "@/components/RunawayButton";
import FloatingEmojis from "@/components/FloatingEmojis";
import { useSounds } from "@/components/useSounds";

// Dynamic import for Three.js (SSR breaks it)
const Heart3D = dynamic(() => import("@/components/Heart3D"), { ssr: false });

const apologyReasons = [
  {
    emoji: "🤡",
    title: "Я был клоуном",
    text: "Не смешным, а тем страшным, который портит детские праздники.",
  },
  {
    emoji: "🧠",
    title: "Мой мозг вышел из чата",
    text: "Он ушёл в отпуск и забыл меня предупредить. Ноль мыслей, одни плохие вайбы.",
  },
  {
    emoji: "🗑️",
    title: "Я вёл себя как мусор",
    text: "И даже не перерабатываемый. Прямиком-на-свалку поведение.",
  },
  {
    emoji: "💀",
    title: "Я знаю, что накосячил",
    text: "Если бы моё извинение было фильмом — это был бы сериал из 12 сезонов. С режиссёрскими версиями.",
  },
];

const promises = [
  "Я буду реально слушать, когда ты говоришь (а не просто кивать, думая о еде)",
  "Я запомню все важные даты (ставлю 47 напоминалок прямо сейчас)",
  "Я перестану делать то, что тебя бесит (ты знаешь, о чём я)",
  "Я отдам тебе пульт от телевизора без боя (ну почти)",
  "Я буду признавать свою неправоту быстрее (начинаю прямо сейчас: Я БЫЛ НЕПРАВ)",
];

export default function Home() {
  const { playLoop, stop } = useSounds();
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleMusic = () => {
    if (musicPlaying) {
      stop("sadViolin");
    } else {
      playLoop("sadViolin", 0.4);
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      <FloatingEmojis />

      {/* Music toggle */}
      <motion.button
        className="fixed top-4 right-4 z-50 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-300 hover:text-pink-400 hover:border-pink-500/50 transition-colors cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={toggleMusic}
      >
        {musicPlaying ? "🎵 Выкл. музыку" : "🎵 Вкл. грустную музыку"}
      </motion.button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center z-10"
        >
          <motion.p
            className="text-gray-400 text-base md:text-lg mb-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Официальное заявление для
          </motion.p>

          <motion.p
            className="text-3xl md:text-5xl font-bold text-pink-300 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Гули 💕
          </motion.p>

          <h1 className="text-5xl md:text-9xl font-black mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent">
              ПРОСТИ МЕНЯ
            </span>
          </h1>

          <motion.p
            className="text-xl md:text-3xl text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Реально, по-настоящему, от всей души прости 🥺
          </motion.p>
        </motion.div>

        <Heart3D />

        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-gray-500 text-sm">↓ Листай вниз (мне есть что сказать) ↓</p>
        </motion.div>
      </section>

      {/* Sorry Meter Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <DramaticText
          text="Давай измерим мою вину"
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />
        <SorryMeter />
        <motion.p
          className="text-gray-400 mt-8 text-center max-w-md px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3 }}
        >
          Учёные подтверждают: никто в истории не чувствовал себя настолько виноватым.
          <br />
          Шкала была к этому не готова.
        </motion.p>
      </section>

      {/* Reasons Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <DramaticText
          text="Я знаю что натворил"
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full">
          {apologyReasons.map((reason, i) => (
            <motion.div
              key={i}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 md:p-6 hover:border-pink-500/50 transition-colors"
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.02, rotate: 1 }}
            >
              <span className="text-3xl md:text-4xl mb-3 block">{reason.emoji}</span>
              <h3 className="text-lg md:text-xl font-bold text-pink-400 mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promises Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <DramaticText
          text="Мои торжественные обещания"
          className="text-2xl md:text-5xl font-bold text-white mb-4"
        />
        <motion.p
          className="text-gray-400 mb-8 md:mb-12 text-center text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          (Мизинчиком клянусь, крест на сердце, вот это всё)
        </motion.p>

        <div className="max-w-2xl w-full space-y-3 md:space-y-4">
          {promises.map((promise, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 md:gap-4 bg-gray-800/30 border border-gray-700/50 rounded-xl p-3 md:p-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <motion.span
                className="text-xl md:text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              >
                🤞
              </motion.span>
              <p className="text-gray-300 text-base md:text-lg">{promise}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Big Question */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <DramaticText
          text="А теперь момент истины..."
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />
        <RunawayButton />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-xs md:text-sm px-4">
        <p>Сделано из 100% чистого раскаяния и щепотки отчаяния</p>
        <p className="mt-2">© 2026 iamreallysorry.com — Все права защищены чувством вины</p>
      </footer>
    </main>
  );
}
