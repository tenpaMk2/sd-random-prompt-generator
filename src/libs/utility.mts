export const generateDynamicPrompt = (
  prompts: readonly string[],
  options: { lineBreak?: boolean } = { lineBreak: false },
) => `{${prompts.join(` |${options?.lineBreak ? `\n` : ``}`)}}`;

export const getKeys = <T extends { [key: string]: unknown }>(
  obj: T,
): (keyof T)[] => {
  return Object.keys(obj);
};
