import { OutfitDefine } from "../resolver.mjs";

export const prismaIllyaMiyuBeast = (variation: `am7coffeelove`) =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [`zzmiuaa`],
    outfitAndExposureEntries: [
      `jingle bell hair ornament`,
      `blue neck ribbon`,
      `white collar`,
      `detached collar`,
      `grey jacket`,
      `sleeveless jacket`,
      `bare shoulders`,
      `cropped jacket`,
      `tight clothes`,
      `crop top`,
      `midriff`,
      `navel`,
      `black panties`,
      `no pants`,
      `paw gloves`,
      `animal hands`,
      `fur-trimmed gloves`,
      `grey gloves`,
      `grey thighhighs`,
      `thighs skindentation`,
      `garter straps`,
      `grey footwear`,
      `paw shoes`,
      `butt crack`,
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
      insideOfThighs: true,
    },
    liftType: `none`,
    upskirtEntries: [],
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
