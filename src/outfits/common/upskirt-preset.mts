import { NormalEntry } from "../../prompt-define.mjs";
import { OutfitAndExposureTag } from "../../tag-defines/outfit-and-exposure.mjs";

export const upskirtPreset = {
  colorfulPanties: [
    `underwear`,
    `panties`,
    `crotch seam`,
    [
      { entries: [`aqua panties`] },
      { entries: [`black panties`] },
      { entries: [`blue panties`] },
      // { entries: [`brown panties`] },
      { entries: [`green panties`] },
      // { entries: [`grey panties`] },
      { entries: [`orange panties`] },
      { entries: [`pink panties`] },
      { entries: [`purple panties`] },
      { entries: [`red panties`] },
      { entries: [`white panties`] },
      { entries: [`yellow panties`] },
    ],
  ],
  monochromePanties: [
    `underwear`,
    `panties`,
    `crotch seam`,
    [{ entries: [`black panties`] }, { entries: [`white panties`] }],
  ],
  vividPanties: [
    `underwear`,
    `panties`,
    `crotch seam`,
    [
      { entries: [`aqua panties`] },
      { entries: [`blue panties`] },
      { entries: [`green panties`] },
      { entries: [`orange panties`] },
      { entries: [`pink panties`] },
      { entries: [`purple panties`] },
      { entries: [`red panties`] },
      { entries: [`yellow panties`] },
    ],
  ],
} as const satisfies {
  [k in string]: NormalEntry<OutfitAndExposureTag>[];
};
