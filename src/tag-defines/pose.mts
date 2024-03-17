const allPoseTags = [
  `looking at viewer`,
  `looking back`,
  `looking up`,
  `looking down`,
  `looking ahead`,
  `looking away`,
  `portrait`,
  `upper body`,
  `cowboy shot`,
  `all fours`,
  `lying`,
  `on back`,
  `on bed`,
  `legs up`,
  `spread legs`,
  `clothes lift`,
  `dress lift`,
  `skirt lift`,
  `leaning forward`,
  `from behind`,
  `from above`,
  `from below`,
  `from side`,
  `upskirt`,
  `pantyshot`,
  `wariza`,
  `sitting`,
  `contrapposto`,
  `cheering`,
  `holding pom poms`,
  `pom pom \\(cheerleading\\)`,
  `hands on own hips`,
  `twisted torso`,
  `breasts`,
  `v`,
  `double v`,
  `hand up`,
  `hands up`,
  `arms up`,
  `arm up`,
  `arms behind head`,
  `heart hands`,
  `legs up`,
  `leg up`,
  `bouquet`,
  `holding bouquet`,
] as const satisfies readonly string[];
export type PoseTag = (typeof allPoseTags)[number];

// const allArmPoseTags = [
//   `arms up`,
//   `arm up`,
//   `w arms`,
//   `reaching towards viewer`,
//   `v`,
//   `hand up`,
//   `hands on own chest`,
//   `heart hands`,
//   `own hands together`,
//   `singing`,
//   `holding microphone`,
//   `v arms`,
//   `hands on lap`,
// ] as const satisfies string[];
// export type ArmPoseTag = (typeof allArmPoseTags)[number];

// export const armpitsVisibleTags = [
//   `arms up`,
//   `arm up`,
//   `w arms`,
// ] as const satisfies ArmPoseTag[];
