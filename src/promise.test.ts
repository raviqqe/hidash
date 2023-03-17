import { expect, it } from "vitest";
import { sleep, defer, asyncArray } from "./promise.js";

it("sleeps", async () => {
  await sleep(0);
});

it("defers a value", async () => {
  const callback = defer(async (x: number) => x);

  expect(await callback(1)).toBe(1);
  expect(await callback(2)).toBe(1);
  expect(await callback(3)).toBe(2);
  expect(await callback(4)).toBe(3);
});

it('converts an async iterable into an array', async () => {
  expect(asyncArray((async function*() { })())).toEqual([])
})
