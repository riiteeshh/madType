import { describe, expect, it } from "vitest";

import { determineHostId } from "./race-members";

describe("determineHostId", () => {
  it("returns null when there are no members", () => {
    expect(determineHostId([])).toBeNull();
  });

  it("deterministically picks the lexicographically smallest id", () => {
    expect(determineHostId(["b-id", "a-id", "c-id"])).toBe("a-id");
  });

  it("agrees regardless of input order", () => {
    const a = determineHostId(["z", "m", "a"]);
    const b = determineHostId(["a", "z", "m"]);
    expect(a).toBe(b);
  });
});
