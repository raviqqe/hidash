import { it } from "vitest";
import { sleep } from "./sleep.js";

it("sleeps", async () => {
  await sleep(0);
});
