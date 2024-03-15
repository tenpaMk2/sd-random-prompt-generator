import { OutfitDefine } from "../resolver.mjs";
import { upskirtPreset } from "./upskirt-preset.mts";

export const cheerleader = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `cheerleader`,
      `sleeveless`,
      `crop top`,
      `crop top overhang`,
      `skirt`,
      `miniskirt`,
      `pleated skirt`,
      [
        { entries: [`blue shirt`, `blue skirt`] },
        { entries: [`red shirt`, `red skirt`] },
        { entries: [`yellow shirt`, `yellow skirt`] },
        { entries: [`orange shirt`, `orange skirt`] },
        { entries: [`white shirt`, `white skirt`] },
      ],
      `sweat`,
      `shiny skin`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: false,
      backboob: true,
      underboobLevel: `only from below`,
      zettaiRyouiki: true,
      insideOfThighs: true,
    },
    liftType: `skirt`,
    upskirtEntries: upskirtPreset.vividPanties,
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
