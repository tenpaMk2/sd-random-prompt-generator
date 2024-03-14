import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const dumbbellHibikiWiz = () =>
  ({
    lora: {
      tag: `eft_dumbell_blonde`,
      probabilityAndWeights: [{ probability: 1, weight: 0.7 }],
    },
    loraCharacterTriggerWordEntries: [`eft_dumbbell_blonde`],
    seriesNameEntries: [`dumbbell nan kilo moteru?`],
    characterNameEntries: [`sakura hibiki`],
    characterFeatureEntries: [
      `green eyes`,
      `tsurime`,
      `eyelashes`,
      `blonde hair`,
      `long hair`,
      `twintails`,
      `hair between eyes`,
      `sidelocks`,
      `gyaru`,
      `thick thighs`,
      `wide hips`,
      `tan`,
    ],
    breastSize: `large breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
