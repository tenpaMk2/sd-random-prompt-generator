import { GlobalSetting, MachineSetting, Setting } from "./setting-define.mjs";
import {
  charactersPreset,
  generateSetting,
  outfitsPreset,
} from "./setting-preset.mjs";

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
    // TODO: Adaptive negative prompts architecture.
    // TODO: setting generator for all characters and the fix outfit.
    fixedPrompt: `1girl, solo, masterpiece, best quality, megami magazine,\n`,
    optionsBodyJson: {
      sd_model_checkpoint: `vividorangemix_v10.safetensors [ff4725f91c]`,
      sd_vae: `blessed2.vae.safetensors`,
    },
    txt2imgBodyJson: {
      negative_prompt: `verybadimagenegative_v1.3, (cameltoe, empty eyes, black background:1.5)`,
      sampler_name: `Restart`,
      width: 512,
      height: 768,
      denoising_strength: 0.4,
      enable_hr: true,
      hr_scale: 2.5,
      hr_upscaler: "4x-AnimeSharp",
      hr_second_pass_steps: 30,
    },
    characters: generateSetting({
      characterKeys: [`danmachi-eina-eft`],
      outfitKeys: `usual`,
    }),
  },
] as const satisfies Setting[];
