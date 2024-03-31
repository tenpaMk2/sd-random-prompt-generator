import { PoseDefine } from "../../resolver.mjs";

export const fromHorizontalFromSideLookingAhead = {
  entries: [`cowboy shot`, `from side`, `looking ahead`, `profile`],
  visibility: {
    frontHead: true,
    sideHead: true,
    backHead: true,
    frontBreast: false,
    sideBreast: true,
    backBreast: false,
    frontMidriff: false,
    sideMidriff: true,
    backMidriff: false,
    frontHipAndThigh: false,
    sideHipAndThigh: true,
    backHipAndThigh: false,
    foot: false,
    wristAndHand: true,
    aroundBody: true,
  },
  specialVisibility: {
    armpits: false,
    hangingBreasts: false,
    tautClothes: false,
    cleavage: false,
    sideboob: true,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: true,
    insideOfThighs: false,
    upskirt: false,
  },
} as const satisfies PoseDefine;
