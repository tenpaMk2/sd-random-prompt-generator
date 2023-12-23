export const isSameCandidate = (a: readonly string[], b: readonly string[]) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export const generateDynamicPrompt = (
  prompts: readonly string[],
  options?: { lineBreak?: boolean },
) => `{${prompts.join(` |${options?.lineBreak ? `\n` : ``}`)}}`;
