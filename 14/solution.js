const fs = require("fs");

function readInput(filename) {
  let lines = fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
  let template = lines[0];
  let rules = lines.slice(1).map(x => x.replace(' ->', '').split(' ')).reduce((acc, x) => acc.set(x[0], x[1]), new Map());
  return { template, rules };
}

function zeros(lines, cols) {
  let r = [];
  for (let i = 0; i < lines; ++i) {
    r.push(Array(cols).fill(0));
  }
  return r;
}

function idx(chr) {
  if (chr == '$') return 0;
  return chr.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
}

function chr(idx) {
  if (idx == 0) return '$';
  return String.fromCharCode(idx + 'A'.charCodeAt(0) - 1);
}

function stepm(m, rules) {
  let rm = zeros(27, 27);
  for (let i = 0; i < 27; ++i) {
    for (let j = 0; j < 27; ++j) {
      let ci = chr(i), cj = chr(j);
      if (rules.has(ci + cj)) {
        let cnew = rules.get(ci + cj);
        rm[idx(ci)][idx(cnew)] += m[i][j];
        rm[idx(cnew)][idx(cj)] += m[i][j];
      } else {
        rm[i][j] += m[i][j];
      }
    }
  }
  return rm;
}

function freqm(m) {
  let f = [];
  for (let i = 0; i < 27; ++i) f.push(0);
  for (let i = 0; i < 27; ++i) {
    for (let j = 0; j < 27; ++j) {
      f[i] += m[i][j];
      f[j] += m[i][j];
    }
  }
  f = f.map(x => x / 2).slice(1).filter(x => x > 0);
  let minFreq = Math.min(...f);
  let maxFreq = Math.max(...f);
  return {minFreq, maxFreq};
}

function main() {
  let input = readInput(process.argv[2]);
  let t = '$' + input.template + '$';
  let m = zeros(27, 27);
  for (let i = 1; i < t.length; ++i) {
    let l = idx(t[i - 1]);
    let c = idx(t[i]);
    ++m[l][c];
  }
  for (let i = 0; i < 40; ++i) {
    m = stepm(m, input.rules);
    if (i == 9) {
      let f = freqm(m);
      console.log(f.maxFreq - f.minFreq);
    }
  }
  let f = freqm(m);
  console.log(f.maxFreq - f.minFreq);
}

main();
