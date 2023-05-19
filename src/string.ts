export const isAlphabetic = (text: string): boolean =>
  [...text].every(
    (character) => character.toLowerCase() !== character.toUpperCase()
  );

export const capitalizeText = (text: string): string =>
  (text[0]?.toUpperCase() ?? "") + text.slice(1);

export const parseLines = async function* (
  iterable: AsyncIterable<string>
): AsyncIterable<string> {
  let line = "";

  for await (const delta of iterable) {
    const [former = "", ...rest] = delta.split("\n");

    if (typeof last(rest) === "string") {
      yield line + former;

      for (const line of rest.slice(0, -1)) {
        yield line;
      }

      line = last(rest) ?? "";
    } else {
      line += former;
    }
  }

  if (line) {
    yield line;
  }
};

const last = <T>(values: T[]): T | undefined => values[values.length - 1];
