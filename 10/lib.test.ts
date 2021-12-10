import { assertEquals } from "../dev_deps.ts";
import {
  autocomplete,
  calculateCompletionScore,
  calculateCorruptionScore,
  getCorruptionError,
  isCorrupted,
  Mismatch,
} from "./lib.ts";

Deno.test("Detect corruption in sample data", () => {
  // given
  const inputLines = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]",
  ];

  // when
  const results = inputLines.map((line) => isCorrupted(line));

  // then
  const expectedResults = [
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
  ];

  assertEquals(results, expectedResults);
});

Deno.test("Specify corruption reason in sample data ", () => {
  const inputLines = [
    "{([(<{}[<>[]}>{[]{[(<()>",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
  ];

  // when
  const errors = inputLines.map((line) => getCorruptionError(line));

  // then
  const expectedErrors: Mismatch[] = [
    {
      expected: "]",
      actual: "}",
    },
    {
      expected: "]",
      actual: ")",
    },
    {
      expected: ")",
      actual: "]",
    },
    {
      expected: ">",
      actual: ")",
    },
    {
      expected: "]",
      actual: ">",
    },
  ];

  assertEquals(errors, expectedErrors);
});

Deno.test("Calculate corruption score", () => {
  const inputLines = [
    "{([(<{}[<>[]}>{[]{[(<()>",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
  ];

  // when
  const errors = inputLines.map((line) => getCorruptionError(line) as Mismatch);
  const score = calculateCorruptionScore(errors);

  // then
  assertEquals(score, 26397);
});

Deno.test("Generate completions for incomple lines from sample dataset", () => {
  const inputLines = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "(((({<>}<{<{<>}{[]{[]{}",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "<{([{{}}[<[[[<>{}]]]>[]]",
  ];

  // when
  const autompletions = inputLines.map((line) => autocomplete(line));

  // then
  const expected = [
    "}}]])})]",
    ")}>]})",
    "}}>}>))))",
    "]]}}]}]}>",
    "])}>",
  ];
  assertEquals(autompletions, expected);
});

Deno.test("Calculate completion score for autocompletions from sample dataset", () => {
  // given
  const completions = [
    "}}]])})]",
    ")}>]})",
    "}}>}>))))",
    "]]}}]}]}>",
    "])}>",
  ];

  // when
  const scores = completions.map((completion) =>
    calculateCompletionScore(completion)
  );

  // then
  const expectedScores = [
    288957,
    5566,
    1480781,
    995444,
    294,
  ];
  assertEquals(scores, expectedScores);
});
