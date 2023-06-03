export const interleave = <T, S>(xs: T[], separator: S): (T | S)[] => {
  const ys = [];

  for (const [index, value] of xs.entries()) {
    ys.push(value);

    if (index !== xs.length - 1) {
      ys.push(separator);
    }
  }

  return ys;
};
