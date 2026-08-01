"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DramaticText from "@/components/DramaticText";
import SorryMeterI18n from "@/components/SorryMeterI18n";
import RunawayButtonI18n from "@/components/RunawayButtonI18n";
import FloatingEmojis from "@/components/FloatingEmojis";
import { useSounds } from "@/components/useSounds";

const Heart3D = dynamic(() => import("@/components/Heart3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center">
      <div className="text-6xl animate-pulse">❤️</div>
    </div>
  ),
});

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
  isReceiver?: boolean;
  scenario?: string;
  relationship?: string;
  tone?: string;
}

// Scenario-specific subtext shown in the hero section
const SCENARIO_SUBTEXT: Record<string, Record<string, string>> = {
  en: {
    forgot: "I forgot something that mattered to you, and I hate myself for it",
    stupid: "I said something I didn't mean, and I wish I could take it back",
    distant: "I was distant when you needed me close, and I see that now",
    argument: "I started a fight over nothing, and you didn't deserve that",
    promise: "I broke a promise I made to you, and I know how that feels",
    rude: "I was rude and insensitive, and you deserved so much better",
    lied: "I broke your trust, and I know how hard that is to rebuild",
    ghosted: "I disappeared when I should have been there for you",
    unknown: "I don't fully know what I did, but I know I hurt you",
    everything: "I messed up in every possible way, and I own all of it",
  },
  ru: {
    forgot: "Я забыл кое-что важное для тебя, и ненавижу себя за это",
    stupid: "Я сказал то, что не имел в виду, и хочу забрать свои слова обратно",
    distant: "Я был далеко, когда ты нуждалась во мне рядом",
    argument: "Я начал ссору из-за ерунды, ты этого не заслуживала",
    promise: "Я нарушил обещание, и я знаю как это больно",
    rude: "Я был грубым и бестактным, ты заслуживаешь лучшего",
    lied: "Я подорвал твоё доверие, и знаю как сложно его восстановить",
    ghosted: "Я исчез, когда должен был быть рядом",
    unknown: "Я не до конца понимаю что сделал, но знаю что обидел тебя",
    everything: "Я накосячил во всём, и беру ответственность за всё",
  },
};

// Relationship-specific question text for the forgiveness section
const RELATIONSHIP_QUESTION: Record<string, Record<string, string>> = {
  en: {
    partner: "So... do you forgive your idiot partner?",
    friend: "So... are we still friends?",
    family: "So... can we be family again without the awkwardness?",
    work: "So... can we go back to being professional?",
    roommate: "So... can we coexist peacefully again?",
    other: "So... do you forgive me?",
  },
  ru: {
    partner: "Ну что... простишь своего идиота?",
    friend: "Ну что... мы ещё друзья?",
    family: "Ну что... можем быть семьёй без этой неловкости?",
    work: "Ну что... вернёмся к нормальным рабочим отношениям?",
    roommate: "Ну что... можем снова мирно сосуществовать?",
    other: "Ну что... простишь меня?",
  },
};

