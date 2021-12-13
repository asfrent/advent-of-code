const fs = require("fs");

function readInput(filename) {
  let lines = fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
  let folding = lines.filter(x => x.startsWith("fold")).map(x => x.split('='));
  let coords = lines.filter(x => !x.startsWith("fold")).map(x => x.split(',').map(y => parseInt(y, 10)));
  return {coords, folding};
}

function foldX(cx, cy, xline) {
  if (cx < xline) return [cx, cy];
  return [2 * xline - cx, cy];
}

function foldY(cx, cy, yline) {
  if (cy < yline) return [cx, cy];
  return [cx, 2 * yline - cy]; 
}

function fold(coords, instruction) {
  let fold = instruction[0].endsWith('x') ? foldX : foldY;
  let result = coords.map(c => fold(c[0], c[1], instruction[1]));
  return Array.from(new Set(result.map(x => x.join(',')))).map(x => x.split(',').map(y => parseInt(y, 10)));
}

function printMap(coords) {
  let maxX = Math.max(...(coords.map(x => x[0])));
  let maxY = Math.max(...(coords.map(x => x[1])));
  let m = [];
  for (let i = 0; i <= maxY; ++i) {
    m.push([]);
    for (let j = 0; j <= maxX; ++j) {
      m[i].push(' ');
    }
  }
  for (let c of coords) {
    m[c[1]][c[0]] = '#';
  }
  let s = m.map(x => x.join('')).join('\n');
  console.log(s);
}

function main() {
  let input = readInput(process.argv[2]);
  let v = fold(input.coords, input.folding[0]);
  console.log(v.length);
  for (let i = 1; i < input.folding.length; ++i) {
    v = fold(v, input.folding[i]);
  }
  printMap(v);
}

main();
