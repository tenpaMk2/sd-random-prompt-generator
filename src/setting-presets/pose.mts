import { PoseSetting } from "../setting-define.mjs";

export const fromAbovePosesPreset = {
  usual: [{ key: `wariza` }],
  onFloor: [
    // { key: `full-body-lying` },
    { key: `lying-on-stomach` },
  ],
  onBed: [
    { key: `lying-on-bed` },
    { key: `lying-on-bed-reaching-towards-viewer` },
    // TODO: on stomach on bed
  ],
  wedding: [{ key: `holding-bouquet` }],
} as const satisfies {
  [k in string]: PoseSetting<"from-above">[];
};

export const fromBelowPosesPreset = {
  usual: [{ key: `upper-body` }],
  cheering: [{ key: `cheering-with-pom-poms` }],
  wedding: [{ key: `holding-bouquet` }],
} as const satisfies {
  [k in string]: PoseSetting<"from-below">[];
};

export const fromHorizontalPosesPreset = {
  usual: [
    { key: `arms-up` },
    { key: `contrapposto` },
    { key: `double-v` },
    { key: `from-side-looking-ahead` },
    { key: `hands-on-own-hips` },
    { key: `heart-hands` },
    { key: `portrait` },
    { key: `twisted-torso` },
    { key: `v` },
  ],
  onFloor: [
    { key: `all-fours-from-behind` },
    { key: `all-fours` },
    { key: `kneeling-spread-legs` },
    { key: `the-pose-head-rest` },
  ],
  wedding: [{ key: `holding-bouquet` }],
  // TODO: skirt
} as const satisfies {
  [k in string]: PoseSetting<"from-horizontal">[];
};
