const fs = require("fs");

function toDec(bin) {
  let r = 0;
  for (let i = 0; i < bin.length; ++i) {
    r = r * 2 + bin[i];
  }
  return r;
}

let data = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => x.length > 0);
let one_cnt = [],
  ra = [],
  rb = [];
for (let i = 0; i < data[0].length; ++i) {
  one_cnt.push(0);
}
for (let x of data) {
  for (let i = 0; i < x.length; ++i) {
    if (x[i] === "1") {
      ++one_cnt[i];
    }
  }
}
for (let i = 0; i < data[0].length; ++i) {
  let one = one_cnt[i];
  let zero = data.length - one_cnt[i];
  if (one > zero) {
    ra.push(1);
  } else {
    ra.push(0);
  }
  rb.push(1 - ra[i]);
}

gammaDec = toDec(ra);
epsDec = toDec(rb);

console.log(gammaDec * epsDec);
