export const interleave = <T>(xs: T[], separator: T): T[] => {
  const ys: T[] = [];

  for (const [index, value] of xs.entries()) {
    ys.push(value);

    if (index !== xs.length - 1) {
      ys.push(separator);
    }
  }

  return ys;
};
