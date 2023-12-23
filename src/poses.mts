import { allArmPoseCandidates, armpitsVisibleTokens } from "./defines.mjs";
import { generateDynamicPrompt } from "./libs/utility.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";

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
  const convertedArmPoseCandidates = allArmPoseCandidates.map((candidate) => {
    // 脇が見えるポーズで、かつ、脇が見える服装なら、脇を見せる
    if (
      candidate.some((t) => armpitsVisibleTokens.some((avt) => avt === t)) &&
      isArmpitsExposure
    ) {
      return [...candidate, `armpits`];
    }
    return candidate;
  });

  const profileEmotionDynamicPrompt = [
    `profile`,
    generateDynamicPrompt(candidatesToPrompts(profileEmotionCandidates)),
  ].join(`, `);
  const frontEmotionDynamicPrompt = generateDynamicPrompt(
    candidatesToPrompts(emotionCandidates),
  );

  return [
    `upper body`,
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

export const posePromptGenerators = [generateUpperBody];
