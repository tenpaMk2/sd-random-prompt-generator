const allLoraNameTags = [
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
  `iroha-madomagi`, // 0.8, <https://civitai.com/models/271627/iroha-tamaki-magia-record>
] as const satisfies readonly string[];
export type LoraNameTag = (typeof allLoraNameTags)[number];
