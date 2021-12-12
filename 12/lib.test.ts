import { assertEquals } from "../dev_deps.ts";
import { buildPaths, createGraph, Graph, Node } from "./lib.ts";

function createNode(name: string, isStart: boolean, isEnd: boolean): Node {
  return {
    name,
    isStart,
    isEnd,
    neighbours: [] as Node[],
  };
}

Deno.test("Build graph using sample data", () => {
  // given
  const graphDescription = [
    "start-A",
    "start-b",
    "A-c",
    "A-b",
    "b-d",
    "A-end",
    "b-end",
  ];

  // when
  const graph = createGraph(graphDescription);

  // then
  const start = createNode("start", true, false);
  const A = createNode("A", false, false);
  const b = createNode("b", false, false);
  const c = createNode("c", false, false);
  const d = createNode("d", false, false);
  const end = createNode("end", false, true);

  start.neighbours = [A, b];
  A.neighbours = [start, b, c, end];
  b.neighbours = [start, A, d, end];
  c.neighbours = [A];
  d.neighbours = [b];
  end.neighbours = [A, b];

  const expectedNodeMap = new Map<string, Node>([
    [start.name, start],
    [A.name, A],
    [b.name, b],
    [c.name, c],
    [d.name, d],
    [end.name, end],
  ]);

  const expectedGraph: Graph = {
    start,
    end,
    nodeMap: expectedNodeMap,
  };

  assertEquals(graph.start.name, expectedGraph.start.name);
  assertEquals(graph.end.name, expectedGraph.end.name);
  assertEquals(graph.nodeMap.keys(), expectedGraph.nodeMap.keys());
  assertEquals(
    graph.nodeMap.get("b")!.neighbours.map((n) => n.name),
    b.neighbours.map((n) => n.name),
  );
});

Deno.test("Build paths for sample dataset", () => {
  // given
  const start = createNode("start", true, false);
  const A = createNode("A", false, false);
  const b = createNode("b", false, false);
  const c = createNode("c", false, false);
  const d = createNode("d", false, false);
  const end = createNode("end", false, true);

  start.neighbours = [A, b];
  A.neighbours = [start, b, c, end];
  b.neighbours = [start, A, d, end];
  c.neighbours = [A];
  d.neighbours = [b];
  end.neighbours = [A, b];

  const nodeMap = new Map<string, Node>([
    [start.name, start],
    [A.name, A],
    [b.name, b],
    [c.name, c],
    [d.name, d],
    [end.name, end],
  ]);

  const graph: Graph = {
    start,
    end,
    nodeMap,
  };

  // when
  const paths = buildPaths(graph);

  // then
  const expectedPaths = [
    "start,A,b,A,c,A,end",
    "start,A,b,A,end",
    "start,A,b,end",
    "start,A,c,A,b,A,end",
    "start,A,c,A,b,end",
    "start,A,c,A,end",
    "start,A,end",
    "start,b,A,c,A,end",
    "start,b,A,end",
    "start,b,end",
  ];
  assertEquals(new Set<string>(paths), new Set<string>(expectedPaths));
});

Deno.test("Generate paths for sample dataset #2", () => {
  // given
  const input = [
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc",
  ];
  const graph = createGraph(input);

  // when
  const paths = buildPaths(graph);

  // then
  const expectedPaths = [
    "start,HN,dc,HN,end",
    "start,HN,dc,HN,kj,HN,end",
    "start,HN,dc,end",
    "start,HN,dc,kj,HN,end",
    "start,HN,end",
    "start,HN,kj,HN,dc,HN,end",
    "start,HN,kj,HN,dc,end",
    "start,HN,kj,HN,end",
    "start,HN,kj,dc,HN,end",
    "start,HN,kj,dc,end",
    "start,dc,HN,end",
    "start,dc,HN,kj,HN,end",
    "start,dc,end",
    "start,dc,kj,HN,end",
    "start,kj,HN,dc,HN,end",
    "start,kj,HN,dc,end",
    "start,kj,HN,end",
    "start,kj,dc,HN,end",
    "start,kj,dc,end",
  ];
  assertEquals(new Set<string>(paths), new Set<string>(expectedPaths));
});

