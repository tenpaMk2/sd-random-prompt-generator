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
  `skindentation`,
  `bare legs`,
  `cameltoe`,
  `pussy`,
  `zettai ryouiki`,
  `thigh gap`,
  `ass visible through thighs`,
  `ass`,
  `barefoot`,
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
  `blue bikini`,
  `frilled bikini`,
  `school uniform`,
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
  `miniskirt`,
  `pencil skirt`,
  `red trim`,
  `pantyhose`,
  `thighhighs`,
  `black thighhighs`,
  `socks`,
  `white socks`,
  `black socks`,
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
] as const satisfies readonly string[];
type OutfitTag = (typeof allOutfitTags)[number];

const allLoraTriggerTags = [
  `chino work`,
  `aachisato`,
] as const satisfies readonly string[];
type LoraTriggerTag = (typeof allLoraTriggerTags)[number];

export type OutfitAndExposureTag = ExposureTag | OutfitTag | LoraTriggerTag;
