import { OutfitDefine } from "../resolver.mjs";

export const sasuoniEftFirstHighSchoolUniform = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `first high school uniform`,
      `dress`,
      `white dress`,
      `collared dress`,
      `pencil dress`,
      `necktie`,
      `black necktie`,
      `short necktie`,
      `jacket`,
      `green jacket`,
      `cropped jacket`,
      `open jacket`,
      `long sleeves`,
      `pantyhose`,
      `boots`,
      `black footwear`,
    ],
    visibility: {
      armpits: false,
      hangingBreasts: false,
      tautClothes: true,
      cleavage: false,
      sideboob: false,
      backboob: false,
      underboobLevel: `invisible`,
      zettaiRyouiki: false,
      insideOfThighs: false,
    },

    liftType: `dress`,
    upskirtEntries: [
      // TODO: Exclude `pantyshot` and `upskirt` from upskirt tags.
      `panties under pantyhose`,
      `underwear`,
      `panties`,
      `crotch seam`,
    ],
    whenRemoveShoes: {
      excludeTags: [`boots`, `black footwear`],
      additionalFootEntriesAfterRemoving: [`no shoes`],
    },
  }) as const satisfies OutfitDefine;
