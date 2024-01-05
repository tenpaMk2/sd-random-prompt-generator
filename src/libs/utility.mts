export const generateDynamicPrompt = (
  prompts: readonly string[],
  options: { lineBreak?: boolean } = { lineBreak: false },
) => `{${prompts.join(`|${options?.lineBreak ? `\n` : ``}`)}}`;

export const getKeys = <T extends { [key: string]: unknown }>(
  obj: T,
): (keyof T)[] => {
  return Object.keys(obj);
};

/**
 * Get all combinations of choices.
 * @param choices
 * @returns all combinations of choices.
 * @example getCombinations([[1, 2], [`a`, `b`, `c`]]) // [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]
 */
export const getCombinations = <T,>(choices: T[][]): T[][] => {
  if (choices.length === 1) {
    return choices[0].map((item) => [item]);
  }

  const result: any[][] = [];
  const allCasesOfRest = getCombinations(choices.slice(1)); // recur with the rest of array
  for (const a of allCasesOfRest) {
    for (const b of choices[0]) {
      result.push([b, ...a]);
    }
  }
  return result;
};
