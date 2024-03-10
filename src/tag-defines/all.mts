import { ArmPoseTag } from "./arm-pose.mjs";
import { BackgroundTag } from "./background.mjs";
import { BreastSizeTag, CharacterFeatureTag } from "./character-feature.mjs";
import { CharacterNameTag } from "./character-name.mjs";
import { EmotionTag, ProfileTag } from "./emotion.mjs";
import {
  LoraCharacterTriggerWordsTag,
  LoraOutfitTriggerWordsTag,
} from "./lora.mjs";
import { ArmpitsTag, OutfitAndExposureTag } from "./outfit-and-exposure.mjs";
import { PoseTag } from "./pose.mjs";
import { SeriesNameTag } from "./series-name.mjs";

export type PersonTag =
  | SeriesNameTag
  | CharacterNameTag
  | LoraCharacterTriggerWordsTag
  | LoraOutfitTriggerWordsTag
  | CharacterFeatureTag
  | BreastSizeTag
  | ArmpitsTag
  | OutfitAndExposureTag
  | EmotionTag
  | ProfileTag
  | ArmPoseTag
  | PoseTag;

export type Tag = PersonTag | BackgroundTag;
