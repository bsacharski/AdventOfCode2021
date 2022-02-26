import { expect } from "chai";
import { describe, it } from "mocha"
import { Fish, Simulation } from "./lib";

describe("Fish simulation with sample dataset", () => {
  it('Should simulate fishes state for 1st day', () => {
    // given
    const initialFishTimers = [3, 4, 3, 1, 2];
    const fishes = initialFishTimers.map((timer) => new Fish(timer));
    const simulation = new Simulation(fishes);

    // when
    simulation.newTurn();

    // then
    expect(simulation.getCurrentState()).to.have.members([2, 3, 2, 0, 1]);
  });

  it('Should simulate state for 3rd day', () => {
    const numberOfDays = 3;

    // given
    const initialFishTimers = [3, 4, 3, 1, 2];
    const fishes = initialFishTimers.map((timer) => new Fish(timer));
    const simulation = new Simulation(fishes);

    // when
    for (let day = 1; day <= numberOfDays; day++) {
      simulation.newTurn();
    }

    // then
    expect(simulation.getCurrentState()).to.have.members([0, 1, 0, 5, 6, 7, 8]);
  });

  it('Should simulate state for 18th day', () => {
    const numberOfDays = 18;

    // given
    const initialFishTimers = [3, 4, 3, 1, 2];
    const fishes = initialFishTimers.map((timer) => new Fish(timer));
    const simulation = new Simulation(fishes);

    // when
    for (let day = 1; day <= numberOfDays; day++) {
      simulation.newTurn();
    }

    // then
    expect(simulation.getCurrentState()).to.have.members([
      6,
      0,
      6,
      4,
      5,
      6,
      0,
      1,
      1,
      2,
      6,
      0,
      1,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      6,
      7,
      8,
      8,
      8,
      8,
    ]);
  });

  it('Should count fishes after 80 days of simulation', () => {
    const numberOfDays = 80;

    // given
    const initialFishTimers = [3, 4, 3, 1, 2];
    const fishes = initialFishTimers.map((timer) => new Fish(timer));
    const simulation = new Simulation(fishes);

    // when
    for (let day = 1; day <= numberOfDays; day++) {
      simulation.newTurn();
    }

    // then
    expect(simulation.getFishesCount()).to.equal(5934);
  });

  it('Should count fishes after 256 days of simulation', () => {
    const numberOfDays = 256;

    // given
    const initialFishTimers = [3, 4, 3, 1, 2];
    const fishes = initialFishTimers.map((timer) => new Fish(timer));
    const simulation = new Simulation(fishes);

    // when
    for (let day = 1; day <= numberOfDays; day++) {
      simulation.newTurn();
    }

    // then
    expect(simulation.getFishesCount()).to.equal(26984457539);
  });
});
