"use client";

import { useCallback, useRef } from "react";

const SOUNDS = {
  sadViolin: "/sounds/sad_violin.mp3",
  bruh: "/sounds/bruh-sound-effect_WstdzdM.mp3",
  airhorn: "/sounds/airhorn.mp3",
  vineBoom: "/sounds/vine-boom.mp3",
} as const;

type SoundName = keyof typeof SOUNDS;

// Track whether user has interacted with the page
let userHasInteracted = false;

if (typeof window !== "undefined") {
  const markInteracted = () => {
    userHasInteracted = true;
    window.removeEventListener("click", markInteracted);
    window.removeEventListener("touchstart", markInteracted);
    window.removeEventListener("scroll", markInteracted);
  };
  window.addEventListener("click", markInteracted);
  window.addEventListener("touchstart", markInteracted);
  window.addEventListener("scroll", markInteracted);
}

export function useSounds() {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const play = useCallback((name: SoundName, volume = 0.7) => {
    if (!userHasInteracted) return;
    let audio = audioRefs.current.get(name);
    if (!audio) {
      audio = new Audio(SOUNDS[name]);
      audioRefs.current.set(name, audio);
    }
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const playLoop = useCallback((name: SoundName, volume = 0.3) => {
    let audio = audioRefs.current.get(name);
    if (!audio) {
      audio = new Audio(SOUNDS[name]);
      audioRefs.current.set(name, audio);
    }
    audio.volume = volume;
    audio.loop = true;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const stop = useCallback((name: SoundName) => {
    const audio = audioRefs.current.get(name);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { play, playLoop, stop };
}