Deno.test("Check number of generated paths for sample dataset #3", () => {
  // given
  const input = [
    "fs-end",
    "he-DX",
    "fs-he",
    "start-DX",
    "pj-DX",
    "end-zg",
    "zg-sl",
    "zg-pj",
    "pj-he",
    "RW-he",
    "fs-DX",
    "pj-RW",
    "zg-RW",
    "start-pj",
    "he-WI",
    "zg-he",
    "pj-fs",
    "start-RW",
  ];
  const graph = createGraph(input);

  // when
  const paths = buildPaths(graph);

  // then
  assertEquals(paths.length, 226);
});

Deno.test("Generate paths for sample dataset #1 with small caves being visited at most twice", () => {
  // given
  const graphDescription = [
    "start-A",
    "start-b",
    "A-c",
    "A-b",
    "b-d",
    "A-end",
    "b-end",
  ];
  const graph = createGraph(graphDescription);

  // when
  const paths = buildPaths(graph, true);

  // then
  const expectedPaths = [
    "start,A,b,A,b,A,c,A,end",
    "start,A,b,A,b,A,end",
    "start,A,b,A,b,end",
    "start,A,b,A,c,A,b,A,end",
    "start,A,b,A,c,A,b,end",
    "start,A,b,A,c,A,c,A,end",
    "start,A,b,A,c,A,end",
    "start,A,b,A,end",
    "start,A,b,d,b,A,c,A,end",
    "start,A,b,d,b,A,end",
    "start,A,b,d,b,end",
    "start,A,b,end",
    "start,A,c,A,b,A,b,A,end",
    "start,A,c,A,b,A,b,end",
    "start,A,c,A,b,A,c,A,end",
    "start,A,c,A,b,A,end",
    "start,A,c,A,b,d,b,A,end",
    "start,A,c,A,b,d,b,end",
    "start,A,c,A,b,end",
    "start,A,c,A,c,A,b,A,end",
    "start,A,c,A,c,A,b,end",
    "start,A,c,A,c,A,end",
    "start,A,c,A,end",
    "start,A,end",
    "start,b,A,b,A,c,A,end",
    "start,b,A,b,A,end",
    "start,b,A,b,end",
    "start,b,A,c,A,b,A,end",
    "start,b,A,c,A,b,end",
    "start,b,A,c,A,c,A,end",
    "start,b,A,c,A,end",
    "start,b,A,end",
    "start,b,d,b,A,c,A,end",
    "start,b,d,b,A,end",
    "start,b,d,b,end",
    "start,b,end",
  ];

  assertEquals(new Set<string>(paths), new Set<string>(expectedPaths));
});

Deno.test("Check number paths for sample dataset #2 with small caves being visited at most twice", () => {
  // given
  const graphDescription = [
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc",
  ];
  const graph = createGraph(graphDescription);

  // when
  const paths = buildPaths(graph, true);

  // then
  assertEquals(paths.length, 103);
});

Deno.test("Check number paths for sample dataset #3 with small caves being visited at most twice", () => {
  // given
  const graphDescription = [
    "fs-end",
    "he-DX",
    "fs-he",
    "start-DX",
    "pj-DX",
    "end-zg",
    "zg-sl",
    "zg-pj",
    "pj-he",
    "RW-he",
    "fs-DX",
    "pj-RW",
    "zg-RW",
    "start-pj",
    "he-WI",
    "zg-he",
    "pj-fs",
    "start-RW",
  ];
  const graph = createGraph(graphDescription);

  // when
  const paths = buildPaths(graph, true);

  // then
  assertEquals(paths.length, 3509);
});
