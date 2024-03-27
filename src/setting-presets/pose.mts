import { PoseSetting } from "../setting-define.mjs";

export const fromHorizontalPosesPreset = {
  usual: [
    { key: `portrait` },
    { key: `contrapposto` },
    { key: `hands-on-own-hips` },
    { key: `v` },
    { key: `double-v` },
    { key: `arms-up` },
    { key: `heart-hands` },
    { key: `cowboy-shot-from-side` },
    { key: `twisted-torso` },
  ],
  onFloor: [
    { key: `all-fours` },
    { key: `all-fours-from-behind` },
    { key: `kneeling` },
    { key: `the-pose-head-rest` },
  ],
} as const satisfies {
  [k in string]: PoseSetting<"from-horizontal">[];
};

export const fromBelowPosesPreset = {
  usual: [{ key: `upper-body` }],
} as const satisfies {
  [k in string]: PoseSetting<"from-below">[];
};

export const fromAbovePosesPreset = {
  usual: [{ key: `wariza` }],
  onBed: [
    { key: `lying-on-bed` },
    { key: `lying-on-bed-reaching-towards-viewer` },
    { key: `lying-on-stomach` },
  ],
} as const satisfies {
  [k in string]: PoseSetting<"from-above">[];
};
