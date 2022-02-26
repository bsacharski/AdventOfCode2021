import { expect } from "chai";
import { describe, it } from "mocha";
import { simulateTurn, SimulationResult } from "./lib";

describe('Task 11 tests', () => {
  it("Run 1 step of simulation using sample data", () => {
    // given
    const map = [
      [1, 1, 1, 1, 1],
      [1, 9, 9, 9, 1],
      [1, 9, 1, 9, 1],
      [1, 9, 9, 9, 1],
      [1, 1, 1, 1, 1],
    ];

    // when
    const result = simulateTurn(map);

    // then
    const expectedSimulationResult: SimulationResult = {
      map: [
        [3, 4, 5, 4, 3],
        [4, 0, 0, 0, 4],
        [5, 0, 0, 0, 5],
        [4, 0, 0, 0, 4],
        [3, 4, 5, 4, 3],
      ],
      numberOfFlashes: 9,
    };

    expect(result).to.deep.equal(expectedSimulationResult);
  });

  it("Run 1 step of simulation using sample data #2", () => {
    const map = [
      [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
      [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
      [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
      [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
      [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
      [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
      [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
      [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
      [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
      [6, 3, 9, 4, 8, 6, 2, 6, 3, 7],
    ];

    // when
    const result = simulateTurn(map);

    // then
    const expectedResult: SimulationResult = {
      map: [
        [8, 8, 0, 7, 4, 7, 6, 5, 5, 5],
        [5, 0, 8, 9, 0, 8, 7, 0, 5, 4],
        [8, 5, 9, 7, 8, 8, 9, 6, 0, 8],
        [8, 4, 8, 5, 7, 6, 9, 6, 0, 0],
        [8, 7, 0, 0, 9, 0, 8, 8, 0, 0],
        [6, 6, 0, 0, 0, 8, 8, 9, 8, 9],
        [6, 8, 0, 0, 0, 0, 5, 9, 4, 3],
        [0, 0, 0, 0, 0, 0, 7, 4, 5, 6],
        [9, 0, 0, 0, 0, 0, 0, 8, 7, 6],
        [8, 7, 0, 0, 0, 0, 6, 8, 4, 8],
      ],
      numberOfFlashes: 35,
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it("Run 100 steps of simulation using sample data", () => {
    // given
    const initalMap = [
      [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
      [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
      [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
      [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
      [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
      [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
      [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
      [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
      [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
      [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
    ];
    const numberOfTurns = 100;
    let totalFlashes = 0;
    let map = initalMap;

    // when
    let simulationResult: SimulationResult;
    for (let turn = 1; turn <= numberOfTurns; turn++) {
      simulationResult = simulateTurn(map);
      totalFlashes += simulationResult.numberOfFlashes;
      map = simulationResult.map;
    }

    // then
    const expectedResult: SimulationResult = {
      map: [
        [0, 3, 9, 7, 6, 6, 6, 8, 6, 6],
        [0, 7, 4, 9, 7, 6, 6, 9, 1, 8],
        [0, 0, 5, 3, 9, 7, 6, 9, 3, 3],
        [0, 0, 0, 4, 2, 9, 7, 8, 2, 2],
        [0, 0, 0, 4, 2, 2, 9, 8, 9, 2],
        [0, 0, 5, 3, 2, 2, 2, 8, 7, 7],
        [0, 5, 3, 2, 2, 2, 2, 9, 6, 6],
        [9, 3, 2, 2, 2, 2, 8, 9, 6, 6],
        [7, 9, 2, 2, 2, 8, 6, 8, 6, 6],
        [6, 7, 8, 9, 9, 9, 8, 7, 6, 6],
      ],
      numberOfFlashes: 13,
    };

    expect(simulationResult).to.deep.equal(expectedResult);
    expect(totalFlashes).to.equal(1656);
  });
});
