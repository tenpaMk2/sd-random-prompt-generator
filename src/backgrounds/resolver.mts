import { NormalEntry } from "../prompt-define.mjs";
import { BackgroundTag } from "../tag-defines/background.mjs";

export type BackgroundType = `from-horizontal` | `from-below` | `from-above`;

type BackgroundDefine = {
  entries: NormalEntry<BackgroundTag>[];
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
    "blue-sky-confetti": {
      entries: [`outdoors`, `blue sky`, `confetti`],
      removeShoes: false,
    },
  },
  "from-above": {
    floor: { entries: [`floor`], removeShoes: false },
    "ocean-partially-submerged": {
      entries: [`outdoors`, `ocean`, `wet`, `partially submerged`],
      removeShoes: false,
    },
    "bed-sheet": { entries: [`indoors`, `bed sheet`], removeShoes: true },
  },
} as const satisfies {
  [k in BackgroundType]: {
    [k: string]: BackgroundDefine;
  };
};

export type BackgroundKey = {
  "from-horizontal": keyof (typeof backgroundTable)["from-horizontal"];
  "from-below": keyof (typeof backgroundTable)["from-below"];
  "from-above": keyof (typeof backgroundTable)["from-above"];
};
