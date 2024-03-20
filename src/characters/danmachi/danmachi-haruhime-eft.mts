import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const danmachiHaruhimeEft = () =>
  ({
    lora: {
      tag: `haruhime-danmachi`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`haruhime sanjouno`],
    seriesNameEntries: [
      `dungeon ni deai wo motomeru no wa machigatteiru darou ka`,
    ],
    characterNameEntries: [`sanjouno haruhime`],
    characterFeatureEntries: [
      `green eyes`,
      `eyelashes`,
      `blonde hair`,
      `long hair`,
      `straight hair`,
      `blunt bangs`,
      `blunt ends`,
      `sidelocks`,
      `ahoge`,
      `animal ears`,
      `fox girl`,
      `fox ears`,
      `tail`,
      `fox tail`,
      `wide hips`,
      `thick thighs`,
    ],
    breastSize: `large breasts`,
    fang: false,
    emotionEntries: emotionPreset.serious,
  }) as const satisfies CharacterDefine;
