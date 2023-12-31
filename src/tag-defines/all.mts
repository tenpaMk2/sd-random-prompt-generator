import { ArmPoseTag } from "./arm-pose.mjs";
import { BackgroundTag } from "./background.mjs";
import { CharacterFeatureTag } from "./character-feature.mjs";
import { EmotionTag } from "./emotion.mjs";
import { OutfitAndExposureTag } from "./outfit-and-exposure.mjs";
import { PoseTag } from "./pose.mjs";

export type PersonTag =
  | CharacterFeatureTag
  | OutfitAndExposureTag
  | EmotionTag
  | ArmPoseTag
  | PoseTag;

export type Tag = PersonTag | BackgroundTag;
