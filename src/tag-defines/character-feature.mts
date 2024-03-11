import { HeadOutfitTags as HeadOutfitTag } from "./head-outfit.mjs";

const allEyesColorTags = [
  `aqua eyes`,
  `black eyes`,
  `blue eyes`,
  `brown eyes`,
  `green eyes`,
  `grey eyes`,
  `orange eyes`,
  `pink eyes`,
  `purple eyes`,
  `red eyes`,
  `white eyes`,
  `yellow eyes`,
] as const satisfies readonly string[];

const allHairColorTags = [
  `aqua hair`,
  `black hair`,
  `blonde hair`,
  `blue hair`,
  `light blue hair`,
  `dark blue hair`,
  `brown hair`,
  `light brown hair`,
  `green hair`,
  `dark green hair`,
  `light green hair`,
  `grey hair`,
  `orange hair`,
  `pink hair`,
  `purple hair`,
  `light purple hair`,
  `red hair`,
  `white hair`,
] as const satisfies readonly string[];

const allEyesTags = [
  `sparkling eyes`,
  `star-shaped pupils`,
  `+ +`,
  `symbol-shaped pupils`,
  `heterocromia`,
  `tsurime`,
  `tareme`,
] as const satisfies readonly string[];

const allEyebrowsTags = [
  `eyebrows`,
  `short eyebrows`,
  `thick eyebrows`,
  `hikimayu`,
] as const satisfies readonly string[];

const allEyelashesTags = [
  `eyelashes`,
  `long eyelashes`,
  `thick eyelashes`,
] as const satisfies readonly string[];

const allHairLengthTags = [
  `short hair`,
  `medium hair`,
  `long hair`,
  `very long hair`,
  `absurdly long hair`,
] as const satisfies readonly string[];

const allHeadFeatureTags = [
  ...allEyesColorTags,
  ...allHairColorTags,
  ...allEyesTags,
  ...allEyebrowsTags,
  ...allEyelashesTags,
  ...allHairLengthTags,
  `gradient hair`,
  `colored inner hair`,
  `bob cut`,
  `inverted bob`,
  `pixie cut`,
  `undercut`,
  `flipped hair`,
  `dreadlocks`,
  `hime cut`,
  `curly hair`,
  `drill hair`,
  `twin drills`,
  `hair flaps`,
  `messy hair`,
  `pointy hair`,
  `ringlets`,
  `straight hair`,
  `wavy hair`,
  `hair over shoulder`,
  `short hair with long locks`,
  `bow-shaped hair`,
  `braid`,
  `braided bangs`,
  `braided ponytail`,
  `front braid`,
  `side braid`,
  `frentch braid`,
  `crown braid`,
  `single braid`,
  `multiple braids`,
  `twin braids`,
  `low twin braids`,
  `tri braids`,
  `flower-shaped hair`,
  `hair bun`,
  `braided bun`,
  `single hair bun`,
  `double bun`,
  `cone hair bun`,
  `doughnut hair bun`,
  `heart hair bun`,
  `triple bun`,
  `hair rings`,
  `single hair ring`,
  `half updo`,
  `one side up`,
  `two side up`,
  `low-braided long hair`,
  `low-tied long hair`,
  `mizura`,
  `multi-tied-hair`,
  `ponytail`,
  `folded ponytail`,
  `high ponytail`,
  `low ponytail`,
  `short ponytail`,
  `wide ponytail`,
  `side ponytail`,
  `split ponytail`,
  `topknot`,
  `twintails`,
  `low twintails`,
  `short twintails`,
  `tri tails`,
  `arched bangs`,
  `asymmetrical bangs`,
  `bangs pinned back`,
  `blunt bangs`,
  `crossed bangs`,
  `diagonal bangs`,
  `dyed bangs`,
  `hair over eyes`,
  `hair over one eye`,
  `long bangs`,
  `parted bangs`,
  `curtained bangs`,
  `hair between eyes`,
  `hair intakes`,
  `single hair intake`,
  `blunt ends`,
  `swept bangs`,
  `sidelocks`,
  `asymmetrical sidelocks`,
  `drill sidelocks`,
  `low tied sidelocks`,
  `single sidelock`,
  `ahoge`,
  `heart ahoge`,
  `huge ahoge`,
  `antenna hair`,
  `heart antenna hair`,
  `hair pulled back`,
  `hair slicked back`,
  `alternate hairstyle`,
  `hair down`,
  `hair up`,
  `facial mark`,
  `animal ears`,
  `cat ears`,
  `dog ears`,
  `fox ears`,
  `animal ear fluff`,
  `fang`,
  `pointy ears`,
  `forehead`,
  `tress ribbon`,
] as const satisfies readonly string[];
type HeadFeatureTag = (typeof allHeadFeatureTags)[number];

export const allBreastSizeTags = [
  `flat chest`,
  `small breasts`,
  `medium breasts`,
  `large breasts`,
  `huge breasts`,
] as const satisfies readonly string[];
export type BreastSizeTag = (typeof allBreastSizeTags)[number];

const allBodyFeatureTags = [
  `tail`,
  `cat tail`,
  `dog tail`,
  `fox tail`,
  `demon tail`,
  `thick thighs`,
  `wide hips`,
  `mature female`,
  `curvy`,
  `loli`,
  `cat girl`,
  `dog girl`,
  `fox girl`,
  `elf`,
] as const satisfies readonly string[];
type BodyFeatureTag = (typeof allBodyFeatureTags)[number];

export type CharacterFeatureTag =
  | HeadFeatureTag
  | BodyFeatureTag
  | HeadOutfitTag;

export const BreastSizeOrder = {
  "flat chest": 1,
  "small breasts": 2,
  "medium breasts": 3,
  "large breasts": 4,
  "huge breasts": 5,
} as const satisfies { [K in BreastSizeTag]: number };
