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

const testOutfit = {
  key: `test-outfit`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: [{ key: `arms-up` }, { key: `portrait` }],
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }, { key: `full-body-lying` }],
    },
  ],
} as const satisfies OutfitSetting;

const bikini = {
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
} as const satisfies OutfitSetting;

const microBikini = {
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
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }],
    },
  ],
} as const satisfies OutfitSetting;

const maidBikini = {
  key: `maid-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `cafe-window`,
      poses: fromHorizontalPosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const revealingMiko = {
  key: `revealing-miko`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const cheerleader = {
  key: `cheerleader`,
  backgrounds: [
    {
      type: `from-below`,
      key: `blue-sky-confetti`,
      poses: [{ key: `cheering-with-pom-poms` }],
    },
  ],
} as const satisfies OutfitSetting;

export const outfitsPreset = {
  testOutfit: [testOutfit],
  bikini: [bikini],
  microBikini: [microBikini],
  maidBikini: [maidBikini],
  revealingMiko: [revealingMiko],
  cheerleader: [cheerleader],
  usual: [bikini, microBikini, maidBikini, revealingMiko, cheerleader],
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
