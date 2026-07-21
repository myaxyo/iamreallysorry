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
      {/* Progress bar — visible during steps 1-5 */}
      {step >= 1 && step <= totalSteps && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

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

            {/* Share buttons */}
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(generatedLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ url: generatedLink, title: "I'm sorry!" });
                  } else {
                    handleCopy();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                Share
              </button>
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
