import { backgroundPreset } from "./background-preset.mjs";
import { emotionPreset } from "./emotion-preset.mjs";
import { LoraToken, PromptDefine, SimpleToken } from "./prompt-define.mjs";
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
   * Lora define.
   */
  lora: LoraToken | null;
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
  upskirt: new PromptDefine(upskirtPreset.vividPanties),
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

const generatePlayboyBunny = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `playboy-bunny`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>(
      backgroundPreset.fromHorizontalEntries.casino,
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
      backgroundPreset.lyingEntries.pinkBackground,
    ),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartWhiteBackground },
        { entries: backgroundPreset.cleanEntries.heartBackground },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `playboy bunny`,
    `rabbit ears`,
    `fake animal ears`,
    `rabbit tail`,
    `detached collar`,
    `bare shoulders`,
    `bare arms`,
    `collarbone`,
    `leotard`,
    `latex leotard`,
    `wrist cuffs`,
    `covered navel`,
    [
      { entries: [`bare legs`] },
      { entries: [`pantyhose`] },
      { entries: [`thighhighs`] },
    ],
    `pumps`,
    `shoulder blades`,
    `skindentation`,
    `skin tight`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `sideboob`, `backboob`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `none`,
  whenRemoveShoes: {
    excludeTags: [`pumps`],
    additionalFootTokensAfterRemoving: [
      new SimpleToken<OutfitAndExposureTag>({ tag: `no shoes` }),
    ],
  },
});

const generateSleevelessSerafuku = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `sleeveless-serafuku`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromHorizontalEntries.classroom },
        { entries: backgroundPreset.fromHorizontalEntries.heartBackground },
      ],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromBelowEntries.heartBackground },
        { entries: backgroundPreset.fromBelowEntries.ceiling },
      ],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromAboveEntries.woodenFloor },
        { entries: backgroundPreset.fromAboveEntries.grass },
      ],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.lyingEntries.heartBackground },
        { entries: backgroundPreset.lyingEntries.grass },
      ],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartWhiteBackground },
        { entries: backgroundPreset.cleanEntries.heartBackground },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `school uniform`,
    `serafuku`,
    `collarbone`,
    `sailor collar`,
    `blue sailor collar`,
    `neckerchief`,
    `red neckerchief`,
    `sleeveless`,
    `sleeveless shirt`,
    `white shirt`,
    `bare arms`,
    `crop top`,
    `crop top overhang`,
    `cropped shirt`,
    `midriff`,
    `navel`,
    `skirt`,
    `blue skirt`,
    `miniskirt`,
    `pleated skirt`,
    `thighhighs`,
    `zettai ryouiki`,
    `skindentation`,
    `loafers`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `taut clothes`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `skirt`,
  whenRemoveShoes: {
    excludeTags: [`loafers`],
    additionalFootTokensAfterRemoving: [
      new SimpleToken<OutfitAndExposureTag>({ tag: `no shoes` }),
    ],
  },
});

