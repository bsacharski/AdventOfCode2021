import { input } from "./input";
import { decode } from "./lib";

let instances = 0;
const simpleDigits = [1, 4, 7, 8];
input.forEach((signal) => {
  const digits = decode(signal);
  instances += digits.filter((digit) => simpleDigits.includes(digit)).length;
});

console.log(
  `Detected ${instances} instances of digits ${simpleDigits}`,
);

let sum = 0;
input.forEach((signal) => {
  const digits = decode(signal);
  const number = parseInt(
    digits.map((digit) => new String(digit)).join(""),
    10,
  );
  sum += number;
});

console.log(`Sum of all decoded numbers is ${sum}`);
