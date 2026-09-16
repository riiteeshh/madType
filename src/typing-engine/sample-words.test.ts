import { describe, expect, it } from "vitest";

import { sampleWords } from "./sample-words";
import { COMMON_WORDS, HARD_WORDS } from "./word-lists";

describe("sampleWords", () => {
  it("returns the requested number of words", () => {
    expect(sampleWords(25, "common")).toHaveLength(25);
  });

  it("never repeats the same word twice in a row", () => {
    const words = sampleWords(200, "common");
    for (let i = 1; i < words.length; i += 1) {
      expect(words[i]).not.toBe(words[i - 1]);
    }
  });

  it("samples from the common word list for common difficulty", () => {
    const words = sampleWords(50, "common");
    words.forEach((word) => expect(COMMON_WORDS).toContain(word));
  });

  it("samples from the hard word list for hard difficulty", () => {
    const words = sampleWords(50, "hard");
    words.forEach((word) => expect(HARD_WORDS).toContain(word));
  });
});
