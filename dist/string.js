export const isAlphabetic = (text) => [...text].every((character) => character.toLowerCase() !== character.toUpperCase());
export const capitalizeText = (text) => { var _a, _b; return ((_b = (_a = text[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : "") + text.slice(1); };
//# sourceMappingURL=string.js.map