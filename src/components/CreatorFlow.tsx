"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "pt", flag: "🇧🇷", name: "Português" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
  { code: "hi", flag: "🇮🇳", name: "हिंदी" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
  { code: "ko", flag: "🇰🇷", name: "한국어" },
];

// Order + emojis are fixed; labels/reactions come from the dictionary.
const SCENARIO_ORDER = [
  { emoji: "😤", value: "forgot" },
  { emoji: "🤡", value: "stupid" },
  { emoji: "📱", value: "distant" },
  { emoji: "😡", value: "argument" },
  { emoji: "💔", value: "promise" },
  { emoji: "🙊", value: "rude" },
  { emoji: "🤥", value: "lied" },
  { emoji: "👻", value: "ghosted" },
  { emoji: "🤷", value: "unknown" },
  { emoji: "☠️", value: "everything" },
];

const RELATIONSHIP_ORDER = [
  { emoji: "💕", value: "partner" },
  { emoji: "👫", value: "friend" },
  { emoji: "👨‍👩‍👧", value: "family" },
  { emoji: "💼", value: "work" },
  { emoji: "🏠", value: "roommate" },
  { emoji: "🤷", value: "other" },
];

const TONE_ORDER = [
  { emoji: "😂", value: "funny" },
  { emoji: "🥺", value: "sincere" },
  { emoji: "💀", value: "meme" },
];

interface CreatorDict {
  introOhNo: string;
  introMessedUp: string;
  introDontWorry: string;
  introCta: string;
  step: string;
  of: string;
  next: string;
  scenarioTitle: string;
  scenarioSubtitle: string;
  scenarios: Record<string, { label: string; reaction: string }>;
  relationshipTitle: string;
  relationshipSubtitle: string;
  relationships: Record<string, string>;
  toneTitle: string;
  toneSubtitle: string;
  tones: Record<string, string>;
  nameTitle: string;
  nameSubtitle: string;
  namePlaceholder: string;
  nameConfirm: string;
  langTitle: string;
  langSubtitle: string;
  generate: string;
  resultTitle: string;
  resultSubtitle: string;
  copy: string;
  copied: string;
  preview: string;
  proTipsLabel: string;
  proTips: string[];
  makeAnother: string;
}

interface Props {
  lang: string;
  dict: CreatorDict;
}

