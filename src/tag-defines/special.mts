const allSpecialTags = [
  `armpits`,
  `hanging breasts`,
  `taut clothes`,
  `cleavage`,
  `sideboob`,
  `backboob`,
  `underboob`,
  `zettai ryouiki`,
  `ass visible through thighs`,
  `thigh gap`,
  // TODO: `fang`
] as const satisfies readonly string[];
export type SpecialTag = (typeof allSpecialTags)[number];
