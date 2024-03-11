import { OutfitSetting } from "./setting-define.mjs";

export const outfitsPreset = {
  usual: [
    {
      key: `bikini`,
      weight: 10,
      backgrounds: [
        {
          type: `from-horizontal`,
          key: `ocean`,
          poses: [
            { key: `portrait` },
            { key: `hands-on-own-hips` },
            { key: `contrapposto` },
            { key: `twisted-torso` },
            { key: `cowboy-shot-from-side` },
          ],
        },
        {
          type: `from-horizontal`,
          key: `ocean-beach`,
          poses: [
            { key: `hands-on-own-hips` },
            { key: `contrapposto` },
            { key: `twisted-torso` },
          ],
        },
      ],
    },
  ],
} as const satisfies {
  [k in string]: OutfitSetting[];
};
