export const generateDynamicPrompt = (
  prompts: readonly string[],
  options?: { lineBreak?: boolean },
) => `{${prompts.join(` |${options?.lineBreak ? `\n` : ``}`)}}`;
