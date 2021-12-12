const fs = require("fs");

function readInput(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .map((x) =>
      x
        .split("-")
        .map((y) => y.trim())
        .filter((y) => y.length > 0)
    );
}

function buildGraph(edges) {
  let vertices = new Set(edges.reduce((acc, e) => acc.concat(e), []));
  let adj = new Map();
  for (let u of vertices) {
    adj.set(u, []);
  }
  for (let e of edges) {
    adj.get(e[0]).push(e[1]);
    adj.get(e[1]).push(e[0]);
  }
  return { vertices, edges, adj };
}

function isSmallCave(u) {
  return u[0].toLowerCase() === u[0];
}

function dfs(u, adj, vis, canSkipOne, crt, acc) {
  if (vis.get(u)) return 0;
  if (u === "end") {
    acc.push(crt.join(","));
    return;
  }
  let smallCave = isSmallCave(u);
  if (smallCave) vis.set(u, true);
  crt.push(u);
  for (let v of adj.get(u)) {
    dfs(v, adj, vis, canSkipOne, crt, acc);
  }
  if (smallCave) vis.set(u, false);
  if (u !== "start" && smallCave && canSkipOne) {
    for (let v of adj.get(u)) {
      dfs(v, adj, vis, false, crt, acc);
    }
  }
  crt.pop();
}

function uniqueCount(v) {
  return new Set(v).size;
}

function solve(graph) {
  let vis = new Map();
  for (let u of graph.vertices) {
    vis.set(u, false);
  }
  let acc1 = [];
  dfs("start", graph.adj, vis, false, [], acc1);
  console.log(uniqueCount(acc1));
  let acc2 = [];
  dfs("start", graph.adj, vis, true, [], acc2);
  console.log(uniqueCount(acc2));
}

function main() {
  let edges = readInput(process.argv[2]);
  let graph = buildGraph(edges);
  solve(graph);
}

main();
