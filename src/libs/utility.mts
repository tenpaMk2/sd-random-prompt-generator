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

/**
 * Split an array into chunks.
 * @param array Array to split.
 * @param chunkSize Size of each chunk.
 * @returns Array of chunks.
 */
export const splitIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
  const result = [] as T[][];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};
