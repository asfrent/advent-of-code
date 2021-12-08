const fs = require('fs');

function readInput(filename) {
    let contents = fs.readFileSync(filename, 'utf-8');
    let digits = contents
        .replace(/a/g, '0')
        .replace(/b/g, '1')
        .replace(/c/g, '2')
        .replace(/d/g, '3')
        .replace(/e/g, '4')
        .replace(/f/g, '5')
        .replace(/g/g, '6');
    let lines = digits.split('\n').map(x => x.trim()).filter(x => x.length > 0);
    let firstAndSecond = lines.map(line => line.split('|').map(part => part.trim().split(' ').map(comb => comb.trim())));
    let result = [];
    for (let t of firstAndSecond) {
        result.push([t[0].map(x => x.split('').map(d => parseInt(d, 10))), t[1].map(x => x.split('').map(d => parseInt(d, 10)))]);
    }
    return result;
}

function solveFirst(input) {
    let s = 0;
    for (let x of input) {
        s += x[1].map(z => z.length).filter(l => l == 2 || l == 3 || l == 4 || l == 7).length;
    }
    return s;
}

function applyMappingsOnCode(code, mappings) {
    let decoded = code.map(x => mappings[x]).sort((a, b) => a - b).join('');
    if (decoded == '012456') return 0;
    if (decoded == '25') return 1;
    if (decoded == '02346') return 2;
    if (decoded == '02356') return 3;
    if (decoded == '1235') return 4;
    if (decoded == '01356') return 5;
    if (decoded == '013456') return 6;
    if (decoded == '025') return 7;
    if (decoded == '0123456') return 8;
    if (decoded == '012356') return 9;
    return null;
}

function applyMappings(x, mappings) {
    let joined = x[0].concat(x[1]);
    let decoded = joined.map(code => applyMappingsOnCode(code, mappings));
    if (decoded.includes(null)) return null;
    let result = parseInt(decoded.slice(decoded.length - 4).join(''), 10);
    return result;
}

function back(x, used, mappings, k) {
    if (k == 7) {
        let solution = applyMappings(x, mappings);
        if (solution) return solution;
    }
    for (let i = 0; i < 7; ++i) {
        if (used[i]) continue;
        used[i] = true;
        mappings[k] = i;
        let result = back(x, used, mappings, k + 1);
        if (result) return result;
        used[i] = false;
    }
    return null;
}

function solve(x) {
    let used = [false, false, false, false, false, false, false];
    let mappings = [-1, -1, -1, -1, -1, -1, -1];
    return back(x, used, mappings, 0);
}

function solveSecond(input) {
    return input.map(solve).reduce((acc, x) => acc + x, 0);
}

function main() {
    let input = readInput(process.argv[2]);
    console.log(solveFirst(input));
    console.log(solveSecond(input));
}

main();