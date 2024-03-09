import { generatePatterns } from "./generator.mjs";
import { prepare } from "./prepare.mjs";
import { settings } from "./setting.mjs";

const generationDatas = prepare(settings);

console.log(generationDatas);

const p = generatePatterns(generationDatas);

console.log(p);
console.log(p);

while (true) {
  console.log(p[0].patternCollection.pickOne().toPrompt());
}
