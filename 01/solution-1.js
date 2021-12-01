const fs = require("fs");
let v = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => x.length > 0)
  .map((x) => parseInt(x, 10));
let c = 0;
for (let i = 1; i < v.length; ++i) {
  if (v[i] > v[i - 1]) {
    ++c;
  }
}
console.log(c);
