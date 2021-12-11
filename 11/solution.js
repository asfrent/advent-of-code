const fs = require("fs");

function readInput(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .map((x) =>
      x
        .split("")
        .map((y) => y.trim())
        .filter((y) => y.length > 0)
        .map((y) => parseInt(y, 10))
    );
}

function step(m) {
  let vis = [];
  let st = [];
  for (let i = 0; i < 10; ++i) {
    vis.push([]);
    for (let j = 0; j < 10; ++j) {
      vis[i].push(false);
      ++m[i][j];
      if (m[i][j] > 9) {
        st.push([i, j]);
        vis[i][j] = true;
      }
    }
  }
  while (st.length > 0) {
    let u = st[st.length - 1];
    st.pop();
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        let ni = u[0] + i;
        let nj = u[1] + j;
        if (ni < 0 || ni >= 10 || nj < 0 || nj >= 10 || vis[ni][nj]) continue;
        ++m[ni][nj];
        if (m[ni][nj] > 9) {
          st.push([ni, nj]);
          vis[ni][nj] = true;
        }
      }
    }
  }
  let c = 0;
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      if (vis[i][j]) {
        ++c;
        m[i][j] = 0;
      }
    }
  }
  return c;
}

function solve(input) {
  let s = 0;
  let i = 0;
  while (true) {
    let flashes = step(input);
    s += flashes;
    ++i;
    if (i == 100) {
      console.log(s);
    }
    if (flashes == 100) {
      console.log(i);
      break;
    }
  }
}

function main() {
  let input = readInput(process.argv[2]);
  solve(input);
}

main();
