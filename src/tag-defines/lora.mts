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
  `nana-loveru`, // 0.8, <https://civitai.com/models/258477/nana-astar-deviluke-to-love-ru>
  `iroha-madomagi-01`, // 0.8, <https://civitai.com/models/271627/iroha-tamaki-magia-record>
  `yachiyo-madomagi-01`, // eft, 0.8, <https://civitai.com/models/271624/yachiyo-nanami-magia-record>
  `madoka-madomagi-01`, // eft, 0.8, <https://civitai.com/models/269404/madoka-kaname-mahou-shoujo-madokamagica>
  `sayaka-madomagi-01`, // eft, 0.8, <https://civitai.com/models/269414/sayaka-miki-mahou-shoujo-madokamagica>
  `mami-madomagi-01`, // eft, 0.8, <https://civitai.com/models/269417/mami-tomoe-mahou-shoujo-madokamagica>
  `kyouko-madomagi-01`, // eft, 0.8, <https://civitai.com/models/269411/kyouko-sakura-mahou-shoujo-madokamagica>
  `homura-madomagi-01`, // eft, 0.8, <https://civitai.com/models/269407/homura-akemi-mahou-shoujo-madokamagica>
  `miyuki-mahouka`, // 0.8, <https://civitai.com/models/298306/miyuki-shiba-mahouka-koukou-no-rettousei>
  `mayumi-mahouka`, // 0.8, <https://civitai.com/models/298307/mayumi-saegusa-mahouka-koukou-no-rettousei>
  `honoka-mahouka`, // 0.8, <https://civitai.com/models/298315/honoka-mitsui-mahouka-koukou-no-rettousei>
  `erika-mahouka`, // 0.8, <https://civitai.com/models/298310/erika-chiba-mahouka-koukou-no-rettousei>
  `shizuku-mahouka`, // 0.8, <https://civitai.com/models/298313/shizuku-kitayama-mahouka-koukou-no-rettousei>
  `chisato-lycoreco-01`, // eft, 0.8, <https://civitai.com/models/226036/chisato-nishikigi-lycoris-recoil>
  `takina-lycoreco-01`, // eft, 0.8, <https://civitai.com/models/226041/takina-inoue-lycoris-recoil>
] as const satisfies readonly string[];
export type LoraNameTag = (typeof allLoraNameTags)[number];
