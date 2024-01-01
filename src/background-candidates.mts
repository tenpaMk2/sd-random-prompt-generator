import { BackgroundTag } from "./tag-defines/background.mjs";
import { TagLeaf } from "./tag-tree.mjs";

export type Background = Readonly<{
  fromHorizontalTree: TagLeaf<BackgroundTag>;
  fromBelowTree: TagLeaf<BackgroundTag>;
  fromAboveTree: TagLeaf<BackgroundTag>;
  lyingTree: TagLeaf<BackgroundTag>;
  cleanTree: TagLeaf<BackgroundTag>; // For sitting or all fours.
}>;

export const backgroundPreset = {
  fromHorizontalTree: {
    indoors: new TagLeaf({ tagEntries: [`indoors`] }),
    cafe: new TagLeaf({ tagEntries: [`indoors`, `cafe`] }),
    bed: new TagLeaf({ tagEntries: [`indoors`, `bed`, `lamp`] }),
    window: new TagLeaf({ tagEntries: [`indoors`, `window`] }),
    classroom: new TagLeaf({ tagEntries: [`indoors`, `classroom`] }),
    office: new TagLeaf({ tagEntries: [`indoors`, `office`] }),
    nightRoom: new TagLeaf({ tagEntries: [`indoors`, `night`, `window`] }),
    outdoors: new TagLeaf({ tagEntries: [`outdoors`] }),
    beach: new TagLeaf({ tagEntries: [`outdoors`, `beach`] }),
    ocean: new TagLeaf({ tagEntries: [`outdoors`, `ocean`] }),
    poolside: new TagLeaf({ tagEntries: [`outdoors`, `poolside`] }),
    city: new TagLeaf({ tagEntries: [`outdoors`, `city`] }),
    rooftop: new TagLeaf({ tagEntries: [`outdoors`, `rooftop`, `cityscape`] }),
    confetti: new TagLeaf({ tagEntries: [`outdoors`, `confetti`, `blue sky`] }),
    mountain: new TagLeaf({ tagEntries: [`outdoors`, `mountain`, `rock`] }),
    forest: new TagLeaf({ tagEntries: [`outdoors`, `forest`] }),
    garden: new TagLeaf({ tagEntries: [`outdoors`, `garden`] }),
    night: new TagLeaf({ tagEntries: [`outdoors`, `night`] }),
    whiteBackground: new TagLeaf({
      tagEntries: [`simple background`, `white background`],
    }),
    heartBackground: new TagLeaf({
      tagEntries: [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    }),
    cageInterior: new TagLeaf({ tagEntries: [`cave interior`] }),
  },
  fromBelowTree: {
    indoors: new TagLeaf({ tagEntries: [`indoors`] }),
    ceiling: new TagLeaf({ tagEntries: [`indoors`, `ceiling`] }),
    officeCeiling: new TagLeaf({
      tagEntries: [`indoors`, `ceiling`, `office`],
    }),
    outdoors: new TagLeaf({ tagEntries: [`outdoors`] }),
    blueSky: new TagLeaf({ tagEntries: [`outdoors`, `blue sky`] }),
    sunsetSky: new TagLeaf({
      tagEntries: [`outdoors`, `sunset`, `orange sky`],
    }),
    nightSky: new TagLeaf({ tagEntries: [`outdoors`, `night`, `night sky`] }),
    heartBackground: new TagLeaf({
      tagEntries: [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    }),
  },
  fromAboveTree: {
    bedSheet: new TagLeaf({ tagEntries: [`bed sheet`] }),
    indoors: new TagLeaf({ tagEntries: [`indoors`] }),
    woodenFloor: new TagLeaf({ tagEntries: [`indoors`, `wooden floor`] }),
    officeFloor: new TagLeaf({ tagEntries: [`indoors`, `floor`, `office`] }),
    outdoors: new TagLeaf({ tagEntries: [`outdoors`] }),
    grass: new TagLeaf({ tagEntries: [`outdoors`, `grass`] }),
    ocean: new TagLeaf({ tagEntries: [`outdoors`, `ocean`] }),
    poolside: new TagLeaf({ tagEntries: [`outdoors`, `poolside`] }),
    night: new TagLeaf({ tagEntries: [`outdoors`, `night`] }),
    heartBackground: new TagLeaf({
      tagEntries: [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    }),
  },
  lyingTree: {
    bedSheet: new TagLeaf({ tagEntries: [`bed sheet`] }),
    grass: new TagLeaf({ tagEntries: [`outdoors`, `grass`] }),
    oceanPartiallySubmerged: new TagLeaf({
      tagEntries: [`outdoors`, `ocean`, `partially submerged`],
    }),
    whiteBackground: new TagLeaf({
      tagEntries: [`simple background`, `white background`],
    }),
    pinkBackground: new TagLeaf({
      tagEntries: [`simple background`, `pink background`],
    }),
    heartWhiteBackground: new TagLeaf({
      tagEntries: [`simple background`, `white background`, `heart background`],
    }),
    heartPinkBackground: new TagLeaf({
      tagEntries: [`simple background`, `pink background`, `heart background`],
    }),
    heartBackground: new TagLeaf({
      tagEntries: [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    }),
  },
  cleanTree: {
    bedSheet: new TagLeaf({ tagEntries: [`bed sheet`] }),
    bedSheetWindow: new TagLeaf({
      tagEntries: [`indoors`, `bed sheet`, `window`],
    }),
    bedSheetLamp: new TagLeaf({ tagEntries: [`indoors`, `bed sheet`, `lamp`] }),
    bedSheetPillow: new TagLeaf({
      tagEntries: [`indoors`, `bed sheet`, `pillow`],
    }),
    grass: new TagLeaf({ tagEntries: [`outdoors`, `grass`] }),
    grassBlueSky: new TagLeaf({
      tagEntries: [`outdoors`, `grass`, `blue sky`],
    }),
    oceanPartiallySubmerged: new TagLeaf({
      tagEntries: [`outdoors`, `ocean`, `partially submerged`],
    }),
    whiteBackground: new TagLeaf({
      tagEntries: [`simple background`, `white background`],
    }),
    pinkBackground: new TagLeaf({
      tagEntries: [`simple background`, `pink background`],
    }),
    heartWhiteBackground: new TagLeaf({
      tagEntries: [`simple background`, `white background`, `heart background`],
    }),
    heartPinkBackground: new TagLeaf({
      tagEntries: [`simple background`, `pink background`, `heart background`],
    }),
    heartBackground: new TagLeaf({
      tagEntries: [
        `simple background`,
        `white background`,
        `heart background`,
        `heart`,
        `spoken heart`,
      ],
    }),
  },
} as const satisfies {
  [camera in keyof Background]: {
    [k: string]: TagLeaf<BackgroundTag>;
  };
};
