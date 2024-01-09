const allProperNouns = [
  `infinite stratos`,
  `aacecilia`,
  `cecilia alcott`,
  `charlotte dunois`,
  `kafuu chino`,
  `yor briar`,
  `lycoris recoil`,
  `nishikigi chisato`,
  `toaru kagaku no railgun`,
  `shokuhou misaki`,
  `amagi brilliant park`,
  `sento isuzu`,
  `new game!`,
  `suzukaze aoba`,
  `suzukaze_aoba_newgame`,
  `takimoto hifumi`,
  `takimoto_hifumi_newgame`,
] as const satisfies readonly string[];
type ProperNoun = (typeof allProperNouns)[number];

const allHeadFeatureTags = [
  `sparkling eyes`,
  `star-shaped pupils`,
  `+ +`,
  `symbol-shaped pupils`,
  `aqua eyes`,
  `black eyes`,
  `blue eyes`,
  `brown eyes`,
  `green eyes`,
  `grey eyes`,
  `orange eyes`,
  `purple eyes`,
  `pink eyes`,
  `red eyes`,
  `white eyes`,
  `yellow eyes`,
  `heterocromia`,
  `tsurime`,
  `tareme`,
  `thick eyebrows`,
  `eyelashes`,
  `long eyelashes`,
  `thick eyelashes`,
  `glasses`,
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
  `tinted eyewear`,
  `blue-tinted eyewear`,
  `green-tinted eyewear`,
  `orange-tinted eyewear`,
  `pink-tinted eyewear`,
  `purple-tinted eyewear`,
  `red-tinted eyewear`,
  `yellow-tinted eyewear`,
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
  `gradient hair`,
  `colored inner hair`,
  `short hair`,
  `medium hair`,
  `long hair`,
  `very long hair`,
  `absurdly long hair`,
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
  `hair ribbon`,
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
  `hairband`,
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
  `bow hairband`,
  `frilled hairband`,
  `lace-trimmed hairband`,
  `lolita hairband`,
  `striped hairband`,
  `two-tone hairband`,
  `gold hairband`,
  `facial mark`,
  `animal ears`,
  `cat ears`,
  `dog ears`,
  `fox ears`,
  `animal ear fluff`,
  `fang`,
  `pointy ears`,
  `earrings`,
  `gold earrings`,
] as const satisfies readonly string[];
type HeadFeatureTag = (typeof allHeadFeatureTags)[number];

const allBreastSizeTags = [
  `flat chest`,
  `small breasts`,
  `medium breasts`,
  `large breasts`,
  `huge breasts`,
] as const satisfies readonly string[];
export type BreastSizeTag = (typeof allBreastSizeTags)[number];

const allBodyFeatureTags = [
  `cat tail`,
  `dog tail`,
  `fox tail`,
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
  | ProperNoun
  | HeadFeatureTag
  | BreastSizeTag
  | BodyFeatureTag;

export const BreastSizeOrder = {
  "flat chest": 1,
  "small breasts": 2,
  "medium breasts": 3,
  "large breasts": 4,
  "huge breasts": 5,
} as const satisfies { [K in BreastSizeTag]: number };
