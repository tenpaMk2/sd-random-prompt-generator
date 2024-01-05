import { parse } from "./parser.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { TagLeaf, Token } from "./tag-tree.mjs";
import assert from "node:assert";

// const tokenTest1 = new SingleTagToken<EmotionTag>(`blush`);
// assert(`${tokenTest1}` === `blush`, `SingleTagToken`);

// const tokenTest2 = new SingleTagToken<EmotionTag>(`blush`, { weight: 1.5 });
// assert(`${tokenTest2}` === `(blush:1.5)`, `SingleTagToken`);

// const tokenTest3 = new DynamicCandidate<BackgroundTag>([`indoors`, `bed`]);
// assert(`${tokenTest3}` === `indoors, bed`, `DynamicCandidate`);

// const tokenTest4 = new DynamicCandidate<BackgroundTag>([`indoors`, `bed`], {
//   multiplier: 1.25,
// });
// assert(`${tokenTest4}` === `1.25::indoors, bed`, `DynamicCandidate`);

// const tokenTest5 = new DynamicPrompt<CharacterFeatureTag>(`red eyes`, [
//   [`ahoge`, `long hair`],
//   [`red eyes`, `long hair`],
// ]);
// assert(
//   `${tokenTest5}` === `{ahoge, long hair|red eyes, long hair}`,
//   `DynamicPrompt`,
// );

// const tokenTest6 = new DynamicPrompt<CharacterFeatureTag>(
//   `red eyes`,
//   [
//     [`ahoge`, `long hair`],
//     [`red eyes`, `long hair`],
//   ],
//   { weight: 2.5 },
// );
// assert(
//   `${tokenTest6}` === `({ahoge, long hair|red eyes, long hair}:2.5)`,
//   `DynamicPrompt`,
// );

// const tokenTest7 = new DynamicPrompt<CharacterFeatureTag>(
//   `red eyes`,
//   [
//     new DynamicCandidate<CharacterFeatureTag>([`ahoge`, `long hair`], {
//       multiplier: 1.5,
//     }),
//     new DynamicCandidate<CharacterFeatureTag>([`red eyes`, `long hair`], {
//       multiplier: 3.5,
//     }),
//   ],
//   { weight: 2.5 },
// );
// assert(
//   `${tokenTest7}` === `({1.5::ahoge, long hair|3.5::red eyes, long hair}:2.5)`,
//   `DynamicPrompt`,
// );

// const tokenTest8 = new DynamicPrompt<OutfitAndExposureTag>(`skindentation`, [
//   [`dress`, `red dress`],
//   [`shirt`, `belt`],
// ]);
// const t8 = tokenTest8.representativeTag;
// assert(!tagVisibilities[t8].frontHead, `DynamicPrompt`);
// assert(!tagVisibilities[t8].sideHead, `DynamicPrompt`);
// assert(!tagVisibilities[t8].backHead, `DynamicPrompt`);
// assert(tagVisibilities[t8].frontBreast, `DynamicPrompt`);
// assert(tagVisibilities[t8].sideBreast, `DynamicPrompt`);
// assert(!tagVisibilities[t8].backBreast, `DynamicPrompt`);
// assert(!tagVisibilities[t8].frontMidriff, `DynamicPrompt`);
// assert(!tagVisibilities[t8].sideMidriff, `DynamicPrompt`);
// assert(!tagVisibilities[t8].backMidriff, `DynamicPrompt`);
// assert(tagVisibilities[t8].frontHipAndThigh, `DynamicPrompt`);
// assert(tagVisibilities[t8].sideHipAndThigh, `DynamicPrompt`);
// assert(tagVisibilities[t8].backHipAndThigh, `DynamicPrompt`);
// assert(!tagVisibilities[t8].foot, `DynamicPrompt`);
// assert(!tagVisibilities[t8].upskirt, `DynamicPrompt`);

