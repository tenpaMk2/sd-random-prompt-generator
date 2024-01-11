import { armPosePreset } from "./arm-pose-preset.mjs";
import { backgroundPreset } from "./background-preset.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";
import {
  Pattern,
  PatternCollection,
  PromptDefine,
  SimpleToken,
} from "./prompt-define.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { ArmPoseTag, armpitsVisibleTags } from "./tag-defines/arm-pose.mjs";
import {
  BreastSizeOrder,
  BreastSizeTag,
  allBreastSizeTags,
} from "./tag-defines/character-feature.mjs";
import { ArmpitsTag } from "./tag-defines/outfit-and-exposure.mjs";
import { Visible } from "./tag-defines/visible.mjs";

/**
 * Get person pattern collection that matches specified parts.
 * @param personInfoPatterns
 * @param parts
 * @returns Person pattern collection.
 */
const getPersonPatternCollection = (
  personInfoPatterns: EachVisibleTokenInfo["personInfoPatterns"],
  parts: (keyof Visible | `removedShoesFoot`)[],
) => {
  const personPatterns = personInfoPatterns.map(
    ({ visibility, removedShoesFootPattern, probability }) => {
      const all = {
        ...visibility,
        removedShoesFoot: removedShoesFootPattern,
      };

      const specifiedPatterns = parts.map((part) => all[part]);
      const concattedPattern = specifiedPatterns.reduce(
        (acc, cur) => acc.concat(cur.simpleTokens),
        new Pattern({ simpleTokens: [], probability }),
      );
      return concattedPattern;
    },
  );
  return new PatternCollection(personPatterns);
};

/**
 * Add `armpits` to arm pose pattern collection only if `armpitsVisibleTags` are included.
 * @param armPosePatternCollection
 * @returns Added pattern collection.
 */
const addArmpits = (
  armPosePatternCollection: PatternCollection<ArmPoseTag>,
) => {
  const added = armPosePatternCollection.map<ArmPoseTag | ArmpitsTag>(
    (pattern) => {
      if (
        pattern.simpleTokens.some(({ tag }) =>
          armpitsVisibleTags.some((t) => t === tag),
        )
      ) {
        return pattern.concat([
          new SimpleToken<ArmpitsTag>({ tag: `armpits` }),
        ]);
      }

      return pattern;
    },
  );
  return added;
};

/**
 * Add `hanging breasts` to person pattern collection.
 * @param personPatternCollection Person pattern collection.
 * @returns Added pattern collection.
 */
const addHangingBreasts = (personPatternCollection: PatternCollection<Tag>) => {
  const added = personPatternCollection.map((pattern) => {
    if (pattern.simpleTokens.some(({ tag }) => tag === `cleavage`)) {
      return pattern.concat([new SimpleToken<Tag>({ tag: `hanging breasts` })]);
    }

    return pattern;
  });
  return added;
};

/**
 * Add lift tokens by each lift type.
 * @param upskirtPatternCollection
 * @param liftType
 * @returns Pattern collection added lift tokens
 */
const addLift = (
  upskirtPatternCollection: PatternCollection<Tag>,
  liftType: EachVisibleTokenInfo["liftType"],
) => {
  const added = upskirtPatternCollection.map((pattern) => {
    switch (liftType) {
      case `dress`:
        return pattern.concat([
          new SimpleToken<Tag>({ tag: `clothes lift` }),
          new SimpleToken<Tag>({ tag: `dress lift` }),
        ]);
      case `skirt`:
        return pattern.concat([
          new SimpleToken<Tag>({ tag: `clothes lift` }),
          new SimpleToken<Tag>({ tag: `skirt lift` }),
        ]);
      case `none`:
        return pattern;
    }
  });
  return added;
};

/**
 * Add `breasts` tag if breast size is bigger than or equal to `medium breasts`.
 * @param personPatternCollection
 * @returns Pattern collection added `breasts` tag if breast size is bigger than or equal to `medium breasts`.
 */
const addBreasts = (personPatternCollection: PatternCollection<Tag>) => {
  const added = personPatternCollection.map((pattern) => {
    const breastSizeTokens = pattern.filter(({ tag }) =>
      allBreastSizeTags.some((t) => t === tag),
    ).simpleTokens as SimpleToken<BreastSizeTag>[];

    if (breastSizeTokens.length !== 1) {
      throw new Error(
        `No breast size token or multiple breast size tokens are included in pattern.`,
      );
    }

    if (
      BreastSizeOrder["medium breasts"] <=
      BreastSizeOrder[breastSizeTokens[0].tag]
    ) {
      // Add `breasts` tag if breast size is bigger than or equal to `medium breasts`.
      return pattern.concat([new SimpleToken<Tag>({ tag: `breasts` })]);
    }

    return pattern;
  });

  return added;
};

type ToStringable = { toString: () => string };
const finilize = (items: ToStringable[]) =>
  items.map((item) => item.toString()).join(`,\n`);