// Relationship-specific promises — override the default romantic ones
const RELATIONSHIP_PROMISES: Record<string, Record<string, string[]>> = {
  en: {
    partner: [
      "I'll actually listen when you're talking (not just nod while thinking about food)",
      "I'll remember the important dates (setting 47 reminders as we speak)",
      "I'll stop doing that thing that annoys you (you know the one)",
      "I'll give you the TV remote without a fight (most of the time)",
      "I'll admit I'm wrong faster (starting now: I WAS WRONG)",
    ],
    friend: [
      "I'll be there when you need me (not just when it's convenient for me)",
      "I'll actually reply to your texts within the same day (revolutionary, I know)",
      "I'll stop canceling plans last minute (my couch can wait)",
      "I'll listen without trying to fix everything (sometimes you just need to vent)",
      "I'll be the friend you deserve, not the one I've been lately",
    ],
    family: [
      "I'll be more patient (even when we disagree on everything)",
      "I'll call more often (not just when I need something, I promise)",
      "I'll actually show up when I say I will",
      "I'll respect your boundaries even when I don't fully get them",
      "I'll remember that family means showing up — in the good times AND the bad",
    ],
    work: [
      "I'll communicate more clearly (no more vague emails at 5pm Friday)",
      "I'll respect your time and boundaries",
      "I'll own my mistakes instead of deflecting",
      "I'll follow through on what I commit to",
      "I'll make sure this doesn't affect our working relationship going forward",
    ],
    roommate: [
      "I'll do my dishes (the same day, not 'eventually')",
      "I'll respect shared spaces like they're shared (because they are)",
      "I'll communicate instead of being passive-aggressive",
      "I'll keep the noise down (headphones exist, I just remembered)",
      "I'll be the roommate I'd want to live with",
    ],
  },
  ru: {
    partner: [
      "Я буду реально слушать, когда ты говоришь (а не просто кивать, думая о еде)",
      "Я запомню все важные даты (ставлю 47 напоминалок прямо сейчас)",
      "Я перестану делать то, что тебя бесит (ты знаешь, о чём я)",
      "Я отдам тебе пульт от телевизора без боя (ну почти)",
      "Я буду признавать свою неправоту быстрее (начинаю прямо сейчас: Я БЫЛ НЕПРАВ)",
    ],
    friend: [
      "Я буду рядом когда нужен (не только когда мне удобно)",
      "Я буду отвечать на сообщения в тот же день (да, это реально возможно)",
      "Я перестану отменять планы в последний момент",
      "Я буду слушать не пытаясь всё решить (иногда просто нужно выговориться)",
      "Я буду другом которого ты заслуживаешь",
    ],
    family: [
      "Я буду терпеливее (даже когда мы не согласны вообще ни в чём)",
      "Я буду звонить чаще (не только когда что-то нужно)",
      "Я буду реально приходить когда обещаю",
      "Я буду уважать твои границы даже если не до конца их понимаю",
      "Я запомню что семья — это быть рядом и в хорошие и в плохие времена",
    ],
    work: [
      "Я буду общаться яснее (никаких размытых писем в 5 вечера пятницы)",
      "Я буду уважать твоё время и границы",
      "Я буду признавать ошибки вместо того чтобы перекладывать",
      "Я буду выполнять то что обещал",
      "Я сделаю всё чтобы это не повлияло на наши рабочие отношения",
    ],
    roommate: [
      "Я буду мыть посуду (в тот же день, а не 'когда-нибудь')",
      "Я буду относиться к общим пространствам как к общим",
      "Я буду говорить прямо вместо пассивной агрессии",
      "Я буду тише (наушники существуют, я только что вспомнил)",
      "Я буду тем соседом с которым сам хотел бы жить",
    ],
  },
};

