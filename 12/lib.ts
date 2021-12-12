export type Node = {
  name: string;
  neighbours: Node[];
  isStart: boolean;
  isEnd: boolean;
};

export type Graph = {
  start: Node;
  end: Node;
  nodeMap: Map<string, Node>;
};

type Path = {
  nodes: Node[];
};

export function createGraph(inputData: string[]): Graph {
  const nodes = new Map<string, Node>();

  const createNode = (name: string): Node => {
    const isStart = name === "start";
    const isEnd = name === "end";

    return {
      name,
      neighbours: [] as Node[],
      isStart,
      isEnd,
    };
  };

  inputData.map((line) => line.split("-")).forEach((nodeData) => {
    const [from, to] = nodeData;
    if (!nodes.has(from)) {
      nodes.set(from, createNode(from));
    }

    if (!nodes.has(to)) {
      nodes.set(to, createNode(to));
    }

    const fromNode = nodes.get(from)!;
    const toNode = nodes.get(to)!;

    fromNode.neighbours.push(toNode);
    toNode?.neighbours.push(fromNode);
  });

  const graph = {
    start: nodes.get("start")!,
    end: nodes.get("end")!,
    nodeMap: nodes,
  };

  return graph;
}

function extendPath(path: Path, canVisitTwice = false): Path[] {
  const lastNode = path.nodes[path.nodes.length - 1];

  if (lastNode.isEnd) {
    return [];
  }

  const appendToPath = (
    path: Path,
    newNode: Node,
  ): Path => {
    const newPath: Path = { nodes: path.nodes.map((p) => p) };
    newPath.nodes.push(newNode);

    return newPath;
  };

  const newPaths: Path[] = [];
  lastNode.neighbours.forEach((n) => {
    let maxVisits = Infinity;
    const isSmallCave = n.name.toLowerCase() === n.name;
    const isEdgeCave = ["start", "end"].includes(n.name);

    if (isSmallCave) {
      maxVisits = canVisitTwice ? 2 : 1;
    }

    if (isEdgeCave) {
      maxVisits = 1;
    }

    const nodesWithThatNameInPath = path.nodes.filter((existingN) =>
      existingN.name === n.name
    );

    if (nodesWithThatNameInPath.length >= maxVisits) {
      return;
    }

    const newPath = appendToPath(path, n);
    newPaths.push(newPath);
  });

  return newPaths;
}

function hasYetToVisitSmallCaveTwice(path: Path): boolean {
  const visitedSmallCaves = new Set<string>();

  const smallCaves = path.nodes.filter((n) => n.name === n.name.toLowerCase());
  for (const smallCave of smallCaves) {
    if (visitedSmallCaves.has(smallCave.name)) {
      return false;
    }

    visitedSmallCaves.add(smallCave.name);
  }

  return true;
}

function pathToString(path: Path): string {
  const out = path.nodes.map((n) => n.name).join(",");
  return out;
}

export function buildPaths(
  graph: Graph,
  canVisitTwice = false,
): string[] {
  const generatedPaths: Path[] = [];

  const pathsToVisit: Path[] = [{ nodes: [graph.start] }];
  let iterationsLeft = Number.MIN_SAFE_INTEGER;
  while (pathsToVisit.length && iterationsLeft) {
    const path = pathsToVisit.shift()!;
    const visitTwice = canVisitTwice && hasYetToVisitSmallCaveTwice(path);
    const newPaths = extendPath(path, visitTwice);

    if (newPaths.length > 0) {
      newPaths.forEach((p) => pathsToVisit.push(p));
      iterationsLeft--;
    } else {
      const lastNodeInPath = path.nodes[path.nodes.length - 1];
      if (lastNodeInPath.name === "end") {
        generatedPaths.push(path);
      }
    }
  }

  if (pathsToVisit.length > 0) {
    throw Error("Did not generate all the paths within iteration limit");
  }

  return generatedPaths.map((p) => pathToString(p));
}
