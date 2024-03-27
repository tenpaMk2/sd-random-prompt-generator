import { GlobalSetting, MachineSetting, Setting } from "./setting-define.mjs";
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
      sd_model_checkpoint: `ebara_pony_1.bakedVAE.safetensors [b6ce8a2bf8]`,
      sd_vae: `None`,
    },
    txt2imgBodyJson: {
      negative_prompt: `cameltoe`,
      sampler_name: `Euler a`,
      steps: 25,
      width: 864,
      height: 1152,
      cfg_scale: 5,
      denoising_strength: 0.2,
      enable_hr: true,
      hr_scale: 2,
      hr_upscaler: "4x-AnimeSharp",
      hr_second_pass_steps: 0,
    },
    characters: generateCharactersSetting({
      characterKeys: [`mahoako-matama-notekaga`],
      outfitKeys: `usual`,
    }),
  },
] as const satisfies Setting[];
