import { CharacterKey, characterTable } from "./characters/resolver.mjs";
import { getKeys } from "./libs/utility.mjs";
import { OutfitKey } from "./outfits/resolver.mjs";
import {
  BackgroundSetting,
  CharacterSetting,
  OutfitSetting,
  PoseSetting,
} from "./setting-define.mjs";

const fromHorizontalPosesPreset = {
  usual: [
    { key: `portrait` },
    { key: `contrapposto` },
    { key: `hands-on-own-hips` },
    { key: `v` },
    { key: `double-v` },
    { key: `arms-up` },
    { key: `heart-hands` },
    { key: `cowboy-shot-from-side` },
    { key: `twisted-torso` },
  ],
  onFloor: [
    { key: `all-fours` },
    { key: `all-fours-from-behind` },
    { key: `kneeling` },
    { key: `the-pose-head-rest` },
  ],
} as const satisfies {
  [k in string]: PoseSetting<"from-horizontal">[];
};

const fromBelowPosesPreset = {
  usual: [{ key: `upper-body` }],
} as const satisfies {
  [k in string]: PoseSetting<"from-below">[];
};

const fromAbovePosesPreset = {
  usual: [{ key: `wariza` }],
  onBed: [
    { key: `lying-on-bed` },
    { key: `lying-on-bed-reaching-towards-viewer` },
    { key: `lying-on-stomach` },
  ],
} as const satisfies {
  [k in string]: PoseSetting<"from-above">[];
};

const testOutfit = {
  key: `test-outfit`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: [{ key: `arms-up` }, { key: `portrait` }],
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `lying-on-bed` }, { key: `full-body-lying` }],
    },
  ],
} as const satisfies OutfitSetting;

