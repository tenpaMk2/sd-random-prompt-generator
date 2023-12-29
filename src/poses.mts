import { generateDynamicPrompt } from "./libs/utility.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";
import { Candidate } from "./token-defines.mjs";

const allArmPoseCandidates = [
  [`arms up`],
  [`reaching towards viewer`],
  [`v`],
  [`hand up`],
  [`hands on own chest`],
  [`heart hands`],
  [`own hands together`],
  [`singing`, `holding microphone`],
] as const satisfies readonly Candidate<string>[];
type ArmPoseCandidate = (typeof allArmPoseCandidates)[number];

const armpitsVisibleTokens = [`arms up`, `arm up`, `w arms`] as const;

const convertArmPoseCandidates = (
  candidates: readonly ArmPoseCandidate[],
  isArmpitsExposure: boolean,
) =>
  candidates.map((candidate) => {
    // 脇が見えるポーズで、かつ、脇が見える服装なら、脇を見せる
    if (
      isArmpitsExposure &&
      candidate.some((t) => armpitsVisibleTokens.some((avt) => avt === t))
    ) {
      return [...candidate, `armpits`];
    }
    return candidate;
  });

const candidatesToPrompts = (candidates: readonly Candidate<string>[]) =>
  candidates.map((tokens) => tokens.join(`, `));

type Generator = (info: EachVisibleTokenInfo) => {
  key: string;
  prompt: string;
};

const generateUpperBody: Generator = ({
  frontHeadTokens,
  frontPortraitTokens,
  frontMidriffTokens,
  isArmpitsExposure,
  profileEmotionCandidates,
  frontEmotionCandidates,
  background: { fromHorizontal },
}) => {
  const convertedArmPoseCandidates = convertArmPoseCandidates(
    allArmPoseCandidates,
    isArmpitsExposure,
  );

  const profileEmotionDynamicPrompt = [
    `profile`,
    generateDynamicPrompt(candidatesToPrompts(profileEmotionCandidates)),
  ].join(`, `);
  const frontEmotionDynamicPrompt = generateDynamicPrompt(
    candidatesToPrompts(frontEmotionCandidates),
  );

  return {
    key: `upper-body`,
    prompt: [
      ...new Set([
        `upper body`,
        `looking at viewer`,
        ...frontHeadTokens,
        ...frontPortraitTokens,
        ...frontMidriffTokens,
      ]), // Remove dupe.
      generateDynamicPrompt(candidatesToPrompts(convertedArmPoseCandidates)),
      generateDynamicPrompt([
        `1::${profileEmotionDynamicPrompt}`,
        `3::${frontEmotionDynamicPrompt}`,
      ]),
      generateDynamicPrompt(candidatesToPrompts(fromHorizontal)),
    ].join(`, `),
  };
};

const generateCowboyShot: Generator = ({
  frontHeadTokens,
  frontPortraitTokens,
  frontMidriffTokens,
  frontThighTokens,
  isArmpitsExposure,
  profileEmotionCandidates,
  frontEmotionCandidates,
  background: { fromHorizontal },
}) => {
  const convertedArmPoseCandidates = convertArmPoseCandidates(
    allArmPoseCandidates,
    isArmpitsExposure,
  );

  const profileEmotionDynamicPrompt = [
    `profile`,
    generateDynamicPrompt(candidatesToPrompts(profileEmotionCandidates)),
  ].join(`, `);
  const frontEmotionDynamicPrompt = generateDynamicPrompt(
    candidatesToPrompts(frontEmotionCandidates),
  );

  return {
    key: `cowboy-shot`,
    prompt: [
      ...new Set([
        `cowboy shot`,
        `looking at viewer`,
        ...frontHeadTokens,
        ...frontPortraitTokens,
        ...frontMidriffTokens,
        ...frontThighTokens,
      ]), // Remove dupe.
      generateDynamicPrompt(candidatesToPrompts(convertedArmPoseCandidates)),
      generateDynamicPrompt([
        `1::${profileEmotionDynamicPrompt}`,
        `3::${frontEmotionDynamicPrompt}`,
      ]),
      generateDynamicPrompt(candidatesToPrompts(fromHorizontal)),
    ].join(`, `),
  };
};

const generateAllFours: Generator = ({
  frontHeadTokens,
  frontPortraitTokens,
  frontMidriffTokens,
  frontThighTokens,
  footTokens,
  frontEmotionCandidates,
  background: { clean },
}) => {
  return {
    key: `all-fours`,
    prompt: [
      ...new Set([
        `all fours`,
        `looking at viewer`,
        ...frontHeadTokens,
        ...frontPortraitTokens,
        ...frontMidriffTokens,
        ...frontThighTokens,
        ...footTokens,
      ]), // Remove dupe.
      ...(frontPortraitTokens.some((t) => t === `cleavage`)
        ? [`hanging breasts`]
        : []),
      generateDynamicPrompt(candidatesToPrompts(frontEmotionCandidates)),
      generateDynamicPrompt(candidatesToPrompts(clean)),
    ].join(`, `),
  };
};

const generateAllFoursFromBehind: Generator = ({
  frontHeadTokens,
  backPortraitTokens,
  backMidriffTokens,
  backThighTokens,
  footTokens,
  profileEmotionCandidates,
  frontEmotionCandidates,
  background: { clean },
}) => {
  const profileEmotionDynamicPrompt = [
    `profile`,
    generateDynamicPrompt(candidatesToPrompts(profileEmotionCandidates)),
  ].join(`, `);
  const frontEmotionDynamicPrompt = generateDynamicPrompt(
    candidatesToPrompts(frontEmotionCandidates),
  );

  return {
    key: `all-fours-from-behind`,
    prompt: [
      ...new Set([
        `all fours`,
        `looking at viewer`,
        `from behind`,
        `looking back`,
        `ass`,
        ...frontHeadTokens,
        ...backPortraitTokens,
        ...backMidriffTokens,
        ...backThighTokens,
        ...footTokens,
      ]), // Remove dupe.
      generateDynamicPrompt([
        `1::${profileEmotionDynamicPrompt}`,
        `3::${frontEmotionDynamicPrompt}`,
      ]),
      generateDynamicPrompt(candidatesToPrompts(clean)),
    ].join(`, `),
  };
};

export const posePromptGenerators = [
  generateUpperBody,
  generateCowboyShot,
  generateAllFours,
  generateAllFoursFromBehind,
];
