import { generateDynamicPrompt, getCombinations } from "./libs/utility.mjs";
import { Tag } from "./tag-defines/all.mjs";
import { LoraNameTag } from "./tag-defines/lora.mjs";

export class SimpleToken<T extends Tag> {
  readonly tag: T;
  readonly weight: number;
  constructor({ tag, weight }: { tag: T; weight?: number }) {
    this.tag = tag;
    this.weight = weight ?? 1.0;
  }

  toString() {
    return this.weight === 1.0 ? this.tag : `${this.tag}:${this.weight}`;
  }
}

/**
 * For Lora token definition.
 * The weights can be specified as arrays and will be converted to dynamic prompt.
 */
export class LoraToken {
  readonly tag: LoraNameTag;
  readonly weights: number[];
  constructor({
    tag,
    weights,
  }: {
    tag: LoraNameTag;
    weights?: number | number[];
  }) {
    this.tag = tag;
    this.weights = typeof weights === `number` ? [weights] : weights ?? [1.0];

    // Vadidation
    for (const weight of this.weights) {
      if (weight < 0) throw new Error(`Invalid weight: ${weight}`);
    }
  }

  toString() {
    if (this.weights.length === 1) {
      return `<lora:${this.tag}:${this.weights[0]}>`;
    } else {
      return generateDynamicPrompt(
        this.weights.map((w) => `<lora:${this.tag}:${w}>`),
      );
    }
  }
}

/**
 * Candidate for `DynamicPromptToken` .
 */
export class Candidate<T extends Tag> {
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
    return `{${this.candidates.map((c) => c.tokens.join(`, `)).join(`|`)}}`;
  }
}

/**
 * Type of entries.
 *
 * The `weight` cannot be specified in the DynamicPrompt. Instead, specify it in each Token.
 */
export type Entry<T extends Tag> =
  | T
  | { tag: T; weight: number }
  | SimpleToken<T>
  | DynamicPromptToken<T>
  | { probability?: number; entries: Entry<T>[] }[];

type Token<T extends Tag> = SimpleToken<T> | DynamicPromptToken<T>;

/**
 * Prompt define for easily defining tokens.
 */
export class PromptDefine<T extends Tag> {
  readonly tokens: Token<T>[];
  constructor(entries: Entry<T>[]) {
    this.tokens = this.parse(entries);
  }

  private parse(entries: Entry<T>[]): Token<T>[] {
    const all = entries.map((entry) => {
      if (entry instanceof SimpleToken) {
        return entry;
      } else if (entry instanceof DynamicPromptToken) {
        return entry;
      } else if (typeof entry === `string`) {
        return new SimpleToken({ tag: entry });
      } else if (`tag` in entry) {
        return new SimpleToken(entry);
      } else if (`length` in entry) {
        const candidateEntries = entry.map(({ probability, entries }) => ({
          tokens: this.parse(entries),
          probability,
        }));
        const candidates = candidateEntries.map(
          ({ tokens, probability }) => new Candidate({ tokens, probability }),
        );
        return new DynamicPromptToken({ candidates });
      }
      throw new Error(`Invalid entry: ${entry}`);
    });

    return all as Token<T>[];
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
    return this.simpleTokens.join(`, `);
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
    const temp1 = patternCollections.reduce(
      (previousCollection, currentCollection) => {
        const temp2 = currentCollection.patterns
          .map((currentPattern) => {
            const temp3 = previousCollection.patterns.map((previousPattern) => {
              const temp4 = new Pattern<T>({
                simpleTokens: [
                  ...previousPattern.simpleTokens,
                  ...currentPattern.simpleTokens,
                ],
                probability:
                  currentPattern.probability * previousPattern.probability,
              });
              return temp4;
            });
            return temp3;
          })
          .flat();
        return new PatternCollection<T>(temp2);
      },
    );
    return temp1;
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

// console.log(`end`);
