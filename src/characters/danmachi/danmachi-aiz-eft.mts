import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const danmachiAizEft = () =>
  ({
    lora: {
      tag: `ais-danmachi`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`ais wallenstein`],
    seriesNameEntries: [
      `dungeon ni deai wo motomeru no wa machigatteiru darou ka`,
    ],
    characterNameEntries: [`aiz wallenstein`],
    characterFeatureEntries: [
      `yellow eyes`,
      `tsurime`,
      `blonde hair`,
      `long hair`,
      `straight hair`,
      `hair between eyes`,
      `sidelocks`,
      `thick thighs`,
    ],
    breastSize: `large breasts`,
    fang: false,
    emotionEntries: emotionPreset.deadpanned,
  }) as const satisfies CharacterDefine;
