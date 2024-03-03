import { getKeys } from "../libs/utility.mjs";
import { createWriteStream } from "node:fs";
import { CharacterFeatureTag } from "./character-feature.mjs";
import { OutfitAndExposureTag } from "./outfit-and-exposure.mjs";
import { HeadOutfitTags } from "./head-outfit.mjs";

const visibilityKeys = [
  `frontHead`,
  `sideHead`,
  `backHead`,
  `frontBreast`,
  `sideBreast`,
  `backBreast`,
  `frontMidriff`,
  `sideMidriff`,
  `backMidriff`,
  `frontHipAndThigh`,
  `sideHipAndThigh`,
  `backHipAndThigh`,
  `foot`,
  `wristAndHand`,
  `aroundBody`,
] as const satisfies string[];
type VisibilityKeys = (typeof visibilityKeys)[number];

export type Visibility = Readonly<{
  [k in VisibilityKeys]: boolean;
}>;

const all = {
  frontHead: true,
  sideHead: true,
  backHead: true,
  frontBreast: true,
  sideBreast: true,
  backBreast: true,
  frontMidriff: true,
  sideMidriff: true,
  backMidriff: true,
  frontHipAndThigh: true,
  sideHipAndThigh: true,
  backHipAndThigh: true,
  foot: true,
  wristAndHand: true,
  aroundBody: true,
} as const satisfies Visibility;

const invisible = {
  frontHead: false,
  sideHead: false,
  backHead: false,
  frontBreast: false,
  sideBreast: false,
  backBreast: false,
  frontMidriff: false,
  sideMidriff: false,
  backMidriff: false,
  frontHipAndThigh: false,
  sideHipAndThigh: false,
  backHipAndThigh: false,
  foot: false,
  wristAndHand: false,
  aroundBody: false,
} as const satisfies Visibility;

export const visibleType = {
  all,
  invisible,
  face: {
    ...invisible,
    frontHead: true,
  },
  hair: {
    ...invisible,
    frontHead: true,
    sideHead: true,
    backHead: true,
  },
  glasses: {
    ...invisible,
    frontHead: true,
    sideHead: true,
    backHead: true,
  },
  breasts: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
  },
  shortTail: {
    ...invisible,
    backHipAndThigh: true,
  },
  longTail: {
    ...invisible,
    backHipAndThigh: true,
    aroundBody: true,
  },
  thighs: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  hips: {
    ...invisible,
    backHipAndThigh: true,
  },
  bowtie: {
    ...invisible,
    frontBreast: true,
  },
  shoulder: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
  },
  cleavage: {
    ...invisible,
    frontBreast: true,
  },
  sideboob: {
    ...invisible,
    sideBreast: true,
  },
  backboob: {
    ...invisible,
    backBreast: true,
  },
  nipples: {
    ...invisible,
    frontBreast: true,
  },
  navel: {
    ...invisible,
    frontMidriff: true,
  },
  "shoulder blades": {
    ...invisible,
    backBreast: true,
  },
  dress: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: true,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  shirt: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: true,
  },
  skindentation: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  cameltoe: {
    ...invisible,
    frontHipAndThigh: true,
  },
  "zettai ryouiki": {
    ...invisible,
    frontHipAndThigh: true,
    backHipAndThigh: true,
  },
  foot: {
    ...invisible,
    foot: true,
  },
  underbust: {
    ...invisible,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: true,
  },
  bra: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
  },
  panties: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  collar: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
  },
  skirt: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  "wrist cuffs": {
    ...invisible,
    wristAndHand: true,
  },
  thighhighs: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
    foot: true,
  },
  "clothing cutout": {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: true,
  },
} as const satisfies { [k: string]: Visibility };

const allEyesColorVisibilities = {
  "aqua eyes": visibleType.face,
  "black eyes": visibleType.face,
  "blue eyes": visibleType.face,
  "brown eyes": visibleType.face,
  "green eyes": visibleType.face,
  "grey eyes": visibleType.face,
  "orange eyes": visibleType.face,
  "pink eyes": visibleType.face,
  "purple eyes": visibleType.face,
  "red eyes": visibleType.face,
  "white eyes": visibleType.face,
  "yellow eyes": visibleType.face,
};

