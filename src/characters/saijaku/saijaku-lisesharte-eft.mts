import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const saijakuLisesharteEft = () =>
  ({
    lora: {
      tag: `lisesharte-bahamut-01`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [],
    seriesNameEntries: [`saijaku muhai no bahamut`],
    characterNameEntries: [`lisesharte atismata`],
    characterFeatureEntries: [
      `red eyes`,
      `tsurime`,
      `blonde hair`,
      `long hair`,
      `side ponytail`,
      `hair between eyes`,
      `hair ribbon`,
      `black hair ribbon`,
    ],
    breastSize: `large breasts`,
    fang: false,
    emotionEntries: emotionPreset.cute,
  }) as const satisfies CharacterDefine;
