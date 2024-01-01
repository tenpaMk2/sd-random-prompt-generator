import { Background, backgroundPreset } from "./background-candidates.mjs";
import { emotionPreset } from "./emotion-candidates.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";
import {
  BreastSizeOrder,
  BreastSizeTag,
  CharacterFeatureTag,
} from "./tag-defines/character-feature.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";
import { TagLeaf, Token } from "./tag-tree.mjs";

export type CharaDefine = Readonly<{
  // Key that is used for filename.
  key: string;
  // Character feature tokens.
  characterFeatureTree: TagLeaf<CharacterFeatureTag>;
  // Emotion candidates that are specified in `token-defines.mts` .
  emotionTree: TagLeaf<EmotionTag>;
  // Backgrounds, outfits and exposures.
  situations: readonly Readonly<{
    key: string;
    background: Background;
    outfitAndExposureTree: TagLeaf<OutfitAndExposureTag>;
    upskirtTree: TagLeaf<OutfitAndExposureTag>;
    whenRemoveShoes: {
      excludeTags: readonly OutfitAndExposureTag[];
      additionalFootTokensAfterRemoving: Token<OutfitAndExposureTag>[]; // Eg: `barefoot` or `no shoes` .
    };
  }>[];
}>;

const preset = {
  upskirtPanties: new TagLeaf<OutfitAndExposureTag>({
    tagEntries: [`underwear`, `panties`, `crotch seam`],
    children: [
      new TagLeaf({ tagEntries: [`red panties`] }),
      new TagLeaf({ tagEntries: [`blue panties`] }),
      new TagLeaf({ tagEntries: [`green panties`] }),
      new TagLeaf({ tagEntries: [`yellow panties`] }),
      new TagLeaf({ tagEntries: [`orange panties`] }),
      new TagLeaf({ tagEntries: [`aqua panties`] }),
      new TagLeaf({ tagEntries: [`white panties`] }),
      new TagLeaf({ tagEntries: [`black panties`] }),
      new TagLeaf({ tagEntries: [`pink panties`] }),
      new TagLeaf({ tagEntries: [`purple panties`] }),
    ],
  }),
} as const satisfies { [k in string]: TagLeaf<OutfitAndExposureTag> };

const generateMaidBkini = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `maid-bikini`,
  background: {
    fromHorizontalTree: backgroundPreset.fromHorizontalTree.cafe,
    fromBelowTree: new TagLeaf<BackgroundTag>({
      tagEntries: [],
      children: [
        backgroundPreset.fromBelowTree.heartBackground,
        backgroundPreset.fromBelowTree.ceiling,
      ],
    }),
    fromAboveTree: backgroundPreset.fromAboveTree.woodenFloor,
    lyingTree: backgroundPreset.lyingTree.whiteBackground,
    cleanTree: new TagLeaf<BackgroundTag>({
      tagEntries: [],
      children: [
        backgroundPreset.cleanTree.bedSheetWindow,
        backgroundPreset.cleanTree.heartBackground,
      ],
    }),
  },
  outfitAndExposureTree: new TagLeaf({
    tagEntries: [
      `maid`,
      `maid headdress`,
      `detached collar`,
      `bikini`,
      `maid bikini`,
      `skindentation`,
      `frills`,
      `apron`,
      `frilled apron`,
      `maid apron`,
      `waist apron`,
      `detached sleeves`,
      `collarbone`,
      `shoulder blades`,
      `armpits`,
      `navel`,
      ...(BreastSizeOrder[`medium breasts`] < BreastSizeOrder[breastSize]
        ? ([`cleavage`, `sideboob`, `backboob`] as const)
        : []),
      `skirt`,
      `miniskirt`,
      `thighhighs`,
      `thigh gap`,
      `zettai ryouiki`,
    ],
  }),
  upskirtTree: preset.upskirtPanties,
  whenRemoveShoes: {
    excludeTags: [],
    additionalFootTokensAfterRemoving: [],
  },
});

