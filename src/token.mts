import { Tag } from "./tag-defines/all.mjs";
import { Visible, tagVisibilities } from "./tag-defines/visible.mjs";

type CanBeToken = {
  readonly visible: Visible;
  readonly representativeTag: Tag;
  toString(): string;
};

export class SingleTagToken<T extends Tag> implements CanBeToken {
  readonly visible: Visible;
  readonly representativeTag: Tag;
  constructor(
    readonly tag: T,
    readonly options = { weight: 1.0 },
  ) {
    this.visible = tagVisibilities[tag];
    this.representativeTag = tag;
  }

  toString() {
    return this.options.weight === 1.0
      ? `${this.tag}`
      : `(${this.tag}:${this.options.weight})`;
  }
}

const isFormalDynamicCandidate = <T extends Tag>(
  tokens: readonly T[] | readonly Token<T>[],
): tokens is readonly Token<T>[] => {
  if (tokens.length === 0) return true;
  if (tokens[0] instanceof SingleTagToken || tokens[0] instanceof DynamicPrompt)
    return true;
  return false;
};

export class DynamicCandidate<T extends Tag> {
  tokens: readonly Token<T>[];
  constructor(
    tokens: readonly T[] | readonly Token<T>[],
    readonly options = { multiplier: 1 },
  ) {
    if (isFormalDynamicCandidate<T>(tokens)) {
      this.tokens = tokens;
    } else {
      this.tokens = tokens.map((token) => new SingleTagToken(token));
    }
  }

  toString() {
    const prompt = this.tokens.join(`, `);
    return this.options.multiplier === 1
      ? prompt
      : `${this.options.multiplier}::${prompt}`;
  }

  has(tag: T) {
    return this.tokens.some((t) => t.representativeTag === tag);
  }

  add(token: Token<T>) {
    this.tokens = [...this.tokens, token];
  }
}

type DynamicCandidates<T extends Tag> = readonly DynamicCandidate<T>[];
const isFormalDynamicPrompt = <T extends Tag>(
  candidates: DynamicCandidates<T> | readonly (readonly T[])[],
): candidates is DynamicCandidates<T> => {
  if (candidates.length === 0) return true;
  if (candidates[0] instanceof DynamicCandidate) return true;
  return false;
};

export class DynamicPrompt<T extends Tag> implements CanBeToken {
  readonly candidates: DynamicCandidates<T>;
  readonly visible: Visible;
  constructor(
    readonly representativeTag: T,
    candidates: Parameters<typeof isFormalDynamicPrompt<T>>[0],
    readonly options: { weight?: number; lineBreak?: boolean } = {
      weight: 1,
      lineBreak: false,
    },
  ) {
    this.visible = tagVisibilities[representativeTag];

    if (isFormalDynamicPrompt<T>(candidates)) {
      this.candidates = candidates;
    } else {
      this.candidates = candidates.map(
        (tokens) => new DynamicCandidate(tokens),
      );
    }
  }

  toString() {
    const lineBreakCharacter = this.options.lineBreak ? `\n` : ``;
    const content = this.candidates.join(`|${lineBreakCharacter}`);
    return this.options.weight === 1
      ? `{${content}}`
      : `({${content}}:${this.options.weight})`;
  }

  createExcluded(list: T[], options = { inverted: false }) {
    const newCandidates = this.candidates.filter((candidate) =>
      list.some((l) =>
        options.inverted ? candidate.has(l) : !candidate.has(l),
      ),
    );

    return new DynamicPrompt(
      this.representativeTag,
      newCandidates,
      this.options,
    );
  }

  addTokenTo(token: Token<T>, list: T[]) {
    const targetCandidates = this.candidates.filter((candidate) =>
      list.some((l) => candidate.has(l)),
    );
    for (const c of targetCandidates) {
      c.add(token);
    }
  }
}

export type Token<T extends Tag> = SingleTagToken<T> | DynamicPrompt<T>;
export const isSingleTagToken = <T extends Tag>(
  t: Token<T>,
): t is SingleTagToken<T> => {
  if (t instanceof SingleTagToken) return true;
  else return false;
};

export const removeDuplicateSingleTagToken = <T extends Tag>(
  tokens: Token<T>[],
): Token<T>[] => {
  const onlyDynamicPrompt = tokens.filter(
    (token) => !isSingleTagToken<T>(token),
  ) as DynamicPrompt<T>[];

  const onlySingleTagTokens = tokens.filter((token) =>
    isSingleTagToken<T>(token),
  ) as SingleTagToken<T>[];

  const uniqueSingleTagTokens = onlySingleTagTokens.filter(
    (token, index) =>
      onlySingleTagTokens
        .map(({ representativeTag }) => representativeTag)
        .indexOf(token.representativeTag) === index,
  );

  return [...uniqueSingleTagTokens, ...onlyDynamicPrompt];
};
