import { expect } from "chai";
import { describe, it } from "mocha"
import { FuelCalculator } from "./lib";

describe("FuelCalculator tests", () => {
  it('Should calculate output for position 2 of part 1', () => {
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

  it("Should calculate output for position 10 for part 1", () => {
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

  it("Should calculate output for position 2 for part 2", () => {
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

  it("Should calculate output for position 5 for part 2", () => {
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
});
