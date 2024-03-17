import { OutfitDefine, UnderboobLevelOrder } from "../outfits/resolver.mjs";
import {
  PoseSpecialVisibility,
  PoseUnderboobLevelOrder,
} from "../poses/resolver.mjs";
import { GenerationDatas } from "../prepare.mjs";
import { Pattern, PatternCollection } from "../prompt-define.mjs";
import { Tag } from "../tag-defines/all.mjs";
import { BackgroundTag } from "../tag-defines/background.mjs";
import {
  BreastSizeOrder,
  BreastSizeTag,
  CharacterFeatureTag,
} from "../tag-defines/character-feature.mjs";
import { CharacterNameTag } from "../tag-defines/character-name.mjs";
import { EmotionTag } from "../tag-defines/emotion.mjs";
import {
  LoraCharacterTriggerWordsTag,
  LoraNameTag,
  LoraOutfitTriggerWordsTag,
} from "../tag-defines/lora.mjs";
import { OutfitAndExposureTag } from "../tag-defines/outfit-and-exposure.mjs";
import { PoseTag } from "../tag-defines/pose.mjs";
import { SeriesNameTag } from "../tag-defines/series-name.mjs";
import { SpecialTag } from "../tag-defines/special.mjs";
import {
  VisibilityKeys,
  tagVisibilities,
  visibilityKeys,
} from "../tag-defines/visibility.mjs";

const separateByVisibility = <
  T extends CharacterFeatureTag | OutfitAndExposureTag,
>(
  pattern: Pattern<T>,
) => {
  const filter = (tag: T, part: VisibilityKeys) => tagVisibilities[tag][part];

  const result = visibilityKeys.reduce(
    (prev, part) => ({
      ...prev,
      [part]: pattern.filter(({ tag }) => filter(tag, part)),
    }),
    {},
  ) as {
    [k in VisibilityKeys]: Pattern<T>;
  };
  return result;
};

const extractVisible = <T extends CharacterFeatureTag | OutfitAndExposureTag>(
  patternCollection: PatternCollection<T>,
  parts: VisibilityKeys[],
) => {
  const newPatterns = patternCollection.patterns.map((pattern) => {
    const v = separateByVisibility<T>(pattern);
    const specifiedPatterns = parts.map((part) => v[part]);
    const concattedPattern = specifiedPatterns.reduce(
      (previous, current) => previous.concat(current.tokens),
      new Pattern<T>({
        tokens: [],
        probability: pattern.probability,
      }),
    );

    return concattedPattern;
  });

  return new PatternCollection<T>(newPatterns);
};