type Generator = (info: EachVisibleTokenInfo) => {
  key: string;
  prompt: string;
};

const generateUpperBody: Generator = ({
  loraToken,
  personInfoPatterns,
  isArmpitsVisible,
  frontEmotionPatternCollection,
  profileEmotionPatternCollection,
  background: { fromHorizontalPatternCollection },
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`],
  );

  const armPosePatternCollection = isArmpitsVisible
    ? addArmpits(
        new PromptDefine<ArmPoseTag>(
          armPosePreset.all,
        ).convertToPatternCollection(),
      )
    : new PromptDefine([]).convertToPatternCollection();

  const posePatternCollection = new PromptDefine([
    `upper body`,
    `looking at viewer`,
  ]).convertToPatternCollection();

  const emotionPatternCollection = frontEmotionPatternCollection.join(
    profileEmotionPatternCollection,
    0.3,
  );

  return {
    key: `upper-body`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      armPosePatternCollection,
      posePatternCollection,
      emotionPatternCollection,
      fromHorizontalPatternCollection,
    ]),
  };
};

const generateCowboyShot: Generator = ({
  loraToken,
  personInfoPatterns,
  isArmpitsVisible,
  frontEmotionPatternCollection,
  profileEmotionPatternCollection,
  background: { fromHorizontalPatternCollection },
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`, `frontHipAndThigh`],
  );

  const armPosePatternCollection = isArmpitsVisible
    ? addArmpits(
        new PromptDefine<ArmPoseTag>(
          armPosePreset.all,
        ).convertToPatternCollection(),
      )
    : new PromptDefine([]).convertToPatternCollection();

  const posePatternCollection = new PromptDefine([
    `cowboy shot`,
    `looking at viewer`,
  ]).convertToPatternCollection();

  const emotionPatternCollection = frontEmotionPatternCollection.join(
    profileEmotionPatternCollection,
    0.3,
  );

  return {
    key: `cowboy-shot`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      armPosePatternCollection,
      posePatternCollection,
      emotionPatternCollection,
      fromHorizontalPatternCollection,
    ]),
  };
};

const generateAllFours: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
  profileEmotionPatternCollection,
  background: { cleanPatternCollection },
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`, `frontHipAndThigh`, `foot`],
  );

  const personPatternCollectionWithHangingBreasts = addHangingBreasts(
    personPatternCollection,
  );

  const posePatternCollection = new PromptDefine([
    `all fours`,
    `looking at viewer`,
    `breasts`,
  ]).convertToPatternCollection();

  const emotionPatternCollection = frontEmotionPatternCollection.join(
    profileEmotionPatternCollection,
    0.2,
  );

  return {
    key: `all-fours`,
    prompt: finilize([
      loraToken,
      personPatternCollectionWithHangingBreasts,
      posePatternCollection,
      emotionPatternCollection,
      cleanPatternCollection,
    ]),
  };
};

const generateAllFoursFromBehind: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
  profileEmotionPatternCollection,
  upskirtPatternCollection,
  background: { cleanPatternCollection },
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `backBreast`, `backMidriff`, `backHipAndThigh`, `foot`],
  );

  const posePatternCollection = new PromptDefine([
    `all fours`,
    `looking at viewer`,
    `from behind`,
    `looking back`,
    `ass`,
  ]).convertToPatternCollection();

  const emotionPatternCollection = frontEmotionPatternCollection.join(
    profileEmotionPatternCollection,
    0.5,
  );

  const upskirtOnOffPatternCollection = upskirtPatternCollection.join(
    new PromptDefine([]).convertToPatternCollection(),
    0.5,
  );

  return {
    key: `all-fours-from-behind`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      posePatternCollection,
      emotionPatternCollection,
      upskirtOnOffPatternCollection,
      cleanPatternCollection,
    ]),
  };
};

const generateAllFoursFromBehindOnBed: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
  profileEmotionPatternCollection,
  upskirtPatternCollection,
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [
      `frontHead`,
      `backBreast`,
      `backMidriff`,
      `backHipAndThigh`,
      `removedShoesFoot`,
    ],
  );

  const posePatternCollection = new PromptDefine([
    `all fours`,
    `looking at viewer`,
    `from behind`,
    `looking back`,
    `ass`,
    `on bed`,
  ]).convertToPatternCollection();

  const emotionPatternCollection = frontEmotionPatternCollection.join(
    profileEmotionPatternCollection,
    0.5,
  );

  const upskirtOnOffPatternCollection = upskirtPatternCollection.join(
    new PromptDefine([]).convertToPatternCollection(),
    0.5,
  );

  const backgroundPatternCollection = new PromptDefine([
    [
      { entries: backgroundPreset.cleanEntries.bedSheetLamp },
      { entries: backgroundPreset.cleanEntries.bedSheetPillow },
    ],
  ]).convertToPatternCollection();

  return {
    key: `all-fours-from-behind-on-bed`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      posePatternCollection,
      emotionPatternCollection,
      upskirtOnOffPatternCollection,
      backgroundPatternCollection,
    ]),
  };
};

const generatePortraitLyingOnBed: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`],
  );

  const posePatternCollection = new PromptDefine([
    `portrait`,
    `lying`,
    `looking at viewer`,
    `on back`,
    `on bed`,
  ]).convertToPatternCollection();

  const backgroundPatternCollection = new PromptDefine([
    [
      { entries: backgroundPreset.lyingEntries.bedSheet },
      { entries: backgroundPreset.lyingEntries.bedSheetPillow },
    ],
  ]).convertToPatternCollection();

  return {
    key: `portrait-lying-on-on-bed`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      posePatternCollection,
      frontEmotionPatternCollection,
      backgroundPatternCollection,
    ]),
  };
};

