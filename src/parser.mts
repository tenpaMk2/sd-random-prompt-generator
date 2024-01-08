import { CharaDefine } from "./characters.mjs";
import { getKeys } from "./libs/utility.mjs";
import { Pattern, PatternCollection, PromptDefine } from "./prompt-define.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { profileExcludeTags } from "./tag-defines/emotion.mjs";
import {
  Visible,
  tagVisibilities,
  visibleType,
} from "./tag-defines/visible.mjs";

const extractByVisibility = (pattern: Pattern<Tag>) => {
  const allParts = getKeys(visibleType.all);
  const o = allParts.reduce(
    (prev, part) => ({
      ...prev,
      [part]: pattern.filter(({ tag }) => tagVisibilities[tag][part]),
    }),
    {},
  ) as { [k in keyof Visible]: Pattern<Tag> };
  return { ...o } as const;
};

export const parse = (def: CharaDefine) =>
  def.situations.map(
    ({
      key,
      background,
      outfitAndExposure,
      isArmpitsVisible,
      liftType,
      upskirt,
      whenRemoveShoes,
    }) => {
      const charaPatternCollection = PatternCollection.makeCombination([
        def.characterFeature.convertToPatternCollection(),
        outfitAndExposure.convertToPatternCollection(),
      ]);

      const personInfoPatterns = charaPatternCollection.patterns.map(
        (pattern) => {
          const visibility = extractByVisibility(pattern);

          const excludedFootPattern = whenRemoveShoes
            ? visibility.foot.filter(({ tag }) =>
                whenRemoveShoes.excludeTags.every((t) => t !== tag),
              )
            : visibility.foot;

          const removedShoesFootPattern = excludedFootPattern.concat(
            whenRemoveShoes?.additionalFootTokensAfterRemoving ?? [],
          );
          return {
            visibility,
            removedShoesFootPattern,
            probability: pattern.probability,
          } as const;
        },
      );

      const frontEmotionPatternCollection =
        def.emotion.convertToPatternCollection();
      const profileEmotionPatternCollection = PatternCollection.makeCombination(
        [
          new PromptDefine([`profile`]).convertToPatternCollection(),
          frontEmotionPatternCollection.filter(({ simpleTokens }) =>
            simpleTokens.some(({ tag }) =>
              profileExcludeTags.every((t) => t !== tag),
            ),
          ),
        ],
      );

      const upskirtPatternCollection = upskirt
        ? PatternCollection.makeCombination([
            new PromptDefine([`upskirt`]).convertToPatternCollection(),
            upskirt.convertToPatternCollection(),
          ])
        : new PromptDefine([]).convertToPatternCollection();

      // TODO: Validate whether there are `cleavage` and `small breasts` at the same time.

      return {
        key, // For filenames.
        loraToken: def.lora ?? ``,
        personInfoPatterns,
        isArmpitsVisible,
        liftType: liftType ?? `none`,
        frontEmotionPatternCollection,
        profileEmotionPatternCollection,
        upskirtPatternCollection,
        background: {
          fromHorizontalPatternCollection:
            background.fromHorizontal.convertToPatternCollection(),
          fromBelowPatternCollection:
            background.fromBelow.convertToPatternCollection(),
          fromAbovePatternCollection:
            background.fromAbove.convertToPatternCollection(),
          lyingPatternCollection: background.lying.convertToPatternCollection(),
          cleanPatternCollection: background.clean.convertToPatternCollection(),
        },
      } as const;
    },
  );

export type EachVisibleTokenInfo = ReturnType<typeof parse>[number];
