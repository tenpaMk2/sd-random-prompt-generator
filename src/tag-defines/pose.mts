const allPoseTags = [
  `looking at viewer`,
  `looking back`,
  `looking up`,
  `upper body`,
  `cowboy shot`,
  `all fours`,
  `from behind`,
  `upskirt`,
  `on bed`,
] as const satisfies readonly string[];
export type PoseTag = (typeof allPoseTags)[number];