const generateSchoolSwimsuit = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `school-swimsuit`,
  background: {
    fromHorizontalTree: backgroundPreset.fromHorizontalTree.poolside,
    fromBelowTree: new TagLeaf<BackgroundTag>({
      tagEntries: [],
      children: [
        backgroundPreset.fromBelowTree.heartBackground,
        backgroundPreset.fromBelowTree.blueSky,
      ],
    }),
    fromAboveTree: backgroundPreset.fromAboveTree.poolside,
    lyingTree: backgroundPreset.lyingTree.whiteBackground,
    cleanTree: new TagLeaf<BackgroundTag>({
      tagEntries: [],
      children: [
        backgroundPreset.cleanTree.poolside,
        backgroundPreset.cleanTree.heartBackground,
      ],
    }),
  },
  outfitAndExposureTree: new TagLeaf({
    tagEntries: [
      `school swimsuit`,
      `blue one-piece swimsuit`, // TODO: FIXME
      `collarbone`,
      `bare shoulders`,
      `armpits`,
      `cleavage`,
      `bare arms`,
      `covered navel`,
      `bare legs`,
      `barefoot`,
      `shoulder blades`,
      `skindentation`,
      `skin tight`,
      `taut clothes`,
      ...(BreastSizeOrder[`medium breasts`] < BreastSizeOrder[breastSize]
        ? ([`cleavage`, `sideboob`, `backboob`] as const)
        : []),
    ],
  }),
  upskirtTree: new TagLeaf({ tagEntries: [] }),
  whenRemoveShoes: {
    excludeTags: [],
    additionalFootTokensAfterRemoving: [],
  },
});

// export const cecilia: CharaDefine = {
//   chara: [
//     `aacecilia`,
//     `cecilia alcott`,
//     `blue eyes`,
//     `tareme`,
//     `eyelashes`,
//     `long eyelashes`,
//     `blonde hair`,
//     `long hair`,
//     `curly hair`,
//     `drill hair`,
//     `twin drills`,
//     `hair between eyes`,
//     `sidelocks`,
//     `drill sidelocks`,
//     `hairband`,
//     `blue hairband`,
//     `lace-trimmed hairband`,
//     `large breasts`,
//     `thick thighs`,
//   ],

//   emotionCandidates: [
//     [`blush`, `smile`],
//     [`blush`, `light smile`],
//     [`blush`, `smile`, `parted lips`],
//     [`blush`, `smile`, `:d`, `open mouth`],
//     [`blush`, `smile`, `half-closed eyes`],
//     [`blush`, `expressionless`],
//     [`blush`, `surprised`, `:o`, `open mouth`],
//     [`blush`, `nose blush`, `embarrassed`],
//     [`blush`, `nose blush`, `nervous`],
//     [`blush`, `nose blush`, `flustered`],
//     [`blush`, `naughty face`, `smile`, `half-closed eyes`],
//     [`blush`, `nose blush`, `scowl`],
//     [`blush`, `smile`, `one eye closed`, `;)`, `closed mouth`],
//     [`blush`, `smile`, `one eye closed`, `;d`, `open mouth`],
//   ],

//   outfits: [
//     {
//       backgroundDefine: {
//         fromHorizontal: [[`indoors`, `classroom`]],
//         fromBelow: [[`indoors`, `ceiling`]],
//         fromAbove: [[`indoors`]],
//         lying: [
//           [`simple background`, `white background`],
//           [`simple background`, `pink background`],
//         ],
//       },
//       upperOutfit: [
//         `school uniform`,
//         `white jacket`,
//         `white dress`,
//         `black collar`,
//         `neck ribbon`,
//         `blue ribbon`,
//         `white shirt`,
//         `long sleeves`,
//         `white sleeves`,
//         `belt`,
//         `white belt`,
//       ],
//       lowerOutfit: [
//         `skirt`,
//         `white skirt`,
//         `miniskirt`,
//         `red trim`,
//         `pantyhose`,
//       ],
//     },
//     {
//       backgroundDefine: {
//         fromHorizontal: [[`outdoors`, `beach`]],
//         fromBelow: [[`outdoors`, `blue sky`]],
//         fromAbove: [[`outdoors`, `ocean`]],
//         lying: [[`outdoors`, `ocean`, `partially submerged`]],
//       },
//       upperOutfit: [
//         `bikini`,
//         `blue bikini`,
//         `collarbone`,
//         `bare arms`,
//         `navel`,
//         `armpits`,
//       ],
//       lowerOutfit: [`bikini skirt`, `bare legs`, `thigh gap`],
//     },
//     generateMaidBkini({ breastSize: `large breasts` }),
//   ],
// } as const;

