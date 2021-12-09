export type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export type Signal = {
  patterns: Segment[][];
  outputs: Segment[][];
};

const segmentSettings: Map<number, Segment[]> = new Map([
  [0, ["a", "b", "c", "e", "f", "g"]],
  [1, ["c", "f"]],
  [2, ["a", "c", "d", "e", "g"]],
  [3, ["a", "c", "d", "f", "g"]],
  [4, ["b", "c", "d", "f"]],
  [5, ["a", "b", "d", "f", "g"]],
  [6, ["a", "b", "d", "e", "f", "g"]],
  [7, ["a", "c", "f"]],
  [8, ["a", "b", "c", "d", "e", "f", "g"]],
  [9, ["a", "b", "c", "d", "f", "g"]],
]);

const segmentNumberToDigitMap = new Map<number, number[]>();
for (const [digit, segments] of segmentSettings.entries()) {
  const numberOfSegments = segments.length;
  if (!segmentNumberToDigitMap.has(numberOfSegments)) {
    segmentNumberToDigitMap.set(numberOfSegments, []);
  }

  const possibleDigits = segmentNumberToDigitMap.get(numberOfSegments)!;
  possibleDigits.push(digit);
  segmentNumberToDigitMap.set(numberOfSegments, possibleDigits);
}

export function convertLineToSignal(input: string): Signal {
  const splices = input.split(" | ").map((splice) => splice.trim());
  const patterns = splices[0].split(" ").map((digitInSegments) =>
    digitInSegments.split("")
  ) as Segment[][];
  const outputs = splices[1].split(" ").map((digitInSegments) =>
    digitInSegments.split("")
  ) as Segment[][];

  return {
    patterns,
    outputs,
  };
}

function getPossibleDigits(segmentsString: Segment[]): number[] {
  const numberOfSegments = segmentsString.length;
  const possibleDigits = segmentNumberToDigitMap.get(numberOfSegments)!;
  return possibleDigits;
}

function union<Type>(arrays: Type[][]): Type[] {
  const output: Type[] = [];

  arrays.forEach((array) => {
    array.forEach((element) => {
      if (!output.includes(element)) {
        output.push(element);
      }
    });
  });

  output.sort();

  return output;
}

function difference<Type>(arrayA: Type[], arrayB: Type[]): Type[] {
  const output = arrayA.filter((element) => !arrayB.includes(element));
  return output;
}

function extractCipher(signal: Signal): Map<string, number> {
  type Hint = {
    pattern: Segment[];
    possibleDigits: number[];
    possibleSegments: Segment[][];
  };
  signal.patterns.sort((patternA, patternB) =>
    patternA.length - patternB.length
  );

  const hints: Hint[] = signal.patterns.map((pattern) => {
    pattern.sort();
    const possibleDigits = getPossibleDigits(pattern);
    const possibleSegments = possibleDigits.map((digit) =>
      segmentSettings.get(digit)!
    );

    return {
      pattern,
      possibleDigits,
      possibleSegments,
    };
  });

  const cipher = new Map<string, number>();

  // 1
  const digit1 = hints.shift()!;
  cipher.set(digit1.pattern.join(""), 1);

  // 7
  const digit7 = hints.shift()!;
  cipher.set(digit7.pattern.join(""), 7);

  // 4
  const digit4 = hints.shift()!;
  cipher.set(digit4.pattern.join(""), 4);

  // 8
  const digit8 = hints.pop()!;
  cipher.set(digit8.pattern.join(""), 8);

  // 9
  const digit9DetectorPattern = union([digit4.pattern, digit7.pattern]);
  const digit9candidates = hints.filter((hint) =>
    hint.possibleDigits.includes(9)
  );
  const digit9 = digit9candidates.find((candidate) =>
    difference(candidate.pattern, digit9DetectorPattern).length === 1
  )!;
  cipher.set(digit9.pattern.join(""), 9);
  const idx9 = hints.findIndex((hint) => hint.pattern === digit9.pattern);
  hints.splice(idx9, 1);

  // 0
  const digit0candidates = hints.filter((hint) =>
    hint.possibleDigits.includes(0)
  );
  const digit0 = digit0candidates.find((candidate) => {
    const missesOneSegmentFrom8 =
      difference(digit8.pattern, candidate.pattern).length === 1;
    const includesSegmentFrom1 =
      difference(digit1.pattern, candidate.pattern).length === 0;

    return missesOneSegmentFrom8 && includesSegmentFrom1;
  })!;
  cipher.set(digit0.pattern.join(""), 0);
  const idx0 = hints.findIndex((hint) => hint.pattern === digit0.pattern);
  hints.splice(idx0, 1);

  // 6
  const digit6 = hints.find((hint) => hint.possibleDigits.includes(6))!;
  cipher.set(digit6.pattern.join(""), 6);
  const idx6 = hints.findIndex((hint) => hint.pattern === digit6.pattern);
  hints.splice(idx6, 1);

  // 5
  const digit5Candidates = hints.filter((hint) =>
    hint.possibleDigits.includes(5)
  );
  const digit5 = digit5Candidates.find((candidate) =>
    difference(digit6.pattern, candidate.pattern).length === 1
  )!;
  cipher.set(digit5.pattern.join(""), 5);
  const idx5 = hints.findIndex((hint) => hint.pattern === digit5.pattern);
  hints.splice(idx5, 1);

  // 3
  const digit3Candidates = hints.filter((hint) =>
    hint.possibleDigits.includes(3)
  );
  const digit3 = digit3Candidates.find((candidate) =>
    difference(digit9.pattern, candidate.pattern).length === 1
  )!;
  cipher.set(digit3.pattern.join(""), 3);
  const idx3 = hints.findIndex((hint) => hint.pattern === digit3.pattern);
  hints.splice(idx3, 1);

  // 2
  const digit2 = hints.shift()!;
  cipher.set(digit2.pattern.join(""), 2);

  return cipher;
}

export function decode(signal: Signal): number[] {
  const cipher = extractCipher(signal);

  const decodedDigits = signal.outputs.map((output) =>
    cipher.get(output.sort().join(""))!
  );

  return decodedDigits;
}