const generateSpecialVisibilityPatternCollection = (
  outfit: OutfitDefine["specialVisibility"],
  pose: PoseSpecialVisibility,
  {
    breastSize,
    upskirtPatternCollection,
    emotionPatternCollection,
    backgroundPatternCollection,
    visibleFeaturePatternCollection,
    visibleOutfitPatternCollection,
  }: {
    breastSize: BreastSizeTag;
    upskirtPatternCollection: PatternCollection<OutfitAndExposureTag>;
    emotionPatternCollection: PatternCollection<EmotionTag | SpecialTag>;
    backgroundPatternCollection: PatternCollection<BackgroundTag>;
    visibleFeaturePatternCollection: PatternCollection<CharacterFeatureTag>;
    visibleOutfitPatternCollection: PatternCollection<OutfitAndExposureTag>;
  },
) => {
  const pcs = [] as PatternCollection<Tag>[];
  const pushSpecial = (tag: SpecialTag) =>
    pcs.push(PatternCollection.create<SpecialTag>([tag]));

  if (outfit.armpits && pose.armpits) {
    pushSpecial(`armpits`);
  }
  if (
    outfit.hangingBreasts &&
    pose.hangingBreasts &&
    BreastSizeOrder["medium breasts"] <= BreastSizeOrder[breastSize]
  ) {
    pushSpecial(`hanging breasts`);
  }
  if (
    outfit.cleavage &&
    pose.cleavage &&
    BreastSizeOrder["medium breasts"] <= BreastSizeOrder[breastSize]
  ) {
    pushSpecial(`cleavage`);
  }
  if (
    outfit.sideboob &&
    pose.sideboob &&
    BreastSizeOrder["small breasts"] <= BreastSizeOrder[breastSize]
  ) {
    pushSpecial(`sideboob`);
  }
  if (
    outfit.backboob &&
    pose.backboob &&
    BreastSizeOrder["small breasts"] <= BreastSizeOrder[breastSize]
  ) {
    pushSpecial(`backboob`);
  }
  if (
    PoseUnderboobLevelOrder[pose.underboobLevel] <
    UnderboobLevelOrder[outfit.underboobLevel]
  ) {
    pushSpecial(`underboob`);
  }
  if (outfit.zettaiRyouiki && pose.zettaiRyouiki) {
    pushSpecial(`zettai ryouiki`);
  }
  if (outfit.insideOfThighs && pose.insideOfThighs) {
    pushSpecial(`ass visible through thighs`);
    pushSpecial(`thigh gap`);
  }

  if (pose.upskirt) {
    pushSpecial(`upskirt`);

    const pantyshotAdded = upskirtPatternCollection.combineIf<SpecialTag>(
      (p) =>
        p.tokens.some(
          ({ tag }) => tag === `panties` || tag === `panties under pantyhose`,
        ),
      PatternCollection.create<SpecialTag>([`pantyshot`]),
    );
    pcs.push(pantyshotAdded);
  }

  return PatternCollection.combine(pcs);
};

const resolve = (
  rootData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
  outfitData: GenerationDatas[number]["characters"][number]["outfits"][number],
  backgroundData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number],
  poseData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number]["poses"][number],
) => {
  const loraCharacter = PatternCollection.createLora(
    characterData.character.lora,
  );
  const loraCharacterTriggerWord =
    PatternCollection.create<LoraCharacterTriggerWordsTag>(
      characterData.character.loraCharacterTriggerWordEntries,
    );
  const seriesName = PatternCollection.create<SeriesNameTag>(
    characterData.character.seriesNameEntries,
  );
  const characterName = PatternCollection.create<CharacterNameTag>(
    characterData.character.characterNameEntries,
  );
  const characterFeature = PatternCollection.create<CharacterFeatureTag>(
    characterData.character.characterFeatureEntries,
  );
  const breastSize = PatternCollection.create<BreastSizeTag>([
    characterData.character.breastSize,
  ]);
  const rawEmotion = PatternCollection.create<EmotionTag>(
    characterData.character.emotionEntries,
  );
  const emotion = rawEmotion.combineIf<SpecialTag>(
    (p) =>
      p.tokens.some(
        ({ tag }) => tag === `open mouth` && characterData.character.fang,
      ),
    PatternCollection.create<SpecialTag>([`fang`]),
  );

  const loraOutfit = PatternCollection.createLora(
    outfitData.outfit.lora ?? null,
  );
  const loraOutfitTriggerWord =
    PatternCollection.create<LoraOutfitTriggerWordsTag>(
      outfitData.outfit.loraOutfitTriggerWordEntries,
    );
  const outfitAndExposure = PatternCollection.create<OutfitAndExposureTag>(
    outfitData.outfit.outfitAndExposureEntries,
  );
  const upskirt = PatternCollection.create<OutfitAndExposureTag>(
    outfitData.outfit.upskirtEntries,
  );

  const background = PatternCollection.create<BackgroundTag>(
    backgroundData.background.entries,
  );

  const pose = PatternCollection.create<PoseTag>(poseData.pose.entries);
  const poseVisibility = visibilityKeys.filter(
    (key) => poseData.pose.visibility[key],
  );

  const visibleFeatures = extractVisible<CharacterFeatureTag>(
    characterFeature,
    poseVisibility,
  );
  const visibleOutfits = extractVisible<OutfitAndExposureTag>(
    outfitAndExposure,
    poseVisibility,
  );

  const specialVisibility = generateSpecialVisibilityPatternCollection(
    outfitData.outfit.specialVisibility,
    poseData.pose.specialVisibility,
    {
      breastSize: characterData.character.breastSize,
      upskirtPatternCollection: upskirt,
      emotionPatternCollection: emotion,
      backgroundPatternCollection: background,
      visibleFeaturePatternCollection: visibleFeatures,
      visibleOutfitPatternCollection: visibleOutfits,
    },
  );

  return PatternCollection.combine<Tag | LoraNameTag>([
    seriesName,
    characterName,
    loraCharacter,
    loraCharacterTriggerWord,
    visibleFeatures,
    breastSize,
    emotion,
    loraOutfit,
    loraOutfitTriggerWord,
    visibleOutfits,
    specialVisibility,
    background,
    pose,
  ]);
};

