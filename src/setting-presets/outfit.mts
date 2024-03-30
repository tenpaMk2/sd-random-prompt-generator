import { OutfitKey } from "../outfits/resolver.mjs";
import { OutfitSetting } from "../setting-define.mjs";
import {
  fromAbovePosesPreset,
  fromBelowPosesPreset,
  fromHorizontalPosesPreset,
} from "./pose.mjs";

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
      poses: [{ key: `lying-on-bed` }, { key: `full-body-lying` }],
    },
  ],
} as const satisfies OutfitSetting;

const bikini = {
  key: `bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `ocean-beach`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `ocean-beach`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const bridalLingerie = {
  key: `bridal-lingerie`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `wedding`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: [{ key: `holding-bouquet` }],
    },
    {
      type: `from-below`,
      key: `wedding`,
      poses: [{ key: `holding-bouquet` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `wedding`,
      poses: [{ key: `holding-bouquet` }, { key: `wariza` }],
    },
  ],
} as const satisfies OutfitSetting;

const camisoleDenimShorts = {
  key: `camisole-denim-shorts`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `city`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `city`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `brick floor`,
      poses: [{ key: `wariza` }],
    },
  ],
} as const satisfies OutfitSetting;

const casualMiniskirt = {
  key: `casual-miniskirt`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `city`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `city`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `brick floor`,
      poses: [{ key: `wariza` }],
    },
  ],
} as const satisfies OutfitSetting;

const cheerleader = {
  key: `cheerleader`,
  backgrounds: [
    {
      type: `from-below`,
      key: `blue-sky-confetti`,
      poses: [{ key: `cheering-with-pom-poms` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const chinaDress = {
  key: `china-dress`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const cowPrintBikini = {
  key: `cow-print-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `grass-blue-sky`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const maidBikini = {
  key: `maid-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `cafe-window`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const microBikini = {
  key: `micro-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `ocean`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `ocean-beach`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const playboyBunny = {
  key: `playboy-bunny`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `casino`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-heart-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-below`,
      key: `ceiling`,
      poses: [{ key: `upper-body` }],
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const revealingMiko = {
  key: `revealing-miko`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const santaBikini = {
  key: `santa-bikini`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `christmas`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `christmas`,
      poses: [{ key: `all-fours` }],
    },
    {
      type: `from-above`,
      key: `christmas`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `bed-sheet`,
      poses: fromAbovePosesPreset.onBed,
    },
    {
      type: `from-below`,
      key: `christmas`,
      poses: [{ key: `upper-body` }],
    },
  ],
} as const satisfies OutfitSetting;

const sukumizuThighhighs = {
  key: `sukumizu-thighhighs`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      probability: 3,
      poses: fromAbovePosesPreset.usual,
    },
  ],
} as const satisfies OutfitSetting;

const danmachiNochekaiserHestia = {
  key: `danmachi-nochekaiser-hestia`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const mahoakoNotekagaLocomusica = {
  key: `mahoako-notekaga-locomusica`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const prismaIllyaAm7CoffeeloveChloeBeast = {
  key: `prisma-illya-chloe-beast`,
  backgrounds: [
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.usual,
    },
    {
      type: `from-horizontal`,
      key: `colorful-backgrounds`,
      poses: fromHorizontalPosesPreset.onFloor,
    },
    {
      type: `from-below`,
      key: `blue-sky`,
      poses: fromBelowPosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.usual,
    },
    {
      type: `from-above`,
      key: `steaming-bed-sheet-spoken-heart`,
      poses: fromAbovePosesPreset.onBed,
    },
  ],
} as const satisfies OutfitSetting;

const sasuoniFirstHighSchoolUniform = (variation: `pantyhose` | `thighhighs`) =>
  ({
    key:
      variation === `pantyhose`
        ? `sasuoni-eft-first-high-school-uniform-pantyhose`
        : `sasuoni-eft-first-high-school-uniform-thighhighs`,
    backgrounds: [
      {
        type: `from-horizontal`,
        key: `indoors`,
        poses: fromHorizontalPosesPreset.usual,
      },
      {
        type: `from-below`,
        key: `ceiling`,
        poses: [{ key: `upper-body` }],
      },
      {
        type: `from-above`,
        key: `bed-sheet`,
        poses: fromAbovePosesPreset.usual,
      },
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
  "sasuoni-eft-first-high-school-uniform-pantyhose": [
    sasuoniFirstHighSchoolUniform(`pantyhose`),
  ],
  "sasuoni-eft-first-high-school-uniform-thighhighs": [
    sasuoniFirstHighSchoolUniform(`thighhighs`),
  ],
  usual: [
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
  [k in OutfitKey | `usual`]: OutfitSetting[];
};
