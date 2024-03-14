import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const dumbbellGinaWiz = () =>
  ({
    lora: {
      tag: `eft_dumbell_white`,
      probabilityAndWeights: [{ probability: 1, weight: 0.7 }],
    },
    loraCharacterTriggerWordEntries: [`eft_dumbbell_white`],
    seriesNameEntries: [`dumbbell nan kilo moteru?`],
    characterNameEntries: [`gina boyd`],
    characterFeatureEntries: [
      `blue eyes`,
      `tsurime`,
      `eyelashes`,
      `grey hair`,
      `short hair`,
      `bob cut`,
      `blunt bangs`,
      `blunt ends`,
      `toned`,
    ],
    breastSize: `medium breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
