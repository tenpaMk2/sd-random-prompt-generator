import {
  Background,
  BodyFeatureToken,
  BreastSizeOrder,
  BreastSizeToken,
  EmotionCandidate,
  HeadFeatureToken,
  LoraToken,
  NameToken,
  OutfitAndExposureToken,
} from "./token-defines.mjs";

type CharacterFeatureToken =
  | NameToken
  | LoraToken
  | HeadFeatureToken
  | BreastSizeToken
  | BodyFeatureToken;

type Situation = Readonly<{
  key: string;
  background: Background;
  outfitAndExposure: readonly OutfitAndExposureToken[];
}>;

export type CharaDefine = Readonly<{
  // Key that is used for filename.
  key: string;
  // Character feature tokens.
  charaTokens: readonly CharacterFeatureToken[];
  // Emotion candidates that are specified in `token-defines.mts` .
  emotionCandidates: readonly EmotionCandidate[];
  // Backgrounds, outfits and exposures.
  situations: readonly Situation[];
}>;

const generateMaidBkini = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeToken;
}): Situation => ({
  key: `maid-bikini`,
  background: {
    fromHorizontal: [
      [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    ],
    fromBelow: [[`outdoors`, `blue sky`]],
    fromAbove: [[`outdoors`, `ocean`]],
    lying: [[`outdoors`, `ocean`, `partially submerged`]],
    clean: [
      [`indoors`, `bed sheet`, `window`],
      [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    ],
  },
  outfitAndExposure: [
    `maid`,
    `maid headdress`,
    `detached collar`,
    `bikini`,
    `maid bikini`,
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
    `sideboob`,
    ...(BreastSizeOrder[`medium breasts`] < BreastSizeOrder[breastSize]
      ? ([`cleavage`] as const)
      : ([] as const)),
    `skirt`,
    `miniskirt`,
    `thighhighs`,
    `thigh gap`,
    `zettai ryouiki`,
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

export const nishikigiChisato: CharaDefine = {
  key: `nishikigi-chisato-h-madoka`,
  charaTokens: [
    `<lora:nishikigi_chisato_v1:0.75>`,
    `nishikigi chisato`,
    `red eyes`,
    `blonde hair`,
    `short hair`,
    `bob cut`,
    `hair ribbon`,
    `large breasts`,
  ],

  emotionCandidates: [
    [`blush`, `smile`],
    [`blush`, `light smile`],
    [`blush`, `smile`, `parted lips`],
    [`blush`, `smile`, `:d`, `open mouth`],
    [`blush`, `smile`, `half-closed eyes`],
    [`blush`, `expressionless`],
    [`blush`, `surprised`, `:o`, `open mouth`],
    [`blush`, `nose blush`, `embarrassed`],
    [`blush`, `nose blush`, `nervous`],
    [`blush`, `nose blush`, `flustered`],
    [`blush`, `naughty face`, `smile`, `half-closed eyes`],
    [`blush`, `nose blush`, `scowl`],
  ],

  situations: [
    {
      key: `lycoris-uniform`,
      background: {
        fromHorizontal: [[`outdoors`, `city`]],
        fromBelow: [[`outdoors`, `blue sky`]],
        fromAbove: [[`outdoors`, `grass`]],
        lying: [
          [`simple background`, `white background`],
          [`simple background`, `pink background`],
        ],
        clean: [
          [`indoors`, `bed sheet`, `window`],
          [`outdoors`, `grass`, `blue sky`],
          [
            `simple background`,
            `white background`,
            `heart background`,
            `heart`,
            `spoken heart`,
          ],
        ],
      },
      outfitAndExposure: [
        `aachisato`,
        `lycoris uniform`,
        `neck ribbon`,
        `blue ribbon`,
        `collared shirt`,
        `two-tone dress`,
        `red dress`,
        `grey dress`,
        `long sleeves`,
        `red belt`,
        `taut clothes`,
        `pleated dress`,
        `socks`,
        `loafers`,
      ],
    },
  ],
} as const;
