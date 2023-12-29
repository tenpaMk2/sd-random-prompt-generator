import { nishikigiChisato } from "./chara-defines.mjs";
import { generateDynamicPrompt } from "./libs/utility.mjs";
import { parse } from "./parser.mjs";
import { posePromptGenerators } from "./poses.mjs";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

// Parse

const charas = [nishikigiChisato];
const charaInfos = charas.map((chara) => ({
  key: chara.key,
  visibleTokenInfos: parse(chara),
}));

// Generate
type ResultLeaf = { key: string; prompt: string; childPrompts?: ResultLeaf[] };

const charaPrompts = charaInfos.map(({ key, visibleTokenInfos }) => {
  const situationPrompts = visibleTokenInfos.map((info) => {
    const posePrompts = posePromptGenerators.map((promptGenerator) =>
      promptGenerator(info),
    );

    return {
      key: info.key,
      prompt: generateDynamicPrompt(
        posePrompts.map(({ prompt }) => prompt),
        { lineBreak: true },
      ),
      childPrompts: posePrompts,
    };
  });

  return {
    key,
    prompt: generateDynamicPrompt(
      situationPrompts.map(({ prompt }) => prompt),
      { lineBreak: true },
    ),
    childPrompts: situationPrompts,
  };
});

const resultTree: ResultLeaf = {
  key: `all`,
  prompt: generateDynamicPrompt(
    charaPrompts.map(({ prompt }) => prompt),
    { lineBreak: true },
  ),
  childPrompts: charaPrompts,
};

// Save

const saveRecursively = async (
  { key, prompt, childPrompts }: ResultLeaf,
  parentDir: string,
): Promise<unknown> => {
  await mkdir(parentDir, { recursive: true });
  console.log(`generate: ${parentDir}`);
  const p = writeFile(join(parentDir, `${key}.txt`), prompt);

  if (!childPrompts) return p;

  const promises = childPrompts?.map((l) =>
    saveRecursively(l, join(parentDir, l.key)),
  );
  return Promise.all([p, ...promises]);
};

const outputsDir = `outputs` as const;
await rm(outputsDir, { recursive: true, force: true });
await saveRecursively(resultTree, join(outputsDir));
