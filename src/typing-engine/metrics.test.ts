import { describe, expect, it } from "vitest";

import { calculateAccuracy, calculateRawWpm, calculateWpm } from "./metrics";

describe("calculateWpm", () => {
  it("computes words per minute from correct characters only", () => {
    // 250 correct chars in 1 minute = 50 words (5 chars/word)
    expect(calculateWpm(250, 60_000)).toBe(50);
  });

  it("returns 0 when no time has elapsed", () => {
    expect(calculateWpm(100, 0)).toBe(0);
  });
});

describe("calculateRawWpm", () => {
  it("counts every typed character, correct or not", () => {
    expect(calculateRawWpm(300, 60_000)).toBe(60);
  });
});

describe("calculateAccuracy", () => {
  it("computes the percentage of correct keystrokes", () => {
    expect(calculateAccuracy(90, 100)).toBe(90);
  });

  it("counts corrected mistakes against accuracy", () => {
    expect(calculateAccuracy(80, 100)).toBe(80);
  });

  it("defaults to 100 when no keystrokes were made yet", () => {
    expect(calculateAccuracy(0, 0)).toBe(100);
  });
});
