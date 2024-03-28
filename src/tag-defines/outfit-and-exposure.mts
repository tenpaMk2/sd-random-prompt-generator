import { getKeys } from "../libs/utility.mjs";
import { HeadOutfitTags } from "./head-outfit.mjs";

export const allDistinguishableExposureTags = {
  "breasts skindentation": `skindentation`,
  "thighs skindentation": `skindentation`,
  "front neck star tattoo": `star tattoo`,
} as const satisfies { [k in string]: string };

export const allDistinguishableOutfitTags = {
  "gold trim shirt": `gold trim`,
  "gold trim skirt": `gold trim`,
  "red trim shirt": `red trim`,
  "red trim skirt": `red trim`,
  "pinstripe pattern shirt": `pinstripe pattern`,
  "pinstripe pattern skirt": `pinstripe pattern`,
  // TODO: `red neck ribbon` → `red ribbon`
} as const satisfies { [k in string]: string };

const allExposureTags = [
  ...getKeys(allDistinguishableExposureTags),
  `collarbone`,
  `bare shoulders`,
  `bare arms`,
  `nipples`,
  `covered niples`,
  `midriff`,
  `navel`,
  `covered navel`,
  `shoulder blades`,
  `skin tight`,
  `bare legs`,
  `cameltoe`,
  `pussy`,
  `ass`,
  `butt crack`,
  `barefoot`,
  `no shoes`,
  `partially unbuttoned`,
  `partially undressed`,
  `nsfw`,
  `shiny skin`,
  `sweat`,
] as const satisfies readonly string[];
type ExposureTag = (typeof allExposureTags)[number];

const allShirtColorTags = [
  `aqua shirt`,
  `black shirt`,
  `blue shirt`,
  `brown shirt`,
  `green shirt`,
  `grey shirt`,
  `orange shirt`,
  `pink shirt`,
  `purple shirt`,
  `red shirt`,
  `white shirt`,
  `yellow shirt`,
] as const satisfies string[];

const allSkirtColorTags = [
  `aqua skirt`,
  `black skirt`,
  `blue skirt`,
  `brown skirt`,
  `green skirt`,
  `grey skirt`,
  `orange skirt`,
  `pink skirt`,
  `purple skirt`,
  `red skirt`,
  `white skirt`,
  `yellow skirt`,
] as const satisfies string[];

const allPantiesColorTags = [
  `aqua panties`,
  `black panties`,
  `blue panties`,
  `brown panties`,
  `green panties`,
  `grey panties`,
  `orange panties`,
  `pink panties`,
  `purple panties`,
  `red panties`,
  `white panties`,
  `yellow panties`,
] as const satisfies string[];

const allBowtieColorTags = [
  `aqua bowtie`,
  `black bowtie`,
  `blue bowtie`,
  `brown bowtie`,
  `green bowtie`,
  `grey bowtie`,
  `orange bowtie`,
  `pink bowtie`,
  `purple bowtie`,
  `red bowtie`,
  `white bowtie`,
  `yellow bowtie`,
] as const satisfies string[];

const allBikiniColorTags = [
  `multicolored bikini`,
  `aqua bikini`,
  `black bikini`,
  `blue bikini`,
  `brown bikini`,
  `gold bikini`,
  `green bikini`,
  `grey bikini`,
  `orange bikini`,
  `pink bikini`,
  `purple bikini`,
  `red bikini`,
  `silver bikini`,
  `white bikini`,
  `yellow bikini`,
] as const satisfies string[];

const allOnePieceSwimsuitColorTags = [
  `aqua one-piece swimsuit`,
  `black one-piece swimsuit`,
  `blue one-piece swimsuit`,
  `brown one-piece swimsuit`,
  `gold one-piece swimsuit`,
  `green one-piece swimsuit`,
  `grey one-piece swimsuit`,
  `orange one-piece swimsuit`,
  `pink one-piece swimsuit`,
  `purple one-piece swimsuit`,
  `red one-piece swimsuit`,
  `silver one-piece swimsuit`,
  `white one-piece swimsuit`,
  `yellow one-piece swimsuit`,
] as const satisfies string[];

const allJacketColorTags = [
  `aqua jacket`,
  `black jacket`,
  `blue jacket`,
  `brown jacket`,
  `green jacket`,
  `grey jacket`,
  `orange jacket`,
  `pink jacket`,
  `purple jacket`,
  `red jacket`,
  `white jacket`,
  `yellow jacket`,
] as const satisfies string[];

const allDressColorTags = [
  `aqua dress`,
  `black dress`,
  `blue dress`,
  `brown dress`,
  `green dress`,
  `grey dress`,
  `orange dress`,
  `pink dress`,
  `purple dress`,
  `red dress`,
  `white dress`,
  `yellow dress`,
] as const satisfies string[];

