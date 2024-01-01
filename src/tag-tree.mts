import { generateDynamicPrompt } from "./libs/utility.mjs";
import { Tag } from "./tag-defines/all.mjs";

export class Token<T extends Tag> {
  constructor(
    readonly tag: T,
    readonly options = { weight: 1.0 },
  ) {}

  toString() {
    return this.options.weight === 1.0
      ? `${this.tag}`
      : `(${this.tag}:${this.options.weight})`;
  }
}

export class Candidate<T extends Tag> {
  readonly probability;
  constructor(
    readonly tokens: Token<T>[],
    options = { probability: 1.0 },
  ) {
    this.probability = options.probability;
  }

  toString() {
    const prompt = this.tokens.join(`, `);
    const roundProbability = Math.round(this.probability * 1000000) / 1000000;
    return roundProbability === 1 ? prompt : `${roundProbability}::${prompt}`;
  }

  filter(callbackfn: (value: Token<T>) => boolean) {
    const filtered = this.tokens.filter(callbackfn);
    return new Candidate(filtered, { probability: this.probability });
  }
}

export class Candidates<T extends Tag> {
  constructor(readonly arr: Candidate<T>[]) {}

  toString() {
    return generateDynamicPrompt(
      this.arr.map((candidate) => candidate.toString()),
      { lineBreak: true },
    );
  }

  filter(callbackfn: (value: Candidate<T>) => boolean) {
    const filtered = this.arr.filter(callbackfn);
    const totalProbability = filtered.reduce(
      (prev, current) => prev + current.probability,
      0,
    );
    const normalized = filtered.map(
      (candidate) =>
        new Candidate(candidate.tokens, {
          probability: candidate.probability / totalProbability,
        }),
    );
    return new Candidates(normalized);
  }

  map(callbackfn: (value: Candidate<T>) => Candidate<T>) {
    const mapped = this.arr.map(callbackfn);
    const totalProbability = mapped.reduce(
      (prev, current) => prev + current.probability,
      0,
    );
    const normalized = mapped.map(
      (candidate) =>
        new Candidate(candidate.tokens, {
          probability: candidate.probability / totalProbability,
        }),
    );
    return new Candidates(normalized);
  }

  multiply(weight: number) {
    const arr = this.arr.map((candidate) => {
      const temp = new Candidate<T>(candidate.tokens, {
        probability: candidate.probability * weight,
      });
      return temp;
    });
    return new Candidates(arr);
  }

  concat(target: Candidates<T>, weight: number) {
    const arr = [
      ...this.multiply(1 - weight).arr,
      ...target.multiply(weight).arr,
    ];
    return new Candidates(arr);
  }

  static makeCombination<T extends Tag>(candidatesList: Candidates<T>[]) {
    const temp1 = candidatesList.reduce((previousCS, currentCS) => {
      const temp2 = currentCS.arr
        .map((currentC) => {
          const temp3 = previousCS.arr.map((previousC) => {
            const c = new Candidate<T>(
              [...currentC.tokens, ...previousC.tokens],
              {
                probability: currentC.probability * previousC.probability,
              },
            );

            return c;
          });

          return temp3;
        })
        .flat();

      return new Candidates<T>(temp2);
    });

    return temp1;
  }
}

export type TagEntry<T extends Tag> = T | { tag: T; weight: number } | Token<T>;

export class TagLeaf<T extends Tag> {
  tokens: Token<T>[];
  children: TagLeaf<T>[];
  probability: number;
  constructor(arg: {
    tagEntries: TagEntry<T>[];
    children?: TagLeaf<T>[];
    probability?: number;
  }) {
    this.tokens = this.parseTagEntries(arg.tagEntries);
    this.children = arg.children ?? [];
    this.probability = arg.probability ?? 1;
  }

  private parseTagEntries(tagEntries: TagEntry<T>[]) {
    if (tagEntries.length === 0) return [];
    return tagEntries.map((tagEntry) => {
      if (tagEntry instanceof Token) return tagEntry;
      if (typeof tagEntry === `object`) {
        return new Token<T>(tagEntry.tag, { weight: tagEntry.weight });
      }
      return new Token<T>(tagEntry);
    });
  }

  toCandidates(): Candidates<T> {
    if (this.children.length === 0) {
      return new Candidates<T>([
        new Candidate<T>(this.tokens, { probability: this.probability }),
      ]);
    }

    const probabilityWeights = this.children.map(
      ({ probability: probabilityWeight }) => probabilityWeight,
    );
    const totalWeight = probabilityWeights.reduce(
      (prev, current) => current + prev,
      0,
    );

    const arr = this.children
      .map((child) => {
        const childCandidates = child.toCandidates();
        const newCandidateArr = childCandidates.arr.map((candidate) => {
          const temp = new Candidate<T>([...candidate.tokens, ...this.tokens], {
            probability:
              (this.probability * candidate.probability) / totalWeight,
          });
          return temp;
        });

        return newCandidateArr;
      })
      .flat();

    return new Candidates<T>(arr);
  }
}

// const test1 = new TagLeaf<Tag>({
//   tagEntries: [`smile`, { tag: `large breasts`, weight: 2 }, `red belt`],
//   children: [
//     new TagLeaf<Tag>({
//       tagEntries: [`bikini`, `blue bikini`],
//       probability: 3,
//       children: [
//         new TagLeaf<Tag>({
//           tagEntries: [`loafers`],
//           probability: 3,
//         }),
//         new TagLeaf<Tag>({
//           tagEntries: [`x hair ornament`],
//           probability: 1,
//         }),
//       ],
//     }),
//     new TagLeaf<Tag>({
//       tagEntries: [`dress`, `white dress`, `cleavage`],
//     }),
//   ],
// });

// console.log(test1);
// console.log(test1.toCandidates());

// const targetTree = new TagLeaf({
//   tagEntries: [`sweater`],
//   children: [
//     new TagLeaf({ tagEntries: [`red sweater`], probability: 2 }),
//     new TagLeaf({ tagEntries: [`yellow ribbon`], probability: 3 }),
//   ],
// });
// console.log(targetTree.toCandidates());

// const test2 = Candidates.makeCombination([
//   test1.toCandidates(),
//   targetTree.toCandidates(),
// ]);

// console.log(test2);

// console.log(`end`);
