import { ArmPoseTag } from "./tag-defines/arm-pose.mjs";
import {
  DynamicCandidate,
  DynamicPrompt,
  SingleTagToken,
  Token,
} from "./token.mjs";

const s = SingleTagToken<ArmPoseTag>;
const c = DynamicCandidate<ArmPoseTag>;
const d = DynamicPrompt<ArmPoseTag>;

export const armposeCandidates = {
  armsUp: new c([`arms up`]),
  reachingTowardsViewer: new c([`reaching towards viewer`]),
  v: new c([`v`]),
  handUp: new c([`hand up`]),
  handsOnOwnChest: new c([`hands on own chest`]),
  heartHands: new c([`heart hands`]),
  ownHandsTogether: new c([`own hands together`]),
} as const satisfies { [k: string]: DynamicCandidate<ArmPoseTag> };

export const armposePreset = {
  all: [
    new d(`arms up`, [
      armposeCandidates.armsUp,
      armposeCandidates.reachingTowardsViewer,
      armposeCandidates.v,
      armposeCandidates.handUp,
      armposeCandidates.handsOnOwnChest,
      armposeCandidates.heartHands,
      armposeCandidates.ownHandsTogether,
    ]),
  ] as Token<ArmPoseTag>[],
} as const satisfies { [k: string]: readonly Token<ArmPoseTag>[] };
