import { measurements } from "./input.ts";

function countIncrements(measurements: number[]): number {
  let numberOfIncrements = 0;
  if (measurements.length === 0) {
    return numberOfIncrements;
  }

  let previousReading = measurements.shift()!;

  measurements.forEach((value) => {
    if (value > previousReading) {
      numberOfIncrements++;
    }

    previousReading = value;
  });

  return numberOfIncrements;
}

function buildMeasurementWindows(measurements: number[]): number[][] {
  const windows: number[][] = [];
  const windowSize = 3;

  if (measurements.length < 3) {
    return windows;
  }

  for (
    let firstElementIdx = 0;
    firstElementIdx < (measurements.length - (windowSize - 1));
    firstElementIdx++
  ) {
    const window = [
      measurements[firstElementIdx],
      measurements[firstElementIdx + 1],
      measurements[firstElementIdx + 2],
    ];

    windows.push(window);
  }

  return windows;
}

function sumMeasurementWindows(windows: number[][]): number[] {
  const sums = windows.map(
    (window) => window.reduce((sum, currentValue) => sum + currentValue),
    0,
  );

  return sums;
}

const normalIncrements = countIncrements(measurements);
console.log(`Normal increments: ${normalIncrements}`);

const windows = buildMeasurementWindows(measurements);
const summedWindows = sumMeasurementWindows(windows);
const windowIncrements = countIncrements(summedWindows);
console.log(`Window increments: ${windowIncrements}`);
