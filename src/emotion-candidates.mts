import { EmotionTag } from "./tag-defines/emotion.mjs";
import { TagLeaf } from "./tag-tree.mjs";

const preset = {
  smile: new TagLeaf({ tagEntries: [`blush`, `smile`] }),
  lightSmile: new TagLeaf({ tagEntries: [`blush`, `light smile`] }),
  smilePartedLips: new TagLeaf({
    tagEntries: [`blush`, `smile`, `parted lips`],
  }),
  smileOpenMouth: new TagLeaf({
    tagEntries: [`blush`, `smile`, `:d`, `open mouth`],
  }),
  smileHalfClosedEyes: new TagLeaf({
    tagEntries: [`blush`, `smile`, `half-closed eyes`],
  }),
  expressionless: new TagLeaf({ tagEntries: [`blush`, `expressionless`] }),
  surprised: new TagLeaf({
    tagEntries: [`blush`, `surprised`, `:o`, `open mouth`],
  }),
  embarrassed: new TagLeaf({
    tagEntries: [`blush`, `nose blush`, `embarrassed`],
  }),
  nervous: new TagLeaf({ tagEntries: [`blush`, `nose blush`, `nervous`] }),
  flustered: new TagLeaf({ tagEntries: [`blush`, `nose blush`, `flustered`] }),
  naughtyFace: new TagLeaf({
    tagEntries: [`blush`, `naughty face`, `smile`, `half-closed eyes`],
  }),
  scowl: new TagLeaf({ tagEntries: [`blush`, `nose blush`, `scowl`] }),
  oneEyeClosed: new TagLeaf({
    tagEntries: [`blush`, `smile`, `one eye closed`],
    children: [
      new TagLeaf({ tagEntries: [`;\\)`, `closed mouth`] }),
      new TagLeaf({ tagEntries: [`;o`, `open mouth`] }),
    ],
  }),
} as const satisfies { [k: string]: TagLeaf<EmotionTag> };

export const emotionPreset = {
  ...preset,
  all: new TagLeaf({ tagEntries: [], children: Object.values(preset) }),
  chisato: new TagLeaf({
    tagEntries: [],
    children: [
      preset.smile,
      preset.lightSmile,
      preset.smilePartedLips,
      preset.smileOpenMouth,
      preset.smileHalfClosedEyes,
      preset.expressionless,
      preset.surprised,
      preset.embarrassed,
      preset.nervous,
      preset.flustered,
      preset.naughtyFace,
      preset.scowl,
      preset.oneEyeClosed,
    ],
  }),
};

export const profileExcludeTags = [
  `one eye closed`,
] as const satisfies EmotionTag[];
