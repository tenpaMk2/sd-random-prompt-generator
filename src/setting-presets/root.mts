import { Checkpoint, VAE } from "../setting-define.mjs";

export const checkpointAndVAEPreset = {
  sd1: {
    vividorangemix: {
      sd_model_checkpoint: `vividorangemix_v10.safetensors [ff4725f91c]`,
      sd_vae: `blessed2.vae.safetensors`,
    },
    vividorangemixNSFW: {
      sd_model_checkpoint: `vividorangemix_v10NSFW.safetensors [730dd31df7]`,
      sd_vae: `blessed2.vae.safetensors`,
    },
    calico: {
      sd_model_checkpoint: `calicomix_v75.safetensors [c5fc303196]`,
      sd_vae: `None`,
    },
    calicoFlat: {
      sd_model_checkpoint: `calicomixFlatani_v10.safetensors [053eb3f26a]`,
      sd_vae: `None`,
    },
  },
  sdxl: {
    ebaraPony: {
      sd_model_checkpoint: `ebara_pony_1.bakedVAE.safetensors [b6ce8a2bf8]`,
      sd_vae: `None`,
    },
  },
} as const satisfies {
  [k in `sd1` | `sdxl`]: {
    [k in string]: {
      sd_model_checkpoint: Checkpoint["nameHash"];
      sd_vae: VAE;
    };
  };
};

export const imageResolutionPreset = {
  sd1: {
    square: {
      width: 512,
      height: 512,
    },
    portrait: {
      width: 512,
      height: 768,
    },
    landscape: {
      width: 768,
      height: 512,
    },
    tall: {
      width: 512,
      height: 912,
    },
    widescreen: {
      width: 768,
      height: 512,
    },
  },
  sdxl: {
    square: {
      width: 1024,
      height: 1024,
    },
    portrait: {
      width: 864,
      height: 1152,
    },
    landscape: {
      width: 1152,
      height: 864,
    },
    /**
     * 9:16.
     * Not reccomened because this cause long torso problem.
     */
    tall: {
      width: 768,
      height: 1360,
    },
    widescreen: {
      width: 1360,
      height: 768,
    },
  },
} as const satisfies {
  [k in `sd1` | `sdxl`]: {
    [k in `square` | `portrait` | `landscape` | `tall` | `widescreen`]: {
      width: number;
      height: number;
    };
  };
};
