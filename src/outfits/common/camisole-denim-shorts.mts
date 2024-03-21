import { OutfitDefine } from "../resolver.mjs";

export const camisoleDenimShorts = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `camisole`,
      [
        { entries: [`aqua camisole`] },
        { entries: [`black camisole`] },
        { entries: [`blue camisole`] },
        { entries: [`green camisole`] },
        { entries: [`orange camisole`] },
        { entries: [`pink camisole`], probability: 2 },
        { entries: [`purple camisole`] },
        { entries: [`red camisole`] },
        { entries: [`white camisole`] },
        { entries: [`yellow camisole`] },
      ],
      `crop top`,
      `crop top overhang`,
      `shorts`,
      `denim shorts`,
      `thighhighs`,
      [{ entries: [`black thighhighs`] }, { entries: [`white thighhighs`] }],
      `thighs skindentation`,
      `shoes`,
      `collarbone`,
      `bare arms`,
      `midriff`,
      `navel`,
      `shoulder blades`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: false,
      backboob: false,
      underboobLevel: `only from below`,
      zettaiRyouiki: false,
      insideOfThighs: true,
    },
    liftType: `none`,
    upskirtEntries: [],
    whenRemoveShoes: {
      excludeTags: [`shoes`],
      additionalFootEntriesAfterRemoving: [`no shoes`],
    },
  }) as const satisfies OutfitDefine;
