import { BackgroundTag } from "./background.mjs";
import { BreastSizeTag, CharacterFeatureTag } from "./character-feature.mjs";
import { CharacterNameTag } from "./character-name.mjs";
import { EmotionTag, ProfileTag } from "./emotion.mjs";
import {
  LoraCharacterTriggerWordsTag,
  LoraOutfitTriggerWordsTag,
} from "./lora.mjs";
import { OutfitAndExposureTag } from "./outfit-and-exposure.mjs";
import { PoseTag } from "./pose.mjs";
import { SeriesNameTag } from "./series-name.mjs";
import { SpecialTag } from "./special.mjs";

export type PersonTag =
  | SeriesNameTag
  | CharacterNameTag
  | LoraCharacterTriggerWordsTag
  | LoraOutfitTriggerWordsTag
  | CharacterFeatureTag
  | BreastSizeTag
  | OutfitAndExposureTag
  | EmotionTag
  | ProfileTag
  | PoseTag
  | SpecialTag;

export type Tag = PersonTag | BackgroundTag;
