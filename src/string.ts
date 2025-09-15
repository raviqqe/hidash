export const parseLines = async function*(
  iterable: AsyncIterable<string>,
): AsyncIterable<string> {
  let line = "";

  for await (const delta of iterable) {
    const [former = "", ...rest] = delta.split("\n");

    if (typeof rest.at(-1) === "string") {
      yield line + former;

      for (const line of rest.slice(0, -1)) {
        yield line;
      }

      line = rest.at(-1) ?? "";
    } else {
      line += former;
    }
  }

if (line) {
  yield line;
}
};
