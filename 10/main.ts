import {
  autocomplete,
  calculateCompletionScore,
  calculateCorruptionScore,
  getCorruptionError,
  isCorrupted,
  Mismatch,
} from "./lib.ts";
import { lines } from "./input.ts";

const errors = lines.filter(isCorrupted).map((line) =>
  getCorruptionError(line) as Mismatch
);
const errorScore = calculateCorruptionScore(errors);
console.log(`Error score is ${errorScore}`);

const autocompletions = lines.filter((line) => !isCorrupted(line)).map((line) =>
  autocomplete(line)
);

const autocompletionScores = autocompletions.map((completion) =>
  calculateCompletionScore(completion)
).sort((a, b) => a - b);

const middleIdx = Math.floor(autocompletionScores.length / 2);
const middleScore = autocompletionScores[middleIdx];
console.log(
  `Middle autocompletion score for idx ${middleIdx} of ${autocompletionScores.length} elements is ${middleScore}`,
);
