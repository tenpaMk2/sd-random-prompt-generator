import { backgroundPreset } from "./background-preset.mjs";
import { emotionPreset } from "./emotion-preset.mjs";
import { PromptDefine, SimpleToken } from "./prompt-define.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";
import {
  BreastSizeOrder,
  BreastSizeTag,
  CharacterFeatureTag,
} from "./tag-defines/character-feature.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";
import { upskirtPreset } from "./upskirt-preset.mjs";

/**
 * Character define.
 */
export type CharaDefine = Readonly<{
  /**
   * Key used for filename.
   */
  key: string;
  /**
   * Character feature defines.
   */
  characterFeature: PromptDefine<CharacterFeatureTag>;
  /**
   * Emotion defines.
   */
  emotion: PromptDefine<EmotionTag>;
  /**
   * Situation defines that are consists of background, outfit and exposure defines.
   */
  situations: readonly Readonly<{
    /**
     * Key used for filename.
     */
    key: string;
    /**
     * Background defines.
     */
    background: {
      fromHorizontal: PromptDefine<BackgroundTag>;
      fromBelow: PromptDefine<BackgroundTag>;
      fromAbove: PromptDefine<BackgroundTag>;
      lying: PromptDefine<BackgroundTag>;
      clean: PromptDefine<BackgroundTag>; // For sitting or all fours.
    };
    /**
     * Outfit and exposure defines such as `red shirt` , `collarbone` and `thigh gap` .
     */
    outfitAndExposure: PromptDefine<OutfitAndExposureTag>;
    /**
     * Visibility of armpits.
     * You cannot define variations of armpits visibility at the same situation.
     */
    isArmpitsVisible?: boolean;
    /**
     * Lift type for clothes lift.
     */
    liftType?: `none` | `skirt` | `dress`;
    /**
     * Outfit and exposure defines in the skirt for when `upskirt` is specified.
     */
    upskirt?: PromptDefine<OutfitAndExposureTag>;
    /**
     * Outfit and exposure defines at foot for when footwear should be removed.
     */
    whenRemoveShoes?: {
      /**
       * Exclude tags that is in the `outfitAndExposureTree` .
       */
      excludeTags: readonly OutfitAndExposureTag[];
      /**
       * Tokens for when footwear is removed.
       * @example `[new Token(\`no shoes\`)]` , `[new Token(\`barefoor\`)]`
       */
      additionalFootTokensAfterRemoving: SimpleToken<OutfitAndExposureTag>[];
    };
  }>[];
}>;
// bikiniColorStrong: ({
//   tagEntries: [],
//   children: [
//     new TagLeaf({ tagEntries: [{ tag: `red bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `blue bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `green bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `yellow bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `orange bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `aqua bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `white bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `black bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `pink bikini`, weight: 1.3 }] }),
//     new TagLeaf({ tagEntries: [{ tag: `purple bikini`, weight: 1.3 }] }),
//   ],
// }),

const generateBikini = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `bikini`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromHorizontalEntries.ocean,
    ),
    fromBelow: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromBelowEntries.heartBackground },
        { entries: backgroundPreset.fromBelowEntries.blueSky },
      ],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromAboveEntries.oceanPartiallySubmerged,
    ),
    lying: new PromptDefine<BackgroundTag>(
      backgroundPreset.lyingEntries.oceanPartiallySubmerged,
    ),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.oceanPartiallySubmerged },
        { entries: backgroundPreset.cleanEntries.heartBackground },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `bikini`,
    `skindentation`,
    `collarbone`,
    `shoulder blades`,
    `navel`,
    `thigh gap`,
    `bare arms`,
    `bare legs`,
    `barefoot`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `sideboob`, `backboob`] as const)
      : []),
    { tag: `__vivid_color__ bikini`, weight: 1.2 },
  ]),
  isArmpitsVisible: true,
});

const generateMaidBikini = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `maid-bikini`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromHorizontalEntries.cafe,
    ),
    fromBelow: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromBelowEntries.heartBackground },
        { entries: backgroundPreset.fromBelowEntries.ceiling },
      ],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromAboveEntries.woodenFloor,
    ),
    lying: new PromptDefine<BackgroundTag>(
      backgroundPreset.lyingEntries.whiteBackground,
    ),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.bedSheetWindow },
        { entries: backgroundPreset.cleanEntries.heartBackground },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine([
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
    `navel`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `sideboob`, `backboob`] as const)
      : []),
    `skirt`,
    `miniskirt`,
    `thighhighs`,
    `thigh gap`,
    `zettai ryouiki`,
  ]),
  isArmpitsVisible: true,
  liftType: `skirt`,
  upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
});

