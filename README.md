# sd-random-prompt-generator

[日本語のReadmeはこちら。](./readme-ja.md)

`sd-random-prompt-generator` is the image generator with random prompts via the API of Stable Diffusion web UI.
You can generate random characters, random emotions, random backgrounds and random poses❗

This generator mainly targets SD 1.5.
But, maybe it can be used for SDXL.

You need to edit TypeScript codes.
If you have no skill of any programming language, this tool may be difficult to use...

## ✨ Features

- Build the random prompts from the settings.
- Generate image with the random prompts via the API of Stable Diffusion web UI.
  - No need to open the web UI on your web browser.
- Export random prompts to text.
  - It supports [Dynamic Prompts](https://github.com/adieyal/sd-dynamic-prompts) style. You can copy-paste it to prompts area of web UI.

## 🔌 Requirements

- [Node.js](https://nodejs.org/)
- [Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
  - Extensions: [sd-webui-cutoff](https://github.com/hnmr293/sd-webui-cutoff)
  - Checkpoints, VAE, Textual Inversions, Loras, etc...

## 🍎 Getting Started

### Enable API on the web UI

Add `--api` options to `COMMANDLINE_ARGS` in `webui-user.bat` like below.

```bat
set COMMANDLINE_ARGS=--listen --xformers --api
```

### Setup Cutoff extensions on the web UI

See [the doc](https://github.com/hnmr293/sd-webui-cutoff) .

I strongly recommend to use this extension.
But, if you don't need it, comment out the following codes.

- `src/generator.mts`
  - `generateEachImage()`

```ts
    alwayson_scripts: {
      cutoff: {
        args: [
          true,
          "red,pink,orange,yellow,green,blue,purple,black,white,brown,grey,blonde",
          1.5,
          false,
          false,
          "",
          "Lerp",
          true,
        ],
      },
    },
```

### Install npm packages

```bat
npm run install
```

### Edit `setting.mts`

You need to edit the following file.

- `src/setting.mts`

Change `machineSetting` as you like.

```ts
export const machineSetting = {
  ip: `192.168.10.3`,
  port: 7860,
} as const satisfies MachineSetting;
```

Change `settings` as you like.

```ts
export const settings = [
  {
    key: `all`,
    fixedPrompt: `1girl, solo, masterpiece, best quality,\n`,
    optionsBodyJson: {
      sd_model_checkpoint: `vividorangemix_v10.safetensors [ff4725f91c]`,
      sd_vae: `blessed2.vae.safetensors`,
    },
    txt2imgBodyJson: {
      negative_prompt: `verybadimagenegative_v1.3, (cameltoe:1.5)`,
      sampler_name: `Restart`,
      width: 512,
      height: 768,
      denoising_strength: 0.4,
      enable_hr: true,
      hr_scale: 2.5,
      hr_upscaler: "4x-AnimeSharp",
      hr_second_pass_steps: 30,
    },
    characters: [
      {
        key: `amaburi-isuzu-little-jelly`,
        probability: 1,
        outfits: [
          {
            key: `bikini`,
            probability: 1,
            backgrounds: [
              {
                type: `from-horizontal`,
                key: `ocean`,
                poses: [{ key: `portrait` }, { key: `arms-up` }],
              },
              {
                type: `from-above`,
                key: `bed-sheet`,
                poses: [{ key: `lying-on-bed` }, { key: `lying-on-stomach` }],
              },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies Setting[];
```

Top level settings.

| Key                                    | Meaning                                           |
| :------------------------------------- | :------------------------------------------------ |
| `key`                                  | Just used for filename. Don't affect generation.  |
| `fixedPrompt`                          | Fixed prompt. It attached to top of your prompts. |
| `optionsBodyJson.sd_model_checkpoint`  | Checkpoint (\*1).                                 |
| `optionsBodyJson.sd_vae`               | VAE (\*1).                                        |
| `txt2imgBodyJson.negative_prompt`      | Negative prompts (\*1).                           |
| `txt2imgBodyJson.sampler_name`         | Sampler (\*1).                                    |
| `txt2imgBodyJson.width`                | Image width (\*1).                                |
| `txt2imgBodyJson.height`               | Image height (\*1).                               |
| `txt2imgBodyJson.denoising_strength`   | Upscaler denoising strength (\*1).                |
| `txt2imgBodyJson.enable_hr`            | Upscaler Enable/Disable.                          |
| `txt2imgBodyJson.hr_sclae`             | Upscaler scale (\*1).                             |
| `txt2imgBodyJson.hr_upscaler`          | Upscaler name (\*1).                              |
| `txt2imgBodyJson.hr_second_pass_steps` | Upscaler steps (\*1).                             |
| `characters`                           | Character settings. See below.                    |

Character settings. You can define multiple characters that is picked by `probability` when generating.

| Key           | Meaning                                        |
| :------------ | :--------------------------------------------- |
| `key`         | Character key (\*2).                           |
| `probability` | Probability weight. Optional. Default is `1` . |
| `outfits`     | Outfit settings. See below.                    |

Outfit settings. You can define multiple outfits that is picked by `probability` when generating.

| Key           | Meaning                                        |
| :------------ | :--------------------------------------------- |
| `key`         | Outfit key (\*2).                              |
| `probability` | Probability weight. Optional. Default is `1` . |
| `backgrounds` | Background settings. See below.                |

Background settings. You can define multiple outfits that is picked by `probability` when generating.

| Key           | Meaning                                                   |
| :------------ | :-------------------------------------------------------- |
| `type`        | Camera type. It determines which poses can be used (\*2). |
| `key`         | Background key (\*2).                                     |
| `probability` | Probability weight. Optional. Default is `1` .            |
| `poses`       | Pose settings. See below.                                 |

Pose settings. You can define multiple poses that is picked by `probability` when generating.

| Key           | Meaning                                        |
| :------------ | :--------------------------------------------- |
| `key`         | Pose key (\*2).                                |
| `probability` | Probability weight. Optional. Default is `1` . |

### (\*1): Extend setting defines

Some settings can only be set to defined values.

If you want to extend (add) defines, edit the following file.

| Setting                                | Path                     | Variable or Type define |
| :------------------------------------- | :----------------------- | :---------------------- |
| `optionsBodyJson.sd_model_checkpoint`  | `src/setting-define.mts` | type `Checkpoint`       |
| `optionsBodyJson.sd_vae`               | `src/setting-define.mts` | type `VAE`              |
| `optionsBodyJson.sampler_name`         | `src/setting-define.mts` | type `Sampler`          |
| `optionsBodyJson.width`                | `src/setting-define.mts` | type `Setting`          |
| `optionsBodyJson.height`               | `src/setting-define.mts` | type `Setting`          |
| `optionsBodyJson.denoising_strength`   | `src/setting-define.mts` | type `Setting`          |
| `optionsBodyJson.hr_scale`             | `src/setting-define.mts` | type `Setting`          |
| `optionsBodyJson.hr_upscaler`          | `src/setting-define.mts` | type `Upscaler`         |
| `optionsBodyJson.hr_second_pass_steps` | `src/setting-define.mts` | type `Setting`          |

### (\*2): Character, outfit, background, pose keys (types)

Each `key` is used for determing which defined data set is used.
If you want to know the key list, see the following files.

| Key             | Path                           | Variable or Type define    |
| :-------------- | :----------------------------- | :------------------------- |
| Character key   | `src/characters/resolver.mts`  | variable `characterTable`  |
| Outfit key      | `src/outfits/resolver.mts`     | variable `outfitTable`     |
| Background type | `src/backgrounds/resolver.mts` | type `BackgroundType`      |
| Background key  | `src/backgrounds/resolver.mts` | variable `backgroundTable` |
| Pose key        | `src/poses/resolver.mts`       | variable `poseTable`       |

Basically, the character settings depend on Lora.
You need to install these Loras.
What Loras do you need is described the following files.

- `src/tag-defines/lora.mts`

### Generate and Exports

```shell
npm run exe
```

The tool builds prompts from your setting.
Generate images and asynchronously exports prompts to `outputs` directory.

The tool periodically checks progress.
You will see something like the following in your terminal.

```txt
  10 s: [=========>          ]  49%
  15 s: [===========>        ]  56%
  17 s: [============>       ]  62%
```

## 🔧 Define characters, outfits, backgrounds and poses as you like

🚧 WIP 🚧

## 📖 Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [tsx](https://github.com/privatenumber/tsx)