const generatePosePatternCollection = (
  generationData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
  outfitData: GenerationDatas[number]["characters"][number]["outfits"][number],
  backgroundData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number],
  poseData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number]["poses"][number],
) => ({
  key: poseData.key,
  probability: poseData.probability,
  patternCollection: resolve(
    generationData,
    characterData,
    outfitData,
    backgroundData,
    poseData,
  ),
  children: [],
});

const generateBackgroundPatternCollection = (
  generationData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
  outfitData: GenerationDatas[number]["characters"][number]["outfits"][number],
  backgroundData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number],
) => {
  const poses = backgroundData.poses.map((pose) =>
    generatePosePatternCollection(
      generationData,
      characterData,
      outfitData,
      backgroundData,
      pose,
    ),
  );

  const backgroundPatternCollection = PatternCollection.joinAll(
    poses.map(({ patternCollection, probability }) => ({
      patternCollection,
      probability,
    })),
  );

  return {
    key: backgroundData.key,
    probability: backgroundData.probability,
    patternCollection: backgroundPatternCollection,
    children: poses,
  };
};

const generateOutfitPatternCollection = (
  generationData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
  outfitData: GenerationDatas[number]["characters"][number]["outfits"][number],
) => {
  const backgrounds = outfitData.backgrounds.map((backgroundData) =>
    generateBackgroundPatternCollection(
      generationData,
      characterData,
      outfitData,
      backgroundData,
    ),
  );

  const outfitPatternCollection = PatternCollection.joinAll(
    backgrounds.map(({ patternCollection, probability }) => ({
      patternCollection,
      probability,
    })),
  );

  return {
    key: outfitData.key,
    probability: outfitData.probability,
    patternCollection: outfitPatternCollection,
    children: backgrounds,
  };
};

const generateCharacterPatternCollection = (
  generationData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
) => {
  const outfits = characterData.outfits.map((outfitData) =>
    generateOutfitPatternCollection(generationData, characterData, outfitData),
  );

  const characterPatternCollection = PatternCollection.joinAll(
    outfits.map(({ patternCollection, probability }) => ({
      patternCollection,
      probability,
    })),
  );

  return {
    key: characterData.key,
    probability: characterData.probability,
    patternCollection: characterPatternCollection,
    children: outfits,
  };
};

const generateRootPatternCollection = (
  generationData: GenerationDatas[number],
) => {
  const characters = generationData.characters.map((characterData) =>
    generateCharacterPatternCollection(generationData, characterData),
  );

  const rootPatternCollection = PatternCollection.joinAll(
    characters.map(({ patternCollection, probability: weight }) => ({
      patternCollection,
      probability: weight,
    })),
  );

  return {
    key: generationData.key,
    probability: generationData.probability,
    fixedPrompt: generationData.fixedPrompt,
    optionsBodyJson: generationData.optionsBodyJson,
    txt2imgBodyJson: generationData.txt2imgBodyJson,
    patternCollection: rootPatternCollection,
    children: characters,
  };
};

export const generatePatterns = (generationDatas: GenerationDatas) =>
  generationDatas.map(generateRootPatternCollection);
