import { emotionPreset } from "../emotion-preset.mjs";
import { CharacterDefine } from "../resolver.mjs";

export const reZeroRamEft = () =>
  ({
    lora: {
      tag: `ram-rezero-01`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`ram`],
    seriesNameEntries: [`re:zero kara hajimeru isekai seikatsu`],
    characterNameEntries: [`ram \\(re:zero\\)`],
    characterFeatureEntries: [
      `red eyes`,
      `tsurime`,
      `pink hair`,
      `short hair`,
      `hair over one eye`,
      `hair ornament`,
      `x hair ornament`,
      `flower knot`,
    ],
    breastSize: `small breasts`,
    emotionEntries: emotionPreset.serious,
  }) as const satisfies CharacterDefine;
