import { print2DArray } from "../util";
import { dotPoints, foldInstructions } from "./input";
import { countDots, fold, initializeMap, Position } from "./lib";

const dots: Position[] = dotPoints.map((arr) => {
  return { row: arr[1], col: arr[0] };
});

const firstFold = foldInstructions.shift()!;
// Paper width here is bigger than dots would suggest
const paperWidth = 2 * firstFold.lineNumber + 1;
let map = initializeMap(dots, paperWidth);
map = fold(
  map,
  firstFold.isHorizontal,
  firstFold.lineNumber,
);

const dotsAfterFirstInstruction = countDots(map);
console.log(`Dots after 1st fold: ${dotsAfterFirstInstruction}`);

while (foldInstructions.length) {
  const instruction = foldInstructions.shift()!;
  map = fold(map, instruction.isHorizontal, instruction.lineNumber);
}

print2DArray(map);
