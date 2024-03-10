import { BackgroundType } from "../backgrounds/resolver.mjs";
import { Entry } from "../prompt-define.mjs";
import { PoseTag } from "../tag-defines/pose.mjs";

type PoseDefine = {
  entries: Entry<PoseTag>[];
  somethingSpecial1?: any;
};

export const poseTable = {
  "from-horizontal": {
    "upper-body": { entries: [`upper body`] },
    contrapposto: { entries: [`contrapposto`] },
    "hands-on-own-hips": {
      entries: [`cowboy shot`, `hands on own hips`, `looking at viewer`],
    },
  },
  "from-below": {
    "upper-body": { entries: [`upper body`] },
    cheering: { entries: [`cheering`] },
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
