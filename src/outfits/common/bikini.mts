import { OutfitDefine } from "../resolver.mjs";

export const bikini = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: null,
    outfitAndExposureEntries: [
      `bikini`,
      `skindentation`,
      `collarbone`,
      `shoulder blades`,
      `navel`,
      `bare arms`,
      `bare legs`,
      `barefoot`,
    ],
    visibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: true,
      backboob: true,
      underboobLevel: `only from below`,
      zettaiRyouiki: false,
      insideOfThighs: true,
    },
    liftType: `none`,
    upskirtEntries: null,
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
