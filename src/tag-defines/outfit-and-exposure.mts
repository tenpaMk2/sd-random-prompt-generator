const allArmpitsTags = [`armpits`] as const satisfies readonly string[];
export type ArmpitsTag = (typeof allArmpitsTags)[number];

const allExposureTags = [
  `collarbone`,
  `bare shoulders`,
  `bare arms`,
  `cleavage`,
  `breasts`,
  `sideboob`,
  `backboob`,
  `underboob`,
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
  `partially unbuttoned`,
  `partially undressed`,
  `nsfw`,
] as const satisfies readonly string[];
type ExposureTag = (typeof allExposureTags)[number];

const allOutfitTags = [
  `cleavage cutout`,
  `neck ribbon`,
  `blue ribbon`,
  `black ribbon`,
  `underbust`,
  `bowtie`,
  `blue bowtie`,
  `white bowtie`,
  `red bowtie`,
  `green bowtie`,
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
  `print bikini`,
  `o-ring bikini`,
  `o-ring top`,
  `o-ring bottom`,
  `school uniform`,
  `school swimsuit`,
  `black one-piece swimsuit`,
  `blue one-piece swimsuit`,
  `white one-piece swimsuit`,
  `white jacket`,
  `white dress`,
  `black collar`,
  `red collar`,
  `long sleeves`,
  `white sleeves`,
  `belt`,
  `white belt`,
  `red belt`,
  `pink belt`,
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
  `red shirt`,
  `white shirt`,
  `pink shirt`,
  `collared shirt`,
  `vest`,
  `green vest`,
  `yellow vest`,
  `blue vest`,
  `black vest`,
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
  `infinite stratos academy school uniform`,
  `lycoris uniform`,
  `pleated dress`,
  `bikini skirt`,
  `skirt`,
  `white skirt`,
  `black skirt`,
  `green skirt`,
  `grey skirt`,
  `red skirt`,
  `orange skirt`,
  `purple skirt`,
  `pink skirt`,
  `blue skirt`,
  `miniskirt`,
  `plaid skirt`,
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
  `boots`,
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
  `yellow sweater vest`,
  `short sleeves`,
  `white gloves`,
  `elbow gloves`,
  `pleated skirt`,
  `frilled skirt`,
  `white thighhighs`,
  `sleeveless`,
  `sleeveless shirt`,
  `aiguillette`,
  `epaulettes`,
  `jacket`,
  `red jacket`,
  `black jacket`,
  `pink jacket`,
  `purple jacket`,
  `sleeveless jacket`,
  `military jacket`,
  `blazer`,
  `suit`,
  `business suit`,
  `pinstripe pattern`,
  `pumps`,
  `open clothes`,
  `open jacket`,
  `open shirt`,
  `pirate`,
  `pirate hat`,
  `eyepatch`, // TODO: Decide where `eyepatch` belongs. Outfit? Character feature?
  `ascot`,
  `gold trim`,
  `thigh boots`,
  `playboy bunny`,
  `rabbit ears`,
  `fake animal ears`,
  `latex leotard`,
  `wrist cuffs`,
  `leotard`,
  `red leotard`,
  `pink leotard`,
  `orange leotard`,
  `yellow leotard`,
  `green leotard`,
  `blue leotard`,
  `purple leotard`,
  `black leotard`,
  `white leotard`,
  `brown leotard`,
  `rabbit tail`,
  `magical girl`,
  `cloak`,
  `white cloak`,
  `hood`,
  `hood up`,
  `hooded cloak`,
  `bodystocking`,
  `black footwear`,
  `cross-laced footwear`,
  `panties under pantyhose`,
  `serafuku`,
  `sailor collar`,
  `blue sailor collar`,
  `neckerchief`,
  `red neckerchief`,
  `crop top`,
  `crop top overhang`,
  `cropped shirt`,
  `naked shirt`,
  `dress shirt`,
  `no bra`,
  `bottomless`,
] as const satisfies readonly string[];
type OutfitTag = (typeof allOutfitTags)[number];

const allLoraTriggerTags = [
  `chino work`,
  `aachisato`,
  `hmmisaki`,
  `SentoUniform`,
  `SentoVest`,
  `SentoSchoolUniform`,
  `SentoSuit`,
  `SentoCasual`,
  `SentoBikini`,
  `SentoPirate`,
] as const satisfies readonly string[];
type LoraTriggerTag = (typeof allLoraTriggerTags)[number];

export const allOutfitWildcards = {
  "__color__ bikini": [
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
  ],
  "__vivid_color__ bikini": [
    `red bikini`,
    `blue bikini`,
    `green bikini`,
    `yellow bikini`,
    `orange bikini`,
    `aqua bikini`,
    `pink bikini`,
    `purple bikini`,
  ],
  "__monochrome_color__ bikini": [`black bikini`, `white bikini`],
  "__color__ panties": [
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
  ],
  "__vivid_color__ panties": [
    `red panties`,
    `blue panties`,
    `green panties`,
    `yellow panties`,
    `orange panties`,
    `aqua panties`,
    `pink panties`,
    `purple panties`,
  ],
  "__monochrome_color__ panties": [`black panties`, `white panties`],
  __color_leotards__: [
    `black leotard`,
    `white leotard`,
    `red leotard`,
    `blue leotard`,
    `pink leotard`,
  ],
} as const satisfies { [key: string]: readonly OutfitTag[] };
export type OutfitWildcard = keyof typeof allOutfitWildcards;

export type OutfitAndExposureTag =
  | ExposureTag
  | OutfitTag
  | LoraTriggerTag
  | OutfitWildcard;

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
