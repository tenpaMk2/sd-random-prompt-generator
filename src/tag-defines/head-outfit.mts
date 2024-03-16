const allEyewearColorTags = [
  `aqua-framed eyewear`,
  `black-framed eyewear`,
  `blue-framed eyewear`,
  `brown-framed eyewear`,
  `green-framed eyewear`,
  `grey-framed eyewear`,
  `orange-framed eyewear`,
  `pink-framed eyewear`,
  `purple-framed eyewear`,
  `red-framed eyewear`,
  `white-framed eyewear`,
  `yellow-framed eyewear`,
] as const satisfies readonly string[];

const allTintedEyewearColorTags = [
  `blue-tinted eyewear`,
  `green-tinted eyewear`,
  `orange-tinted eyewear`,
  `pink-tinted eyewear`,
  `purple-tinted eyewear`,
  `red-tinted eyewear`,
  `yellow-tinted eyewear`,
] as const satisfies readonly string[];

const allHairBowColorTags = [
  `red bow`,
  `pink bow`,
  `orange bow`,
  `brown bow`,
  `yellow bow`,
  `green bow`,
  `aqua bow`,
  `blue bow`,
  `purple bow`,
  `black bow`,
  `grey bow`,
  `white bow`,
] as const satisfies readonly string[];

const allHairRibbonColorTags = [
  `red ribbon`,
  `pink ribbon`,
  `orange ribbon`,
  `brown ribbon`,
  `yellow ribbon`,
  `green ribbon`,
  `aqua ribbon`,
  `blue ribbon`,
  `purple ribbon`,
  `black ribbon`,
  `grey ribbon`,
  `white ribbon`,
] as const satisfies readonly string[];

const allHairbandColorTags = [
  `red hairband`,
  `pink hairband`,
  `orange hairband`,
  `brown hairband`,
  `yellow hairband`,
  `green hairband`,
  `aqua hairband`,
  `blue hairband`,
  `purple hairband`,
  `black hairband`,
  `grey hairband`,
  `white hairband`,
] as const satisfies readonly string[];

const allHeadOutfitTags = [
  `glasses`,
  ...allEyewearColorTags,
  `tinted eyewear`,
  ...allTintedEyewearColorTags,
  `heart-shaped eyewear`,
  `star-shaped eyewear`,
  `teardrop-framed glasses`,
  `rectangular eyewear`,
  `round eyewear`,
  `rimless eyewear`,
  `semi-rimless eyewear`,
  `over-rim eyewear`,
  `under-rim eyewear`,
  `coke-bottle glasses`,
  `opaque glasses`,
  `sunglasses`,
  `aviator sunglasses`,
  `goggles`,
  `monocle`,
  `eyepatch`,
  `diving mask`,
  `pince-nez`,
  `scouter`,
  `eyewear on head`,
  `eyewear on headwear`,
  `eyewear strap`,
  `no eyewear`,
  `bespectacled`,
  `hair ornament`,
  `hairpin`,
  `hairclip`,
  `cross hair ornament`,
  `x hair ornament`,
  `snowflake hair ornament`,
  `bat hair ornament`,
  `anchor hair ornament`,
  `bone hair ornament`,
  `butterfly hair ornament`,
  `cat hair ornament`,
  `character hair ornament`,
  `clover hair ornament`,
  `coin hair ornament`,
  `crescent hair ornament`,
  `cube hair ornament`,
  `d-pad hair ornament`,
  `feather hair ornament`,
  `fish hair ornament`,
  `food-themed hair ornament`,
  `frog hair ornament`,
  `hair beads`,
  `hair bell`,
  `hair bobbles`,
  `hair flower`,
  `hair scrunchie`,
  `hair stick`,
  `heart hair ornament`,
  `kanzashi`,
  `leaf hair ornament`,
  `monocle hair ornament`,
  `musical note hair ornament`,
  `pom pom hair ornament`,
  `rabbit hair ornament`,
  `shark hair ornament`,
  `skull hair ornament`,
  `snake hair ornament`,
  `star hair ornament`,
  `tassel hair ornament`,
  `crown`,
  `tiara`,
  `diadem`,
  `headdress`,
  `maid headdress`,
  `veil`,
  `headband`,
  `hair bow`,
  ...allHairBowColorTags,
  `hair ribbon`,
  ...allHairRibbonColorTags,
  `hairband`,
  ...allHairbandColorTags,
  `bow hairband`,
  `frilled hairband`,
  `lace-trimmed hairband`,
  `lolita hairband`,
  `striped hairband`,
  `two-tone hairband`,
  `gold hairband`,
  `earrings`,
  `gold earrings`,
  `flower knot`,
  `tress ribbon`,
] as const satisfies readonly string[];
export type HeadOutfitTags = (typeof allHeadOutfitTags)[number];
