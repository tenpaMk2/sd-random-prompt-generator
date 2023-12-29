import { CharaDefine } from "./chara-defines.mjs";
import {
  EmotionCandidate,
  ProfileEmotionCandidate,
  allBreastSizeTokens,
  allEmotionCandidates,
  allFrontHeadFeatureTokens,
  allFrontUpperOutfitTokens,
  allFrontLowerOutfitTokens,
  allNameTokens,
  allProfileEmotionCandidates,
  allBackUpperOutfitTokens,
  allBackHeadFeatureTokens,
  allBackLowerOutfitTokens,
  allSideUpperOutfitTokens,
  allSideLowerOutfitTokens,
  allLoraTokens,
} from "./defines.mjs";

const isSameCandidate = (a: readonly string[], b: readonly string[]) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export const parse = (def: CharaDefine) => {
  const charaTokens = [
    ...def.chara.filter(
      (x) =>
        allNameTokens.some((y) => y === x) ||
        allLoraTokens.some((y) => y === x),
    ),
  ] as const;

  const frontHeadTokens = [
    ...def.chara.filter((x) => allFrontHeadFeatureTokens.some((y) => y === x)),
  ] as const;

  const backHeadTokens = [
    ...def.chara.filter((x) => allBackHeadFeatureTokens.some((y) => y === x)),
  ] as const;

  const profileEmotionCandidates = [
    ...def.emotionCandidates.filter((x) =>
      allProfileEmotionCandidates.some((y) => isSameCandidate(x, y)),
    ),
  ] as ProfileEmotionCandidate[];

  const emotionCandidates = [
    ...def.emotionCandidates.filter((x) =>
      allEmotionCandidates.some((y) => isSameCandidate(x, y)),
    ),
  ] as EmotionCandidate[];

  return def.outfits.map(({ backgroundDefine, upperOutfit, lowerOutfit }) => {
    const frontUpperBodyTokens = [
      ...def.chara.filter((c) => allBreastSizeTokens.some((t) => t === c)),
      ...upperOutfit.filter((c) =>
        allFrontUpperOutfitTokens.some((t) => t === c),
      ),
    ] as const;

    const sideUpperBodyTokens = [
      ...def.chara.filter((c) => allBreastSizeTokens.some((t) => t === c)),
      ...upperOutfit.filter((c) =>
        allSideUpperOutfitTokens.some((t) => t === c),
      ),
    ] as const;

    const backUpperBodyTokens = [
      ...def.chara.filter((c) => allBreastSizeTokens.some((t) => t === c)),
      ...upperOutfit.filter((x) =>
        allBackUpperOutfitTokens.some((y) => y === x),
      ),
    ] as const;

    const frontLowerBodyTokens = [
      ...lowerOutfit.filter((c) =>
        allFrontLowerOutfitTokens.some((t) => t === c),
      ),
    ] as const;

    const sideLowerBodyTokens = [
      ...lowerOutfit.filter((c) =>
        allSideLowerOutfitTokens.some((t) => t === c),
      ),
    ] as const;

    const backLowerBodyTokens = [
      ...lowerOutfit.filter((x) =>
        allBackLowerOutfitTokens.some((y) => y === x),
      ),
    ] as const;

    const isArmpitsExposure = upperOutfit.some((t) => t === `armpits`);

    return {
      charaTokens,
      frontHeadTokens,
      backHeadTokens,
      frontUpperBodyTokens,
      sideUpperBodyTokens,
      backUpperBodyTokens,
      frontLowerBodyTokens,
      sideLowerBodyTokens,
      backLowerBodyTokens,
      isArmpitsExposure,
      profileEmotionCandidates,
      emotionCandidates,
      backgroundDefine,
    } as const;
  });
};

export type EachVisibleTokenInfo = ReturnType<typeof parse>[number];
