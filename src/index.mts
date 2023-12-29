import { nishikigiChisato } from "./chara-defines.mjs";
import { generateDynamicPrompt } from "./libs/utility.mjs";
import { parse } from "./parser.mjs";
import { posePromptGenerators } from "./poses.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

// Parse

const charas = [nishikigiChisato];
const charaInfos = charas.map((chara) => ({
  key: chara.key,
  visibleTokenInfos: parse(chara),
}));

// Generate
type ResultLeaf = { key: string; prompt: string; childPrompts?: ResultLeaf[] };

const resultTree: ResultLeaf[] = charaInfos.map(
  ({ key, visibleTokenInfos }) => {
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
  },
);

// Save

const outputsDir = join(`outputs`);

const promises = resultTree.map(
  async ({
    key: charaKey,
    prompt: charaPrompt,
    childPrompts: situationPrompts,
  }) => {
    const dir = join(outputsDir, charaKey);
    await mkdir(dir, { recursive: true });
    const p = writeFile(join(dir, `prompt.txt`), charaPrompt);

    const promises = situationPrompts!.map(
      async ({
        key: situationKey,
        prompt: situationPrompt,
        childPrompts: posePrompts,
      }) => {
        const dir = join(outputsDir, charaKey, situationKey);
        await mkdir(dir, { recursive: true });
        const p = writeFile(join(dir, `prompt.txt`), situationPrompt);

        const promises = posePrompts!.map(async ({ key: poseKey, prompt }) => {
          const dir = join(outputsDir, charaKey, situationKey, poseKey);
          await mkdir(dir, { recursive: true });
          return writeFile(join(dir, `prompt.txt`), prompt);
        });

        return Promise.all([p, ...promises]);
      },
    );

    return Promise.all([p, ...promises]);
  },
);

await Promise.all(promises);
