import { describe, expect, it } from "vitest";

import { generateRoomCode } from "./generate-room-code";

describe("generateRoomCode", () => {
  it("generates a 6 character code", () => {
    expect(generateRoomCode()).toHaveLength(6);
  });

  it("excludes visually ambiguous characters", () => {
    const code = generateRoomCode();
    expect(code).not.toMatch(/[0O1I]/);
  });

  it("only uses uppercase letters and digits", () => {
    expect(generateRoomCode()).toMatch(/^[A-Z0-9]+$/);
  });
});
