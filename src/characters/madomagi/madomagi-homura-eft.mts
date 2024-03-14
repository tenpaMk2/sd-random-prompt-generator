import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const madomagiHomuraEft = () =>
  ({
    lora: {
      tag: `homura-madomagi-01`,
      probabilityAndWeights: [
        { probability: 1, weight: 0.8 },
        { probability: 1, weight: 0.6 },
      ],
    },
    loraCharacterTriggerWordEntries: [`homura akemi`],
    seriesNameEntries: [`mahou shoujo madoka magica`],
    characterNameEntries: [`akemi homura`],
    characterFeatureEntries: [
      `purple eyes`,
      `tsurime`,
      `black hair`,
      `long hair`,
      `straight hair`,
      `hairband`,
      `black hairband`,
    ],
    breastSize: `small breasts`,
    emotionEntries: emotionPreset.serious,
  }) as const satisfies CharacterDefine;
