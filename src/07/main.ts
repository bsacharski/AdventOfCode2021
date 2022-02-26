import { crabPositions } from "./input";
import { FuelCalculator } from "./lib";

let min = Infinity;
let max = -Infinity;

crabPositions.forEach((posistion) => {
  if (posistion < min) {
    min = posistion;
  }

  if (posistion > max) {
    max = posistion;
  }
});

const neededFuelListPt1 = new Map<number, number>();
const neededFuelListPt2 = new Map<number, number>();
const calculator = new FuelCalculator();
for (let targetPosition = min; targetPosition <= max; targetPosition++) {
  const neededFuelPt1 = calculator.calculateNeededFuel(
    crabPositions,
    targetPosition,
  );

  const neededFuelPt2 = calculator.calculateNeededFuelPt2(
    crabPositions,
    targetPosition,
  );

  neededFuelListPt1.set(targetPosition, neededFuelPt1);
  neededFuelListPt2.set(targetPosition, neededFuelPt2);
}

let minFuelPt1 = Infinity;
let bestPositionPt1 = NaN;
for (const [position, fuel] of neededFuelListPt1.entries()) {
  if (fuel < minFuelPt1) {
    minFuelPt1 = fuel;
    bestPositionPt1 = position;
  }
}

let minFuelPt2 = Infinity;
let bestPositionPt2 = NaN;
for (const [position, fuel] of neededFuelListPt2.entries()) {
  if (fuel < minFuelPt2) {
    minFuelPt2 = fuel;
    bestPositionPt2 = position;
  }
}

console.log(
  `Minimum needed fuel for part 1 is ${minFuelPt1} at ${bestPositionPt1}`,
);
console.log(
  `Minimum needed fuel for part 2 is ${minFuelPt2} at ${bestPositionPt2}`,
);
