import { GlobalSetting, MachineSetting, Setting } from "./setting-define.mjs";
import {
  checkpointAndVAEPreset,
  imageResolutionPreset,
} from "./setting-presets/root.mjs";
import { generateCharactersSetting } from "./setting-presets/utility.mjs";

export const globalSetting = {
  promptExportingBatchSize: 1000,
  maxExportingRandomPrompts: 1000,
} as const satisfies GlobalSetting;

export const machineSetting = {
  ip: `192.168.10.3`,
  port: 7860,
} as const satisfies MachineSetting;

export const settings = [
  {
    key: `all`,
    fixedPrompt: `score_9, score_8_up, score_7_up, rating_questionable, 1girl, solo,\n`,
    optionsBodyJson: {
      ...checkpointAndVAEPreset.sdxl.ebaraPony,
    },
    txt2imgBodyJson: {
      negative_prompt: `cameltoe, empty eyes, realistic`,
      sampler_name: `Euler a`,
      steps: 25,
      ...imageResolutionPreset.sdxl.landscape,
      cfg_scale: 5,
      denoising_strength: 0.2,
      enable_hr: true,
      hr_scale: 2,
      hr_upscaler: "4x-AnimeSharp",
      hr_second_pass_steps: 0,
    },
    characters: generateCharactersSetting({
      characterKeys: [`prisma-illya-chloe-beast-am7coffeelove`],
      outfitKeys: [`prisma-illya-chloe-beast`],
    }),
  },
] as const satisfies Setting[];