// export const kafuuChino: CharaDefine = {
//   chara: [
//     `kafuu chino`,
//     `blue eyes`,
//     `light blue hair`,
//     `long hair`,
//     `straight hair`,
//     `hair between eyes`,
//     `hair ornament`,
//     `x hair ornament`,
//     `loli`,
//     `flat chest`,
//   ],

//   emotionCandidates: [
//     [`blush`, `smile`],
//     [`blush`, `light smile`],
//     [`blush`, `smile`, `parted lips`],
//     [`blush`, `smile`, `:d`, `open mouth`],
//     [`blush`, `smile`, `half-closed eyes`],
//     [`blush`, `expressionless`],
//     [`blush`, `surprised`, `:o`, `open mouth`],
//     [`blush`, `nose blush`, `embarrassed`],
//     [`blush`, `nose blush`, `nervous`],
//     [`blush`, `nose blush`, `flustered`],
//     [`blush`, `naughty face`, `smile`, `half-closed eyes`],
//     [`blush`, `nose blush`, `scowl`],
//     [`blush`, `smile`, `one eye closed`, `;)`, `closed mouth`],
//     [`blush`, `smile`, `one eye closed`, `;d`, `open mouth`],
//   ],

//   outfits: [
//     {
//       backgroundDefine: {
//         fromHorizontal: [[`indoors`, `cafe`]],
//         fromBelow: [[`indoors`, `ceiling`]],
//         fromAbove: [[`indoors`]],
//         lying: [
//           [`simple background`, `white background`],
//           [`simple background`, `pink background`],
//         ],
//       },
//       upperOutfit: [
//         `chino work`,
//         `shirt`,
//         `white shirt`,
//         `collared shirt`,
//         `bowtie`,
//         `blue bowtie`,
//         `vest`,
//         `blue vest`,
//         `long sleeves`,
//       ],
//       lowerOutfit: [`skirt`, `black skirt`],
//     },
//     {
//       backgroundDefine: {
//         fromHorizontal: [[`outdoors`, `beach`]],
//         fromBelow: [[`outdoors`, `blue sky`]],
//         fromAbove: [[`outdoors`, `ocean`]],
//         lying: [[`outdoors`, `ocean`, `partially submerged`]],
//       },
//       upperOutfit: [
//         `bikini`,
//         `blue bikini`,
//         `frilled bikini`,
//         `collarbone`,
//         `bare arms`,
//         `navel`,
//         `armpits`,
//       ],
//       lowerOutfit: [`bikini skirt`, `bare legs`, `thigh gap`],
//     },
//     generateMaidBkini({ breastSize: `flat chest` }),
//   ],
// } as const;

// export const yorBriar: CharaDefine = {
//   chara: [
//     `yor briar`,
//     `red eyes`,
//     `tsurime`,
//     `eyelashes`,
//     `black hair`,
//     `long hair`,
//     `short hair with long locks`,
//     `hair between eyes`,
//     `sidelocks`,
//     `hairband`,
//     `white hairband`,
//     `earrings`,
//     `large breasts`,
//     `thick thighs`,
//   ],

//   emotionCandidates: [
//     [`blush`, `smile`],
//     [`blush`, `light smile`],
//     [`blush`, `smile`, `parted lips`],
//     [`blush`, `smile`, `:d`, `open mouth`],
//     [`blush`, `smile`, `half-closed eyes`],
//     [`blush`, `expressionless`],
//     [`blush`, `surprised`, `:o`, `open mouth`],
//     [`blush`, `nose blush`, `embarrassed`],
//     [`blush`, `nose blush`, `nervous`],
//     [`blush`, `nose blush`, `flustered`],
//     [`blush`, `naughty face`, `smile`, `half-closed eyes`],
//     [`blush`, `nose blush`, `scowl`],
//     [`blush`, `smile`, `one eye closed`, `;)`, `closed mouth`],
//     [`blush`, `smile`, `one eye closed`, `;d`, `open mouth`],
//   ],