const generateUpperBodyLyingOnBed: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`],
  );

  const posePatternCollection = new PromptDefine([
    `upper body`,
    `lying`,
    `looking at viewer`,
    `on back`,
    `on bed`,
  ]).convertToPatternCollection();

  const backgroundPatternCollection = new PromptDefine([
    [
      { entries: backgroundPreset.lyingEntries.bedSheet },
      { entries: backgroundPreset.lyingEntries.bedSheetPillow },
    ],
  ]).convertToPatternCollection();

  return {
    key: `upper-body-lying-on-on-bed`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      posePatternCollection,
      frontEmotionPatternCollection,
      backgroundPatternCollection,
    ]),
  };
};

const generateCowboyShotLyingOnBed: Generator = ({
  loraToken,
  personInfoPatterns,
  upskirtPatternCollection,
  liftType,
  frontEmotionPatternCollection,
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`, `frontHipAndThigh`],
  );

  const upskirtPatternCollectionWithLift = addLift(
    upskirtPatternCollection,
    liftType,
  );

  const posePatternCollection = new PromptDefine([
    `cowboy shot`,
    `lying`,
    `looking at viewer`,
    `on back`,
    `on bed`,
  ]).convertToPatternCollection();

  const backgroundPatternCollection = new PromptDefine([
    [
      { entries: backgroundPreset.lyingEntries.bedSheet },
      { entries: backgroundPreset.lyingEntries.bedSheetPillow },
    ],
  ]).convertToPatternCollection();

  return {
    key: `cowboy-shot-lying-on-on-bed`,
    prompt: finilize([
      loraToken,
      personPatternCollection,
      upskirtPatternCollectionWithLift,
      posePatternCollection,
      frontEmotionPatternCollection,
      backgroundPatternCollection,
    ]),
  };
};

const generateLeaningForwardVArms: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
  background: { fromAbovePatternCollection },
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`, `frontHipAndThigh`],
  );

  const breastsAddedPersonPatternCollection = addBreasts(
    personPatternCollection,
  );

  const posePatternCollection = new PromptDefine([
    `cowboy shot`,
    `leaning forward`,
    `v arms`,
    `from above`,
    `looking up`,
    `looking at viewer`,
  ]).convertToPatternCollection();

  return {
    key: `leaning-forward-v-arms`,
    prompt: finilize([
      loraToken,
      breastsAddedPersonPatternCollection,
      posePatternCollection,
      frontEmotionPatternCollection,
      fromAbovePatternCollection,
    ]),
  };
};

const generateWariza: Generator = ({
  loraToken,
  personInfoPatterns,
  frontEmotionPatternCollection,
  background: { fromAbovePatternCollection },
}) => {
  const personPatternCollection = getPersonPatternCollection(
    personInfoPatterns,
    [`frontHead`, `frontBreast`, `frontMidriff`, `frontHipAndThigh`, `foot`],
  );

  const breastsAddedPersonPatternCollection = addBreasts(
    personPatternCollection,
  );

  const posePatternCollection = new PromptDefine([
    `wariza`,
    `sitting`,
    `hands on lap`,
    `from above`,
    `looking up`,
    `looking at viewer`,
  ]).convertToPatternCollection();

  return {
    key: `wariza`,
    prompt: finilize([
      loraToken,
      breastsAddedPersonPatternCollection,
      posePatternCollection,
      frontEmotionPatternCollection,
      fromAbovePatternCollection,
    ]),
  };
};

// TODO:        new TagLeaf({ tagEntries: [`spread legs`] }),
// TODO:        new TagLeaf({ tagEntries: [`legs up`] }),

export const posePromptGenerators = [
  generateUpperBody,
  generateCowboyShot,
  generateAllFours,
  generateAllFoursFromBehind,
  generateAllFoursFromBehindOnBed,
  generatePortraitLyingOnBed,
  generateUpperBodyLyingOnBed,
  generateCowboyShotLyingOnBed,
  generateLeaningForwardVArms,
  generateWariza,
];
