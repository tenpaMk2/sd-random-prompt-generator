import { OutfitDefine } from "../resolver.mjs";

export const kagejitsuShadowGarden = (variation: `nochekaiser`) =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `bodysuit`,
      `skin tight`,
      `black bodysuit`,
      `gold trim bodysuit`,
      `cleavage cutout`,
      `armor`,
      `gloves`,
      `black gloves`,
      `black footwear`,
      `covered navel`,
    ],
    specialVisibility: {
      armpits: false,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: false,
      backboob: false,
      underboobLevel: `invisible`,
      zettaiRyouiki: false,
      insideOfThighs: false,
    },
    liftType: `none`,
    upskirtEntries: [],
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
