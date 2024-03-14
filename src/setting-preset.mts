import { CharacterKey, characterTable } from "./characters/resolver.mjs";
import { getKeys } from "./libs/utility.mjs";
import { CharacterSetting, OutfitSetting } from "./setting-define.mjs";

export const outfitsPreset = {
  usual: [
    {
      key: `bikini`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `ocean`,
          poses: [
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
        },
        {
          type: `from-horizontal`,
          key: `ocean-beach`,
          poses: [
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
        },
      ],
    },
    {
      key: `micro-bikini`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `ocean`,
          poses: [
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
        },
        {
          type: `from-horizontal`,
          key: `ocean-beach`,
          poses: [
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
        },
      ],
    },
    {
      key: `maid-bikini`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `cafe-window`,
          poses: [
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
        },
      ],
    },
    {
      key: `revealing-miko`,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `colorful-backgrounds`,
          poses: [
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
