export function print2DArray<Type>(input: Type[][]): void {
  let output = "\n";

  const rows = input.length;
  const cols = input[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      output += input[row][col];
    }
    output += "\n";
  }

  console.log(output);
}

export function generate2DArray<Type>(
  rows: number,
  cols: number,
  intialValue: Type,
): Type[][] {
  const output: Type[][] = [];
  for (let currentRow = 0; currentRow < rows; currentRow++) {
    output[currentRow] = [];
    for (let currentCol = 0; currentCol < cols; currentCol++) {
      output[currentRow][currentCol] = intialValue;
    }
  }

  return output;
}
