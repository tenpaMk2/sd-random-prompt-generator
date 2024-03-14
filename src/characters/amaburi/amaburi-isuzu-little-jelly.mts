import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const amaburiIsuzuLittleJelly = () =>
  ({
    lora: {
      tag: `AmagiBrilliantPark_SentoIsuzu`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [],
    seriesNameEntries: [`amagi brilliant park`],
    characterNameEntries: [`sento isuzu`],
    characterFeatureEntries: [
      `brown eyes`,
      `brown hair`,
      `long hair`,
      `ponytail`,
      `hair between eyes`,
      `hair intakes`,
      `sidelocks`,
      `antenna hair`,
      `hair bow`,
      `white bow`,
      `thick thighs`,
    ],
    breastSize: `large breasts`,
    emotionEntries: emotionPreset.serious,
  }) as const satisfies CharacterDefine;
