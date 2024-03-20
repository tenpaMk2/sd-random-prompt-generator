import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const sasuoniErikaEft = () =>
  ({
    lora: {
      tag: `erika-mahouka`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`erika chiba`],
    seriesNameEntries: [`mahouka koukou no rettousei`],
    characterNameEntries: [`chiba erika`],
    characterFeatureEntries: [
      `red eyes`,
      `tsurime`,
      `red hair`,
      `short hair`,
      `messy hair`,
      `ponytail`,
      `short ponytail`,
    ],
    breastSize: `medium breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
