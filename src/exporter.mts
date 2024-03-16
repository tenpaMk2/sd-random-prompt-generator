import { mkdir, rm, appendFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { generatePatterns } from "./prompt-generators/common.mjs";
import { PatternCollection } from "./prompt-define.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { LoraNameTag } from "./tag-defines/lora.mjs";
import { globalSetting } from "./setting.mts";
import { splitIntoChunks } from "./libs/utility.mts";

type Tree = {
  key: string;
  patternCollection: PatternCollection<Tag | LoraNameTag>;
  children: Tree[];
};

const exportRecursively = async (
  { key, patternCollection, children }: Tree,
  parentDir: string,
): Promise<unknown> => {
  console.log(`exporting...: ${parentDir}`);

  await mkdir(parentDir, { recursive: true });

  const writeAll = async () => {
    const prompts = patternCollection.pickAllPrompts();
    if (prompts.length <= globalSetting.promptExportingBatchSize) {
      await writeFile(join(parentDir, `${key}-all.txt`), prompts.join(`\n`));
    }
    const promptsChunks = splitIntoChunks(
      prompts,
      globalSetting.promptExportingBatchSize,
    );
    for (const ps of promptsChunks) {
      await appendFile(join(parentDir, `${key}-all.txt`), `${ps.join(`\n`)}\n`);
    }
  };

  if (children.length === 0) {
    // Export all prompts only when there are no children.
    await writeAll();
    return;
  }
  // Export random prompts when there are children.

  const randomPrompts = Array.from(
    { length: globalSetting.maxExportingRandomPrompts },
    () => patternCollection.pickOnePrompt(),
  );
  randomPrompts.sort();
  await writeFile(
    join(
      parentDir,
      `${key}-random-${globalSetting.maxExportingRandomPrompts}.txt`,
    ),
    randomPrompts.join(`\n`),
  );

  // Export 1 file at the same time to avoid the limit of the number of open files.
  for (const child of children) {
    await exportRecursively(child, join(parentDir, child.key));
  }

  return;
};

export const exportAsDynamicPrompts = async (
  patternDatas: ReturnType<typeof generatePatterns>,
) => {
  const outputsDir = `outputs` as const;
  await rm(outputsDir, { recursive: true, force: true });

  for (const patternData of patternDatas) {
    await exportRecursively(patternData, join(outputsDir, patternData.key));
  }

  return;
};
