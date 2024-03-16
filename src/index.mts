import { join } from "node:path";
import { exportPrompts } from "./exporter.mjs";
import { generatePatterns } from "./prompt-generators/common.mjs";
import { prepare } from "./prepare.mjs";
import { settings } from "./setting.mjs";
import { exportAsCSV } from "./tag-defines/visibility.mjs";
import { generateImage } from "./image-generator.mjs";

const generationDatas = prepare(settings);

console.log(generationDatas);

const p = generatePatterns(generationDatas);

console.log(p);

await exportPrompts(p);
await exportAsCSV(join("outputs", "visibility.csv"));

console.log(p[0].patternCollection.pickOnePrompt());

generateImage(p);
