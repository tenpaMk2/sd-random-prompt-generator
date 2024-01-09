const allLoraNameTags = [
  `nishikigi_chisato_v1`, // 0.75, <https://civitai.com/models/235178/nishikigi-chisato-lycoris-recoil>
  `shokuhou_misaki_v2`, // 0.7, <https://civitai.com/models/19948/shokuhou-misaki-toaru-kagaku-no-railgun>
  `OGT_Cecilia_Alcott-v1`, // 0.8, <https://civitai.com/models/250377/cecilia-alcott-or-infinite-stratos>
  `AmagiBrilliantPark_SentoIsuzu`, // 0.8, <https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park>
  `suzukaze_aoba_newgame`, // 0.70, <https://civitai.com/models/227219/suzukaze-aoba-new-game>
  `takimoto_hifumi_newgame`, // 0.70, <https://civitai.com/models/227280/takimoto-hifumi-new-game>
] as const satisfies readonly string[];
export type LoraNameTag = (typeof allLoraNameTags)[number];
