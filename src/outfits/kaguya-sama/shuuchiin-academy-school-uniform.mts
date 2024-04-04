import { OutfitAndExposureTag } from "../../tag-defines/outfit-and-exposure.mjs";
import { upskirtPreset } from "../common/upskirt-preset.mjs";
import { OutfitDefine } from "../resolver.mjs";

const additional = {
  "nochekaiser-ai": [
    `short dress`,
    `cardigan`,
    `sweater`,
    `clothes around waist`,
    `sweater around waist`,
    `cardigan around waist`,
    `socks`,
    `black socks`,
  ],
  "nochekaiser-chika": [`socks`, `white socks`],
  "nochekaiser-kaguya": [`socks`, `black socks`],
  "nochekaiser-miko": [
    `armband`,
    `yellow armband`,
    `pantyhose`,
    `black pantyhose`,
  ],
} as const satisfies { [k in string]: OutfitAndExposureTag[] };

export const kaguyaSamaShuuchiinAcademySchoolUniform = (
  variation: keyof typeof additional,
) =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `shuuchiin academy school uniform`,
      `school uniform`,
      `dress`,
      `black dress`,
      `collared dress`,
      `sailor collar`,
      `white sailor collar`,
      `collarbone`,
      `neck ribbon`,
      `red neck ribbon`,
      `loafers`,
      `short dress`,
      ...additional[variation],
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
      variation === `nochekaiser-miko`
        ? upskirtPreset.pantiesUnderPantyhose
        : upskirtPreset.colorfulPanties,
    whenRemoveShoes: {
      excludeTags: [`loafers`],
      additionalFootEntriesAfterRemoving: [`no shoes`],
    },
  }) as const satisfies OutfitDefine;
