import { cecilia } from "./chara-defines.mjs";
import { generateDynamicPrompt } from "./libs/utility.mjs";
import { parse } from "./parser.mjs";
import { posePromptGenerators } from "./poses.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const eachVisibleTokenInfos = parse(cecilia);

const prompts = eachVisibleTokenInfos.map((info) =>
  generateDynamicPrompt(
    posePromptGenerators.map((promptGenerator) => promptGenerator(info)),
  ),
);

const outputsDir = join(`outputs`);
await mkdir(outputsDir, { recursive: true });

const promises = prompts.map((p, index) =>
  writeFile(join(outputsDir, `${index}.txt`), p),
);
Promise.all(promises);

const all = generateDynamicPrompt(prompts, { lineBreak: true });
console.log(all);
await writeFile(join(outputsDir, `all.txt`), all);
