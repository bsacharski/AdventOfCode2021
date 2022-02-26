export type Position = {
  row: number;
  col: number;
};

function generateNeighbours(
  position: Position,
  rows: number,
  cols: number,
): Position[] {
  const leftNeighbour: Position = {
    row: position.row,
    col: position.col - 1,
  };

  const rightNeighbour: Position = {
    row: position.row,
    col: position.col + 1,
  };

  const topNeighbour: Position = {
    row: position.row - 1,
    col: position.col,
  };

  const bottomNeighbour: Position = {
    row: position.row + 1,
    col: position.col,
  };

  const topLeftNeighbour: Position = {
    row: topNeighbour.row,
    col: leftNeighbour.col,
  };

  const topRightNeighbour: Position = {
    row: topNeighbour.row,
    col: rightNeighbour.col,
  };

  const bottomLeftNeighbour: Position = {
    row: bottomNeighbour.row,
    col: leftNeighbour.col,
  };

  const bottomRightNeighbour: Position = {
    row: bottomNeighbour.row,
    col: rightNeighbour.col,
  };

  const neighbours: Position[] = [
    leftNeighbour,
    rightNeighbour,
    topNeighbour,
    bottomNeighbour,
    topLeftNeighbour,
    topRightNeighbour,
    bottomLeftNeighbour,
    bottomRightNeighbour,
  ].filter((pos) => {
    return (pos.row >= 0 && pos.row < rows) && (pos.col >= 0 && pos.col < cols);
  });

  return neighbours;
}

function copyMap(map: number[][]): number[][] {
  const newMap: number[][] = [];

  const rows = map.length;
  const cols = map[0].length;

  for (let row = 0; row < rows; row++) {
    newMap[row] = [];
    for (let col = 0; col < cols; col++) {
      newMap[row][col] = map[row][col];
    }
  }

  return newMap;
}

const LIGHT_THRESHOLD = 9;

export type SimulationResult = {
  map: number[][];
  numberOfFlashes: number;
};

export function simulateTurn(map: number[][]): SimulationResult {
  const rows = map.length;
  const cols = map[0].length;

  const updatedMap = copyMap(map);

  const generateKey = (p: Position): string => `${p.row}_${p.col}`;
  const flashedJellys = new Set<string>();

  const simulateCell = (pos: Position): void => {
    const cellValue = updatedMap[pos.row][pos.col] + 1;
    updatedMap[pos.row][pos.col] = cellValue;

    if (cellValue <= LIGHT_THRESHOLD) {
      return;
    }

    const key = generateKey(pos);
    if (flashedJellys.has(key)) {
      return;
    }

    flashedJellys.add(key);
    const neighbours = generateNeighbours(pos, rows, cols);
    neighbours.forEach((neighbour) => simulateCell(neighbour));
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentPosition: Position = { row, col };
      simulateCell(currentPosition);
    }
  }

  // simulate post-lighting reset
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cellValue = updatedMap[row][col];
      if (cellValue > LIGHT_THRESHOLD) {
        updatedMap[row][col] = 0;
      }
    }
  }

  const numberOfFlashes = flashedJellys.size;

  return {
    numberOfFlashes,
    map: updatedMap,
  };
}
