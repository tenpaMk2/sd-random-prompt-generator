import { BackgroundType } from "../backgrounds/resolver.mjs";
import { OutfitDefine } from "../outfits/resolver.mjs";
import { NormalEntry } from "../prompt-define.mjs";
import { PoseTag } from "../tag-defines/pose.mjs";
import { Visibility } from "../tag-defines/visibility.mjs";
import { fromAboveFullBodyLying } from "./common/from-above/full-body-lying.mjs";
import { fromAboveLyingOnStomach } from "./common/from-above/lying-on-stomach.mjs";
import { fromAboveWariza } from "./common/from-above/wariza.mjs";
import { fromBelowUpperBody } from "./common/from-below/upper-body.mjs";
import { fromHorizontalAllFours } from "./common/from-horizontal/all-fours.mjs";
import { fromHorizontalArmsUp } from "./common/from-horizontal/arms-up.mjs";
import { fromHorizontalContrapposto } from "./common/from-horizontal/contrapposto.mjs";
import { fromHorizontalDoubleV } from "./common/from-horizontal/double-v.mjs";
import { fromHorizontalFromSideLookingAhead } from "./common/from-horizontal/from-side-looking-ahead.mjs";
import { fromHorizontalHandsOnOwnHips } from "./common/from-horizontal/hands-on-own-hips.mjs";
import { fromHorizontalHeartHands } from "./common/from-horizontal/heart-hands.mjs";
import { fromHorizontalKneelingSpreadLegs } from "./common/from-horizontal/kneeling-spread-legs.mjs";
import { fromHorizontalPortrait } from "./common/from-horizontal/portrait.mjs";
import { fromHorizontalThePoseHeadRest } from "./common/from-horizontal/the-pose-head-rest.mjs";
import { fromHorizontalTwistedTorso } from "./common/from-horizontal/twisted-torso.mjs";
import { fromHorizontalV } from "./common/from-horizontal/v.mjs";
import { fromAboveHoldingBouquet } from "./special/from-above/holding-bouquet.mjs";
import { fromAboveLyingOnBedReachingTowardsViewer } from "./special/from-above/lying-on-bed-reaching-towards-viewer.mjs";
import { fromAboveLyingOnBed } from "./special/from-above/lying-on-bed.mjs";
import { fromBelowCheeringWithPomPoms } from "./special/from-below/cheering-with-pom-poms.mjs";
import { fromBelowHoldingBouquet } from "./special/from-below/holding-bouquet.mjs";
import { fromHorizontalHoldingBouquet } from "./special/from-horizontal/holding-bouquet.mjs";

export type PoseSpecialVisibility = Omit<
  OutfitDefine["specialVisibility"],
  "underboobLevel"
> &
  Readonly<{
    underboobLevel: `from below` | `from horizontal` | `invisible`;
    upskirt: boolean;
  }>;

export const PoseUnderboobLevelOrder = {
  "from below": 0,
  "from horizontal": 1,
  invisible: 2,
} as const satisfies {
  [k in PoseSpecialVisibility["underboobLevel"]]: number;
};

export type PoseDefine = {
  entries: NormalEntry<PoseTag>[];
  visibility: Visibility;
  specialVisibility: PoseSpecialVisibility;
};

export const poseTable = {
  "from-above": {
    "full-body-lying": fromAboveFullBodyLying,
    "lying-on-stomach": fromAboveLyingOnStomach,
    wariza: fromAboveWariza,
    "holding-bouquet": fromAboveHoldingBouquet,
    "lying-on-bed-reaching-towards-viewer":
      fromAboveLyingOnBedReachingTowardsViewer,
    "lying-on-bed": fromAboveLyingOnBed,
  },
  "from-below": {
    "upper-body": fromBelowUpperBody,
    "cheering-with-pom-poms": fromBelowCheeringWithPomPoms,
    "holding-bouquet": fromBelowHoldingBouquet,
  },
  "from-horizontal": {
    "all-fours-from-behind": fromHorizontalAllFours,
    "all-fours": fromHorizontalAllFours,
    "arms-up": fromHorizontalArmsUp,
    contrapposto: fromHorizontalContrapposto,
    "double-v": fromHorizontalDoubleV,
    "from-side-looking-ahead": fromHorizontalFromSideLookingAhead,
    "hands-on-own-hips": fromHorizontalHandsOnOwnHips,
    "heart-hands": fromHorizontalHeartHands,
    "kneeling-spread-legs": fromHorizontalKneelingSpreadLegs,
    portrait: fromHorizontalPortrait,
    "the-pose-head-rest": fromHorizontalThePoseHeadRest,
    "twisted-torso": fromHorizontalTwistedTorso,
    v: fromHorizontalV,
    "holding-bouquet": fromHorizontalHoldingBouquet,
  },
} as const satisfies {
  [k in BackgroundType]: {
    [k: string]: PoseDefine;
  };
};

export type PoseKey = Readonly<{
  "from-above": keyof (typeof poseTable)["from-above"];
  "from-below": keyof (typeof poseTable)["from-below"];
  "from-horizontal": keyof (typeof poseTable)["from-horizontal"];
}>;
