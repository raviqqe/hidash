import { map } from "@raviqqe/loscore/async";
import { parseLines as parseStringLines } from "./string.js";

export const parseLines = (
  iterable: AsyncIterable<string>,
): AsyncIterable<unknown> =>
  map(parseStringLines(iterable), (line): unknown => JSON.parse(line));

export const stringifyLines = (
  values: AsyncIterable<unknown>,
): AsyncIterable<string> => map(values, (json) => JSON.stringify(json) + "\n");