//   outfits: [
//     {
//       backgroundDefine: {
//         fromHorizontal: [[`indoors`]],
//         fromBelow: [[`indoors`, `ceiling`]],
//         fromAbove: [[`indoors`]],
//         lying: [
//           [`simple background`, `white background`],
//           [`simple background`, `pink background`],
//         ],
//       },
//       upperOutfit: [
//         `bare shoulders`,
//         `collarbone`,
//         `cleavage`,
//         `armpits`,
//         `dress`,
//         `red dress`,
//         `long sleeves`,
//         `off shoulder`,
//         `off-shoulder dress`,
//         `off-shoulder sweater`,
//         `sweater`,
//         `red sweater`,
//         `sweater dress`,
//       ],
//       lowerOutfit: [`pantyhose`],
//     },
//     {
//       backgroundDefine: {
//         fromHorizontal: [[`indoors`, `office`]],
//         fromBelow: [[`indoors`, `ceiling`, `office`]],
//         fromAbove: [[`indoors`, `floor`, `office`]],
//         lying: [
//           [`simple background`, `white background`],
//           [`simple background`, `pink background`],
//         ],
//       },
//       upperOutfit: [
//         `office lady`,
//         `collarbone`,
//         `shirt`,
//         `white shirt`,
//         `collared shirt`,
//         `vest`,
//         `green vest`,
//         `long sleeves`,
//         `buttons`,
//       ],
//       lowerOutfit: [`skirt`, `green skirt`, `pencil skirt`, `pantyhose`],
//     },
//   ],
// } as const;

// export const yorBriarAssassin: CharaDefine = {
//   chara: [
//     `yor briar`,
//     `red eyes`,
//     `tsurime`,
//     `eyelashes`,
//     `black hair`,
//     `long hair`,
//     `short hair with long locks`,
//     `hair between eyes`,
//     `sidelocks`,
//     `hairband`,
//     `gold hairband`,
//     `earrings`,
//     `gold earrings`,
//     `large breasts`,
//     `thick thighs`,
//   ],

//   emotionCandidates: [
//     [`blush`, `smile`],
//     [`blush`, `light smile`],
//     [`blush`, `smile`, `parted lips`],
//     [`blush`, `smile`, `half-closed eyes`],
//     [`blush`, `expressionless`],
//     [`blush`, `surprised`, `:o`, `open mouth`],
//     [`blush`, `naughty face`, `smile`, `half-closed eyes`],
//     [`blush`, `nose blush`, `scowl`],
//   ],

//   outfits: [
//     {
//       backgroundDefine: {
//         fromHorizontal: [
//           [`outdoors`, `night`],
//           [`indoors`, `night`, `window`],
//         ],
//         fromBelow: [[`outdoors`, `night`, `night sky`]],
//         fromAbove: [[`outdoors`, `night`]],
//         lying: [
//           [`simple background`, `white background`],
//           [`simple background`, `pink background`],
//         ],
//       },
//       upperOutfit: [
//         `choker`,
//         `collarbone`,
//         `strap`,
//         `dress`,
//         `black dress`,
//         `cleavage`,
//         `jewelry`,
//         `bare shoulders`,
//         `gloves`,
//         `black gloves`,
//         `fingerless gloves`,
//       ],
//       lowerOutfit: [`thighhighs`, `black thighhighs`],
//     },
//   ],
// } as const;

// export const nishikigiChisato = {
//   key: `nishikigi-chisato-h-madoka`,
//   characterFeatureTree: [
//     new CharaS(`<lora:nishikigi_chisato_v1:0.75>`),
//     new CharaS(`lycoris recoil`),
//     new CharaS(`nishikigi chisato`),
//     new CharaS(`red eyes`),
//     new CharaS(`blonde hair`),
//     new CharaS(`short hair`),
//     new CharaS(`bob cut`),
//     new CharaS(`hair ribbon`),
//     new CharaS(`large breasts`),
//   ],
//   emotionTokens: emotionPreset.chisato,
//   situations: [
//     {
//       key: `lycoris-uniform`,
//       backgroundTokens: {
//         fromHorizontal: [
//           new BackgroundD(`indoors`, [
//             backgroundCandidates.fromHorizontal.city,
//           ]),
//         ],
//         fromBelow: [
//           new BackgroundD(`indoors`, [backgroundCandidates.fromBelow.blueSky]),
//         ],
//         fromAbove: [
//           new BackgroundD(`indoors`, [backgroundCandidates.fromAbove.grass]),
//         ],
//         lying: [
//           new BackgroundD(`indoors`, [
//             backgroundCandidates.lying.whiteBackground,
//             backgroundCandidates.lying.pinkBackground,
//           ]),
//         ],
//         clean: [
//           new BackgroundD(`indoors`, [
//             backgroundCandidates.clean.bedSheetWindow,
//             backgroundCandidates.clean.grassBlueSky,
//             backgroundCandidates.clean.heartBackground,
//           ]),
//         ],
//       },

