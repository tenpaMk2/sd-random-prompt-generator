import { armPosePreset } from "./arm-pose-candidates.mjs";
import { backgroundPreset } from "./background-candidates.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { armpitsVisibleTags } from "./tag-defines/arm-pose.mjs";
import { Candidate, Candidates, TagLeaf, Token } from "./tag-tree.mjs";

type Generator = (info: EachVisibleTokenInfo) => {
  key: string;
  prompt: string;
};

export const removeDuplicateTokens = (tokens: Token<Tag>[]) => [
  ...new Map(tokens.map((token) => [token.tag, token])).values(),
];

const generateUpperBody: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  background: { fromHorizontalCandidates },
}) => {
  const personCandidateArr = personCandidateInfos.map(
    ({
      visibleTokens: { frontHead, frontBreast, frontMidriff },
      probability,
    }) => {
      const c = new Candidate(
        removeDuplicateTokens([...frontHead, ...frontBreast, ...frontMidriff]),
        { probability },
      );

      return c;
    },
  );
  const personCandidates = new Candidates(personCandidateArr);

  const armPoseWithoutArmpitsCandidates = armPosePreset.all.toCandidates();

  const personAndArmPoseCandidates = Candidates.makeCombination([
    personCandidates,
    armPoseWithoutArmpitsCandidates,
  ]);

  const addedArmpitsCandidates = personAndArmPoseCandidates.map((candidate) => {
    if (candidate.tokens.every(({ tag }) => tag !== `armpits`)) {
      return candidate;
    }
    if (
      candidate.tokens.some(({ tag }) =>
        armpitsVisibleTags.some((t) => t === tag),
      )
    ) {
      return candidate;
    }

    return candidate.filter((token) => token.tag !== `armpits`);
  });

  const singleCandidates = new TagLeaf({
    tagEntries: [`upper body`, `looking at viewer`],
  }).toCandidates();

  const frontCandidates = Candidates.makeCombination([
    singleCandidates,
    addedArmpitsCandidates,
    frontEmotionCandidates,
    fromHorizontalCandidates,
  ]);

  const profileCandidates = Candidates.makeCombination([
    singleCandidates,
    addedArmpitsCandidates,
    profileEmotionCandidates,
    fromHorizontalCandidates,
  ]);

  const all = frontCandidates.concat(profileCandidates, 0.3);

  return {
    key: `upper-body`,
    prompt: `${all}`,
  };
};

// const generateCowboyShot: Generator = ({
//   frontHeadTokens,
//   frontBreastTokens,
//   frontMidriffTokens,
//   frontHipAndThighTokens,
//   isArmpitsExposure,
//   frontEmotionTokens,
//   profileEmotionTokens,
//   backgroundTokens: { fromHorizontal },
// }) => {
//   const armPoseTokens = armposePreset.all;
//   const armPoseTokensWithArmPits = isArmpitsExposure
//     ? addArmpits(armPoseTokens)
//     : armPoseTokens;

//   return {
//     key: `cowboy-shot`,
//     prompt: (
//       [
//         ...removeDuplicateSingleTagToken<Tag>([
//           new s(`upper body`),
//           new s(`looking at viewer`),
//           ...frontHeadTokens,
//           ...frontBreastTokens,
//           ...frontMidriffTokens,
//           ...frontHipAndThighTokens,
//           ...armPoseTokensWithArmPits,
//           new d(`smile`, [
//             new c(profileEmotionTokens, {
//               multiplier: 1,
//             }),
//             new c(frontEmotionTokens, {
//               multiplier: 4,
//             }),
//           ]),
//         ]),
//         ...fromHorizontal,
//       ] satisfies Token<Tag>[]
//     ).join(`, `),
//   };
// };

