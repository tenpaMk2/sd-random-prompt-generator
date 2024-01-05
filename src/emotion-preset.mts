import { Entry } from "./prompt-define.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";

const preset = {
  smile: [`blush`, `smile`],
  lightSmile: [`blush`, `light smile`],
  smilePartedLips: [`blush`, `smile`, `parted lips`],
  smileOpenMouth: [`blush`, `smile`, `:d`, `open mouth`],
  smileHalfClosedEyes: [`blush`, `smile`, `half-closed eyes`],
  expressionless: [`blush`, `expressionless`],
  surprised: [`blush`, `surprised`, `:o`, `open mouth`],
  embarrassed: [`blush`, `nose blush`, `embarrassed`],
  nervous: [`blush`, `nose blush`, `nervous`],
  flustered: [`blush`, `nose blush`, `flustered`],
  naughtyFace: [`blush`, `naughty face`, `smile`, `half-closed eyes`],
  scowl: [`blush`, `nose blush`, `scowl`],
  oneEyeClosed: [
    `blush`,
    `smile`,
    `one eye closed`,
    [{ entries: [`;\\)`, `closed mouth`] }, { entries: [`;o`, `open mouth`] }],
  ],
} as const satisfies { [k: string]: Entry<EmotionTag>[] };

export const emotionPreset = {
  ...preset,
  all: [Object.values(preset).map((p) => ({ entries: p }))],
  chisato: [
    [
      { entries: preset.smile },
      { entries: preset.lightSmile },
      { entries: preset.smilePartedLips },
      { entries: preset.smileOpenMouth },
      { entries: preset.smileHalfClosedEyes },
      { entries: preset.expressionless },
      { entries: preset.surprised },
      { entries: preset.embarrassed },
      { entries: preset.nervous },
      { entries: preset.flustered },
      { entries: preset.naughtyFace },
      { entries: preset.scowl },
      { entries: preset.oneEyeClosed },
    ],
  ],
  shokuhoMisaki: [
    [
      { entries: preset.smile },
      { entries: preset.lightSmile },
      { entries: preset.smilePartedLips },
      { entries: preset.smileOpenMouth },
      { entries: preset.smileHalfClosedEyes },
      { entries: preset.expressionless },
      { entries: preset.surprised },
      { entries: preset.embarrassed },
      { entries: preset.nervous },
      { entries: preset.flustered },
      { entries: preset.naughtyFace },
      { entries: preset.scowl },
      { entries: preset.oneEyeClosed },
    ],
  ],
} as const satisfies { [k: string]: Entry<EmotionTag>[] };