//       outfitAndExposureTokens: [
//         new OutfitAndExposureS(`aachisato`),
//         new OutfitAndExposureS(`lycoris uniform`),
//         new OutfitAndExposureS(`neck ribbon`),
//         new OutfitAndExposureS(`blue ribbon`),
//         new OutfitAndExposureS(`collared shirt`),
//         new OutfitAndExposureS(`two-tone dress`),
//         new OutfitAndExposureS(`red dress`),
//         new OutfitAndExposureS(`grey dress`),
//         new OutfitAndExposureS(`long sleeves`),
//         new OutfitAndExposureS(`red belt`),
//         new OutfitAndExposureS(`taut clothes`),
//         new OutfitAndExposureS(`pleated dress`),
//         new OutfitAndExposureS(`socks`),
//         new OutfitAndExposureS(`shoes`),
//         new OutfitAndExposureS(`loafers`),
//       ],

//       upskirtTokens: preset.upskirtPanties,
//       whenRemoveShoes: {
//         excludeTokens: [
//           new OutfitAndExposureS(`shoes`),
//           new OutfitAndExposureS(`loafers`),
//         ],
//         additionalFootTokensAfterRemoving: [new OutfitAndExposureS(`no shoes`)],
//       },
//     },
//     generateMaidBkini({ breastSize: `large breasts` }),
//   ],
// } as const satisfies CharaDefine;

export const shokuhoMisaki = {
  key: `shokuho-misaki-h-madoka`,
  characterFeatureTree: new TagLeaf({
    tagEntries: [
      `<lora:shokuhou_misaki_v2:0.7>`,
      `toaru kagaku no railgun`,
      `shokuhou misaki`,
      `yellow eyes`,
      { tag: `sparkling eyes`, weight: 1.5 },
      { tag: `star-shaped pupils`, weight: 1.5 },
      { tag: `+ +`, weight: 1.5 },
      `symbol-shaped pupils`,
      `blonde hair`,
      `long hair`,
      `straight hair`,
      `hair between eyes`,
      `large breasts`,
      `thick thighs`,
    ],
  }),

  emotionTree: emotionPreset.shokuhoMisaki,
  situations: [
    {
      key: `tokiwadai-school-uniform`,
      background: {
        fromHorizontalTree: backgroundPreset.fromHorizontalTree.city,
        fromBelowTree: backgroundPreset.fromBelowTree.blueSky,
        fromAboveTree: backgroundPreset.fromAboveTree.grass,
        lyingTree: new TagLeaf<BackgroundTag>({
          tagEntries: [],
          children: [
            backgroundPreset.lyingTree.whiteBackground,
            backgroundPreset.lyingTree.pinkBackground,
          ],
        }),
        cleanTree: new TagLeaf<BackgroundTag>({
          tagEntries: [],
          children: [
            backgroundPreset.cleanTree.bedSheetWindow,
            backgroundPreset.cleanTree.grassBlueSky,
            backgroundPreset.cleanTree.heartBackground,
          ],
        }),
      },

      outfitAndExposureTree: new TagLeaf({
        tagEntries: [
          `hmmisaki`,
          `tokiwadai school uniform`,
          `school uniform`,
          `shirt`,
          `white shirt`,
          `collared shirt`,
          `sweater vest`,
          `short sleeves`,
          `white gloves`,
          `elbow gloves`,
          `skirt`,
          `pleated skirt`,
          `thighhighs`,
          `white thighhighs`,
          `taut clothes`,
          `skindentation`,
          `socks`,
          `loafers`,
        ],
      }),
      upskirtTree: preset.upskirtPanties,
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [new Token(`no shoes`)],
      },
    },
    generateMaidBkini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;
