import { parse } from "./parser.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { BackgroundTag } from "./tag-defines/background.mjs";
import { CharacterFeatureTag } from "./tag-defines/character-feature.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";
import { tagVisibilities } from "./tag-defines/visible.mjs";
import {
  DynamicCandidate,
  DynamicPrompt,
  SingleTagToken,
  removeDuplicateSingleTagToken,
} from "./token.mjs";
import assert from "node:assert";

const tokenTest1 = new SingleTagToken<EmotionTag>(`blush`);
assert(`${tokenTest1}` === `blush`, `SingleTagToken`);

const tokenTest2 = new SingleTagToken<EmotionTag>(`blush`, { weight: 1.5 });
assert(`${tokenTest2}` === `(blush:1.5)`, `SingleTagToken`);

const tokenTest3 = new DynamicCandidate<BackgroundTag>([`indoors`, `bed`]);
assert(`${tokenTest3}` === `indoors, bed`, `DynamicCandidate`);

const tokenTest4 = new DynamicCandidate<BackgroundTag>([`indoors`, `bed`], {
  multiplier: 1.25,
});
assert(`${tokenTest4}` === `1.25::indoors, bed`, `DynamicCandidate`);

const tokenTest5 = new DynamicPrompt<CharacterFeatureTag>(`red eyes`, [
  [`ahoge`, `long hair`],
  [`red eyes`, `long hair`],
]);
assert(
  `${tokenTest5}` === `{ahoge, long hair|red eyes, long hair}`,
  `DynamicPrompt`,
);

const tokenTest6 = new DynamicPrompt<CharacterFeatureTag>(
  `red eyes`,
  [
    [`ahoge`, `long hair`],
    [`red eyes`, `long hair`],
  ],
  { weight: 2.5 },
);
assert(
  `${tokenTest6}` === `({ahoge, long hair|red eyes, long hair}:2.5)`,
  `DynamicPrompt`,
);

const tokenTest7 = new DynamicPrompt<CharacterFeatureTag>(
  `red eyes`,
  [
    new DynamicCandidate<CharacterFeatureTag>([`ahoge`, `long hair`], {
      multiplier: 1.5,
    }),
    new DynamicCandidate<CharacterFeatureTag>([`red eyes`, `long hair`], {
      multiplier: 3.5,
    }),
  ],
  { weight: 2.5 },
);
assert(
  `${tokenTest7}` === `({1.5::ahoge, long hair|3.5::red eyes, long hair}:2.5)`,
  `DynamicPrompt`,
);

const tokenTest8 = new DynamicPrompt<OutfitAndExposureTag>(`skindentation`, [
  [`dress`, `red dress`],
  [`shirt`, `belt`],
]);
const t8 = tokenTest8.representativeTag;
assert(!tagVisibilities[t8].frontHead, `DynamicPrompt`);
assert(!tagVisibilities[t8].sideHead, `DynamicPrompt`);
assert(!tagVisibilities[t8].backHead, `DynamicPrompt`);
assert(tagVisibilities[t8].frontPortrait, `DynamicPrompt`);
assert(tagVisibilities[t8].sidePortrait, `DynamicPrompt`);
assert(!tagVisibilities[t8].backPortrait, `DynamicPrompt`);
assert(!tagVisibilities[t8].frontMidriff, `DynamicPrompt`);
assert(!tagVisibilities[t8].sideMidriff, `DynamicPrompt`);
assert(!tagVisibilities[t8].backMidriff, `DynamicPrompt`);
assert(tagVisibilities[t8].frontThigh, `DynamicPrompt`);
assert(tagVisibilities[t8].sideThigh, `DynamicPrompt`);
assert(tagVisibilities[t8].backThigh, `DynamicPrompt`);
assert(!tagVisibilities[t8].foot, `DynamicPrompt`);
assert(!tagVisibilities[t8].upskirt, `DynamicPrompt`);

