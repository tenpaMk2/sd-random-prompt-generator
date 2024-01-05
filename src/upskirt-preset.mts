import { Entry } from "./prompt-define.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";

const preset = {
  panties: [
    `underwear`,
    `panties`,
    `crotch seam`,
    [
      { entries: [`red panties`] },
      { entries: [`blue panties`] },
      { entries: [`green panties`] },
      { entries: [`yellow panties`] },
      { entries: [`orange panties`] },
      { entries: [`aqua panties`] },
      { entries: [`white panties`] },
      { entries: [`black panties`] },
      { entries: [`pink panties`] },
      { entries: [`purple panties`] },
    ],
  ],
  colorfulPantiesStrong: [
    `underwear`,
    `panties`,
    `crotch seam`,
    [
      { entries: [{ tag: `red panties`, weight: 1.3 }] },
      { entries: [{ tag: `blue panties`, weight: 1.3 }] },
      { entries: [{ tag: `green panties`, weight: 1.3 }] },
      { entries: [{ tag: `yellow panties`, weight: 1.3 }] },
      { entries: [{ tag: `orange panties`, weight: 1.3 }] },
      { entries: [{ tag: `aqua panties`, weight: 1.3 }] },
      { entries: [{ tag: `pink panties`, weight: 1.3 }] },
      { entries: [{ tag: `purple panties`, weight: 1.3 }] },
    ],
  ],
  pantiesStrong: [
    `underwear`,
    `panties`,
    `crotch seam`,
    [
      { entries: [{ tag: `red panties`, weight: 1.3 }] },
      { entries: [{ tag: `blue panties`, weight: 1.3 }] },
      { entries: [{ tag: `green panties`, weight: 1.3 }] },
      { entries: [{ tag: `yellow panties`, weight: 1.3 }] },
      { entries: [{ tag: `orange panties`, weight: 1.3 }] },
      { entries: [{ tag: `aqua panties`, weight: 1.3 }] },
      { entries: [{ tag: `white panties`, weight: 1.3 }] },
      { entries: [{ tag: `black panties`, weight: 1.3 }] },
      { entries: [{ tag: `pink panties`, weight: 1.3 }] },
      { entries: [{ tag: `purple panties`, weight: 1.3 }] },
    ],
  ],
} as const satisfies { [k: string]: Entry<OutfitAndExposureTag>[] };

export const upskirtPreset = {
  ...preset,
  all: [Object.values(preset).map((p) => ({ entries: p }))],
} as const satisfies {
  [k: string]: Entry<OutfitAndExposureTag>[];
};
