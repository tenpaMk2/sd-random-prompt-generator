import { CharacterKey, characterTable } from "./characters/resolver.mjs";
import { getKeys } from "./libs/utility.mjs";
import {
  CharacterSetting,
  OutfitSetting,
  PoseSetting,
} from "./setting-define.mjs";

const fromHorizontalPosesPreset = {
  usual: [
    { key: `portrait` },
    { key: `contrapposto` },
    { key: `hands-on-own-hips` },
    { key: `v` },
    { key: `double-v` },
    { key: `arms-up` },
    { key: `heart-hands` },
    { key: `cowboy-shot-from-side` },
    { key: `twisted-torso` },
  ],
} as const satisfies {
  [k in string]: PoseSetting<"from-horizontal">[];
};

export const outfitsPreset = {
  usual: [
    {
      key: `bikini`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `ocean`,
          poses: fromHorizontalPosesPreset.usual,
        },
        {
          type: `from-horizontal`,
          key: `ocean-beach`,
          poses: fromHorizontalPosesPreset.usual,
        },
      ],
    },
    {
      key: `micro-bikini`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `ocean`,
          poses: fromHorizontalPosesPreset.usual,
        },
        {
          type: `from-horizontal`,
          key: `ocean-beach`,
          poses: fromHorizontalPosesPreset.usual,
        },
      ],
    },
    {
      key: `maid-bikini`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `cafe-window`,
          poses: fromHorizontalPosesPreset.usual,
        },
      ],
    },
    {
      key: `revealing-miko`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `colorful-backgrounds`,
          poses: fromHorizontalPosesPreset.usual,
        },
      ],
    },
    {
      key: `cheerleader`,
      backgrounds: [
        {
          type: `from-below`,
          key: `blue-sky-confetti`,
          poses: [{ key: `cheering with pom poms` }],
        },
      ],
    },
  ],
} as const satisfies {
  [k in string]: OutfitSetting[];
};

export const charactersPreset = {
  all: getKeys(characterTable).map((key) => ({
    key,
    outfits: [...outfitsPreset.usual],
  })),
} as const satisfies {
  [k in string]: CharacterSetting[];
};
