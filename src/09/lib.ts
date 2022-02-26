export type Position = {
  row: number;
  col: number;
};

export type Point = {
  position: Position;
  value: number;
};

function generateLowPointsMap(rows: number, cols: number): number[][] {
  const lowPointsMap = [] as number[][];

  for (let currentRow = 0; currentRow < rows; currentRow++) {
    lowPointsMap[currentRow] = [];
    for (let currentCol = 0; currentCol < cols; currentCol++) {
      let cellValue = 4;

      const edgeRows = [0, rows - 1];
      const edgeCols = [0, cols - 1];

      if (edgeRows.includes(currentRow)) {
        cellValue--;
      }

      if (edgeCols.includes(currentCol)) {
        cellValue--;
      }

      lowPointsMap[currentRow][currentCol] = cellValue;
    }
  }

  return lowPointsMap;
}

function generateBasinPoints(depthMap: number[][], lowPoint: Point): Point[] {
  const generateKey = (point: Point): string => {
    return `${point.position.row}_${point.position.col}`;
  };

  const rows = depthMap.length;
  const cols = depthMap[0].length;

  const basinPointMap = new Map<string, Point>();

  const pointsToCheck = [lowPoint];
  while (pointsToCheck.length) {
    const currentPoint = pointsToCheck.shift()!;
    const key = generateKey(currentPoint);

    if (basinPointMap.has(key)) {
      continue;
    }

    basinPointMap.set(key, currentPoint);

    const neighbours = generateNeighbours(currentPoint.position, rows, cols);
    neighbours.forEach((position) => {
      const cellValue = depthMap[position.row][position.col];
      if (cellValue !== 9) {
        pointsToCheck.push({ position, value: cellValue });
      }
    });
  }

  const basinPoints = [] as Point[];
  for (const point of basinPointMap.values()) {
    basinPoints.push(point);
  }

  basinPoints.sort((pA, pB) => {
    const aVal = parseFloat(`${pA.position.row}.${pA.position.col}`);
    const bVal = parseFloat(`${pB.position.row}.${pB.position.col}`);

    return aVal - bVal;
  });

  return basinPoints;
}

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

  const neighbours: Position[] = [
    leftNeighbour,
    rightNeighbour,
    topNeighbour,
    bottomNeighbour,
  ].filter((pos) => {
    return (pos.row >= 0 && pos.row < rows) && (pos.col >= 0 && pos.col < cols);
  });

  return neighbours;
}

export function detectLowPoints(depthMap: number[][]): Point[] {
  const lowPoints = [] as Point[];

  const rows = depthMap.length;
  const cols = depthMap[0].length;

  const lowPointsMap = generateLowPointsMap(rows, cols);

  for (let currentRow = 0; currentRow < rows; currentRow++) {
    for (let currentCol = 0; currentCol < cols; currentCol++) {
      const currentPosition: Position = {
        row: currentRow,
        col: currentCol,
      };

      const currentValue = depthMap[currentRow][currentCol];
      const neighbours = generateNeighbours(currentPosition, rows, cols);
      // console.log(currentPosition, neighbours);

      neighbours.forEach((neighbour) => {
        const neighbourValue = depthMap[neighbour.row][neighbour.col];
        if (neighbourValue > currentValue) {
          // console.log(neighbour, "lower");
          lowPointsMap[currentRow][currentCol] =
            lowPointsMap[currentRow][currentCol] - 1;
        }
      });

      if (lowPointsMap[currentRow][currentCol] === 0) {
        lowPoints.push({
          position: currentPosition,
          value: depthMap[currentRow][currentCol],
        });
      }
    }
  }

  return lowPoints;
}

export function calculateRiskLevel(points: Point[]): number {
  let riskLevel = 0;
  points.forEach((point) => {
    riskLevel += point.value + 1;
  });
  return riskLevel;
}

export function locateBasins(
  depthMap: number[][],
  lowPoints: Point[],
): Point[][] {
  const basins = lowPoints.map((lowPoint) =>
    generateBasinPoints(depthMap, lowPoint)
  );

  return basins;
}

export function calculateBasinValue(basins: Point[][]): number {
  let product = -1;

  basins.sort((a, b) => a.length - b.length);
  if (basins.length < 3) {
    throw Error("Less than 3 basins provided!");
  }

  const largestBasins = [
    basins.pop()!,
    basins.pop()!,
    basins.pop()!,
  ];

  largestBasins.forEach((basin) => {
    if (product === -1) {
      product = basin.length;
    } else {
      product *= basin.length;
    }
  });

  return product;
}