const allHairColorVisibilities = {
  "aqua hair": visibleType.hair,
  "black hair": visibleType.hair,
  "blonde hair": visibleType.hair,
  "blue hair": visibleType.hair,
  "light blue hair": visibleType.hair,
  "dark blue hair": visibleType.hair,
  "brown hair": visibleType.hair,
  "light brown hair": visibleType.hair,
  "green hair": visibleType.hair,
  "dark green hair": visibleType.hair,
  "light green hair": visibleType.hair,
  "grey hair": visibleType.hair,
  "orange hair": visibleType.hair,
  "pink hair": visibleType.hair,
  "purple hair": visibleType.hair,
  "light purple hair": visibleType.hair,
  "red hair": visibleType.hair,
  "white hair": visibleType.hair,
};

const allEyesVisibilities = {
  "sparkling eyes": visibleType.face,
  "star-shaped pupils": visibleType.face,
  "+ +": visibleType.face,
  "symbol-shaped pupils": visibleType.face,
  heterocromia: visibleType.face,
  tsurime: visibleType.face,
  tareme: visibleType.face,
};

const allEyebrowsVisibilities = {
  eyebrows: visibleType.face,
  "short eyebrows": visibleType.face,
  "thick eyebrows": visibleType.face,
  hikimayu: visibleType.face,
};

const allEyelashesVisibilities = {
  eyelashes: visibleType.face,
  "long eyelashes": visibleType.face,
  "thick eyelashes": visibleType.face,
};

const allHairLengthVisibilities = {
  "short hair": visibleType.hair,
  "medium hair": visibleType.hair,
  "long hair": visibleType.hair,
  "very long hair": visibleType.hair,
  "absurdly long hair": visibleType.hair,
};

const allBreastSizeVisibilities = {
  "flat chest": visibleType.breasts,
  "small breasts": visibleType.breasts,
  "medium breasts": visibleType.breasts,
  "large breasts": visibleType.breasts,
  "huge breasts": visibleType.breasts,
};

const allEyewearColorVisibilities = {
  "aqua-framed eyewear": visibleType.glasses,
  "black-framed eyewear": visibleType.glasses,
  "blue-framed eyewear": visibleType.glasses,
  "brown-framed eyewear": visibleType.glasses,
  "green-framed eyewear": visibleType.glasses,
  "grey-framed eyewear": visibleType.glasses,
  "orange-framed eyewear": visibleType.glasses,
  "pink-framed eyewear": visibleType.glasses,
  "purple-framed eyewear": visibleType.glasses,
  "red-framed eyewear": visibleType.glasses,
  "white-framed eyewear": visibleType.glasses,
  "yellow-framed eyewear": visibleType.glasses,
};

const allTintedEyewearColorVisibilities = {
  "blue-tinted eyewear": visibleType.glasses,
  "green-tinted eyewear": visibleType.glasses,
  "orange-tinted eyewear": visibleType.glasses,
  "pink-tinted eyewear": visibleType.glasses,
  "purple-tinted eyewear": visibleType.glasses,
  "red-tinted eyewear": visibleType.glasses,
  "yellow-tinted eyewear": visibleType.glasses,
};

const allHairBowColorVisibilities = {
  "red bow": visibleType.hair,
  "pink bow": visibleType.hair,
  "orange bow": visibleType.hair,
  "brown bow": visibleType.hair,
  "yellow bow": visibleType.hair,
  "green bow": visibleType.hair,
  "aqua bow": visibleType.hair,
  "blue bow": visibleType.hair,
  "purple bow": visibleType.hair,
  "black bow": visibleType.hair,
  "grey bow": visibleType.hair,
  "white bow": visibleType.hair,
};

const allHairRibbonColorVisibilities = {
  "red ribbon": visibleType.hair,
  "pink ribbon": visibleType.hair,
  "orange ribbon": visibleType.hair,
  "brown ribbon": visibleType.hair,
  "yellow ribbon": visibleType.hair,
  "green ribbon": visibleType.hair,
  "aqua ribbon": visibleType.hair,
  "blue ribbon": visibleType.hair,
  "purple ribbon": visibleType.hair,
  "black ribbon": visibleType.hair,
  "grey ribbon": visibleType.hair,
  "white ribbon": visibleType.hair,
};

