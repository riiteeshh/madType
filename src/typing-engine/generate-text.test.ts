import { describe, expect, it } from "vitest";

import { generateText } from "./generate-text";
import { DEFAULT_TEST_CONFIG } from "./types";

describe("generateText", () => {
  it("generates exactly wordCount words in words mode", () => {
    const text = generateText({
      ...DEFAULT_TEST_CONFIG,
      mode: "words",
      wordCount: 50,
    });
    expect(text).toHaveLength(50);
  });

  it("generates a large buffer in time mode regardless of wordCount", () => {
    const text = generateText({
      ...DEFAULT_TEST_CONFIG,
      mode: "time",
      durationSeconds: 15,
    });
    expect(text.length).toBeGreaterThan(50);
  });

  it("leaves words unpunctuated and lowercase when both toggles are off", () => {
    const text = generateText({
      ...DEFAULT_TEST_CONFIG,
      mode: "words",
      wordCount: 25,
      punctuation: false,
      numbers: false,
    });
    text.forEach((word) => expect(word).toMatch(/^[a-z]+$/));
  });
});
