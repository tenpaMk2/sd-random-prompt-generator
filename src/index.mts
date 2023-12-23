import { cecilia } from "./chara-defines.mjs";
import { generateDynamicPrompt } from "./libs/utility.mjs";
import { parse } from "./parser.mjs";
import { posePromptGenerators } from "./poses.mjs";

const eachVisibleTokenInfos = parse(cecilia);
const result = generateDynamicPrompt(
  eachVisibleTokenInfos.map((info) =>
    generateDynamicPrompt(
      posePromptGenerators.map((promptGenerator) => promptGenerator(info)),
    ),
  ),
  { lineBreak: true },
);
console.log(result);
