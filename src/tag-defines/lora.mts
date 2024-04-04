import { BaseModel } from "../setting-define.mjs";

type LoraDefine = Readonly<{
  /**
   * Lora name.
   * @example `nishikigi_chisato_v1`
   */
  loraName: string;
  /**
   * Recommended weight.
   * Choose value from the range specied in the lora description or sample images.
   */
  recommendedWeight: number;
  /**
   * Supported base models.
   * If you try to this lora with unsupported model, the tool will throw error.
   */
  supportedBaseModels: BaseModel[];
  /**
   * URL.
   */
  url: URL;
  /**
   * Character trigger words tags.
   * Define only the lora has uncommon trigger words.
   * For example, `mea kurosaki` is uncommon trigger words because it's not included in the common danbooru tag.
   */
  characterTriggerWordsTags: readonly string[];
  /**
   * Outfit trigger tags.
   * Some character lora has uncommon outfit trigger tags in order to distinguish outfit variations.
   * For example, `SentoUniform` and `SentoBikini` are uncommon outfit trigger tags.
   */
  outfitTriggerTags: readonly string[];
  /**
   * Creator.
   */
  creator: string;
}>;

export const allLoras = [
  {
    loraName: `nishikigi_chisato_v1`,
    recommendedWeight: 0.75,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/235178/nishikigi-chisato-lycoris-recoil`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [`aachisato`],
    creator: `h_madoka`,
  },
  {
    loraName: `shokuhou_misaki_v2`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/19948/shokuhou-misaki-toaru-kagaku-no-railgun`,
    ),
    characterTriggerWordsTags: [`hmmisaki`],
    outfitTriggerTags: [],
    creator: `h_madoka`,
  },
  {
    loraName: `OGT_Cecilia_Alcott-v1`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/250377/cecilia-alcott-or-infinite-stratos`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `OG_Turles`,
  },
  {
    loraName: `AmagiBrilliantPark_SentoIsuzu`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/55673/sento-isuzu-or-amagi-brilliant-park`,
    ),
    characterTriggerWordsTags: [`SentoIsuzu`],
    outfitTriggerTags: [
      `SentoUniform`,
      `SentoVest`,
      `SentoSchoolUniform`,
      `SentoSuit`,
      `SentoCasual`,
      `SentoBikini`,
      `SentoPirate`,
    ],
    creator: `LittleJelly`,
  },
  {
    loraName: `suzukaze_aoba_newgame`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/227219/suzukaze-aoba-new-game`),
    characterTriggerWordsTags: [`suzukaze_aoba_newgame`],
    outfitTriggerTags: [],
    creator: `narugo1992`,
  },
  {
    loraName: `takimoto_hifumi_newgame`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/227280/takimoto-hifumi-new-game`),
    characterTriggerWordsTags: [`takimoto_hifumi_newgame`],
    outfitTriggerTags: [],
    creator: `narugo1992`,
  },
  {
    loraName: `momo-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/258472/momo-belia-deviluke-to-love-ru`,
    ),
    characterTriggerWordsTags: [`momo belia deviluke`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `mea-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/258474/mea-kurosaki-to-love-ru`),
    characterTriggerWordsTags: [`mea kurosaki`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `lala-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/258475/lala-satalin-deviluke-to-love-ru`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `haruna-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/258480/haruna-sairenji-to-love-ru`,
    ),
    characterTriggerWordsTags: [`haruna sairenji`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `yami-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/258473/konjiki-no-yami-to-love-ru`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `yui-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/258476/yui-kotegawa-to-love-ru`),
    characterTriggerWordsTags: [`yui kotegawa`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `nana-loveru`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/258477/nana-astar-deviluke-to-love-ru`,
    ),
    characterTriggerWordsTags: [`nana astar deviluke`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `iroha-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/271627/iroha-tamaki-magia-record`),
    characterTriggerWordsTags: [`iroha tamaki`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `yachiyo-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/271624/yachiyo-nanami-magia-record`,
    ),
    characterTriggerWordsTags: [`yachiyo nanami`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `madoka-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/269404/madoka-kaname-mahou-shoujo-madokamagica`,
    ),
    characterTriggerWordsTags: [`madoka kaname`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `sayaka-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/269414/sayaka-miki-mahou-shoujo-madokamagica`,
    ),
    characterTriggerWordsTags: [`sayaka miki`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `mami-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/269417/mami-tomoe-mahou-shoujo-madokamagica`,
    ),
    characterTriggerWordsTags: [`mami tomoe`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `kyouko-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/269411/kyouko-sakura-mahou-shoujo-madokamagica`,
    ),
    characterTriggerWordsTags: [`kyouko sakura`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `homura-madomagi-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/269407/homura-akemi-mahou-shoujo-madokamagica`,
    ),
    characterTriggerWordsTags: [`homura akemi`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `miyuki-mahouka`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/298306/miyuki-shiba-mahouka-koukou-no-rettousei`,
    ),
    characterTriggerWordsTags: [`miyuki shiba`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `mayumi-mahouka`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/298307/mayumi-saegusa-mahouka-koukou-no-rettousei`,
    ),
    characterTriggerWordsTags: [`mayumi saegusa`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `honoka-mahouka`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/298315/honoka-mitsui-mahouka-koukou-no-rettousei`,
    ),
    characterTriggerWordsTags: [`honoka mitsui`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `erika-mahouka`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/298310/erika-chiba-mahouka-koukou-no-rettousei`,
    ),
    characterTriggerWordsTags: [`erika chiba`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `shizuku-mahouka`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/298313/shizuku-kitayama-mahouka-koukou-no-rettousei`,
    ),
    characterTriggerWordsTags: [`shizuku kitayama`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `chisato-lycoreco-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/226036/chisato-nishikigi-lycoris-recoil`,
    ),
    characterTriggerWordsTags: [`chisato nishikigi`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `takina-lycoreco-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/226041/takina-inoue-lycoris-recoil`,
    ),
    characterTriggerWordsTags: [`takina inoue`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `rem-rezero-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/216918/rem-rezero`),
    characterTriggerWordsTags: [`rem`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `ram-rezero-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/216920/ram-rezero`),
    characterTriggerWordsTags: [`ram`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `emilia-rezero-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/216916/emilia-rezero`),
    characterTriggerWordsTags: [`emilia`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `lisesharte-bahamut-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/191377/lisesharte-atismata-saijaku-muhai-no-bahamut`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `philuffy-bahamut-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/191372/philuffy-aingram-saijaku-muhai-no-bahamut`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `krulcifer-bahamut-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/191382/krulcifer-einfolk-saijaku-muhai-no-bahamut`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `celistia-bahamut-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/191380/celistia-ralgris-saijaku-muhai-no-bahamut`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `yoruka-bahamut-01`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/191383/yoruka-kirihime-saijaku-muhai-no-bahamut`,
    ),
    characterTriggerWordsTags: [`yoruka kirihime`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `eft_dumbell_blonde`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/315195/hibiki-sakura-how-heavy-are-the-dumbbells-you-lift-dumbbell-nan-kilo-moteru-anime-design`,
    ),
    characterTriggerWordsTags: [`eft_dumbbell_blonde`],
    outfitTriggerTags: [],
    creator: `wiz_`,
  },
  {
    loraName: `eft_dumbell_black`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/315196/akemi-souryuuin-how-heavy-are-the-dumbbells-you-lift-dumbbell-nan-kilo-moteru-anime-design`,
    ),
    characterTriggerWordsTags: [`eft_dumbbell_black`],
    outfitTriggerTags: [],
    creator: `wiz_`,
  },
  {
    loraName: `eft_dumbell_bun`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/315191/ayaka-uehara-how-heavy-are-the-dumbbells-you-lift-dumbbell-nan-kilo-moteru-anime-design`,
    ),
    characterTriggerWordsTags: [`eft_dumbbell_bun`],
    outfitTriggerTags: [],
    creator: `wiz_`,
  },
  {
    loraName: `eft_dumbell_white`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/315188/gina-boyd-how-heavy-are-the-dumbbells-you-lift-dumbbell-nan-kilo-moteru-anime-design`,
    ),
    characterTriggerWordsTags: [`eft_dumbbell_white`],
    outfitTriggerTags: [],
    creator: `wiz_`,
  },
  {
    loraName: `eft_dumbell_short`,
    recommendedWeight: 0.7,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/315183/satomi-tachibana-how-heavy-are-the-dumbbells-you-lift-dumbbell-nan-kilo-moteru-anime-design`,
    ),
    characterTriggerWordsTags: [`eft_dumbbell_short`],
    outfitTriggerTags: [],
    creator: `wiz_`,
  },
  {
    loraName: `eina-danmachi`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/342415/eina-tulle-danmachi`),
    characterTriggerWordsTags: [], // `eina tulle` is common trigger words.
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `haruhime-danmachi`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(
      `https://civitai.com/models/342409/haruhime-sanjouno-danmachi`,
    ),
    characterTriggerWordsTags: [`haruhime sanjouno`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `lili-danmachi`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/342407/liliruca-arde-danmachi`),
    characterTriggerWordsTags: [], // `liliruca arde` is common trigger words.
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `ryuu-danmachi`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/342406/ryuu-lion-danmachi`),
    characterTriggerWordsTags: [`ryuu lion`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `ais-danmachi`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/339169/ais-wallenstein-danmachi`),
    characterTriggerWordsTags: [`ais wallenstein`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `hestia-danmachi`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`SD1.5`],
    url: new URL(`https://civitai.com/models/339164/hestia-danmachi`),
    characterTriggerWordsTags: [`hestia`],
    outfitTriggerTags: [],
    creator: `eft`,
  },
  {
    loraName: `akoya_matama-pony-v1`,
    recommendedWeight: 0.8,
    supportedBaseModels: [`Pony`],
    url: new URL(`https://civitai.com/models/351800?modelVersionId=393514`),
    characterTriggerWordsTags: [`akoya matama`],
    outfitTriggerTags: [],
    creator: `NoteKaga`,
  },
  {
    loraName: `ichijou_hotaru-pony-v1`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/78552/sdxlsd15-ichijou-hotaru-or-non-non-biyori`,
    ),
    characterTriggerWordsTags: [`ichijou hotaru`],
    outfitTriggerTags: [],
    creator: `NoteKaga`,
  },
  {
    loraName: `danmachi-hestia-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/361913/hestia-is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-danmachi?modelVersionId=404426`,
    ),
    characterTriggerWordsTags: [`hestia`],
    outfitTriggerTags: [],
    creator: `NoteKaga`,
  },
  {
    loraName: `clobeasts_pony`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/309537/chloe-von-einzbernbeast-style?modelVersionId=347422`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [`zzcloaa`],
    creator: `am7coffeelove`,
  },
  {
    loraName: `illyabeasts_Ponyv2`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(`https://civitai.com/models/309396?modelVersionId=347749`),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [`zzillaaa`],
    creator: `am7coffeelove`,
  },
  {
    loraName: `miubeasts_ponyv1`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/309561/miyu-edelfeltbeast-style?modelVersionId=347442`,
    ),
    characterTriggerWordsTags: [],
    outfitTriggerTags: [`zzmiuaa`],
    creator: `am7coffeelove`,
  },
  {
    loraName: `shadow-beta-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/364066/beta-the-eminence-in-shadow-kage-no-jitsuryokusha-ni-naritakute-commission?modelVersionId=406805`,
    ),
    characterTriggerWordsTags: [`beta`],
    outfitTriggerTags: [],
    creator: `nochekaiser881`,
  },
  {
    loraName: `shadow-alpha-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/364060/alpha-the-eminence-in-shadow-kage-no-jitsuryokusha-ni-naritakute-commission?modelVersionId=406796`,
    ),
    characterTriggerWordsTags: [`alpha`],
    outfitTriggerTags: [],
    creator: `nochekaiser881`,
  },
  {
    loraName: `kaguya-shinomiya-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/353048/kaguya-shinomiya-kaguya-sama-love-is-war?modelVersionId=394808`,
    ),
    characterTriggerWordsTags: [`kaguya shinomiya`],
    outfitTriggerTags: [],
    creator: `nochekaiser881`,
  },
  {
    loraName: `ai-hayasaka-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/353023/ai-hayasaka-kaguya-sama-love-is-war?modelVersionId=394781`,
    ),
    characterTriggerWordsTags: [`ai hayasaka`],
    outfitTriggerTags: [],
    creator: `nochekaiser881`,
  },
  {
    loraName: `miko-iino-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/354194/miko-iino-kaguya-sama-love-is-war?modelVersionId=396066`,
    ),
    characterTriggerWordsTags: [`miko iino`],
    outfitTriggerTags: [],
    creator: `nochekaiser881`,
  },
  {
    loraName: `chika-fujiwara-s3-ponyxl-lora-nochekaiser`,
    recommendedWeight: 1.0,
    supportedBaseModels: [`Pony`],
    url: new URL(
      `https://civitai.com/models/336863/chika-fujiwara-kaguya-sama-love-is-war`,
    ),
    characterTriggerWordsTags: [`chika fujiwara`],
    outfitTriggerTags: [],
    creator: `nochekaiser881`,
  },
] as const satisfies readonly LoraDefine[];

export type LoraNameTag = (typeof allLoras)[number]["loraName"];
export type LoraCharacterTriggerWordsTag =
  (typeof allLoras)[number]["characterTriggerWordsTags"][number];
export type LoraOutfitTriggerWordsTag =
  (typeof allLoras)[number]["outfitTriggerTags"][number];
