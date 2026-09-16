import { describe, expect, it } from "vitest";

import { applyNumbers } from "./apply-numbers";

describe("applyNumbers", () => {
  it("preserves the word count", () => {
    const words = Array.from({ length: 100 }, (_, i) => `word${i}`);
    expect(applyNumbers(words)).toHaveLength(100);
  });

  it("replaces some words with numeric tokens", () => {
    const words = Array.from({ length: 200 }, () => "word");
    const result = applyNumbers(words);
    const numericCount = result.filter((token) => /^\d+$/.test(token)).length;
    expect(numericCount).toBeGreaterThan(0);
  });
});
