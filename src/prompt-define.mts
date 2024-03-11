import { generateDynamicPrompt, getCombinations } from "./libs/utility.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { LoraNameTag, allLoraNameTags } from "./tag-defines/lora.mjs";

/**
 * Simple token definition.
 * This definition is used for both normal tags and lora tags.
 */
class SimpleToken<T extends Tag> {
  readonly tag: T | LoraNameTag;
  readonly weight: number;
  constructor({ tag, weight }: { tag: T | LoraNameTag; weight?: number }) {
    this.tag = tag;
    this.weight = weight ?? 1.0;

    // Vadidation
    if (this.weight < 0) throw new Error(`Invalid weight: ${this.weight}`);
  }

  private isLoraNameTag(tag: T | LoraNameTag): tag is LoraNameTag {
    return allLoraNameTags.some((t) => t === tag);
  }

  toString() {
    if (this.isLoraNameTag(this.tag)) {
      return `<lora:${this.tag}:${this.weight}>`;
    } else {
      return this.weight === 1.0 ? this.tag : `${this.tag}:${this.weight}`;
    }
  }
}

/**
 * Candidate for `DynamicPromptToken` .
 */
class Candidate<T extends Tag> {
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
  }
}

/**
 * Dynamic prompt token definition.
 */
export class DynamicPromptToken<T extends Tag> {
  readonly candidates: Candidate<T>[];
  constructor({ candidates }: { candidates: Candidate<T>[] }) {
    this.candidates = candidates;
  }

  getTotalProbability() {
    return this.candidates.reduce(
      (acc, cur) => acc + cur.probability,
      0,
    ) as number;
  }

