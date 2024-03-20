import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const danmachiHestiaEft = () =>
  ({
    lora: {
      tag: `hestia-danmachi`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`hestia`],
    seriesNameEntries: [
      `dungeon ni deai wo motomeru no wa machigatteiru darou ka`,
    ],
    characterNameEntries: [`hestia \\(danmachi\\)`],
    characterFeatureEntries: [
      `blue eyes`,
      `black hair`,
      `long hair`,
      `twintails`,
      `blunt bangs`,
      `sidelocks`,
      `ahoge`,
      `hair bow`,
      `white bow`,
      `thick thighs`,
    ],
    breastSize: `large breasts`,
    fang: false,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
