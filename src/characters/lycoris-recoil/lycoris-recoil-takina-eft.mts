import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const lycorisRecoilTakinaEft = () =>
  ({
    lora: {
      tag: `takina-lycoreco-01`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`takina inoue`],
    seriesNameEntries: [`lycoris recoil`],
    characterNameEntries: [`inoue takina`],
    characterFeatureEntries: [
      `purple eyes`,
      `tsurime`,
      `black hair`,
      `long hair`,
      `straight hair`,
      `sidelocks`,
    ],
    breastSize: `medium breasts`,
    emotionEntries: emotionPreset.serious,
  }) as const satisfies CharacterDefine;
