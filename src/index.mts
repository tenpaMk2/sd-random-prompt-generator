import { exportAsDynamicPrompts } from "./exporter.mjs";
import { generatePatterns } from "./generator.mjs";
import { prepare } from "./prepare.mjs";
import { settings } from "./setting.mjs";

const generationDatas = prepare(settings);

console.log(generationDatas);

const p = generatePatterns(generationDatas);

console.log(p);

await exportAsDynamicPrompts(p);

console.log(p[0].patternCollection.pickOne().toPrompt());
