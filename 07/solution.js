const fs = require('fs');

function gauss(n) { return n * (n + 1) / 2; }

function computeCost2(v, p) {
    let cost = 0;
    for (let x of v) {
        cost += gauss(Math.abs(x - p));
    }
    return cost;
}

function main() {
    let v = fs.readFileSync(process.argv[2], 'utf-8').split('\n')[0].trim().split(',').map(x => parseInt(x.trim(), 10));
    v.sort((a, b) => a - b);
    let pos = v[Math.floor(v.length / 2)];
    let cost = 0;
    for (let x of v) {
        cost += Math.abs(x - pos);
    }
    console.log(cost);

    let lo = Math.min(...v);
    let hi = Math.max(...v);
    let bestCost = computeCost2(v, lo);
    for (let i = lo + 1; i <= hi; ++i) {
        let crtCost = computeCost2(v, i);
        if (crtCost < bestCost) {
            bestCost = crtCost;
        }
    }
    console.log(bestCost);
}

main();