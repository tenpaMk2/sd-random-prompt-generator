import { armposePreset } from "./arm-pose-candidates.mjs";
import { backgroundCandidates } from "./background-candidates.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { ArmPoseTag, armpitsVisibleTags } from "./tag-defines/arm-pose.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";
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
  frontBreastTokens,
  frontMidriffTokens,
  isArmpitsExposure,
  frontEmotionTokens,
  profileEmotionTokens,
  backgroundTokens: { fromHorizontal },
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
          ...frontBreastTokens,
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
  frontBreastTokens,
  frontMidriffTokens,
  frontHipAndThighTokens,
  isArmpitsExposure,
  frontEmotionTokens,
  profileEmotionTokens,
  backgroundTokens: { fromHorizontal },
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
          ...frontBreastTokens,
          ...frontMidriffTokens,
          ...frontHipAndThighTokens,
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
  frontBreastTokens,
  frontMidriffTokens,
  frontHipAndThighTokens,
  footTokens,
  frontEmotionTokens,
  backgroundTokens: { clean },
}) => {
  return {
    key: `all-fours`,
    prompt: removeDuplicateSingleTagToken<Tag>([
      new s(`all fours`),
      new s(`breasts`),
      new s(`looking at viewer`),
      ...frontHeadTokens,
      ...frontBreastTokens,
      ...(frontBreastTokens.some(
        (token) => token.representativeTag === `cleavage`,
      )
        ? [new s(`hanging breasts`)]
        : []),
      ...frontMidriffTokens,
      ...frontHipAndThighTokens,
      ...footTokens,
      ...frontEmotionTokens,
      ...clean,
    ] satisfies Token<Tag>[]).join(`, `),
  };
};

const generateAllFoursFromBehind: Generator = ({
  frontHeadTokens,
  backBreastTokens,
  backMidriffTokens,
  backHipAndThighTokens,
  footTokens,
  upskirtTokens,
  frontEmotionTokens,
  profileEmotionTokens,
  backgroundTokens: { clean },
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
      ...backBreastTokens,
      ...backMidriffTokens,
      ...backHipAndThighTokens,
      ...footTokens,
      new d(`smile`, [
        new c(profileEmotionTokens, {
          multiplier: 1,
        }),
        new c(frontEmotionTokens, {
          multiplier: 1,
        }),
      ]),
      new d(`upskirt`, [
        new c([]),
        new c([new s(`upskirt`), ...upskirtTokens]),
      ]),
      ...clean,
    ] satisfies Token<Tag>[]).join(`, `),
  };
};

const generateAllFoursFromBehindOnBed: Generator = ({
  frontHeadTokens,
  backBreastTokens,
  backMidriffTokens,
  backHipAndThighTokens,
  removedShoesFootTokens,
  upskirtTokens,
  frontEmotionTokens,
  profileEmotionTokens,
}) => {
  return {
    key: `all-fours-from-behind-on-bed`,
    prompt: removeDuplicateSingleTagToken<Tag>([
      new s(`all fours`),
      new s(`looking at viewer`),
      new s(`from behind`),
      new s(`looking back`),
      new s(`ass`),
      ...frontHeadTokens,
      ...backBreastTokens,
      ...backMidriffTokens,
      ...backHipAndThighTokens,
      ...removedShoesFootTokens,
      new d(`smile`, [
        new c(profileEmotionTokens, {
          multiplier: 1,
        }),
        new c(frontEmotionTokens, {
          multiplier: 1,
        }),
      ]),
      new d(`upskirt`, [
        new c([]),
        new c([new s(`upskirt`), ...upskirtTokens]),
      ]),
      new s(`on bed`),
      new d(`indoors`, [
        backgroundCandidates.clean.bedSheet,
        backgroundCandidates.clean.bedSheetWindow,
        backgroundCandidates.clean.bedSheetLamp,
        backgroundCandidates.clean.bedSheetPillow,
      ]),
    ] satisfies Token<Tag>[]).join(`, `),
  };
};

export const posePromptGenerators = [
  generateUpperBody,
  generateCowboyShot,
  generateAllFours,
  generateAllFoursFromBehind,
  generateAllFoursFromBehindOnBed,
];
