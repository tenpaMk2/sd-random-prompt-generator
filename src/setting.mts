import { MachineSetting, Setting } from "./setting-define.mjs";
import { outfitsPreset } from "./setting-preset.mjs";

export const machineSetting = {
  ip: `192.168.10.3`,
  port: 7860,
} as const satisfies MachineSetting;

export const settings = [
  {
    key: `sasuoni`,
    // TODO: Adaptive negative prompts architecture.
    // TODO: presets.
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
    characters: [
      {
        key: `sasuoni-shiba-miyuki-eft`,
        outfits: [
          {
            key: `sasuoni-eft-first-high-school-uniform`,
            backgrounds: [
              {
                type: `from-horizontal`,
                key: `cafe`,
                poses: [{ key: `hands-on-own-hips` }],
              },
              {
                type: `from-below`,
                key: `blue-sky`,
                poses: [{ key: `upper-body` }],
              },
            ],
          },
          ...outfitsPreset.usual,
        ],
      },
      {
        key: `sasuoni-saegusa-mayumi-eft`,
        outfits: [...outfitsPreset.usual],
      },
    ],
  },
] as const satisfies Setting[];
