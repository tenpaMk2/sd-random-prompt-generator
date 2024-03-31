import { PoseDefine } from "../../resolver.mjs";

export const fromHorizontalTwistedTorso = {
  entries: [
    `cowboy shot`,
    `twisted torso`,
    `looking back`,
    `looking at viewer`,
  ],
  visibility: {
    frontHead: true,
    sideHead: true,
    backHead: false,
    frontBreast: true,
    sideBreast: true,
    backBreast: false,
    frontMidriff: false,
    sideMidriff: true,
    backMidriff: true,
    frontHipAndThigh: false,
    sideHipAndThigh: true,
    backHipAndThigh: true,
    foot: false,
    wristAndHand: false,
    aroundBody: true,
  },
  specialVisibility: {
    armpits: false,
    hangingBreasts: false,
    tautClothes: true,
    cleavage: false,
    sideboob: true,
    backboob: false,
    underboobLevel: `invisible`,
    zettaiRyouiki: true,
    insideOfThighs: false,
    upskirt: false,
  },
} as const satisfies PoseDefine;
