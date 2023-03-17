export const isAlphabetic = (text: string): boolean =>
  [...text].every(
    (character) => character.toLowerCase() !== character.toUpperCase()
  );

export const capitalizeText = (text: string): string =>
  text[0] ? text[0].toUpperCase() + text.slice(1) : "";
