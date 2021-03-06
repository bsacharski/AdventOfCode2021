import { expect } from "chai";
import { describe, it } from "mocha";
import {
  countDots,
  extract2DSubset,
  fold,
  initializeMap,
  mirror,
  Position,
  split,
} from "./lib";

describe('Task 13 tests', () => {
  it("Initialize 2d array using sample data", () => {
    // given
    const dotPositions: Position[] = [
      [6, 10],
      [0, 14],
      [9, 10],
      [0, 3],
      [10, 4],
      [4, 11],
      [6, 0],
      [6, 12],
      [4, 1],
      [0, 13],
      [10, 12],
      [3, 4],
      [3, 0],
      [8, 4],
      [1, 10],
      [2, 14],
      [8, 10],
      [9, 0],
    ].map((arr) => {
      return { row: arr[1], col: arr[0] };
    });

    // when
    const map = initializeMap(dotPositions);

    // then
    const expectedMap = [
      [".", ".", ".", "#", ".", ".", "#", ".", ".", "#", "."],
      [".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", "#", ".", ".", ".", ".", "#", ".", "#", "#", "."],
      [".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", ".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    expect(map).to.deep.equal(expectedMap);
  });

  it("Extract left part of 2d array when divided across col 2", () => {
    // given
    const map = [
      ["1", "2", "3", "4", "5"],
      ["6", "7", "8", "9", "0"],
    ];

    // when
    const extracted = extract2DSubset(map, 0, 0, 1, 1);

    // then
    expect(extracted).to.deep.equal([
      ["1", "2"],
      ["6", "7"],
    ]);
  });

  it("Extract right part of 2d array when divided across col 2", () => {
    // given
    const map = [
      ["1", "2", "3", "4", "5"],
      ["6", "7", "8", "9", "0"],
    ];

    // when
    const extracted = extract2DSubset(map, 0, 3, 1, 4);

    // then
    expect(extracted).to.deep.equal([
      ["4", "5"],
      ["9", "0"],
    ]);
  });

  it("Extract upper part of 2d array when divided across row 2", () => {
    // given
    const map = [
      ["1"],
      ["2"],
      ["3"],
      ["4"],
      ["5"],
    ];

    // when
    const extracted = extract2DSubset(map, 0, 0, 1, 0);

    // then
    expect(extracted).to.deep.equal([
      ["1"],
      ["2"],
    ]);
  });

  it("Mirror array horizontally", () => {
    // given
    const map = [
      ["1", "2", "3"],
      ["2", "3", "4"],
      ["3", "4", "5"],
      ["4", "5", "6"],
      ["5", "6", "7"],
    ];

    // when
    const flipped = mirror(map, true);

    // then
    expect(flipped).to.deep.equal([
      ["5", "6", "7"],
      ["4", "5", "6"],
      ["3", "4", "5"],
      ["2", "3", "4"],
      ["1", "2", "3"],
    ]);
  });

  it("Mirror array vertically", () => {
    // given
    const map = [
      ["1", "2", "3"],
      ["2", "3", "4"],
      ["3", "4", "5"],
      ["4", "5", "6"],
      ["5", "6", "7"],
    ];

    // when
    const flipped = mirror(map, false);

    // then
    expect(flipped).to.deep.equal([
      ["3", "2", "1"],
      ["4", "3", "2"],
      ["5", "4", "3"],
      ["6", "5", "4"],
      ["7", "6", "5"],
    ]);
  });

  it("Should split 2d array vertically along line 1", () => {
    // given
    const map = [
      ["1", "2", "3"],
      ["2", "3", "4"],
      ["3", "4", "5"],
      ["4", "5", "6"],
      ["5", "6", "7"],
    ];

    // when
    const [aPart, bPart] = split(map, false, 1);

    // then
    expect(aPart).to.deep.equal([
      ["1"],
      ["2"],
      ["3"],
      ["4"],
      ["5"],
    ]);

    expect(bPart).to.deep.equal([
      ["3"],
      ["4"],
      ["5"],
      ["6"],
      ["7"],
    ]);
  });

  it("Should split 2d array horizontally along line 2", () => {
    // given
    const map = [
      ["1", "2", "3"],
      ["2", "3", "4"],
      ["3", "4", "5"],
      ["4", "5", "6"],
      ["5", "6", "7"],
    ];

    // when
    const [aPart, bPart] = split(map, true, 2);

    // then
    expect(aPart).to.deep.equal([
      ["1", "2", "3"],
      ["2", "3", "4"],
    ]);

    expect(bPart).to.deep.equal([
      ["4", "5", "6"],
      ["5", "6", "7"],
    ]);
  });

  it("Fold map horizontally along line 7", () => {
    // given
    const map = [
      [".", ".", ".", "#", ".", ".", "#", ".", ".", "#", "."],
      [".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", ".", ".", ".", "#", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", "#", ".", ".", ".", ".", "#", ".", "#", "#", "."],
      [".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", ".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    // when
    const folded = fold(map, true, 7);

    // then
    const expectedMap = [
      ["#", ".", "#", "#", ".", ".", "#", ".", ".", "#", "."],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", "#", ".", "#", ".", ".", "#", ".", "#", "#", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(folded).to.deep.equal(expectedMap);
  });

  it("Fold map vertically along line 5", () => {
    // given
    const map = [
      ["#", ".", "#", "#", ".", ".", "#", ".", ".", "#", "."],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", "#", ".", "#", ".", ".", "#", ".", "#", "#", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    // when
    const folded = fold(map, false, 5);

    // then
    const expectedMap = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#"],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];
    expect(folded).to.deep.equal(expectedMap);
  });

  it("Count dots in sample dataset", () => {
    // given
    const map = [
      ["#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#"],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];

    // when
    const dotsCount = countDots(map);

    // then
    expect(dotsCount).to.equal(16);
  });
});
