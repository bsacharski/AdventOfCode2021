import { assertEquals } from "../dev_deps.ts";
import {
  calculateBasinValue,
  calculateRiskLevel,
  detectLowPoints,
  locateBasins,
  Point,
} from "./lib.ts";

Deno.test("Find low points in sample map", () => {
  // given
  const inputData = [
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
  ];

  // when
  const lowPoints = detectLowPoints(inputData);

  // then
  const expectedLowPoints: Point[] = [
    {
      position: { row: 0, col: 1 },
      value: 1,
    },
    {
      position: { row: 0, col: 9 },
      value: 0,
    },
    {
      position: { row: 2, col: 2 },
      value: 5,
    },
    {
      position: { row: 4, col: 6 },
      value: 5,
    },
  ];
  assertEquals(lowPoints, expectedLowPoints);
});

Deno.test("Calculate risk level in sample map", () => {
  // given
  const inputData = [
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
  ];

  // when
  const lowPoints = detectLowPoints(inputData);
  const riskLevel = calculateRiskLevel(lowPoints);

  // then
  assertEquals(riskLevel, 15);
});

Deno.test("Find basins in sample map", () => {
  // given
  const depthMap = [
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
  ];
  const lowPoints: Point[] = [
    {
      position: { row: 0, col: 1 },
      value: 1,
    },
    {
      position: { row: 0, col: 9 },
      value: 0,
    },
    {
      position: { row: 2, col: 2 },
      value: 5,
    },
    {
      position: { row: 4, col: 6 },
      value: 5,
    },
  ];

  // when
  const basins = locateBasins(depthMap, lowPoints);

  // then
  assertEquals(basins, [
    [
      {
        position: { row: 0, col: 0 },
        value: 2,
      },
      { position: { row: 0, col: 1 }, value: 1 },
      { position: { row: 1, col: 0 }, value: 3 },
    ],
    [
      { position: { row: 0, col: 5 }, value: 4 },
      { position: { row: 0, col: 6 }, value: 3 },
      { position: { row: 0, col: 7 }, value: 2 },
      { position: { row: 0, col: 8 }, value: 1 },
      { position: { row: 0, col: 9 }, value: 0 },
      { position: { row: 1, col: 6 }, value: 4 },
      { position: { row: 1, col: 8 }, value: 2 },
      { position: { row: 1, col: 9 }, value: 1 },
      { position: { row: 2, col: 9 }, value: 2 },
    ],
    [
      { position: { row: 1, col: 2 }, value: 8 },
      { position: { row: 1, col: 3 }, value: 7 },
      { position: { row: 1, col: 4 }, value: 8 },
      { position: { row: 2, col: 1 }, value: 8 },
      { position: { row: 2, col: 2 }, value: 5 },
      { position: { row: 2, col: 3 }, value: 6 },
      { position: { row: 2, col: 4 }, value: 7 },
      { position: { row: 2, col: 5 }, value: 8 },
      { position: { row: 3, col: 0 }, value: 8 },
      { position: { row: 3, col: 1 }, value: 7 },
      { position: { row: 3, col: 2 }, value: 6 },
      { position: { row: 3, col: 3 }, value: 7 },
      { position: { row: 3, col: 4 }, value: 8 },
      { position: { row: 4, col: 1 }, value: 8 },
    ],
    [
      { position: { row: 2, col: 7 }, value: 8 },
      { position: { row: 3, col: 6 }, value: 6 },
      { position: { row: 3, col: 7 }, value: 7 },
      { position: { row: 3, col: 8 }, value: 8 },
      { position: { row: 4, col: 5 }, value: 6 },
      { position: { row: 4, col: 6 }, value: 5 },
      { position: { row: 4, col: 7 }, value: 6 },
      { position: { row: 4, col: 8 }, value: 7 },
      { position: { row: 4, col: 9 }, value: 8 },
    ],
  ]);
});

Deno.test("Calculate basin value for sample depth map", () => {
  // given
  const depthMap = [
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
  ];
  const lowPoints: Point[] = [
    {
      position: { row: 0, col: 1 },
      value: 1,
    },
    {
      position: { row: 0, col: 9 },
      value: 0,
    },
    {
      position: { row: 2, col: 2 },
      value: 5,
    },
    {
      position: { row: 4, col: 6 },
      value: 5,
    },
  ];

  // when
  const basins = locateBasins(depthMap, lowPoints);
  const basinValue = calculateBasinValue(basins);

  // then
  assertEquals(basinValue, 1134);
});
