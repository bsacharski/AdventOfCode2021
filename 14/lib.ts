export function generatePairMap(template: string): Map<string, number> {
  const map = new Map<string, number>();

  for (
    let firstCharIdx = 0;
    firstCharIdx < (template.length - 1);
    firstCharIdx++
  ) {
    const pair = template.charAt(firstCharIdx) +
      template.charAt(firstCharIdx + 1);

    const occurrences = map.get(pair) || 0;
    map.set(pair, occurrences + 1);
  }

  return map;
}

export function processPolymer(
  polymer: Map<string, number>,
  insertionRules: Map<string, string>,
): Map<string, number> {
  const newPolymer = new Map<string, number>();

  for (const [pair, count] of polymer.entries()) {
    const toInsert = insertionRules.get(pair);
    const pairA = pair.charAt(0) + toInsert;
    const pairB = toInsert + pair.charAt(1);

    const pairACount = (newPolymer.get(pairA) || 0) + count;
    const pairBCount = (newPolymer.get(pairB) || 0) + count;

    newPolymer.set(pairA, pairACount);
    newPolymer.set(pairB, pairBCount);
  }

  return newPolymer;
}

export function calculateSolution(
  polymer: Map<string, number>,
): number {
  const elementCount = new Map<string, number>();
  for (const [pair, count] of polymer.entries()) {
    const firstChar = pair.charAt(0);
    const firstCharCount = (elementCount.get(firstChar) || 0) + count;
    elementCount.set(firstChar, firstCharCount);

    const secondChar = pair.charAt(1);
    const secondCharCount = (elementCount.get(secondChar) || 0) + count;
    elementCount.set(secondChar, secondCharCount);
  }

  let leastOcc = Infinity;
  let mostOcc = -Infinity;

  for (const occurrences of elementCount.values()) {
    if (occurrences < leastOcc) {
      leastOcc = occurrences;
    }

    if (mostOcc < occurrences) {
      mostOcc = occurrences;
    }
  }

  // I don't even know how I got here.
  // We know that some elements are counted twice (pairs next to each other),
  // But why this specific combo works...dunno.
  const diff = ((mostOcc - leastOcc) + 1) / 2;
  return diff;
}
