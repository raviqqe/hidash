import { map } from "@raviqqe/loscore/async";
import { parseLines as parseStringLines } from "./string.js";

export const parse = (
  iterable: AsyncIterable<string>,
): AsyncIterable<string[]> =>
  map(parseStringLines(iterable), (line) =>
    line.split(",").map((cell) => cell.trim()),
  );

export const stringify = (
  rows: AsyncIterable<string[]>,
): AsyncIterable<string> => map(rows, (cells) => cells.join(",") + "\n");
