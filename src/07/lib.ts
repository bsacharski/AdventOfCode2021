export class FuelCalculator {
  public calculateNeededFuel(
    crabPositions: number[],
    targetPosition: number,
  ): number {
    let fuelSum = 0;

    crabPositions.forEach((crabPosition) => {
      const neededFuel = Math.abs(crabPosition - targetPosition);
      fuelSum += neededFuel;
    });

    return fuelSum;
  }

  private arithmeticSum(number: number): number {
    const isEven = number % 2 === 0;
    if (isEven) {
      return (number + 1) * (number / 2);
    } else {
      const remainder = number;
      number -= 1;
      return ((number + 1) * (number / 2)) + remainder;
    }
  }

  public calculateNeededFuelPt2(
    crabPositions: number[],
    targetPosition: number,
  ): number {
    let fuelSum = 0;

    crabPositions.forEach((position) => {
      const distance = Math.abs(position - targetPosition);
      fuelSum += this.arithmeticSum(distance);
    });

    return fuelSum;
  }
}
