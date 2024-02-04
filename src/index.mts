import {
  ceciliaAlcottOGTurles,
  kurosakiMeaEft,
  lalaSatalinDevilukeEft,
  minimumTest,
  momoVeliaDevilukeEft,
  sentoIsuzuLittleJellyV2,
  shokuhoMisaki,
  suzukazeAobaNarugo1992,
  takimotoHifumiNarugo1992,
  tamakiIrohaEft,
} from "./characters.mjs";
import { generateDynamicPrompt } from "./libs/utility.mjs";
import { parse } from "./parser.mjs";
import { posePromptGenerators } from "./poses.mjs";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { writeAsCSV } from "./tag-defines/visible.mjs";

// Parse
const charas = [
  minimumTest,
  shokuhoMisaki,
  ceciliaAlcottOGTurles,
  sentoIsuzuLittleJellyV2,
  suzukazeAobaNarugo1992,
  takimotoHifumiNarugo1992,
  momoVeliaDevilukeEft,
  kurosakiMeaEft,
  lalaSatalinDevilukeEft,
  tamakiIrohaEft,
];
const charaInfos = charas.map((chara) => ({
  key: chara.key,
  visibleTokenInfos: parse(chara),
}));

// Generate
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

type ResultTree = {
  key: string;
  prompt: string;
  childPrompts?: ResultTree[];
};
const resultTree: ResultTree = {
  key: `all`,
  prompt: generateDynamicPrompt(
    charaPrompts.map(({ prompt }) => prompt),
    { lineBreak: true },
  ),
  childPrompts: charaPrompts,
};

// Save
const saveRecursively = async (
  { key, prompt, childPrompts }: typeof resultTree,
  parentDir: string,
): Promise<unknown> => {
  await mkdir(parentDir, { recursive: true });
  console.log(`generate: ${parentDir}`);
  const p = writeFile(join(parentDir, `${key}.txt`), prompt);

  if (!childPrompts) return p;

  const promises = childPrompts?.map((child) =>
    saveRecursively(child, join(parentDir, child.key)),
  );
  return Promise.all([p, ...promises]);
};

const outputsDir = `outputs` as const;
await rm(outputsDir, { recursive: true, force: true });
await saveRecursively(resultTree, join(outputsDir));

// Output parsed info.
const parsedDir = join(outputsDir, `parsed`);
await mkdir(parsedDir, { recursive: true });
await Promise.all(
  charaInfos.map(({ key, visibleTokenInfos }) => {
    const json = JSON.stringify(visibleTokenInfos, null, 2);
    return writeFile(join(parsedDir, `${key}.json`), json);
  }),
);

// Output tag visibility as CSV
writeAsCSV(join(outputsDir, `tag-visibility.csv`));
