import { CharaDefine } from "./chara-defines.mjs";
import { profileExcludeTags } from "./emotion-candidates.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";
import { Visible, tagVisibilities } from "./tag-defines/visible.mjs";
import { SingleTagToken, Token, isSingleTagToken } from "./token.mjs";

const filterByVisibility = (
  tokens: readonly Token<Tag>[],
  part: keyof Visible,
) => tokens.filter((token) => tagVisibilities[token.representativeTag][part]);

export const parse = (def: CharaDefine) =>
  def.situations.map(
    ({
      key,
      backgroundTokens: background,
      outfitAndExposureTokens: outfitAndExposures,
    }) => {
      const charaTokens = [
        ...def.characterFeatureTokens,
        ...outfitAndExposures,
      ] satisfies Token<Tag>[];

      const frontHeadTokens = filterByVisibility(charaTokens, `frontHead`);
      const sideHeadTokens = filterByVisibility(charaTokens, `sideHead`);
      const backHeadTokens = filterByVisibility(charaTokens, `backHead`);
      const frontPortraitTokens = filterByVisibility(
        charaTokens,
        `frontPortrait`,
      );
      const sidePortraitTokens = filterByVisibility(
        charaTokens,
        `sidePortrait`,
      );
      const backPortraitTokens = filterByVisibility(
        charaTokens,
        `backPortrait`,
      );
      const frontMidriffTokens = filterByVisibility(
        charaTokens,
        `frontMidriff`,
      );
      const sideMidriffTokens = filterByVisibility(charaTokens, `sideMidriff`);
      const backMidriffTokens = filterByVisibility(charaTokens, `backMidriff`);
      const frontThighTokens = filterByVisibility(charaTokens, `frontThigh`);
      const sideThighTokens = filterByVisibility(charaTokens, `sideThigh`);
      const backThighTokens = filterByVisibility(charaTokens, `backThigh`);
      const footTokens = filterByVisibility(charaTokens, `foot`);
      const upskirtTokens = filterByVisibility(charaTokens, `upskirt`);

      const isArmpitsExposure = outfitAndExposures.some(
        (token) => token.representativeTag === `armpits`,
      );

      const frontEmotionTokens =
        def.emotionTokens satisfies readonly Token<Tag>[];
      const profileEmotionTokens = [
        ...def.emotionTokens.map((token) => {
          if (isSingleTagToken(token)) {
            return token;
          } else {
            return token.createExcluded(profileExcludeTags);
          }
        }),
        new SingleTagToken<EmotionTag>(`profile`),
      ] satisfies Token<Tag>[];

      return {
        key, // For filenames.
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
        frontEmotionTokens,
        profileEmotionTokens,
        isArmpitsExposure,
        background,
      } as const;
    },
  );

export type EachVisibleTokenInfo = ReturnType<typeof parse>[number];
