import { rawInstructions } from "./input.ts";

type Position = {
  x: number;
  y: number;
};

class Instruction {
  start: Position;
  stop: Position;

  constructor(start: Position, stop: Position) {
    this.start = start;
    this.stop = stop;
  }

  public isHorizontal(): boolean {
    // line is horizontal when y stays the same
    return this.start.y === this.stop.y;
  }

  public isVertical(): boolean {
    // line is vertical when x stays the same
    return this.start.x === this.stop.x;
  }

  public getLinePoints(): Position[] {
    if (this.isHorizontal()) {
      return this.horizontalLinePoints();
    }

    if (this.isVertical()) {
      return this.verticalLinePoints();
    }

    return this.diagonalLinePoints();
  }

  private horizontalLinePoints(): Position[] {
    const positions = [] as Position[];

    const [x1, x2] = [this.start.x, this.stop.x].sort((a, b) => a - b);
    const y = this.start.y;

    for (let x = x1; x <= x2; x++) {
      positions.push({ x, y });
    }

    return positions;
  }

  private verticalLinePoints(): Position[] {
    const positions = [] as Position[];

    const [y1, y2] = [this.start.y, this.stop.y].sort((a, b) => a - b);
    const x = this.start.x;

    for (let y = y1; y <= y2; y++) {
      positions.push({ x, y });
    }

    return positions;
  }

  private diagonalLinePoints(): Position[] {
    const positions = [] as Position[];

    let pos1 = this.start;
    let pos2 = this.stop;

    if (this.start.x > this.stop.x) {
      pos1 = this.stop;
      pos2 = this.start;
    }

    const goingDown = pos1.y < pos2.y;
    for (let x = pos1.x, y = pos1.y; x <= pos2.x; x++) {
      positions.push({ x, y });
      goingDown ? y++ : y--;
    }

    return positions;
  }
}

class FloorMap {
  map: number[][];

  public constructor(width: number, height: number) {
    this.map = [];
    for (let h = 0; h < height; h++) {
      this.map[h] = Array(width).fill(0);
    }
  }

  public mark(instruction: Instruction) {
    const markedPositions = instruction.getLinePoints();

    markedPositions.forEach((position) => {
      this.map[position.y][position.x] += 1;
    });
  }

  public findUnsafePositions(): Position[] {
    const unsafePositions: Position[] = [] as Position[];

    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] >= 2) {
          unsafePositions.push({ x, y });
        }
      }
    }

    return unsafePositions;
  }

  public toString(): string {
    let output = "";

    this.map.forEach((line) => {
      const lineString = line.join("").replaceAll("0", ".");
      output += lineString;
      output += "\n";
    });

    return output;
  }
}

// App
const xDim: number[] = [];
const yDim: number[] = [];

const instructions = rawInstructions.map((rawInstruction) => {
  const rawCoordinates = rawInstruction.split(" -> ");
  const rawStart = rawCoordinates[0];
  const rawStop = rawCoordinates[1];

  const [x1, y1] = rawStart.split(",").map((value) => parseInt(value, 10));
  const [x2, y2] = rawStop.split(",").map((value) => parseInt(value, 10));

  xDim.push(x1, x2);
  yDim.push(y1, y2);

  const start: Position = { x: x1, y: y1 };
  const stop: Position = { x: x2, y: y2 };

  return new Instruction(start, stop);
});

// 0 is treated as separate row/col so we need to add 1 to dimensions
const maxWidth = xDim.sort((a, b) => a - b).pop()! + 1;
const maxHeight = yDim.sort((a, b) => a - b).pop()! + 1;

const floorMap = new FloorMap(maxWidth, maxHeight);
instructions.forEach((instruction) => {
  floorMap.mark(instruction);
});

const unsafePositions = floorMap.findUnsafePositions();
console.log(unsafePositions.length);