const allSweaterColorTags = [
  `aqua sweater`,
  `beige sweater`,
  `black sweater`,
  `brown sweater`,
  `blue sweater`,
  `green sweater`,
  `grey sweater`,
  `orange sweater`,
  `purple sweater`,
  `red sweater`,
  `yellow sweater`,
  `white sweater`,
] as const satisfies string[];

const allSweaterVestColorTags = [
  `aqua sweater vest`,
  `black sweater vest`,
  `blue sweater vest`,
  `brown sweater vest`,
  `green sweater vest`,
  `grey sweater vest`,
  `orange sweater vest`,
  `pink sweater vest`,
  `purple sweater vest`,
  `red sweater vest`,
  `white sweater vest`,
  `yellow sweater vest`,
] as const satisfies string[];

const allGlovesColorTags = [
  `aqua gloves`,
  `black gloves`,
  `blue gloves`,
  `brown gloves`,
  `green gloves`,
  `grey gloves`,
  `multicolored gloves`,
  `orange gloves`,
  `pink gloves`,
  `purple gloves`,
  `red gloves`,
  `white gloves`,
  `yellow gloves`,
] as const satisfies string[];

const allThighhighsColorTags = [
  `black thighhighs`,
  `blue thighhighs`,
  `brown thighhighs`,
  `green thighhighs`,
  `grey thighhighs`,
  `orange thighhighs`,
  `pink thighhighs`,
  `purple thighhighs`,
  `red thighhighs`,
  `white thighhighs`,
  `yellow thighhighs`,
] as const satisfies string[];

const allSocksColorTags = [
  `black socks`,
  `blue socks`,
  `brown socks`,
  `green socks`,
  `grey socks`,
  `orange socks`,
  `pink socks`,
  `purple socks`,
  `red socks`,
  `white socks`,
  `yellow socks`,
] as const satisfies string[];

const allCollarColorTags = [
  `black collar`,
  `blue collar`,
  `brown collar`,
  `grey collar`,
  `orange collar`,
  `pink collar`,
  `purple collar`,
  `red collar`,
  `white collar`,
] as const satisfies string[];

const allSleevesColorTags = [
  `aqua sleeves`,
  `black sleeves`,
  `blue sleeves`,
  `brown sleeves`,
  `green sleeves`,
  `grey sleeves`,
  `orange sleeves`,
  `pink sleeves`,
  `purple sleeves`,
  `red sleeves`,
  `white sleeves`,
  `yellow sleeves`,
] as const satisfies string[];

const allBeltColorTags = [
  `black belt`,
  `blue belt`,
  `brown belt`,
  `green belt`,
  `grey belt`,
  `orange belt`,
  `pink belt`,
  `purple belt`,
  `red belt`,
  `white belt`,
  `yellow belt`,
] as const satisfies string[];

const allVestColorTags = [
  `aqua vest`,
  `black vest`,
  `blue vest`,
  `brown vest`,
  `green vest`,
  `grey vest`,
  `orange vest`,
  `pink vest`,
  `purple vest`,
  `red vest`,
  `white vest`,
  `yellow vest`,
] as const satisfies string[];

const allAscotColorTags = [
  `aqua ascot`,
  `black ascot`,
  `blue ascot`,
  `brown ascot`,
  `green ascot`,
  `grey ascot`,
  `orange ascot`,
  `pink ascot`,
  `purple ascot`,
  `red ascot`,
  `white ascot`,
  `yellow ascot`,
] as const satisfies string[];

const allLeotardColorTags = [
  `aqua leotard`,
  `black leotard`,
  `blue leotard`,
  `brown leotard`,
  `green leotard`,
  `grey leotard`,
  `orange leotard`,
  `pink leotard`,
  `purple leotard`,
  `red leotard`,
  `white leotard`,
  `yellow leotard`,
] as const satisfies string[];

const allNeckerchiefColorTags = [
  `aqua neckerchief`,
  `black neckerchief`,
  `blue neckerchief`,
  `brown neckerchief`,
  `green neckerchief`,
  `grey neckerchief`,
  `orange neckerchief`,
  `pink neckerchief`,
  `purple neckerchief`,
  `red neckerchief`,
  `white neckerchief`,
  `yellow neckerchief`,
] as const satisfies string[];

const allSailorCollarColorTags = [
  `aqua sailor collar`,
  `black sailor collar`,
  `blue sailor collar`,
  `brown sailor collar`,
  `green sailor collar`,
  `grey sailor collar`,
  `orange sailor collar`,
  `pink sailor collar`,
  `purple sailor collar`,
  `red sailor collar`,
  `white sailor collar`,
  `yellow sailor collar`,
] as const satisfies string[];

