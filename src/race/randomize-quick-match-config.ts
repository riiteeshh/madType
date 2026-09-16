import {
  DEFAULT_TEST_CONFIG,
  WORD_COUNT_OPTIONS,
  type Difficulty,
  type TestConfig,
} from "@/typing-engine";

const DIFFICULTIES: Difficulty[] = ["common", "hard"];

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomizeQuickMatchConfig(): TestConfig {
  return {
    ...DEFAULT_TEST_CONFIG,
    mode: "words",
    wordCount: pickRandom(WORD_COUNT_OPTIONS),
    difficulty: pickRandom(DIFFICULTIES),
    punctuation: false,
    numbers: false,
  };
}
