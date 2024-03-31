import { upskirtPreset } from "../common/upskirt-preset.mjs";
import { OutfitDefine } from "../resolver.mjs";

export const prismaIllyaAm7CoffeeloveIllyaBeast = () =>
  ({
    lora: null,
    loraOutfitTriggerWordEntries: [`zzillaaa`],
    outfitAndExposureEntries: [
      // TODO: Reconsider moving ears from the character define to here.
      `official alternate costume`,
      `fur-trimmed collar`,
      `black leotard`,
      `center opening`,
      `elbow gloves`,
      `black gloves`,
      `paw gloves`,
      `animal hands`,
      `fur-trimmed gloves`,
      `thighhighs`,
      `black thighhighs`,
      `thighs skindentation`,
      `bare shoulders`,
      `shoulder blades`,
      `navel`,
      `butt crack`,
    ],
    specialVisibility: {
      armpits: true,
      hangingBreasts: true,
      tautClothes: false,
      cleavage: true,
      sideboob: true,
      backboob: true,
      underboobLevel: `full`,
      zettaiRyouiki: false,
      insideOfThighs: true,
    },
    liftType: `skirt`,
    upskirtEntries: [],
    whenRemoveShoes: null,
  }) as const satisfies OutfitDefine;
