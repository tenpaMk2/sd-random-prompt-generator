import { backgroundTable } from "./backgrounds/resolver.mjs";
import { characterTable } from "./characters/resolver.mjs";
import { outfitTable } from "./outfits/resolver.mjs";
import { poseTable } from "./poses/resolver.mjs";
import { BackgroundSetting, Setting } from "./setting.mjs";

const generateFromHorizontalPose = (
  poseSetting: BackgroundSetting<"from-horizontal">["poses"][number],
) => ({
  key: poseSetting.key,
  pose: poseTable["from-horizontal"][poseSetting.key],
});

const generateFromBelowPose = (
  poseSetting: BackgroundSetting<"from-below">["poses"][number],
) => ({
  key: poseSetting.key,
  pose: poseTable["from-below"][poseSetting.key],
});

const generateBackground = (
  backgroundSetting: Setting["characters"][number]["outfits"][number]["backgrounds"][number],
) => {
  switch (backgroundSetting.type) {
    case "from-horizontal":
      return {
        key: backgroundSetting.key,
        background: backgroundTable["from-horizontal"][backgroundSetting.key],
        poses: backgroundSetting.poses.map(generateFromHorizontalPose),
      };
    case "from-below":
      return {
        key: backgroundSetting.key,
        background: backgroundTable["from-below"][backgroundSetting.key],
        poses: backgroundSetting.poses.map(generateFromBelowPose),
      };
  }
};

const generateOutfit = (
  outfitSetting: Setting["characters"][number]["outfits"][number],
) => ({
  key: outfitSetting.key,
  outfit: outfitTable[outfitSetting.key],
  backgrounds: outfitSetting.backgrounds.map(generateBackground),
});

const generateCharacter = (
  characterSetting: Setting["characters"][number],
) => ({
  key: characterSetting.key,
  character: characterTable[characterSetting.key],
  outfits: characterSetting.outfits.map(generateOutfit),
});

export const prepare = (settings: Setting[]) =>
  settings.map((setting) => ({
    key: setting.key,
    characters: setting.characters.map(generateCharacter),
  }));

export type GenerationDatas = ReturnType<typeof prepare>;
