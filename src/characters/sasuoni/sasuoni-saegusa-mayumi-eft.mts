import { CharacterDefine } from "../resolver.mjs";

export const sasuoniSaegusaMayumiEft = () =>
  ({
    lora: {
      tag: `mayumi-mahouka`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`mayumi saegusa`],
    seriesNameEntries: [`mahouka koukou no rettousei`],
    characterNameEntries: [`saegusa mayumi`],
    characterFeatureEntries: [
      `red eyes`,
      `tareme`,
      `black hair`,
      `long hair`,
      `wavy hair`,
      `curtained bangs`,
      `sidelocks`,
      `hair bow`,
      `white bow`,
      `forehead`,
    ],
    breastSize: `large breasts`,
    emotionEntries: [`smile`],
  }) as const satisfies CharacterDefine;