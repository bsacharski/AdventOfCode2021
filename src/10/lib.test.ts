import { expect } from "chai";
import { describe, it } from "mocha"
import {
  autocomplete,
  calculateCompletionScore,
  calculateCorruptionScore,
  getCorruptionError,
  isCorrupted,
  Mismatch,
} from "./lib";

describe('Task 10 tests', () => {
  it("Should detect corruption in sample data", () => {
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

    expect(results).to.deep.equal(expectedResults);
  });

  it("Specify corruption reason in sample data ", () => {
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

    expect(errors).to.deep.equal(expectedErrors);
  });

  it("Calculate corruption score", () => {
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
    expect(score).to.equal(26397);
  });

  it("Generate completions for incomple lines from sample dataset", () => {
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

    expect(autompletions).to.deep.equal(expected);
  });

  it("Calculate completion score for autocompletions from sample dataset", () => {
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

    expect(scores).to.deep.equal(expectedScores);
  });
});
