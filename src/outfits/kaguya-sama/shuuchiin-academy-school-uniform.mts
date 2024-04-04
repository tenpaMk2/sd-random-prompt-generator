import { OutfitAndExposureTag } from "../../tag-defines/outfit-and-exposure.mjs";
import { upskirtPreset } from "../common/upskirt-preset.mjs";
import { OutfitDefine } from "../resolver.mjs";

const additional = {
  "nochekaiser-kaguya": [],
  "nochekaiser-ai": [
    `short dress`,
    `cardigan`,
    `sweater`,
    `clothes around waist`,
    `sweater around waist`,
    `cardigan around waist`,
  ],
  "nochekaiser-miko": [`armband`, `yellow armband`],
} as const satisfies { [k in string]: OutfitAndExposureTag[] };

export const kaguyaSamaShuuchiinAcademySchoolUniform = (
  variation: `nochekaiser-kaguya` | `nochekaiser-ai` | `nochekaiser-miko`,
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
      `socks`,
      `black socks`,
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
    upskirtEntries: upskirtPreset.colorfulPanties,
    whenRemoveShoes: {
      excludeTags: [`loafers`],
      additionalFootEntriesAfterRemoving: [`no shoes`],
    },
  }) as const satisfies OutfitDefine;
