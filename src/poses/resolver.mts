import { BackgroundType } from "../backgrounds/resolver.mjs";
import { OutfitDefine } from "../outfits/resolver.mjs";
import { NormalEntry } from "../prompt-define.mjs";
import { PoseTag } from "../tag-defines/pose.mjs";
import { Visibility } from "../tag-defines/visibility.mjs";

export type PoseSpecialVisibility = Omit<
  OutfitDefine["specialVisibility"],
  "underboobLevel"
> &
  Readonly<{
    underboobLevel: `from below` | `from horizontal` | `invisible`;
    upskirt: boolean;
  }>;

export const PoseUnderboobLevelOrder = {
  "from below": 0,
  "from horizontal": 1,
  invisible: 2,
} as const satisfies {
  [k in PoseSpecialVisibility["underboobLevel"]]: number;
};

type PoseDefine = {
  entries: NormalEntry<PoseTag>[];
  visibility: Visibility;
  specialVisibility: PoseSpecialVisibility;
};

const visibilityPreset = {
  frontPortrait: {
    frontHead: true,
    sideHead: true,
    backHead: false,
    frontBreast: true,
    sideBreast: true,
    backBreast: false,
    frontMidriff: false,
    sideMidriff: false,
    backMidriff: false,
    frontHipAndThigh: false,
    sideHipAndThigh: false,
    backHipAndThigh: false,
    foot: false,
    wristAndHand: false,
    aroundBody: false,
  },
  frontUpperBody: {
    frontHead: true,
    sideHead: true,
    backHead: false,
    frontBreast: true,
    sideBreast: true,
    backBreast: false,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: false,
    frontHipAndThigh: false,
    sideHipAndThigh: false,
    backHipAndThigh: false,
    foot: false,
    wristAndHand: false,
    aroundBody: false,
  },
  frontCowboyShot: {
    frontHead: true,
    sideHead: true,
    backHead: false,
    frontBreast: true,
    sideBreast: true,
    backBreast: false,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: false,
    frontHipAndThigh: true,
    sideHipAndThigh: true,
    backHipAndThigh: false,
    foot: false,
    wristAndHand: true,
    aroundBody: true,
  },
} as const satisfies { [k in string]: Visibility };

const specialVisibilityPreset = {
  frontPortraitArmDown: {
    armpits: false,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: true,
    sideboob: false,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: false,
    insideOfThighs: false,
    upskirt: false,
  },
  frontPortraitArmUp: {
    armpits: true,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: true,
    sideboob: false,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: false,
    insideOfThighs: false,
    upskirt: false,
  },
  frontUpperBodyShotArmDown: {
    armpits: false,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: true,
    sideboob: false,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: true,
    insideOfThighs: true,
    upskirt: false,
  },
  frontCowboyShotArmDown: {
    armpits: false,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: true,
    sideboob: false,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: true,
    insideOfThighs: true,
    upskirt: false,
  },
  frontCowboyShotArmUp: {
    armpits: true,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: true,
    sideboob: false,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: true,
    insideOfThighs: true,
    upskirt: false,
  },
} as const satisfies {
  [k in string]: PoseSpecialVisibility;
};

