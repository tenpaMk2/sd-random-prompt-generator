import { upskirtPreset } from "../common/upskirt-preset.mjs";
import { OutfitDefine } from "../resolver.mjs";

export const danmachiNochekaiserHestia = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [],
    outfitAndExposureEntries: [
      `white dress`,
      `blue bowtie`,
      `pencil dress`,
      `clothing cutout`,
      `cleavage cutout`,
      `rei no himo`,
      `sleeveless`,
      `sleeveless dress`,
      `white gloves`,
      `short dress`,
      `bare legs`,
      `barefoot`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: true,
      cleavage: true,
      sideboob: true,
      backboob: true,
      underboobLevel: `invisible`,
      zettaiRyouiki: false,
      insideOfThighs: true,
    },
    liftType: `dress`,
    upskirtEntries: upskirtPreset.whitePanties,
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
