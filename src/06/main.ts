import { Fish, Simulation } from "./lib";

const fishes = [
  1,
  1,
  3,
  5,
  1,
  1,
  1,
  4,
  1,
  5,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  2,
  5,
  1,
  1,
  1,
  1,
  1,
  2,
  1,
  4,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  5,
  1,
  1,
  1,
  4,
  1,
  1,
  1,
  4,
  1,
  1,
  3,
  5,
  1,
  1,
  1,
  1,
  4,
  1,
  5,
  4,
  1,
  1,
  2,
  3,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  5,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  1,
  1,
  1,
  5,
  1,
  1,
  1,
  3,
  4,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  5,
  2,
  3,
  1,
  2,
  3,
  1,
  1,
  2,
  1,
  2,
  4,
  5,
  1,
  5,
  1,
  4,
  1,
  1,
  1,
  1,
  2,
  1,
  5,
  1,
  1,
  1,
  1,
  1,
  5,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  2,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  1,
  1,
  1,
  5,
  5,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  4,
  2,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  1,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  5,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  3,
  1,
  1,
  1,
  3,
  5,
  1,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  1,
  5,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  1,
  1,
  1,
].map((fishTimer) => new Fish(fishTimer));

const numberOfDays = 256;
const simulation = new Simulation(fishes);

const fishesCount: number[] = [simulation.getFishesCount()];
for (let day = 1; day <= numberOfDays; day++) {
  simulation.newTurn();
  const fishesNumber = simulation.getFishesCount();
  fishesCount[day] = fishesNumber;
}

console.log(`After 80 days there are ${fishesCount[80]} fishes`);
console.log(`After 256 days there are ${fishesCount[256]} fishes`);
