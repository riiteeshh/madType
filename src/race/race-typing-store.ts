import { create } from "zustand";

import { calculateWpm, judgeTypedChar, type Mode } from "@/typing-engine";

interface RaceTypingState {
  currentWordIndex: number;
  currentInput: string;
  typedWords: string[];
  correctKeystrokes: number;
  totalKeystrokes: number;
  startedAt: number | null;
  reset: () => void;
  typeChar: (
    char: string,
    words: string[],
    mode: Mode,
    onFinish: (wpm: number) => void,
  ) => void;
  backspace: () => void;
  commitWord: (
    progressTotal: number,
    onProgress: (progress: number, wpm: number) => void,
  ) => void;
  finishOnTimeUp: (onFinish: (wpm: number) => void) => void;
}

const INITIAL_STATE = {
  currentWordIndex: 0,
  currentInput: "",
  typedWords: [] as string[],
  correctKeystrokes: 0,
  totalKeystrokes: 0,
  startedAt: null as number | null,
};

export const useRaceTypingStore = create<RaceTypingState>((set, get) => ({
  ...INITIAL_STATE,

  reset: () => set(INITIAL_STATE),

  typeChar: (char, words, mode, onFinish) => {
    const state = get();
    const isLastWord = state.currentWordIndex === words.length - 1;
    const judgement = judgeTypedChar(
      words[state.currentWordIndex],
      state.currentInput,
      char,
      isLastWord,
      mode,
    );
    const startedAt = state.startedAt ?? Date.now();
    const correctKeystrokes =
      state.correctKeystrokes + (judgement.isCorrect ? 1 : 0);

    set({
      currentInput: judgement.input,
      startedAt,
      totalKeystrokes: state.totalKeystrokes + 1,
      correctKeystrokes,
    });

    if (judgement.isFinished) {
      onFinish(calculateWpm(correctKeystrokes, Date.now() - startedAt));
    }
  },

  backspace: () => {
    const state = get();
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

  commitWord: (progressTotal, onProgress) => {
    const state = get();
    if (state.currentInput.length === 0) return;

    const currentWordIndex = state.currentWordIndex + 1;
    set({
      currentWordIndex,
      currentInput: "",
      typedWords: [...state.typedWords, state.currentInput],
    });

    const progress = Math.min(
      100,
      Math.round((currentWordIndex / progressTotal) * 100),
    );
    const elapsed = state.startedAt === null ? 0 : Date.now() - state.startedAt;
    onProgress(progress, calculateWpm(state.correctKeystrokes, elapsed));
  },

  finishOnTimeUp: (onFinish) => {
    const state = get();
    const wpm =
      state.startedAt === null
        ? 0
        : calculateWpm(state.correctKeystrokes, Date.now() - state.startedAt);
    onFinish(wpm);
  },
}));
