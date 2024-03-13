import { LoraEntry, NormalEntry } from "../prompt-define.mjs";
import {
  BreastSizeTag,
  CharacterFeatureTag,
} from "../tag-defines/character-feature.mjs";
import { CharacterNameTag } from "../tag-defines/character-name.mjs";
import { EmotionTag } from "../tag-defines/emotion.mjs";
import { LoraCharacterTriggerWordsTag } from "../tag-defines/lora.mjs";
import { SeriesNameTag } from "../tag-defines/series-name.mjs";
import { newGameAobaNarugo1992 } from "./new-game/new-game-aoba-narugo1992.mjs";
import { newGameHifumiNarugo1992 } from "./new-game/new-game-hifumi-narugo1992.mjs";
import { sasuoniMitsuiHonokaEft } from "./sasuoni/sasuoni-mitsui-honoka-eft.mjs";
import { sasuoniSaegusaMayumiEft } from "./sasuoni/sasuoni-saegusa-mayumi-eft.mjs";
import { sasuoniShibaMiyukiEft } from "./sasuoni/sasuoni-shiba-miyuki-eft.mjs";
import { toLoveRuLalaEft } from "./to-love-ru/to-love-ru-lala-eft.mjs";
import { toLoveRuMeaEft } from "./to-love-ru/to-love-ru-mea-eft.mjs";
import { toLoveRuMomoEft } from "./to-love-ru/to-love-ru-momo-eft.mjs";
import { toLoveRuYamiEft } from "./to-love-ru/to-love-ru-yami-eft.mjs";
import { toLoveRuYuiEft } from "./to-love-ru/to-love-ru-yui-eft.mjs";

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
  loraCharacterTriggerWordEntries: NormalEntry<LoraCharacterTriggerWordsTag>[];
  /**
   * Series name.
   */
  seriesNameEntries: NormalEntry<SeriesNameTag>[];
  /**
   * Character name.
   */
  characterNameEntries: NormalEntry<CharacterNameTag>[];
  /**
   * Character feature defines.
   */
  characterFeatureEntries: NormalEntry<CharacterFeatureTag>[];
  /**
   * Breast size define.
   */
  breastSize: BreastSizeTag;
  /**
   * Emotion defines.
   */
  emotionEntries: NormalEntry<EmotionTag>[];
}>;

export const characterTable = {
  "new-game-aoba-narugo1992": newGameAobaNarugo1992(),
  "new-game-hifumi-narugo1992": newGameHifumiNarugo1992(),
  "to-love-ru-lala-eft": toLoveRuLalaEft(),
  "to-love-ru-mea-eft": toLoveRuMeaEft(),
  "to-love-ru-momo-eft": toLoveRuMomoEft(),
  "to-love-ru-yami-eft": toLoveRuYamiEft(),
  "to-love-ru-yui-eft": toLoveRuYuiEft(),
  "sasuoni-shiba-miyuki-eft": sasuoniShibaMiyukiEft(),
  "sasuoni-saegusa-mayumi-eft": sasuoniSaegusaMayumiEft(),
  "sasuoni-mitsui-honoka-eft": sasuoniMitsuiHonokaEft(),
} as const satisfies {
  [k: string]: CharacterDefine;
};

export type CharacterKey = keyof typeof characterTable;
