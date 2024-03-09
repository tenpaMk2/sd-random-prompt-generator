import { writeFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { generatePatterns } from "./generator.mjs";
import { PatternCollection } from "./prompt-define.mjs";
import { Tag } from "./tag-defines/all.mjs";

type Tree = {
  key: string;
  patternCollection: PatternCollection<Tag>;
  children: Tree[];
};

const exportRecursively = async (
  { key, patternCollection, children }: Tree,
  parentDir: string,
): Promise<unknown> => {
  console.log(`exporting...: ${parentDir}`);

  await mkdir(parentDir, { recursive: true });

  const promises = [
    writeFile(join(parentDir, `${key}.txt`), patternCollection.toString()),
    children.map((child) =>
      exportRecursively(child, join(parentDir, child.key)),
    ),
  ];

  return Promise.all(promises);
};

export const exportAsDynamicPrompts = async (
  patternDatas: ReturnType<typeof generatePatterns>,
) => {
  const outputsDir = `outputs` as const;
  await rm(outputsDir, { recursive: true, force: true });

  const promises = patternDatas.map((patternData) =>
    exportRecursively(patternData, join(outputsDir, patternData.key)),
  );

  return Promise.all(promises);
};
