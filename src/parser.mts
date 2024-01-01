import { CharaDefine } from "./chara-defines.mjs";
import { profileExcludeTags } from "./emotion-candidates.mjs";
import { getKeys } from "./libs/utility.mjs";
import { Tag } from "./tag-defines/all.mjs";
import {
  Visible,
  tagVisibilities,
  visibleType,
} from "./tag-defines/visible.mjs";
import { Candidates, TagLeaf, Token } from "./tag-tree.mjs";

const extractByVisibility = (tokens: Token<Tag>[]) => {
  const allParts = getKeys(visibleType.all);
  return allParts.reduce(
    (prev, part) => ({
      ...prev,
      [part]: tokens.filter(({ tag }) => tagVisibilities[tag][part]),
    }),
    {},
  ) as { [k in keyof Visible]: Token<Tag>[] };
};

export const parse = (def: CharaDefine) =>
  def.situations.map(
    ({
      key,
      background,
      outfitAndExposureTree,
      upskirtTree,
      whenRemoveShoes,
    }) => {
      const charaCandidates = Candidates.makeCombination([
        def.characterFeatureTree.toCandidates(),
        outfitAndExposureTree.toCandidates(),
      ]);

      const personCandidateInfos = charaCandidates.arr.map((candidate) => {
        const visibility = extractByVisibility(candidate.tokens);

        const excludedFootTokens = visibility.foot.filter(({ tag }) =>
          whenRemoveShoes.excludeTags.every((t) => t !== tag),
        );
        const removedShoesFootTokens = [
          ...excludedFootTokens,
          ...whenRemoveShoes.additionalFootTokensAfterRemoving,
        ];
        return {
          visibleTokens: visibility,
          removedShoesFootTokens,
          probability: candidate.probability,
        } as const;
      });

      const frontEmotionCandidates = def.emotionTree.toCandidates();
      const profileEmotionCandidates = Candidates.makeCombination([
        new TagLeaf({ tagEntries: [`profile`] }).toCandidates(),
        frontEmotionCandidates.filter((candidate) =>
          candidate.tokens.some(
            (token) => !profileExcludeTags.some((t) => t === token.tag),
          ),
        ),
      ]);

      const upskirtCandidates = Candidates.makeCombination([
        new TagLeaf({ tagEntries: [`upskirt`] }).toCandidates(),
        upskirtTree.toCandidates(),
      ]);

      return {
        key, // For filenames.
        personCandidateInfos,
        frontEmotionCandidates,
        profileEmotionCandidates,
        upskirtCandidates,
        background: {
          fromHorizontalCandidates:
            background.fromHorizontalTree.toCandidates(),
          fromBelowCandidates: background.fromBelowTree.toCandidates(),
          fromAboveCandidates: background.fromAboveTree.toCandidates(),
          lyingCandidates: background.lyingTree.toCandidates(),
          cleanCandidates: background.cleanTree.toCandidates(),
        },
      } as const;
    },
  );

export type EachVisibleTokenInfo = ReturnType<typeof parse>[number];
