import { OutfitDefine } from "../resolver.mjs";

export const revealingMiko = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `revealing clothes`,
      `miko`,
      `nontraditional miko`,
      `collarbone`,
      `hakama`,
      `detached sleeves`,
      `white sleeves`,
      `hakama skirt`,
      `hip vent`,
      // `thighhighs`,
      // `white thighhighs`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: true,
      backboob: true,
      underboobLevel: `invisible`,
      zettaiRyouiki: false,
      insideOfThighs: true,
    },
    liftType: `skirt`,
    upskirtEntries: [], // TODO
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;