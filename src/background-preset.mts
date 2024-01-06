import { Entry } from "./prompt-define.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";

export const backgroundPreset = {
  fromHorizontalEntries: {
    indoors: [`indoors`],
    cafe: [`indoors`, `cafe`],
    bed: [`indoors`, `bed`, `lamp`],
    window: [`indoors`, `window`],
    classroom: [`indoors`, `classroom`],
    office: [`indoors`, `office`],
    nightRoom: [`indoors`, `night`, `window`],
    outdoors: [`outdoors`],
    beach: [`outdoors`, `beach`],
    ocean: [`outdoors`, `ocean`],
    poolside: [`outdoors`, `poolside`],
    city: [`outdoors`, `city`],
    rooftop: [`outdoors`, `rooftop`, `cityscape`],
    confetti: [`outdoors`, `confetti`, `blue sky`],
    mountain: [`outdoors`, `mountain`, `rock`],
    forest: [`outdoors`, `forest`],
    garden: [`outdoors`, `garden`],
    night: [`outdoors`, `night`],
    whiteBackground: [`simple background`, `white background`],
    heartBackground: [
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ],
    caveInterior: [`cave interior`],
    amusementPark: [`outdoors`, `amusement park`, `blue sky`],
    dayPool: [`outdoors`, `day`, `pool`],
  },
  fromBelowEntries: {
    indoors: [`indoors`],
    ceiling: [`indoors`, `ceiling`],
    officeCeiling: [`indoors`, `ceiling`, `office`],
    outdoors: [`outdoors`],
    blueSky: [`outdoors`, `blue sky`],
    sunsetSky: [`outdoors`, `sunset`, `orange sky`],
    nightSky: [`outdoors`, `night`, `night sky`],
    heartBackground: [
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ],
  },
  fromAboveEntries: {
    bedSheet: [`bed sheet`],
    indoors: [`indoors`],
    woodenFloor: [`indoors`, `wooden floor`],
    officeFloor: [`indoors`, `floor`, `office`],
    outdoors: [`outdoors`],
    grass: [`outdoors`, `grass`],
    ocean: [`outdoors`, `ocean`],
    oceanPartiallySubmerged: [`outdoors`, `ocean`, `partially submerged`],
    poolside: [`outdoors`, `poolside`],
    night: [`outdoors`, `night`],
    heartBackground: [
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ],
  },
  lyingEntries: {
    bedSheet: [`bed sheet`],
    bedSheetPillow: [`bed sheet`, `pillow`],
    grass: [`outdoors`, `grass`],
    oceanPartiallySubmerged: [`outdoors`, `ocean`, `partially submerged`],
    whiteBackground: [`simple background`, `white background`],
    pinkBackground: [`simple background`, `pink background`],
    heartWhiteBackground: [
      `simple background`,
      `white background`,
      `heart background`,
    ],
    heartPinkBackground: [
      `simple background`,
      `pink background`,
      `heart background`,
    ],
    heartBackground: [
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ],
  },
  cleanEntries: {
    bedSheet: [`bed sheet`],
    bedSheetWindow: [`indoors`, `bed sheet`, `window`],
    bedSheetLamp: [`indoors`, `bed sheet`, `lamp`],
    bedSheetPillow: [`indoors`, `bed sheet`, `pillow`],
    grass: [`outdoors`, `grass`],
    grassBlueSky: [`outdoors`, `grass`, `blue sky`],
    oceanPartiallySubmerged: [`outdoors`, `ocean`, `partially submerged`],
    poolside: [`outdoors`, `poolside`],
    whiteBackground: [`simple background`, `white background`],
    pinkBackground: [`simple background`, `pink background`],
    heartWhiteBackground: [
      `simple background`,
      `white background`,
      `heart background`,
    ],
    heartPinkBackground: [
      `simple background`,
      `pink background`,
      `heart background`,
    ],
    heartBackground: [
      `simple background`,
      `white background`,
      `heart background`,
      `heart`,
      `spoken heart`,
    ],
  },
} as const satisfies {
  [camera: string]: {
    [k: string]: Entry<BackgroundTag>[];
  };
};
