import { CharacterKey, characterTable } from "../characters/resolver.mjs";
import { getKeys } from "../libs/utility.mjs";
import { OutfitKey } from "../outfits/resolver.mjs";
import {
  BackgroundSetting,
  CharacterSetting,
  OutfitSetting,
} from "../setting-define.mjs";
import { outfitsPreset } from "./outfit.mjs";

/**
 * Define unique key for the pair of backgrounds and poses.
 */
type BackgroundAndPoseKey =
  | `from-above-bed-sheet-lying-on-bed`
  | `from-above-bed-sheet-full-body-lying`
  | `bed-all-fours-from-behind`
  | `bed-all-fours`
  | `colorful-heart-backgrounds-kneeling`;

export const generateCharactersSetting = ({
  characterKeys,
  outfitKeys,
  backgroundAndPoseKeys,
}: {
  characterKeys: CharacterKey[] | `all`;
  outfitKeys: OutfitKey[] | `cosplay`;
  backgroundAndPoseKeys?: BackgroundAndPoseKey[];
}): CharacterSetting[] => {
  const cKeys =
    characterKeys === `all` ? getKeys(characterTable) : characterKeys;
  const characterSettings = cKeys.map((cKey) => {
    if (outfitKeys === `cosplay`)
      return {
        key: cKey,
        outfits: [...outfitsPreset.cosplay],
      } as const satisfies CharacterSetting;

    if (!backgroundAndPoseKeys) {
      const outfits = outfitKeys.map((oKeys) => outfitsPreset[oKeys]).flat();

      return {
        key: cKey,
        outfits,
      } as const satisfies CharacterSetting;
    }

    const outfits = outfitKeys.map((oKey) => {
      const backgrounds = backgroundAndPoseKeys.map(
        (
          backgroundAndPoseKey,
        ):
          | BackgroundSetting<`from-above`>
          | BackgroundSetting<`from-below`>
          | BackgroundSetting<`from-horizontal`> => {
          switch (backgroundAndPoseKey) {
            case `from-above-bed-sheet-lying-on-bed`:
              return {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `lying-on-bed` }],
              } as const satisfies BackgroundSetting<`from-above`>;
            case `from-above-bed-sheet-full-body-lying`:
              return {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `full-body-lying` }],
              } as const satisfies BackgroundSetting<`from-above`>;
            case `bed-all-fours`:
              return {
                type: `from-horizontal`,
                key: `bed`,
                poses: [{ key: `all-fours` }],
              } as const satisfies BackgroundSetting<`from-horizontal`>;
            case `bed-all-fours-from-behind`:
              return {
                type: `from-horizontal`,
                key: `bed`,
                poses: [{ key: `all-fours-from-behind` }],
              } as const satisfies BackgroundSetting<`from-horizontal`>;
            case `colorful-heart-backgrounds-kneeling`:
              return {
                type: `from-horizontal`,
                key: `colorful-heart-backgrounds`,
                poses: [{ key: `kneeling-spread-legs` }],
              } as const satisfies BackgroundSetting<`from-horizontal`>;
          }
        },
      );

      return {
        key: oKey,
        backgrounds,
      } as const satisfies OutfitSetting;
    });

    return {
      key: cKey,
      outfits,
    } as const satisfies CharacterSetting;
  });

  return characterSettings;
};
