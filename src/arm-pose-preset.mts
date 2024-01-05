import { Entry } from "./prompt-define.mjs";
import { ArmPoseTag } from "./tag-defines/arm-pose.mjs";

const preset = {
  armsUp: [`arms up`],
  armUp: [`arm up`],
  wArms: [`w arms`],
  reachingTowardsViewer: [`reaching towards viewer`],
  v: [`v`],
  handUp: [`hand up`],
  handsOnOwnChest: [`hands on own chest`],
  heartHands: [`heart hands`],
  ownHandsTogether: [`own hands together`],
} as const satisfies { [k: string]: Entry<ArmPoseTag>[] };

export const armPosePreset = {
  ...preset,
  all: [Object.values(preset).map((p) => ({ entries: p }))],
} as const satisfies { [k: string]: Entry<ArmPoseTag>[] };
