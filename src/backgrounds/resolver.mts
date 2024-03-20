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
    "colorful-heart-backgrounds": {
      entries: [
        `simple background`,
        `heart background`,
        [
          { entries: [`white background`] },
          { entries: [`pink background`], probability: 3 },
          { entries: [`blue background`] },
          { entries: [`red background`] },
        ],
      ],
      removeShoes: false,
    },
    bed: {
      entries: [`bed`],
      removeShoes: true,
    },
    "grass-blue-sky": {
      entries: [`outdoors`, `grass`, `blue sky`],
      removeShoes: false,
    },
    casino: {
      entries: [`indoors`, `casino`, `playing card`],
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
    "bed-sheet": { entries: [`bed sheet`], removeShoes: true }, // `bed sheet` should not be set with `indoors`.
    "steaming-bed-sheet-spoken-heart": {
      entries: [
        `bed sheet`,
        `sweat`,
        `steam`,
        `steaming body`,
        `heart`,
        `spoken heart`,
      ],
      removeShoes: true,
    },
    casino: {
      entries: [`indoors`, `casino`, `playing card`],
      removeShoes: false,
    },
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
