import { BackgroundTag } from "./tag-defines/background.mjs";
import {
  DynamicCandidate,
  DynamicPrompt,
  SingleTagToken,
  Token,
} from "./token.mjs";

export type Background = Readonly<{
  fromHorizontal: readonly Token<BackgroundTag>[];
  fromBelow: readonly Token<BackgroundTag>[];
  fromAbove: readonly Token<BackgroundTag>[];
  lying: readonly Token<BackgroundTag>[];
  clean: readonly Token<BackgroundTag>[]; // For sitting or all fours.
}>;

const s = SingleTagToken<BackgroundTag>;
const c = DynamicCandidate<BackgroundTag>;
const d = DynamicPrompt<BackgroundTag>;

export const backgroundCandidates = {
  fromHorizontal: {
    indoors: new c([`indoors`]),
    cafe: new c([`indoors`, `cafe`]),
    bed: new c([`indoors`, `bed`, `lamp`]),
    window: new c([`indoors`, `window`]),
    classroom: new c([`indoors`, `classroom`]),
    office: new c([`indoors`, `office`]),
    nightRoom: new c([`indoors`, `night`, `window`]),
    outdoors: new c([`outdoors`]),
    beach: new c([`outdoors`, `beach`]),
    ocean: new c([`outdoors`, `ocean`]),
    city: new c([`outdoors`, `city`]),
    rooftop: new c([`outdoors`, `rooftop`, `cityscape`]),
    confetti: new c([`outdoors`, `confetti`, `blue sky`]),
    mountain: new c([`outdoors`, `mountain`, `rock`]),
    forest: new c([`outdoors`, `forest`]),
    garden: new c([`outdoors`, `garden`]),
    night: new c([`outdoors`, `night`]),
    whiteBackground: new c([`simple background`, `white background`]),
    heartBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ]),
    cageInterior: new c([`cave interior`]),
  },
  fromBelow: {
    indoors: new c([`indoors`]),
    ceiling: new c([`indoors`, `ceiling`]),
    officeCeiling: new c([`indoors`, `ceiling`, `office`]),
    outdoors: new c([`outdoors`]),
    blueSky: new c([`outdoors`, `blue sky`]),
    sunsetSky: new c([`outdoors`, `sunset`, `orange sky`]),
    nightSky: new c([`outdoors`, `night`, `night sky`]),
    heartBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ]),
  },
  fromAbove: {
    bedSheet: new c([`bed sheet`]),
    indoors: new c([`indoors`]),
    woodenFloor: new c([`indoors`, `wooden floor`]),
    officeFloor: new c([`indoors`, `floor`, `office`]),
    outdoors: new c([`outdoors`]),
    grass: new c([`outdoors`, `grass`]),
    ocean: new c([`outdoors`, `ocean`]),
    night: new c([`outdoors`, `night`]),
    heartBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ]),
  },
  lying: {
    bedSheet: new c([`bed sheet`]),
    grass: new c([`outdoors`, `grass`]),
    oceanPartiallySubmerged: new c([
      `outdoors`,
      `ocean`,
      `partially submerged`,
    ]),
    whiteBackground: new c([`simple background`, `white background`]),
    pinkBackground: new c([`simple background`, `pink background`]),
    heartWhiteBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
    ]),
    heartPinkBackground: new c([
      `simple background`,
      `pink background`,
      `heart background`,
    ]),
    heartBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ]),
  },
  clean: {
    bedSheet: new c([`bed sheet`]),
    bedSheetWindow: new c([`indoors`, `bed sheet`, `window`]),
    grass: new c([`outdoors`, `grass`]),
    grassBlueSky: new c([`outdoors`, `grass`, `blue sky`]),
    oceanPartiallySubmerged: new c([
      `outdoors`,
      `ocean`,
      `partially submerged`,
    ]),
    whiteBackground: new c([`simple background`, `white background`]),
    pinkBackground: new c([`simple background`, `pink background`]),
    heartWhiteBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
    ]),
    heartPinkBackground: new c([
      `simple background`,
      `pink background`,
      `heart background`,
    ]),
    heartBackground: new c([
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ]),
  },
} as const satisfies {
  [camera in keyof Background]: {
    [k: string]: DynamicCandidate<BackgroundTag>;
  };
};
