import { input } from "./input.ts";
import { buildPaths, createGraph } from "./lib.ts";

const graph = createGraph(input);
const paths = buildPaths(graph);

console.log(`There are ${paths.length} paths`);

// This is very suboptimal, takes quite a while to compute.
const pathsTwice = buildPaths(graph, true);
console.log(`There are ${pathsTwice.length} paths #2`);
