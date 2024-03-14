import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const saijakuYorukaEft = () =>
  ({
    lora: {
      tag: `yoruka-bahamut-01`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`yoruka kirihime`],
    seriesNameEntries: [`saijaku muhai no bahamut`],
    characterNameEntries: [`kirihime yoruka`],
    characterFeatureEntries: [
      `blue eyes`,
      `purple eyes`,
      `heterocromia`,
      `tsurime`,
      `black hair`,
      `long hair`,
      `hair over shoulder`,
      `hair between eyes`,
      `sidelocks`,
      `low tied sidelocks`,
      `hair ribbon`,
      `red ribbon`,
      `thick thighs`,
      `wide hips`,
    ],
    breastSize: `large breasts`,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
