import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const sasuoniShizukuEft = () =>
  ({
    lora: {
      tag: `shizuku-mahouka`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`shizuku kitayama`],
    seriesNameEntries: [`mahouka koukou no rettousei`],
    characterNameEntries: [`kitayama shizuku`],
    characterFeatureEntries: [
      `purple eyes`,
      `jitome`,
      `black hair`,
      `short hair`,
      `messy hair`,
      `short hair with long locks`,
      `sidelocks`,
    ],
    breastSize: `small breasts`,
    emotionEntries: emotionPreset.deadpanned,
  }) as const satisfies CharacterDefine;
