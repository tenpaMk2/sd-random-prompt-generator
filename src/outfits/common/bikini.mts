import { OutfitDefine } from "../resolver.mjs";

export const bikini = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `bikini`,
      [
        { entries: [`aqua bikini`] },
        { entries: [`black bikini`] },
        { entries: [`blue bikini`] },
        // { entries: [`brown bikini`] },
        // { entries: [`gold bikini`] },
        { entries: [`green bikini`] },
        // { entries: [`grey bikini`] },
        { entries: [`orange bikini`] },
        { entries: [`pink bikini`] },
        { entries: [`purple bikini`] },
        { entries: [`red bikini`] },
        // { entries: [`silver bikini`] },
        { entries: [`white bikini`] },
        { entries: [`yellow bikini`] },
      ],
      [
        { entries: [] },
        { entries: [`argyle bikini`] },
        { entries: [`checkered bikini`] },
        { entries: [`plaid bikini`] },
        { entries: [`polka dot bikini`] },
        { entries: [`striped bikini`] },
      ],
      // [
      //   { entries: [] },
      //   { entries: [`o-ring bikini`] },
      //   { entries: [`frilled bikini`] },
      //   { entries: [`front-tie bikini top`, `side-tie bikini bottom`] },
      // ],
      // [{ entries: [] }, { entries: [`sarong`], probability: 0.2 }],
      `breasts skindentation`,
      `collarbone`,
      `shoulder blades`,
      `navel`,
      `bare arms`,
      // [{ entries: [`bikini skirt`] }, { entries: [] }],
      `bare legs`,
      `barefoot`,
      `shiny skin`,
    ],
    specialVisibility: {
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
    upskirtEntries: [],
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
