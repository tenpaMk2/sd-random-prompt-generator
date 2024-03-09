import { GenerationDatas } from "./prepare.mjs";
import { PatternCollection, PromptDefine } from "./prompt-define.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";
import { CharacterFeatureTag } from "./tag-defines/character-feature.mjs";
import { LoraOutfitTriggerWordsTag } from "./tag-defines/lora.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";
import { PoseTag } from "./tag-defines/pose.mjs";

const resolve = (
  rootData: GenerationDatas[number],
  characterData: GenerationDatas[number]["characters"][number],
  outfitData: GenerationDatas[number]["characters"][number]["outfits"][number],
  backgroundData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number],
  poseData: GenerationDatas[number]["characters"][number]["outfits"][number]["backgrounds"][number]["poses"][number],
) => {
  const rootKey = rootData.key;

  const characterKey = characterData.key;
  const characterFeaturePatternCollection =
    new PromptDefine<CharacterFeatureTag>(
      characterData.character.characterFeatureEntries,
    ).convertToPatternCollection();

  const outfitKey = outfitData.key;
  const loraOutfitTriggerWordPatternCollection =
    new PromptDefine<LoraOutfitTriggerWordsTag>(
      outfitData.outfit.loraOutfitTriggerWordEntries ?? [],
    ).convertToPatternCollection();
  const outfitAndExposurePatternCollection =
    new PromptDefine<OutfitAndExposureTag>(
      outfitData.outfit.outfitAndExposureEntries,
    ).convertToPatternCollection();

  const backgroundKey = backgroundData.key;
  const backgroundPatternCollection = new PromptDefine<BackgroundTag>(
    backgroundData.background.entries,
  ).convertToPatternCollection();

  const poseKey = poseData.key;
  const posePatternCollection = new PromptDefine<PoseTag>(
    poseData.pose.entries,
  ).convertToPatternCollection();

  return PatternCollection.makeCombination<Tag>([
    characterFeaturePatternCollection,
    loraOutfitTriggerWordPatternCollection,
    outfitAndExposurePatternCollection,
    backgroundPatternCollection,
    posePatternCollection,
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
    patternCollection: rootPatternCollection,
    children: characters,
  };
};

export const generatePatterns = (generationDatas: GenerationDatas) =>
  generationDatas.map(generateRootPatternCollection);
