import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const toLoveRuYuiEft = () =>
  ({
    lora: {
      tag: `yui-loveru`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`yui kotegawa`],
    seriesNameEntries: [`to love-ru`, `to love-ru darkness`],
    characterNameEntries: [`kotegawa yui`],
    characterFeatureEntries: [
      `yellow eyes`,
      `tsurime`,
      `black hair`,
      `long hair`,
      `straight hair`,
      `sidelocks`,
      `thick thighs`,
    ],
    breastSize: `large breasts`,
    fang: false,
    emotionEntries: emotionPreset.uptight,
  }) as const satisfies CharacterDefine;
