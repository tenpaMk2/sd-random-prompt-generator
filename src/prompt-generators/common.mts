import { OutfitDefine, UnderboobLevelOrder } from "../outfits/resolver.mjs";
import {
  PoseSpecialVisibility,
  PoseUnderboobLevelOrder,
} from "../poses/resolver.mjs";
import { GenerationDatas } from "../prepare.mjs";
import { Pattern, PatternCollection, PromptDefine } from "../prompt-define.mjs";
import { Tag } from "../tag-defines/all.mjs";
import { BackgroundTag } from "../tag-defines/background.mjs";
import {
  BreastSizeTag,
  CharacterFeatureTag,
} from "../tag-defines/character-feature.mjs";
import { CharacterNameTag } from "../tag-defines/character-name.mjs";
import { EmotionTag } from "../tag-defines/emotion.mjs";
import {
  LoraCharacterTriggerWordsTag,
  LoraNameTag,
  LoraOutfitTriggerWordsTag,
  isLoraNameTag,
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
  const filter = (tag: T | LoraNameTag, part: VisibilityKeys) => {
    if (isLoraNameTag(tag)) {
      return true;
    } else {
      return tagVisibilities[tag][part];
    }
  };

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
      (previous, current) => previous.concat(current.simpleTokens),
      new Pattern<T>({
        simpleTokens: [],
        probability: pattern.probability,
      }),
    );

    return concattedPattern;
  });

  return new PatternCollection<T>(newPatterns);
};

const generatePatternCollection = <T extends Tag>(
  entries: ConstructorParameters<typeof PromptDefine<T>>[0],
) => new PromptDefine<T>(entries).convertToPatternCollection();

const generateSpecialVisibilityPatternCollection = (
  outfit: OutfitDefine["specialVisibility"],
  pose: PoseSpecialVisibility,
) => {
  const entries = [] as SpecialTag[];

  if (outfit.armpits && pose.armpits) {
    entries.push(`armpits`);
  }
  if (outfit.hangingBreasts && pose.hangingBreasts) {
    entries.push(`hanging breasts`);
  }
  if (outfit.cleavage && pose.cleavage) {
    entries.push(`cleavage`);
  }
  if (outfit.sideboob && pose.sideboob) {
    entries.push(`sideboob`);
  }
  if (outfit.backboob && pose.backboob) {
    entries.push(`backboob`);
  }
  if (
    PoseUnderboobLevelOrder[pose.underboobLevel] <
    UnderboobLevelOrder[outfit.underboobLevel]
  ) {
    entries.push(`underboob`);
  }
  if (outfit.zettaiRyouiki && pose.zettaiRyouiki) {
    entries.push(`zettai ryouiki`);
  }
  if (outfit.insideOfThighs && pose.insideOfThighs) {
    entries.push(`ass visible through thighs`);
    entries.push(`thigh gap`);
  }

  return generatePatternCollection(entries);
};

const resolve = (
  rootData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
  outfitData: GenerationDatas[number]["characters"][number]["outfits"][number],
  backgroundData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number],
  poseData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number]["poses"][number],
) => {
  const loraCharacter = generatePatternCollection(characterData.character.lora);
  const loraCharacterTriggerWord =
    generatePatternCollection<LoraCharacterTriggerWordsTag>(
      characterData.character.loraCharacterTriggerWordEntries,
    );
  const seriesName = generatePatternCollection<SeriesNameTag>(
    characterData.character.seriesNameEntries,
  );
  const characterName = generatePatternCollection<CharacterNameTag>(
    characterData.character.characterNameEntries,
  );
  const characterFeature = generatePatternCollection<CharacterFeatureTag>(
    characterData.character.characterFeatureEntries,
  );
  const breastSize = generatePatternCollection<BreastSizeTag>([
    characterData.character.breastSize,
  ]);
  const emotion = generatePatternCollection<EmotionTag>(
    characterData.character.emotionEntries,
  );

  const loraOutfit = generatePatternCollection(outfitData.outfit.lora ?? []);
  const loraOutfitTriggerWord =
    generatePatternCollection<LoraOutfitTriggerWordsTag>(
      outfitData.outfit.loraOutfitTriggerWordEntries,
    );
  const outfitAndExposure = generatePatternCollection<OutfitAndExposureTag>(
    outfitData.outfit.outfitAndExposureEntries,
  );

  const background = generatePatternCollection<BackgroundTag>(
    backgroundData.background.entries,
  );

  const pose = generatePatternCollection<PoseTag>(poseData.pose.entries);
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
  );

  return PatternCollection.makeCombination<Tag>([
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
  weight: poseData.weight,
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
    poses.map(({ patternCollection, weight }) => ({
      patternCollection,
      weight,
    })),
  );

  return {
    key: backgroundData.key,
    weight: backgroundData.weight,
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
    backgrounds.map(({ patternCollection, weight }) => ({
      patternCollection,
      weight,
    })),
  );

  return {
    key: outfitData.key,
    weight: outfitData.weight,
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
    outfits.map(({ patternCollection, weight }) => ({
      patternCollection,
      weight,
    })),
  );

  return {
    key: characterData.key,
    weight: characterData.weight,
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
    characters.map(({ patternCollection, weight }) => ({
      patternCollection,
      weight,
    })),
  );

  return {
    key: generationData.key,
    weight: generationData.weight,
    fixedPrompt: generationData.fixedPrompt,
    optionsBodyJson: generationData.optionsBodyJson,
    txt2imgBodyJson: generationData.txt2imgBodyJson,
    patternCollection: rootPatternCollection,
    children: characters,
  };
};

export const generatePatterns = (generationDatas: GenerationDatas) =>
  generationDatas.map(generateRootPatternCollection);
