import { getKeys } from "../libs/utility.mjs";
import { Tag } from "./all.mjs";
import { createWriteStream } from "node:fs";

export type Visible = Readonly<{
  frontHead: boolean;
  sideHead: boolean;
  backHead: boolean;
  frontBreast: boolean; // For `portrait` .
  sideBreast: boolean;
  backBreast: boolean;
  frontMidriff: boolean; // `For `upper body` .
  sideMidriff: boolean;
  backMidriff: boolean;
  frontHipAndThigh: boolean; // For `cowboy shot` .
  sideHipAndThigh: boolean;
  backHipAndThigh: boolean;
  foot: boolean; // For `full body` or `all fours` .
  upskirt: boolean; // For `upskirt` .
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
  upskirt: true,
} as const satisfies Visible;

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
  upskirt: false,
} as const satisfies Visible;

export const visibleType = {
  all,
  invisible,
  face: {
    ...invisible,
    frontHead: true,
    sideHead: true,
  },
  head: {
    ...invisible,
    frontHead: true,
    sideHead: true,
    backHead: true,
  },
  aroundBreast: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    backBreast: true,
  },
  midriff: {
    ...invisible,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: true,
  },
  tail: {
    ...invisible,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: true,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  aroundHip: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  thigh: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
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
  skirt: {
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
  thighhighs: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
    foot: true,
  },
  pantyhose: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
    foot: true,
    upskirt: true,
  },
  underwear: {
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
    upskirt: true,
  },
  panty: {
    ...invisible,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
    upskirt: true,
  },
  upskirt: {
    ...invisible,
    upskirt: true,
  },
  foot: {
    ...invisible,
    foot: true,
  },
} as const satisfies { [k: string]: Visible };