const generateSchoolSwimsuit = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `school-swimsuit`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromHorizontalEntries.poolside,
    ),
    fromBelow: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromBelowEntries.heartBackground },
        { entries: backgroundPreset.fromBelowEntries.blueSky },
      ],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromAboveEntries.poolside,
    ),
    lying: new PromptDefine<BackgroundTag>(
      backgroundPreset.lyingEntries.whiteBackground,
    ),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.poolside },
        { entries: backgroundPreset.cleanEntries.heartBackground },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `school swimsuit`,
    [
      { entries: [`black one-piece swimsuit`] },
      { entries: [`blue one-piece swimsuit`] },
      { entries: [`white one-piece swimsuit`] },
    ],
    `collarbone`,
    `bare shoulders`,
    `bare arms`,
    `covered navel`,
    `bare legs`,
    `barefoot`,
    `shoulder blades`,
    `skindentation`,
    `skin tight`,
    `taut clothes`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `sideboob`, `backboob`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
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
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `<lora:shokuhou_misaki_v2:0.7>`,
    `toaru kagaku no railgun`,
    `shokuhou misaki`,
    `yellow eyes`,
    { tag: `sparkling eyes`, weight: 1.3 },
    { tag: `star-shaped pupils`, weight: 1.3 },
    { tag: `+ +`, weight: 1.3 },
    `symbol-shaped pupils`,
    `blonde hair`,
    `long hair`,
    `straight hair`,
    `hair between eyes`,
    `large breasts`,
    `thick thighs`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.shokuhoMisaki),
  situations: [
    {
      key: `tokiwadai-school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.city,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.grass,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.whiteBackground,
        ),
        clean: new PromptDefine<BackgroundTag>(
          backgroundPreset.cleanEntries.heartBackground,
        ),
      },
      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `hmmisaki`,
        `tokiwadai school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `sweater vest`,
        `brown sweater vest`,
        `short sleeves`,
        `white gloves`,
        `elbow gloves`,
        `skirt`,
        `grey skirt`,
        `pleated skirt`,
        `thighhighs`,
        `white thighhighs`,
        `taut clothes`,
        `skindentation`,
        `socks`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const minimumTest = {
  key: `minimum-test`,
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `red eyes`,
    `small breasts`,
    `thick thighs`,
  ]),
  emotion: new PromptDefine<EmotionTag>([
    [{ entries: [`smile`] }, { entries: [`scowl`] }],
  ]),
  situations: [
    {
      key: `test-outfit1`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>([
          `indoors`,
          `classroom`,
        ]),
        fromBelow: new PromptDefine<BackgroundTag>([`pink background`]),
        fromAbove: new PromptDefine<BackgroundTag>([`simple background`]),
        lying: new PromptDefine<BackgroundTag>([`heart background`]),
        clean: new PromptDefine<BackgroundTag>([`bed`]),
      },
      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `bikini`,
        [{ entries: [`red bikini`] }, { entries: [`blue bikini`] }],
        [
          { entries: [`maid bikini`], probability: 2 },
          { entries: [`frilled bikini`] },
        ],
        `bikini skirt`,
        `collarbone`,
        `bare shoulders`,
        `bare arms`,
        `navel`,
        `shoulder blades`,
        `thigh gap`,
        `bare legs`,
        `shoes`,
      ]),
      isArmpitsVisible: true,
      liftType: `dress`,
      upskirt: new PromptDefine<OutfitAndExposureTag>([`panties`]),
      whenRemoveShoes: {
        excludeTags: [`shoes`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `barefoot`, weight: 1.5 }),
        ],
      },
    },
  ],
} as const satisfies CharaDefine;

export const ceciliaAlcottOGTurles = {
  key: `cecilia-alcott-og-turles`,
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `<lora:OGT_Cecilia_Alcott-v1:0.8>`,
    `infinite stratos`,
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
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.ceciliaAlcott),
  situations: [
    {
      key: `infinite-stratos-academy-school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.city,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.grass,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.whiteBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.grassBlueSky },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `infinite stratos academy school uniform`,
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
        `skirt`,
        `white skirt`,
        `miniskirt`,
        `red trim`,
        `pantyhose`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const sentoIsuzuLittleJellyV2 = {
  key: `sento-isuzu-little-jelly-v2`,
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `<lora:AmagiBrilliantPark_SentoIsuzu:0.7>`,
    `amagi brilliant park`,
    `sento isuzu`,
    `brown eyes`,
    `brown hair`,
    `long hair`,
    `ponytail`,
    `hair between eyes`,
    `hair intakes`,
    `sidelocks`,
    `antenna hair`,
    `hair bow`,
    `white bow`,
    `curvy`,
    `large breasts`,
    `thick thighs`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.serious),
  situations: [
    {
      key: `uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.amusementPark,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.grass,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.grassBlueSky },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `SentoVest`,
        `military jacket`,
        `red jacket`,
        `shirt`,
        `red shirt`,
        `sleeveless`,
        `sleeveless shirt`,
        `aiguillette`,
        `epaulettes`,
        `bowtie`,
        `white bowtie`,
        `skirt`,
        `black skirt`,
        `miniskirt`,
        `pleated skirt`,
        `frilled skirt`,
        `frills`,
        `thighhighs`,
        `white thighhighs`,
        `boots`,
        `zettai ryouiki`,
        `taut clothes`,
        `bare shoulders`,
        `bare arms`,
      ]),
      isArmpitsVisible: true,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`boots`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;
