import { Tag } from "./tag-defines/all.mjs";
import { EmotionTag } from "./tag-defines/emotion.mjs";
import { LoraNameTag } from "./tag-defines/lora.mjs";
import { OutfitAndExposureTag } from "./tag-defines/outfit-and-exposure.mjs";

/**
 * Token definition.
 * This definition is used for both normal tags and lora tags.
 */
class Token<T extends Tag | LoraNameTag> {
  readonly tag: T;
  readonly weight: number;
  readonly type: `normal` | `lora`;
  constructor({
    tag,
    weight,
    type,
  }: {
    tag: T;
    weight?: number;
    type?: `normal` | `lora`;
  }) {
    this.tag = tag;
    this.weight = weight ?? 1.0;
    this.type = type ?? `normal`;

    // Vadidation
    if (this.weight < 0) throw new Error(`Invalid weight: ${this.weight}`);
  }

  toString() {
    switch (this.type) {
      case `normal`:
        return this.weight === 1.0 ? this.tag : `${this.tag}:${this.weight}`;
      case `lora`:
        return `<lora:${this.tag}:${this.weight}>`;
    }
  }
}

/**
 * Type of entries for normal token define.
 */
export type NormalEntry<T extends Tag> =
  | T
  | { tag: T; weight: number }
  | { probability?: number; entries: NormalEntry<T>[] }[];

/**
 * Type of entries for Lora token define.
 */
export type LoraEntry = {
  tag: LoraNameTag;
  probabilityAndWeights: { probability: number; weight: number }[];
};

export class Pattern<T extends Tag | LoraNameTag> {
  readonly tokens: Token<T>[];
  readonly probability: number;
  constructor({
    tokens,
    probability,
  }: {
    tokens: Token<T>[];
    probability?: number;
  }) {
    this.tokens = tokens;
    this.probability = probability ?? 1.0;

    // TODO: Remove duplicate tokens.
  }

  filter(callback: (token: Token<T>) => boolean) {
    return new Pattern<T>({
      tokens: this.tokens.filter(callback),
      probability: this.probability,
    });
  }

  concat<U extends Tag>(items: Token<U>[]) {
    const newTokens = [...this.tokens, ...items];
    const uniqueTokens = [
      ...new Map(newTokens.map((token) => [token.tag, token])).values(),
    ];

    return new Pattern<T | U>({
      tokens: uniqueTokens,
      probability: this.probability,
    });
  }

  toPrompt() {
    return this.tokens.map((token) => token.toString()).join(`, `);
  }

  toString() {
    const roundedProbability = Math.round(this.probability * 1000000) / 1000000;
    const padded = roundedProbability.toString().padEnd(10, `0`);
    return `${padded}: ${this.toPrompt()}`;
  }
}

export class PatternCollection<T extends Tag | LoraNameTag> {
  constructor(readonly patterns: Pattern<T>[]) {
    const totalProbability = patterns.reduce(
      (prev, current) => prev + current.probability,
      0,
    );

    this.patterns = patterns.map(
      ({ tokens, probability }) =>
        new Pattern<T>({
          tokens,
          probability: probability / totalProbability,
        }),
    );

    // TODO: Remove `0` probability patterns.
  }

  static createLora(entries: LoraEntry | null) {
    if (entries === null) {
      return new PatternCollection<LoraNameTag>([]);
    }

    const patterns = entries.probabilityAndWeights.map(
      ({ probability, weight }) =>
        new Pattern<LoraNameTag>({
          tokens: [new Token({ tag: entries.tag, weight, type: `lora` })],
          probability,
        }),
    );
    return new PatternCollection<LoraNameTag>(patterns);
  }

  static create<T extends Tag>(
    entries: NormalEntry<T>[],
  ): PatternCollection<T> {
    const createPatternCollectionRecursively = (
      entries: NormalEntry<T>[],
    ): PatternCollection<T> => {
      const pcs = entries.map((entry) => {
        if (typeof entry === `string`) {
          const pattern = new Pattern<T>({
            tokens: [new Token({ tag: entry })],
          });
          return new PatternCollection<T>([pattern]);
        } else if (`tag` in entry) {
          const pattern = new Pattern<T>({
            tokens: [new Token(entry)],
          });
          return new PatternCollection<T>([pattern]);
        } else if (Array.isArray(entry)) {
          const pairs = entry.map(({ probability, entries }) => {
            const patternCollection =
              createPatternCollectionRecursively(entries);
            return {
              probability: probability ?? 1,
              patternCollection,
            };
          });

          return PatternCollection.joinAll<T>(pairs);
        } else {
          throw new Error(`Invalid entry: ${entry}`);
        }
      });
      return PatternCollection.combine<T>(pcs);
    };

    return createPatternCollectionRecursively(entries);
  }

