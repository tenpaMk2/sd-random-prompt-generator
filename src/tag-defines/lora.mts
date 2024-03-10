/**
 * All Lora names.
 */
export const allLoraNameTags = [
  `nishikigi_chisato_v1`, // 0.75, <https://civitai.com/models/235178/nishikigi-chisato-lycoris-recoil>
  `shokuhou_misaki_v2`, // 0.7, <https://civitai.com/models/19948/shokuhou-misaki-toaru-kagaku-no-railgun>
  `OGT_Cecilia_Alcott-v1`, // 0.8, <https://civitai.com/models/250377/cecilia-alcott-or-infinite-stratos>
  `AmagiBrilliantPark_SentoIsuzu`, // 0.8, <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `suzukaze_aoba_newgame`, // 0.70, <https://civitai.com/models/227219/suzukaze-aoba-new-game>
  `takimoto_hifumi_newgame`, // 0.70, <https://civitai.com/models/227280/takimoto-hifumi-new-game>
  `momo-loveru-01`, // 0.8, <https://civitai.com/models/258472/momo-belia-deviluke-to-love-ru>
  `mea-loveru`, // 0.8, <https://civitai.com/models/258474/mea-kurosaki-to-love-ru>
  `lala-loveru`, // 0.8, <https://civitai.com/models/258475/lala-satalin-deviluke-to-love-ru>
  `haruna-loveru`, // 0.8, <https://civitai.com/models/258480/haruna-sairenji-to-love-ru>
  `yami-loveru`, // 0.8, <https://civitai.com/models/258473/konjiki-no-yami-to-love-ru>
  `yui-loveru`, // 0.8, <https://civitai.com/models/258476/yui-kotegawa-to-love-ru>
  `nana-loveru`, // 0.8, <https://civitai.com/models/258477/nana-astar-deviluke-to-love-ru>
  `iroha-madomagi`, // 0.8, <https://civitai.com/models/271627/iroha-tamaki-magia-record>
  `miyuki-mahouka`, // 0.8, <https://civitai.com/models/298306/miyuki-shiba-mahouka-koukou-no-rettousei>
] as const satisfies readonly string[];
export type LoraNameTag = (typeof allLoraNameTags)[number];

/**
 * Lora name tag type guard.
 */
export const isLoraNameTag = (tag: string): tag is LoraNameTag =>
  allLoraNameTags.some((loraNameTag) => loraNameTag === tag);

/**
 * All Lora character trigger words.
 * Not included common danbooru tag.
 */
const allLoraCharacterTriggerWordsTags = [
  `aacecilia`, // h_madoka: <https://civitai.com/models/237390/cecilia-alcott-infinite-stratos>
  `suzukaze_aoba_newgame`, // narugo1992: <https://civitai.com/models/227219/suzukaze-aoba-new-game>
  `takimoto_hifumi_newgame`, // narugo1992: <https://civitai.com/models/227280/takimoto-hifumi-new-game>
  `momo belia deviluke`, // eft: <https://civitai.com/models/258472/momo-belia-deviluke-to-love-ru>
  `mea kurosaki`, // eft
  `haruna sairenji`, // eft
  `yui kotegawa`, // eft
  `nana astar deviluke`, // eft
  `iroha tamaki`, // eft
  `miyuki shiba`, // eft
] as const satisfies readonly string[];
export type LoraCharacterTriggerWordsTag =
  (typeof allLoraCharacterTriggerWordsTags)[number];

/**
 * All Lora outfit trigger words.
 */
const allLoraOutfitTriggerTags = [
  `chino work`, // TODO
  `aachisato`, // TODO
  `hmmisaki`, // TODO
  `SentoUniform`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `SentoVest`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `SentoSchoolUniform`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `SentoSuit`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `SentoCasual`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `SentoBikini`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `SentoPirate`, // LittleJelly: <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
] as const satisfies readonly string[];
export type LoraOutfitTriggerWordsTag =
  (typeof allLoraOutfitTriggerTags)[number];
