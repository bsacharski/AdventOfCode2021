import { generate2DArray } from "../util.ts";

export type Position = {
  row: number;
  col: number;
};

export function initializeMap(
  dotPositions: Position[],
  paperWidth = -Infinity,
): string[][] {
  let rows = -Infinity;
  let cols = -Infinity;

  dotPositions.forEach((pos) => {
    if (pos.row > rows) {
      rows = pos.row;
    }

    if (pos.col > cols) {
      cols = pos.col;
    }
  });
  rows += 1;
  cols += 1;

  if (paperWidth > cols) {
    cols = paperWidth;
  }

  const map = generate2DArray<string>(rows, cols, ".");

  dotPositions.forEach((pos) => map[pos.row][pos.col] = "#");

  return map;
}

export function extract2DSubset(
  map: string[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
): string[][] {
  const rows = (endRow - startRow) + 1;
  const cols = (endCol - startCol) + 1;

  const subset = generate2DArray(rows, cols, "");
  for (let currentRow = startRow; currentRow <= endRow; currentRow++) {
    for (let currentCol = startCol; currentCol <= endCol; currentCol++) {
      const cellValue = map[currentRow][currentCol];
      subset[currentRow - startRow][currentCol - startCol] = cellValue;
    }
  }

  return subset;
}

export function mirror(map: string[][], isHorizontal: boolean): string[][] {
  const rows = map.length;
  const cols = map[0].length;

  const mirrored: string[][] = [];
  for (let currentRow = 0; currentRow < rows; currentRow++) {
    mirrored[currentRow] = [];
    for (let currentCol = 0; currentCol < cols; currentCol++) {
      let sourceRow = currentRow;
      let sourceCol = currentCol;

      if (isHorizontal) {
        sourceRow = (rows - 1) - currentRow;
      } else {
        sourceCol = (cols - 1) - currentCol;
      }

      mirrored[currentRow][currentCol] = map[sourceRow][sourceCol];
    }
  }

  return mirrored;
}

function overlay(aPart: string[][], bPart: string[][]): string[][] {
  const rows = aPart.length;
  const cols = aPart[0].length;

  if (bPart.length !== rows || bPart[0].length !== cols) {
    throw Error(
      `Dimensions mismatch, ${rows}x${cols} vs ${bPart.length}x${
        bPart[0].length
      }`,
    );
  }

  const overlayed: string[][] = [];
  for (let currentRow = 0; currentRow < rows; currentRow++) {
    overlayed[currentRow] = [];
    for (let currentCol = 0; currentCol < cols; currentCol++) {
      overlayed[currentRow][currentCol] = aPart[currentRow][currentCol];
      if (bPart[currentRow][currentCol] !== ".") {
        overlayed[currentRow][currentCol] = bPart[currentRow][currentCol];
      }
    }
  }

  return overlayed;
}

export function split(
  map: string[][],
  isHorizontal: boolean,
  lineNumber: number,
): [aPart: string[][], bPart: string[][]] {
  const totalRows = map.length;
  const totalCols = map[0].length;

  const aRowStart = 0;
  const aColStart = 0;
  const aRowEnd = isHorizontal ? lineNumber - 1 : totalRows - 1;
  const aColEnd = isHorizontal ? totalCols - 1 : lineNumber - 1;

  const bRowStart = isHorizontal ? lineNumber + 1 : 0;
  const bColStart = isHorizontal ? 0 : lineNumber + 1;
  const bRowEnd = totalRows - 1;
  const bColEnd = totalCols - 1;

  const aPart = extract2DSubset(map, aRowStart, aColStart, aRowEnd, aColEnd);
  const bPart = extract2DSubset(map, bRowStart, bColStart, bRowEnd, bColEnd);

  return [
    aPart,
    bPart,
  ];
}

export function fold(
  map: string[][],
  isHorizontal: boolean,
  lineNumber: number,
): string[][] {
  const [aPart, bPart] = split(map, isHorizontal, lineNumber);
  const bPartFlipped = mirror(bPart, isHorizontal);
  const folded = overlay(aPart, bPartFlipped);

  return folded;
}

export function countDots(map: string[][]): number {
  let dots = 0;
  const rows = map.length;
  const cols = map[0].length;

  for (let currentRow = 0; currentRow < rows; currentRow++) {
    for (let currentCol = 0; currentCol < cols; currentCol++) {
      const cellValue = map[currentRow][currentCol];
      if (cellValue === "#") {
        dots += 1;
      }
    }
  }

  return dots;
}
