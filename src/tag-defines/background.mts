const allBackgroundTags = [
  `indoors`,
  `cafe`,
  `bed`,
  `lamp`,
  `window`,
  `classroom`,
  `office`,
  `night`,
  `outdoors`,
  `beach`,
  `ocean`,
  `poolside`,
  `city`,
  `rooftop`,
  `cityscape`,
  `confetti`,
  `blue sky`,
  `mountain`,
  `rock`,
  `forest`,
  `garden`,
  `simple background`,
  `white background`,
  `pink background`,
  `red background`,
  `heart background`,
  `heart`,
  `spoken heart`,
  `cave interior`,
  `ceiling`,
  `sunset`,
  `orange sky`,
  `night sky`,
  `grass`,
  `floor`,
  `wooden floor`,
  `partially submerged`,
  `bed sheet`,
  `pillow`,
  `amusement park`,
  `day`,
  `pool`,
  `casino`,
  `falling petals`,
  `petals`,
  `wedding`,
] as const satisfies readonly string[];
export type BackgroundTag = (typeof allBackgroundTags)[number];
