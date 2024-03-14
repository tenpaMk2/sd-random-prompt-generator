import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const madomagiMadokaEft = () =>
  ({
    lora: {
      tag: `madoka-madomagi-01`,
      probabilityAndWeights: [
        { probability: 1, weight: 0.8 },
        { probability: 1, weight: 0.6 },
      ],
    },
    loraCharacterTriggerWordEntries: [`homura akemi`],
    seriesNameEntries: [`mahou shoujo madoka magica`],
    characterNameEntries: [`akemi homura`],
    characterFeatureEntries: [
      `pink eyes`,
      `tareme`,
      `pink hair`,
      `short hair`,
      `twintails`,
      `short twintails`,
      `hair ribbon`,
      `red ribbon`,
    ],
    breastSize: `medium breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
