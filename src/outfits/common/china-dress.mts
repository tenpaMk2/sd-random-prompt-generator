import { OutfitDefine } from "../resolver.mjs";
import { upskirtPreset } from "./upskirt-preset.mjs";

export const chinaDress = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `china dress`,
      `chinese clothes`,
      [
        { entries: [`red dress`] },
        { entries: [`blue dress`] },
        { entries: [`black dress`] },
        { entries: [`white dress`] },
      ],
      `print dress`,
      [
        { entries: [`dragon print`] },
        { entries: [`floral print`] },
        { entries: [`cherry blossom print`] },
      ],
      `cleavage cutout`,
      `clothing cutout`,
      `covered navel`,
      [{ entries: [`bare arms`] }, { entries: [`detached sleeves`] }],
      `sleeveless`,
      `sleeveless dress`,
      `short dress`,
      `side slit`,
      `pelvic curtain`,
      `bare legs`,
      `barefoot`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: true,
      cleavage: true,
      sideboob: false,
      backboob: false,
      underboobLevel: `invisible`,
      zettaiRyouiki: false,
      insideOfThighs: false,
    },
    liftType: `dress`,
    upskirtEntries: upskirtPreset.colorfulPanties,
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
