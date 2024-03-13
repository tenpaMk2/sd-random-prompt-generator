import { Entry, LoraEntry } from "../prompt-define.mjs";
import { LoraOutfitTriggerWordsTag } from "../tag-defines/lora.mjs";
import { OutfitAndExposureTag } from "../tag-defines/outfit-and-exposure.mjs";
import { bikini } from "./common/bikini.mjs";
import { maidBikini } from "./common/maid-bikini.mjs";
import { microBikini } from "./common/micro-bikini.mjs";
import { revealingMiko } from "./common/revealing-miko.mjs";
import { sasuoniEftFirstHighSchoolUniform } from "./sasuoni-eft/first-high-school-uniform.mjs";

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
  loraOutfitTriggerWordEntries: Entry<LoraOutfitTriggerWordsTag>[];
  /**
   * Outfit and exposure defines such as `red shirt` , `collarbone` and `thigh gap` .
   */
  outfitAndExposureEntries: Entry<OutfitAndExposureTag>[];
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
  upskirtEntries: Entry<OutfitAndExposureTag>[];
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
    additionalFootEntriesAfterRemoving: Entry<OutfitAndExposureTag>[];
  } | null;
}>;

export const outfitTable = {
  bikini: bikini(),
  "maid-bikini": maidBikini(),
  "micro-bikini": microBikini(),
  "revealing-miko": revealingMiko(),
  "sasuoni-eft-first-high-school-uniform": sasuoniEftFirstHighSchoolUniform(),
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
