import { CharaDefine } from "./chara-defines.mjs";
import {
  Candidate,
  FrontEmotionCandidate,
  PersonToken,
  ProfileEmotionCandidate,
  Visible,
  allFrontEmotionCandidates,
  allProfileEmotionCandidates,
  allTokenVisibilities,
} from "./token-defines.mjs";

const isSameCandidate = <T,>(a: Candidate<T>, b: Candidate<T>) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const filterByVisibility = (
  tokens: readonly PersonToken[],
  part: keyof Visible,
) => tokens.filter((token) => allTokenVisibilities[token][part]);

export const parse = (def: CharaDefine) =>
  def.situations.map(({ background, outfitAndExposure }) => {
    const charaTokens = [...def.chara, ...outfitAndExposure];

    const frontHeadTokens = filterByVisibility(charaTokens, `frontHead`);
    const sideHeadTokens = filterByVisibility(charaTokens, `sideHead`);
    const backHeadTokens = filterByVisibility(charaTokens, `backHead`);
    const frontPortraitTokens = filterByVisibility(
      charaTokens,
      `frontPortrait`,
    );
    const sidePortraitTokens = filterByVisibility(charaTokens, `sidePortrait`);
    const backPortraitTokens = filterByVisibility(charaTokens, `backPortrait`);
    const frontMidriffTokens = filterByVisibility(charaTokens, `frontMidriff`);
    const sideMidriffTokens = filterByVisibility(charaTokens, `sideMidriff`);
    const backMidriffTokens = filterByVisibility(charaTokens, `backMidriff`);
    const frontThighTokens = filterByVisibility(charaTokens, `frontThigh`);
    const sideThighTokens = filterByVisibility(charaTokens, `sideThigh`);
    const backThighTokens = filterByVisibility(charaTokens, `backThigh`);
    const footTokens = filterByVisibility(charaTokens, `foot`);
    const upskirtTokens = filterByVisibility(charaTokens, `upskirt`);

    const isArmpitsExposure = outfitAndExposure.some((t) => t === `armpits`);

    const frontEmotionCandidates = [
      ...def.emotionCandidates.filter((x) =>
        allFrontEmotionCandidates.some((y) => isSameCandidate(x, y)),
      ),
    ] as FrontEmotionCandidate[];
    const profileEmotionCandidates = [
      ...def.emotionCandidates.filter((x) =>
        allProfileEmotionCandidates.some((y) => isSameCandidate(x, y)),
      ),
    ] as ProfileEmotionCandidate[];

    return {
      frontHeadTokens,
      sideHeadTokens,
      backHeadTokens,
      frontPortraitTokens,
      sidePortraitTokens,
      backPortraitTokens,
      frontMidriffTokens,
      sideMidriffTokens,
      backMidriffTokens,
      frontThighTokens,
      sideThighTokens,
      backThighTokens,
      footTokens,
      upskirtTokens,
      profileEmotionCandidates,
      frontEmotionCandidates,
      isArmpitsExposure,
      background,
    } as const;
  });

export type EachVisibleTokenInfo = ReturnType<typeof parse>[number];
