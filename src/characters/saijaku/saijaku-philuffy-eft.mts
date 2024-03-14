import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const saijakuPhiluffyEft = () =>
  ({
    lora: {
      tag: `philuffy-bahamut-01`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [],
    seriesNameEntries: [`saijaku muhai no bahamut`],
    characterNameEntries: [`philuffy aingram`],
    characterFeatureEntries: [
      `yellow eyes`,
      `tareme`,
      `pink hair`,
      `medium hair`,
      `twintails`,
      `short twintails`,
      `swept bangs`,
      `sidelocks`,
      `ahoge`,
      `hair bow`,
      `black bow`,
      `thick thighs`,
      `wide hips`,
    ],
    breastSize: `large breasts`,
    emotionEntries: emotionPreset.cute, // TODO: sleepy
  }) as const satisfies CharacterDefine;
