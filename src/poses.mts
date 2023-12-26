import { generateDynamicPrompt } from "./libs/utility.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";

const allArmPoseCandidates = [
  [`arms up`],
  [`reaching towards viewer`],
  [`v`],
  [`hand up`],
  [`hands on own chest`],
  [`heart hands`],
  [`own hands together`],
  [`singing`, `holding microphone`],
] as const;
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

const candidatesToPrompts = (candidates: readonly (readonly string[])[]) =>
  candidates.map((tokens) => tokens.join(`, `));

const generateUpperBody = ({
  charaTokens,
  frontHeadTokens,
  frontUpperBodyTokens,
  isArmpitsExposure,
  profileEmotionCandidates,
  emotionCandidates,
  backgroundDefine: { fromHorizontal },
}: EachVisibleTokenInfo) => {
  const convertedArmPoseCandidates = convertArmPoseCandidates(
    allArmPoseCandidates,
    isArmpitsExposure,
  );

  const profileEmotionDynamicPrompt = [
    `profile`,
    generateDynamicPrompt(candidatesToPrompts(profileEmotionCandidates)),
  ].join(`, `);
  const frontEmotionDynamicPrompt = generateDynamicPrompt(
    candidatesToPrompts(emotionCandidates),
  );

  return [
    `upper body`,
    `looking at viewer`,
    charaTokens.join(`, `),
    frontHeadTokens.join(`, `),
    frontUpperBodyTokens.join(`, `),
    generateDynamicPrompt(candidatesToPrompts(convertedArmPoseCandidates)),
    generateDynamicPrompt([
      `1::${profileEmotionDynamicPrompt}`,
      `3::${frontEmotionDynamicPrompt}`,
    ]),
    generateDynamicPrompt(candidatesToPrompts(fromHorizontal)),
  ].join(`,\n`);
};

const generateCowboyShot = ({
  charaTokens,
  frontHeadTokens,
  frontUpperBodyTokens,
  frontLowerBodyTokens,
  isArmpitsExposure,
  profileEmotionCandidates,
  emotionCandidates,
  backgroundDefine: { fromHorizontal },
}: EachVisibleTokenInfo) => {
  const convertedArmPoseCandidates = convertArmPoseCandidates(
    allArmPoseCandidates,
    isArmpitsExposure,
  );

  const profileEmotionDynamicPrompt = [
    `profile`,
    generateDynamicPrompt(candidatesToPrompts(profileEmotionCandidates)),
  ].join(`, `);
  const frontEmotionDynamicPrompt = generateDynamicPrompt(
    candidatesToPrompts(emotionCandidates),
  );

  return [
    `cowboy shot`,
    `looking at viewer`,
    charaTokens.join(`, `),
    frontHeadTokens.join(`, `),
    frontUpperBodyTokens.join(`, `),
    frontLowerBodyTokens.join(`, `),
    generateDynamicPrompt(candidatesToPrompts(convertedArmPoseCandidates)),
    generateDynamicPrompt([
      `1::${profileEmotionDynamicPrompt}`,
      `3::${frontEmotionDynamicPrompt}`,
    ]),
    generateDynamicPrompt(candidatesToPrompts(fromHorizontal)),
  ].join(`,\n`);
};

export const posePromptGenerators = [generateUpperBody, generateCowboyShot];
