import { EmotionTag } from "./tag-defines/emotion.mjs";
import {
  DynamicCandidate,
  DynamicPrompt,
  SingleTagToken,
  Token,
} from "./token.mjs";

const s = SingleTagToken<EmotionTag>;
const c = DynamicCandidate<EmotionTag>;
const d = DynamicPrompt<EmotionTag>;

export const emotionCandidates = {
  smile: new c([`blush`, `smile`]),
  lightSmile: new c([`blush`, `light smile`]),
  smilePartedLips: new c([`blush`, `smile`, `parted lips`]),
  smileOpenMouth: new c([`blush`, `smile`, `:d`, `open mouth`]),
  smileHalfClosedEyes: new c([`blush`, `smile`, `half-closed eyes`]),
  expressionless: new c([`blush`, `expressionless`]),
  surprised: new c([`blush`, `surprised`, `:o`, `open mouth`]),
  embarrassed: new c([`blush`, `nose blush`, `embarrassed`]),
  nervous: new c([`blush`, `nose blush`, `nervous`]),
  flustered: new c([`blush`, `nose blush`, `flustered`]),
  naughtyFace: new c([`blush`, `naughty face`, `smile`, `half-closed eyes`]),
  scowl: new c([`blush`, `nose blush`, `scowl`]),
  oneEyeClosed: new c([
    new s(`blush`),
    new s(`smile`),
    new s(`one eye closed`),
    new d(`one eye closed`, [
      [`;\\)`, `closed mouth`],
      [`;o`, `open mouth`],
    ]),
  ]),
} as const satisfies { [k: string]: DynamicCandidate<EmotionTag> };

export const profileExcludeTags = [
  `one eye closed`,
] as const satisfies EmotionTag[];

export const emotionPreset = {
  chisato: [
    new d(`smile`, [
      emotionCandidates.smile,
      emotionCandidates.lightSmile,
      emotionCandidates.smilePartedLips,
      emotionCandidates.smileOpenMouth,
      emotionCandidates.smileHalfClosedEyes,
      emotionCandidates.expressionless,
      emotionCandidates.surprised,
      emotionCandidates.embarrassed,
      emotionCandidates.nervous,
      emotionCandidates.flustered,
      emotionCandidates.naughtyFace,
      emotionCandidates.scowl,
      emotionCandidates.oneEyeClosed,
    ]),
  ],
} as const satisfies { [k: string]: readonly Token<EmotionTag>[] };
