import { BackgroundType } from "./backgrounds/resolver.mjs";
import { CharacterKey, characterTable } from "./characters/resolver.mjs";
import { getKeys } from "./libs/utility.mjs";
import { OutfitKey } from "./outfits/resolver.mjs";
import {
  BackgroundSetting,
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
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }],
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
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }],
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
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }],
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
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }],
    },
  ],
} as const satisfies OutfitSetting;

export const outfitsPreset = {
  [testOutfit.key]: [testOutfit],
  [bikini.key]: [bikini],
  [microBikini.key]: [microBikini],
  [maidBikini.key]: [maidBikini],
  [revealingMiko.key]: [revealingMiko],
  [cheerleader.key]: [cheerleader],
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

/**
 * Define unique key for the pair of backgrounds and poses.
 */
type BackgroundAndPoseKey =
  | `from-above-bed-sheet-lying-on-bed`
  | `from-above-bed-sheet-full-body-lying`;

export const generateSetting = ({
  characterKeys,
  outfitKeys,
  backgroundAndPoseKeys,
}: {
  characterKeys: CharacterKey[] | `all`;
  outfitKeys: OutfitKey[] | `usual`;
  backgroundAndPoseKeys?: BackgroundAndPoseKey[];
}) => {
  const cKeys =
    characterKeys === `all` ? getKeys(characterTable) : characterKeys;
  const characterSettings = cKeys.map((cKey) => {
    if (outfitKeys === `usual`)
      return {
        key: cKey,
        outfits: [...outfitsPreset.usual],
      };

    if (!backgroundAndPoseKeys) {
      const outfits = outfitKeys.map((oKeys) => outfitsPreset[oKeys]);

      return {
        key: cKey,
        outfits,
      };
    }

    const outfits = outfitKeys.map((oKey) => {
      const backgrounds = backgroundAndPoseKeys.map(
        (backgroundAndPoseKey): BackgroundSetting<BackgroundType> => {
          switch (backgroundAndPoseKey) {
            case `from-above-bed-sheet-lying-on-bed`:
              return {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `lying-on-bed` }],
              };
            case `from-above-bed-sheet-full-body-lying`:
              return {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `full-body-lying` }],
              };
          }
        },
      );

      return {
        key: oKey,
        backgrounds,
      };
    });

    return {
      key: cKey,
      outfits,
    };
  });

  return characterSettings;
};
