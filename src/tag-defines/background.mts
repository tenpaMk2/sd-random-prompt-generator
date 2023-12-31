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
] as const satisfies readonly string[];
export type BackgroundTag = (typeof allBackgroundTags)[number];

export type Background = Readonly<{
  fromHorizontal: readonly (readonly BackgroundTag[])[];
  fromBelow: readonly (readonly BackgroundTag[])[];
  fromAbove: readonly (readonly BackgroundTag[])[];
  lying: readonly (readonly BackgroundTag[])[];
  clean: readonly (readonly BackgroundTag[])[]; // For sitting or all fours.
}>;
