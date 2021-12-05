import { boards, pickedNumbers } from "./input.ts";

class Field {
  value: number;
  isMarked: boolean;

  public constructor(value: number) {
    this.value = value;
    this.isMarked = false;
  }

  public mark(): void {
    this.isMarked = true;
  }
}

class BingoBoard {
  private fields: Field[][];
  private lookUpTable: [number: Field];
  private readonly boardSize: number;
  private isComplete: boolean;

  public constructor(values: number[][]) {
    this.fields = [];
    this.lookUpTable = {} as [number: Field];
    this.boardSize = values.length;
    this.isComplete = false;

    for (let rowIdx = 0; rowIdx < this.boardSize; rowIdx++) {
      this.fields[rowIdx] = [];

      for (let colIdx = 0; colIdx < this.boardSize; colIdx++) {
        const value = values[rowIdx][colIdx];
        const field = new Field(value);

        this.lookUpTable[value] = field;
        this.fields[rowIdx][colIdx] = field;
      }
    }
  }

  public hasField(value: number): boolean {
    return !!this.lookUpTable[value];
  }

  public mark(value: number) {
    this.lookUpTable[value].mark();
  }

  public isBingo(): boolean {
    for (let currentRow = 0; currentRow < this.boardSize; currentRow++) {
      // boards are (at least here) square, so we can use single loop
      if (this.isRowBingo(currentRow) || this.isColBingo(currentRow)) {
        this.isComplete = true;
        return true;
      }
    }

    return false;
  }

  public isRowBingo(rowNumber: number): boolean {
    for (let currentCol = 0; currentCol < this.boardSize; currentCol++) {
      if (this.fields[rowNumber][currentCol].isMarked == false) {
        return false;
      }
    }

    return true;
  }

  public isColBingo(colNumber: number): boolean {
    for (let currentRow = 0; currentRow < this.boardSize; currentRow++) {
      if (this.fields[currentRow][colNumber].isMarked == false) {
        return false;
      }
    }

    return true;
  }

  public sumUnmarkedNumbers(): number {
    let sum = 0;

    for (const [_, field] of Object.entries(this.lookUpTable)) {
      if (field.isMarked == false) sum += field.value;
    }

    return sum;
  }

  public isStillPlayable(): boolean {
    return !this.isComplete;
  }
}

// App
const bingoBoards: BingoBoard[] = boards.map((boardValues) => {
  return new BingoBoard(boardValues);
});

let goOn = true;
const boardResults: number[] = [];

while (pickedNumbers.length && goOn) {
  const pickedNumber = pickedNumbers.shift() as number;

  for (const bingoBoard of bingoBoards) {
    if (!bingoBoard.isStillPlayable()) {
      continue;
    }

    if (!bingoBoard.hasField(pickedNumber)) {
      continue;
    }

    bingoBoard.mark(pickedNumber);
    if (bingoBoard.isBingo()) {
      const unmarkedNumbersSum = bingoBoard.sumUnmarkedNumbers();
      const result = unmarkedNumbersSum * pickedNumber;
      boardResults.push(result);
    }
  }

  if (boardResults.length == bingoBoards.length) {
    goOn = false;
  }
}

console.log(
  `First board result: ${boardResults[0]}, last board result: ${
    boardResults[boardResults.length - 1]
  }`,
);
