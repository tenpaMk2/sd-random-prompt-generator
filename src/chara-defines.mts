import {
  ArmpitsToken,
  BackHeadFeatureToken,
  BackLowerOutfitToken,
  BackUpperOutfitToken,
  BackgroundDefine,
  BreastSizeToken,
  EmotionCandidate,
  FrontHeadFeatureToken,
  FrontLowerOutfitToken,
  FrontUpperOutfitToken,
  LowerBodyFeatureToken,
  NameToken,
  WholeBodyFeatureToken,
} from "./defines.mjs";

type CharacterFeatureToken =
  | NameToken
  | FrontHeadFeatureToken
  | BackHeadFeatureToken
  | BreastSizeToken
  | LowerBodyFeatureToken
  | WholeBodyFeatureToken;

type UpperOutfitToken =
  | FrontUpperOutfitToken
  | BackUpperOutfitToken
  | ArmpitsToken;
type LowerOutfitToken = FrontLowerOutfitToken | BackLowerOutfitToken;

export type CharaDefine = {
  chara: CharacterFeatureToken[];
  emotionCandidates: EmotionCandidate[];
  outfits: {
    backgroundDefine: BackgroundDefine;
    upperOutfit: UpperOutfitToken[];
    lowerOutfit: LowerOutfitToken[];
  }[];
};

export const cecilia: CharaDefine = {
  // 服装に依存しない身体的な特徴
  chara: [
    `aacecilia`,
    `cecilia alcott`,
    `blue eyes`,
    `tareme`,
    `eyelashes`,
    `long eyelashes`,
    `blonde hair`,
    `long hair`,
    `curly hair`,
    `drill hair`,
    `twin drills`,
    `hair between eyes`,
    `sidelocks`,
    `drill sidelocks`,
    `hairband`,
    `blue hairband`,
    `lace-trimmed hairband`,
    `large breasts`,
    `thick thighs`,
  ],

  // 表情候補
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
    [`blush`, `smile`, `one eye closed`, `;)`, `closed mouth`],
    [`blush`, `smile`, `one eye closed`, `;d`, `open mouth`],
  ],

  // 服装と露出部位
  outfits: [
    {
      backgroundDefine: {
        fromHorizontal: [[`indoors`, `classroom`]],
        fromBelow: [[`indoors`, `ceiling`]],
        fromAbove: [[`indoors`]],
        lying: [
          [`simple background`, `white background`],
          [`simple background`, `pink background`],
        ],
      },
      upperOutfit: [
        `school uniform`,
        `white jacket`,
        `white dress`,
        `black collar`,
        `neck ribbon`,
        `blue ribbon`,
        `white shirt`,
        `long sleeves`,
        `white sleeves`,
        `belt`,
        `white belt`,
      ],
      lowerOutfit: [
        `skirt`,
        `white skirt`,
        `miniskirt`,
        `red trim`,
        `pantyhose`,
      ],
    },
    {
      backgroundDefine: {
        fromHorizontal: [[`outdoors`, `beach`]],
        fromBelow: [[`outdoors`, `blue sky`]],
        fromAbove: [[`outdoors`, `ocean`]],
        lying: [[`outdoors`, `ocean`, `partially submerged`]],
      },
      upperOutfit: [
        `bikini`,
        `blue bikini`,
        `collarbone`,
        `bare arms`,
        `navel`,
        `armpits`,
      ],
      lowerOutfit: [`bikini skirt`, `bare legs`, `thigh gap`],
    },
  ],
} as const;