export const poseTable = {
  "from-horizontal": {
    portrait: {
      entries: [`portrait`, `looking at viewer`],
      visibility: visibilityPreset.frontPortrait,
      specialVisibility: specialVisibilityPreset.frontPortraitArmDown,
    },
    contrapposto: {
      entries: [`contrapposto`, `looking at viewer`],
      visibility: visibilityPreset.frontCowboyShot,
      specialVisibility: specialVisibilityPreset.frontCowboyShotArmDown,
    },
    "hands-on-own-hips": {
      entries: [`cowboy shot`, `hands on own hips`, `looking at viewer`],
      visibility: visibilityPreset.frontCowboyShot,
      specialVisibility: specialVisibilityPreset.frontCowboyShotArmDown,
    },
    v: {
      entries: [`cowboy shot`, `v`, `hand up`, `looking at viewer`],
      visibility: visibilityPreset.frontCowboyShot,
      specialVisibility: specialVisibilityPreset.frontCowboyShotArmDown,
    },
    "double-v": {
      entries: [
        `cowboy shot`,
        `double v`,
        `v`,
        `hands up`,
        `looking at viewer`,
      ],
      visibility: visibilityPreset.frontCowboyShot,
      specialVisibility: specialVisibilityPreset.frontCowboyShotArmDown,
    },
    "arms-up": {
      entries: [
        `cowboy shot`,
        `arms up`,
        `arms behind head`,
        `looking at viewer`,
      ],
      visibility: visibilityPreset.frontCowboyShot,
      specialVisibility: specialVisibilityPreset.frontCowboyShotArmUp,
    },
    "heart-hands": {
      entries: [
        `upper body`,
        `heart hands`,
        `hands up`,
        `breasts`,
        `looking at viewer`,
      ],
      visibility: visibilityPreset.frontUpperBody,
      specialVisibility: specialVisibilityPreset.frontUpperBodyShotArmDown,
    },
    "cowboy-shot-from-side": {
      entries: [`cowboy shot`, `from side`, `looking ahead`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: true,
        frontBreast: false,
        sideBreast: true,
        backBreast: false,
        frontMidriff: false,
        sideMidriff: true,
        backMidriff: false,
        frontHipAndThigh: false,
        sideHipAndThigh: true,
        backHipAndThigh: false,
        foot: false,
        wristAndHand: true,
        aroundBody: true,
      },
      specialVisibility: {
        armpits: false,
        hangingBreasts: false,
        tautClothes: false,
        cleavage: false,
        sideboob: true,
        backboob: false,
        underboobLevel: `from horizontal`,
        zettaiRyouiki: true,
        insideOfThighs: false,
        upskirt: false,
      },
    },
    "twisted-torso": {
      entries: [
        `cowboy shot`,
        `twisted torso`,
        `looking back`,
        `looking at viewer`,
      ],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: false,
        frontBreast: true,
        sideBreast: true,
        backBreast: false,
        frontMidriff: false,
        sideMidriff: true,
        backMidriff: true,
        frontHipAndThigh: false,
        sideHipAndThigh: true,
        backHipAndThigh: true,
        foot: false,
        wristAndHand: false,
        aroundBody: true,
      },
      specialVisibility: {
        armpits: false,
        hangingBreasts: false,
        tautClothes: true,
        cleavage: false,
        sideboob: true,
        backboob: false,
        underboobLevel: `invisible`,
        zettaiRyouiki: true,
        insideOfThighs: false,
        upskirt: false,
      },
    },
  },
  "from-below": {
    "upper-body": {
      entries: [`upper body`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: false,
        frontBreast: true,
        sideBreast: true,
        backBreast: false,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: false,
        frontHipAndThigh: false,
        sideHipAndThigh: false,
        backHipAndThigh: false,
        foot: false,
        wristAndHand: false,
        aroundBody: true,
      },
      specialVisibility: {
        armpits: false,
        hangingBreasts: false,
        tautClothes: true,
        cleavage: false,
        sideboob: false,
        backboob: false,
        underboobLevel: `from below`,
        zettaiRyouiki: false,
        insideOfThighs: false,
        upskirt: false,
      },
    },
    "cheering-with-pom-poms": {
      entries: [
        `from below`,
        `cheering`,
        `holding pom poms`,
        `pom pom \\(cheerleading\\)`,
        [{ entries: [`arms up`] }, { entries: [`arm up`] }],
        [{ entries: [`leg up`] }, { entries: [] }],
        `looking down`,
        `looking at viewer`,
      ],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: false,
        frontBreast: true,
        sideBreast: true,
        backBreast: false,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: false,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: false,
        foot: false,
        wristAndHand: true,
        aroundBody: true,
      },
      specialVisibility: {
        armpits: true,
        hangingBreasts: false,
        tautClothes: true,
        cleavage: false,
        sideboob: true,
        backboob: false,
        underboobLevel: `from below`,
        zettaiRyouiki: false,
        insideOfThighs: false,
        upskirt: true,
      },
    },
  },
  "from-above": {
    "full-body-lying": {
      entries: [`from above`, `full body`, `lying`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: false,
        frontBreast: true,
        sideBreast: true,
        backBreast: false,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: false,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: false,
        foot: true,
        wristAndHand: true,
        aroundBody: true,
      },
      specialVisibility: {
        armpits: false,
        hangingBreasts: false,
        tautClothes: true,
        cleavage: true,
        sideboob: false,
        backboob: false,
        underboobLevel: `from horizontal`,
        zettaiRyouiki: false,
        insideOfThighs: true,
        upskirt: false,
      },
    },
    "lying-on-bed": {
      entries: [`from above`, `lying`, `on bed`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: false,
        frontBreast: true,
        sideBreast: true,
        backBreast: false,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: false,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: false,
        foot: false,
        wristAndHand: true,
        aroundBody: true,
      },
      specialVisibility: {
        armpits: false,
        hangingBreasts: false,
        tautClothes: true,
        cleavage: true,
        sideboob: false,
        backboob: false,
        underboobLevel: `from horizontal`,
        zettaiRyouiki: false,
        insideOfThighs: true,
        upskirt: false,
      },
    },
  },
} as const satisfies {
  [k in BackgroundType]: {
    [k: string]: PoseDefine;
  };
};

export type PoseKey = Readonly<{
  "from-horizontal": keyof (typeof poseTable)["from-horizontal"];
  "from-below": keyof (typeof poseTable)["from-below"];
  "from-above": keyof (typeof poseTable)["from-above"];
}>;
