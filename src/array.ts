export const interleave = <T, S>(
  xs: T[],
  separator: S | ((index: number) => S),
): (T | S)[] => {
  const ys = [];

  for (const [index, value] of xs.entries()) {
    ys.push(value);

    if (index !== xs.length - 1) {
      ys.push(separator instanceof Function ? separator(index) : separator);
    }
  }

  return ys;
};
