import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const toLoveRuLalaEft = () =>
  ({
    lora: {
      tag: `lala-loveru`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [], // TODO: Should set `lala satalin deviluke` ?
    seriesNameEntries: [`to love-ru`, `to love-ru darkness`],
    characterNameEntries: [`lala satalin deviluke`],
    characterFeatureEntries: [
      `green eyes`,
      `eyelashes`,
      `pink hair`,
      `long hair`,
      `straight hair`,
      `ahoge`,
      `hair ornament`,
      `thick thighs`,
      `tail`,
      `demon tail`,
    ],
    breastSize: `large breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
