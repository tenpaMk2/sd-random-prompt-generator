import { armPosePreset } from "./arm-pose-candidates.mjs";
import { backgroundPreset } from "./background-candidates.mjs";
import { EachVisibleTokenInfo } from "./parser.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { ArmPoseTag, armpitsVisibleTags } from "./tag-defines/arm-pose.mjs";
import { Visible } from "./tag-defines/visible.mjs";
import { Candidate, Candidates, TagLeaf, Token } from "./tag-tree.mjs";

const removeDuplicateTokens = (tokens: Token<Tag>[]) => [
  ...new Map(tokens.map((token) => [token.tag, token])).values(),
];

const getPersonCandidate = (
  personCandidateInfos: EachVisibleTokenInfo["personCandidateInfos"],
  parts: (keyof Visible | `removedShoesFoot`)[],
) => {
  const personCandidateArr = personCandidateInfos.map(
    ({ visibleTokens, removedShoesFootTokens, probability }) => {
      const all = {
        ...visibleTokens,
        removedShoesFoot: removedShoesFootTokens,
      };
      return new Candidate(
        removeDuplicateTokens(parts.map((part) => all[part]).flat()),
        { probability },
      );
    },
  );
  return new Candidates(personCandidateArr);
};

const makeArmPoseCombination = (
  personCandidates: Candidates<Tag>,
  armPoseCandidates: Candidates<ArmPoseTag>,
) => {
  const personAndArmPoseCandidates = Candidates.makeCombination([
    personCandidates,
    armPoseCandidates,
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

  return addedArmpitsCandidates;
};

const addLift = (personAndUpskirtCandidates: Candidates<Tag>) => {
  const added = personAndUpskirtCandidates.map((candidate) => {
    candidate.tokens.push(new Token<Tag>(`clothes lift`));
    if (candidate.tokens.some(({ tag }) => tag === `skirt`)) {
      candidate.tokens.push(new Token<Tag>(`skirt lift`));
    }
    if (candidate.tokens.some(({ tag }) => tag === `dress`)) {
      candidate.tokens.push(new Token<Tag>(`dress lift`));
    }
    return candidate;
  });
  return added;
};

const finilize = (independentCandidatesList: Candidates<Tag>[]) =>
  independentCandidatesList
    .map((candidates) => candidates.toString())
    .join(`, `);

type Generator = (info: EachVisibleTokenInfo) => {
  key: string;
  prompt: string;
};

const generateUpperBody: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  background: { fromHorizontalCandidates },
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `frontBreast`,
    `frontMidriff`,
  ]);

  const personAndArmpitsCandidates = makeArmPoseCombination(
    personCandidates,
    armPosePreset.all.toCandidates(),
  );

  const singleCandidates = new TagLeaf({
    tagEntries: [`upper body`, `looking at viewer`],
  }).toCandidates();

  const emotionCandidates = frontEmotionCandidates.concat(
    profileEmotionCandidates,
    0.3,
  );

  return {
    key: `upper-body`,
    prompt: finilize([
      personAndArmpitsCandidates,
      singleCandidates,
      emotionCandidates,
      fromHorizontalCandidates,
    ]),
  };
};

const generateCowboyShot: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  background: { fromHorizontalCandidates },
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `frontBreast`,
    `frontMidriff`,
    `frontHipAndThigh`,
  ]);

  const personAndArmpitsCandidates = makeArmPoseCombination(
    personCandidates,
    armPosePreset.all.toCandidates(),
  );

  const singleCandidates = new TagLeaf({
    tagEntries: [`cowboy shot`, `looking at viewer`],
  }).toCandidates();

  const emotionCandidates = frontEmotionCandidates.concat(
    profileEmotionCandidates,
    0.3,
  );

  return {
    key: `cowboy-shot`,
    prompt: finilize([
      personAndArmpitsCandidates,
      singleCandidates,
      emotionCandidates,
      fromHorizontalCandidates,
    ]),
  };
};

const generateAllFours: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  background: { cleanCandidates },
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `frontBreast`,
    `frontMidriff`,
    `frontHipAndThigh`,
    `foot`,
  ]);

  const personCandidatesWithHangingBreasts = personCandidates.map(
    (candidate) => {
      if (candidate.tokens.some(({ tag }) => tag === `cleavage`)) {
        candidate.tokens.push(new Token<Tag>(`hanging breasts`));
        return candidate;
      }
      return candidate;
    },
  );

  const singleCandidates = new TagLeaf({
    tagEntries: [`all fours`, `looking at viewer`, `breasts`],
  }).toCandidates();

  const emotionCandidates = frontEmotionCandidates.concat(
    profileEmotionCandidates,
    0.2,
  );

  return {
    key: `all-fours`,
    prompt: finilize([
      personCandidatesWithHangingBreasts,
      singleCandidates,
      emotionCandidates,
      cleanCandidates,
    ]),
  };
};

