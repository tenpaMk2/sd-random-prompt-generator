import { armposePreset } from "./arm-pose-candidates.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { ArmPoseTag, armpitsVisibleTags } from "./tag-defines/arm-pose.mjs";
import {
  DynamicCandidate,
  DynamicPrompt,
  SingleTagToken,
  Token,
  isSingleTagToken,
  removeDuplicateSingleTagToken,
} from "./token.mjs";

const s = SingleTagToken<Tag>;
const c = DynamicCandidate<Tag>;
const d = DynamicPrompt<Tag>;

const addArmpits = (tokens: readonly Token<ArmPoseTag>[]) =>
  tokens
    .map((token) => {
      if (isSingleTagToken<ArmPoseTag>(token)) {
        if (armpitsVisibleTags.some((t) => t === token.tag)) {
          return [token, new SingleTagToken<ArmPoseTag>(`armpits`)];
        }
        return token;
      } else {
        token.addTokenTo(
          new SingleTagToken<ArmPoseTag>(`armpits`),
          armpitsVisibleTags,
        );
        return token;
      }
    })
    .flat();

type Generator = (info: EachVisibleTokenInfo) => {
  key: string;
  prompt: string;
};

const generateUpperBody: Generator = ({
  frontHeadTokens,
  frontPortraitTokens,
  frontMidriffTokens,
  isArmpitsExposure,
  frontEmotionTokens,
  profileEmotionTokens,
  background: { fromHorizontal },
}) => {
  const armPoseTokens = armposePreset.all;
  const armPoseTokensWithArmPits = isArmpitsExposure
    ? addArmpits(armPoseTokens)
    : armPoseTokens;

  return {
    key: `upper-body`,
    prompt: (
      [
        ...removeDuplicateSingleTagToken<Tag>([
          new s(`upper body`),
          new s(`looking at viewer`),
          ...frontHeadTokens,
          ...frontPortraitTokens,
          ...frontMidriffTokens,
          ...armPoseTokensWithArmPits,
          new d(`smile`, [
            new c(profileEmotionTokens, {
              multiplier: 1,
            }),
            new c(frontEmotionTokens, {
              multiplier: 4,
            }),
          ]),
        ]),
        ...fromHorizontal,
      ] satisfies Token<Tag>[]
    ).join(`, `),
  };
};

const generateCowboyShot: Generator = ({
  frontHeadTokens,
  frontPortraitTokens,
  frontMidriffTokens,
  frontThighTokens,
  isArmpitsExposure,
  frontEmotionTokens,
  profileEmotionTokens,
  background: { fromHorizontal },
}) => {
  const armPoseTokens = armposePreset.all;
  const armPoseTokensWithArmPits = isArmpitsExposure
    ? addArmpits(armPoseTokens)
    : armPoseTokens;

  return {
    key: `cowboy-shot`,
    prompt: (
      [
        ...removeDuplicateSingleTagToken<Tag>([
          new s(`upper body`),
          new s(`looking at viewer`),
          ...frontHeadTokens,
          ...frontPortraitTokens,
          ...frontMidriffTokens,
          ...frontThighTokens,
          ...armPoseTokensWithArmPits,
          new d(`smile`, [
            new c(profileEmotionTokens, {
              multiplier: 1,
            }),
            new c(frontEmotionTokens, {
              multiplier: 4,
            }),
          ]),
        ]),
        ...fromHorizontal,
      ] satisfies Token<Tag>[]
    ).join(`, `),
  };
};

const generateAllFours: Generator = ({
  frontHeadTokens,
  frontPortraitTokens,
  frontMidriffTokens,
  frontThighTokens,
  footTokens,
  frontEmotionTokens,
  background: { clean },
}) => {
  return {
    key: `all-fours`,
    prompt: removeDuplicateSingleTagToken<Tag>([
      new s(`all fours`),
      new s(`breasts`),
      new s(`looking at viewer`),
      ...frontHeadTokens,
      ...frontPortraitTokens,
      ...(frontPortraitTokens.some(
        (token) => token.representativeTag === `cleavage`,
      )
        ? [new s(`hanging breasts`)]
        : []),
      ...frontMidriffTokens,
      ...frontThighTokens,
      ...footTokens,
      ...frontEmotionTokens,
      ...clean,
    ] satisfies Token<Tag>[]).join(`, `),
  };
};

const generateAllFoursFromBehind: Generator = ({
  frontHeadTokens,
  backPortraitTokens,
  backMidriffTokens,
  backThighTokens,
  footTokens,
  frontEmotionTokens,
  profileEmotionTokens,
  background: { clean },
}) => {
  return {
    key: `all-fours-from-behind`,
    prompt: removeDuplicateSingleTagToken<Tag>([
      new s(`all fours`),
      new s(`looking at viewer`),
      new s(`from behind`),
      new s(`looking back`),
      new s(`ass`),
      ...frontHeadTokens,
      ...backPortraitTokens,
      ...backMidriffTokens,
      ...backThighTokens,
      ...footTokens,
      new d(`smile`, [
        new c(profileEmotionTokens, {
          multiplier: 1,
        }),
        new c(frontEmotionTokens, {
          multiplier: 1,
        }),
      ]),
      ...clean,
    ] satisfies Token<Tag>[]).join(`, `),
  };
};

export const posePromptGenerators = [
  generateUpperBody,
  generateCowboyShot,
  generateAllFours,
  generateAllFoursFromBehind,
];
