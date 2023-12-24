import {
  ArmpitsToken,
  BackHeadFeatureToken,
  BackLowerOutfitToken,
  BackUpperOutfitToken,
  BackgroundDefine,
  BreastSizeOrder,
  BreastSizeToken,
  EmotionCandidate,
  FrontHeadFeatureToken,
  FrontLowerOutfitToken,
  FrontUpperOutfitToken,
  LowerBodyFeatureToken,
  NameToken,
  SideUpperOutfitToken,
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
  | SideUpperOutfitToken
  | BackUpperOutfitToken
  | ArmpitsToken;
type LowerOutfitToken = FrontLowerOutfitToken | BackLowerOutfitToken;

type Outfit = {
  backgroundDefine: BackgroundDefine;
  upperOutfit: UpperOutfitToken[];
  lowerOutfit: LowerOutfitToken[];
};

export type CharaDefine = {
  // 身体的な特徴(例外的に頭部の飾りを含む)
  chara: CharacterFeatureToken[];
  // 表情候補
  emotionCandidates: EmotionCandidate[];
  // 服装と露出部位
  outfits: Outfit[];
};

const generateMaidBkini = ({
  breastSize,
}: {
  breastSize: BreastSizeToken;
}): Outfit => ({
  backgroundDefine: {
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
  },
  upperOutfit: [
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
  ],
  lowerOutfit: [
    `skirt`,
    `miniskirt`,
    `thighhighs`,
    `thigh gap`,
    `zettai ryouiki`,
  ],
});

export const cecilia: CharaDefine = {
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
    generateMaidBkini({ breastSize: `large breasts` }),
  ],
} as const;
