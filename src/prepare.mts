import { backgroundTable } from "./backgrounds/resolver.mjs";
import { characterTable } from "./characters/resolver.mjs";
import { outfitTable } from "./outfits/resolver.mjs";
import { poseTable } from "./poses/resolver.mjs";
import { BackgroundSetting, Setting } from "./setting-define.mjs";

const generateFromHorizontalPose = ({
  key,
  weight,
}: BackgroundSetting<"from-horizontal">["poses"][number]) => ({
  key,
  weight: weight ?? 1,
  pose: poseTable["from-horizontal"][key],
});

const generateFromBelowPose = ({
  key,
  weight,
}: BackgroundSetting<"from-below">["poses"][number]) => ({
  key,
  weight: weight ?? 1,
  pose: poseTable["from-below"][key],
});

const generateBackground = ({
  key,
  type,
  weight,
  poses,
}: Setting["characters"][number]["outfits"][number]["backgrounds"][number]) => {
  switch (type) {
    case "from-horizontal":
      return {
        key,
        weight: weight ?? 1,
        background: backgroundTable["from-horizontal"][key],
        poses: poses.map(generateFromHorizontalPose),
      };
    case "from-below":
      return {
        key,
        weight: weight ?? 1,
        background: backgroundTable["from-below"][key],
        poses: poses.map(generateFromBelowPose),
      };
  }
};

const generateOutfit = ({
  key,
  weight,
  backgrounds,
}: Setting["characters"][number]["outfits"][number]) => ({
  key,
  weight: weight ?? 1,
  outfit: outfitTable[key],
  backgrounds: backgrounds.map(generateBackground),
});

const generateCharacter = ({
  key,
  weight,
  outfits,
}: Setting["characters"][number]) => ({
  key,
  weight: weight ?? 1,
  character: characterTable[key],
  outfits: outfits.map(generateOutfit),
});

export const prepare = (settings: Setting[]) =>
  settings.map(
    ({
      key,
      weight,
      characters,
      fixedPrompt,
      optionsBodyJson,
      txt2imgBodyJson,
    }) => ({
      key,
      weight: weight ?? 1,
      fixedPrompt,
      optionsBodyJson,
      txt2imgBodyJson,
      characters: characters.map(generateCharacter),
    }),
  );

export type GenerationDatas = ReturnType<typeof prepare>;
