import { BackgroundKey, BackgroundType } from "./backgrounds/resolver.mjs";
import { CharacterKey } from "./characters/resolver.mjs";
import { OutfitKey } from "./outfits/resolver.mjs";
import { PoseKey } from "./poses/resolver.mjs";

const allCheckpoints = [
  `vividorangemix_v10.safetensors [ff4725f91c]`,
  `vividorangemix_v10NSFW.safetensors [730dd31df7]`,
  `calicomix_v75.safetensors [c5fc303196]`,
  `calicomixFlatani_v10.safetensors [053eb3f26a]`,
] as const satisfies string[];
type Checkpoint = (typeof allCheckpoints)[number];

const allVAEs = [
  `None`,
  `blessed2.vae.safetensors`,
] as const satisfies string[];
type VAE = (typeof allVAEs)[number];

const allSamplers = [`Restart`] as const satisfies string[];
type Sampler = (typeof allSamplers)[number];

export type BackgroundSetting<T extends BackgroundType> = Readonly<{
  type: T;
  key: BackgroundKey[T];
  weight?: number;
  poses: {
    key: PoseKey[T];
    weight?: number;
  }[];
}>;

type OutfitSetting = Readonly<{
  key: OutfitKey;
  weight?: number;
  backgrounds: (
    | BackgroundSetting<`from-horizontal`>
    | BackgroundSetting<`from-below`>
  )[];
}>;

type CharacterSetting = Readonly<{
  key: CharacterKey;
  weight?: number;
  outfits: OutfitSetting[];
}>;

export type MachineSetting = Readonly<{
  ip: string;
  port: number;
}>;

export type Setting = Readonly<{
  key: string; // Generation name.
  weight?: number;
  fixedPrompt: string;
  optionsBodyJson: {
    sd_model_checkpoint: Checkpoint;
    sd_vae: VAE;
  };
  txt2imgBodyJson: {
    negative_prompt: string;
    sampler_name: Sampler;
    width: 512 | 768;
    height: 512 | 768;
    denoising_strength: 0.3 | 0.4 | 0.5 | 0.6;
    enable_hr: boolean;
    hr_scale: 1.5 | 2 | 2.5;
    hr_upscaler: "4x-AnimeSharp";
    hr_second_pass_steps: 0 | 30;
  };
  characters: CharacterSetting[];
}>;
