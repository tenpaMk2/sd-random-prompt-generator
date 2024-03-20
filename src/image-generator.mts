import { generatePatterns } from "./prompt-generators/common.mjs";
import { PatternCollection } from "./prompt-define.mjs";
import { Setting } from "./setting-define.mjs";
import { machineSetting } from "./setting.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { LoraNameTag } from "./tag-defines/lora.mjs";

// TODO: Rename to `parser` , `gatherer` , `builder` , `generator` .

const generateEachImage = async (
  fixedPrompt: string,
  txt2imgBodyJson: Setting["txt2imgBodyJson"],
  patternCollection: PatternCollection<Tag | LoraNameTag>,
) => {
  const json = {
    prompt: fixedPrompt + patternCollection.pickOnePrompt(),
    seed: -1,
    batch_size: 1,
    steps: 40,
    cfg_scale: 5,
    send_images: false,
    save_images: true,
    alwayson_scripts: {
      cutoff: {
        args: [
          true,
          "red,pink,orange,yellow,green,blue,purple,black,white,brown,grey,blonde",
          1.5,
          false,
          false,
          "",
          "Lerp",
          true,
        ],
      },
    },
    ...txt2imgBodyJson,
  };

  const generationResponse = await fetch(
    `http://${machineSetting.ip}:${machineSetting.port}/sdapi/v1/txt2img`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    },
  );
  const resultJson = await generationResponse.json();
  const infoJson = JSON.parse(resultJson.info);
  console.log(infoJson);
};

const generateRoot = async (
  root: ReturnType<typeof generatePatterns>[number],
) => {
  const json = {
    outdir_txt2img_samples: "outputs/",
    do_not_show_images: true,
    live_previews_enable: false,
    ...root.optionsBodyJson,
  };

  // console.time("Option setting elapsed time");
  const optionsResponse = await fetch(
    `http://${machineSetting.ip}:${machineSetting.port}/sdapi/v1/options`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    },
  );
  // console.table(await optionsResponse.json());
  // console.timeEnd("Option setting elapsed time");

  // for (let i = 0; i < 1000; i++) {
  while (true) {
    // console.time("Each generation elapsed time");
    await generateEachImage(
      root.fixedPrompt,
      root.txt2imgBodyJson,
      root.patternCollection,
    );
    // console.timeEnd("Each generation elapsed time");
  }
};

const displayProgress = async (progress: number, eta: number) => {
  const etaSecond = `${Math.floor(eta)}`.padStart(4, ` `);
  const barPole = `=`.repeat(Math.floor(progress * 20));
  const barContent = `${barPole}>`.padEnd(20, ` `);
  const bar = `[${barContent}]`;
  const percentage = `${Math.floor(progress * 100)}`.padStart(3, ` `);
  console.log(`${etaSecond} s: ${bar} ${percentage}%`);
};

const startStatusPolling = () =>
  setInterval(async () => {
    const response = await fetch(
      `http://${machineSetting.ip}:${machineSetting.port}/sdapi/v1/progress`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const json = await response.json();
    displayProgress(json.progress, json.eta_relative);
  }, 10000);

export const generateImage = async (
  settings: ReturnType<typeof generatePatterns>,
) => {
  console.log("Generating images...");

  const intervalID = startStatusPolling();
  for (const setting of settings) {
    await generateRoot(setting);
  }
  clearInterval(intervalID);
};
