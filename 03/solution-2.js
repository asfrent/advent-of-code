const fs = require("fs");

function toDec(bin) {
  let r = 0;
  for (let i = 0; i < bin.length; ++i) {
    r = r * 2 + bin[i];
  }
  return r;
}

function getCrit(data, q, w) {
  let d = Array.from(data);
  for (let i = 0; i < data[0].length; ++i) {
    let ones = d
      .map((x) => parseInt(x.substr(i, 1)))
      .reduce((a, x) => a + x, 0);
    let zeros = d.length - ones;
    if (ones >= zeros) {
      d = d.filter((x) => x.substr(i, 1) === q);
    } else {
      d = d.filter((x) => x.substr(i, 1) === w);
    }
    if (d.length === 1) {
      return toDec(d[0].split("").map((x) => parseInt(x, 10)));
    }
  }
}

let data = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => x.length > 0);

let oxy = getCrit(data, "1", "0");
let co2 = getCrit(data, "0", "1");
console.log(oxy * co2);
