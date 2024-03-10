import { LoraEntry, Entry } from "../prompt-define.mjs";
import {
  BreastSizeTag,
  CharacterFeatureTag,
} from "../tag-defines/character-feature.mjs";
import { CharacterNameTag } from "../tag-defines/character-name.mjs";
import { EmotionTag } from "../tag-defines/emotion.mjs";
import { LoraCharacterTriggerWordsTag } from "../tag-defines/lora.mjs";
import { SeriesNameTag } from "../tag-defines/series-name.mjs";
import { sasuoniShibaMiyukiEft } from "./sasuoni-shiba-miyuki-eft.mjs";

/**
 * Character define.
 */
export type CharacterDefine = Readonly<{
  /**
   * Lora define.
   */
  lora: LoraEntry | null;
  /**
   * Lora character trigger words define.
   */
  loraCharacterTriggerWordEntries: Entry<LoraCharacterTriggerWordsTag>[] | null;
  /**
   * Series name.
   */
  seriesNameEntries: Entry<SeriesNameTag>[];
  /**
   * Character name.
   */
  characterNameEntries: Entry<CharacterNameTag>[];
  /**
   * Character feature defines.
   */
  characterFeatureEntries: Entry<CharacterFeatureTag>[];
  /**
   * Breast size define.
   */
  breastSize: BreastSizeTag;
  /**
   * Emotion defines.
   */
  emotionEntries: Entry<EmotionTag>[];
}>;

export const characterTable = {
  "sasuoni-shiba-miyuki-eft": sasuoniShibaMiyukiEft(),
} as const satisfies {
  [k: string]: CharacterDefine;
};

export type CharacterKey = keyof typeof characterTable;
