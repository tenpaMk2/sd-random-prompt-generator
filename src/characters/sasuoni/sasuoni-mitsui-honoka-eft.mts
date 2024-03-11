import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const sasuoniMitsuiHonokaEft = () =>
  ({
    lora: {
      tag: `honoka-mahouka`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`honoka mitsui`],
    seriesNameEntries: [`mahouka koukou no rettousei`],
    characterNameEntries: [`mitsui honoka`],
    characterFeatureEntries: [
      `purple eyes`,
      `brown hair`,
      `medium hair`,
      `twintails`,
      `low twintails`,
      `short twintails`,
      `swept bangs`,
    ],
    breastSize: `large breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
