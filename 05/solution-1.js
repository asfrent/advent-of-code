const fs = require("fs");

function readLines(filename) {
  let contents = fs.readFileSync(filename, "utf-8");
  let lines = contents
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
  return lines;
}

function readInput(filename) {
  let lines = readLines(filename);
  return lines
    .map((x) => x.replace(" -> ", ","))
    .map((x) => x.split(",").map((y) => parseInt(y, 10)));
}

function getMaxCoord(coords) {
  let cmax = 0;
  for (let c of coords) {
    for (let i = 0; i < 4; ++i) {
      cmax = Math.max(cmax, c[i]);
    }
  }
  return cmax;
}

function zerosArray(n) {
  let r = [];
  for (let i = 0; i < n; ++i) {
    r.push(0);
  }
  return r;
}

function zerosMatrix(lines, cols) {
  let m = [];
  for (let i = 0; i < lines; ++i) {
    m.push(zerosArray(cols));
  }
  return m;
}

function isHorizontal(line) {
  return line[1] == line[3];
}

function isVertical(line) {
  return line[0] == line[2];
}

function draw(startx, starty, endx, endy, map) {
  let sx = endx - startx;
  let sy = endy - starty;
  if (sx != 0) sx = sx < 0 ? -1 : +1;
  if (sy != 0) sy = sy < 0 ? -1 : +1;
  let x = startx;
  let y = starty;
  while (x != endx || y != endy) {
    ++map[y][x];
    x += sx;
    y += sy;
  }
  ++map[endy][endx];
}

function drawAndCount(coords, onlyhv) {
  let maxc = getMaxCoord(coords);
  let m = zerosMatrix(maxc + 1, maxc + 1);
  for (let line of coords) {
    if (onlyhv && !isHorizontal(line) && !isVertical(line)) continue;
    draw(line[0], line[1], line[2], line[3], m);
  }
  let c = 0;
  for (let i = 0; i < m.length; ++i) {
    for (let j = 0; j < m[i].length; ++j) {
      if (m[i][j] > 1) {
        ++c;
      }
    }
  }
  return c;
}

function main() {
  let coords = readInput("input.txt");
  console.log("We have " + coords.length + " lines");
  console.log("Max coord is " + getMaxCoord(coords));
  console.log("Solution 1: " + drawAndCount(coords, true));
  console.log("Solution 2: " + drawAndCount(coords, false));
}

main();
