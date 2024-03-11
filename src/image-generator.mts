import { generatePatterns } from "./prompt-generators/common.mjs";
import { PatternCollection } from "./prompt-define.mjs";
import { Setting } from "./setting-define.mjs";
import { machineSetting } from "./setting.mjs";
import { Tag } from "./tag-defines/all.mjs";

const generateEachImage = async (
  fixedPrompt: string,
  txt2imgBodyJson: Setting["txt2imgBodyJson"],
  patternCollection: PatternCollection<Tag>,
) => {
  const json = {
    prompt: fixedPrompt + patternCollection.pickOne().toPrompt(),
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
  console.log((await generationResponse.json()).info);
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

  for (let i = 0; i < 300; i++) {
    await generateEachImage(
      root.fixedPrompt,
      root.txt2imgBodyJson,
      root.patternCollection,
    );
  }
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
    console.table({
      progress: json.progress,
      eta_relative: json.eta_relative,
    });
  }, 10000);

export const generateImage = async (
  settings: ReturnType<typeof generatePatterns>,
) => {
  const intervalID = startStatusPolling();
  for (const setting of settings) {
    await generateRoot(setting);
  }
  clearInterval(intervalID);
};
