import type { Difficulty } from "./types";
import { COMMON_WORDS, HARD_WORDS } from "./word-lists";

function wordListFor(difficulty: Difficulty): readonly string[] {
  return difficulty === "hard" ? HARD_WORDS : COMMON_WORDS;
}

export function sampleWords(count: number, difficulty: Difficulty): string[] {
  const source = wordListFor(difficulty);
  const result: string[] = [];
  let previous: string | null = null;

  while (result.length < count) {
    const candidate = source[Math.floor(Math.random() * source.length)];
    if (candidate === previous) continue;
    result.push(candidate);
    previous = candidate;
  }

  return result;
}