  toString() {
    if (this.candidates.length === 0) return ``;

    return `{${this.candidates.map((c) => c.tokens.join(`, `)).join(`|`)}}`;
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

/**
 * Type of entries.
 *
 * The `weight` cannot be specified in the DynamicPrompt. Instead, specify it in each Token.
 */
export type Entry<T extends Tag> = NormalEntry<T>;

/**
 * Type of tokens.
 */
type Token<T extends Tag> = SimpleToken<T> | DynamicPromptToken<T>;

/**
 * Prompt define for easily defining tokens.
 */
export class PromptDefine<T extends Tag> {
  readonly tokens: Token<T>[];
  constructor(entries: Entry<T>[] | LoraEntry) {
    this.tokens = this.parse(entries);
  }

  private parse(entries: Entry<T>[] | LoraEntry): Token<T>[] {
    if (`probabilityAndWeights` in entries) {
      const candidates = entries.probabilityAndWeights.map(
        ({ probability, weight }) =>
          new Candidate<T>({
            tokens: [new SimpleToken<T>({ tag: entries.tag, weight })],
            probability,
          }),
      );

      return [new DynamicPromptToken<T>({ candidates })];
    }

    const all = entries.map((entry) => {
      if (typeof entry === `string`) {
        return new SimpleToken({ tag: entry });
      } else if (`tag` in entry) {
        return new SimpleToken(entry);
      } else if (Array.isArray(entry)) {
        const candidateEntries = entry.map(({ probability, entries }) => ({
          tokens: this.parse(entries),
          probability,
        }));
        const candidates = candidateEntries.map(
          ({ tokens, probability }) =>
            new Candidate<T>({ tokens, probability }),
        );
        return new DynamicPromptToken<T>({ candidates });
      }
      throw new Error(`Invalid entry: ${entry}`);
    });

    return all;
  }

  private candidateToPatterns(candidate: Candidate<T>): Pattern<T>[] {
    const ss = candidate.tokens.filter(
      (token) => !(token instanceof DynamicPromptToken),
    ) as SimpleToken<T>[];

    const ds = candidate.tokens.filter(
      (token) => token instanceof DynamicPromptToken,
    ) as DynamicPromptToken<T>[];

    if (ds.length === 0) {
      return [
        new Pattern({ simpleTokens: ss, probability: candidate.probability }),
      ];
    }

    const patternsSet = ds.map((d) => this.dynamicPromptTokenToPatterns(d));
    const combinedPatterns = getCombinations<Pattern<T>>(patternsSet).map(
      (patterns) =>
        patterns.reduce(
          (acc, cur) =>
            new Pattern({
              simpleTokens: [...acc.simpleTokens, ...cur.simpleTokens],
              probability: acc.probability * cur.probability,
            }),
        ),
    );

    const addedSimpleTokens = combinedPatterns.map(
      ({ simpleTokens, probability }) =>
        new Pattern({
          simpleTokens: [...ss, ...simpleTokens],
          probability,
        }),
    );

    return addedSimpleTokens;
  }

  private dynamicPromptTokenToPatterns(
    dynamic: DynamicPromptToken<T>,
  ): Pattern<T>[] {
    const patterns = dynamic.candidates
      .map((c) => this.candidateToPatterns(c))
      .flat()
      .map(
        ({ simpleTokens, probability }) =>
          new Pattern({
            simpleTokens,
            probability: probability / dynamic.getTotalProbability(),
          }),
      );
    return patterns;
  }

  convertToPatternCollection() {
    const rootCandidate = new Candidate({ tokens: this.tokens });
    const patterns = this.candidateToPatterns(rootCandidate);
    return new PatternCollection(patterns);
  }
}

export class Pattern<T extends Tag> {
  readonly simpleTokens: SimpleToken<T>[];
  readonly probability: number;
  constructor({
    simpleTokens,
    probability,
  }: {
    simpleTokens: SimpleToken<T>[];
    probability?: number;
  }) {
    this.simpleTokens = simpleTokens;
    this.probability = probability ?? 1.0;
  }

  toPrompt() {
    return this.simpleTokens.join(`,\n`);
  }

  toString() {
    const prompt = this.toPrompt();
    const roundProbability = Math.round(this.probability * 1000000) / 1000000;
    return roundProbability === 1 ? prompt : `${roundProbability}::${prompt}`;
  }

  filter(callbackfn: (value: SimpleToken<T>) => boolean) {
    const filtered = this.simpleTokens.filter(callbackfn);
    return new Pattern({
      simpleTokens: filtered,
      probability: this.probability,
    });
  }

  concat<U extends Tag>(items: SimpleToken<U>[]) {
    const newTokens = [...this.simpleTokens, ...items];
    const uniqueTokens = [
      ...new Map(newTokens.map((token) => [token.tag, token])).values(),
    ];

    return new Pattern<T | U>({
      simpleTokens: uniqueTokens,
      probability: this.probability,
    });
  }
}

export class PatternCollection<T extends Tag> {
  constructor(readonly patterns: Pattern<T>[]) {
    const totalProbability = patterns.reduce(
      (prev, current) => prev + current.probability,
      0,
    );
    this.patterns = patterns.map(
      ({ simpleTokens, probability }) =>
        new Pattern<T>({
          simpleTokens,
          probability: probability / totalProbability,
        }),
    );
  }

  toString() {
    return generateDynamicPrompt(
      this.patterns.map((pattern) => pattern.toString()),
    );
  }

  filter(callbackfn: (value: Pattern<T>) => boolean) {
    const filtered = this.patterns.filter(callbackfn);
    const totalProbability = filtered.reduce(
      (prev, current) => prev + current.probability,
      0,
    );
    const normalized = filtered.map(
      ({ simpleTokens, probability }) =>
        new Pattern({
          simpleTokens,
          probability: probability / totalProbability,
        }),
    );
    return new PatternCollection(normalized);
  }

  map<U extends Tag>(callbackfn: (value: Pattern<T>) => Pattern<T | U>) {
    const mapped = this.patterns.map(callbackfn);
    const totalProbability = mapped.reduce(
      (prev, current) => prev + current.probability,
      0,
    );
    const normalized = mapped.map(
      ({ simpleTokens, probability }) =>
        new Pattern({
          simpleTokens,
          probability: probability / totalProbability,
        }),
    );
    return new PatternCollection(normalized);
  }

  join<U extends Tag>(target: PatternCollection<U>, probability: number) {
    if (probability < 0 || 1 < probability)
      throw new Error(`Invalid probability: ${probability}`);

    const multiply = (c: PatternCollection<T | U>, m: number) => {
      const temp = c.patterns.map(
        ({ simpleTokens, probability }) =>
          new Pattern<T | U>({
            simpleTokens,
            probability: probability * m,
          }),
      );
      return temp;
    };

    const joinedPatterns = [
      ...multiply(this, 1 - probability),
      ...multiply(target, probability),
    ];
    return new PatternCollection<T | U>(joinedPatterns);
  }

  static makeCombination<T extends Tag>(
    patternCollections: PatternCollection<T>[],
  ) {
    const combine = (a: PatternCollection<T>, b: PatternCollection<T>) => {
      const combination = a.patterns
        .map((patternA) =>
          b.patterns.map(
            (patternB) =>
              new Pattern<T>({
                simpleTokens: [
                  ...patternA.simpleTokens,
                  ...patternB.simpleTokens,
                ],
                probability: patternA.probability * patternB.probability,
              }),
          ),
        )
        .flat();
      return new PatternCollection<T>(combination);
    };

    return patternCollections.reduce((previousCollection, currentCollection) =>
      combine(previousCollection, currentCollection),
    );
  }

  static joinAll<T extends Tag>(
    targets: { patternCollection: PatternCollection<T>; weight: number }[],
  ) {
    const totalWeight = targets.reduce(
      (prev, current) => prev + current.weight,
      0,
    );
    const normalized = targets
      .map(({ patternCollection, weight }) =>
        patternCollection.patterns.map(
          (pattern) =>
            new Pattern<T>({
              simpleTokens: pattern.simpleTokens,
              probability: (pattern.probability * weight) / totalWeight,
            }),
        ),
      )
      .flat();

    return new PatternCollection<T>(normalized);
  }

  pickOne() {
    const random = Math.random();
    let sum = 0;
    for (const pattern of this.patterns) {
      sum += pattern.probability;
      if (random <= sum) return pattern;
    }
    throw new Error(`Unexpected error: No item was picked.`);
  }
}

// const test1 = new PromptDefine([
//   `smile`,
//   `bikini`,
//   [
//     { probability: 1, entries: [`red bikini`] },
//     { probability: 2, entries: [`blue bikini`] },
//   ],
//   [
//     { entries: [`off shoulder`] },
//     {
//       entries: [
//         `maid bikini`,
//         [{ entries: [`maid headdress`] }, { entries: [`maid apron`] }],
//       ],
//     },
//   ],
// ]);

// console.log(test1);
// const test1Patterns = test1.convertToPatternCollection();
// console.log(test1Patterns);

// const test2 = new PromptDefine([]);

// console.log(test2);
// const test2Patterns = test2.convertToPatternCollection();
// console.log(test2Patterns);

// const test3 = PatternCollection.makeCombination([
//   test2Patterns,
//   new PromptDefine([`smile`]).convertToPatternCollection(),
// ]);

// console.log(test3);

// const test4 = new PromptDefine({
//   tag: `lala-loveru`,
//   probabilityAndWeights: [
//     { probability: 1 / 3, weight: 0.5 },
//     { probability: 2 / 3, weight: 0.8 },
//   ],
// });

// console.log(test4);
// console.log(test4.toString());
// console.log(test4.convertToPatternCollection());

// const test5 = PatternCollection.makeCombination([
//   test4.convertToPatternCollection(),
//   new PromptDefine([`smile`]).convertToPatternCollection(),
// ]);

// console.log(test5);

// console.log(`end`);
