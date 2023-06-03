import { describe, expect, it } from "vitest";
import { interleave } from "./array.js";

describe(interleave.name, () => {
  it("interleaves a separator", async () => {
    expect(interleave([], null)).toEqual([]);
    expect(interleave([1], null)).toEqual([1]);
    expect(interleave([1, 2], null)).toEqual([1, null, 2]);
    expect(interleave([1, 2, 3], null)).toEqual([1, null, 2, null, 3]);
  });
});
