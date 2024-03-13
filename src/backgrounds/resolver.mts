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
    "cafe-window": {
      entries: [`indoors`, `cafe`, `window`],
      removeShoes: false,
    },
    ocean: {
      entries: [`outdoors`, `ocean`, `wet`, `blue sky`],
      removeShoes: true,
    },
    "ocean-beach": {
      entries: [`outdoors`, `ocean`, `beach`, `blue sky`],
      removeShoes: true,
    },
    "colorful-backgrounds": {
      entries: [
        `simple background`,
        [
          { entries: [`white background`] },
          { entries: [`pink background`] },
          { entries: [`blue background`] },
          { entries: [`red background`] },
        ],
      ],
      removeShoes: false,
    },
  },
  "from-below": {
    indoors: { entries: [`indoors`], removeShoes: false },
    "cafe-ceiling": {
      entries: [`indoors`, `cafe`, `ceiling`],
      removeShoes: false,
    },
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
