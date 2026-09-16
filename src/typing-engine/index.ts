export { generateText } from "./generate-text";
export { calculateAccuracy, calculateRawWpm, calculateWpm } from "./metrics";
export {
  DEFAULT_TEST_CONFIG,
  TIME_MODE_DURATIONS,
  WORD_COUNT_OPTIONS,
} from "./types";
export {
  BUFFER_REFILL_SIZE,
  judgeTypedChar,
  shouldRefillBuffer,
  type CharacterJudgement,
} from "./typing-actions";
export type {
  Difficulty,
  Mode,
  TestConfig,
  TimeModeDuration,
  WordCountOption,
} from "./types";