// const generateAllFours: Generator = ({
//   frontHeadTokens,
//   frontBreastTokens,
//   frontMidriffTokens,
//   frontHipAndThighTokens,
//   footTokens,
//   frontEmotionTokens,
//   backgroundTokens: { clean },
// }) => {
//   return {
//     key: `all-fours`,
//     prompt: removeDuplicateSingleTagToken<Tag>([
//       new s(`all fours`),
//       new s(`breasts`),
//       new s(`looking at viewer`),
//       ...frontHeadTokens,
//       ...frontBreastTokens,
//       ...(frontBreastTokens.some(
//         (token) => token.representativeTag === `cleavage`,
//       )
//         ? [new s(`hanging breasts`)]
//         : []),
//       ...frontMidriffTokens,
//       ...frontHipAndThighTokens,
//       ...footTokens,
//       ...frontEmotionTokens,
//       ...clean,
//     ] satisfies Token<Tag>[]).join(`, `),
//   };
// };

// const generateAllFoursFromBehind: Generator = ({
//   frontHeadTokens,
//   backBreastTokens,
//   backMidriffTokens,
//   backHipAndThighTokens,
//   footTokens,
//   upskirtTokens,
//   frontEmotionTokens,
//   profileEmotionTokens,
//   backgroundTokens: { clean },
// }) => {
//   return {
//     key: `all-fours-from-behind`,
//     prompt: removeDuplicateSingleTagToken<Tag>([
//       new s(`all fours`),
//       new s(`looking at viewer`),
//       new s(`from behind`),
//       new s(`looking back`),
//       new s(`ass`),
//       ...frontHeadTokens,
//       ...backBreastTokens,
//       ...backMidriffTokens,
//       ...backHipAndThighTokens,
//       ...footTokens,
//       new d(`smile`, [
//         new c(profileEmotionTokens, {
//           multiplier: 1,
//         }),
//         new c(frontEmotionTokens, {
//           multiplier: 1,
//         }),
//       ]),
//       new d(`upskirt`, [
//         new c([]),
//         new c([new s(`upskirt`), ...upskirtTokens]),
//       ]),
//       ...clean,
//     ] satisfies Token<Tag>[]).join(`, `),
//   };
// };

const generateAllFoursFromBehindOnBed: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  upskirtCandidates,
}) => {
  const personCandidateArr = personCandidateInfos.map(
    ({
      visibleTokens: { frontHead, backBreast, backMidriff, backHipAndThigh },
      removedShoesFootTokens,
      probability,
    }) =>
      new Candidate(
        removeDuplicateTokens([
          ...frontHead,
          ...backBreast,
          ...backMidriff,
          ...backHipAndThigh,
          ...removedShoesFootTokens,
        ]),
        { probability },
      ),
  );
  const personCandidates = new Candidates(personCandidateArr);

  const singleCandidates = new TagLeaf({
    tagEntries: [
      `all fours`,
      `looking at viewer`,
      `from behind`,
      `looking back`,
      `ass`,
      `on bed`,
    ],
  }).toCandidates();

  const emotionCandidates = frontEmotionCandidates.concat(
    profileEmotionCandidates,
    0.5,
  );

  const upskirtOnOffCandidates = upskirtCandidates.concat(
    new TagLeaf({ tagEntries: [] }).toCandidates(),
    0.5,
  );

  const backgroundCandidates = new TagLeaf({
    tagEntries: [],
    children: [
      backgroundPreset.cleanTree.bedSheet,
      backgroundPreset.cleanTree.bedSheetWindow,
      backgroundPreset.cleanTree.bedSheetLamp,
      backgroundPreset.cleanTree.bedSheetPillow,
    ],
  }).toCandidates();

  const all = Candidates.makeCombination([
    personCandidates,
    singleCandidates,
    emotionCandidates,
    upskirtOnOffCandidates,
    backgroundCandidates,
  ]);

  return {
    key: `all-fours-from-behind-on-bed`,
    prompt: `${all}`,
  };
};

export const posePromptGenerators = [
  generateUpperBody,
  // generateCowboyShot,
  // generateAllFours,
  // generateAllFoursFromBehind,
  generateAllFoursFromBehindOnBed,
];
