const fs = require("fs");

function readInput(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

function illegalPoints(c) {
  if (c === ")") return 3;
  if (c === "]") return 57;
  if (c === "}") return 1197;
  if (c === ">") return 25137;
  return null;
}

function findFirstIllegal(s) {
  let st = [];
  for (let c of s) {
    if (c === "(" || c === "[" || c === "{" || c === "<") {
      st.push(c);
    } else {
      if (c == ")" && st[st.length - 1] !== "(") return [st, ")"];
      if (c == "]" && st[st.length - 1] !== "[") return [st, "]"];
      if (c == "}" && st[st.length - 1] !== "{") return [st, "}"];
      if (c == ">" && st[st.length - 1] !== "<") return [st, ">"];
      st.pop();
    }
  }
  return [st, null];
}

function completionPoints(c) {
  if (c === "(") return 1;
  if (c === "[") return 2;
  if (c === "{") return 3;
  if (c === "<") return 4;
}

function completionScore(st) {
  let score = 0;
  while (st.length > 0) {
    score = score * 5 + completionPoints(st[st.length - 1]);
    st.pop();
  }
  return score;
}

function solve(input) {
  let s1 = 0;
  let s2v = [];
  for (let x of input) {
    let r = findFirstIllegal(x);
    if (r[1] !== null) {
      s1 += illegalPoints(r[1]);
    } else {
      s2v.push(completionScore(r[0]));
    }
  }
  s2v.sort((a, b) => a - b);
  let s2 = s2v[Math.floor(s2v.length / 2)];
  console.log(s1);
  console.log(s2);
}

function main() {
  let input = readInput(process.argv[2]);
  solve(input);
}

main();