export default function CreatorFlow({ lang, dict }: Props) {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState("");
  const [relationship, setRelationship] = useState("");
  const [tone, setTone] = useState("funny");
  const [name, setName] = useState("");
  const [selectedLang, setSelectedLang] = useState(lang);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const totalSteps = 5;
  const fill = (s: string) => s.replace("{name}", name.trim());
  const stepLabel = (n: number) => `${dict.step} ${n} ${dict.of} ${totalSteps}`;

  const handleGenerate = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${baseUrl}/${selectedLang}?name=${encodeURIComponent(name.trim())}`;
    setGeneratedLink(link);
    setStep(totalSteps + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center justify-center px-4 py-12">
      <AnimatePresence mode="wait">
        {/* Step 0: Intro */}
        {step === 0 && (
          <motion.div
            key="intro"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
            >
              😬
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent">
                {dict.introOhNo}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">{dict.introMessedUp}</p>
            <p className="text-gray-500 mb-8">{dict.introDontWorry}</p>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
            >
              {dict.introCta}
            </motion.button>
          </motion.div>
        )}

        {/* Step 1: What did you do? */}
        {step === 1 && (
          <motion.div
            key="scenario"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">{stepLabel(1)}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {dict.scenarioTitle}
            </h2>
            <p className="text-gray-400 mb-8">{dict.scenarioSubtitle}</p>

            <div className="grid grid-cols-1 gap-3">
              {SCENARIO_ORDER.map((s) => (
                <motion.button
                  key={s.value}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-left cursor-pointer transition-colors ${
                    scenario === s.value
                      ? "bg-pink-500/20 border-pink-500 text-white"
                      : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScenario(s.value)}
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-base md:text-lg">{dict.scenarios[s.value]?.label}</span>
                </motion.button>
              ))}
            </div>

            {scenario && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <p className="text-pink-400 italic mb-4">
                  {dict.scenarios[scenario]?.reaction}
                </p>
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                >
                  {dict.next}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 2: Who is it for? */}
        {step === 2 && (
          <motion.div
            key="relationship"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">{stepLabel(2)}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {dict.relationshipTitle}
            </h2>
            <p className="text-gray-400 mb-8">{dict.relationshipSubtitle}</p>

            <div className="grid grid-cols-2 gap-3">
              {RELATIONSHIP_ORDER.map((r) => (
                <motion.button
                  key={r.value}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border cursor-pointer transition-colors ${
                    relationship === r.value
                      ? "bg-pink-500/20 border-pink-500 text-white"
                      : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRelationship(r.value)}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-sm md:text-base">{dict.relationships[r.value]}</span>
                </motion.button>
              ))}
            </div>

            {relationship && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(3)}
                >
                  {dict.next}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 3: Tone */}
        {step === 3 && (
          <motion.div
            key="tone"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">{stepLabel(3)}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {dict.toneTitle}
            </h2>
            <p className="text-gray-400 mb-8">{dict.toneSubtitle}</p>

            <div className="grid grid-cols-1 gap-3">
              {TONE_ORDER.map((t) => (
                <motion.button
                  key={t.value}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-left cursor-pointer transition-colors ${
                    tone === t.value
                      ? "bg-pink-500/20 border-pink-500 text-white"
                      : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTone(t.value)}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="text-base md:text-lg">{dict.tones[t.value]}</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(4)}
              >
                {dict.next}
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 4: Name */}
        {step === 4 && (
          <motion.div
            key="who"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">{stepLabel(4)}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {dict.nameTitle}
            </h2>
            <p className="text-gray-400 mb-8">{dict.nameSubtitle}</p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={dict.namePlaceholder}
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors mb-6"
              autoFocus
            />

            {name.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-400 mb-4 italic">
                  {fill(dict.nameConfirm)}
                </p>
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(5)}
                >
                  {dict.next}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 5: Language */}
        {step === 5 && (
          <motion.div
            key="language"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">{stepLabel(5)}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {fill(dict.langTitle)}
            </h2>
            <p className="text-gray-400 mb-8">
              {dict.langSubtitle}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {LANGUAGES.map((l) => (
                <motion.button
                  key={l.code}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors text-sm md:text-base ${
                    selectedLang === l.code
                      ? "bg-pink-500/20 border-pink-500 text-white"
                      : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedLang(l.code)}
                >
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
            >
              {dict.generate}
            </motion.button>
          </motion.div>
        )}

        {/* Step 6: Generated link */}
        {step === totalSteps + 1 && (
          <motion.div
            key="result"
            className="text-center max-w-lg w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎉
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white">
              {dict.resultTitle}
            </h2>
            <p className="text-gray-400 mb-6">
              {fill(dict.resultSubtitle)}
            </p>

            {/* Link display */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4 break-all">
              <p className="text-pink-400 text-sm md:text-base font-mono">
                {generatedLink}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
              >
                {copied ? dict.copied : dict.copy}
              </motion.button>

              <motion.a
                href={generatedLink}
                target="_blank"
                className="px-6 py-3 bg-gray-700 text-white font-bold rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dict.preview}
              </motion.a>
            </div>

            <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <p className="text-gray-400 text-sm">
                💡 <strong className="text-gray-300">{dict.proTipsLabel}</strong>
              </p>
              <ul className="text-gray-500 text-sm mt-2 space-y-1 text-left">
                {dict.proTips.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>

            <motion.button
              className="mt-6 text-gray-500 text-sm underline cursor-pointer hover:text-gray-300"
              onClick={() => {
                setStep(0);
                setScenario("");
                setRelationship("");
                setTone("funny");
                setName("");
                setGeneratedLink("");
              }}
            >
              {dict.makeAnother}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
