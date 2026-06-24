"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import DramaticText from "@/components/DramaticText";
import SorryMeterI18n from "@/components/SorryMeterI18n";
import RunawayButtonI18n from "@/components/RunawayButtonI18n";
import FloatingEmojis from "@/components/FloatingEmojis";
import { useSounds } from "@/components/useSounds";

const Heart3D = dynamic(() => import("@/components/Heart3D"), { ssr: false });

interface Dict {
  hero: { subtitle: string; nameLabel: string; namePlaceholder: string; heading: string; subtext: string; scrollHint: string };
  meter: { title: string; label: string; low: string; mid: string; high: string; error: string; footnote: string };
  reasons: { title: string; items: { emoji: string; title: string; text: string }[] };
  promises: { title: string; subtitle: string; items: string[] };
  forgive: { title: string; question: string; yes: string[]; no: string[]; hint: string; success: string; successSub: string };
  music: { on: string; off: string };
  footer: { madeWith: string; copyright: string };
  [key: string]: unknown;
}

interface Props {
  dict: Dict;
  name?: string;
  lang: string;
}

export default function ApologyExperience({ dict, name: initialName, lang }: Props) {
  const { playLoop, stop } = useSounds();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [personName, setPersonName] = useState(initialName || "");
  const [started, setStarted] = useState(!!initialName);

  const toggleMusic = () => {
    if (musicPlaying) {
      stop("sadViolin");
    } else {
      playLoop("sadViolin", 0.4);
    }
    setMusicPlaying(!musicPlaying);
  };

  // Name entry screen
  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent">
              {dict.hero.heading}
            </span>
          </h1>
          <p className="text-gray-400 mb-8 text-lg">{dict.hero.subtitle}</p>

          <div className="space-y-4">
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder={dict.hero.namePlaceholder}
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && personName.trim()) setStarted(true);
              }}
              autoFocus
            />
            <motion.button
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!personName.trim()}
              onClick={() => {
                if (personName.trim()) {
                  // Update URL with name param for shareability
                  const url = new URL(window.location.href);
                  url.searchParams.set("name", personName.trim());
                  window.history.replaceState({}, "", url.toString());
                  setStarted(true);
                }
              }}
            >
              →
            </motion.button>
          </div>
        </motion.div>
      </main>
    );
  }

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
        {musicPlaying ? dict.music.off : dict.music.on}
      </motion.button>

      {/* Language switcher */}
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <select
          className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-3 py-2 text-sm text-gray-300 cursor-pointer focus:outline-none focus:border-pink-500"
          value={lang}
          onChange={(e) => {
            const newLang = e.target.value;
            const url = new URL(window.location.href);
            url.pathname = `/${newLang}`;
            window.location.href = url.toString();
          }}
        >
          <option value="en">🇬🇧 English</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="es">🇪🇸 Español</option>
          <option value="pt">🇧🇷 Português</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="hi">🇮🇳 हिंदी</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
        </select>
      </motion.div>

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
            {dict.hero.subtitle}
          </motion.p>

          {personName && (
            <motion.p
              className="text-3xl md:text-5xl font-bold text-pink-300 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {personName} 💕
            </motion.p>
          )}

          <h1 className="text-5xl md:text-9xl font-black mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent">
              {dict.hero.heading}
            </span>
          </h1>

          <motion.p
            className="text-xl md:text-3xl text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {dict.hero.subtext} 🥺
          </motion.p>
        </motion.div>

        <Heart3D />

        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-gray-500 text-sm">↓ {dict.hero.scrollHint} ↓</p>
        </motion.div>
      </section>

      {/* Sorry Meter Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <DramaticText
          text={dict.meter.title}
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />
        <SorryMeterI18n dict={dict.meter} />
        <motion.p
          className="text-gray-400 mt-8 text-center max-w-md px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3 }}
        >
          {dict.meter.footnote}
        </motion.p>
      </section>

      {/* Reasons Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <DramaticText
          text={dict.reasons.title}
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full">
          {dict.reasons.items.map((reason, i) => (
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
          text={dict.promises.title}
          className="text-2xl md:text-5xl font-bold text-white mb-4"
        />
        <motion.p
          className="text-gray-400 mb-8 md:mb-12 text-center text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {dict.promises.subtitle}
        </motion.p>

        <div className="max-w-2xl w-full space-y-3 md:space-y-4">
          {dict.promises.items.map((promise, i) => (
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
          text={dict.forgive.title}
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />
        <RunawayButtonI18n dict={dict.forgive} name={personName} />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-xs md:text-sm px-4">
        <p>{dict.footer.madeWith}</p>
        <p className="mt-2">{dict.footer.copyright}</p>
      </footer>
    </main>
  );
}
