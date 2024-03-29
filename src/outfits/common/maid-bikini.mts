import { OutfitDefine } from "../resolver.mjs";
import { upskirtPreset } from "./upskirt-preset.mjs";

export const maidBikini = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `maid`,
      `maid headdress`,
      `detached collar`,
      `bikini`,
      `maid bikini`,
      `breasts skindentation`,
      `frills`,
      `apron`,
      `frilled apron`,
      `maid apron`,
      `waist apron`,
      `detached sleeves`,
      `collarbone`,
      `shoulder blades`,
      `navel`,
      `skirt`,
      `miniskirt`,
      `thighhighs`,
      `thighs skindentation`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: true,
      backboob: true,
      underboobLevel: `only from below`,
      zettaiRyouiki: true,
      insideOfThighs: true,
    },
    liftType: `skirt`,
    upskirtEntries: upskirtPreset.colorfulPanties,
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
