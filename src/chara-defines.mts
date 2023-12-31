import { backgroundCandidates } from "./background-candidates.mjs";
import { emotionPreset } from "./emotion-candidates.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";
import {
  BreastSizeOrder,
  BreastSizeTag,
  CharacterFeatureTag,
} from "./tag-defines/character-feature.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";
import { DynamicPrompt, SingleTagToken, Token } from "./token.mjs";

const CharaS = SingleTagToken<CharacterFeatureTag>;
const CharaD = DynamicPrompt<CharacterFeatureTag>;
const EmotionS = SingleTagToken<EmotionTag>;
const EmotionD = DynamicPrompt<EmotionTag>;
const BackgroundS = SingleTagToken<BackgroundTag>;
const BackgroundD = DynamicPrompt<BackgroundTag>;
const OutfitAndExposureS = SingleTagToken<OutfitAndExposureTag>;
const OutfitAndExposureD = DynamicPrompt<OutfitAndExposureTag>;

type Background = Readonly<{
  fromHorizontal: readonly Token<BackgroundTag>[];
  fromBelow: readonly Token<BackgroundTag>[];
  fromAbove: readonly Token<BackgroundTag>[];
  lying: readonly Token<BackgroundTag>[];
  clean: readonly Token<BackgroundTag>[]; // For sitting or all fours.
}>;

export type CharaDefine = Readonly<{
  // Key that is used for filename.
  key: string;
  // Character feature tokens.
  characterFeatureTokens: readonly Token<CharacterFeatureTag>[];
  // Emotion candidates that are specified in `token-defines.mts` .
  emotionTokens: readonly Token<EmotionTag>[];
  // Backgrounds, outfits and exposures.
  situations: readonly Readonly<{
    key: string;
    backgroundTokens: Background;
    outfitAndExposureTokens: readonly Token<OutfitAndExposureTag>[];
  }>[];
}>;

const generateMaidBkini = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `maid-bikini`,
  backgroundTokens: {
    fromHorizontal: [
      new BackgroundD(`indoors`, [backgroundCandidates.fromHorizontal.cafe]),
    ],
    fromBelow: [
      new BackgroundD(`indoors`, [
        backgroundCandidates.fromBelow.heartBackground,
        backgroundCandidates.fromBelow.ceiling,
      ]),
    ],
    fromAbove: [
      new BackgroundD(`indoors`, [backgroundCandidates.fromAbove.woodenFloor]),
    ],
    lying: [new BackgroundD(`indoors`, [backgroundCandidates.lying.bedSheet])],
    clean: [
      new BackgroundD(`indoors`, [
        backgroundCandidates.clean.bedSheetWindow,
        backgroundCandidates.clean.heartBackground,
      ]),
    ],
  },
  outfitAndExposureTokens: [
    new OutfitAndExposureS(`maid`),
    new OutfitAndExposureS(`maid headdress`),
    new OutfitAndExposureS(`detached collar`),
    new OutfitAndExposureS(`bikini`),
    new OutfitAndExposureS(`maid bikini`),
    new OutfitAndExposureS(`frills`),
    new OutfitAndExposureS(`apron`),
    new OutfitAndExposureS(`frilled apron`),
    new OutfitAndExposureS(`maid apron`),
    new OutfitAndExposureS(`waist apron`),
    new OutfitAndExposureS(`detached sleeves`),
    new OutfitAndExposureS(`collarbone`),
    new OutfitAndExposureS(`shoulder blades`),
    new OutfitAndExposureS(`armpits`),
    new OutfitAndExposureS(`navel`),
    new OutfitAndExposureS(`sideboob`),
    ...(BreastSizeOrder[`medium breasts`] < BreastSizeOrder[breastSize]
      ? [new OutfitAndExposureS(`sideboob`)]
      : []),
    new OutfitAndExposureS(`skirt`),
    new OutfitAndExposureS(`miniskirt`),
    new OutfitAndExposureS(`thighhighs`),
    new OutfitAndExposureS(`thigh gap`),
    new OutfitAndExposureS(`zettai ryouiki`),
  ],
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

export const nishikigiChisato = {
  key: `nishikigi-chisato-h-madoka`,
  characterFeatureTokens: [
    new CharaS(`<lora:nishikigi_chisato_v1:0.75>`),
    new CharaS(`lycoris recoil`),
    new CharaS(`nishikigi chisato`),
    new CharaS(`red eyes`),
    new CharaS(`blonde hair`),
    new CharaS(`short hair`),
    new CharaS(`bob cut`),
    new CharaS(`hair ribbon`),
    new CharaS(`large breasts`),
  ],
  emotionTokens: emotionPreset.chisato,
  situations: [
    {
      key: `lycoris-uniform`,
      backgroundTokens: {
        fromHorizontal: [
          new BackgroundD(`indoors`, [
            backgroundCandidates.fromHorizontal.city,
          ]),
        ],
        fromBelow: [
          new BackgroundD(`indoors`, [backgroundCandidates.fromBelow.blueSky]),
        ],
        fromAbove: [
          new BackgroundD(`indoors`, [backgroundCandidates.fromAbove.grass]),
        ],
        lying: [
          new BackgroundD(`indoors`, [
            backgroundCandidates.lying.whiteBackground,
            backgroundCandidates.lying.pinkBackground,
          ]),
        ],
        clean: [
          new BackgroundD(`indoors`, [
            backgroundCandidates.clean.bedSheetWindow,
            backgroundCandidates.clean.grassBlueSky,
            backgroundCandidates.clean.heartBackground,
          ]),
        ],
      },

      outfitAndExposureTokens: [
        new OutfitAndExposureS(`aachisato`),
        new OutfitAndExposureS(`lycoris uniform`),
        new OutfitAndExposureS(`neck ribbon`),
        new OutfitAndExposureS(`blue ribbon`),
        new OutfitAndExposureS(`collared shirt`),
        new OutfitAndExposureS(`two-tone dress`),
        new OutfitAndExposureS(`red dress`),
        new OutfitAndExposureS(`grey dress`),
        new OutfitAndExposureS(`long sleeves`),
        new OutfitAndExposureS(`red belt`),
        new OutfitAndExposureS(`taut clothes`),
        new OutfitAndExposureS(`pleated dress`),
        new OutfitAndExposureS(`socks`),
        new OutfitAndExposureS(`loafers`),
      ],
    },
    generateMaidBkini({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;