const bikini = {
  key: `bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `ocean-beach`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `ocean-beach`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const bridalLingerie = {
  key: `bridal-lingerie`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `wedding`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: [{ key: `holding-bouquet` }],
    },
    {
      type: `from-below`,
      key: `wedding`,
      poses: [{ key: `holding-bouquet` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `wedding`,
      poses: [{ key: `holding-bouquet` }, { key: `wariza` }],
    },
  ],
} as const satisfies OutfitSetting;

const camisoleDenimShorts = {
  key: `camisole-denim-shorts`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `city`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `city`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `brick floor`,
      poses: [{ key: `wariza` }],
    },
  ],
} as const satisfies OutfitSetting;

const casualMiniskirt = {
  key: `casual-miniskirt`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `city`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `city`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `brick floor`,
      poses: [{ key: `wariza` }],
    },
  ],
} as const satisfies OutfitSetting;

const cheerleader = {
  key: `cheerleader`,
  backgrounds: [
    {
      type: `from-below`,
      key: `blue-sky-confetti`,
      poses: [{ key: `cheering-with-pom-poms` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const cowPrintBikini = {
  key: `cow-print-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `grass-blue-sky`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const maidBikini = {
  key: `maid-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `cafe-window`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const microBikini = {
  key: `micro-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `ocean-beach`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const playboyBunny = {
  key: `playboy-bunny`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `casino`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `ceiling`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const revealingMiko = {
  key: `revealing-miko`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const santaBikini = {
  key: `santa-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `christmas`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `christmas`,
      poses: [{ key: `all-fours` }],
    },
    {
      type: `from-above`,
      key: `christmas`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.onBed,
    },
    {
      type: `from-below`,
      key: `christmas`,
      poses: [{ key: `upper-body` }],
    },
  ],
} as const satisfies OutfitSetting;

const sukumizuThighhighs = {
  key: `sukumizu-thighhighs`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      probability: 3,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const mahoakoNotekagaLocomusica = {
  key: `mahoako-notekaga-locomusica`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const sasuoniFirstHighSchoolUniform = (variation: `pantyhose` | `thighhighs`) =>
  ({
    key:
      variation === `pantyhose`
        ? `sasuoni-eft-first-high-school-uniform-pantyhose`
        : `sasuoni-eft-first-high-school-uniform-thighhighs`,
    backgrounds: [
      {
        type: `from-horizontal`,
        key: `indoors`,
        poses: fromHorizontalPosesPreset.usual,
      },
      {
        type: `from-below`,
        key: `ceiling`,
        poses: [{ key: `upper-body` }],
      },
      {
        type: `from-above`,
        key: `bed-sheet`,
        poses: fromAbovePosesPreset.usual,
      },
    ],
  }) as const satisfies OutfitSetting;

export const outfitsPreset = {
  "test-outfit": [testOutfit],
  bikini: [bikini],
  "bridal-lingerie": [bridalLingerie],
  "camisole-denim-shorts": [camisoleDenimShorts],
  "casual-miniskirt": [casualMiniskirt],
  cheerleader: [cheerleader],
  "cow-print-bikini": [cowPrintBikini],
  "maid-bikini": [maidBikini],
  "micro-bikini": [microBikini],
  "playboy-bunny": [playboyBunny],
  "revealing-miko": [revealingMiko],
  "santa-bikini": [santaBikini],
  "sukumizu-thighhighs": [sukumizuThighhighs],
  "mahoako-notekaga-locomusica": [mahoakoNotekagaLocomusica],
  "sasuoni-eft-first-high-school-uniform-pantyhose": [
    sasuoniFirstHighSchoolUniform(`pantyhose`),
  ],
  "sasuoni-eft-first-high-school-uniform-thighhighs": [
    sasuoniFirstHighSchoolUniform(`thighhighs`),
  ],
  usual: [
    bikini,
    camisoleDenimShorts,
    cheerleader,
    cowPrintBikini,
    maidBikini,
    microBikini,
    playboyBunny,
    revealingMiko,
    sukumizuThighhighs,
  ],
} as const satisfies {
  [k in OutfitKey | `usual`]: OutfitSetting[];
};

export const charactersPreset = {
  all: getKeys(characterTable).map((key) => ({
    key,
    outfits: [...outfitsPreset.usual],
  })),
} as const satisfies {
  [k in string]: CharacterSetting[];
};

/**
 * Define unique key for the pair of backgrounds and poses.
 */
type BackgroundAndPoseKey =
  | `from-above-bed-sheet-lying-on-bed`
  | `from-above-bed-sheet-full-body-lying`
  | `from-horizontal-all-fours`
  | `from-horizontal-all-fours-from-behind`
  | `from-horizontal-kneeling`;

export const generateCharactersSetting = ({
  characterKeys,
  outfitKeys,
  backgroundAndPoseKeys,
}: {
  characterKeys: CharacterKey[] | `all`;
  outfitKeys: OutfitKey[] | `usual`;
  backgroundAndPoseKeys?: BackgroundAndPoseKey[];
}): CharacterSetting[] => {
  const cKeys =
    characterKeys === `all` ? getKeys(characterTable) : characterKeys;
  const characterSettings = cKeys.map((cKey) => {
    if (outfitKeys === `usual`)
      return {
        key: cKey,
        outfits: [...outfitsPreset.usual],
      } as const satisfies CharacterSetting;

    if (!backgroundAndPoseKeys) {
      const outfits = outfitKeys.map((oKeys) => outfitsPreset[oKeys]).flat();

      return {
        key: cKey,
        outfits,
      } as const satisfies CharacterSetting;
    }

    const outfits = outfitKeys.map((oKey) => {
      const backgrounds = backgroundAndPoseKeys.map(
        (
          backgroundAndPoseKey,
        ):
          | BackgroundSetting<`from-horizontal`>
          | BackgroundSetting<`from-below`>
          | BackgroundSetting<`from-above`> => {
          switch (backgroundAndPoseKey) {
            case `from-above-bed-sheet-lying-on-bed`:
              return {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `lying-on-bed` }],
              } as const satisfies BackgroundSetting<`from-above`>;
            case `from-above-bed-sheet-full-body-lying`:
              return {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `full-body-lying` }],
              } as const satisfies BackgroundSetting<`from-above`>;
            case `from-horizontal-all-fours`:
              return {
                type: `from-horizontal`,
                key: `bed`,
                poses: [{ key: `all-fours` }],
              } as const satisfies BackgroundSetting<`from-horizontal`>;
            case `from-horizontal-all-fours-from-behind`:
              return {
                type: `from-horizontal`,
                key: `bed`,
                poses: [{ key: `all-fours-from-behind` }],
              } as const satisfies BackgroundSetting<`from-horizontal`>;
            case `from-horizontal-kneeling`:
              return {
                type: `from-horizontal`,
                key: `colorful-heart-backgrounds`,
                poses: [{ key: `kneeling` }],
              } as const satisfies BackgroundSetting<`from-horizontal`>;
          }
        },
      );

      return {
        key: oKey,
        backgrounds,
      } as const satisfies OutfitSetting;
    });

    return {
      key: cKey,
      outfits,
    } as const satisfies CharacterSetting;
  });

  return characterSettings;
};
