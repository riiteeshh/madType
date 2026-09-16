import { applyNumbers } from "./apply-numbers";
import { applyPunctuation } from "./apply-punctuation";
import { sampleWords } from "./sample-words";
import type { TestConfig } from "./types";

const TIME_MODE_BUFFER_SIZE = 200;

export function generateText(config: TestConfig): string[] {
  const count =
    config.mode === "words" ? config.wordCount : TIME_MODE_BUFFER_SIZE;

  let words = sampleWords(count, config.difficulty);
  if (config.numbers) words = applyNumbers(words);
  if (config.punctuation) words = applyPunctuation(words);

  return words;
}
