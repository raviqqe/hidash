import { map } from "./promise.js";
import { parseLines as parseStringLines } from "./string.js";

export const parseLines = (
  iterable: AsyncIterable<string>
): AsyncIterable<unknown> =>
  map(parseStringLines(iterable), (line): unknown => JSON.parse(line));

export const stringifyLines = (
  jsons: AsyncIterable<unknown>
): AsyncIterable<string> => map(jsons, (json) => JSON.stringify(json) + "\n");
