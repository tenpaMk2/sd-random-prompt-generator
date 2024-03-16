import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { generatePatterns } from "./prompt-generators/common.mjs";
import { PatternCollection } from "./prompt-define.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { LoraNameTag } from "./tag-defines/lora.mjs";
import { globalSetting } from "./setting.mts";
import { exportArray, exportAsDynamicPrompts } from "./libs/utility.mts";

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

  if (children.length === 0) {
    // Export all prompts only when there are no children.
    return Promise.all([
      exportArray(
        join(parentDir, `${key}-all.txt`),
        patternCollection.pickAllPrompts(),
      ),
      exportAsDynamicPrompts(
        join(parentDir, `${key}-all-dynamic-prompts.txt`),
        patternCollection.pickAllPrompts(),
      ),
    ]);
  }
  // Export random prompts when there are children.

  const randomPrompts = Array.from(
    { length: globalSetting.maxExportingRandomPrompts },
    () => patternCollection.pickOnePrompt(),
  );
  randomPrompts.sort();
  await Promise.all([
    exportArray(
      join(
        parentDir,
        `${key}-random-${globalSetting.maxExportingRandomPrompts}.txt`,
      ),
      randomPrompts,
    ),
    exportAsDynamicPrompts(
      join(
        parentDir,
        `${key}-random-${globalSetting.maxExportingRandomPrompts}-dynamic-prompts.txt`,
      ),
      randomPrompts,
    ),
  ]);

  // Export 1 file at the same time to avoid the limit of the number of open files.
  for (const child of children) {
    await exportRecursively(child, join(parentDir, child.key));
  }

  return;
};

export const exportPrompts = async (
  patternDatas: ReturnType<typeof generatePatterns>,
) => {
  const outputsDir = `outputs` as const;
  await rm(outputsDir, { recursive: true, force: true });

  for (const patternData of patternDatas) {
    await exportRecursively(patternData, join(outputsDir, patternData.key));
  }

  return;
};
