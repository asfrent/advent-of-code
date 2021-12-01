const fs = require("fs");
let v = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => x.length > 0)
  .map((x) => parseInt(x, 10));
let c = 0;
let s = v[0] + v[1] + v[2];
for (let i = 3; i < v.length; ++i) {
  let ns = s - v[i - 3] + v[i];
  if (ns > s) {
    ++c;
  }
  s = ns;
}
console.log(c);
