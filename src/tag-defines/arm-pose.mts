const allArmPoseTags = [
  `arms up`,
  `arm up`,
  `w arms`,
  `reaching towards viewer`,
  `v`,
  `hand up`,
  `hands on own chest`,
  `heart hands`,
  `own hands together`,
  `singing`,
  `holding microphone`,
  `armpits`, // TODO
] as const satisfies string[];
export type ArmPoseTag = (typeof allArmPoseTags)[number];

export const armpitsVisibleTags = [
  `arms up`,
  `arm up`,
  `w arms`,
] as const satisfies ArmPoseTag[];
