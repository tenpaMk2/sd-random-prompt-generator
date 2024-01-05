import { ArmPoseTag } from "./arm-pose.mjs";
import { BackgroundTag } from "./background.mjs";
import { CharacterFeatureTag } from "./character-feature.mjs";
import { EmotionTag, ProfileTag } from "./emotion.mjs";
import { ArmpitsTag, OutfitAndExposureTag } from "./outfit-and-exposure.mjs";
import { PoseTag } from "./pose.mjs";

export type PersonTag =
  | CharacterFeatureTag
  | ArmpitsTag
  | OutfitAndExposureTag
  | EmotionTag
  | ProfileTag
  | ArmPoseTag
  | PoseTag;

export type Tag = PersonTag | BackgroundTag;
