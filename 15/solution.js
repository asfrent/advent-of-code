const fs = require("fs");

function readInput(filename) {
  return lines = fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .map(x => x.split('').map(y => parseInt(y, 10)));
}

function bf(cost) {
  let dist = [];
  for (let i = 0; i < cost.length; ++i) {
    dist.push(Array(cost[0].length).fill(Infinity));
  }
  let di = [-1, +1, 0, 0];
  let dj = [0, 0, -1, +1];

  let q = [[0, 0]];
  dist[0][0] = cost[0][0];
  while (q.length > 0) {
    let u = q[0];
    // Fuck JS queues, this is BS and raises the complexity. YOLO.
    q.shift();
    for (let d = 0; d < 4; ++d) {
      let ni = u[0] + di[d];
      let nj = u[1] + dj[d];
      if (ni < 0 || ni >= cost.length || nj < 0 || nj >= cost[0].length) continue;
      if (dist[ni][nj] > dist[u[0]][u[1]] + cost[ni][nj]) {
        dist[ni][nj] = dist[u[0]][u[1]] + cost[ni][nj];
        q.push([ni, nj]);
      }
    }
  }
  console.log(dist[dist.length - 1][dist[0].length - 1] - cost[0][0]);
}

function fivetimes(a) {
  let r = [];
  for (let q = 0; q < 5; ++q) {
    for (let i = 0; i < a.length; ++i) {
      r.push([]);
      for (let w = 0; w < 5; ++w) {
        for (let j = 0; j < a[i].length; ++j) {
          r[r.length - 1].push((a[i][j] + q + w - 1) % 9 + 1)
        }
      }
    }
  }
  return r;
}

function main() {
  let a = readInput(process.argv[2]);
  bf(a);
  bf(fivetimes(a));
}

main();