const allHairbandColorVisibilities = {
  "red hairband": visibleType.hair,
  "pink hairband": visibleType.hair,
  "orange hairband": visibleType.hair,
  "brown hairband": visibleType.hair,
  "yellow hairband": visibleType.hair,
  "green hairband": visibleType.hair,
  "aqua hairband": visibleType.hair,
  "blue hairband": visibleType.hair,
  "purple hairband": visibleType.hair,
  "black hairband": visibleType.hair,
  "grey hairband": visibleType.hair,
  "white hairband": visibleType.hair,
};

const allBowtieColorVisibilities = {
  "aqua bowtie": visibleType.bowtie,
  "black bowtie": visibleType.bowtie,
  "blue bowtie": visibleType.bowtie,
  "brown bowtie": visibleType.bowtie,
  "green bowtie": visibleType.bowtie,
  "grey bowtie": visibleType.bowtie,
  "orange bowtie": visibleType.bowtie,
  "pink bowtie": visibleType.bowtie,
  "purple bowtie": visibleType.bowtie,
  "red bowtie": visibleType.bowtie,
  "white bowtie": visibleType.bowtie,
  "yellow bowtie": visibleType.bowtie,
} as const;

const allBikiniColorVisibilities = {
  "multicolored bikini": visibleType.dress,
  "aqua bikini": visibleType.dress,
  "black bikini": visibleType.dress,
  "blue bikini": visibleType.dress,
  "brown bikini": visibleType.dress,
  "gold bikini": visibleType.dress,
  "green bikini": visibleType.dress,
  "grey bikini": visibleType.dress,
  "orange bikini": visibleType.dress,
  "pink bikini": visibleType.dress,
  "purple bikini": visibleType.dress,
  "red bikini": visibleType.dress,
  "silver bikini": visibleType.dress,
  "white bikini": visibleType.dress,
  "yellow bikini": visibleType.dress,
} as const;

const allOnePieceSwimsuitColorVisibilities = {
  "aqua one-piece swimsuit": visibleType.dress,
  "black one-piece swimsuit": visibleType.dress,
  "blue one-piece swimsuit": visibleType.dress,
  "brown one-piece swimsuit": visibleType.dress,
  "gold one-piece swimsuit": visibleType.dress,
  "green one-piece swimsuit": visibleType.dress,
  "grey one-piece swimsuit": visibleType.dress,
  "orange one-piece swimsuit": visibleType.dress,
  "pink one-piece swimsuit": visibleType.dress,
  "purple one-piece swimsuit": visibleType.dress,
  "red one-piece swimsuit": visibleType.dress,
  "silver one-piece swimsuit": visibleType.dress,
  "white one-piece swimsuit": visibleType.dress,
  "yellow one-piece swimsuit": visibleType.dress,
} as const;

const allJacketColorVisibilities = {
  "aqua jacket": visibleType.shirt,
  "black jacket": visibleType.shirt,
  "blue jacket": visibleType.shirt,
  "brown jacket": visibleType.shirt,
  "green jacket": visibleType.shirt,
  "grey jacket": visibleType.shirt,
  "orange jacket": visibleType.shirt,
  "pink jacket": visibleType.shirt,
  "purple jacket": visibleType.shirt,
  "red jacket": visibleType.shirt,
  "white jacket": visibleType.shirt,
  "yellow jacket": visibleType.shirt,
};

const allDressColorVisibilities = {
  "aqua dress": visibleType.dress,
  "black dress": visibleType.dress,
  "blue dress": visibleType.dress,
  "brown dress": visibleType.dress,
  "green dress": visibleType.dress,
  "grey dress": visibleType.dress,
  "orange dress": visibleType.dress,
  "pink dress": visibleType.dress,
  "purple dress": visibleType.dress,
  "red dress": visibleType.dress,
  "white dress": visibleType.dress,
  "yellow dress": visibleType.dress,
} as const;

