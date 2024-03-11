import { Entry } from "../prompt-define.mjs";
import { EmotionTag } from "../tag-defines/emotion.mjs";

const emotionPresetPiece = {
  smile: [`blush`, `smile`],
  lightSmile: [`blush`, `light smile`],
  smilePartedLips: [`blush`, `smile`, `parted lips`],
  smileOpenMouth: [`blush`, `smile`, `:d`, `open mouth`],
  smileClosedMouth: [`blush`, `smile`, `closed mouth`],
  smileHalfClosedEyes: [`blush`, `smile`, `half-closed eyes`],
  expressionless: [`blush`, `expressionless`],
  surprised: [`blush`, `surprised`, `:o`, `open mouth`, `!`],
  confused: [`blush`, `nose blush`, `confused`, `?`],
  embarrassed: [`blush`, `nose blush`, `embarrassed`],
  nervous: [`blush`, `nose blush`, `nervous`],
  flustered: [`blush`, `nose blush`, `flustered`],
  seductiveSmile: [`blush`, `seductive smile`],
  naughtyFace: [`blush`, `naughty face`, `smile`, `half-closed eyes`],
  scowl: [`blush`, `nose blush`, `scowl`],
  oneEyeClosed: [
    `blush`,
    `smile`,
    `one eye closed`,
    [{ entries: [`;\\)`, `closed mouth`] }, { entries: [`;o`, `open mouth`] }],
  ],
} as const satisfies { [k in string]: Entry<EmotionTag>[] };

export const emotionPreset = {
  cute: [
    [
      { entries: emotionPresetPiece.smile, probability: 3 },
      { entries: emotionPresetPiece.smilePartedLips },
      { entries: emotionPresetPiece.smileOpenMouth },
      { entries: emotionPresetPiece.smileHalfClosedEyes },
      { entries: emotionPresetPiece.expressionless },
      { entries: emotionPresetPiece.surprised },
      { entries: emotionPresetPiece.confused },
      { entries: emotionPresetPiece.embarrassed },
      { entries: emotionPresetPiece.nervous },
      { entries: emotionPresetPiece.flustered },
      { entries: emotionPresetPiece.seductiveSmile, probability: 3 },
      { entries: emotionPresetPiece.naughtyFace },
      { entries: emotionPresetPiece.oneEyeClosed, probability: 2 },
    ],
  ],
  serious: [
    [
      { entries: emotionPresetPiece.lightSmile, probability: 3 },
      { entries: emotionPresetPiece.smilePartedLips },
      { entries: emotionPresetPiece.smileHalfClosedEyes },
      { entries: emotionPresetPiece.expressionless },
      { entries: emotionPresetPiece.surprised },
      { entries: emotionPresetPiece.embarrassed },
      { entries: emotionPresetPiece.nervous },
      { entries: emotionPresetPiece.flustered },
      { entries: emotionPresetPiece.seductiveSmile, probability: 3 },
      { entries: emotionPresetPiece.naughtyFace },
      { entries: emotionPresetPiece.scowl },
    ],
  ],
  // TODO: genki, mukuchi, tsundere
} as const satisfies { [k in string]: Entry<EmotionTag>[] };
