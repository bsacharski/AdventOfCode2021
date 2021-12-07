import { chai } from "../dev_deps.ts";
import { FuelCalculator } from "./lib.ts";

Deno.test("Calcuate output for position 2 for part 1", () => {
  const expect = chai.expect;

  // given
  const targetPosition = 2;
  const crabPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  const calculator = new FuelCalculator();

  // when
  const neededFuel = calculator.calculateNeededFuel(
    crabPositions,
    targetPosition,
  );

  // then
  expect(neededFuel).to.equal(37);
});

Deno.test("Calcuate output for position 10 for part 1", () => {
  const expect = chai.expect;

  // given
  const targetPosition = 10;
  const crabPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  const calculator = new FuelCalculator();

  // when
  const neededFuel = calculator.calculateNeededFuel(
    crabPositions,
    targetPosition,
  );

  // then
  expect(neededFuel).to.equal(71);
});

Deno.test("Calcuate output for position 2 for part 2", () => {
  const expect = chai.expect;

  // given
  const targetPosition = 2;
  const crabPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  const calculator = new FuelCalculator();

  // when
  const neededFuel = calculator.calculateNeededFuelPt2(
    crabPositions,
    targetPosition,
  );

  // then
  expect(neededFuel).to.equal(206);
});

Deno.test("Calcuate output for position 5 for part 2", () => {
  const expect = chai.expect;

  // given
  const targetPosition = 5;
  const crabPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  const calculator = new FuelCalculator();

  // when
  const neededFuel = calculator.calculateNeededFuelPt2(
    crabPositions,
    targetPosition,
  );

  // then
  expect(neededFuel).to.equal(168);
});
