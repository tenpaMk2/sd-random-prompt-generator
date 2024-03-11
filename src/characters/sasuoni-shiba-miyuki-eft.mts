import { CharacterDefine } from "./resolver.mjs";

export const sasuoniShibaMiyukiEft = () =>
  ({
    lora: {
      tag: `miyuki-mahouka`,
      probabilityAndWeights: [{ probability: 1, weight: 0.8 }],
    },
    loraCharacterTriggerWordEntries: [`miyuki shiba`],
    seriesNameEntries: [`mahouka koukou no rettousei`],
    characterNameEntries: [`shiba miyuki`],
    characterFeatureEntries: [
      `black eyes`,
      `blue eyes`,
      `tsurime`,
      `eyelashes`,
      `black hair`,
      `long hair`,
      `hime cut`,
      `straight hair`,
      `blunt bangs`,
      `blunt ends`,
      `sidelocks`,
      `hair ornament`,
      `snowflake hair ornament`,
      `tress ribbon`,
    ],
    breastSize: `large breasts`,
    emotionEntries: [`smile`],
  }) as const satisfies CharacterDefine;
