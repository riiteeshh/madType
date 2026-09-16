import { describe, expect, it } from "vitest";

import { applyPunctuation } from "./apply-punctuation";

describe("applyPunctuation", () => {
  it("preserves the word count", () => {
    const words = Array.from({ length: 30 }, (_, i) => `word${i}`);
    expect(applyPunctuation(words)).toHaveLength(30);
  });

  it("capitalizes the first word", () => {
    const [first] = applyPunctuation(["hello", "world"]);
    expect(first.charAt(0)).toBe("H");
  });

  it("ends the last word with terminal punctuation", () => {
    const words = applyPunctuation(["one", "two", "three"]);
    const last = words[words.length - 1];
    expect(last.endsWith(".")).toBe(true);
  });

  it("capitalizes the word following a sentence-ending period", () => {
    const words = Array.from({ length: 40 }, (_, i) => `word${i}`);
    const result = applyPunctuation(words);
    result.forEach((word, i) => {
      if (i === 0) return;
      const previous = result[i - 1];
      if (previous.endsWith(".")) {
        expect(word.charAt(0)).toBe(word.charAt(0).toUpperCase());
      }
    });
  });
});
