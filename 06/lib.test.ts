import { chai } from "../dev_deps.ts";
import { Fish, Simulation } from "./lib.ts";

Deno.test("Sample dataset simulation for 1st day", () => {
  const expect = chai.expect;

  // given
  const initialFishTimers = [3, 4, 3, 1, 2];
  const fishes = initialFishTimers.map((timer) => new Fish(timer));
  const simulation = new Simulation(fishes);

  // when
  simulation.newTurn();

  // then
  expect(simulation.getCurrentState()).to.have.members([2, 3, 2, 0, 1]);
});

Deno.test("Fishes state using sample dataset simulation for 3 days", () => {
  const expect = chai.expect;
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

Deno.test("Fishes state using sample dataset simulation for 18 days", () => {
  const expect = chai.expect;
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

Deno.test("Fishes count using sample dataset simulation for 80 days", () => {
  const expect = chai.expect;
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

Deno.test("Fishes count using sample dataset simulation for 256 days", () => {
  const expect = chai.expect;
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
