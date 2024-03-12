import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const toLoveRuYamiEft = () =>
  ({
    lora: {
      tag: `yami-loveru`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [],
    seriesNameEntries: [`to love-ru`, `to love-ru darkness`],
    characterNameEntries: [`konjiki no yami`],
    characterFeatureEntries: [
      `red eyes`,
      `tsurime`,
      `eyelashes`,
      `blonde hair`,
      `long hair`,
      `very long hair`,
      `two side up`,
      `hair intakes`,
      `sidelocks`,
      `hair ornament`,
    ],
    breastSize: `medium breasts`,
    emotionEntries: emotionPreset.serious,
  }) as const satisfies CharacterDefine;
