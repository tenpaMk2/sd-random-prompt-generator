import { BackgroundType } from "../backgrounds/resolver.mjs";
import { Entry } from "../prompt-define.mjs";
import { PoseTag } from "../tag-defines/pose.mjs";
import { Visibility } from "../tag-defines/visibility.mjs";

type PoseDefine = {
  entries: Entry<PoseTag>[];
  visibility: Visibility;
};

export const poseTable = {
  "from-horizontal": {
    "upper-body": {
      entries: [`upper body`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: true,
        frontBreast: true,
        sideBreast: true,
        backBreast: true,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: true,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: true,
        foot: true,
        wristAndHand: true,
        aroundBody: true,
      },
    },
    contrapposto: {
      entries: [`contrapposto`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: true,
        frontBreast: true,
        sideBreast: true,
        backBreast: true,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: true,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: true,
        foot: true,
        wristAndHand: true,
        aroundBody: true,
      },
    },
    "hands-on-own-hips": {
      entries: [`cowboy shot`, `hands on own hips`, `looking at viewer`],
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
    },
  },
  "from-below": {
    "upper-body": {
      entries: [`upper body`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: true,
        frontBreast: true,
        sideBreast: true,
        backBreast: true,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: true,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: true,
        foot: true,
        wristAndHand: true,
        aroundBody: true,
      },
    },
    cheering: {
      entries: [`cheering`],
      visibility: {
        frontHead: true,
        sideHead: true,
        backHead: true,
        frontBreast: true,
        sideBreast: true,
        backBreast: true,
        frontMidriff: true,
        sideMidriff: true,
        backMidriff: true,
        frontHipAndThigh: true,
        sideHipAndThigh: true,
        backHipAndThigh: true,
        foot: true,
        wristAndHand: true,
        aroundBody: true,
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
}>;
