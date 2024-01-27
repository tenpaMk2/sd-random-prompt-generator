import { Entry } from "./prompt-define.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";

const preset = {
  colorfulPanties: [`underwear`, `panties`, `crotch seam`, `__color__ panties`],
  vividPanties: [
    `underwear`,
    `panties`,
    `crotch seam`,
    `__vivid_color__ panties`,
  ],
  vividPantiesStrong: [
    `underwear`,
    `panties`,
    `crotch seam`,
    { tag: `__vivid_color__ panties`, weight: 1.3 },
  ],
  colorfulPantiesStrong: [
    `underwear`,
    `panties`,
    `crotch seam`,
    { tag: `__color__ panties`, weight: 1.3 },
  ],
  pantiesUnderPantyhose: [
    `panties under pantyhose`,
    `underwear`,
    `panties`,
    `crotch seam`,
  ],
} as const satisfies { [k: string]: Entry<OutfitAndExposureTag>[] };

export const upskirtPreset = {
  ...preset,
  all: [Object.values(preset).map((p) => ({ entries: p }))],
} as const satisfies {
  [k: string]: Entry<OutfitAndExposureTag>[];
};