  combineWith<U extends Tag | LoraNameTag>(
    patternCollection: PatternCollection<U>,
  ) {
    if (patternCollection.patterns.length === 0) return this;

    const combination = this.patterns
      .map((patternA) =>
        patternCollection.patterns.map(
          (patternB) =>
            new Pattern<T | U>({
              tokens: [...patternA.tokens, ...patternB.tokens],
              probability: patternA.probability * patternB.probability,
            }),
        ),
      )
      .flat();
    return new PatternCollection<T | U>(combination);
  }

  static combine<T extends Tag | LoraNameTag>(
    patternCollections: PatternCollection<T>[],
  ) {
    if (patternCollections.length === 0) return new PatternCollection<T>([]);

    return patternCollections.reduce((previousCollection, currentCollection) =>
      previousCollection.combineWith<T>(currentCollection),
    );
  }

  static joinAll<T extends Tag | LoraNameTag>(
    pairs: { probability: number; patternCollection: PatternCollection<T> }[],
  ) {
    const totalProbability = pairs.reduce(
      (prev, current) => prev + current.probability,
      0,
    );

    const patterns = pairs
      .map(({ probability, patternCollection }) => {
        if (patternCollection.patterns.length === 0) {
          return new Pattern<T>({
            tokens: [],
            probability: probability / totalProbability,
          });
        }

        return patternCollection.patterns.map((p) => {
          return new Pattern<T>({
            tokens: p.tokens,
            probability: (p.probability * probability) / totalProbability,
          });
        });
      })
      .flat();

    return new PatternCollection<T>(patterns);
  }

  combineIf<U extends Tag>(
    callback: (p: Pattern<T>) => boolean,
    patternCollection: PatternCollection<U>,
  ) {
    const targetPatterns = this.patterns.filter(callback);
    const targetPatternsProbability = targetPatterns.reduce(
      (prev, current) => prev + current.probability,
      0,
    );
    const targetPatternCollections = new PatternCollection<T>(targetPatterns);

    const combined = targetPatternCollections.combineWith<U>(patternCollection);

    if (targetPatterns.length === this.patterns.length) return combined; // When match all patterns.

    const excludedPatterns = this.patterns.filter((p) => !callback(p));
    const excludedPatternsProbabiility = 1 - targetPatternsProbability;
    const excludedOnly = new PatternCollection<T>(excludedPatterns);

    return PatternCollection.joinAll<T | U>([
      { probability: targetPatternsProbability, patternCollection: combined },
      {
        probability: excludedPatternsProbabiility,
        patternCollection: excludedOnly,
      },
    ]);
  }

  pickOnePrompt() {
    if (this.patterns.length === 0) return new Pattern<T>({ tokens: [] });

    const random = Math.random();
    let sum = 0;
    for (const pattern of this.patterns) {
      sum += pattern.probability;
      if (random <= sum) return pattern.toPrompt();
    }
    throw new Error(`Unexpected error: No item was picked.`);
  }

  pickAllPrompts() {
    return this.patterns.map((p) => p.toPrompt());
  }
}

// const pc1 = PatternCollection.createLora({
//   tag: `mea-loveru`,
//   probabilityAndWeights: [
//     { probability: 1, weight: 0.8 },
//     { probability: 3, weight: 0.6 },
//   ],
// });

// console.log(pc1);

// const pc2 = PatternCollection.create<OutfitAndExposureTag>([
//   `bikini`,
//   [
//     { probability: 2, entries: [`red bikini`] },
//     { probability: 3, entries: [`blue bikini`] },
//     {
//       probability: 1,
//       entries: [
//         `skirt`,
//         [
//           { probability: 1, entries: [`micro bikini`] },
//           { probability: 1, entries: [`crown`] },
//         ],
//       ],
//     },
//   ],
// ]);

// console.log(pc2);

// const combineIf = pc2.combineIf<EmotionTag>(
//   (p) => p.tokens.some(({ tag }) => tag === `micro bikini`),
//   PatternCollection.create<EmotionTag>([
//     `smile`,
//     [
//       { probability: 1, entries: [`!`] },
//       { probability: 1, entries: [`?`] },
//     ],
//   ]),
// );

// console.log(combineIf);

// const combineIfEmpty = pc2.combineIf(
//   (p) => p.tokens.some(({ tag }) => tag === `micro bikini`),
//   PatternCollection.create<EmotionTag>([]),
// );

// console.log(combineIfEmpty);

// const combineIfAllMatch = pc2.combineIf(
//   (p) => p.tokens.some(({ tag }) => true),
//   PatternCollection.create<EmotionTag>([`smile`]),
// );

// console.log(combineIfAllMatch);

// console.log(`end`);
