import { OutfitKey } from "../outfits/resolver.mjs";
import { PoseKey } from "../poses/resolver.mjs";
import { OutfitSetting } from "../setting-define.mjs";
import { backgroundsPreset } from "./background.mjs";

const createOnePosePreset = (
  backgrounds: OutfitSetting["backgrounds"],
  pose:
    | PoseKey["from-above"]
    | PoseKey["from-below"]
    | PoseKey["from-horizontal"],
) =>
  backgrounds.map(
    (x) =>
      ({
        ...x,
        poses: x.poses.filter((p) => p.key === pose),
      }) as typeof x,
  );

const testOutfit = {
  key: `test-outfit`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: [{ key: `arms-up` }, { key: `portrait` }],
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: [{ key: `on-bed-lying` }, { key: `on-bed-lying-on-stomach` }],
    },
  ],
} as const satisfies OutfitSetting;

const bikini = {
  key: `bikini`,
  backgrounds: [
    ...backgroundsPreset.oceanBeach,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const bridalLingerie = {
  key: `bridal-lingerie`,
  backgrounds: [
    ...backgroundsPreset.wedding,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const camisoleDenimShorts = {
  key: `camisole-denim-shorts`,
  backgrounds: [
    ...backgroundsPreset.city,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const casualMiniskirt = {
  key: `casual-miniskirt`,
  backgrounds: [
    ...backgroundsPreset.city,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const cheerleader = {
  key: `cheerleader`,
  backgrounds: [
    ...backgroundsPreset.blueSkyConfettiCheering.map((x) => ({
      ...x,
      probability: 3,
    })),
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const chinaDress = {
  key: `china-dress`,
  backgrounds: [
    ...backgroundsPreset.blueSky,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const cowPrintBikini = {
  key: `cow-print-bikini`,
  backgrounds: [
    ...backgroundsPreset.blueSky,
    ...backgroundsPreset.grass,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const maidBikini = {
  key: `maid-bikini`,
  backgrounds: [
    ...backgroundsPreset.cafe,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const microBikini = {
  key: `micro-bikini`,
  backgrounds: [
    ...backgroundsPreset.oceanBeach,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const playboyBunny = {
  key: `playboy-bunny`,
  backgrounds: [
    ...backgroundsPreset.casino,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const revealingMiko = {
  key: `revealing-miko`,
  backgrounds: [
    ...backgroundsPreset.blueSky,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const santaBikini = {
  key: `santa-bikini`,
  backgrounds: [
    ...backgroundsPreset.christmas,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const sukumizuThighhighs = {
  key: `sukumizu-thighhighs`,
  backgrounds: [
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const danmachiNochekaiserHestia = {
  key: `danmachi-nochekaiser-hestia`,
  backgrounds: [
    ...backgroundsPreset.blueSky,
    ...backgroundsPreset.grass,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const mahoakoNotekagaLocomusica = {
  key: `mahoako-notekaga-locomusica`,
  backgrounds: [
    ...backgroundsPreset.city,
    ...backgroundsPreset.blueSky,
    ...backgroundsPreset.grass,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
  ],
} as const satisfies OutfitSetting;

const prismaIllyaAm7CoffeeloveChloeBeast = {
  key: `prisma-illya-chloe-beast`,
  backgrounds: [
    ...backgroundsPreset.blueSky,
    ...backgroundsPreset.steamingBedSheetSpokenHeart,
    ...backgroundsPreset.bedSheetWindow,
    ...backgroundsPreset.colorfulHeartBackgrounds,
    ...createOnePosePreset(backgroundsPreset.blueSky, `paw-pose`),
    ...createOnePosePreset(
      backgroundsPreset.steamingBedSheetSpokenHeart,
      `paw-pose`,
    ),
    ...createOnePosePreset(backgroundsPreset.bedSheetWindow, `paw-pose`),
    ...createOnePosePreset(
      backgroundsPreset.colorfulHeartBackgrounds,
      `paw-pose`,
    ),
  ],
} as const satisfies OutfitSetting;

const prismaIllyaAm7CoffeeloveIllyaBeast = {
  key: `prisma-illya-illya-beast`,
  backgrounds: prismaIllyaAm7CoffeeloveChloeBeast.backgrounds,
} as const satisfies OutfitSetting;

const sasuoniFirstHighSchoolUniform = (variation: `pantyhose` | `thighhighs`) =>
  ({
    key:
      variation === `pantyhose`
        ? `sasuoni-eft-first-high-school-uniform-pantyhose`
        : `sasuoni-eft-first-high-school-uniform-thighhighs`,
    backgrounds: [
      ...backgroundsPreset.blueSky,
      ...backgroundsPreset.steamingBedSheetSpokenHeart,
      ...backgroundsPreset.bedSheetWindow,
      ...backgroundsPreset.colorfulHeartBackgrounds,
    ],
  }) as const satisfies OutfitSetting;

export const outfitsPreset = {
  "test-outfit": [testOutfit],
  bikini: [bikini],
  "bridal-lingerie": [bridalLingerie],
  "camisole-denim-shorts": [camisoleDenimShorts],
  "casual-miniskirt": [casualMiniskirt],
  cheerleader: [cheerleader],
  "china-dress": [chinaDress],
  "cow-print-bikini": [cowPrintBikini],
  "maid-bikini": [maidBikini],
  "micro-bikini": [microBikini],
  "playboy-bunny": [playboyBunny],
  "revealing-miko": [revealingMiko],
  "santa-bikini": [santaBikini],
  "sukumizu-thighhighs": [sukumizuThighhighs],
  "danmachi-nochekaiser-hestia": [danmachiNochekaiserHestia],
  "mahoako-notekaga-locomusica": [mahoakoNotekagaLocomusica],
  "prisma-illya-chloe-beast": [prismaIllyaAm7CoffeeloveChloeBeast],
  "prisma-illya-illya-beast": [prismaIllyaAm7CoffeeloveIllyaBeast],
  "sasuoni-eft-first-high-school-uniform-pantyhose": [
    sasuoniFirstHighSchoolUniform(`pantyhose`),
  ],
  "sasuoni-eft-first-high-school-uniform-thighhighs": [
    sasuoniFirstHighSchoolUniform(`thighhighs`),
  ],
  cosplay: [
    bikini,
    bridalLingerie,
    camisoleDenimShorts,
    casualMiniskirt,
    cheerleader,
    chinaDress,
    cowPrintBikini,
    maidBikini,
    microBikini,
    playboyBunny,
    revealingMiko,
    santaBikini,
    sukumizuThighhighs,
  ],
} as const satisfies {
  [k in OutfitKey | `cosplay`]: OutfitSetting[];
};
