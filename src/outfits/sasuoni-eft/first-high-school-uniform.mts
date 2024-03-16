import { upskirtPreset } from "../common/upskirt-preset.mts";
import { OutfitDefine } from "../resolver.mjs";

export const sasuoniEftFirstHighSchoolUniform = (
  variation: `pantyhose` | `thighhighs`,
) =>
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
      variation === `pantyhose` ? `pantyhose` : `thighhighs`,
      `boots`,
      `black footwear`,
    ],
    specialVisibility: {
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
    upskirtEntries:
      variation === `pantyhose`
        ? [`panties under pantyhose`, `underwear`, `panties`, `crotch seam`]
        : upskirtPreset.colorfulPanties,
    whenRemoveShoes: {
      excludeTags: [`boots`, `black footwear`],
      additionalFootEntriesAfterRemoving: [`no shoes`],
    },
  }) as const satisfies OutfitDefine;
