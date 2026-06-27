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

const SCENARIOS = [
  { emoji: "😤", label: "Forgot something important", value: "forgot" },
  { emoji: "🤡", label: "Said something stupid", value: "stupid" },
  { emoji: "📱", label: "Was being distant / ignored them", value: "distant" },
  { emoji: "😡", label: "Started a dumb argument", value: "argument" },
  { emoji: "💔", label: "Broke a promise", value: "promise" },
  { emoji: "🙊", label: "Was rude or insensitive", value: "rude" },
  { emoji: "🤥", label: "Lied or broke their trust", value: "lied" },
  { emoji: "👻", label: "Ghosted / disappeared on them", value: "ghosted" },
  { emoji: "🤷", label: "I don't even know tbh", value: "unknown" },
  { emoji: "☠️", label: "Everything. All of it.", value: "everything" },
];

const CREATOR_REACTIONS: Record<string, string> = {
  forgot: "Classic move. Forgetting stuff is an art form for you at this point 💀",
  stupid: "Yeah that tracks. Words are hard sometimes, huh? 😂",
  distant: "Phone addiction? Emotional unavailability? Both? Say no more 📱",
  argument: "Was it about something dumb? (it was about something dumb) 🙄",
  promise: "Oof. Broken promises hit different. Good thing you're here though 🩹",
  rude: "Words hurt, and you know it. Let's make this right 🫣",
  lied: "Trust is fragile. But showing up here means something 🫡",
  ghosted: "Disappearing act? Time to reappear with a bang 👻➡️🎭",
  unknown: "You don't know?? That's somehow worse 😭 But we'll fix it",
  everything: "DOWN BAD. We got work to do. Let's make this apology legendary 🫡",
};

const RELATIONSHIPS = [
  { emoji: "💕", label: "Partner / SO", value: "partner" },
  { emoji: "👫", label: "Friend", value: "friend" },
  { emoji: "👨‍👩‍👧", label: "Family member", value: "family" },
  { emoji: "💼", label: "Coworker / Boss", value: "work" },
  { emoji: "🏠", label: "Roommate / Neighbor", value: "roommate" },
  { emoji: "🤷", label: "Other", value: "other" },
];

const TONES = [
  { emoji: "😂", label: "Funny & over-the-top", value: "funny" },
  { emoji: "🥺", label: "Sincere & heartfelt", value: "sincere" },
  { emoji: "💀", label: "Self-deprecating meme", value: "meme" },
];

interface Props {
  lang: string;
}

export default function CreatorFlow({ lang }: Props) {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState("");
  const [relationship, setRelationship] = useState("");
  const [tone, setTone] = useState("funny");
  const [name, setName] = useState("");
  const [selectedLang, setSelectedLang] = useState(lang);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const totalSteps = 5;

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
                Oh no.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">You messed up, didn&apos;t you?</p>
            <p className="text-gray-500 mb-8">Don&apos;t worry. We&apos;ve all been there. Let&apos;s fix this.</p>
            
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
            >
              Help me apologize 🙏
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
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Step 1 of {totalSteps}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Alright, what did you do this time? 💀
            </h2>
            <p className="text-gray-400 mb-8">Be honest. We don&apos;t judge here.</p>

            <div className="grid grid-cols-1 gap-3">
              {SCENARIOS.map((s) => (
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
                  <span className="text-base md:text-lg">{s.label}</span>
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
                  {CREATOR_REACTIONS[scenario]}
                </p>
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                >
                  Next →
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
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Step 2 of {totalSteps}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Who do you owe this apology to? 🎯
            </h2>
            <p className="text-gray-400 mb-8">What&apos;s your relationship with them?</p>

            <div className="grid grid-cols-2 gap-3">
              {RELATIONSHIPS.map((r) => (
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
                  <span className="text-sm md:text-base">{r.label}</span>
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
                  Next →
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
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Step 3 of {totalSteps}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              What vibe are we going for? 🎭
            </h2>
            <p className="text-gray-400 mb-8">Pick the tone of your apology.</p>

            <div className="grid grid-cols-1 gap-3">
              {TONES.map((t) => (
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
                  <span className="text-base md:text-lg">{t.label}</span>
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
                Next →
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
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Step 4 of {totalSteps}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Who&apos;s the victim of your crimes? 🕵️
            </h2>
            <p className="text-gray-400 mb-8">Name of the person you need to apologize to.</p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Their name..."
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors mb-6"
              autoFocus
            />

            {name.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-400 mb-4 italic">
                  Alright, {name.trim()} is about to get the most dramatic apology of their life 🎭
                </p>
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(5)}
                >
                  Next →
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
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">Step 5 of {totalSteps}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              What language does {name.trim()} speak? 🌍
            </h2>
            <p className="text-gray-400 mb-8">
              The apology will be in this language. Choose wisely.
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
              Generate my apology 🚀
            </motion.button>
          </motion.div>
        )}

        {/* Step 6: Generated link */}
        {step === (totalSteps + 1) && (
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
              Your apology is ready!
            </h2>
            <p className="text-gray-400 mb-6">
              Send this link to {name.trim()}. The rest is up to fate (and their sense of humor).
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
                {copied ? "✓ Copied!" : "📋 Copy Link"}
              </motion.button>

              <motion.a
                href={generatedLink}
                target="_blank"
                className="px-6 py-3 bg-gray-700 text-white font-bold rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👀 Preview
              </motion.a>
            </div>

            <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <p className="text-gray-400 text-sm">
                💡 <strong className="text-gray-300">Pro tips:</strong>
              </p>
              <ul className="text-gray-500 text-sm mt-2 space-y-1 text-left">
                <li>• Send it at the right moment (not in the middle of an argument 😅)</li>
                <li>• Works best if they open it on their phone</li>
                <li>• The No button is literally impossible to click — you&apos;re welcome</li>
                <li>• Tell them to turn up the volume for maximum dramatic effect 🎻</li>
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
              Make another apology (how many people did you upset?? 😂)
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
