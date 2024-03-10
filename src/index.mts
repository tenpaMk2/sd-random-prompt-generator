import { join } from "node:path";
import { exportAsDynamicPrompts } from "./exporter.mjs";
import { generatePatterns } from "./generators/generator.mjs";
import { prepare } from "./prepare.mjs";
import { settings } from "./setting.mjs";
import { exportAsCSV } from "./tag-defines/visibility.mjs";

const generationDatas = prepare(settings);

console.log(generationDatas);

const p = generatePatterns(generationDatas);

console.log(p);

await exportAsDynamicPrompts(p);
await exportAsCSV(join("outputs", "visibility.csv"));

console.log(p[0].patternCollection.pickOne().toPrompt());
