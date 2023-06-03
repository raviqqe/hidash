export const interleave = <T>(xs: T[], separator: T): T[] => {
  const ys: T[] = [];

  for (const value of xs.slice(0, -1)) {
    ys.push(value);
    ys.push(separator);
  }

  return ys;
};