const allSerafukuColorTags = [
  `aqua serafuku`,
  `black serafuku`,
  `blue serafuku`,
  `brown serafuku`,
  `green serafuku`,
  `grey serafuku`,
  `orange serafuku`,
  `pink serafuku`,
  `purple serafuku`,
  `red serafuku`,
  `white serafuku`,
  `yellow serafuku`,
] as const satisfies string[];

const allCamisoleColorTags = [
  `aqua camisole`,
  `black camisole`,
  `blue camisole`,
  `brown camisole`,
  `green camisole`,
  `grey camisole`,
  `orange camisole`,
  `pink camisole`,
  `purple camisole`,
  `red camisole`,
  `white camisole`,
  `yellow camisole`,
] as const satisfies string[];

const allShortsColorTags = [
  `multicolored shorts`,
  `aqua shorts`,
  `black shorts`,
  `blue shorts`,
  `brown shorts`,
  `green shorts`,
  `grey shorts`,
  `orange shorts`,
  `pink shorts`,
  `purple shorts`,
  `red shorts`,
  `white shorts`,
  `yellow shorts`,
] as const satisfies string[];

const allBurumaColorTags = [
  `aqua buruma`,
  `black buruma`,
  `blue buruma`,
  `brown buruma`,
  `green buruma`,
  `grey buruma`,
  `orange buruma`,
  `pink buruma`,
  `purple buruma`,
  `red buruma`,
  `white buruma`,
  `yellow buruma`,
] as const satisfies string[];

const allNecktieColorTags = [
  `aqua necktie`,
  `black necktie`,
  `blue necktie`,
  `brown necktie`,
  `green necktie`,
  `grey necktie`,
  `orange necktie`,
  `pink necktie`,
  `purple necktie`,
  `red necktie`,
  `white necktie`,
  `yellow necktie`,
] as const satisfies string[];

const allHatColorTags = [
  `aqua hat`,
  `black hat`,
  `blue hat`,
  `brown hat`,
  `green hat`,
  `grey hat`,
  `orange hat`,
  `pink hat`,
  `purple hat`,
  `red hat`,
  `white hat`,
  `yellow hat`,
] as const satisfies string[];

const allFootwearColorTags = [
  `aqua footwear`,
  `black footwear`,
  `blue footwear`,
  `brown footwear`,
  `green footwear`,
  `grey footwear`,
  `orange footwear`,
  `pink footwear`,
  `purple footwear`,
  `red footwear`,
  `white footwear`,
  `yellow footwear`,
] as const satisfies string[];