const info = parse({
  key: `test-chara-key`,
  characterFeatureTokens: [new SingleTagToken<CharacterFeatureTag>(`red eyes`)],
  emotionTokens: [
    new DynamicPrompt<EmotionTag>(`smile`, [
      [`blush`, `smile`],
      [`blush`, `one eye closed`],
      [`blush`, `scowl`],
    ]),
  ],
  situations: [
    {
      key: `test-situation-key`,
      backgroundTokens: {
        fromHorizontal: [new SingleTagToken<BackgroundTag>(`beach`)],
        fromBelow: [new SingleTagToken<BackgroundTag>(`beach`)],
        fromAbove: [new SingleTagToken<BackgroundTag>(`beach`)],
        lying: [new SingleTagToken<BackgroundTag>(`beach`)],
        clean: [new SingleTagToken<BackgroundTag>(`beach`)],
      },
      outfitAndExposureTokens: [
        new SingleTagToken<OutfitAndExposureTag>(`collarbone`),
        new SingleTagToken<OutfitAndExposureTag>(`shirt`),
        new SingleTagToken<OutfitAndExposureTag>(`dress`),
        new SingleTagToken<OutfitAndExposureTag>(`skirt`),
        new SingleTagToken<OutfitAndExposureTag>(`thighhighs`),
        new SingleTagToken<OutfitAndExposureTag>(`pantyhose`),
        new SingleTagToken<OutfitAndExposureTag>(`panties`),
        new SingleTagToken<OutfitAndExposureTag>(`barefoot`),
        new SingleTagToken<OutfitAndExposureTag>(`armpits`),
      ],
    },
  ],
});
assert(info[0].key === `test-situation-key`, `parse`);
assert(`${info[0].frontHeadTokens}` === `red eyes`, `parse`);
assert(`${info[0].sideHeadTokens}` === `red eyes`, `parse`);
assert(`${info[0].backHeadTokens}` === ``, `parse`);

assert(
  info[0].frontPortraitTokens.join(`, `) === `collarbone, shirt, dress`,
  `parse`,
);
assert(
  info[0].sidePortraitTokens.join(`, `) === `collarbone, shirt, dress`,
  `parse`,
);
assert(info[0].backPortraitTokens.join(`, `) === `shirt, dress`, `parse`);
assert(
  info[0].frontMidriffTokens.join(`, `) === `shirt, dress, skirt, panties`,
  `parse: ${info[0].frontMidriffTokens.join(`, `)}`,
);
assert(
  info[0].sideMidriffTokens.join(`, `) === `shirt, dress, skirt, panties`,
  `parse: ${info[0].sideMidriffTokens.join(`, `)}`,
);
assert(
  info[0].backMidriffTokens.join(`, `) === `shirt, dress, skirt, panties`,
  `parse: ${info[0].backMidriffTokens.join(`, `)}`,
);
assert(
  info[0].frontThighTokens.join(`, `) ===
    `dress, skirt, thighhighs, pantyhose, panties`,
  `parse: ${info[0].frontThighTokens.join(`, `)}`,
);
assert(
  info[0].sideThighTokens.join(`, `) ===
    `dress, skirt, thighhighs, pantyhose, panties`,
  `parse: ${info[0].sideThighTokens.join(`, `)}`,
);
assert(
  info[0].backThighTokens.join(`, `) ===
    `dress, skirt, thighhighs, pantyhose, panties`,
  `parse: ${info[0].backThighTokens.join(`, `)}`,
);
assert(
  info[0].footTokens.join(`, `) === `thighhighs, pantyhose, barefoot`,
  `parse: ${info[0].footTokens.join(`, `)}`,
);
assert(
  info[0].upskirtTokens.join(`, `) === `pantyhose, panties`,
  `parse: ${info[0].upskirtTokens.join(`, `)}`,
);

assert(
  info[0].frontEmotionTokens.join(`, `) ===
    `{blush, smile|blush, one eye closed|blush, scowl}`,
  `parse: ${info[0].frontEmotionTokens.join(`, `)}`,
);
assert(
  info[0].profileEmotionTokens.join(`, `) ===
    `{blush, smile|blush, scowl}, profile`,
  `parse: ${info[0].profileEmotionTokens.join(`, `)}`,
);

assert(
  info[0].isArmpitsExposure,
  `parse.isArmpitsExposure: ${info[0].isArmpitsExposure}`,
);

assert(
  `${info[0].background.fromHorizontal}` === `beach`,
  `parse.background.fromHorizontal: ${info[0].background.fromHorizontal}`,
);

const unique = removeDuplicateSingleTagToken([
  new SingleTagToken<Tag>(`red eyes`, { weight: 1.5 }),
  new SingleTagToken<Tag>(`ahoge`),
  new SingleTagToken<Tag>(`red eyes`, { weight: 2 }),
  new SingleTagToken<Tag>(`all fours`),
]);

assert(
  `${unique.join(`, `)}` === `(red eyes:1.5), ahoge, all fours`,
  `removeDuplicateSingleTagToken: ${unique.join(`, `)}`,
);