const generateNakedShirt = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `naked-shirt`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromHorizontalEntries.window },
        { entries: backgroundPreset.fromHorizontalEntries.heartBackground },
      ],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromBelowEntries.heartBackground },
        { entries: backgroundPreset.fromBelowEntries.ceiling },
      ],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromAboveEntries.bedSheet },
        { entries: backgroundPreset.fromAboveEntries.heartBackground },
      ],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.lyingEntries.heartBackground },
        { entries: backgroundPreset.lyingEntries.bedSheetPillow },
      ],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartWhiteBackground },
        { entries: backgroundPreset.cleanEntries.heartBackground },
        { entries: backgroundPreset.cleanEntries.bedSheetWindow },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `naked shirt`,
    `shirt`,
    `white shirt`,
    `collared shirt`,
    `dress shirt`,
    `no bra`,
    [
      { entries: [`partially unbuttoned`] },
      { entries: [`open clothes`, `open shirt`] },
    ],
    `bottomless`,
    `collarbone`,
    `bare legs`,
    `barefoot`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`] as const)
      : []),
  ]),
  isArmpitsVisible: false,
  liftType: `none`,
});

const generateUnderwearOnly = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `underwear-only`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromHorizontalEntries.bed },
        { entries: backgroundPreset.fromHorizontalEntries.heartBackground },
      ],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromBelowEntries.heartBackground },
        { entries: backgroundPreset.fromBelowEntries.ceiling },
      ],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromAboveEntries.bedSheet },
        { entries: backgroundPreset.fromAboveEntries.heartBackground },
      ],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.lyingEntries.heartBackground },
        { entries: backgroundPreset.lyingEntries.bedSheetPillow },
      ],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartWhiteBackground },
        { entries: backgroundPreset.cleanEntries.heartBackground },
        { entries: backgroundPreset.cleanEntries.bedSheetWindow },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `underwear`,
    `underwear only`,
    `bra`,
    `panties`,
    `lingerie`,
    `collarbone`,
    `bare shoulders`,
    `bare arms`,
    `shoulder blades`,
    `butt crack`,
    `bare legs`,
    `barefoot`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `sideboob`, `backboob`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `none`,
});

const generateCamisoleDenimShorts = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `camisole-denim-shorts`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromHorizontalEntries.city }],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromBelowEntries.blueSky }],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromAboveEntries.outdoors },
        { entries: backgroundPreset.fromAboveEntries.heartBackground },
      ],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.lyingEntries.heartBackground },
        { entries: backgroundPreset.lyingEntries.bedSheetPillow },
        { entries: backgroundPreset.lyingEntries.grass },
      ],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartWhiteBackground },
        { entries: backgroundPreset.cleanEntries.heartBackground },
        { entries: backgroundPreset.cleanEntries.bedSheetWindow },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `camisole`,
    { tag: `__color__ camisole`, weight: 1.2 },
    `crop top`,
    `shorts`,
    `denim shorts`,
    `thighhighs`,
    `skindentation`,
    `shoes`,
    `collarbone`,
    `bare arms`,
    `midriff`,
    `navel`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `none`,
  whenRemoveShoes: {
    excludeTags: [`shoes`],
    additionalFootTokensAfterRemoving: [
      new SimpleToken<OutfitAndExposureTag>({ tag: `no shoes` }),
    ],
  },
});

const generateGymUniform = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `gym-uniform`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromHorizontalEntries.outdoors },
        { entries: backgroundPreset.fromHorizontalEntries.heartBackground },
      ],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromBelowEntries.blueSky }],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.fromAboveEntries.outdoors },
        { entries: backgroundPreset.fromAboveEntries.heartBackground },
      ],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.lyingEntries.heartBackground },
        { entries: backgroundPreset.lyingEntries.bedSheetPillow },
        { entries: backgroundPreset.lyingEntries.grass },
      ],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartWhiteBackground },
        { entries: backgroundPreset.cleanEntries.heartBackground },
        { entries: backgroundPreset.cleanEntries.bedSheetWindow },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `gym uniform`,
    `gym shirt`,
    `white shirt`,
    `buruma`,
    `sleeveless`,
    `sleeveless shirt`,
    `socks`,
    `shoes`,
    `sweat`,
    `collarbone`,
    `bare arms`,
    `bare legs`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `taut clothes`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `none`,
  whenRemoveShoes: {
    excludeTags: [`shoes`],
    additionalFootTokensAfterRemoving: [
      new SimpleToken<OutfitAndExposureTag>({ tag: `no shoes` }),
    ],
  },
});

const generateBridalLingerie = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `bridal-lingerie`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromHorizontalEntries.wedding }],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromBelowEntries.wedding }],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromAboveEntries.wedding }],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.lyingEntries.wedding }],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.cleanEntries.wedding }],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `nontraditional wedding dress`,
    `wedding dress`,
    `revealing clothes`,
    `bride`,
    `veil`,
    { tag: `bridal veil`, weight: 1.2 },
    `hair ornament`,
    `hair flower`,
    `jewelry`,
    `necklace`,
    `bridal garter`,
    `bridal gauntlets`,
    `white gloves`,
    `bridal lingerie`,
    `lingerie`,
    // `underwear`,
    `thighhighs`,
    `white thighhighs`,
    `garter belt`,
    [
      {
        entries: [
          `panties`,
          `white panties`,
          `dress`,
          `white dress`,
          `clothing cutout`,
          `cleavage cutout`,
          `navel cutout`,
          ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
            ? ([`cleavage`] as const)
            : []),
        ],
      },
      {
        entries: [
          `bikini`,
          `white bikini`,
          ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
            ? ([`cleavage`, `sideboob`, `backboob`] as const)
            : []),
        ],
      },
    ],
    `collarbone`,
    `bare shoulders`,
    `navel`,
    `shoulder blades`,
    `bouquet`, // TODO: Reconsider as items.
  ]),
  isArmpitsVisible: true,
  liftType: `none`,
});

const generateChinaDress = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `china-dress`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromHorizontalEntries.window }],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromBelowEntries.ceiling }],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromAboveEntries.floor }],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.lyingEntries.whiteBackground }],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartRedBackground },
        { entries: backgroundPreset.cleanEntries.pinkBackground },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `china dress`,
    `chinese clothes`,
    `clothing cutout`,
    `cleavage cutout`,
    [
      { entries: [`red dress`] },
      { entries: [`blue dress`] },
      { entries: [`black dress`] },
      { entries: [`white dress`] },
    ],
    [{ entries: [`dragon print`] }, { entries: [`floral print`] }],
    `gold trim`,
    `dress`,
    `sleeveless dress`,
    `sleeveless`,
    `side slit`,
    `bare shoulders`,
    `bare arms`,
    `bare legs`,
    `shoulder blades`,
    `barefoot`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `dress`,
  upskirt: new PromptDefine([
    `underwear`,
    `panties`,
    `crotch seam`,
    `black panties`,
  ]),
  whenRemoveShoes: undefined,
});

const generateSantaBikini = ({
  breastSize,
}: {
  readonly breastSize: BreastSizeTag;
}): CharaDefine["situations"][number] => ({
  key: `santa-bikini`,
  background: {
    fromHorizontal: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromHorizontalEntries.christmas }],
    ]),
    fromBelow: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromBelowEntries.ceiling }],
    ]),
    fromAbove: new PromptDefine<BackgroundTag>([
      [{ entries: backgroundPreset.fromAboveEntries.floor }],
    ]),
    lying: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.lyingEntries.whiteBackground },
        { entries: backgroundPreset.lyingEntries.heartBackground },
      ],
    ]),
    clean: new PromptDefine<BackgroundTag>([
      [
        { entries: backgroundPreset.cleanEntries.heartRedBackground },
        { entries: backgroundPreset.cleanEntries.pinkBackground },
        { entries: backgroundPreset.cleanEntries.christmas },
      ],
    ]),
  },
  outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
    `santa costume`,
    `santa hat`,
    `santa bikini`,
    `red bikini`,
    `fur collar`,
    `fur trim`,
    `fur-trimmed bikini`,
    `fur-trimmed headwear`,
    `detached sleeves`,
    `red thighhighs`,
    `bare shoulders`,
    `shoulder blades`,
    ...(BreastSizeOrder[`medium breasts`] <= BreastSizeOrder[breastSize]
      ? ([`cleavage`, `sideboob`, `backboob`] as const)
      : []),
  ]),
  isArmpitsVisible: true,
  liftType: `none`,
  upskirt: undefined,
  whenRemoveShoes: undefined,
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
  lora: new LoraToken({ tag: `shokuhou_misaki_v2`, weights: 0.7 }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
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
  lora: null,
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
  lora: new LoraToken({ tag: `OGT_Cecilia_Alcott-v1`, weights: 0.8 }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
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
  lora: new LoraToken({ tag: `AmagiBrilliantPark_SentoIsuzu`, weights: 0.8 }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
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
    `large breasts`,
    `thick thighs`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.serious),
  situations: [
    {
      key: `sento-uniform`,
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
        `SentoUniform`,
        `military jacket`,
        `red jacket`,
        `long sleeves`,
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
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`boots`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    {
      key: `sento-vest`,
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
        `sleeveless jacket`,
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
    {
      key: `sento-school-uniform-winter`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.bedSheetWindow },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `SentoSchoolUniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `red bowtie`,
        `blazer`,
        `black jacket`,
        `long sleeves`,
        `skirt`,
        `red skirt`,
        `plaid skirt`,
        `pleated skirt`,
        `thighhighs`,
        `white thighhighs`,
        `loafers`,
        `zettai ryouiki`,
        `taut clothes`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    {
      key: `sento-school-uniform-summer`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.bedSheetWindow },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `SentoSchoolUniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `red bowtie`,
        `vest`,
        `black vest`,
        `short sleeves`,
        `skirt`,
        `red skirt`,
        `plaid skirt`,
        `pleated skirt`,
        `thighhighs`,
        `white thighhighs`,
        `loafers`,
        `zettai ryouiki`,
        `taut clothes`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    {
      key: `sento-suit`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.office,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.officeFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.bedSheet,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `SentoSuit`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `suit`,
        `business suit`,
        `pinstripe pattern`,
        `long sleeves`,
        `skirt`,
        `pencil skirt`,
        `miniskirt`,
        `bare legs`,
        `pumps`,
        `taut clothes`,
        `socks`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`pumps`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    {
      key: `sento-casual`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.city,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.outdoors,
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
        `SentoCasual`,
        `collarbone`,
        `shirt`,
        `pink shirt`,
        `jacket`,
        `pink jacket`,
        `open clothes`,
        `open jacket`,
        `long sleeves`,
        `skirt`,
        `orange skirt`,
        `pleated skirt`,
        `thighhighs`,
        `white thighhighs`,
        `skindentation`,
        `shoes`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`shoes`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    {
      key: `sento-bikini`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.dayPool,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.poolside,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.oceanPartiallySubmerged,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.oceanPartiallySubmerged },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `SentoBikini`,
        `bikini`,
        `red bikini`,
        `o-ring bikini`,
        `o-ring top`,
        `skindentation`,
        `collarbone`,
        `shoulder blades`,
        `navel`,
        `bare arms`,
        `bare legs`,
        `barefoot`,
        `cleavage`,
        `sideboob`,
        `backboob`,
      ]),
      isArmpitsVisible: true,
      liftType: `none`,
    },
    {
      key: `sento-pirate`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.amusementPark,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.poolside,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.poolside },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `SentoPirate`,
        `pirate`,
        `pirate hat`,
        `eyepatch`,
        `collarbone`,
        `ascot`,
        `bikini`,
        `red bikini`,
        `print bikini`,
        `cleavage`,
        `sideboob`,
        `backboob`,
        `skindentation`,
        `jacket`,
        `red jacket`,
        `open jacket`,
        `long sleeves`,
        `gold trim`,
        `navel`,
        { tag: `belt`, weight: 1.2 },
        `white belt`,
        `bare legs`,
        `thigh boots`,
      ]),
      isArmpitsVisible: false,
      liftType: `none`,
    },
    generateMaidBikini({ breastSize: `medium breasts` }),
    generateSchoolSwimsuit({ breastSize: `medium breasts` }),
    generatePlayboyBunny({ breastSize: `medium breasts` }),
    generateSleevelessSerafuku({ breastSize: `medium breasts` }),
    generateNakedShirt({ breastSize: `medium breasts` }),
    generateUnderwearOnly({ breastSize: `medium breasts` }),
    generateCamisoleDenimShorts({ breastSize: `medium breasts` }),
    generateGymUniform({ breastSize: `medium breasts` }),
  ],
} as const satisfies CharaDefine;

export const suzukazeAobaNarugo1992 = {
  key: `suzukaze-aoba-narugo-1992`,
  lora: new LoraToken({
    tag: `suzukaze_aoba_newgame`,
    weights: [0.5, 0.6, 0.7, 0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `new game!`,
    `suzukaze aoba`,
    `suzukaze_aoba_newgame`,
    `purple eyes`,
    `purple hair`,
    `long hair`,
    `twintails`,
    `blunt bangs`,
    `blunt ends`,
    `hair ornament`,
    `hair flower`,
    `small breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.all),
  situations: [
    {
      key: `suit`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.office,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.officeCeiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.officeFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `suit`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `neck ribbon`,
        `jacket`,
        `purple jacket`,
        `skirt`,
        `purple skirt`,
        `miniskirt`,
        `bare legs`,
        `socks`,
        `shoes`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.vividPantiesStrong),
      whenRemoveShoes: {
        excludeTags: [`shoes`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `small breasts` }),
    generateMaidBikini({ breastSize: `small breasts` }),
    generateSchoolSwimsuit({ breastSize: `small breasts` }),
    generatePlayboyBunny({ breastSize: `small breasts` }),
  ],
} as const satisfies CharaDefine;

