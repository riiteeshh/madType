export type Mode = "time" | "words";
export type Difficulty = "common" | "hard";

export const TIME_MODE_DURATIONS = [15, 30, 60, 120] as const;
export const WORD_COUNT_OPTIONS = [10, 25, 50, 100] as const;

export type TimeModeDuration = (typeof TIME_MODE_DURATIONS)[number];
export type WordCountOption = (typeof WORD_COUNT_OPTIONS)[number];

export interface TestConfig {
  mode: Mode;
  durationSeconds: TimeModeDuration;
  wordCount: WordCountOption;
  difficulty: Difficulty;
  punctuation: boolean;
  numbers: boolean;
}

export const DEFAULT_TEST_CONFIG: TestConfig = {
  mode: "time",
  durationSeconds: 30,
  wordCount: 25,
  difficulty: "common",
  punctuation: false,
  numbers: false,
};
