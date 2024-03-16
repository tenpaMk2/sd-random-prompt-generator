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

// Export and generate image asynchronously at the same time.
const promises = [
  exportPrompts(p),
  exportAsCSV(join("outputs", "visibility.csv")),
  generateImage(p),
];
await Promise.all(promises);
