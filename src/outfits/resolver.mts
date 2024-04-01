import { NormalEntry, LoraEntry } from "../prompt-define.mjs";
import { LoraOutfitTriggerWordsTag } from "../tag-defines/lora.mjs";
import { OutfitAndExposureTag } from "../tag-defines/outfit-and-exposure.mjs";
import { bikini } from "./common/bikini.mjs";
import { bridalLingerie } from "./common/bridal-lingerie.mjs";
import { camisoleDenimShorts } from "./common/camisole-denim-shorts.mjs";
import { casualMiniskirt } from "./common/casual-miniskirt.mjs";
import { cheerleader } from "./common/cheerleader.mjs";
import { chinaDress } from "./common/china-dress.mjs";
import { cowPrintBikini } from "./common/cow-print-bikini.mjs";
import { maidBikini } from "./common/maid-bikini.mjs";
import { microBikini } from "./common/micro-bikini.mjs";
import { playboyBunny } from "./common/playboy-bunny.mjs";
import { revealingMiko } from "./common/revealing-miko.mjs";
import { santaBikini } from "./common/santa-bikini.mjs";
import { sukumizuThighhighs } from "./common/sukumizu-thighhighs.mjs";
import { testOutfit } from "./common/test-outfit.mjs";
import { danmachiHestia } from "./danmachi/hestia.mjs";
import { kagejitsuShadowGarden } from "./kagejitsu/shadow-garden.mjs";
import { mahoakoLocomusica } from "./mahoako/locomusica.mjs";
import { prismaIllyaChloeBeast } from "./prisma-illya/chloe-beast.mjs";
import { prismaIllyaIllyaBeast } from "./prisma-illya/illya-beast.mjs";
import { prismaIllyaMiyuBeast } from "./prisma-illya/miyu-beast.mjs";
import { sasuoniFirstHighSchoolUniform } from "./sasuoni/first-high-school-uniform.mjs";

/**
 * Outfit define.
 */
export type OutfitDefine = Readonly<{
  /**
   * Lora define.
   */
  lora: LoraEntry | null;
  /**
   * Lora outfit trigger words define.
   */
  loraOutfitTriggerWordEntries: NormalEntry<LoraOutfitTriggerWordsTag>[];
  /**
   * Outfit and exposure defines such as `red shirt` , `collarbone` and `thigh gap` .
   */
  outfitAndExposureEntries: NormalEntry<OutfitAndExposureTag>[];
  /**
   * Visibility of specific tags.
   */
  specialVisibility: {
    /**
     * Visible when arms up.
     */
    armpits: boolean;
    /**
     * Visible when all fours and the character has large breasts.
     */
    hangingBreasts: boolean;
    /**
     * Visible when the front chest is covered and the character has large breasts.
     */
    tautClothes: boolean;
    /**
     * Visible when the front chest is exposed and the character has large breasts.
     */
    cleavage: boolean;
    /**
     * Visible when the side chest is exposed and the character has large breasts.
     */
    sideboob: boolean;
    /**
     * Visible when the backboob is exposed and the character has large breasts.
     */
    backboob: boolean;
    /**
     * Visibility level of underboob.
     * `full` is always visible.
     * `only from below` is visible only from below.
     */
    underboobLevel: `invisible` | `only from below` | `full`;
    /**
     * Visible when from front.
     */
    zettaiRyouiki: boolean;
    /**
     * Visible when from front.
     * This affects `thigh gap` and `ass visible through thighs`.
     */
    insideOfThighs: boolean;
  };
  /**
   * Lift type for clothes lift.
   */
  liftType: `none` | `skirt` | `dress`;
  /**
   * Outfit and exposure defines in the skirt for when `upskirt` is specified.
   */
  upskirtEntries: NormalEntry<OutfitAndExposureTag>[]; // TODO: Reconsider as `null` .
  /**
   * Outfit and exposure defines at foot for when footwear should be removed.
   */
  whenRemoveShoes: {
    /**
     * Exclude tags that is in the `outfitAndExposureTree` .
     */
    excludeTags: readonly OutfitAndExposureTag[];
    /**
     * Tokens for when footwear is removed.
     * @example `[new Token(\`no shoes\`)]` , `[new Token(\`barefoor\`)]`
     */
    additionalFootEntriesAfterRemoving: NormalEntry<OutfitAndExposureTag>[];
  } | null;
}>;

export const outfitTable = {
  "test-outfit": testOutfit(),
  bikini: bikini(),
  "bridal-lingerie": bridalLingerie(),
  "camisole-denim-shorts": camisoleDenimShorts(),
  "casual-miniskirt": casualMiniskirt(),
  cheerleader: cheerleader(),
  "china-dress": chinaDress(),
  "cow-print-bikini": cowPrintBikini(),
  "maid-bikini": maidBikini(),
  "micro-bikini": microBikini(),
  "playboy-bunny": playboyBunny(),
  "revealing-miko": revealingMiko(),
  "santa-bikini": santaBikini(),
  "sukumizu-thighhighs": sukumizuThighhighs(),
  "danmachi-nochekaiser-hestia": danmachiHestia(`nochekaiser`),
  "kagejitsu-nochekaiser-shadow-garden-alpha":
    kagejitsuShadowGarden(`nochekaiser-alpha`),
  "kagejitsu-nochekaiser-shadow-garden-beta":
    kagejitsuShadowGarden(`nochekaiser-beta`),
  "mahoako-notekaga-locomusica": mahoakoLocomusica(`notekaga`),
  "prisma-illya-chloe-beast": prismaIllyaChloeBeast(`am7coffeelove`),
  "prisma-illya-illya-beast": prismaIllyaIllyaBeast(`am7coffeelove`),
  "prisma-illya-miyu-beast": prismaIllyaMiyuBeast(`am7coffeelove`),
  "sasuoni-eft-first-high-school-uniform-pantyhose":
    sasuoniFirstHighSchoolUniform(`eft-pantyhose`),
  "sasuoni-eft-first-high-school-uniform-thighhighs":
    sasuoniFirstHighSchoolUniform(`eft-thighhighs`),
} as const satisfies {
  [k: string]: OutfitDefine;
};

export type OutfitKey = keyof typeof outfitTable;

export const UnderboobLevelOrder = {
  invisible: 0,
  "only from below": 1,
  full: 2,
} as const satisfies {
  [k in OutfitDefine["specialVisibility"]["underboobLevel"]]: number;
};
