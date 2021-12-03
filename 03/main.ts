import { input, lengthInBits } from "./input.ts";

type BitCounter = {
  0: number[];
  1: number[];
};

function updateCounter(
  inputNumber: number,
  lengthInBits: number,
  bitCounter: BitCounter,
): BitCounter {
  let mask = 1;

  for (let currentBit = 0; currentBit < lengthInBits; currentBit++) {
    const isSetTo1 = !!(inputNumber & mask);
    bitCounter[isSetTo1 ? 1 : 0][currentBit] += 1;
    mask = mask << 1;
  }

  return bitCounter;
}

function calculateGammaRate(bitCounter: BitCounter): number {
  let gammaRate = 0;

  const lengthInBits = bitCounter[0].length;
  let mask = 1;
  for (let currentBit = 0; currentBit < lengthInBits; currentBit++) {
    const bitValue = bitCounter[1][currentBit] > bitCounter[0][currentBit]
      ? 1
      : 0;

    gammaRate |= mask * bitValue;
    mask = mask << 1;
  }

  return gammaRate;
}

function calculateEpsilonRate(bitCounter: BitCounter): number {
  const gammaRate = calculateGammaRate(bitCounter);
  const lengthInBytes = bitCounter[0].length;
  const mask = parseInt(Array(lengthInBytes).fill("1").join(""), 2);
  const epsilonRate = gammaRate ^ mask;

  return epsilonRate;
}

function filterByBitCriterion(
  input: number[],
  bitCounter: BitCounter,
  bitNumber: number,
  mostCommon = true,
): number[] {
  if (input.length === 1) {
    return input;
  }

  const bitCriterion = bitCounter[1][bitNumber] >= bitCounter[0][bitNumber]
    ? 1
    : 0;

  const filteredInput = input.filter((number) => {
    const shifted = number >> bitNumber;
    const bitValue = shifted & 1;
    return mostCommon
      ? (bitValue === bitCriterion)
      : (bitValue !== bitCriterion);
  });

  return filteredInput;
}

function findOxygenRating(input: number[], lengthInBits: number): number {
  let filteredInput = input;

  for (let currentBit = lengthInBits - 1; currentBit >= 0; currentBit--) {
    if (filteredInput.length === 1) {
      break;
    }

    const bitCounter = initBitCounter(lengthInBits);
    filteredInput.forEach((number) => {
      updateCounter(number, lengthInBits, bitCounter);
    });

    filteredInput = filterByBitCriterion(filteredInput, bitCounter, currentBit);
  }

  const oxygenRating = filteredInput[0];
  return oxygenRating;
}

function findCO2ScrubberRating(
  input: number[],
  lengthInBits: number,
): number {
  let filteredInput = input;

  for (let currentBit = lengthInBits - 1; currentBit >= 0; currentBit--) {
    if (filteredInput.length === 1) {
      break;
    }

    const bitCounter = initBitCounter(lengthInBits);
    filteredInput.forEach((number) => {
      updateCounter(number, lengthInBits, bitCounter);
    });

    filteredInput = filterByBitCriterion(
      filteredInput,
      bitCounter,
      currentBit,
      false,
    );
  }

  const scrubberRating = filteredInput[0];
  return scrubberRating;
}

function initBitCounter(lengthInBits: number): BitCounter {
  const bitCounter: BitCounter = {
    0: Array(lengthInBits).fill(0),
    1: Array(lengthInBits).fill(0),
  };

  return bitCounter;
}

// app

const bitCounter = initBitCounter(lengthInBits);

input.forEach((number) => {
  updateCounter(number, lengthInBits, bitCounter);
});

const gammaRate = calculateGammaRate(bitCounter);
const epsilonRate = calculateEpsilonRate(bitCounter);
console.log(`Gamma x Epsilon: ${gammaRate * epsilonRate}`);

const oxygenRating = findOxygenRating(input, lengthInBits);
const scrubberRating = findCO2ScrubberRating(input, lengthInBits);
console.log(`Life support rating: ${oxygenRating * scrubberRating}`);
