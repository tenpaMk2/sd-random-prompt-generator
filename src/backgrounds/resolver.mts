import { Entry } from "../prompt-define.mjs";
import { BackgroundTag } from "../tag-defines/background.mjs";

export type BackgroundType = `from-horizontal` | `from-below`;

type BackgroundDefine = {
  entries: Entry<BackgroundTag>[];
  removeShoes: boolean;
};

export const backgroundTable = {
  "from-horizontal": {
    indoors: { entries: [`indoors`], removeShoes: false },
    cafe: { entries: [`indoors`, `cafe`], removeShoes: false },
  },
  "from-below": {
    indoors: { entries: [`indoors`], removeShoes: false },
    ceiling: { entries: [`indoors`, `ceiling`], removeShoes: false },
    "blue-sky": { entries: [`outdoors`, `blue sky`], removeShoes: false },
  },
} as const satisfies {
  [k in BackgroundType]: {
    [k: string]: BackgroundDefine;
  };
};

export type BackgroundKey = {
  "from-horizontal": keyof (typeof backgroundTable)["from-horizontal"];
  "from-below": keyof (typeof backgroundTable)["from-below"];
};
