import { input } from "./input";
import { simulateTurn } from "./lib";
const numberOfTurns = 100;

let totalFlashes = 0;
let map = input;
for (let turn = 1; turn <= numberOfTurns; turn++) {
  const result = simulateTurn(map);
  totalFlashes += result.numberOfFlashes;
  map = result.map;
}

console.log(
  `After ${numberOfTurns} turns, there were ${totalFlashes} flashes in total.`,
);

const turnsToTry = 1000;
const jellyFishCount = input.length * input[0].length;
map = input;
let turn = 0;
let goOn = true;
while (turn < turnsToTry && goOn) {
  const result = simulateTurn(map);
  if (result.numberOfFlashes === jellyFishCount) {
    goOn = false;
  }

  map = result.map;
  turn += 1;
}

if (goOn) {
  console.log(`Did not find solution in ${turnsToTry}`);
} else {
  console.log(`All jellyfish will flash in step ${turn}`);
}
