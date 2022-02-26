import { expect } from "chai";
import { describe, it } from "mocha";
import { calculateSolution, generatePairMap, processPolymer } from "./lib";

describe('Task 14 tests', () => {
  it("Convert string polymer into a pair map", () => {
    // given
    const template = "NNCB";

    // when
    const pairMap = generatePairMap(template);

    // then
    const expectedPairs = new Map<string, number>([
      ["NN", 1],
      ["NC", 1],
      ["CB", 1],
    ]);
    expect(pairMap).to.deep.equal(expectedPairs);
  });

  it("Run 1 turn of polymer transformation", () => {
    // given
    const polymerTemplate = new Map<string, number>([
      ["NN", 1],
      ["NC", 1],
      ["CB", 1],
    ]);
    const rules: Map<string, string> = new Map<string, string>([
      ["CH", "B"],
      ["HH", "N"],
      ["CB", "H"],
      ["NH", "C"],
      ["HB", "C"],
      ["HC", "B"],
      ["HN", "C"],
      ["NN", "C"],
      ["BH", "H"],
      ["NC", "B"],
      ["NB", "B"],
      ["BN", "B"],
      ["BB", "N"],
      ["BC", "B"],
      ["CC", "N"],
      ["CN", "C"],
    ]);

    // when
    const pairMap = processPolymer(polymerTemplate, rules);

    // then
    const expectedPairs = new Map<string, number>([
      ["NC", 1],
      ["CN", 1],
      ["NB", 1],
      ["BC", 1],
      ["CH", 1],
      ["HB", 1],
    ]);
    expect(pairMap).to.deep.equal(expectedPairs);
  });

  it("Run 2 turns of polymer transformation", () => {
    // given
    const polymerTemplate = new Map<string, number>([
      ["NN", 1],
      ["NC", 1],
      ["CB", 1],
    ]);
    const rules: Map<string, string> = new Map<string, string>([
      ["CH", "B"],
      ["HH", "N"],
      ["CB", "H"],
      ["NH", "C"],
      ["HB", "C"],
      ["HC", "B"],
      ["HN", "C"],
      ["NN", "C"],
      ["BH", "H"],
      ["NC", "B"],
      ["NB", "B"],
      ["BN", "B"],
      ["BB", "N"],
      ["BC", "B"],
      ["CC", "N"],
      ["CN", "C"],
    ]);

    // when
    let polymer = polymerTemplate;
    for (let turn = 1; turn <= 2; turn++) {
      polymer = processPolymer(polymer, rules);
    }

    // then
    const expectedPairs = new Map<string, number>([
      ["NB", 2],
      ["BC", 2],
      ["CC", 1],
      ["CN", 1],
      ["BB", 2],
      ["CB", 2],
      ["BH", 1],
      ["HC", 1],
    ]);
    expect(polymer).to.deep.equal(expectedPairs);
  });

  it("Check solution for sample dataset after 10 turns", () => {
    // given
    const polymerTemplate = new Map<string, number>([
      ["NN", 1],
      ["NC", 1],
      ["CB", 1],
    ]);
    const rules: Map<string, string> = new Map<string, string>([
      ["CH", "B"],
      ["HH", "N"],
      ["CB", "H"],
      ["NH", "C"],
      ["HB", "C"],
      ["HC", "B"],
      ["HN", "C"],
      ["NN", "C"],
      ["BH", "H"],
      ["NC", "B"],
      ["NB", "B"],
      ["BN", "B"],
      ["BB", "N"],
      ["BC", "B"],
      ["CC", "N"],
      ["CN", "C"],
    ]);

    // when
    let polymer = polymerTemplate;
    for (let turn = 1; turn <= 10; turn++) {
      polymer = processPolymer(polymer, rules);
    }
    const solution = calculateSolution(polymer);

    // then
    expect(solution).to.equal(1588);
  });

  it("Check solution for sample dataset after 40 turns", () => {
    // given
    const polymerTemplate = new Map<string, number>([
      ["NN", 1],
      ["NC", 1],
      ["CB", 1],
    ]);
    const rules: Map<string, string> = new Map<string, string>([
      ["CH", "B"],
      ["HH", "N"],
      ["CB", "H"],
      ["NH", "C"],
      ["HB", "C"],
      ["HC", "B"],
      ["HN", "C"],
      ["NN", "C"],
      ["BH", "H"],
      ["NC", "B"],
      ["NB", "B"],
      ["BN", "B"],
      ["BB", "N"],
      ["BC", "B"],
      ["CC", "N"],
      ["CN", "C"],
    ]);

    // when
    let polymer = polymerTemplate;
    for (let turn = 1; turn <= 40; turn++) {
      polymer = processPolymer(polymer, rules);
    }
    const solution = calculateSolution(polymer);

    // then
    expect(solution).to.equal(2188189693529);
  });
});
