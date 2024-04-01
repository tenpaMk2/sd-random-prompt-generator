const allPoseTags = [
  `from behind`,
  `from above`,
  `from below`,
  `from side`,
  `portrait`,
  `upper body`,
  `cowboy shot`,
  `full body`,
  `looking at viewer`,
  `looking back`,
  `looking up`,
  `looking down`,
  `looking ahead`,
  `looking away`,
  `on back`,
  `on side`,
  `on stomach`,
  `on bed`,
  `close-up`,
  `ass focus`,
  `breasts`,
  `thighs`,
  `all fours`,
  `lying`,
  `legs up`,
  `spread legs`,
  `clothes lift`,
  `dress lift`,
  `skirt lift`,
  `leaning forward`,
  `upskirt`,
  `pantyshot`,
  `wariza`,
  `sitting`,
  `contrapposto`,
  `cheering`,
  `holding pom poms`,
  `pom pom \\(cheerleading\\)`,
  `twisted torso`,
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
  `reaching towards viewer`,
  `incoming hug`,
  `backlighting`,
  `hands on lap`,
  `kneeling`,
  `the pose`,
  `head rest`,
  `profile`,
  `squatting`,
  `hands on own hips`,
  `hands on own chest`,
  `hands on own face`,
  `hands on own cheek`,
  `hands on own knees`,
  `hands on own thighs`,
  `paw pose`,
] as const satisfies readonly string[];
export type PoseTag = (typeof allPoseTags)[number];
