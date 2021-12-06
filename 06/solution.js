const fs = require("fs");

function readInput(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")[0]
    .split(",")
    .map((x) => parseInt(x.trim(), 10));
}

function howMany(initialState, days) {
  let histogram = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let x of initialState) {
    ++histogram[x];
  }
  for (let i = 0; i < days; ++i) {
    let head = histogram.shift();
    histogram[6] += head;
    histogram.push(head);
  }
  let s = 0;
  for (let x of histogram) {
    s += x;
  }
  return s;
}

function main() {
  let initialState = readInput(process.argv[2]);
  console.log("after 80 days: " + howMany(initialState, 80));
  console.log("after 256 days: " + howMany(initialState, 256));
}

main();