export const tagVisibilities = {
  // Head feature
  ...allEyesColorVisibilities,
  ...allHairColorVisibilities,
  ...allEyesVisibilities,
  ...allEyebrowsVisibilities,
  ...allEyelashesVisibilities,
  ...allHairLengthVisibilities,
  "gradient hair": visibleType.hair,
  "colored inner hair": visibleType.hair,
  "bob cut": visibleType.hair,
  "inverted bob": visibleType.hair,
  "pixie cut": visibleType.hair,
  undercut: visibleType.hair,
  "flipped hair": visibleType.hair,
  dreadlocks: visibleType.hair,
  "hime cut": visibleType.hair,
  "curly hair": visibleType.hair,
  "drill hair": visibleType.hair,
  "twin drills": visibleType.hair,
  "hair flaps": visibleType.hair,
  "messy hair": visibleType.hair,
  "pointy hair": visibleType.hair,
  ringlets: visibleType.hair,
  "straight hair": visibleType.hair,
  "wavy hair": visibleType.hair,
  "hair over shoulder": visibleType.hair,
  "short hair with long locks": visibleType.hair,
  "bow-shaped hair": visibleType.hair,
  braid: visibleType.hair,
  "braided bangs": visibleType.hair,
  "braided ponytail": visibleType.hair,
  "front braid": visibleType.hair,
  "side braid": visibleType.hair,
  "frentch braid": visibleType.hair,
  "crown braid": visibleType.hair,
  "single braid": visibleType.hair,
  "multiple braids": visibleType.hair,
  "twin braids": visibleType.hair,
  "low twin braids": visibleType.hair,
  "tri braids": visibleType.hair,
  "flower-shaped hair": visibleType.hair,
  "hair bun": visibleType.hair,
  "braided bun": visibleType.hair,
  "single hair bun": visibleType.hair,
  "double bun": visibleType.hair,
  "cone hair bun": visibleType.hair,
  "doughnut hair bun": visibleType.hair,
  "heart hair bun": visibleType.hair,
  "triple bun": visibleType.hair,
  "hair rings": visibleType.hair,
  "single hair ring": visibleType.hair,
  "half updo": visibleType.hair,
  "one side up": visibleType.hair,
  "two side up": visibleType.hair,
  "low-braided long hair": visibleType.hair,
  "low-tied long hair": visibleType.hair,
  mizura: visibleType.hair,
  "multi-tied-hair": visibleType.hair,
  ponytail: visibleType.hair,
  "folded ponytail": visibleType.hair,
  "high ponytail": visibleType.hair,
  "low ponytail": visibleType.hair,
  "short ponytail": visibleType.hair,
  "wide ponytail": visibleType.hair,
  "side ponytail": visibleType.hair,
  "split ponytail": visibleType.hair,
  topknot: visibleType.hair,
  twintails: visibleType.hair,
  "low twintails": visibleType.hair,
  "short twintails": visibleType.hair,
  "tri tails": visibleType.hair,
  "arched bangs": visibleType.hair,
  "asymmetrical bangs": visibleType.hair,
  "bangs pinned back": visibleType.hair,
  "blunt bangs": visibleType.hair,
  "crossed bangs": visibleType.hair,
  "diagonal bangs": visibleType.hair,
  "dyed bangs": visibleType.hair,
  "hair over eyes": visibleType.hair,
  "hair over one eye": visibleType.hair,
  "long bangs": visibleType.hair,
  "parted bangs": visibleType.hair,
  "curtained bangs": visibleType.hair,
  "hair between eyes": visibleType.hair,
  "hair intakes": visibleType.hair,
  "single hair intake": visibleType.hair,
  "blunt ends": visibleType.hair,
  "swept bangs": visibleType.hair,
  sidelocks: visibleType.hair,
  "asymmetrical sidelocks": visibleType.hair,
  "drill sidelocks": visibleType.hair,
  "low tied sidelocks": visibleType.hair,
  "single sidelock": visibleType.hair,
  ahoge: visibleType.hair,
  "heart ahoge": visibleType.hair,
  "huge ahoge": visibleType.hair,
  "antenna hair": visibleType.hair,
  "heart antenna hair": visibleType.hair,
  "hair pulled back": visibleType.hair,
  "hair slicked back": visibleType.hair,
  "alternate hairstyle": visibleType.hair,
  "hair down": visibleType.hair,
  "hair up": visibleType.hair,
  "facial mark": visibleType.hair,
  "animal ears": visibleType.hair,
  "cat ears": visibleType.hair,
  "dog ears": visibleType.hair,
  "fox ears": visibleType.hair,
  "animal ear fluff": visibleType.hair,
  fang: visibleType.hair,
  "pointy ears": visibleType.hair,
  forehead: visibleType.face,

  // Breast size
  ...allBreastSizeVisibilities,

  // Body feature
  tail: visibleType.shortTail,
  "cat tail": visibleType.longTail,
  "dog tail": visibleType.longTail,
  "fox tail": visibleType.longTail,
  "demon tail": visibleType.longTail,
  "thick thighs": visibleType.thighs,
  "wide hips": visibleType.hips,
  "mature female": visibleType.all,
  curvy: visibleType.all,
  loli: visibleType.all,
  "cat girl": visibleType.all,
  "dog girl": visibleType.all,
  "fox girl": visibleType.all,
  elf: visibleType.all,

  // Head outfit
  glasses: visibleType.glasses,
  ...allEyewearColorVisibilities,
  "tinted eyewear": visibleType.glasses,
  ...allTintedEyewearColorVisibilities,
  "heart-shaped eyewear": visibleType.glasses,
  "star-shaped eyewear": visibleType.glasses,
  "teardrop-framed glasses": visibleType.glasses,
  "rectangular eyewear": visibleType.glasses,
  "round eyewear": visibleType.glasses,
  "rimless eyewear": visibleType.glasses,
  "semi-rimless eyewear": visibleType.glasses,
  "over-rim eyewear": visibleType.glasses,
  "under-rim eyewear": visibleType.glasses,
  "coke-bottle glasses": visibleType.glasses,
  "opaque glasses": visibleType.glasses,
  sunglasses: visibleType.glasses,
  "aviator sunglasses": visibleType.glasses,
  goggles: visibleType.glasses,
  monocle: visibleType.glasses,
  eyepatch: visibleType.glasses,
  "diving mask": visibleType.glasses,
  "pince-nez": visibleType.glasses,
  scouter: visibleType.glasses,
  "eyewear on head": visibleType.glasses,
  "eyewear on headwear": visibleType.glasses,
  "eyewear strap": visibleType.glasses,
  "no eyewear": visibleType.glasses,
  bespectacled: visibleType.glasses,
  "hair ornament": visibleType.hair,
  hairpin: visibleType.hair,
  hairclip: visibleType.hair,
  "cross hair ornament": visibleType.hair,
  "x hair ornament": visibleType.hair,
  "snowflake hair ornament": visibleType.hair,
  "bat hair ornament": visibleType.hair,
  "anchor hair ornament": visibleType.hair,
  "bone hair ornament": visibleType.hair,
  "butterfly hair ornament": visibleType.hair,
  "cat hair ornament": visibleType.hair,
  "character hair ornament": visibleType.hair,
  "clover hair ornament": visibleType.hair,
  "coin hair ornament": visibleType.hair,
  "crescent hair ornament": visibleType.hair,
  "cube hair ornament": visibleType.hair,
  "d-pad hair ornament": visibleType.hair,
  "feather hair ornament": visibleType.hair,
  "fish hair ornament": visibleType.hair,
  "food-themed hair ornament": visibleType.hair,
  "frog hair ornament": visibleType.hair,
  "hair beads": visibleType.hair,
  "hair bell": visibleType.hair,
  "hair bobbles": visibleType.hair,
  "hair flower": visibleType.hair,
  "hair scrunchie": visibleType.hair,
  "hair stick": visibleType.hair,
  "heart hair ornament": visibleType.hair,
  kanzashi: visibleType.hair,
  "leaf hair ornament": visibleType.hair,
  "monocle hair ornament": visibleType.hair,
  "musical note hair ornament": visibleType.hair,
  "pom pom hair ornament": visibleType.hair,
  "rabbit hair ornament": visibleType.hair,
  "shark hair ornament": visibleType.hair,
  "skull hair ornament": visibleType.hair,
  "snake hair ornament": visibleType.hair,
  "star hair ornament": visibleType.hair,
  "tassel hair ornament": visibleType.hair,
  crown: visibleType.hair,
  tiara: visibleType.hair,
  diadem: visibleType.hair,
  headdress: visibleType.hair,
  "maid headdress": visibleType.hair,
  veil: visibleType.hair,
  headband: visibleType.hair,
  "hair bow": visibleType.hair,
  ...allHairBowColorVisibilities,
  "hair ribbon": visibleType.hair,
  ...allHairRibbonColorVisibilities,
  hairband: visibleType.hair,
  ...allHairbandColorVisibilities,
  "bow hairband": visibleType.hair,
  "frilled hairband": visibleType.hair,
  "lace-trimmed hairband": visibleType.hair,
  "lolita hairband": visibleType.hair,
  "striped hairband": visibleType.hair,
  "two-tone hairband": visibleType.hair,
  "gold hairband": visibleType.hair,
  earrings: visibleType.hair,
  "gold earrings": visibleType.hair,

  // Exposure
  collarbone: visibleType.bowtie,
  "bare shoulders": visibleType.shoulder,
  "bare arms": visibleType.shoulder,
  cleavage: visibleType.cleavage,
  sideboob: visibleType.sideboob,
  backboob: visibleType.backboob,
  nipples: visibleType.nipples,
  "covered niples": visibleType.nipples,
  midriff: visibleType.navel,
  navel: visibleType.navel,
  "covered navel": visibleType.navel,
  "shoulder blades": visibleType["shoulder blades"],
  "taut clothes": visibleType.cleavage,
  "skin tight": visibleType.dress,
  skindentation: visibleType.skindentation,
  "bare legs": visibleType.thighs,
  cameltoe: visibleType.cameltoe,
  pussy: visibleType.cameltoe,
  "zettai ryouiki": visibleType.thighs,
  ass: visibleType.hips,
  "butt crack": visibleType.hips,
  barefoot: visibleType.foot,
  "no shoes": visibleType.foot,
  "partially unbuttoned": visibleType.bowtie,
  "partially undressed": visibleType.dress,
  nsfw: visibleType.all,

  // Outfit
  "cleavage cutout": visibleType.cleavage,
  "navel cutout": visibleType.navel,
  "neck ribbon": visibleType.bowtie,
  underbust: visibleType.underbust,
  bowtie: visibleType.bowtie,
  ...allBowtieColorVisibilities,
  buttons: visibleType.dress,
  jewelry: visibleType.all,
  bikini: visibleType.dress,
  ...allBikiniColorVisibilities,
  "frilled bikini": visibleType.dress,
  "print bikini": visibleType.dress,
  "o-ring bikini": visibleType.dress,
  "school swimsuit": visibleType.dress,
  ...allOnePieceSwimsuitColorVisibilities,
  "o-ring top": visibleType.cleavage,
  "o-ring bottom": visibleType.panties,
  "school uniform": visibleType.dress,
  jacket: visibleType.shirt,
  ...allJacketColorVisibilities,
  "sleeveless jacket": visibleType.shirt,
  "military jacket": visibleType.shirt,
  dress: visibleType.dress,
  ...allDressColorVisibilities,
  "two-tone dress": visibleType.dress,
  "black collar": visibleType.collar,
  "red collar": visibleType.collar,
  "red shirt": visibleType.shirt,
  "white shirt": visibleType.shirt,
  "pink shirt": visibleType.shirt,
  "long sleeves": visibleType.shoulder,
  "white sleeves": visibleType.shoulder,
  "black sleeves": visibleType.shoulder,
  "wide sleeves": visibleType.shoulder,
  belt: visibleType.skirt,
  "black belt": visibleType.skirt,
  "white belt": visibleType.skirt,
  "red belt": visibleType.skirt,
  "pink belt": visibleType.skirt,
  "detached collar": visibleType.collar,
  "detached sleeves": visibleType["wrist cuffs"],
  maid: visibleType.all,
  "maid bikini": visibleType.dress,
  frills: visibleType.all,
  apron: visibleType.dress,
  "frilled apron": visibleType.dress,
  "maid apron": visibleType.dress,
  "waist apron": visibleType.skirt,
  shirt: visibleType.shirt,
  "collared shirt": visibleType.shirt,
  vest: visibleType.shirt,
  "green vest": visibleType.shirt,
  "yellow vest": visibleType.shirt,
  "blue vest": visibleType.shirt,
  "black vest": visibleType.shirt,
  "off shoulder": visibleType.shirt,
  "off-shoulder dress": visibleType.dress,
  "off-shoulder sweater": visibleType.shirt,
  sweater: visibleType.shirt,
  "red sweater": visibleType.shirt,
  "sweater dress": visibleType.dress,
  "office lady": visibleType.all,
  choker: visibleType.collar,
  strap: visibleType.all,
  gloves: visibleType["wrist cuffs"],
  "black gloves": visibleType["wrist cuffs"],
  "fingerless gloves": visibleType["wrist cuffs"],
  "infinite stratos academy school uniform": visibleType.all,
  "lycoris uniform": visibleType.all,
  "pleated dress": visibleType.dress,
  "bikini skirt": visibleType.skirt,
  skirt: visibleType.skirt,
  "white skirt": visibleType.skirt,
  "black skirt": visibleType.skirt,
  "green skirt": visibleType.skirt,
  "grey skirt": visibleType.skirt,
  "red skirt": visibleType.skirt,
  "orange skirt": visibleType.skirt,
  "purple skirt": visibleType.skirt,
  "pink skirt": visibleType.skirt,
  "blue skirt": visibleType.skirt,
  miniskirt: visibleType.skirt,
  "plaid skirt": visibleType.skirt,
  "pencil skirt": visibleType.skirt,
  "high-low skirt": visibleType.skirt,
  "red trim": visibleType.all,
  pantyhose: visibleType.thighhighs,
  thighhighs: visibleType.thighhighs,
  "black thighhighs": visibleType.thighhighs,
  socks: visibleType.foot,
  "white socks": visibleType.foot,
  "black socks": visibleType.foot,
  shoes: visibleType.foot,
  loafers: visibleType.foot,
  boots: visibleType.foot,
  underwear: visibleType.dress,
  "underwear only": visibleType.dress,
  lingerie: visibleType.dress,
  bra: visibleType.bra,
  panties: visibleType.panties,
  "red panties": visibleType.panties,
  "blue panties": visibleType.panties,
  "green panties": visibleType.panties,
  "yellow panties": visibleType.panties,
  "orange panties": visibleType.panties,
  "aqua panties": visibleType.panties,
  "white panties": visibleType.panties,
  "black panties": visibleType.panties,
  "pink panties": visibleType.panties,
  "purple panties": visibleType.panties,
  "crotch seam": visibleType.cameltoe,
  "lace panties": visibleType.panties,
  "tokiwadai school uniform": visibleType.all,
  "sweater vest": visibleType.shirt,
  "brown sweater vest": visibleType.shirt,
  "yellow sweater vest": visibleType.shirt,
  "short sleeves": visibleType.shoulder,
  "white gloves": visibleType["wrist cuffs"],
  "elbow gloves": visibleType.shoulder,
  "pleated skirt": visibleType.skirt,
  "frilled skirt": visibleType.skirt,
  "white thighhighs": visibleType.thighhighs,
  sleeveless: visibleType.shoulder,
  "sleeveless shirt": visibleType.shirt,
  "sleeveless dress": visibleType.dress,
  aiguillette: visibleType.bowtie,
  epaulettes: visibleType.shoulder,
  blazer: visibleType.shirt,
  suit: visibleType.shirt,
  "business suit": visibleType.shirt,
  "pinstripe pattern": visibleType.shirt, // TODO: Separate to `pinstripe pattern shirt` and `pinstripe pattern skirt` .
  pumps: visibleType.foot,
  "open clothes": visibleType.shirt, // Visible from back. Assume when all fours.
  "open jacket": visibleType.shirt, // Visible from back. Assume when all fours.
  "open shirt": visibleType.shirt,
  pirate: visibleType.all,
  "pirate hat": visibleType.hair,
  ascot: visibleType.bowtie,
  "gold trim": visibleType.all, // TODO: `gold trim shirt` and `gold trim skirt` .
  "thigh boots": visibleType.foot,
  "playboy bunny": visibleType.dress,
  "rabbit ears": visibleType.hair,
  "fake animal ears": visibleType.hair,
  "latex leotard": visibleType.dress,
  "wrist cuffs": visibleType["wrist cuffs"],
  leotard: visibleType.dress,
  "red leotard": visibleType.dress,
  "pink leotard": visibleType.dress,
  "orange leotard": visibleType.dress,
  "yellow leotard": visibleType.dress,
  "green leotard": visibleType.dress,
  "blue leotard": visibleType.dress,
  "purple leotard": visibleType.dress,
  "black leotard": visibleType.dress,
  "white leotard": visibleType.dress,
  "brown leotard": visibleType.dress,
  "rabbit tail": visibleType.shortTail,
  "magical girl": visibleType.dress,
  cloak: visibleType.dress,
  "white cloak": visibleType.dress,
  hood: visibleType.hair,
  "hood up": visibleType.hair,
  "hooded cloak": visibleType.dress,
  bodystocking: visibleType.all,
  "black footwear": visibleType.foot,
  "cross-laced footwear": visibleType.foot,
  "panties under pantyhose": visibleType.panties,
  serafuku: visibleType.dress,
  "sailor collar": visibleType.collar,
  "blue sailor collar": visibleType.collar,
  neckerchief: visibleType.bowtie,
  "red neckerchief": visibleType.bowtie,
  "crop top": visibleType.shirt,
  "crop top overhang": visibleType.cleavage,
  "cropped shirt": visibleType.shirt,
  "naked shirt": visibleType.shirt,
  "dress shirt": visibleType.shirt,
  "no bra": visibleType.bra,
  bottomless: visibleType.skirt,
  camisole: visibleType.shirt,
  "red camisole": visibleType.shirt,
  "blue camisole": visibleType.shirt,
  "green camisole": visibleType.shirt,
  "yellow camisole": visibleType.shirt,
  "orange camisole": visibleType.shirt,
  "aqua camisole": visibleType.shirt,
  "white camisole": visibleType.shirt,
  "black camisole": visibleType.shirt,
  "pink camisole": visibleType.shirt,
  "purple camisole": visibleType.shirt,
  shorts: visibleType.skirt,
  "denim shorts": visibleType.skirt,
  "gym uniform": visibleType.dress,
  "gym shirt": visibleType.shirt,
  buruma: visibleType.skirt,
  sweat: visibleType.all,
  necklace: visibleType.bowtie,
  "wedding dress": visibleType.dress,
  "nontraditional wedding dress": visibleType.dress,
  bride: visibleType.all,
  "bridal veil": visibleType.hair,
  "bridal garter": visibleType.skirt,
  "bridal gauntlets": visibleType.shoulder,
  "bridal lingerie": visibleType.dress,
  "garter belt": visibleType.skirt,
  "garter straps": visibleType.skirt,
  "revealing clothes": visibleType.all,
  "clothing cutout": visibleType["clothing cutout"],
  "sainan high school uniform": visibleType.dress,
  "thigh strap": visibleType.thighhighs,
  "first high school uniform": visibleType.dress,
  "collared dress": visibleType.dress,
  "pencil dress": visibleType.dress,
  necktie: visibleType.bowtie,
  "black necktie": visibleType.bowtie,
  "short necktie": visibleType.bowtie,
  "cropped jacket": visibleType.shirt,
} as const satisfies {
  [K in CharacterFeatureTag | OutfitAndExposureTag]: Visibility;
};

export const writeAsCSV = (path: string) => {
  const ws = createWriteStream(path);

  ws.write(
    [`tag`, ...visibilityKeys.map((key) => `"${key}"`)].join(`,`) + `\n`,
  ); // Write header

  const tags = getKeys(tagVisibilities);
  for (const tag of tags) {
    const line = [
      `"${tag}"`,
      visibilityKeys.map((key) => (tagVisibilities[tag][key] ? `"O"` : ``)),
    ].join(`,`);
    ws.write(line + `\n`);
  }

  ws.end();
};
