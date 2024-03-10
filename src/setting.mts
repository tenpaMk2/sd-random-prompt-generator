import { MachineSetting, Setting } from "./setting-define.mjs";

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
    fixedPrompt: `1girl, solo, masterpiece, best quality,\n`,
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
                poses: [{ key: `contrapposto` }, { key: `hands-on-own-hips` }],
              },
              {
                type: `from-below`,
                key: `blue-sky`,
                poses: [{ key: `upper-body` }],
              },
            ],
          },
          {
            key: `bikini`,
            weight: 10,
            backgrounds: [
              {
                type: `from-horizontal`,
                key: `indoors`,
                poses: [{ key: `contrapposto` }, { key: `hands-on-own-hips` }],
              },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies Setting[];

// const allFromHorizontalPoses = {
//   upperBody: {
//     key: `upper-body`,
//   },
//   contrapposto: {
//     key: `contrapposto`,
//   },
//   singing: {
//     key: `singing`,
//   },
// } as const;

// const allFromBelowPoses = {
//   cowboyShot: {
//     key: `cowboy-shot`,
//   },
//   cheering: {
//     key: `cheering`,
//   },
// } as const;

// const posePresets = {
//   fromHorizontal: {
//     all: allFromHorizontalPoses,
//     default: [
//       allFromHorizontalPoses.upperBody,
//       allFromHorizontalPoses.contrapposto,
//     ],
//   },
//   fromBelow: {
//     all: allFromBelowPoses,
//     default: [allFromBelowPoses.cowboyShot],
//   },
// } as const;

// const allFromHorizontalBackgrounds = {
//   classroom: {
//     type: `from-horizontal`,
//     key: `classroom`,
//     poses: posePresets.fromHorizontal.default,
//   },
//   karaokeBox: {
//     type: `from-horizontal`,
//     key: `karaoke-box`,
//     poses: [allFromHorizontalPoses.singing],
//   },
// } as const;

// const allFromBelowBackgrounds = {
//   ceiling: {
//     type: `from-below`,
//     key: `ceiling`,
//     poses: posePresets.fromBelow.default,
//   },
//   blueSky: {
//     type: `from-below`,
//     key: `blue-sky`,
//     poses: posePresets.fromBelow.default,
//   },
//   blueSkyConfetti: {
//     type: `from-below`,
//     key: `blue-sky-confetti`,
//     poses: [allFromBelowPoses.cheering],
//   },
// } as const;

// const allOutfits = {
//   bikini: {
//     key: `bikini`,
//     variation: `all`, // `all` or `frill` , `plain` , `ribbon` , `stripe` ...
//     backgrounds: [allFromBelowBackgrounds.blueSky],
//   },
//   cheerleader: {
//     key: `cheerleader`,
//     variation: undefined,
//     backgrounds: [allFromBelowBackgrounds.blueSky],
//   },
// };

// const outfitPresets = {
//   cosplayAll: [allOutfits.bikini, allOutfits.cheerleader],
// } as const;

// const hoge = {
//   key: `generation`,
//   characters: [
//     {
//       key: `shiba-miyuki-eft`,
//       outfits: [
//         {
//           key: `first-high-school-uniform`,
//           weight: 1,
//           variation: `miyuki`,
//           backgrounds: [
//             allFromHorizontalBackgrounds.classroom,
//             allFromBelowBackgrounds.blueSky,
//           ],
//         },
//         ...outfitPresets.cosplayAll,
//       ],
//     },
//   ],
// };