export const tagVisibilities = {
  // Character feature
  "infinite stratos": visibleType.all,
  aacecilia: visibleType.all,
  "cecilia alcott": visibleType.all,
  "charlotte dunois": visibleType.all,
  "kafuu chino": visibleType.all,
  "yor briar": visibleType.all,
  "lycoris recoil": visibleType.all,
  "nishikigi chisato": visibleType.all,
  "toaru kagaku no railgun": visibleType.all,
  "shokuhou misaki": visibleType.all,
  "amagi brilliant park": visibleType.all,
  "sento isuzu": visibleType.all,
  "new game!": visibleType.all,
  "suzukaze aoba": visibleType.all,
  suzukaze_aoba_newgame: visibleType.all,
  "takimoto hifumi": visibleType.all,
  takimoto_hifumi_newgame: visibleType.all,

  "sparkling eyes": visibleType.face,
  "star-shaped pupils": visibleType.face,
  "+ +": visibleType.face,
  "symbol-shaped pupils": visibleType.face,
  "aqua eyes": visibleType.face,
  "black eyes": visibleType.face,
  "blue eyes": visibleType.face,
  "brown eyes": visibleType.face,
  "green eyes": visibleType.face,
  "grey eyes": visibleType.face,
  "orange eyes": visibleType.face,
  "purple eyes": visibleType.face,
  "pink eyes": visibleType.face,
  "red eyes": visibleType.face,
  "white eyes": visibleType.face,
  "yellow eyes": visibleType.face,
  heterocromia: visibleType.face,
  tsurime: visibleType.face,
  tareme: visibleType.face,
  "thick eyebrows": visibleType.face,
  eyelashes: visibleType.face,
  "long eyelashes": visibleType.face,
  "thick eyelashes": visibleType.face,
  glasses: visibleType.head,
  "aqua-framed eyewear": visibleType.head,
  "black-framed eyewear": visibleType.head,
  "blue-framed eyewear": visibleType.head,
  "brown-framed eyewear": visibleType.head,
  "green-framed eyewear": visibleType.head,
  "grey-framed eyewear": visibleType.head,
  "orange-framed eyewear": visibleType.head,
  "pink-framed eyewear": visibleType.head,
  "purple-framed eyewear": visibleType.head,
  "red-framed eyewear": visibleType.head,
  "white-framed eyewear": visibleType.head,
  "yellow-framed eyewear": visibleType.head,
  "tinted eyewear": visibleType.head,
  "blue-tinted eyewear": visibleType.head,
  "green-tinted eyewear": visibleType.head,
  "orange-tinted eyewear": visibleType.head,
  "pink-tinted eyewear": visibleType.head,
  "purple-tinted eyewear": visibleType.head,
  "red-tinted eyewear": visibleType.head,
  "yellow-tinted eyewear": visibleType.head,
  "heart-shaped eyewear": visibleType.head,
  "star-shaped eyewear": visibleType.head,
  "teardrop-framed glasses": visibleType.head,
  "rectangular eyewear": visibleType.head,
  "round eyewear": visibleType.head,
  "rimless eyewear": visibleType.head,
  "semi-rimless eyewear": visibleType.head,
  "over-rim eyewear": visibleType.head,
  "under-rim eyewear": visibleType.head,
  "coke-bottle glasses": visibleType.head,
  "opaque glasses": visibleType.head,
  sunglasses: visibleType.head,
  "aviator sunglasses": visibleType.head,
  goggles: visibleType.head,
  monocle: visibleType.head,
  eyepatch: visibleType.head,
  "diving mask": visibleType.head,
  "pince-nez": visibleType.head,
  scouter: visibleType.head,
  "eyewear on head": visibleType.head,
  "eyewear on headwear": visibleType.head,
  "eyewear strap": visibleType.head,
  "no eyewear": visibleType.head,
  bespectacled: visibleType.head,
  "aqua hair": visibleType.head,
  "black hair": visibleType.head,
  "blonde hair": visibleType.head,
  "blue hair": visibleType.head,
  "light blue hair": visibleType.head,
  "dark blue hair": visibleType.head,
  "brown hair": visibleType.head,
  "light brown hair": visibleType.head,
  "green hair": visibleType.head,
  "dark green hair": visibleType.head,
  "light green hair": visibleType.head,
  "grey hair": visibleType.head,
  "orange hair": visibleType.head,
  "pink hair": visibleType.head,
  "purple hair": visibleType.head,
  "light purple hair": visibleType.head,
  "red hair": visibleType.head,
  "white hair": visibleType.head,
  "gradient hair": visibleType.head,
  "colored inner hair": visibleType.head,
  "short hair": visibleType.head,
  "medium hair": visibleType.head,
  "long hair": visibleType.head,
  "very long hair": visibleType.head,
  "absurdly long hair": visibleType.head,
  "bob cut": visibleType.head,
  "inverted bob": visibleType.head,
  "pixie cut": visibleType.head,
  undercut: visibleType.head,
  "flipped hair": visibleType.head,
  dreadlocks: visibleType.head,
  "hime cut": visibleType.head,
  "curly hair": visibleType.head,
  "drill hair": visibleType.head,
  "twin drills": visibleType.head,
  "hair flaps": visibleType.head,
  "messy hair": visibleType.head,
  "pointy hair": visibleType.head,
  ringlets: visibleType.head,
  "straight hair": visibleType.head,
  "wavy hair": visibleType.head,
  "hair over shoulder": visibleType.head,
  "short hair with long locks": visibleType.head,
  "bow-shaped hair": visibleType.head,
  braid: visibleType.head,
  "braided bangs": visibleType.head,
  "front braid": visibleType.head,
  "side braid": visibleType.head,
  "frentch braid": visibleType.head,
  "crown braid": visibleType.head,
  "single braid": visibleType.head,
  "multiple braids": visibleType.head,
  "twin braids": visibleType.head,
  "low twin braids": visibleType.head,
  "tri braids": visibleType.head,
  "flower-shaped hair": visibleType.head,
  "hair bun": visibleType.head,
  "braided bun": visibleType.head,
  "single hair bun": visibleType.head,
  "double bun": visibleType.head,
  "cone hair bun": visibleType.head,
  "doughnut hair bun": visibleType.head,
  "heart hair bun": visibleType.head,
  "triple bun": visibleType.head,
  "hair rings": visibleType.head,
  "single hair ring": visibleType.head,
  "half updo": visibleType.head,
  "one side up": visibleType.head,
  "two side up": visibleType.head,
  "low-braided long hair": visibleType.head,
  "low-tied long hair": visibleType.head,
  mizura: visibleType.head,
  "multi-tied-hair": visibleType.head,
  ponytail: visibleType.head,
  "folded ponytail": visibleType.head,
  "high ponytail": visibleType.head,
  "low ponytail": visibleType.head,
  "short ponytail": visibleType.head,
  "wide ponytail": visibleType.head,
  "side ponytail": visibleType.head,
  "split ponytail": visibleType.head,
  topknot: visibleType.head,
  twintails: visibleType.head,
  "low twintails": visibleType.head,
  "short twintails": visibleType.head,
  "tri tails": visibleType.head,
  "arched bangs": visibleType.head,
  "asymmetrical bangs": visibleType.head,
  "bangs pinned back": visibleType.head,
  "blunt bangs": visibleType.head,
  "crossed bangs": visibleType.head,
  "diagonal bangs": visibleType.head,
  "dyed bangs": visibleType.head,
  "hair over eyes": visibleType.head,
  "hair over one eye": visibleType.head,
  "long bangs": visibleType.head,
  "parted bangs": visibleType.head,
  "curtained bangs": visibleType.head,
  "hair between eyes": visibleType.head,
  "hair intakes": visibleType.head,
  "single hair intake": visibleType.head,
  "blunt ends": visibleType.head,
  "swept bangs": visibleType.head,
  sidelocks: visibleType.head,
  "asymmetrical sidelocks": visibleType.head,
  "drill sidelocks": visibleType.head,
  "low tied sidelocks": visibleType.head,
  "single sidelock": visibleType.head,
  ahoge: visibleType.head,
  "heart ahoge": visibleType.head,
  "huge ahoge": visibleType.head,
  "antenna hair": visibleType.head,
  "heart antenna hair": visibleType.head,
  "hair pulled back": visibleType.head,
  "hair slicked back": visibleType.head,
  "alternate hairstyle": visibleType.head,
  "hair down": visibleType.head,
  "hair up": visibleType.head,
  "hair ornament": visibleType.head,
  hairpin: visibleType.head,
  hairclip: visibleType.head,
  "cross hair ornament": visibleType.head,
  "x hair ornament": visibleType.head,
  "snowflake hair ornament": visibleType.head,
  "bat hair ornament": visibleType.head,
  "anchor hair ornament": visibleType.head,
  "bone hair ornament": visibleType.head,
  "butterfly hair ornament": visibleType.head,
  "cat hair ornament": visibleType.head,
  "character hair ornament": visibleType.head,
  "clover hair ornament": visibleType.head,
  "coin hair ornament": visibleType.head,
  "crescent hair ornament": visibleType.head,
  "cube hair ornament": visibleType.head,
  "d-pad hair ornament": visibleType.head,
  "feather hair ornament": visibleType.head,
  "fish hair ornament": visibleType.head,
  "food-themed hair ornament": visibleType.head,
  "frog hair ornament": visibleType.head,
  "hair beads": visibleType.head,
  "hair bell": visibleType.head,
  "hair bobbles": visibleType.head,
  "hair flower": visibleType.head,
  "hair scrunchie": visibleType.head,
  "hair stick": visibleType.head,
  "heart hair ornament": visibleType.head,
  kanzashi: visibleType.head,
  "leaf hair ornament": visibleType.head,
  "monocle hair ornament": visibleType.head,
  "musical note hair ornament": visibleType.head,
  "pom pom hair ornament": visibleType.head,
  "rabbit hair ornament": visibleType.head,
  "shark hair ornament": visibleType.head,
  "skull hair ornament": visibleType.head,
  "snake hair ornament": visibleType.head,
  "star hair ornament": visibleType.head,
  "tassel hair ornament": visibleType.head,
  crown: visibleType.head,
  tiara: visibleType.head,
  diadem: visibleType.head,
  headdress: visibleType.head,
  "maid headdress": visibleType.head,
  veil: visibleType.head,
  headband: visibleType.head,
  "hair bow": visibleType.head,
  "red bow": visibleType.head,
  "pink bow": visibleType.head,
  "orange bow": visibleType.head,
  "brown bow": visibleType.head,
  "yellow bow": visibleType.head,
  "green bow": visibleType.head,
  "aqua bow": visibleType.head,
  "blue bow": visibleType.head,
  "purple bow": visibleType.head,
  "black bow": visibleType.head,
  "grey bow": visibleType.head,
  "white bow": visibleType.head,
  "hair ribbon": visibleType.all,
  "red ribbon": visibleType.all,
  "pink ribbon": visibleType.all,
  "orange ribbon": visibleType.all,
  "brown ribbon": visibleType.all,
  "yellow ribbon": visibleType.all,
  "green ribbon": visibleType.all,
  "aqua ribbon": visibleType.all,
  "blue ribbon": visibleType.all,
  "purple ribbon": visibleType.all,
  "black ribbon": visibleType.all,
  "grey ribbon": visibleType.all,
  "white ribbon": visibleType.all,
  hairband: visibleType.head,
  "red hairband": visibleType.head,
  "pink hairband": visibleType.head,
  "orange hairband": visibleType.head,
  "brown hairband": visibleType.head,
  "yellow hairband": visibleType.head,
  "green hairband": visibleType.head,
  "aqua hairband": visibleType.head,
  "blue hairband": visibleType.head,
  "purple hairband": visibleType.head,
  "black hairband": visibleType.head,
  "grey hairband": visibleType.head,
  "white hairband": visibleType.head,
  "bow hairband": visibleType.head,
  "frilled hairband": visibleType.head,
  "lace-trimmed hairband": visibleType.head,
  "lolita hairband": visibleType.head,
  "striped hairband": visibleType.head,
  "two-tone hairband": visibleType.head,
  "gold hairband": visibleType.head,
  "facial mark": visibleType.head,
  "animal ears": visibleType.head,
  "cat ears": visibleType.head,
  "dog ears": visibleType.head,
  "fox ears": visibleType.head,
  "animal ear fluff": visibleType.head,
  fang: visibleType.head,
  "pointy ears": visibleType.head,
  earrings: visibleType.head,
  "gold earrings": visibleType.head,
  "flat chest": visibleType.aroundBreast,
  "small breasts": visibleType.aroundBreast,
  "medium breasts": visibleType.aroundBreast,
  "large breasts": visibleType.aroundBreast,
  "huge breasts": visibleType.aroundBreast,
  "cat tail": visibleType.tail,
  "dog tail": visibleType.tail,
  "fox tail": visibleType.tail,
  "thick thighs": visibleType.thigh,
  "wide hips": visibleType.aroundHip,
  "mature female": visibleType.all,
  curvy: visibleType.all,
  loli: visibleType.all,
  "cat girl": visibleType.all,
  "dog girl": visibleType.all,
  "fox girl": visibleType.all,
  elf: visibleType.all,

  // Outfit and exposures
  collarbone: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
  },
  "bare shoulders": visibleType.aroundBreast,
  armpits: visibleType.aroundBreast,
  "bare arms": visibleType.aroundBreast,
  cleavage: { ...invisible, frontBreast: true },
  breasts: { ...invisible, frontBreast: true, sideBreast: true },
  sideboob: { ...invisible, sideBreast: true },
  backboob: { ...invisible, backBreast: true },
  "hanging breasts": visibleType.aroundBreast,
  nipples: { ...invisible, frontBreast: true, sideBreast: true },
  "covered niples": { ...invisible, frontBreast: true, sideBreast: true },
  midriff: { ...invisible, frontMidriff: true, sideMidriff: true },
  navel: { ...invisible, frontMidriff: true, sideMidriff: true },
  "covered navel": { ...invisible, frontMidriff: true, sideMidriff: true },
  "shoulder blades": { ...invisible, backBreast: true },
  "taut clothes": { ...invisible, frontBreast: true },
  "skin tight": visibleType.dress,
  skindentation: {
    ...invisible,
    frontBreast: true,
    sideBreast: true,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: true,
  },
  "bare legs": visibleType.thigh,
  cameltoe: {
    ...invisible,
    frontMidriff: true,
    sideMidriff: true,
    upskirt: true,
  },
  pussy: { ...invisible, frontMidriff: true, sideMidriff: true, upskirt: true },
  "zettai ryouiki": {
    ...invisible,
    frontHipAndThigh: true,
    backHipAndThigh: true,
  },
  "thigh gap": { ...invisible, frontHipAndThigh: true },
  "ass visible through thighs": { ...invisible, frontHipAndThigh: true },
  ass: { ...invisible, sideHipAndThigh: true, backHipAndThigh: true },
  barefoot: visibleType.foot,
  "no shoes": visibleType.foot,
  "partially unbuttoned": { ...invisible, frontBreast: true, sideBreast: true },
  "partially undressed": visibleType.dress,
  nsfw: visibleType.all,

  "cleavage cutout": { ...invisible, frontBreast: true, sideBreast: true },
  "neck ribbon": { ...invisible, frontBreast: true, sideBreast: true },
  underbust: visibleType.midriff,
  bowtie: { ...invisible, frontBreast: true, sideBreast: true },
  "blue bowtie": { ...invisible, frontBreast: true, sideBreast: true },
  "white bowtie": { ...invisible, frontBreast: true, sideBreast: true },
  "red bowtie": { ...invisible, frontBreast: true, sideBreast: true },
  buttons: visibleType.all,
  jewelry: visibleType.all,
  bikini: visibleType.dress,
  "__color__ bikini": visibleType.dress,
  "__vivid_color__ bikini": visibleType.dress,
  "__monochrome_color__ bikini": visibleType.dress,
  "__color__ panties": visibleType.panty,
  "__vivid_color__ panties": visibleType.panty,
  "__monochrome_color__ panties": visibleType.panty,
  "red bikini": visibleType.dress,
  "blue bikini": visibleType.dress,
  "green bikini": visibleType.dress,
  "yellow bikini": visibleType.dress,
  "orange bikini": visibleType.dress,
  "aqua bikini": visibleType.dress,
  "white bikini": visibleType.dress,
  "black bikini": visibleType.dress,
  "pink bikini": visibleType.dress,
  "purple bikini": visibleType.dress,
  "frilled bikini": visibleType.dress,
  "print bikini": visibleType.dress,
  "o-ring bikini": visibleType.dress,
  "o-ring top": { ...invisible, frontBreast: true, sideBreast: true },
  "o-ring bottom": visibleType.aroundHip,
  "school uniform": visibleType.dress,
  "school swimsuit": visibleType.dress,
  "black one-piece swimsuit": visibleType.dress,
  "blue one-piece swimsuit": visibleType.dress,
  "white one-piece swimsuit": visibleType.dress,
  "white jacket": visibleType.shirt,
  "white dress": visibleType.dress,
  "black collar": visibleType.collar,
  "red collar": visibleType.collar,
  "red shirt": visibleType.shirt,
  "white shirt": visibleType.shirt,
  "pink shirt": visibleType.shirt,
  "long sleeves": visibleType.all,
  "white sleeves": visibleType.all,
  belt: visibleType.skirt,
  "white belt": visibleType.skirt,
  "red belt": visibleType.skirt,
  "detached collar": visibleType.collar,
  "detached sleeves": visibleType.all,
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
  "blue vest": visibleType.shirt,
  "black vest": visibleType.shirt,
  dress: visibleType.dress,
  "red dress": visibleType.dress,
  "black dress": visibleType.dress,
  "grey dress": visibleType.dress,
  "two-tone dress": visibleType.dress,
  "off shoulder": visibleType.shirt,
  "off-shoulder dress": visibleType.dress,
  "off-shoulder sweater": visibleType.shirt,
  sweater: visibleType.shirt,
  "red sweater": visibleType.shirt,
  "sweater dress": visibleType.dress,
  "office lady": visibleType.all,
  choker: visibleType.collar,
  strap: visibleType.all,
  gloves: visibleType.all,
  "black gloves": visibleType.all,
  "fingerless gloves": visibleType.all,
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
  miniskirt: visibleType.skirt,
  "plaid skirt": visibleType.skirt,
  "pencil skirt": visibleType.skirt,
  "red trim": visibleType.all,
  pantyhose: visibleType.pantyhose,
  thighhighs: visibleType.thighhighs,
  "black thighhighs": visibleType.thighhighs,
  socks: visibleType.foot,
  "white socks": visibleType.foot,
  "black socks": visibleType.foot,
  shoes: visibleType.foot,
  loafers: visibleType.foot,
  boots: visibleType.foot,
  underwear: visibleType.underwear,
  panties: visibleType.panty,
  "red panties": visibleType.panty,
  "blue panties": visibleType.panty,
  "green panties": visibleType.panty,
  "yellow panties": visibleType.panty,
  "orange panties": visibleType.panty,
  "aqua panties": visibleType.panty,
  "white panties": visibleType.panty,
  "black panties": visibleType.panty,
  "pink panties": visibleType.panty,
  "purple panties": visibleType.panty,
  "crotch seam": visibleType.panty,
  "lace panties": visibleType.panty,
  "chino work": visibleType.all,
  aachisato: visibleType.all,
  hmmisaki: visibleType.all,
  SentoUniform: visibleType.all,
  SentoVest: visibleType.all,
  SentoSchoolUniform: visibleType.all,
  SentoSuit: visibleType.all,
  SentoCasual: visibleType.all,
  SentoBikini: visibleType.all,
  SentoPirate: visibleType.all,
  "tokiwadai school uniform": visibleType.all,
  "sweater vest": visibleType.shirt,
  "brown sweater vest": visibleType.shirt,
  "short sleeves": visibleType.aroundBreast,
  "white gloves": visibleType.aroundBreast,
  "elbow gloves": visibleType.aroundBreast,
  "pleated skirt": visibleType.skirt,
  "frilled skirt": visibleType.skirt,
  "white thighhighs": visibleType.thighhighs,
  sleeveless: visibleType.aroundBreast,
  "sleeveless shirt": visibleType.shirt,
  aiguillette: { ...invisible, frontBreast: true, sideBreast: true },
  epaulettes: visibleType.aroundBreast,
  jacket: visibleType.shirt,
  "red jacket": visibleType.shirt,
  "black jacket": visibleType.shirt,
  "pink jacket": visibleType.shirt,
  "purple jacket": visibleType.shirt,
  "sleeveless jacket": visibleType.shirt,
  "military jacket": visibleType.shirt,
  blazer: visibleType.shirt,
  suit: visibleType.shirt,
  "business suit": visibleType.shirt,
  "pinstripe pattern": visibleType.shirt, // TODO: Separate to `pinstripe pattern shirt` and `pinstripe pattern skirt` .
  pumps: visibleType.foot,
  "open clothes": visibleType.shirt, // Visible from back. Assume when all fours.
  "open jacket": visibleType.shirt, // Visible from back. Assume when all fours.
  pirate: visibleType.all,
  "pirate hat": visibleType.head,
  ascot: { ...invisible, frontBreast: true, sideBreast: true },
  "gold trim": visibleType.all, // TODO: `gold trim shirt` and `gold trim skirt` .
  "thigh boots": visibleType.foot,
  "playboy bunny": visibleType.dress,
  "rabbit ears": visibleType.head,
  "fake animal ears": visibleType.head,
  "latex leotard": visibleType.dress,
  "wrist cuffs": visibleType.aroundBreast,
  leotard: visibleType.dress,
  __color_leotards__: visibleType.dress,
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
  "rabbit tail": { ...invisible, sideHipAndThigh: true, backHipAndThigh: true },

  // Emotion
  blush: visibleType.face,
  "nose blush": visibleType.face,
  smile: visibleType.face,
  "light smile": visibleType.face,
  "parted lips": visibleType.face,
  ":d": visibleType.face,
  ";d": visibleType.face,
  ":\\)": visibleType.face,
  ";\\)": visibleType.face,
  ":o": visibleType.face,
  ";o": visibleType.face,
  "open mouth": visibleType.face,
  "closed mouth": visibleType.face,
  "half-closed eyes": visibleType.face,
  expressionless: visibleType.face,
  surprised: visibleType.face,
  embarrassed: visibleType.face,
  nervous: visibleType.face,
  flustered: visibleType.face,
  "naughty face": visibleType.face,
  scowl: visibleType.face,
  "one eye closed": visibleType.face,
  torogao: visibleType.face,
  "heavy breathing": visibleType.face,
  profile: visibleType.face,

  // Arm pose
  "arms up": visibleType.aroundBreast,
  "arm up": visibleType.aroundBreast,
  "w arms": visibleType.aroundBreast,
  "reaching towards viewer": visibleType.aroundBreast,
  v: visibleType.aroundBreast,
  "hand up": visibleType.aroundBreast,
  "hands on own chest": visibleType.aroundBreast,
  "heart hands": visibleType.aroundBreast,
  "own hands together": visibleType.aroundBreast,
  singing: visibleType.aroundBreast,
  "holding microphone": visibleType.aroundBreast,
  "v arms": visibleType.aroundBreast,
  "hands on lap": visibleType.aroundBreast,

  // Pose
  "looking at viewer": visibleType.head,
  "looking back": visibleType.head,
  "looking up": visibleType.head,
  portrait: visibleType.all,
  "upper body": visibleType.all,
  "cowboy shot": visibleType.all,
  "all fours": visibleType.all,
  lying: visibleType.all,
  "on back": visibleType.all,
  "on bed": visibleType.all,
  "legs up": visibleType.all,
  "spread legs": visibleType.all,
  "clothes lift": visibleType.all,
  "dress lift": visibleType.all,
  "skirt lift": visibleType.all,
  "leaning forward": visibleType.all,
  "from behind": visibleType.all,
  "from above": visibleType.all,
  "from below": visibleType.all,
  "from side": visibleType.all,
  upskirt: visibleType.upskirt,
  pantyshot: visibleType.upskirt,
  wariza: visibleType.all,
  sitting: visibleType.all,

  // Background
  indoors: visibleType.all,
  cafe: visibleType.all,
  bed: visibleType.all,
  lamp: visibleType.all,
  window: visibleType.all,
  classroom: visibleType.all,
  office: visibleType.all,
  night: visibleType.all,
  outdoors: visibleType.all,
  beach: visibleType.all,
  ocean: visibleType.all,
  poolside: visibleType.all,
  city: visibleType.all,
  rooftop: visibleType.all,
  cityscape: visibleType.all,
  confetti: visibleType.all,
  "blue sky": visibleType.all,
  mountain: visibleType.all,
  rock: visibleType.all,
  forest: visibleType.all,
  garden: visibleType.all,
  "simple background": visibleType.all,
  "white background": visibleType.all,
  "pink background": visibleType.all,
  "heart background": visibleType.all,
  heart: visibleType.all,
  "spoken heart": visibleType.all,
  "cave interior": visibleType.all,
  ceiling: visibleType.all,
  sunset: visibleType.all,
  "orange sky": visibleType.all,
  "night sky": visibleType.all,
  grass: visibleType.all,
  floor: visibleType.all,
  "wooden floor": visibleType.all,
  "partially submerged": visibleType.all,
  "bed sheet": visibleType.all,
  pillow: visibleType.all,
  "amusement park": visibleType.all,
  day: visibleType.all,
  pool: visibleType.all, // TODO: Make all background tags invisible for safety.
  casino: visibleType.all,
} as const satisfies { [K in Tag]: Visible };

export const writeAsCSV = (path: string) => {
  const ws = createWriteStream(path);

  const parts = getKeys(visibleType.all);
  ws.write([`tag`, ...parts.map((part) => `"${part}"`)].join(`,`) + `\n`); // Write header

  const tags = getKeys(tagVisibilities);
  for (const tag of tags) {
    const line = [
      `"${tag}"`,
      parts.map((part) => (tagVisibilities[tag][part] ? `"O"` : ``)),
    ].join(`,`);
    ws.write(line + `\n`);
  }

  ws.end();
};
