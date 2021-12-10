const openingClosingCharacters = new Map<string, string>([
  ["(", ")"],
  ["{", "}"],
  ["<", ">"],
  ["[", "]"],
]);

const mismatchScoreTable = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const completionScoreTable = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export type Mismatch = {
  expected: string;
  actual: string;
};

class Stack<Type> {
  private elements: Type[];

  constructor() {
    this.elements = [];
  }

  push(element: Type) {
    this.elements.push(element);
  }

  pop(): Type | undefined {
    return this.elements.pop();
  }

  peek(): Type | undefined {
    if (this.elements.length === 0) {
      return;
    }

    return this.elements[this.elements.length - 1];
  }
}

export function isCorrupted(line: string): boolean {
  if (getCorruptionError(line)) {
    return true;
  } else {
    return false;
  }
}

export function autocomplete(line: string): string {
  const stack = new Stack<string>();

  const characters = line.split("");
  while (characters.length) {
    const character = characters.shift()!;

    const isOpeningCharacter = openingClosingCharacters.has(character);
    if (isOpeningCharacter) {
      const closingCharacter = openingClosingCharacters.get(character)!;
      stack.push(closingCharacter);
    } else {
      stack.pop();
    }
  }

  const completion: string[] = [];
  while (stack.peek()) {
    completion.push(stack.pop()!);
  }

  return completion.join("");
}

export function getCorruptionError(line: string): Mismatch | undefined {
  const stack = new Stack<string>();

  const characters = line.split("");
  while (characters.length) {
    const character = characters.shift()!;

    const isOpeningCharacter = openingClosingCharacters.has(character);
    if (isOpeningCharacter) {
      const closingCharacter = openingClosingCharacters.get(character)!;
      stack.push(closingCharacter);
    } else {
      const expectedCharacter = stack.pop();
      if (expectedCharacter && expectedCharacter !== character) {
        const mismatch: Mismatch = {
          expected: expectedCharacter,
          actual: character,
        };

        return mismatch;
      }
    }
  }
}

export function calculateCorruptionScore(mismatches: Mismatch[]): number {
  let score = 0;
  mismatches.forEach((mismatch) => {
    // @ts-ignore: actual is always going to be one of closing characters
    const errorScore = mismatchScoreTable[mismatch.actual];
    score += errorScore;
  });

  return score;
}

export function calculateCompletionScore(autocompletion: string): number {
  let score = 0;

  autocompletion.split("").forEach((character) => {
    // @ts-ignore: character is always going to be one of closing characters
    const characterScore = completionScoreTable[character];
    score = (score * 5) + characterScore;
  });

  return score;
}
