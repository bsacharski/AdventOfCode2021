import { rawInstructions } from "./input";

type Direction = "forward" | "down" | "up";

type Instruction = {
  direction: Direction;
  unit: number;
};

type Position = {
  horizontal: number;
  depth: number;
  aim: number;
};

function parseInstruction(rawInstruction: string): Instruction {
  const instructionParts = rawInstruction.split(" ");
  const direction: Direction = instructionParts[0] as Direction;
  const unit = Number(instructionParts[1]);

  const instruction: Instruction = {
    direction: direction,
    unit: unit,
  };

  return instruction;
}

function parseInstructions(rawInstructions: string[]): Instruction[] {
  const instructions = rawInstructions.map(parseInstruction);
  return instructions;
}

function move(currentPosition: Position, instruction: Instruction): Position {
  const newPosition: Position = {
    horizontal: currentPosition.horizontal,
    aim: currentPosition.aim,
    depth: currentPosition.depth,
  };

  switch (instruction.direction) {
    case "forward": {
      newPosition.horizontal += instruction.unit;
      newPosition.depth += newPosition.aim * instruction.unit;
      break;
    }
    case "up": {
      newPosition.aim -= instruction.unit;
      break;
    }
    case "down": {
      newPosition.aim += instruction.unit;
      break;
    }
  }

  return newPosition;
}

function traverse(
  initialPosition: Position,
  instructions: Instruction[],
): Position {
  let currentPosition = initialPosition;
  instructions.forEach((instruction) => {
    const newPosition = move(currentPosition, instruction);
    currentPosition = newPosition;
  });

  return currentPosition;
}

const initialPosition: Position = {
  horizontal: 0,
  depth: 0,
  aim: 0,
};

const instructions = parseInstructions(rawInstructions);
const finalPosition = traverse(initialPosition, instructions);
console.log(finalPosition.depth * finalPosition.horizontal);
