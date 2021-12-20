const fs = require("fs");

function readInput(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)[0]
    .split(" ")
    .slice(2)
    .map((x) =>
      x
        .split("=")[1]
        .replace("..", " ")
        .split(" ")
        .map((y) => parseInt(y, 10))
    );
}

function simulate(xv, yv, txs, txe, tys, tye) {
  let maxAttY = 0;
  let x = 0;
  let y = 0;
  let hitTarget = false;
  while (true) {
    x += xv;
    y += yv;
    maxAttY = Math.max(maxAttY, y);
    if (xv > 0) --xv;
    else if (xv < 0) ++xv;
    --yv;
    if (x >= txs && x <= txe && y >= tys && y <= tye) {
      hitTarget = true;
    }
    if (x > txe || y < tys) return hitTarget ? maxAttY : null;
  }
}

function main() {
  let input = readInput(process.argv[2]);
  console.log(input);

  let maxAttY = 0;
  let c = 0;

  for (let xv = -1000; xv <= +1000; ++xv) {
    for (let yv = -1000; yv <= +1000; ++yv) {
      let r = simulate(
        xv,
        yv,
        input[0][0],
        input[0][1],
        input[1][0],
        input[1][1]
      );
      if (r !== null) {
        ++c;
        maxAttY = Math.max(maxAttY, r);
      }
    }
  }
  console.log(maxAttY);
  console.log(c);
}

main();
