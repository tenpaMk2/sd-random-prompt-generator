import { PoseDefine } from "../../resolver.mjs";

export const fromHorizontalKneelingSpreadLegs = {
  entries: [`kneeling`, `spread legs`, `looking at viewer`],
  visibility: {
    frontHead: true,
    sideHead: true,
    backHead: false,
    frontBreast: true,
    sideBreast: true,
    backBreast: false,
    frontMidriff: true,
    sideMidriff: true,
    backMidriff: false,
    frontHipAndThigh: true,
    sideHipAndThigh: false,
    backHipAndThigh: false,
    foot: true,
    wristAndHand: true,
    aroundBody: true,
  },
  specialVisibility: {
    armpits: false,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: true,
    sideboob: false,
    backboob: false,
    underboobLevel: `from horizontal`,
    zettaiRyouiki: true,
    insideOfThighs: false,
    upskirt: false,
  },
} as const satisfies PoseDefine;