export const takimotoHifumiNarugo1992 = {
  key: `takimoto-hifumi-narugo-1992`,
  lora: new LoraToken({
    tag: `takimoto_hifumi_newgame`,
    weights: [0.6, 0.7],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `new game!`,
    `takimoto hifumi`,
    `takimoto_hifumi_newgame`,
    `blue eyes`,
    `tsurime`,
    `brown hair`,
    `long hair`,
    `ponytail`,
    `blunt bangs`,
    `sidelocks`,
    `hair bow`,
    `red bow`,
    `large breasts`,
    `thick thighs`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.all),
  situations: [
    {
      key: `main`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.office,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.officeCeiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.officeFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `neck ribbon`,
        `black ribbon`,
        `collarbone`,
        `long sleeves`,
        `skirt`,
        `red skirt`,
        `pleated skirt`,
        `thighhighs`,
        `black thighhighs`,
        `skindentation`,
        `shoes`,
        `taut clothes`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`shoes`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const momoVeliaDevilukeEft = {
  key: `momo-velia-deviluke-eft`,
  lora: new LoraToken({
    tag: `momo-loveru-01`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `momo velia deviluke`,
    `momo belia deviluke`,
    `purple eyes`,
    `pink hair`,
    `short hair`,
    `bob cut`,
    `hair between eyes`,
    `hair ornament`,
    `hair flower`,
    `tail`,
    `demon tail`,
    `large breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `thighhighs`,
        `black thighhighs`,
        `skindentation`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
    generateSleevelessSerafuku({ breastSize: `large breasts` }),
    generateNakedShirt({ breastSize: `large breasts` }),
    generateUnderwearOnly({ breastSize: `large breasts` }),
    generateCamisoleDenimShorts({ breastSize: `large breasts` }),
    generateGymUniform({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const kurosakiMeaEft = {
  key: `kurosaki-mea-eft`,
  lora: new LoraToken({
    tag: `mea-loveru`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `mea kurosaki`,
    `kurosaki mea`,
    `blue eyes`,
    `red hair`,
    `long hair`,
    `braid`,
    `single braid`,
    `ahoge`,
    `hair ornament`,
    `medium breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `socks`,
        `black socks`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `medium breasts` }),
    generateMaidBikini({ breastSize: `medium breasts` }),
    generateSchoolSwimsuit({ breastSize: `medium breasts` }),
    generatePlayboyBunny({ breastSize: `medium breasts` }),
    generateSleevelessSerafuku({ breastSize: `medium breasts` }),
    generateNakedShirt({ breastSize: `medium breasts` }),
    generateUnderwearOnly({ breastSize: `medium breasts` }),
    generateCamisoleDenimShorts({ breastSize: `medium breasts` }),
    generateGymUniform({ breastSize: `medium breasts` }),
    generateBridalLingerie({ breastSize: `medium breasts` }),
  ],
} as const satisfies CharaDefine;

export const lalaSatalinDevilukeEft = {
  key: `lala-satalin-deviluke-eft`,
  lora: new LoraToken({
    tag: `lala-loveru`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `lala satalin deviluke`,
    `green eyes`,
    `eyelashes`,
    `pink hair`,
    `long hair`,
    `straight hair`,
    `ahoge`,
    `hair ornament`,
    `tail`,
    `demon tail`,
    `large breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `thighhighs`,
        `black thighhighs`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
    generateSleevelessSerafuku({ breastSize: `large breasts` }),
    generateNakedShirt({ breastSize: `large breasts` }),
    generateUnderwearOnly({ breastSize: `large breasts` }),
    generateCamisoleDenimShorts({ breastSize: `large breasts` }),
    generateGymUniform({ breastSize: `large breasts` }),
    generateBridalLingerie({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const sairenjiHarunaEft = {
  key: `sairenji-haruna-eft`,
  lora: new LoraToken({
    tag: `haruna-loveru`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `haruna sairenji`,
    `sairenji haruna`,
    `purple eyes`,
    `blue hair`,
    `purple hair`,
    `short hair`,
    `bob cut`,
    `swept bangs`,
    `forehead`,
    `hair ornament`,
    `hairclip`,
    `medium breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `socks`,
        `black socks`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `medium breasts` }),
    generateMaidBikini({ breastSize: `medium breasts` }),
    generateSchoolSwimsuit({ breastSize: `medium breasts` }),
    generatePlayboyBunny({ breastSize: `medium breasts` }),
    generateSleevelessSerafuku({ breastSize: `medium breasts` }),
    generateNakedShirt({ breastSize: `medium breasts` }),
    generateUnderwearOnly({ breastSize: `medium breasts` }),
    generateCamisoleDenimShorts({ breastSize: `medium breasts` }),
    generateGymUniform({ breastSize: `medium breasts` }),
    generateBridalLingerie({ breastSize: `medium breasts` }),
  ],
} as const satisfies CharaDefine;

export const konjikiNoYamiEft = {
  key: `konjiki-no-yami-eft`,
  lora: new LoraToken({
    tag: `yami-loveru`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `konjiki no yami`,
    `red eyes`,
    `tsurime`,
    `eyelashes`,
    `blonde hair`,
    `long hair`,
    `very long hair`,
    `two side up`,
    `hair intakes`,
    `sidelocks`,
    `hair ornament`,
    `medium breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.serious),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `socks`,
        `white socks`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    {
      key: `battle-dress`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.fromHorizontalEntries.night },
            { entries: backgroundPreset.fromHorizontalEntries.city },
          ],
        ]),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.blueSky,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.grass,
        ),
        lying: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.lyingEntries.grass },
            { entries: backgroundPreset.lyingEntries.heartBackground },
          ],
        ]),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `dress`,
        `black dress`,
        `sleeveless dress`,
        `sleeveless`,
        `detached sleeves`,
        `black sleeves`,
        `wide sleeves`,
        `clothing cutout`,
        `cleavage cutout`,
        `belt`,
        `black belt`,
        `high-low skirt`,
        `thigh strap`,
        `boots`,
        `bare shoulders`,
      ]),
      isArmpitsVisible: true,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`boots`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `barefoot` }),
        ],
      },
    },
    generateBikini({ breastSize: `medium breasts` }),
    generateMaidBikini({ breastSize: `medium breasts` }),
    generateSchoolSwimsuit({ breastSize: `medium breasts` }),
    generatePlayboyBunny({ breastSize: `medium breasts` }),
    generateSleevelessSerafuku({ breastSize: `medium breasts` }),
    generateNakedShirt({ breastSize: `medium breasts` }),
    generateUnderwearOnly({ breastSize: `medium breasts` }),
    generateCamisoleDenimShorts({ breastSize: `medium breasts` }),
    generateGymUniform({ breastSize: `medium breasts` }),
    generateBridalLingerie({ breastSize: `medium breasts` }),
  ],
} as const satisfies CharaDefine;

export const kotegawaYuiEft = {
  key: `kotegawa-yui-eft`,
  lora: new LoraToken({
    tag: `yui-loveru`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `kotegawa yui`,
    `yui kotegawa`,
    `yellow eyes`,
    `tsurime`,
    `black hair`,
    `long hair`,
    `straight hair`,
    `sidelocks`,
    `large breasts`,
    `thick thighs`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.serious),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `socks`,
        `black socks`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
    generateSleevelessSerafuku({ breastSize: `large breasts` }),
    generateNakedShirt({ breastSize: `large breasts` }),
    generateUnderwearOnly({ breastSize: `large breasts` }),
    generateCamisoleDenimShorts({ breastSize: `large breasts` }),
    generateGymUniform({ breastSize: `large breasts` }),
    generateBridalLingerie({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const nanaAstaDevilukeEft = {
  key: `nana-asta-deviluke-eft`,
  lora: new LoraToken({
    tag: `nana-loveru`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `to love-ru`,
    `to love-ru darkness`,
    `nana astar deviluke`,
    `nana asta deviluke`,
    `purple eyes`,
    `tsurime`,
    `pink hair`,
    `medium hair`,
    `twintails`,
    `flat chest`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.classroom,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.heartBackground,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `sainan high school uniform`,
        `school uniform`,
        `shirt`,
        `white shirt`,
        `collared shirt`,
        `bowtie`,
        `green bowtie`,
        `sweater vest`,
        `yellow sweater vest`,
        `short sleeves`,
        `skirt`,
        `green skirt`,
        `pleated skirt`,
        `plaid skirt`,
        `socks`,
        `white socks`,
        `loafers`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.colorfulPanties),
      whenRemoveShoes: {
        excludeTags: [`loafers`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `flat chest` }),
    generateMaidBikini({ breastSize: `flat chest` }),
    generateSchoolSwimsuit({ breastSize: `flat chest` }),
    generatePlayboyBunny({ breastSize: `flat chest` }),
    generateSleevelessSerafuku({ breastSize: `flat chest` }),
    generateNakedShirt({ breastSize: `flat chest` }),
    generateUnderwearOnly({ breastSize: `flat chest` }),
    generateCamisoleDenimShorts({ breastSize: `flat chest` }),
    generateGymUniform({ breastSize: `flat chest` }),
    generateBridalLingerie({ breastSize: `flat chest` }),
  ],
} as const satisfies CharaDefine;

export const tamakiIrohaEft = {
  key: `tamaki-iroha-eft`,
  lora: new LoraToken({
    tag: `iroha-madomagi`,
    weights: [0.6, 0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `magia record: mahou shoujo madoka magica gaiden`,
    `iroha tamaki`,
    `tamaki iroha`,
    `pink eyes`,
    `tareme`,
    `pink hair`,
    `long hair`,
    `braid`,
    `frentch braid`,
    `half updo`,
    `braided ponytail`,
    `blunt bangs`,
    `hair intakes`,
    `blunt ends`,
    `sidelocks`,
    `medium breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.all),
  situations: [
    {
      key: `magical-girl`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.garden,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.woodenFloor,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `magical girl`,
        `cloak`,
        `white cloak`,
        `hood`,
        `hood up`,
        `hooded cloak`,
        `bodystocking`,
        `gloves`,
        `black gloves`,
        `covered navel`,
        `belt`,
        `pink belt`,
        `skirt`,
        `pink skirt`,
        `miniskirt`,
        `pleated skirt`,
        `boots`,
        `black footwear`,
        `cross-laced footwear`,
      ]),
      isArmpitsVisible: false,
      liftType: `skirt`,
      upskirt: new PromptDefine(upskirtPreset.pantiesUnderPantyhose),
      whenRemoveShoes: {
        excludeTags: [`boots`, `black footwear`, `cross-laced footwear`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `medium breasts` }),
    generateMaidBikini({ breastSize: `medium breasts` }),
    generateSchoolSwimsuit({ breastSize: `medium breasts` }),
    generatePlayboyBunny({ breastSize: `medium breasts` }),
    generateNakedShirt({ breastSize: `medium breasts` }),
  ],
} as const satisfies CharaDefine;

export const shibaMiyukiEft = {
  key: `shiba-miyuki-eft`,
  lora: new LoraToken({
    tag: `miyuki-mahouka`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `mahouka koukou no rettousei`,
    `miyuki shiba`,
    `shiba miyuki`,
    `black eyes`,
    `blue eyes`,
    `tsurime`,
    `eyelashes`,
    `black hair`,
    `long hair`,
    `hime cut`,
    `straight hair`,
    `blunt bangs`,
    `blunt ends`,
    `sidelocks`,
    `hair ornament`,
    `snowflake hair ornament`,
    `large breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.all),
  situations: [
    {
      key: `first-high-school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.garden,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.heartBackground,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `first high school uniform`,
        `dress`,
        `white dress`,
        `collared dress`,
        `pencil dress`,
        `necktie`,
        `black necktie`,
        `short necktie`,
        `jacket`,
        `green jacket`,
        `cropped jacket`,
        `open jacket`,
        `long sleeves`,
        `pantyhose`,
        `boots`,
        `black footwear`,
      ]),
      isArmpitsVisible: false,
      liftType: `dress`,
      upskirt: new PromptDefine(upskirtPreset.pantiesUnderPantyhose),
      whenRemoveShoes: {
        excludeTags: [`boots`, `black footwear`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
    generateSleevelessSerafuku({ breastSize: `large breasts` }),
    generateNakedShirt({ breastSize: `large breasts` }),
    generateUnderwearOnly({ breastSize: `large breasts` }),
    generateCamisoleDenimShorts({ breastSize: `large breasts` }),
    generateGymUniform({ breastSize: `large breasts` }),
    generateBridalLingerie({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const saegusaMayumiEft = {
  key: `saegusa-mayumi-eft`,
  lora: new LoraToken({
    tag: `mayumi-mahouka`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `mahouka koukou no rettousei`,
    `saegusa mayumi`,
    `mayumi saegusa`,
    `red eyes`,
    `tareme`,
    `black hair`,
    `long hair`,
    `wavy hair`,
    `curtained bangs`,
    `sidelocks`,
    `hair bow`,
    `white bow`,
    `large breasts`,
    `forehead`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `first-high-school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.garden,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.heartBackground,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `first high school uniform`,
        `dress`,
        `white dress`,
        `collared dress`,
        `pencil dress`,
        `necktie`,
        `black necktie`,
        `short necktie`,
        `jacket`,
        `green jacket`,
        `cropped jacket`,
        `open jacket`,
        `long sleeves`,
        `thighhighs`,
        `black thighhighs`,
        `boots`,
        `black footwear`,
      ]),
      isArmpitsVisible: false,
      liftType: `dress`,
      upskirt: new PromptDefine(upskirtPreset.vividPanties),
      whenRemoveShoes: {
        excludeTags: [`boots`, `black footwear`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
    generateSleevelessSerafuku({ breastSize: `large breasts` }),
    generateNakedShirt({ breastSize: `large breasts` }),
    generateUnderwearOnly({ breastSize: `large breasts` }),
    generateCamisoleDenimShorts({ breastSize: `large breasts` }),
    generateGymUniform({ breastSize: `large breasts` }),
    generateBridalLingerie({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;

export const mitsuiHonokaEft = {
  key: `mitsui-honoka-eft`,
  lora: new LoraToken({
    tag: `honoka-mahouka`,
    weights: [0.8],
  }),
  characterFeature: new PromptDefine<CharacterFeatureTag>([
    `mahouka koukou no rettousei`,
    `mitsui honoka`,
    `honoka mitsui`,
    `purple eyes`,
    `brown hair`,
    `medium hair`,
    `twintails`,
    `low twintails`,
    `short twintails`,
    `swept bangs`,
    `large breasts`,
  ]),
  emotion: new PromptDefine<EmotionTag>(emotionPreset.cute),
  situations: [
    {
      key: `first-high-school-uniform`,
      background: {
        fromHorizontal: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromHorizontalEntries.garden,
        ),
        fromBelow: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromBelowEntries.ceiling,
        ),
        fromAbove: new PromptDefine<BackgroundTag>(
          backgroundPreset.fromAboveEntries.heartBackground,
        ),
        lying: new PromptDefine<BackgroundTag>(
          backgroundPreset.lyingEntries.grass,
        ),
        clean: new PromptDefine<BackgroundTag>([
          [
            { entries: backgroundPreset.cleanEntries.heartBackground },
            { entries: backgroundPreset.cleanEntries.whiteBackground },
          ],
        ]),
      },

      outfitAndExposure: new PromptDefine<OutfitAndExposureTag>([
        `first high school uniform`,
        `dress`,
        `white dress`,
        `collared dress`,
        `pencil dress`,
        `necktie`,
        `black necktie`,
        `short necktie`,
        `jacket`,
        `green jacket`,
        `cropped jacket`,
        `open jacket`,
        `long sleeves`,
        `thighhighs`,
        `black thighhighs`,
        `boots`,
        `black footwear`,
      ]),
      isArmpitsVisible: false,
      liftType: `dress`,
      upskirt: new PromptDefine(upskirtPreset.vividPanties),
      whenRemoveShoes: {
        excludeTags: [`boots`, `black footwear`],
        additionalFootTokensAfterRemoving: [
          new SimpleToken({ tag: `no shoes` }),
        ],
      },
    },
    generateBikini({ breastSize: `large breasts` }),
    generateMaidBikini({ breastSize: `large breasts` }),
    generateSchoolSwimsuit({ breastSize: `large breasts` }),
    generatePlayboyBunny({ breastSize: `large breasts` }),
    generateSleevelessSerafuku({ breastSize: `large breasts` }),
    generateNakedShirt({ breastSize: `large breasts` }),
    generateUnderwearOnly({ breastSize: `large breasts` }),
    generateCamisoleDenimShorts({ breastSize: `large breasts` }),
    generateGymUniform({ breastSize: `large breasts` }),
    generateBridalLingerie({ breastSize: `large breasts` }),
    generateChinaDress({ breastSize: `large breasts` }),
    generateSantaBikini({ breastSize: `large breasts` }),
  ],
} as const satisfies CharaDefine;