const allOutfitTags = [
  ...getKeys(allDistinguishableOutfitTags),
  `shirt`,
  ...allShirtColorTags,
  `skirt`,
  ...allSkirtColorTags,
  `panties`,
  ...allPantiesColorTags,
  `bowtie`,
  ...allBowtieColorTags,
  `bikini`,
  ...allBikiniColorTags,
  `school swimsuit`,
  ...allOnePieceSwimsuitColorTags,
  `jacket`,
  ...allJacketColorTags,
  `dress`,
  ...allDressColorTags,
  `sweater`,
  ...allSweaterColorTags,
  `sweater vest`,
  ...allSweaterVestColorTags,
  `gloves`,
  ...allGlovesColorTags,
  `thighhighs`,
  ...allThighhighsColorTags,
  `socks`,
  ...allSocksColorTags,
  `collar`,
  ...allCollarColorTags,
  ...allSleevesColorTags,
  `belt`,
  ...allBeltColorTags,
  `vest`,
  ...allVestColorTags,
  `ascot`,
  ...allAscotColorTags,
  `leotard`,
  ...allLeotardColorTags,
  `neckerchief`,
  ...allNeckerchiefColorTags,
  `sailor collar`,
  ...allSailorCollarColorTags,
  `serafuku`,
  ...allSerafukuColorTags,
  `camisole`,
  ...allCamisoleColorTags,
  `shorts`,
  ...allShortsColorTags,
  `buruma`,
  ...allBurumaColorTags,
  `necktie`,
  ...allNecktieColorTags,
  `hat`,
  ...allHatColorTags,
  `boots`,
  `shoes`,
  ...allFootwearColorTags,

  `ribbed sweater`,
  `striped sweater`,
  `plaid sweater`,
  `polka dot sweater`,
  `argyle sweater`,
  `argyle sweater vest`,
  `cleavage cutout`,
  `navel cutout`,
  `neck ribbon`,
  `underbust`,
  `buttons`,
  `jewelry`,
  `frilled bikini`,
  `print bikini`,
  `o-ring bikini`,
  `micro bikini`,
  `argyle bikini`,
  `checkered bikini`,
  `plaid bikini`,
  `polka dot bikini`,
  `striped bikini`,
  `front-tie bikini top`,
  `side-tie bikini bottom`,
  `sarong`,
  `o-ring top`,
  `o-ring bottom`,
  `school uniform`,
  `sleeveless jacket`,
  `military jacket`,
  `two-tone dress`,
  `long sleeves`,
  `wide sleeves`,
  `detached collar`,
  `detached sleeves`,
  `maid`,
  `maid headdress`,
  `maid bikini`,
  `frills`,
  `center frills`,
  `apron`,
  `frilled apron`,
  `maid apron`,
  `waist apron`,
  `collared shirt`,
  `off shoulder`,
  `off-shoulder dress`,
  `off-shoulder sweater`,
  `sweater dress`,
  `office lady`,
  `choker`,
  `ribbon choker`,
  `strap`,
  `fingerless gloves`,
  `infinite stratos academy school uniform`,
  `lycoris uniform`,
  `pleated dress`,
  `bikini skirt`,
  `miniskirt`,
  `plaid skirt`,
  `pencil skirt`,
  `high-low skirt`,
  `pantyhose`,
  `loafers`,
  `sneakers`,
  `underwear`,
  `underwear only`,
  `lingerie`,
  `bra`,
  `crotch seam`,
  `lace panties`,
  `tokiwadai school uniform`,
  `short sleeves`,
  `elbow gloves`,
  `pleated skirt`,
  `frilled skirt`,
  `sleeveless`,
  `sleeveless shirt`,
  `sleeveless dress`,
  `aiguillette`,
  `epaulettes`,
  `blazer`,
  `suit`,
  `business suit`,
  `pumps`,
  `open clothes`,
  `open jacket`,
  `open shirt`,
  `pirate`,
  `pirate hat`,
  `knee boots`,
  `thigh boots`,
  `playboy bunny`,
  `rabbit ears`,
  `fake animal ears`,
  `latex leotard`,
  `wrist cuffs`,
  `rabbit tail`,
  `magical girl`,
  `cloak`,
  `white cloak`,
  `hood`,
  `hood up`,
  `hooded cloak`,
  `bodystocking`,
  `cross-laced footwear`,
  `panties under pantyhose`,
  `crop top`,
  `crop top overhang`,
  `cropped shirt`,
  `naked shirt`,
  `dress shirt`,
  `no bra`,
  `bottomless`,
  `denim shorts`,
  `bike shorts`,
  `denim`,
  `gym uniform`,
  `gym shirt`,
  `necklace`,
  `wedding dress`,
  `nontraditional wedding dress`,
  `bride`,
  `veil`,
  `bridal veil`,
  `hair ornament`,
  `hair flower`,
  `bridal garter`,
  `bridal gauntlets`,
  `bridal lingerie`,
  `garter belt`,
  `garter straps`,
  `revealing clothes`,
  `clothing cutout`,
  `sainan high school uniform`,
  `thigh strap`,
  `first high school uniform`,
  `collared dress`,
  `pencil dress`,
  `short necktie`,
  `cropped jacket`,
  `miko`,
  `nontraditional miko`,
  `hakama`,
  `hakama skirt`,
  `hip vent`,
  `cheerleader`,
  `cow print`,
  `cow print bikini`,
  `cow print gloves`,
  `cow print thighhighs`,
  `print gloves`,
  `print thighhighs`,
  `neck bell`,
  `santa costume`,
  `santa hat`,
  `santa bikini`,
  `fur collar`,
  // `fur trim`,
  `fur-trimmed bikini`,
  `fur-trimmed headwear`,
  `casual`,
  `t-shirt`,
  `cabbie hat`,
  `bikini top only`,
  `high-waist skirt`,
  `china dress`,
  `chinese clothes`,
  `print dress`,
  `dragon print`,
  `floral print`,
  `cherry blossom print`,
  `short dress`,
  `side slit`,
  `pelvic curtain`,
  `rei no himo`,
] as const satisfies readonly string[];
type OutfitTag = (typeof allOutfitTags)[number];

export type OutfitAndExposureTag = HeadOutfitTags | ExposureTag | OutfitTag;

// export const allOutdoorFootwearTags = [
//   `shoes`,
//   `colored shoe soles`,
//   `aqua footwear`,
//   `black footwear`,
//   `blue footwear`,
//   `brown footwear`,
//   `green footwear`,
//   `grey footwear`,
//   `orange footwear`,
//   `pink footwear`,
//   `purple footwear`,
//   `red footwear`,
//   `white footwear`,
//   `yellow footwear`,
//   `flats`,
//   `high heels`,
//   `loafers`,
//   `mary janes`,
//   `oxfords`,
//   `pointy footwear`,
//   `rudder footwear`,
//   `slippers`,
//   `sneakers`,
//   `high tops`,
//   `toeless footwear`,
//   `uwabaki`,
//   `winged footwear`,
//   `footwear bow`,
//   `footwear ribbon`,
//   `shoe soles`,
// ] as const satisfies string[];
// type OutdoorFootwearTag = (typeof allOutdoorFootwearTags)[number];
