const allExposureTags = [
  `collarbone`,
  `bare shoulders`,
  `armpits`,
  `bare arms`,
  `cleavage`,
  `breasts`,
  `sideboob`,
  `backboob`,
  `hanging breasts`,
  `nipples`,
  `covered niples`,
  `midriff`,
  `navel`,
  `covered navel`,
  `shoulder blades`,
  `taut clothes`,
  `skin tight`,
  `skindentation`,
  `bare legs`,
  `cameltoe`,
  `pussy`,
  `zettai ryouiki`,
  `thigh gap`,
  `ass visible through thighs`,
  `ass`,
  `barefoot`,
  `no shoes`,
] as const satisfies readonly string[];
type ExposureTag = (typeof allExposureTags)[number];

const allOutfitTags = [
  `cleavage cutout`,
  `neck ribbon`,
  `blue ribbon`,
  `underbust`,
  `bowtie`,
  `blue bowtie`,
  `buttons`,
  `jewelry`,
  `bikini`,
  `red bikini`,
  `blue bikini`,
  `green bikini`,
  `yellow bikini`,
  `orange bikini`,
  `aqua bikini`,
  `white bikini`,
  `black bikini`,
  `pink bikini`,
  `purple bikini`,
  `frilled bikini`,
  `school uniform`,
  `school swimsuit`,
  `black one-piece swimsuit`,
  `blue one-piece swimsuit`,
  `white one-piece swimsuit`,
  `white jacket`,
  `white dress`,
  `black collar`,
  `white shirt`,
  `long sleeves`,
  `white sleeves`,
  `belt`,
  `white belt`,
  `red belt`,
  `detached collar`,
  `detached sleeves`,
  `maid`,
  `maid headdress`,
  `maid bikini`,
  `frills`,
  `apron`,
  `frilled apron`,
  `maid apron`,
  `waist apron`,
  `shirt`,
  `collared shirt`,
  `vest`,
  `green vest`,
  `blue vest`,
  `dress`,
  `red dress`,
  `black dress`,
  `grey dress`,
  `two-tone dress`,
  `off shoulder`,
  `off-shoulder dress`,
  `off-shoulder sweater`,
  `sweater`,
  `red sweater`,
  `sweater dress`,
  `office lady`,
  `choker`,
  `strap`,
  `gloves`,
  `black gloves`,
  `fingerless gloves`,
  `lycoris uniform`,
  `pleated dress`,
  `bikini skirt`,
  `skirt`,
  `white skirt`,
  `black skirt`,
  `green skirt`,
  `grey skirt`,
  `miniskirt`,
  `pencil skirt`,
  `red trim`,
  `pantyhose`,
  `thighhighs`,
  `black thighhighs`,
  `socks`,
  `white socks`,
  `black socks`,
  `shoes`,
  `loafers`,
  `underwear`,
  `panties`,
  `red panties`,
  `blue panties`,
  `green panties`,
  `yellow panties`,
  `orange panties`,
  `aqua panties`,
  `white panties`,
  `black panties`,
  `pink panties`,
  `purple panties`,
  `crotch seam`,
  `lace panties`,
  `tokiwadai school uniform`,
  `sweater vest`,
  `brown sweater vest`,
  `short sleeves`,
  `white gloves`,
  `elbow gloves`,
  `pleated skirt`,
  `white thighhighs`,
] as const satisfies readonly string[];
type OutfitTag = (typeof allOutfitTags)[number];

const allLoraTriggerTags = [
  `chino work`,
  `aachisato`,
  `hmmisaki`,
] as const satisfies readonly string[];
type LoraTriggerTag = (typeof allLoraTriggerTags)[number];

export type OutfitAndExposureTag = ExposureTag | OutfitTag | LoraTriggerTag;

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