const generateAllFoursFromBehind: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  upskirtCandidates,
  background: { cleanCandidates },
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `backBreast`,
    `backMidriff`,
    `backHipAndThigh`,
    `foot`,
  ]);

  const singleCandidates = new TagLeaf({
    tagEntries: [
      `all fours`,
      `looking at viewer`,
      `from behind`,
      `looking back`,
      `ass`,
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

  return {
    key: `all-fours-from-behind`,
    prompt: finilize([
      personCandidates,
      singleCandidates,
      emotionCandidates,
      upskirtOnOffCandidates,
      cleanCandidates,
    ]),
  };
};

const generateAllFoursFromBehindOnBed: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
  profileEmotionCandidates,
  upskirtCandidates,
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `backBreast`,
    `backMidriff`,
    `backHipAndThigh`,
    `removedShoesFoot`,
  ]);

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

  return {
    key: `all-fours-from-behind-on-bed`,
    prompt: finilize([
      personCandidates,
      singleCandidates,
      emotionCandidates,
      upskirtOnOffCandidates,
      backgroundCandidates,
    ]),
  };
};

const generatePortraitLyingOnBed: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `frontBreast`,
  ]);

  const singleCandidates = new TagLeaf({
    tagEntries: [`portrait`, `lying`, `looking at viewer`, `on back`, `on bed`],
  }).toCandidates();

  const backgroundCandidates = new TagLeaf({
    tagEntries: [],
    children: [
      backgroundPreset.lyingTree.bedSheet,
      backgroundPreset.lyingTree.bedSheetPillow,
    ],
  }).toCandidates();

  return {
    key: `portrait-lying-on-on-bed`,
    prompt: finilize([
      personCandidates,
      singleCandidates,
      frontEmotionCandidates,
      backgroundCandidates,
    ]),
  };
};

const generateUpperBodyLyingOnBed: Generator = ({
  personCandidateInfos,
  frontEmotionCandidates,
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `frontBreast`,
    `frontMidriff`,
  ]);

  const singleCandidates = new TagLeaf({
    tagEntries: [
      `upper body`,
      `lying`,
      `looking at viewer`,
      `on back`,
      `on bed`,
    ],
  }).toCandidates();

  const backgroundCandidates = new TagLeaf({
    tagEntries: [],
    children: [
      backgroundPreset.lyingTree.bedSheet,
      backgroundPreset.lyingTree.bedSheetPillow,
    ],
  }).toCandidates();

  return {
    key: `upper-body-lying-on-on-bed`,
    prompt: finilize([
      personCandidates,
      singleCandidates,
      frontEmotionCandidates,
      backgroundCandidates,
    ]),
  };
};

const generateCowboyShotLyingOnBed: Generator = ({
  personCandidateInfos,
  upskirtCandidates,
  frontEmotionCandidates,
  profileEmotionCandidates,
}) => {
  const personCandidates = getPersonCandidate(personCandidateInfos, [
    `frontHead`,
    `frontBreast`,
    `frontMidriff`,
    `frontHipAndThigh`,
  ]);

  const personAndUpskirtCandidates = Candidates.makeCombination([
    personCandidates,
    upskirtCandidates,
  ]);

  const personUpskirtLegsCandidates = Candidates.makeCombination([
    addLift(personAndUpskirtCandidates),
    new TagLeaf({
      tagEntries: [],
      children: [
        new TagLeaf({ tagEntries: [`spread legs`] }),
        new TagLeaf({ tagEntries: [`legs up`] }),
      ],
    }).toCandidates(),
  ]);

  const singleCandidates = new TagLeaf({
    tagEntries: [
      `cowboy shot`,
      `lying`,
      `looking at viewer`,
      `on back`,
      `on bed`,
    ],
  }).toCandidates();

  const emotionCandidates = frontEmotionCandidates.concat(
    profileEmotionCandidates,
    0.2,
  );

  const backgroundCandidates = new TagLeaf({
    tagEntries: [],
    children: [
      backgroundPreset.lyingTree.bedSheet,
      backgroundPreset.lyingTree.bedSheetPillow,
    ],
  }).toCandidates();

  return {
    key: `cowboy-shot-lying-on-on-bed`,
    prompt: finilize([
      personUpskirtLegsCandidates,
      singleCandidates,
      emotionCandidates,
      backgroundCandidates,
    ]),
  };
};

export const posePromptGenerators = [
  generateUpperBody,
  generateCowboyShot,
  generateAllFours,
  generateAllFoursFromBehind,
  generateAllFoursFromBehindOnBed,
  generatePortraitLyingOnBed,
  generateUpperBodyLyingOnBed,
  generateCowboyShotLyingOnBed,
];
