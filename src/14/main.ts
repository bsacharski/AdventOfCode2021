import { rules, template } from "./input";
import { calculateSolution, generatePairMap, processPolymer } from "./lib";

// part 1
let polymer = generatePairMap(template);
for (let step = 1; step <= 10; step++) {
  polymer = processPolymer(polymer, rules);
}

console.log(`Solution after 10 steps: ${calculateSolution(polymer)}`);

polymer = generatePairMap(template);
for (let step = 1; step <= 40; step++) {
  polymer = processPolymer(polymer, rules);
}

console.log(`Solution after 40 steps: ${calculateSolution(polymer)}`);
