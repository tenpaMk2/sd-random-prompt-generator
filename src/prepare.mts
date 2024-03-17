import { backgroundTable } from "./backgrounds/resolver.mjs";
import { characterTable } from "./characters/resolver.mjs";
import { outfitTable } from "./outfits/resolver.mjs";
import { poseTable } from "./poses/resolver.mjs";
import { BackgroundSetting, Setting } from "./setting-define.mjs";

const generateFromHorizontalPose = ({
  key,
  probability,
}: BackgroundSetting<"from-horizontal">["poses"][number]) => ({
  key,
  probability: probability ?? 1,
  pose: poseTable["from-horizontal"][key],
});

const generateFromBelowPose = ({
  key,
  probability,
}: BackgroundSetting<"from-below">["poses"][number]) => ({
  key,
  probability: probability ?? 1,
  pose: poseTable["from-below"][key],
});

const generateBackground = ({
  key,
  type,
  probability,
  poses,
}: Setting["characters"][number]["outfits"][number]["backgrounds"][number]) => {
  switch (type) {
    case "from-horizontal":
      return {
        key,
        probability: probability ?? 1,
        background: backgroundTable["from-horizontal"][key],
        poses: poses.map(generateFromHorizontalPose),
      };
    case "from-below":
      return {
        key,
        probability: probability ?? 1,
        background: backgroundTable["from-below"][key],
        poses: poses.map(generateFromBelowPose),
      };
  }
};

const generateOutfit = ({
  key,
  probability,
  backgrounds,
}: Setting["characters"][number]["outfits"][number]) => ({
  key,
  probability: probability ?? 1,
  outfit: outfitTable[key],
  backgrounds: backgrounds.map(generateBackground),
});

const generateCharacter = ({
  key,
  probability,
  outfits,
}: Setting["characters"][number]) => ({
  key,
  probability: probability ?? 1,
  character: characterTable[key],
  outfits: outfits.map(generateOutfit),
});

export const prepare = (settings: Setting[]) =>
  settings.map(
    ({
      key,
      probability,
      characters,
      fixedPrompt,
      optionsBodyJson,
      txt2imgBodyJson,
    }) => ({
      key,
      probability: probability ?? 1,
      fixedPrompt,
      optionsBodyJson,
      txt2imgBodyJson,
      characters: characters.map(generateCharacter),
    }),
  );

export type GenerationDatas = ReturnType<typeof prepare>;
