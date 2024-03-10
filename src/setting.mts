import { BackgroundKey, BackgroundType } from "./backgrounds/resolver.mjs";
import { CharacterKey } from "./characters/resolver.mjs";
import { OutfitKey } from "./outfits/resolver.mjs";
import { PoseKey } from "./poses/resolver.mjs";

export type BackgroundSetting<T extends BackgroundType> = Readonly<{
  type: T;
  key: BackgroundKey[T];
  weight?: number;
  poses: {
    key: PoseKey[T];
    weight?: number;
  }[];
}>;

type OutfitSetting = Readonly<{
  key: OutfitKey;
  weight?: number;
  backgrounds: (
    | BackgroundSetting<`from-horizontal`>
    | BackgroundSetting<`from-below`>
  )[];
}>;

type CharacterSetting = Readonly<{
  key: CharacterKey;
  weight?: number;
  outfits: OutfitSetting[];
}>;

export type Setting = Readonly<{
  key: string; // Generation name.
  weight?: number;
  characters: CharacterSetting[];
}>;

export const settings = [
  {
    key: `sasuoni`,
    // TODO: Model, VAE, width, height, ...
    // TODO: Negative prompts architecture.
    // TODO: presets.
    // TODO: setting generator for all characters and the fix outfit.
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
                poses: [{ key: `contrapposto` }],
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
                poses: [{ key: `contrapposto` }],
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
