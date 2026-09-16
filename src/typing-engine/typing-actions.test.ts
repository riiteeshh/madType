import { describe, expect, it } from "vitest";

import { judgeTypedChar, shouldRefillBuffer } from "./typing-actions";

describe("judgeTypedChar", () => {
  it("marks a correctly typed character as correct", () => {
    const result = judgeTypedChar("cat", "", "c", false, "words");
    expect(result.isCorrect).toBe(true);
    expect(result.input).toBe("c");
  });

  it("marks a mistyped character as incorrect", () => {
    const result = judgeTypedChar("cat", "", "x", false, "words");
    expect(result.isCorrect).toBe(false);
  });

  it("finishes the test when the last word is completed in words mode", () => {
    const result = judgeTypedChar("cat", "ca", "t", true, "words");
    expect(result.isFinished).toBe(true);
  });

  it("does not finish on the last word in time mode", () => {
    const result = judgeTypedChar("cat", "ca", "t", true, "time");
    expect(result.isFinished).toBe(false);
  });
});

describe("shouldRefillBuffer", () => {
  it("is false when plenty of words remain", () => {
    expect(shouldRefillBuffer(200, 10)).toBe(false);
  });

  it("is true when nearing the end of the buffer", () => {
    expect(shouldRefillBuffer(200, 190)).toBe(true);
  });
});
