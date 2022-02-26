import { expect } from "chai";
import { describe, it } from "mocha"
import { convertLineToSignal, decode, Signal } from "./lib";

describe('Converter tests', () => {
  it("Should convert sample string to signal", () => {
    // given
    const inputLine = "be cfbegad cbdgef | fdgacbe gcbe";

    // when
    const signal = convertLineToSignal(inputLine);

    // then
    const expectedSignal: Signal = {
      patterns: [
        ["b", "e"],
        ["c", "f", "b", "e", "g", "a", "d"],
        ["c", "b", "d", "g", "e", "f"],
      ],
      outputs: [
        ["f", "d", "g", "a", "c", "b", "e"],
        ["g", "c", "b", "e"],
      ],
    };

    expect(signal).to.deep.equal(expectedSignal);
  });

  it("Should detect 1, 4, 7 or 8 in single signal #1", () => {
    // given
    const inputLine =
      "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe";

    // when
    const signal = convertLineToSignal(inputLine);
    const digits = decode(signal).filter((digit) => [1, 4, 7, 8].includes(digit));

    // then
    expect(digits).to.deep.equal([8, 4]);
  });

  it("Should detect 1, 4, 7 or 8 in single signal #2", () => {
    // given
    const inputLine =
      "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb";

    // when
    const signal = convertLineToSignal(inputLine);
    const digits = decode(signal).filter((digit) => [1, 4, 7, 8].includes(digit));

    // then
    expect(digits).to.deep.equal([8, 7, 1, 7]);
  });

  it("Should detect 1, 4, 7 or 8 in multiple signals", () => {
    // given
    const signals = [
      "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
      "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
      "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
      "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
      "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
      "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
      "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
      "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
      "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
      "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
    ].map(convertLineToSignal);
    const interestingDigits = [1, 4, 7, 8];

    // when
    let instances = 0;
    signals.forEach((signal) => {
      const digits = decode(signal);
      instances += digits.filter((digit) =>
        interestingDigits.includes(digit)
      ).length;
    });

    // then
    expect(instances).to.equal(26);
  });

  it("Should decode sample signal", () => {
    // given
    const signal = convertLineToSignal(
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
    );

    // when
    const decodedDigits = decode(signal);

    // then
    expect(decodedDigits).to.deep.equal( [5, 3, 5, 3]);
  });
});