// Relationship-specific reasons — override the default romantic ones
const RELATIONSHIP_REASONS: Record<string, Record<string, { emoji: string; title: string; text: string }[]>> = {
  en: {
    friend: [
      { emoji: "👻", title: "I was a ghost", text: "Disappeared when you needed me. Not cool, not okay, and I see it now." },
      { emoji: "🤡", title: "I was selfish", text: "Made it about me when it should have been about us." },
      { emoji: "🗑️", title: "I took you for granted", text: "Acted like our friendship was unbreakable. It isn't. I know that now." },
      { emoji: "💀", title: "I broke the bro/friend code", text: "There are lines you don't cross. I crossed one. I'm owning it." },
    ],
    family: [
      { emoji: "😤", title: "I was stubborn", text: "Chose being right over being kind. That's not what family does." },
      { emoji: "🙈", title: "I was absent", text: "Wasn't there when it mattered. Family should be the first call, not the last." },
      { emoji: "🗑️", title: "I said hurtful things", text: "Used words I can't take back. But I can acknowledge the damage." },
      { emoji: "💔", title: "I let you down", text: "You expected better from me. You were right to." },
    ],
    work: [
      { emoji: "📧", title: "I dropped the ball", text: "Missed the deadline / forgot the task / let the team down. Fully on me." },
      { emoji: "🤡", title: "I was unprofessional", text: "There's no excuse for how I handled that. I know better." },
      { emoji: "😤", title: "I overstepped", text: "Crossed a boundary that shouldn't have been crossed in a professional setting." },
      { emoji: "💀", title: "I made your job harder", text: "That wasn't fair to you. I should have been part of the solution, not the problem." },
    ],
    roommate: [
      { emoji: "🗑️", title: "I was inconsiderate", text: "Living together means thinking about someone other than myself. I forgot that." },
      { emoji: "🔊", title: "I was disrespectful of the space", text: "Noise, mess, boundaries — I crossed lines that affect your daily life." },
      { emoji: "😤", title: "I was passive-aggressive", text: "Should have just talked to you like an adult. My bad." },
      { emoji: "💀", title: "I made home feel uncomfortable", text: "Home should be your safe space. I messed that up." },
    ],
  },
  ru: {
    friend: [
      { emoji: "👻", title: "Я был призраком", text: "Исчез когда ты нуждался во мне. Некруто, знаю." },
      { emoji: "🤡", title: "Я был эгоистом", text: "Всё было обо мне, когда должно было быть о нас." },
      { emoji: "🗑️", title: "Я воспринимал тебя как должное", text: "Думал наша дружба несокрушима. Это не так." },
      { emoji: "💀", title: "Я нарушил кодекс дружбы", text: "Есть границы которые нельзя пересекать. Я пересёк." },
    ],
    family: [
      { emoji: "😤", title: "Я был упрямым", text: "Выбрал быть правым вместо быть добрым. Семья так не делает." },
      { emoji: "🙈", title: "Меня не было рядом", text: "Не был рядом когда это было важно." },
      { emoji: "🗑️", title: "Я сказал обидные вещи", text: "Слова не заберёшь обратно. Но я признаю ущерб." },
      { emoji: "💔", title: "Я подвёл тебя", text: "Ты ожидал от меня большего. И был прав." },
    ],
    work: [
      { emoji: "📧", title: "Я облажался", text: "Пропустил дедлайн / забыл задачу / подвёл команду. Полностью моя вина." },
      { emoji: "🤡", title: "Я был непрофессионален", text: "Нет оправданий тому как я себя повёл. Я знаю лучше." },
      { emoji: "😤", title: "Я перешёл границу", text: "Пересёк черту которую не стоило пересекать в рабочей обстановке." },
      { emoji: "💀", title: "Я усложнил твою работу", text: "Это нечестно по отношению к тебе. Я должен был быть частью решения." },
    ],
    roommate: [
      { emoji: "🗑️", title: "Я был невнимательным", text: "Жить вместе значит думать о ком-то кроме себя. Я забыл." },
      { emoji: "🔊", title: "Я не уважал пространство", text: "Шум, беспорядок, границы — я нарушил то что влияет на твою жизнь." },
      { emoji: "😤", title: "Я был пассивно-агрессивным", text: "Нужно было просто поговорить как взрослый." },
      { emoji: "💀", title: "Дом перестал быть комфортным", text: "Дом должен быть безопасным местом. Я это испортил." },
    ],
  },
};

export default function ApologyExperience({ dict, name, lang, isReceiver, scenario, relationship, tone }: Props) {
  const { playLoop, stop } = useSounds();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  void lang;
  void isReceiver;

  // Get scenario-specific and relationship-specific text
  const langKey = (SCENARIO_SUBTEXT[lang] ? lang : "en") as string;
  const scenarioText = scenario && SCENARIO_SUBTEXT[langKey]?.[scenario];
  const relationshipQ = relationship && RELATIONSHIP_QUESTION[langKey]?.[relationship];

  // Tone affects the overall vibe — meme tone gets extra emojis
  const toneEmoji = tone === "meme" ? " 💀" : tone === "sincere" ? " 🥺" : " 🫠";

  // Override promises and reasons based on relationship
  const promises = (relationship && RELATIONSHIP_PROMISES[langKey]?.[relationship]) || dict.promises.items;
  const reasons = (relationship && RELATIONSHIP_REASONS[langKey]?.[relationship]) || dict.reasons.items;

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Splash screen — dramatic intro while 3D loads */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-7xl md:text-8xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              💌
            </motion.div>
            <motion.p
              className="mt-6 text-xl md:text-2xl text-gray-300 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {name ? `${name}, ` : ""}
              {relationship === "partner" ? "your person has something to say..." :
               relationship === "friend" ? "your friend has something to say..." :
               relationship === "family" ? "someone in your family has a message..." :
               "someone has a message for you..."}
            </motion.p>
            <motion.div
              className="mt-4 w-48 h-1 bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {name && (
            <motion.p
              className="text-3xl md:text-5xl font-bold text-pink-300 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {name} 💕
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
            {scenarioText || dict.hero.subtext}{toneEmoji}
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
          {reasons.map((reason, i) => (
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
          text={dict.forgive.title}
          className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16"
        />
        <RunawayButtonI18n dict={{
          ...dict.forgive,
          question: relationshipQ || dict.forgive.question,
        }} name={name} />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-xs md:text-sm px-4">
        <p>{dict.footer.madeWith}</p>
        <p className="mt-2">{dict.footer.copyright}</p>
      </footer>
    </main>
  );
}
