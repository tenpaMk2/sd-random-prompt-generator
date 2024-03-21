import { join } from "node:path";
import { exportPrompts } from "./exporter.mjs";
import { build } from "./prompt-generators/common.mjs";
import { collect } from "./collector.mjs";
import { settings } from "./setting.mjs";
import { exportAsCSV } from "./tag-defines/visibility.mjs";
import { generate } from "./generator.mjs";

console.time(`Prompt build`);

const collectedDatas = collect(settings);

console.log(collectedDatas);

const generationDatas = build(collectedDatas);

console.log(generationDatas);
console.timeEnd(`Prompt build`);

// Export and generate image asynchronously at the same time.
const promises = [
  exportPrompts(generationDatas),
  exportAsCSV(join("outputs", "visibility.csv")),
  generate(generationDatas),
];
await Promise.all(promises);

// TODO: TS test emvironment.
