import { ArmPoseTag } from "./tag-defines/arm-pose.mjs";
import { TagLeaf } from "./tag-tree.mjs";

const preset = {
  armsUp: new TagLeaf({ tagEntries: [`arms up`] }),
  reachingTowardsViewer: new TagLeaf({
    tagEntries: [`reaching towards viewer`],
  }),
  v: new TagLeaf({ tagEntries: [`v`] }),
  handUp: new TagLeaf({ tagEntries: [`hand up`] }),
  handsOnOwnChest: new TagLeaf({ tagEntries: [`hands on own chest`] }),
  heartHands: new TagLeaf({ tagEntries: [`heart hands`] }),
  ownHandsTogether: new TagLeaf({ tagEntries: [`own hands together`] }),
} as const satisfies { [k: string]: TagLeaf<ArmPoseTag> };

export const armPosePreset = {
  ...preset,
  all: new TagLeaf({ tagEntries: [], children: Object.values(preset) }),
};