const info = parse({
  key: `test-chara-key`,
  characterFeature: new TagLeaf({
    tagEntries: [
      `red eyes`,
      { tag: `sparkling eyes`, weight: 1.5 },
      `thick thighs`,
    ],
  }),
  emotion: new TagLeaf({
    tagEntries: [],
    children: [
      new TagLeaf({ tagEntries: [`smile`], probability: 3 }),
      new TagLeaf({ tagEntries: [`scowl`] }),
      new TagLeaf({ tagEntries: [`blush`, `embarrassed`] }),
    ],
  }),
  situations: [
    {
      key: `test-situation-key`,
      background: {
        fromHorizontal: new TagLeaf({ tagEntries: [`beach`] }),
        fromBelow: new TagLeaf({ tagEntries: [`beach`] }),
        fromAbove: new TagLeaf({ tagEntries: [`beach`] }),
        lying: new TagLeaf({ tagEntries: [`beach`] }),
        clean: new TagLeaf({ tagEntries: [`beach`] }),
      },
      outfitAndExposure: new TagLeaf({
        tagEntries: [`tokiwadai school uniform`, `skirt`, `socks`],
      }),
      upskirt: new TagLeaf({
        tagEntries: [],
      }),
      whenRemoveShoes: {
        excludeTags: [`socks`],
        additionalFootTokensAfterRemoving: [new Token(`barefoot`)],
      },
    },
  ],
});
assert(info[0].key === `test-situation-key`, `parse`);
// assert(`${info[0].personCandidateInfos}` === `red eyes`, `parse`);
// assert(`${info[0].sideHeadTokens}` === `red eyes`, `parse`);
// assert(`${info[0].backHeadTokens}` === ``, `parse`);

// assert(
//   info[0].frontBreastTokens.join(`, `) === `collarbone, shirt, dress`,
//   `parse`,
// );
// assert(
//   info[0].sideBreastTokens.join(`, `) === `collarbone, shirt, dress`,
//   `parse`,
// );
// assert(info[0].backBreastTokens.join(`, `) === `shirt, dress`, `parse`);
// assert(
//   info[0].frontMidriffTokens.join(`, `) === `shirt, dress, skirt`,
//   `parse: ${info[0].frontMidriffTokens.join(`, `)}`,
// );
// assert(
//   info[0].sideMidriffTokens.join(`, `) === `shirt, dress, skirt`,
//   `parse: ${info[0].sideMidriffTokens.join(`, `)}`,
// );
// assert(
//   info[0].backMidriffTokens.join(`, `) === `shirt, dress, skirt`,
//   `parse: ${info[0].backMidriffTokens.join(`, `)}`,
// );
// assert(
//   info[0].frontHipAndThighTokens.join(`, `) ===
//     `dress, skirt, thighhighs, pantyhose, panties`,
//   `parse: ${info[0].frontHipAndThighTokens.join(`, `)}`,
// );
// assert(
//   info[0].sideHipAndThighTokens.join(`, `) ===
//     `dress, skirt, thighhighs, pantyhose, panties`,
//   `parse: ${info[0].sideHipAndThighTokens.join(`, `)}`,
// );
// assert(
//   info[0].backHipAndThighTokens.join(`, `) ===
//     `dress, skirt, thighhighs, pantyhose, panties`,
//   `parse: ${info[0].backHipAndThighTokens.join(`, `)}`,
// );
// assert(
//   info[0].footTokens.join(`, `) === `thighhighs, pantyhose, barefoot`,
//   `parse: ${info[0].footTokens.join(`, `)}`,
// );
// assert(
//   info[0].removedShoesFootTokens.join(`, `) === `pantyhose, barefoot, socks`,
//   `parse: ${info[0].removedShoesFootTokens.join(`, `)}`,
// );
// assert(
//   info[0].upskirtTokens.join(`, `) === `crotch seam`,
//   `parse: ${info[0].upskirtTokens.join(`, `)}`,
// );

// assert(
//   info[0].frontEmotionTokens.join(`, `) ===
//     `{blush, smile|blush, one eye closed|blush, scowl}`,
//   `parse: ${info[0].frontEmotionTokens.join(`, `)}`,
// );
// assert(
//   info[0].profileEmotionTokens.join(`, `) ===
//     `{blush, smile|blush, scowl}, profile`,
//   `parse: ${info[0].profileEmotionTokens.join(`, `)}`,
// );

// assert(
//   info[0].isArmpitsExposure,
//   `parse.isArmpitsExposure: ${info[0].isArmpitsExposure}`,
// );

// assert(
//   `${info[0].backgroundTokens.fromHorizontal}` === `beach`,
//   `parse.background.fromHorizontal: ${info[0].backgroundTokens.fromHorizontal}`,
// );

// const unique = removeDuplicateSingleTagToken([
//   new SingleTagToken<Tag>(`red eyes`, { weight: 1.5 }),
//   new SingleTagToken<Tag>(`ahoge`),
//   new SingleTagToken<Tag>(`red eyes`, { weight: 2 }),
//   new SingleTagToken<Tag>(`all fours`),
// ]);

// assert(
//   `${unique.join(`, `)}` === `(red eyes:1.5), ahoge, all fours`,
//   `removeDuplicateSingleTagToken: ${unique.join(`, `)}`,
// );
