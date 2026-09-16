import { create } from "zustand";

import {
  BUFFER_REFILL_SIZE,
  calculateAccuracy,
  calculateRawWpm,
  calculateWpm,
  DEFAULT_TEST_CONFIG,
  generateText,
  judgeTypedChar,
  shouldRefillBuffer,
  type TestConfig,
} from "@/typing-engine";

import type { TestStatus, WpmSample } from "./test-types";

interface TestState {
  config: TestConfig;
  words: string[];
  typedWords: string[];
  currentWordIndex: number;
  currentInput: string;
  correctKeystrokes: number;
  totalKeystrokes: number;
  status: TestStatus;
  startedAt: number | null;
  finishedAt: number | null;
  timeRemaining: number | null;
  samples: WpmSample[];
  setConfig: (config: TestConfig) => void;
  ensureWords: () => void;
  start: () => void;
  typeChar: (char: string) => void;
  backspace: () => void;
  space: () => void;
  tick: () => void;
}

function elapsedMs(startedAt: number | null, finishedAt: number | null): number {
  if (startedAt === null) return 0;
  const end = finishedAt ?? Date.now();
  return end - startedAt;
}

export const useTestStore = create<TestState>((set, get) => ({
  config: DEFAULT_TEST_CONFIG,
  words: [],
  typedWords: [],
  currentWordIndex: 0,
  currentInput: "",
  correctKeystrokes: 0,
  totalKeystrokes: 0,
  status: "idle",
  startedAt: null,
  finishedAt: null,
  timeRemaining: null,
  samples: [],

  setConfig: (config) => {
    set({
      config,
      words: generateText(config),
      typedWords: [],
      currentWordIndex: 0,
      currentInput: "",
      correctKeystrokes: 0,
      totalKeystrokes: 0,
      status: "idle",
      startedAt: null,
      finishedAt: null,
      timeRemaining: config.mode === "time" ? config.durationSeconds : null,
      samples: [],
    });
  },

  ensureWords: () => {
    const state = get();
    if (state.words.length > 0) return;
    set({ words: generateText(state.config) });
  },

  start: () => {
    const { config } = get();
    set({
      status: "running",
      startedAt: null,
      finishedAt: null,
      timeRemaining: config.mode === "time" ? config.durationSeconds : null,
    });
  },

  typeChar: (char) => {
    const state = get();
    if (state.status !== "running") return;

    const isLastWord = state.currentWordIndex === state.words.length - 1;
    const judgement = judgeTypedChar(
      state.words[state.currentWordIndex],
      state.currentInput,
      char,
      isLastWord,
      state.config.mode,
    );

    set({
      currentInput: judgement.input,
      startedAt: state.startedAt ?? Date.now(),
      finishedAt: judgement.isFinished ? Date.now() : null,
      totalKeystrokes: state.totalKeystrokes + 1,
      correctKeystrokes: state.correctKeystrokes + (judgement.isCorrect ? 1 : 0),
      status: judgement.isFinished ? "finished" : "running",
    });
  },

  backspace: () => {
    const state = get();
    if (state.status !== "running") return;

    if (state.currentInput.length > 0) {
      set({ currentInput: state.currentInput.slice(0, -1) });
      return;
    }
    if (state.currentWordIndex === 0) return;

    const previousIndex = state.currentWordIndex - 1;
    const previousWords = [...state.typedWords];
    const restoredInput = previousWords.pop() ?? "";
    set({
      currentWordIndex: previousIndex,
      currentInput: restoredInput,
      typedWords: previousWords,
    });
  },

  space: () => {
    const state = get();
    if (state.status !== "running" || state.currentInput.length === 0) return;

    const typedWords = [...state.typedWords, state.currentInput];
    let words = state.words;
    const needsRefill =
      state.config.mode === "time" &&
      shouldRefillBuffer(words.length, state.currentWordIndex);
    if (needsRefill) {
      words = [
        ...words,
        ...generateText({
          ...state.config,
          mode: "words",
          wordCount: BUFFER_REFILL_SIZE,
        }),
      ];
    }

    const currentWordIndex = state.currentWordIndex + 1;
    const isFinished =
      state.config.mode === "words" && currentWordIndex >= words.length;

    set({
      words,
      typedWords,
      currentWordIndex,
      currentInput: "",
      finishedAt: isFinished ? Date.now() : null,
      status: isFinished ? "finished" : "running",
    });
  },

  tick: () => {
    const state = get();
    if (state.status !== "running" || state.startedAt === null) return;

    const elapsed = elapsedMs(state.startedAt, null);
    const sample: WpmSample = {
      elapsedSeconds: Math.round(elapsed / 1000),
      wpm: calculateWpm(state.correctKeystrokes, elapsed),
      rawWpm: calculateRawWpm(state.totalKeystrokes, elapsed),
    };

    if (state.config.mode !== "time") {
      set({ samples: [...state.samples, sample] });
      return;
    }

    const timeRemaining = (state.timeRemaining ?? 0) - 1;
    const isFinished = timeRemaining <= 0;
    set({
      timeRemaining,
      samples: [...state.samples, sample],
      finishedAt: isFinished ? Date.now() : null,
      status: isFinished ? "finished" : "running",
    });
  },
}));

export function useTestResult() {
  const state = useTestStore();
  const elapsed = elapsedMs(state.startedAt, state.finishedAt);
  return {
    wpm: calculateWpm(state.correctKeystrokes, elapsed),
    rawWpm: calculateRawWpm(state.totalKeystrokes, elapsed),
    accuracy: calculateAccuracy(state.correctKeystrokes, state.totalKeystrokes),
    samples: state.samples,
  };
}
